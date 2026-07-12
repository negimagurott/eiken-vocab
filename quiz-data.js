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
  abdicate:{sentence:'The board accused the CEO of trying to ____ responsibility for the failed merger.',choices:['abdicate','ascertain','articulate','appease']},
  abhor:{sentence:'Many citizens ____ the use of torture under any circumstances.',choices:['abhor','appease','amalgamate','admonish']},
  abject:{sentence:'The displaced families were living in ____ poverty after the conflict.',choices:['abject','affluent','arcane','adroit']},
  abrogate:{sentence:'The new administration threatened to ____ the treaty without consulting its allies.',choices:['abrogate','amalgamate','articulate','ascertain']},
  accolade:{sentence:'For the young scientist, the international prize was the highest ____ of her career.',choices:['accolade','alacrity','animosity','anachronism']},
  acquiesce:{sentence:'After months of resistance, the board finally agreed to ____ to the shareholders\' demands.',choices:['acquiesce','appease','articulate','ascertain']},
  admonish:{sentence:'The judge had to ____ the attorney for repeatedly interrupting the witness.',choices:['admonish','abhor','aggrandize','alienate']},
  adroit:{sentence:'Her ____ handling of the negotiations prevented a costly strike.',choices:['adroit','affable','ambivalent','arduous']},
  affable:{sentence:'Despite his senior position, the professor remained ____ and easy to approach.',choices:['affable','arcane','apprehensive','abject']},
  affluent:{sentence:'The tax incentive disproportionately benefited ____ households in the capital.',choices:['affluent','abject','arduous','ambivalent']},
  aggrandize:{sentence:'Critics accused the leader of using the emergency to ____ his own power.',choices:['aggrandize','abdicate','abrogate','amalgamate']},
  alacrity:{sentence:'She accepted the difficult overseas assignment with surprising ____.',choices:['alacrity','accolade','animosity','antipathy']},
  alienate:{sentence:'The candidate\'s harsh rhetoric may ____ moderate voters.',choices:['alienate','appease','admonish','articulate']},
  amalgamate:{sentence:'The proposal would ____ the two regional agencies into a single authority.',choices:['amalgamate','alienate','appease','aggrandize']},
  ambivalent:{sentence:'Seeing both compelling benefits and serious risks, voters remained ____ about the proposal.',choices:['ambivalent','affable','adroit','arcane']},
  amenable:{sentence:'The committee proved ____ to revising the regulations after hearing expert testimony.',choices:['amenable','affluent','arduous','abject']},
  anachronism:{sentence:'In an era of instant digital communication, the fax machine can seem like an ____.',choices:['anachronism','accolade','alacrity','animosity']},
  animosity:{sentence:'Years of territorial disputes fueled deep ____ between the neighboring states.',choices:['animosity','accolade','alacrity','anachronism']},
  antipathy:{sentence:'The journalist made no attempt to conceal her ____ toward political corruption.',choices:['antipathy','accolade','alacrity','anachronism']},
  appease:{sentence:'The government offered limited concessions to ____ the angry protesters.',choices:['appease','admonish','articulate','ascertain']},
  apprehensive:{sentence:'Investors were ____ about entering a market with such unstable regulations.',choices:['apprehensive','affable','adroit','affluent']},
  arcane:{sentence:'Only a handful of specialists understood the ____ provisions of the tax code.',choices:['arcane','affable','affluent','ambivalent']},
  arduous:{sentence:'Restoring the polluted wetland proved to be an ____ task.',choices:['arduous','affable','affluent','ambivalent']},
  articulate:{sentence:'Each candidate must ____ a coherent plan for reducing public debt.',choices:['articulate','ascertain','appease','amalgamate']},
  ascertain:{sentence:'Investigators worked to ____ whether the safety records had been falsified.',choices:['ascertain','admonish','alienate','appease']},
  malleable:{sentence:'Unlike brittle alloys, gold is highly ____ and can be shaped without breaking.',choices:['malleable','affluent','arcane','apprehensive']},
  edify:{sentence:'The documentary aims to ____ viewers by examining the ethical consequences of the policy.',choices:['edify','alienate','admonish','appease']},
  reconcile:{sentence:'Diplomats struggled to ____ the two countries after decades of hostility.',choices:['reconcile','abrogate','ascertain','articulate']}
};
window.EIKEN_QUIZ_ITEMS=(window.EIKEN_WORDS||[]).filter(function(word){return OVERRIDES[word.w]||!GENERIC_TEMPLATES[word.s]}).map(function(word){var override=OVERRIDES[word.w];return{id:word.w+'-001',word:word.w,sentence:override?override.sentence:word.s,choices:override?override.choices:null,source:override?'manual-review':'curated-v1'}});
window.EIKEN_REJECTED_QUIZ_WORDS=(window.EIKEN_WORDS||[]).filter(function(word){return GENERIC_TEMPLATES[word.s]&&!OVERRIDES[word.w]}).map(function(word){return word.w});
})();
