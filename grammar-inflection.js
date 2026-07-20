(function(root,factory){
'use strict';
var api=factory();
if(typeof module==='object'&&module.exports)module.exports=api;
if(root)root.EIKEN_GRAMMAR=api;
})(typeof window!=='undefined'?window:null,function(){
'use strict';

var IRREGULAR_PAST={
  arise:'arose',be:'was',bear:'bore',beat:'beat',become:'became',begin:'began',bend:'bent',bet:'bet',bind:'bound',bite:'bit',bleed:'bled',blow:'blew',break:'broke',bring:'brought',build:'built',buy:'bought',catch:'caught',choose:'chose',come:'came',cost:'cost',cut:'cut',deal:'dealt',dig:'dug',do:'did',draw:'drew',drink:'drank',drive:'drove',eat:'ate',fall:'fell',feed:'fed',feel:'felt',fight:'fought',find:'found',flee:'fled',fly:'flew',forget:'forgot',forgive:'forgave',freeze:'froze',get:'got',give:'gave',go:'went',grow:'grew',hang:'hung',have:'had',hear:'heard',hide:'hid',hit:'hit',hold:'held',keep:'kept',know:'knew',lead:'led',leave:'left',lend:'lent',let:'let',lie:'lay',lose:'lost',make:'made',mean:'meant',meet:'met',pay:'paid',put:'put',read:'read',ride:'rode',ring:'rang',rise:'rose',run:'ran',say:'said',see:'saw',seek:'sought',sell:'sold',send:'sent',set:'set',shake:'shook',shoot:'shot',show:'showed',shut:'shut',sing:'sang',sink:'sank',sit:'sat',sleep:'slept',speak:'spoke',spend:'spent',stand:'stood',steal:'stole',stick:'stuck',strike:'struck',swim:'swam',take:'took',teach:'taught',tear:'tore',tell:'told',think:'thought',throw:'threw',understand:'understood',wake:'woke',wear:'wore',win:'won',withstand:'withstood',write:'wrote'
};
var IRREGULAR_PARTICIPLE={
  arise:'arisen',be:'been',bear:'borne',beat:'beaten',become:'become',begin:'begun',bend:'bent',bet:'bet',bind:'bound',bite:'bitten',bleed:'bled',blow:'blown',break:'broken',bring:'brought',build:'built',buy:'bought',catch:'caught',choose:'chosen',come:'come',cost:'cost',cut:'cut',deal:'dealt',dig:'dug',do:'done',draw:'drawn',drink:'drunk',drive:'driven',eat:'eaten',fall:'fallen',feed:'fed',feel:'felt',fight:'fought',find:'found',flee:'fled',fly:'flown',forget:'forgotten',forgive:'forgiven',freeze:'frozen',get:'gotten',give:'given',go:'gone',grow:'grown',hang:'hung',have:'had',hear:'heard',hide:'hidden',hit:'hit',hold:'held',keep:'kept',know:'known',lead:'led',leave:'left',lend:'lent',let:'let',lie:'lain',lose:'lost',make:'made',mean:'meant',meet:'met',pay:'paid',put:'put',read:'read',ride:'ridden',ring:'rung',rise:'risen',run:'run',say:'said',see:'seen',seek:'sought',sell:'sold',send:'sent',set:'set',shake:'shaken',shoot:'shot',show:'shown',shut:'shut',sing:'sung',sink:'sunk',sit:'sat',sleep:'slept',speak:'spoken',spend:'spent',stand:'stood',steal:'stolen',stick:'stuck',strike:'struck',swim:'swum',take:'taken',teach:'taught',tear:'torn',tell:'told',think:'thought',throw:'thrown',understand:'understood',wake:'woken',wear:'worn',win:'won',withstand:'withstood',write:'written'
};
var DOUBLE_FINAL={admit:1,commit:1,compel:1,confer:1,defer:1,emit:1,incur:1,occur:1,omit:1,permit:1,plan:1,prefer:1,propel:1,refer:1,regret:1,repel:1,stop:1,submit:1,transfer:1};
var MODALS={can:1,could:1,may:1,might:1,must:1,shall:1,should:1,will:1,would:1};
var BE_FORMS={am:1,is:1,are:1,was:1,were:1,be:1,been:1,being:1};
var HAVE_FORMS={have:1,has:1,had:1};

function cleanWord(value){return String(value||'').toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,'')}
function regularPast(lemma){
  if(/e$/.test(lemma))return lemma+'d';
  if(/[^aeiou]y$/.test(lemma))return lemma.slice(0,-1)+'ied';
  if(DOUBLE_FINAL[lemma]||(/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(lemma)&&lemma.length<=4))return lemma+lemma.slice(-1)+'ed';
  return lemma+'ed';
}
function past(lemma){return IRREGULAR_PAST[lemma]||regularPast(lemma)}
function pastParticiple(lemma){return IRREGULAR_PARTICIPLE[lemma]||regularPast(lemma)}
function thirdPerson(lemma){
  if(lemma==='be')return'is';if(lemma==='have')return'has';if(lemma==='do')return'does';
  if(/[^aeiou]y$/.test(lemma))return lemma.slice(0,-1)+'ies';
  if(/(?:s|x|z|ch|sh|o)$/.test(lemma))return lemma+'es';
  return lemma+'s';
}
function gerund(lemma){
  if(lemma==='be')return'being';
  if(/ie$/.test(lemma))return lemma.slice(0,-2)+'ying';
  if(/e$/.test(lemma)&&!/(?:ee|ye|oe)$/.test(lemma))return lemma.slice(0,-1)+'ing';
  if(DOUBLE_FINAL[lemma]||(/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(lemma)&&lemma.length<=4))return lemma+lemma.slice(-1)+'ing';
  return lemma+'ing';
}
function isParticipleLike(word){return/(?:ed|en|wn|ung|unk|ought|aught|ilt|elt|ent|pt|orn|ound|un|ade|one|ood|old|ost|aid|een|eft|eld|id|it|ot|sat|set|stood|told|torn|written)$/i.test(word)}
function lastToken(text){var tokens=String(text||'').match(/[A-Za-z']+/g)||[];return cleanWord(tokens[tokens.length-1])}
function previousToken(text){var tokens=String(text||'').match(/[A-Za-z']+/g)||[];return cleanWord(tokens[tokens.length-2])}
function hasPastMarker(text){return/(?:\byesterday\b|\blast\s+(?:night|week|month|year|spring|summer|autumn|fall|winter)\b|\bago\b|\bin\s+(?:19|20)\d{2}\b|\bformerly\b|\bpreviously\b)/i.test(text)}
function passiveCoordination(left,right){
  if(/^\s*by\b/i.test(right))return true;
  var match=String(left||'').match(/([A-Za-z]+)\s+(?:or|and)\s*$/i);
  return !!(match&&isParticipleLike(match[1])&&/(?:\bam|\bis|\bare|\bwas|\bwere|\bbe|\bbeen|\bbeing)\b/i.test(left));
}
function subjectNumber(left){
  var clause=String(left||'').split(/[.!?;:]|\b(?:although|because|while|when|if|that)\b/i).pop().replace(/,.*$/,'').trim();
  var words=(clause.match(/[A-Za-z']+/g)||[]).map(cleanWord),joined=' '+words.join(' ')+' ';
  if(/\b(?:he|she|it|this|that|each|everyone|everybody|someone|somebody|anyone|anybody|nobody|neither|either)\b/.test(joined))return'singular';
  if(/\b(?:i|you|we|they|these|those)\b/.test(joined))return'plural';
  var last=words[words.length-1]||'';
  if(/s$/.test(last)&&!/(?:ss|us|is)$/.test(last))return'plural';
  if(words.length&&/^(?:a|an|the|this|that|each|every)$/.test(words[0]))return'singular';
  return'unknown';
}
function inferForm(sentence,partOfSpeech){
  if(partOfSpeech&&partOfSpeech!=='v'&&partOfSpeech!=='verb')return'unchanged';
  var parts=String(sentence||'').split('____');if(parts.length!==2)return'unchanged';
  var left=parts[0],right=parts[1],last=lastToken(left),previous=previousToken(left);
  if(passiveCoordination(left,right))return'past-participle';
  if(last==='to')return'infinitive';
  if(MODALS[last]||last==='do'||last==='does'||last==='did')return'base';
  if(HAVE_FORMS[last])return'past-participle';
  if(BE_FORMS[last]){
    if(/^\s*by\b/i.test(right)||/^\s*(?:[.!?]|$)/.test(right))return'past-participle';
    return'gerund';
  }
  if(/^(?:or|and)$/.test(last)&&BE_FORMS[previous])return'past-participle';
  if(/^(?:by|without|after|before|upon)$/.test(last))return'gerund';
  if(hasPastMarker(left+' '+right))return'past';
  return subjectNumber(left)==='singular'?'third-person-singular':'present';
}
function inflect(lemma,form){
  lemma=cleanWord(lemma);
  if(form==='past')return past(lemma);
  if(form==='past-participle')return pastParticiple(lemma);
  if(form==='third-person-singular')return thirdPerson(lemma);
  if(form==='gerund')return gerund(lemma);
  return lemma;
}
function checkCompletedSentence(template,lemma,partOfSpeech,text){
  var form=inferForm(template,partOfSpeech),answer=form==='unchanged'?String(lemma||''):inflect(lemma,form),errors=[],blankCount=(String(template||'').match(/____/g)||[]).length;
  if(blankCount!==1)errors.push('sentence must contain exactly one blank');
  if(String(text||'').indexOf('____')>=0)errors.push('completed sentence still contains a blank');
  if(blankCount===1&&text!==String(template).replace('____',answer))errors.push('completed sentence differs from the validated inflection');
  if((partOfSpeech==='v'||partOfSpeech==='verb')&&answer!==inflect(lemma,form))errors.push('verb form does not match sentence context');
  return{valid:errors.length===0,errors:errors,form:form,answer:answer,text:text};
}
function completeSentence(template,lemma,partOfSpeech){
  var form=inferForm(template,partOfSpeech),answer=form==='unchanged'?String(lemma||''):inflect(lemma,form),text=String(template||'').replace('____',answer);
  return checkCompletedSentence(template,lemma,partOfSpeech,text);
}
return{completeSentence:completeSentence,checkCompletedSentence:checkCompletedSentence,inferForm:inferForm,inflect:inflect};
});
