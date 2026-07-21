const fs=require('fs');
const vm=require('vm');
const grammar=require('../grammar-inflection.js');

const cases=[
  ['passive coordination','Students may be mocked or ____ by their peers.','ostracize','v','Students may be mocked or ostracized by their peers.','past-participle'],
  ['passive irregular','The report was ____ by the committee.','write','v','The report was written by the committee.','past-participle'],
  ['passive modal be','The rule can be ____ without notice.','change','v','The rule can be changed without notice.','past-participle'],
  ['passive perfect','The rule has been ____ twice.','change','v','The rule has been changed twice.','past-participle'],
  ['passive progressive','The rule is being ____ now.','change','v','The rule is being changed now.','past-participle'],
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
if(grammar.inflect('ostracize',grammar.inferForm(ostracize.sentence,ostracizeWord.pos||ostracizeWord.p))!=='ostracized')errors.push('ostracize passive choice display is not inflected');

const passiveItems=items.filter(item=>{
  const word=words.find(candidate=>candidate.w===item.word);
  return word&&grammar.inferForm(item.sentence,word.pos||word.p)==='past-participle';
});
passiveItems.forEach(item=>item.choices.forEach(choice=>{
  const candidate=words.find(word=>word.w===choice),pos=candidate&&(candidate.pos||candidate.p);
  if(!candidate||!(pos==='v'||pos==='verb'))return;
  const displayed=grammar.inflect(choice,'past-participle'),completion=grammar.completeSentence(item.sentence,choice,pos);
  if(!completion.valid||completion.form!=='past-participle'||completion.answer!==displayed)errors.push(`${item.word}/${choice}: invalid passive choice display`);
}));

const app=fs.readFileSync('app.js','utf8');
if(!/data-choice="'\+esc\(o\)\+'"/.test(app))errors.push('quiz choices no longer map clicks to base vocabulary entries');
if(!/esc\(choiceDisplay\(x,o\)\)/.test(app))errors.push('quiz choices do not render the contextual display form');

console.log(JSON.stringify({regressionCases:cases.length,approvedSentences:items.length,passiveQuestions:passiveItems.length,errors:errors.length},null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
