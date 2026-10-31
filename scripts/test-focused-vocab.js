const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.createContext(context);
['words.js','words-extra.js','vocab-expansion.js','focused-vocab.js','word-details.js','quiz-quality.js','quiz-data.js','quiz-translations.js'].forEach(file=>vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file}));
const {EIKEN_WORDS:words,EIKEN_EXAMPLE_LIBRARY:items,EIKEN_QUIZ_TRANSLATIONS:translations}=context.window;
assert.equal(words.length,768);assert.equal(new Set(words.map(x=>x.w)).size,768);assert.equal(items.length,768);
assert.equal(words.filter(x=>x.focusReview).length,132);
for(const word of words){assert(!word.examRefs);assert(items.some(x=>x.word===word.w));assert(translations[word.w]);}
assert(!context.window.EIKEN_EXAM_REVIEWS);
const moduleSource=fs.readFileSync('focused-vocab.js','utf8');
assert(!/originalChoices|sourceUrl|RECORDS|202[56]-[12]/.test(moduleSource));
const index=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
assert(index.indexOf('focused-vocab.js')<index.indexOf('quiz-data.js'));
assert(sw.includes("'./focused-vocab.js?v='+RELEASE"));
console.log('768 quiz entries, 132 focus words, and absence of exam-history metadata verified');
// Exercise the real Word List renderer with a small DOM stand-in.
const elements={search:{value:''},focusReviewFilter:{checked:false}};
function element(){return{children:[],_text:'',set textContent(v){this._text=v;this.children=[]},get textContent(){return this._text},appendChild(x){this.children.push(x);return x},setAttribute(){},addEventListener(){}}}
elements.wordBox=element();
const renderContext={WORDS:words,state:{stats:{}},$:id=>elements[id],document:{createElement:element,createTextNode:text=>({textContent:text})},reviewLabel:()=>'',posLabel:x=>x.pos||x.p,completedSentence:x=>x.s, listText:a=>a.join(' / '),speak:()=>{},appendText:(parent,tag,text)=>{const child=element();child.textContent=text;parent.appendChild(child);return child}};
const app=fs.readFileSync('app.js','utf8');vm.runInNewContext(app.slice(app.indexOf('function renderWords(){'),app.indexOf('function switchTab(')),renderContext);
renderContext.renderWords();assert.equal(elements.wordBox.children.length,768);
elements.focusReviewFilter.checked=true;renderContext.renderWords();assert.equal(elements.wordBox.children.length,132);
elements.search.value='epitaph';renderContext.renderWords();assert.equal(elements.wordBox.children.length,1);
elements.search.value='not-a-vocabulary-word';renderContext.renderWords();assert.equal(elements.wordBox.children.length,0);
console.log('Word List filtering and word search verified');
