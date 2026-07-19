(function(root,factory){
'use strict';
var api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
else root.EIKEN_QUIZ_QUALITY=api;
})(typeof window!=='undefined'?window:this,function(){
'use strict';
var MIN_SCORE=80,TARGET_DIFFICULTY=88;
var NOUN_CATEGORIES={
  audience:'human',audiences:'human',candidate:'human',candidates:'human',company:'organization',official:'human',officials:'human',opponent:'human',opponents:'human',public:'human',reader:'human',readers:'human',viewer:'human',viewers:'human',witness:'human',witnesses:'human',
  approach:'method',effort:'effort',efforts:'effort',explanation:'communication',material:'material',materials:'material',mind:'mind',minds:'mind',negligence:'act',policy:'policy',policies:'policy',principle:'principle',principles:'principle',progress:'progress',trust:'reputation'
};
var OBJECT_RULES={
  disconcert:{allow:{human:true}},
  bewilder:{allow:{human:true}},
  edify:{allow:{human:true}},
  perplex:{allow:{human:true}},
  reassure:{allow:{human:true}},
  unnerve:{allow:{human:true}},
  unsettle:{allow:{human:true}}
};
var ADJECTIVE_NOUN_RULES={
  culpable:{allow:{human:true,organization:true,act:true}},
  malleable:{allow:{material:true,mind:true}},
  reticent:{allow:{human:true}}
};
var ARTICLE_AN_EXCEPTIONS=/^(?:honest|honor|honour|hour|heir)/i;
var ARTICLE_A_EXCEPTIONS=/^(?:euphem|ewe|euro|one|once|ubiquit|unique|unit|univers|use|user|usual)/i;
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function tokens(sentence){return String(sentence||'').replace('____','').match(/[A-Za-z']+/g)||[]}
function normalized(sentence){return String(sentence||'').toLowerCase().replace(/[^a-z_ ]/g,'').replace(/\s+/g,' ').trim()}
function overlap(a,b){var aa=new Set(tokens(a).filter(function(x){return x.length>3}).map(function(x){return x.toLowerCase()})),bb=new Set(tokens(b).filter(function(x){return x.length>3}).map(function(x){return x.toLowerCase()})),common=0;aa.forEach(function(x){if(bb.has(x))common++});return common/Math.max(1,new Set([].concat(Array.from(aa),Array.from(bb))).size)}
function directObject(sentence,word){
  sentence=String(sentence||'').toLowerCase();word=String(word||'').toLowerCase();
  var marker=sentence.indexOf('____')>=0?'____':'\\b'+word+'(?:s|ed|ing)?\\b';
  var match=sentence.match(new RegExp('(?:'+marker+')\\s+(?:the\\s+|an?\\s+|several\\s+|some\\s+|many\\s+)?([a-z]+)'));
  return match?match[1]:'';
}
function hasObjectSemanticViolation(item){
  var word=String(item&&item.word||'').toLowerCase(),rule=OBJECT_RULES[word],object=directObject(item&&item.sentence,word),category=NOUN_CATEGORIES[object];
  return!!(rule&&category&&!rule.allow[category]);
}
function adjectiveNoun(sentence,word){
  sentence=String(sentence||'').toLowerCase();word=String(word||'').toLowerCase();
  var marker=sentence.indexOf('____')>=0?'____':'\\b'+word+'\\b';
  var match=sentence.match(new RegExp('(?:'+marker+')\\s+([a-z]+)'));
  return match?match[1]:'';
}
function hasAdjectiveNounViolation(item){
  var word=String(item&&item.word||'').toLowerCase(),rule=ADJECTIVE_NOUN_RULES[word],noun=adjectiveNoun(item&&item.sentence,word),category=NOUN_CATEGORIES[noun];
  return!!(rule&&category&&!rule.allow[category]);
}
function expectedArticle(word){
  word=String(word||'').replace(/^[^A-Za-z]+/,'');
  if(!word)return'';
  if(/^[A-Z]{2,}/.test(word))return/^[AEFHILMNORSX]/.test(word)?'an':'a';
  if(ARTICLE_AN_EXCEPTIONS.test(word))return'an';
  if(ARTICLE_A_EXCEPTIONS.test(word))return'a';
  return/^[aeiou]/i.test(word)?'an':'a';
}
function hasArticleViolation(item){
  var sentence=String(item&&item.sentence||''),word=String(item&&item.word||''),match=sentence.match(/\b(a|an)\s+____\b/i);
  return!!(match&&match[1].toLowerCase()!==expectedArticle(word));
}
function hasLogicalViolation(item){
  var sentence=String(item&&item.sentence||'').toLowerCase(),word=String(item&&item.word||'').toLowerCase();
  return word==='reticent'&&/____\s+explanation\b/.test(sentence)&&/\bchanged how\b/.test(sentence);
}
function hasChoiceAmbiguity(item,words){
  words=words||[];
  var answer=words.find(function(x){return x.w===item.word});
  if(!answer)return false;
  var answerRelated=[].concat(answer.synonyms||[]).map(function(x){return String(x).toLowerCase()});
  return(item.choices||[]).some(function(choice){
    if(choice===item.word)return false;
    var candidate=words.find(function(x){return x.w===choice}),candidateRelated=candidate?[].concat(candidate.synonyms||[]).map(function(x){return String(x).toLowerCase()}):[];
    return answerRelated.indexOf(String(choice).toLowerCase())>=0||candidateRelated.indexOf(String(item.word).toLowerCase())>=0;
  });
}
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
  var objectSemanticViolation=hasObjectSemanticViolation(item),adjectiveNounViolation=hasAdjectiveNounViolation(item),articleViolation=hasArticleViolation(item),logicalViolation=hasLogicalViolation(item);
  if(objectSemanticViolation||adjectiveNounViolation||logicalViolation)collocation=0;
  if(articleViolation)grammar=0;
  collocation=clamp(collocation,0,25);
  var uniqueness=0,uniqueChoices=new Set(choices);
  if(choices.length===4&&uniqueChoices.size===4&&choices.indexOf(item.word)>=0)uniqueness+=12;
  var candidates=choices.map(function(choice){return words.find(function(x){return x.w===choice})}).filter(Boolean);
  if(answer&&candidates.length===4&&candidates.every(function(x){return(x.pos||x.p)===(answer.pos||answer.p)}))uniqueness+=7;
  var related=answer?[].concat(answer.synonyms||[],answer.antonyms||[]).map(function(x){return String(x).toLowerCase()}):[];
  if(choices.filter(function(x){return x!==item.word}).every(function(x){return related.indexOf(x.toLowerCase())<0}))uniqueness+=6;
  var choiceAmbiguity=hasChoiceAmbiguity(item,words);
  if(choiceAmbiguity)uniqueness=0;
  var closeLengths=choices.filter(function(x){return x!==item.word&&Math.abs(x.length-item.word.length)<=3}).length;
  var difficulty=14+Math.min(5,closeLengths*2)+(length>=11?3:0)+(answer&&candidates.length===4&&candidates.every(function(x){return(x.pos||x.p)===(answer.pos||answer.p)})?3:0);
  difficulty=clamp(difficulty,0,25);
  var duplicatePenalty=items.some(function(other){return other!==item&&normalized(other.sentence)===normalized(sentence)})?20:0;
  var total=clamp(grammar+collocation+uniqueness+difficulty-duplicatePenalty,0,100);
  var hasViolation=objectSemanticViolation||adjectiveNounViolation||articleViolation||logicalViolation||choiceAmbiguity;
  return{collocation:collocation,grammar:grammar,uniqueness:uniqueness,difficulty:difficulty,total:total,passed:total>=MIN_SCORE&&!hasViolation,objectSemanticViolation:objectSemanticViolation,adjectiveNounViolation:adjectiveNounViolation,articleViolation:articleViolation,logicalViolation:logicalViolation,choiceAmbiguity:choiceAmbiguity};
}
function difficultyIndex(score){return clamp(Math.round((score&&score.difficulty||0)*4),0,100)}
return{MIN_SCORE:MIN_SCORE,TARGET_DIFFICULTY:TARGET_DIFFICULTY,scoreItem:scoreItem,difficultyIndex:difficultyIndex,hasObjectSemanticViolation:hasObjectSemanticViolation,hasAdjectiveNounViolation:hasAdjectiveNounViolation,hasArticleViolation:hasArticleViolation,hasLogicalViolation:hasLogicalViolation,hasChoiceAmbiguity:hasChoiceAmbiguity,expectedArticle:expectedArticle};
});
