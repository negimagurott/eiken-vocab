(function(root,factory){
'use strict';
var api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
else root.EIKEN_QUIZ_QUALITY=api;
})(typeof window!=='undefined'?window:this,function(){
'use strict';
var MIN_SCORE=80,TARGET_DIFFICULTY=88;
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function tokens(sentence){return String(sentence||'').replace('____','').match(/[A-Za-z']+/g)||[]}
function normalized(sentence){return String(sentence||'').toLowerCase().replace(/[^a-z_ ]/g,'').replace(/\s+/g,' ').trim()}
function overlap(a,b){var aa=new Set(tokens(a).filter(function(x){return x.length>3}).map(function(x){return x.toLowerCase()})),bb=new Set(tokens(b).filter(function(x){return x.length>3}).map(function(x){return x.toLowerCase()})),common=0;aa.forEach(function(x){if(bb.has(x))common++});return common/Math.max(1,new Set([].concat(Array.from(aa),Array.from(bb))).size)}
function scoreItem(item,words,items){
  words=words||[];items=items||[];
  var sentence=String(item&&item.sentence||''),choices=Array.isArray(item&&item.choices)?item.choices:[],answer=words.find(function(x){return x.w===item.word}),length=tokens(sentence).length;
  var grammar=0;
  if((sentence.match(/____/g)||[]).length===1)grammar+=10;
  if(/^[A-Z]/.test(sentence)&&/[.!?]$/.test(sentence))grammar+=7;
  if(length>=7&&length<=24)grammar+=8;
  var collocation=12;
  if(length>=9)collocation+=5;
  if(!/\b(thing|things|something|good|bad|very)\b/i.test(sentence))collocation+=4;
  if(/\b(to|of|for|with|into|from|as|about|by|on|at|in)\s+____|____\s+(to|of|for|with|into|from|as|about|by|on|at|in)\b/i.test(sentence))collocation+=4;
  collocation=clamp(collocation,0,25);
  var uniqueness=0,uniqueChoices=new Set(choices);
  if(choices.length===4&&uniqueChoices.size===4&&choices.indexOf(item.word)>=0)uniqueness+=12;
  var candidates=choices.map(function(choice){return words.find(function(x){return x.w===choice})}).filter(Boolean);
  if(answer&&candidates.length===4&&candidates.every(function(x){return(x.pos||x.p)===(answer.pos||answer.p)}))uniqueness+=7;
  var related=answer?[].concat(answer.synonyms||[],answer.antonyms||[]).map(function(x){return String(x).toLowerCase()}):[];
  if(choices.filter(function(x){return x!==item.word}).every(function(x){return related.indexOf(x.toLowerCase())<0}))uniqueness+=6;
  var closeLengths=choices.filter(function(x){return x!==item.word&&Math.abs(x.length-item.word.length)<=3}).length;
  var difficulty=14+Math.min(5,closeLengths*2)+(length>=11?3:0)+(answer&&candidates.length===4&&candidates.every(function(x){return(x.pos||x.p)===(answer.pos||answer.p)})?3:0);
  difficulty=clamp(difficulty,0,25);
  var duplicatePenalty=items.some(function(other){return other!==item&&normalized(other.sentence)===normalized(sentence)})?20:0;
  var total=clamp(grammar+collocation+uniqueness+difficulty-duplicatePenalty,0,100);
  return{collocation:collocation,grammar:grammar,uniqueness:uniqueness,difficulty:difficulty,total:total,passed:total>=MIN_SCORE};
}
function difficultyIndex(score){return clamp(Math.round((score&&score.difficulty||0)*4),0,100)}
return{MIN_SCORE:MIN_SCORE,TARGET_DIFFICULTY:TARGET_DIFFICULTY,scoreItem:scoreItem,difficultyIndex:difficultyIndex};
});
