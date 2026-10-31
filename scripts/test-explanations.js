const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.createContext(context);
['words.js','words-extra.js','vocab-expansion.js','focused-vocab.js','word-details.js','quiz-quality.js','quiz-data.js','quiz-translations.js','question-explanations.js'].forEach(file=>vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file}));
const {EIKEN_WORDS:words,EIKEN_EXAMPLE_LIBRARY:items,EIKEN_QUESTION_EXPLANATIONS:bank}=context.window;
assert.equal(items.length,768);assert.equal(Object.keys(bank).length,768);
const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const app=fs.readFileSync('app.js','utf8'),html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
const render={window:context.window,state:{answers:{}},esc:s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))};
vm.runInNewContext(app.slice(app.indexOf('function findExplanation('),app.indexOf('function syncCardHeight(')),render);
let pairs=0;
for(const q of items){
 const entry=bank[q.word],x={w:q.word,s:q.sentence};
 assert.equal(entry.sentence,q.sentence);assert.deepEqual(Array.from(entry.choices).sort(),Array.from(q.choices).sort());
 assert(entry.clues.length);for(const clue of entry.clues)assert(normalize(q.sentence).includes(normalize(clue)),q.word+': ungrounded clue');
 assert(entry.reason.length>=10);assert.equal(Object.keys(entry.contrasts).length,3);
 const reversed=Array.from(q.choices).reverse();assert(render.findExplanation(x,reversed));
 for(const wrong of q.choices.filter(w=>w!==q.word)){
  const comparison=entry.contrasts[wrong];assert(comparison&&comparison.text.length>=30);assert(comparison.text.includes(wrong));
  assert(!/意味の方向が異なります|品詞は同じでも/.test(comparison.text));
  render.state.answers[q.word]=wrong;const result=render.answerReason(x,reversed);
  assert(result.includes('選んだ語との違い（'+wrong+'）'));assert(result.includes(render.esc(comparison.text)));assert(result.includes('ほかの選択肢との違い（2語）'));pairs++;
 }
 render.state.answers[q.word]=q.word;const correct=render.answerReason(x,reversed);assert(!correct.includes('selected-miss'));assert(correct.includes('ほかの選択肢との違い（3語）'));
 assert(!render.findExplanation({...x,s:x.s+' changed'},reversed));
 assert(!render.findExplanation(x,[q.word,'invalid','options','set']));
}
assert.equal(pairs,2304);
assert(!render.findExplanation({w:'not-in-bank',s:''},[]));
const original=bank.intransigent.reason;bank.intransigent.reason='<img src=x onerror=alert(1)>';
const escaped=render.answerReason({w:'intransigent',s:bank.intransigent.sentence},Array.from(bank.intransigent.choices));
assert(!escaped.includes('<img'));assert(escaped.includes('&lt;img'));bank.intransigent.reason=original;
assert(html.indexOf('question-explanations.js')<html.indexOf('app.js'));assert(sw.includes("'./question-explanations.js?v='+RELEASE"));
assert(bank.intransigent.contrasts.equivocal.text.includes('明確に拒否'));
const obdurate=items.find(x=>x.word==='obdurate');assert(!obdurate.choices.includes('heedless'));
const ramification=items.find(x=>x.word==='ramification');assert(ramification.sentence.includes('a serious ____'));
assert(context.window.EIKEN_QUIZ_TRANSLATIONS.intransigent.includes('監査'));
console.log('768 contextual rationales, 2304 comparisons, all answer paths, cache mismatch rejection and HTML escaping passed');
