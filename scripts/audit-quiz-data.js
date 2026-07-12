const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
['words.js','words-extra.js','quiz-data.js'].forEach(file=>vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file}));
const words=context.window.EIKEN_WORDS||[];
const items=context.window.EIKEN_QUIZ_ITEMS||[];
const rejected=context.window.EIKEN_REJECTED_QUIZ_WORDS||[];
const errors=[];
const ids=new Set();
const sentences=new Set();
items.forEach(item=>{
  if(ids.has(item.id))errors.push(`duplicate id: ${item.id}`);ids.add(item.id);
  if(!words.some(word=>word.w===item.word))errors.push(`unknown word: ${item.word}`);
  if((item.sentence.match(/____/g)||[]).length!==1)errors.push(`blank count: ${item.word}`);
  const normalized=item.sentence.toLowerCase().replace(/[^a-z_ ]/g,'').replace(/\s+/g,' ').trim();
  if(sentences.has(normalized))errors.push(`duplicate sentence: ${item.word}`);sentences.add(normalized);
  if(item.choices){
    if(item.choices.length!==4||new Set(item.choices).size!==4)errors.push(`invalid choices: ${item.word}`);
    if(!item.choices.includes(item.word))errors.push(`answer missing from choices: ${item.word}`);
    const answer=words.find(word=>word.w===item.word);
    item.choices.forEach(choice=>{
      const candidate=words.find(word=>word.w===choice);
      if(!candidate)errors.push(`unknown choice ${choice}: ${item.word}`);
      else if(answer&&answer.p&&candidate.p!==answer.p)errors.push(`part of speech mismatch ${choice}: ${item.word}`);
    });
  }
});
const required={
  malleable:'Unlike brittle alloys, gold is highly ____ and can be shaped without breaking.',
  edify:'The documentary aims to ____ viewers by examining the ethical consequences of the policy.',
  reconcile:'Diplomats struggled to ____ the two countries after decades of hostility.'
};
Object.entries(required).forEach(([word,sentence])=>{
  const item=items.find(candidate=>candidate.word===word);
  if(!item||item.sentence!==sentence)errors.push(`acceptance case failed: ${word}`);
});
['construe'].forEach(word=>{if(items.some(item=>item.word===word))errors.push(`unreviewed problem approved: ${word}`)});
console.log(JSON.stringify({vocabulary:words.length,approved:items.length,fixedChoiceSets:items.filter(item=>item.choices).length,rejected:rejected.length,errors:errors.length},null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
