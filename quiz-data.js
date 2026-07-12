(function(){
'use strict';
var GENERIC_TEMPLATES={
  'The new policy could ____ efforts to restore public trust.':true,
  'Independent investigators tried to ____ the claim before the report was released.':true,
  'Critics warned that officials might ____ the principles they had promised to uphold.':true,
  "Experts described the government's response as ____ during the national debate.":true,
  'The committee rejected what it considered an ____ approach to the problem.':true,
  'Her ____ explanation changed how the public understood the controversy.':true,
  'The report identified ____ as a serious obstacle to lasting reform.':true,
  'Public concern about ____ grew after the investigation.':true,
  'The debate highlighted the social consequences of ____.':true
};
var OVERRIDES={
  malleable:'Unlike brittle alloys, gold is highly ____ and can be shaped without breaking.',
  edify:'The documentary aims to ____ viewers by examining the ethical consequences of the policy.',
  reconcile:'Diplomats struggled to ____ the two countries after decades of hostility.'
};
window.EIKEN_QUIZ_ITEMS=(window.EIKEN_WORDS||[]).filter(function(word){return OVERRIDES[word.w]||!GENERIC_TEMPLATES[word.s]}).map(function(word){return{id:word.w+'-001',word:word.w,sentence:OVERRIDES[word.w]||word.s,source:OVERRIDES[word.w]?'manual-fix':'curated-v1'}});
window.EIKEN_REJECTED_QUIZ_WORDS=(window.EIKEN_WORDS||[]).filter(function(word){return GENERIC_TEMPLATES[word.s]&&!OVERRIDES[word.w]}).map(function(word){return word.w});
})();
