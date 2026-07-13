const fs=require('fs');
const vm=require('vm');

const context={window:{}};
vm.createContext(context);
['words.js','words-extra.js','word-details.js'].forEach(file=>vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file}));

const words=context.window.EIKEN_WORDS||[];
const bannedPatterns=[
  /^response as /i,
  /^the government's response as /i,
  /^her .+ explanation changed/i,
  /^officials might .+ the principles/i,
  /^warned that officials might .+ the principles/i,
  /^policy could .+ efforts to/i,
  /^the new policy could .+ efforts to/i,
  /^tried to .+ the claim/i,
  /^independent investigators tried to .+ the claim/i,
  /^concern about .+ grew after/i,
  /^public concern about .+ grew after/i,
  /^consequences of /i,
  /^the social consequences of /i
];
const errors=[];

words.forEach(word=>{
  const label=word.w;
  const collocations=word.collocations||[];
  const synonyms=word.synonyms||[];
  const antonyms=word.antonyms||[];
  if(collocations.length<3||collocations.length>5)errors.push(`${label}: collocations must contain 3–5 items`);
  if(new Set(collocations.map(value=>value.toLowerCase())).size!==collocations.length)errors.push(`${label}: duplicate collocation`);
  collocations.forEach(value=>{
    if(value.trim().split(/\s+/).length<2)errors.push(`${label}: collocation is too short (${value})`);
    if(bannedPatterns.some(pattern=>pattern.test(value)))errors.push(`${label}: generated template detected (${value})`);
  });
  if(synonyms.length<2)errors.push(`${label}: fewer than two synonyms`);
  if(!antonyms.length)errors.push(`${label}: missing antonym field`);
});

console.log(JSON.stringify({vocabulary:words.length,errors:errors.length},null,2));
if(errors.length){
  console.error(errors.join('\n'));
  process.exit(1);
}
