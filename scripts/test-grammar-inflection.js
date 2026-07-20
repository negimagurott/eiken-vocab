const fs=require('fs');
const vm=require('vm');
const grammar=require('../grammar-inflection.js');

const cases=[
  ['passive coordination','Students may be mocked or ____ by their peers.','ostracize','v','Students may be mocked or ostracized by their peers.','past-participle'],
  ['passive irregular','The report was ____ by the committee.','write','v','The report was written by the committee.','past-participle'],
  ['present plural','They ____ the group every week.','challenge','v','They challenge the group every week.','present'],
  ['past tense','Last year, they ____ the group.','challenge','v','Last year, they challenged the group.','past'],
  ['past marker after blank','She ____ the group yesterday.','challenge','v','She challenged the group yesterday.','past'],
  ['past irregular','She ____ abroad last year.','go','v','She went abroad last year.','past'],
  ['third-person singular','She ____ the group every week.','challenge','v','She challenges the group every week.','third-person-singular'],
  ['gerund','She is ____ the decision.','challenge','v','She is challenging the decision.','gerund'],
  ['infinitive','She wants to ____ the decision.','challenge','v','She wants to challenge the decision.','infinitive'],
  ['modal base','She may ____ the decision.','challenge','v','She may challenge the decision.','base'],
  ['non-verb unchanged','They live in ____ poverty.','abject','a','They live in abject poverty.','unchanged']
];
const errors=[];
cases.forEach(([name,sentence,word,pos,expected,expectedForm])=>{
  const result=grammar.completeSentence(sentence,word,pos);
  if(!result.valid||result.text!==expected||result.form!==expectedForm)errors.push(`${name}: ${JSON.stringify(result)}`);
});
const rejectedBarePassive=grammar.checkCompletedSentence('Students may be mocked or ____ by their peers.','ostracize','v','Students may be mocked or ostracize by their peers.');
if(rejectedBarePassive.valid)errors.push('grammar checker accepted an uninflected passive verb');

const context={window:{}};
vm.createContext(context);
['words.js','words-extra.js','word-details.js','quiz-quality.js','quiz-data.js'].forEach(file=>vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file}));
const words=context.window.EIKEN_WORDS||[];
const items=context.window.EIKEN_EXAMPLE_LIBRARY||[];
items.forEach(item=>{
  const word=words.find(candidate=>candidate.w===item.word);
  const result=grammar.completeSentence(item.sentence,item.word,word&&(word.pos||word.p));
  if(!result.valid)errors.push(`${item.word}: ${result.errors.join(', ')}`);
});
const ostracize=items.find(item=>item.word==='ostracize');
const ostracizeWord=words.find(word=>word.w==='ostracize');
const ostracizeResult=grammar.completeSentence(ostracize.sentence,ostracize.word,ostracizeWord.pos||ostracizeWord.p);
if(ostracizeResult.text!=='Students who challenge the group may be mocked or ostracized by their peers.')errors.push(`ostracize regression: ${ostracizeResult.text}`);

console.log(JSON.stringify({regressionCases:cases.length,approvedSentences:items.length,errors:errors.length},null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
