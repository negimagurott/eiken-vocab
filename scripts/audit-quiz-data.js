const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
['words.js','words-extra.js','word-details.js','quiz-quality.js','quiz-data.js','quiz-translations.js'].forEach(file=>vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file}));
const words=context.window.EIKEN_WORDS||[];
const items=context.window.EIKEN_QUIZ_ITEMS||[];
const rejected=context.window.EIKEN_REJECTED_QUIZ_WORDS||[];
const translations=context.window.EIKEN_QUIZ_TRANSLATIONS||{};
const qualityApi=context.window.EIKEN_QUIZ_QUALITY;
const errors=[];
const ids=new Set();
const sentences=new Set();
const normalizedItems=[];
items.forEach(item=>{
  if(ids.has(item.id))errors.push(`duplicate id: ${item.id}`);ids.add(item.id);
  if(!words.some(word=>word.w===item.word))errors.push(`unknown word: ${item.word}`);
  if((item.sentence.match(/____/g)||[]).length!==1)errors.push(`blank count: ${item.word}`);
  if(!translations[item.word]||translations[item.word].trim().length<4)errors.push(`missing translation: ${item.word}`);
  const normalized=item.sentence.toLowerCase().replace(/[^a-z_ ]/g,'').replace(/\s+/g,' ').trim();
  if(sentences.has(normalized))errors.push(`duplicate sentence: ${item.word}`);sentences.add(normalized);
  normalizedItems.push({word:item.word,tokens:new Set(normalized.split(' ').filter(token=>token!=='____'&&token.length>2))});
  if(item.choices){
    if(item.choices.length!==4||new Set(item.choices).size!==4)errors.push(`invalid choices: ${item.word}`);
    if(!item.choices.includes(item.word))errors.push(`answer missing from choices: ${item.word}`);
    const answer=words.find(word=>word.w===item.word);
    item.choices.forEach(choice=>{
      const candidate=words.find(word=>word.w===choice);
      if(!candidate)errors.push(`unknown choice ${choice}: ${item.word}`);
      else if(answer&&(answer.pos||answer.p)&&(candidate.pos||candidate.p)!==(answer.pos||answer.p))errors.push(`part of speech mismatch ${choice}: ${item.word}`);
      else if(choice!==item.word&&answer){
        const answerRelated=(answer.synonyms||[]).map(value=>value.toLowerCase()),candidateRelated=(candidate.synonyms||[]).map(value=>value.toLowerCase());
        if(answerRelated.includes(choice.toLowerCase())||candidateRelated.includes(item.word.toLowerCase()))errors.push(`synonym used as distractor ${choice}: ${item.word}`);
      }
    });
  }
  if(!item.quality||item.quality.total<80)errors.push(`quality below 80: ${item.word}`);
  const filled=item.sentence.replace('____',item.word);
  for(const match of filled.matchAll(/\b(a|an)\s+([A-Za-z][A-Za-z'-]*)/g)){
    if(qualityApi&&match[1]!==qualityApi.expectedArticle(match[2]))errors.push(`article mismatch (${match[0]}): ${item.word}`);
  }
});
for(let i=0;i<normalizedItems.length;i++)for(let j=i+1;j<normalizedItems.length;j++){
  const a=normalizedItems[i],b=normalizedItems[j],intersection=[...a.tokens].filter(token=>b.tokens.has(token)).length,union=new Set([...a.tokens,...b.tokens]).size;
  if(union&&intersection/union>=0.9)errors.push(`near-duplicate sentences: ${a.word}, ${b.word}`);
}
const required={
  malleable:'Unlike brittle alloys, gold is highly ____ and can be shaped without breaking.',
  edify:'The documentary aims to ____ viewers by examining the ethical consequences of the policy.',
  reconcile:'Diplomats struggled to ____ the two countries after decades of hostility.',
  construe:'Courts should not automatically ____ a suspect\'s silence as an admission of guilt.',
  disconcert:'The moderator\'s unexpected question appeared to ____ the candidate, who paused visibly and struggled to regain his composure.'
};
Object.entries(required).forEach(([word,sentence])=>{
  const item=items.find(candidate=>candidate.word===word);
  if(!item||item.sentence!==sentence)errors.push(`acceptance case failed: ${word}`);
});
const disconcertNg={word:'disconcert',sentence:'The new policy could ____ efforts to restore public trust.',choices:['disconcert','discredit','denigrate','dissuade']};
const disconcertOk={word:'disconcert',sentence:'The moderator\'s unexpected question appeared to ____ the candidate, who paused visibly and struggled to regain his composure.',choices:['disconcert','discredit','denigrate','dissuade']};
if(!qualityApi.hasObjectSemanticViolation(disconcertNg)||qualityApi.scoreItem(disconcertNg,words,[]).passed)errors.push('NG collocation accepted: disconcert efforts');
if(qualityApi.hasObjectSemanticViolation(disconcertOk)||!qualityApi.scoreItem(disconcertOk,words,[]).passed)errors.push('natural collocation rejected: disconcert a candidate');
const displayedDisconcert=disconcertOk.sentence.replace('____',disconcertOk.word);
if(displayedDisconcert!=="The moderator's unexpected question appeared to disconcert the candidate, who paused visibly and struggled to regain his composure.")errors.push('flashcard display regression: disconcert');
const negativeCases=[
  ['disconcert efforts','hasObjectSemanticViolation',{word:'disconcert',sentence:'The new policy could ____ efforts to restore public trust.'}],
  ['reticent explanation','hasAdjectiveNounViolation',{word:'reticent',sentence:'Her ____ explanation changed how the public understood the controversy.'}],
  ['culpable approach','hasAdjectiveNounViolation',{word:'culpable',sentence:'The committee rejected what it considered a ____ approach.'}],
  ['an culpable','hasArticleViolation',{word:'culpable',sentence:'The committee rejected an ____ official.'}],
  ['malleable explanation','hasAdjectiveNounViolation',{word:'malleable',sentence:'Her ____ explanation changed the committee\'s view.'}],
  ['edify principles','hasObjectSemanticViolation',{word:'edify',sentence:'Officials might ____ the principles they promised to uphold.'}],
  ['reticent causal contradiction','hasLogicalViolation',{word:'reticent',sentence:'Her ____ explanation changed how the public understood the controversy.'}]
];
negativeCases.forEach(([label,method,item])=>{if(!qualityApi[method](item))errors.push(`NG case accepted: ${label}`)});
const positiveCases=[
  ['disconcert the candidate','hasObjectSemanticViolation',{word:'disconcert',sentence:'The question may ____ the candidate.'}],
  ['disconcerted the audience','hasObjectSemanticViolation',{word:'disconcert',sentence:'The interruption disconcerted the audience.'}],
  ['remain reticent','hasAdjectiveNounViolation',{word:'reticent',sentence:'The minister chose to remain ____.'}],
  ['a reticent witness','hasAdjectiveNounViolation',{word:'reticent',sentence:'Prosecutors questioned a ____ witness.'}],
  ['culpable negligence','hasAdjectiveNounViolation',{word:'culpable',sentence:'The report documented ____ negligence.'}],
  ['hold the company culpable','hasAdjectiveNounViolation',{word:'culpable',sentence:'The court may hold the company ____.'}],
  ['a culpable official','hasAdjectiveNounViolation',{word:'culpable',sentence:'Investigators identified a ____ official.'}],
  ['malleable material','hasAdjectiveNounViolation',{word:'malleable',sentence:'Gold is a ____ material.'}],
  ['a malleable young mind','hasAdjectiveNounViolation',{word:'malleable',sentence:'Propaganda can influence a ____ young mind.'}],
  ['edify viewers','hasObjectSemanticViolation',{word:'edify',sentence:'The documentary aims to ____ viewers.'}],
  ['edify the public','hasObjectSemanticViolation',{word:'edify',sentence:'Museums can ____ the public.'}],
  ['lucid explanation','hasAdjectiveNounViolation',{word:'lucid',sentence:'She gave a ____ explanation.'}],
  ['circumspect response','hasAdjectiveNounViolation',{word:'circumspect',sentence:'The minister gave a ____ response.'}]
];
positiveCases.forEach(([label,method,item])=>{if(qualityApi[method](item))errors.push(`natural case rejected: ${label}`)});
if(qualityApi.expectedArticle('honest')!=='an'||qualityApi.expectedArticle('university')!=='a'||qualityApi.expectedArticle('euphemism')!=='a')errors.push('article pronunciation exceptions failed');
const ambiguityWords=[{w:'edify',synonyms:['educate']},{w:'educate',synonyms:['edify']},{w:'alienate',synonyms:[]},{w:'appease',synonyms:[]}];
const ambiguous={word:'edify',sentence:'The lecture aims to ____ the public.',choices:['edify','educate','alienate','appease']};
if(!qualityApi.hasChoiceAmbiguity(ambiguous,ambiguityWords)||qualityApi.scoreItem(ambiguous,ambiguityWords,[]).passed)errors.push('synonymous distractor accepted');
const unsyncedExamples=items.filter(item=>{const word=words.find(candidate=>candidate.w===item.word);return!word||word.s!==item.sentence});
if(unsyncedExamples.length)errors.push(`word list examples not synchronized: ${unsyncedExamples.map(item=>item.word).join(', ')}`);
console.log(JSON.stringify({vocabulary:words.length,approved:items.length,fixedChoiceSets:items.filter(item=>item.choices).length,translations:Object.keys(translations).length,rejected:rejected.length,errors:errors.length},null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
