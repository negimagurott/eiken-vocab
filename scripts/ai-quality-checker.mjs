import fs from 'node:fs';
import vm from 'node:vm';

const API_URL='https://api.openai.com/v1/responses';
const MODEL=process.env.OPENAI_QUALITY_MODEL||'gpt-5.6-luna';
const MIN_SCORE=80;
const MAX_REGENERATIONS=3;
const args=process.argv.slice(2);
const value=name=>{const index=args.indexOf(name);return index>=0?args[index+1]:''};
const targetWord=value('--word');
const outputPath=value('--write');

if(!process.env.OPENAI_API_KEY){
  console.error('OPENAI_API_KEY is required. Keep it in the development environment; never add it to the app.');
  process.exit(1);
}
if(!targetWord){
  console.error('Usage: node scripts/ai-quality-checker.mjs --word <word> [--write approved-candidate.json]');
  process.exit(1);
}

const context={window:{}};
vm.createContext(context);
for(const file of ['words.js','words-extra.js','word-details.js','quiz-quality.js','quiz-data.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}
const words=context.window.EIKEN_WORDS||[];
const bank=context.window.EIKEN_QUIZ_ITEMS||[];
const word=words.find(item=>item.w===targetWord);
const original=bank.find(item=>item.word===targetWord);
if(!word||!original)throw new Error(`Unknown quiz word: ${targetWord}`);

const gradeSchema={
  type:'object',additionalProperties:false,
  properties:{
    collocation:{type:'integer',minimum:0,maximum:25},
    grammar:{type:'integer',minimum:0,maximum:25},
    uniqueness:{type:'integer',minimum:0,maximum:25},
    difficulty:{type:'integer',minimum:0,maximum:25},
    issues:{type:'array',items:{type:'string'}}
  },
  required:['collocation','grammar','uniqueness','difficulty','issues']
};
const questionSchema={
  type:'object',additionalProperties:false,
  properties:{
    sentence:{type:'string'},
    choices:{type:'array',minItems:4,maxItems:4,items:{type:'string'}}
  },
  required:['sentence','choices']
};

function responseText(json){
  if(json.output_text)return json.output_text;
  for(const output of json.output||[])for(const content of output.content||[])if(content.text)return content.text;
  throw new Error('The Responses API returned no text output.');
}
async function structured(name,schema,input){
  const response=await fetch(API_URL,{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:MODEL,input,text:{format:{type:'json_schema',name,strict:true,schema}}})});
  if(!response.ok)throw new Error(`OpenAI API ${response.status}: ${await response.text()}`);
  return JSON.parse(responseText(await response.json()));
}
function candidateText(candidate){return JSON.stringify({word:word.w,meaning:word.m,pos:word.pos||word.p,collocations:word.collocations||[],sentence:candidate.sentence,choices:candidate.choices},null,2)}
async function grade(candidate){
  const result=await structured('eiken_part1_quality',gradeSchema,`You are a strict Eiken Grade 1 Part 1 editor. Grade this vocabulary question. Each category is 0-25. Target a question slightly harder than the real exam. Collocation must be natural, grammar flawless, exactly one choice uniquely correct, and distractors must be plausible without becoming valid answers.\n\n${candidateText(candidate)}`);
  result.total=result.collocation+result.grammar+result.uniqueness+result.difficulty;
  return result;
}
async function regenerate(candidate,quality){
  const samePos=words.filter(item=>(item.pos||item.p)===(word.pos||word.p)&&item.w!==word.w).map(item=>item.w);
  return structured('eiken_part1_question',questionSchema,`Rewrite this Eiken Grade 1 Part 1 vocabulary question because it scored ${quality.total}/100. Fix: ${quality.issues.join('; ')||'raise overall rigor'}. Use exactly one ____ blank. The answer must be ${word.w}. Include the answer and three distractors chosen only from this allowed list: ${samePos.join(', ')}. Make it slightly harder than the real exam, natural, grammatical, and uniquely answerable.\n\nCurrent question:\n${candidateText(candidate)}`);
}

let candidate={sentence:original.sentence,choices:original.choices};
let quality;
let regenerations=0;
while(regenerations<=MAX_REGENERATIONS){
  quality=await grade(candidate);
  if(quality.total>=MIN_SCORE)break;
  if(regenerations===MAX_REGENERATIONS)break;
  candidate=await regenerate(candidate,quality);
  regenerations++;
}
const approved={word:word.w,sentence:candidate.sentence,choices:candidate.choices,quality,model:MODEL,regenerations,approved:quality.total>=MIN_SCORE,checkedAt:new Date().toISOString()};
if(outputPath)fs.writeFileSync(outputPath,JSON.stringify(approved,null,2)+'\n');
console.log(JSON.stringify(approved,null,2));
if(!approved.approved)process.exit(1);
