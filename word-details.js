(function(){
'use strict';
var DETAILS={
  abate:{pos:"verb",synonyms:["subside","diminish"],antonyms:["intensify","increase"],collocations:["the storm abated","show no sign of abating"]},
  abdicate:{pos:"verb",synonyms:["renounce","abandon"],antonyms:["明確な反意語なし"],collocations:["policy could abdicate efforts to","The new policy could abdicate efforts to restore public"]},
  aberration:{pos:"noun",synonyms:["anomaly","deviation"],antonyms:["normality","conformity"],collocations:["an aberration from the norm","a temporary aberration"]},
  abhor:{pos:"verb",synonyms:["loathe","execrate"],antonyms:["明確な反意語なし"],collocations:["tried to abhor the claim","Independent investigators tried to abhor the claim before the"]},
  abject:{pos:"adjective",synonyms:["miserable","hopeless"],antonyms:["明確な反意語なし"],collocations:["Her abject explanation changed","Her abject explanation changed how the"]},
  abrogate:{pos:"verb",synonyms:["revoke","repeal"],antonyms:["明確な反意語なし"],collocations:["policy could abrogate efforts to","The new policy could abrogate efforts to restore public"]},
  accolade:{pos:"noun",synonyms:["honor","award"],antonyms:["明確な反意語なし"],collocations:["concern about accolade grew after","Public concern about accolade grew after the investigation"]},
  acquiesce:{pos:"verb",synonyms:["comply","assent"],antonyms:["dissent"],collocations:["officials might acquiesce the principles","warned that officials might acquiesce the principles they had"]},
  acrimonious:{pos:"adjective",synonyms:["bitter","hostile"],antonyms:["amicable","cordial"],collocations:["an acrimonious dispute","an acrimonious divorce"]},
  admonish:{pos:"verb",synonyms:["reprove","discourage"],antonyms:["明確な反意語なし"],collocations:["policy could admonish efforts to","The new policy could admonish efforts to restore public"]},
  adroit:{pos:"adjective",synonyms:["dextrous","dexterous"],antonyms:["maladroit"],collocations:["considered an adroit approach to","what it considered an adroit approach to the problem"]},
  adversity:{pos:"unknown",synonyms:["hardship","hostility"],antonyms:["明確な反意語なし"],collocations:["face of adversity","in the face of adversity"]},
  affable:{pos:"adjective",synonyms:["friendly","genial"],antonyms:["明確な反意語なし"],collocations:["Her affable explanation changed","Her affable explanation changed how the"]},
  affluent:{pos:"adjective",synonyms:["wealthy","rich"],antonyms:["明確な反意語なし"],collocations:["response as affluent during the","the government's response as affluent during the national debate"]},
  aggrandize:{pos:"verb",synonyms:["dramatise","embellish"],antonyms:["明確な反意語なし"],collocations:["tried to aggrandize the claim","Independent investigators tried to aggrandize the claim before the"]},
  alacrity:{pos:"noun",synonyms:["briskness","enthusiasm"],antonyms:["明確な反意語なし"],collocations:["consequences of alacrity","the social consequences of alacrity"]},
  alienate:{pos:"verb",synonyms:["estrange","disaffect"],antonyms:["明確な反意語なし"],collocations:["policy could alienate efforts to","The new policy could alienate efforts to restore public"]},
  alleviate:{pos:"unknown",synonyms:["relieve","assuage"],antonyms:["明確な反意語なし"],collocations:["intended to alleviate the burden","subsidy is intended to alleviate the burden on low-income"]},
  amalgamate:{pos:"verb",synonyms:["unify","consolidated"],antonyms:["明確な反意語なし"],collocations:["tried to amalgamate the claim","Independent investigators tried to amalgamate the claim before the"]},
  ambiguous:{pos:"unknown",synonyms:["equivocal","enigmatic"],antonyms:["unequivocal","univocal"],collocations:["contract contained ambiguous language that","The contract contained ambiguous language that led to"]},
  ambivalent:{pos:"adjective",synonyms:["equivocal","ambiguous"],antonyms:["明確な反意語なし"],collocations:["Her ambivalent explanation changed","Her ambivalent explanation changed how the"]},
  amenable:{pos:"adjective",synonyms:["compliant","tractable"],antonyms:["unamenable"],collocations:["response as amenable during the","the government's response as amenable during the national debate"]},
  amnesty:{pos:"noun",synonyms:["pardon","free pardon"],antonyms:["明確な反意語なし"],collocations:["announced an amnesty for minor","The government announced an amnesty for minor tax violations"]},
  anachronism:{pos:"noun",synonyms:["mistiming","misdating"],antonyms:["明確な反意語なし"],collocations:["concern about anachronism grew after","Public concern about anachronism grew after the investigation"]},
  animosity:{pos:"noun",synonyms:["bad blood","animus"],antonyms:["明確な反意語なし"],collocations:["consequences of animosity","the social consequences of animosity"]},
  anomaly:{pos:"noun",synonyms:["abnormality","deviance"],antonyms:["明確な反意語なし"],collocations:["found an anomaly in the","Researchers found an anomaly in the data that"]},
  antipathy:{pos:"noun",synonyms:["aversion","distaste"],antonyms:["明確な反意語なし"],collocations:["report identified antipathy as a","The report identified antipathy as a serious obstacle"]},
  appease:{pos:"verb",synonyms:["placate","lenify"],antonyms:["明確な反意語なし"],collocations:["tried to appease the claim","Independent investigators tried to appease the claim before the"]},
  apprehensive:{pos:"adjective",synonyms:["anxious","afraid"],antonyms:["明確な反意語なし"],collocations:["Her apprehensive explanation changed","Her apprehensive explanation changed how the"]},
  arbitrary:{pos:"noun",synonyms:["discretionary","discretional"],antonyms:["nonarbitrary","unarbitrary"],collocations:["restrictions were arbitrary and unfair","that the restrictions were arbitrary and unfair"]},
  arcane:{pos:"adjective",synonyms:["esoteric","cryptic"],antonyms:["明確な反意語なし"],collocations:["response as arcane during the","the government's response as arcane during the national debate"]},
  arduous:{pos:"adjective",synonyms:["laborious","toilsome"],antonyms:["明確な反意語なし"],collocations:["considered an arduous approach to","what it considered an arduous approach to the problem"]},
  articulate:{pos:"verb",synonyms:["well-spoken","eloquent"],antonyms:["inarticulate","unarticulate"],collocations:["officials might articulate the principles","warned that officials might articulate the principles they had"]},
  ascertain:{pos:"verb",synonyms:["see to it","see"],antonyms:["明確な反意語なし"],collocations:["policy could ascertain efforts to","The new policy could ascertain efforts to restore public"]},
  assuage:{pos:"verb",synonyms:["alleviate","ease"],antonyms:["aggravate","intensify"],collocations:["assuage fears","assuage concerns"]},
  astute:{pos:"adjective",synonyms:["shrewd","smart"],antonyms:["明確な反意語なし"],collocations:["considered an astute approach to","what it considered an astute approach to the problem"]},
  atrophy:{pos:"verb",synonyms:["wasting","withering"],antonyms:["明確な反意語なし"],collocations:["officials might atrophy the principles","warned that officials might atrophy the principles they had"]},
  austere:{pos:"adjective",synonyms:["forbidding","stern"],antonyms:["extravagant","flamboyant"],collocations:["reflects an austere approach to","new budget reflects an austere approach to government spending"]},
  avarice:{pos:"noun",synonyms:["cupidity","greed"],antonyms:["明確な反意語なし"],collocations:["report identified avarice as a","The report identified avarice as a serious obstacle"]},
  avert:{pos:"verb",synonyms:["stave off","obviate"],antonyms:["明確な反意語なし"],collocations:["tried to avert the claim","Independent investigators tried to avert the claim before the"]},
  banal:{pos:"adjective",synonyms:["trite","hackneyed"],antonyms:["明確な反意語なし"],collocations:["Her banal explanation changed","Her banal explanation changed how the"]},
  belie:{pos:"verb",synonyms:["negate","contradict"],antonyms:["明確な反意語なし"],collocations:["policy could belie efforts to","The new policy could belie efforts to restore public"]},
  belligerent:{pos:"noun",synonyms:["warring","militant"],antonyms:["明確な反意語なし"],collocations:["the regime’s belligerent rhetoric could","warned that the regime’s belligerent rhetoric could destabilize the"]},
  bereft:{pos:"adjective",synonyms:["grief-stricken","sorrowing"],antonyms:["明確な反意語なし"],collocations:["considered an bereft approach to","what it considered an bereft approach to the problem"]},
  blatant:{pos:"adjective",synonyms:["unconcealed","conspicuous"],antonyms:["明確な反意語なし"],collocations:["Her blatant explanation changed","Her blatant explanation changed how the"]},
  boisterous:{pos:"adjective",synonyms:["rumbustious","rambunctious"],antonyms:["明確な反意語なし"],collocations:["response as boisterous during the","the government's response as boisterous during the national debate"]},
  bolster:{pos:"verb",synonyms:["strengthen","support"],antonyms:["undermine","weaken"],collocations:["bolster confidence","bolster the economy"]},
  brevity:{pos:"noun",synonyms:["briefness","transience"],antonyms:["明確な反意語なし"],collocations:["concern about brevity grew after","Public concern about brevity grew after the investigation"]},
  cajole:{pos:"verb",synonyms:["inveigle","wheedle"],antonyms:["明確な反意語なし"],collocations:["officials might cajole the principles","warned that officials might cajole the principles they had"]},
  callous:{pos:"adjective",synonyms:["insensitive","thick-skinned"],antonyms:["明確な反意語なし"],collocations:["response as callous during the","the government's response as callous during the national debate"]},
  camaraderie:{pos:"noun",synonyms:["good fellowship","comradeship"],antonyms:["明確な反意語なし"],collocations:["concern about camaraderie grew after","Public concern about camaraderie grew after the investigation"]},
  candid:{pos:"noun",synonyms:["unstudied","artless"],antonyms:["明確な反意語なし"],collocations:["gave a candid assessment of","The CEO gave a candid assessment of the company’s"]},
  capricious:{pos:"adjective",synonyms:["arbitrary","whimsical"],antonyms:["conscientious","rigorous"],collocations:["the CEO’s capricious decision-making style","alarmed by the CEO’s capricious decision-making style"]},
  catharsis:{pos:"noun",synonyms:["katharsis","abreaction"],antonyms:["明確な反意語なし"],collocations:["consequences of catharsis","the social consequences of catharsis"]},
  censure:{pos:"noun",synonyms:["reprimand","animadversion"],antonyms:["明確な反意語なし"],collocations:["voted to censure the official","The committee voted to censure the official for abusing"]},
  circumspect:{pos:"adjective",synonyms:["prudent","discreet"],antonyms:["明確な反意語なし"],collocations:["response as circumspect during the","the government's response as circumspect during the national debate"]},
  clandestine:{pos:"adjective",synonyms:["hole-and-corner","cloak-and-dagger"],antonyms:["明確な反意語なし"],collocations:["response as clandestine during the","the government's response as clandestine during the national debate"]},
  coalesce:{pos:"verb",synonyms:["merge","meld"],antonyms:["明確な反意語なし"],collocations:["tried to coalesce the claim","Independent investigators tried to coalesce the claim before the"]},
  coerce:{pos:"verb",synonyms:["force","pressure"],antonyms:["明確な反意語なし"],collocations:["officials might coerce the principles","warned that officials might coerce the principles they had"]},
  cogent:{pos:"adjective",synonyms:["influential","telling"],antonyms:["明確な反意語なし"],collocations:["response as cogent during the","the government's response as cogent during the national debate"]},
  coherent:{pos:"unknown",synonyms:["logical","rational"],antonyms:["incoherent"],collocations:["present a coherent alternative to","failed to present a coherent alternative to the policy"]},
  commensurate:{pos:"adjective",synonyms:["commensurable","proportionate"],antonyms:["incommensurate"],collocations:["considered an commensurate approach to","what it considered an commensurate approach to the problem"]},
  complacent:{pos:"unknown",synonyms:["self-satisfied","content"],antonyms:["明確な反意語なし"],collocations:["team became complacent after several","The team became complacent after several years of"]},
  complicity:{pos:"noun",synonyms:["complicit","abetment"],antonyms:["明確な反意語なし"],collocations:["consequences of complicity","the social consequences of complicity"]},
  concede:{pos:"verb",synonyms:["admit","acknowledge"],antonyms:["deny","contest"],collocations:["concede defeat","concede that ..."]},
  conciliatory:{pos:"adjective",synonyms:["compromising","yielding"],antonyms:["antagonistic","inflexible"],collocations:["response as conciliatory during the","the government's response as conciliatory during the national debate"]},
  conflagration:{pos:"noun",synonyms:["inferno","blaze"],antonyms:["明確な反意語なし"],collocations:["concern about conflagration grew after","Public concern about conflagration grew after the investigation"]},
  conscientious:{pos:"adjective",synonyms:["scrupulous","painstaking"],antonyms:["unconscientious"],collocations:["Her conscientious explanation changed","Her conscientious explanation changed how the"]},
  conspicuous:{pos:"unknown",synonyms:["obvious","unconcealed"],antonyms:["inconspicuous","invisible"],collocations:["was a conspicuous lack of","There was a conspicuous lack of evidence in"]},
  construe:{pos:"verb",synonyms:["interpret","infer"],antonyms:["明確な反意語なし"],collocations:["tried to construe the claim","Independent investigators tried to construe the claim before the"]},
  contemptuous:{pos:"adjective",synonyms:["disdainful","scornful"],antonyms:["明確な反意語なし"],collocations:["Her contemptuous explanation changed","Her contemptuous explanation changed how the"]},
  contentious:{pos:"adjective",synonyms:["controversial","disputative"],antonyms:["明確な反意語なし"],collocations:["the most contentious issues in","one of the most contentious issues in the election"]},
  contrite:{pos:"adjective",synonyms:["penitent","repentant"],antonyms:["明確な反意語なし"],collocations:["response as contrite during the","the government's response as contrite during the national debate"]},
  conundrum:{pos:"noun",synonyms:["brain-teaser","enigma"],antonyms:["明確な反意語なし"],collocations:["major policy conundrum","remains a major policy conundrum"]},
  copious:{pos:"adjective",synonyms:["plentiful","plenteous"],antonyms:["明確な反意語なし"],collocations:["considered an copious approach to","what it considered an copious approach to the problem"]},
  corroborate:{pos:"verb",synonyms:["validate","bear out"],antonyms:["negate","contradict"],collocations:["officials might corroborate the principles","warned that officials might corroborate the principles they had"]},
  credulous:{pos:"adjective",synonyms:["credible","overcredulous"],antonyms:["incredulous"],collocations:["response as credulous during the","the government's response as credulous during the national debate"]},
  culpable:{pos:"adjective",synonyms:["blameful","blameable"],antonyms:["明確な反意語なし"],collocations:["considered an culpable approach to","what it considered an culpable approach to the problem"]},
  curtail:{pos:"unknown",synonyms:["cut short","restrict"],antonyms:["明確な反意語なし"],collocations:["decided to curtail unnecessary expenses","The company decided to curtail unnecessary expenses"]},
  dearth:{pos:"noun",synonyms:["scarcity","shortage"],antonyms:["abundance","surplus"],collocations:["a dearth of evidence","a dearth of talent"]},
  debase:{pos:"verb",synonyms:["vitiate","demoralize"],antonyms:["明確な反意語なし"],collocations:["officials might debase the principles","warned that officials might debase the principles they had"]},
  debilitate:{pos:"verb",synonyms:["enfeeble","drain"],antonyms:["明確な反意語なし"],collocations:["policy could debilitate efforts to","The new policy could debilitate efforts to restore public"]},
  decry:{pos:"verb",synonyms:["condemn","objurgate"],antonyms:["明確な反意語なし"],collocations:["tried to decry the claim","Independent investigators tried to decry the claim before the"]},
  deference:{pos:"noun",synonyms:["respectfulness","respect"],antonyms:["明確な反意語なし"],collocations:["concern about deference grew after","Public concern about deference grew after the investigation"]},
  defunct:{pos:"noun",synonyms:["dead","inoperative"],antonyms:["明確な反意語なし"],collocations:["converted a defunct factory into","The city converted a defunct factory into a community"]},
  deleterious:{pos:"adjective",synonyms:["harmful","detrimental"],antonyms:["beneficial","harmless"],collocations:["deleterious effects","deleterious impact"]},
  delineate:{pos:"verb",synonyms:["outline","delimitate"],antonyms:["undelineated"],collocations:["officials might delineate the principles","warned that officials might delineate the principles they had"]},
  demure:{pos:"adjective",synonyms:["modest","overmodest"],antonyms:["明確な反意語なし"],collocations:["response as demure during the","the government's response as demure during the national debate"]},
  denigrate:{pos:"verb",synonyms:["calumniate","defame"],antonyms:["明確な反意語なし"],collocations:["tried to denigrate the claim","Independent investigators tried to denigrate the claim before the"]},
  deplore:{pos:"verb",synonyms:["lament","bemoan"],antonyms:["明確な反意語なし"],collocations:["officials might deplore the principles","warned that officials might deplore the principles they had"]},
  depravity:{pos:"noun",synonyms:["turpitude","corruption"],antonyms:["明確な反意語なし"],collocations:["report identified depravity as a","The report identified depravity as a serious obstacle"]},
  deride:{pos:"unknown",synonyms:["jeer","ridicule"],antonyms:["明確な反意語なし"],collocations:["began to deride the proposal","Critics began to deride the proposal as unrealistic"]},
  despondent:{pos:"adjective",synonyms:["hopeless","heartsick"],antonyms:["明確な反意語なし"],collocations:["Her despondent explanation changed","Her despondent explanation changed how the"]},
  destitute:{pos:"adjective",synonyms:["indigent","poor"],antonyms:["明確な反意語なし"],collocations:["were left destitute","many families were left destitute"]},
  detractor:{pos:"unknown",synonyms:["disparager","depreciator"],antonyms:["明確な反意語なし"],collocations:["his harshest detractor admitted that","Even his harshest detractor admitted that the plan"]},
  dexterous:{pos:"adjective",synonyms:["dextrous","adroit"],antonyms:["明確な反意語なし"],collocations:["response as dexterous during the","the government's response as dexterous during the national debate"]},
  didactic:{pos:"adjective",synonyms:["instructive","informative"],antonyms:["明確な反意語なし"],collocations:["considered an didactic approach to","what it considered an didactic approach to the problem"]},
  diffident:{pos:"adjective",synonyms:["timid","unsure"],antonyms:["明確な反意語なし"],collocations:["Her diffident explanation changed","Her diffident explanation changed how the"]},
  dilapidated:{pos:"adjective",synonyms:["ramshackle","damaged"],antonyms:["明確な反意語なし"],collocations:["response as dilapidated during the","the government's response as dilapidated during the national debate"]},
  diligent:{pos:"adjective",synonyms:["assiduous","industrious"],antonyms:["negligent"],collocations:["considered an diligent approach to","what it considered an diligent approach to the problem"]},
  discerning:{pos:"adjective",synonyms:["perceptive","percipient"],antonyms:["undiscerning"],collocations:["Her discerning explanation changed","Her discerning explanation changed how the"]},
  disconcert:{pos:"verb",synonyms:["discomfit","consternate"],antonyms:["reassure","calm"],collocations:["disconcert a candidate","disconcert an opponent","disconcert observers","be disconcerted by a question","be visibly disconcerted"]},
  discredit:{pos:"verb",synonyms:["disgrace","disrepute"],antonyms:["believe","repute"],collocations:["tried to discredit the claim","Independent investigators tried to discredit the claim before the"]},
  discrepancy:{pos:"unknown",synonyms:["divergence","disagreement"],antonyms:["明確な反意語なし"],collocations:["discovered a discrepancy between the","Auditors discovered a discrepancy between the records and"]},
  disdain:{pos:"verb",synonyms:["scorn","contempt"],antonyms:["明確な反意語なし"],collocations:["officials might disdain the principles","warned that officials might disdain the principles they had"]},
  disparage:{pos:"noun",synonyms:["belittle","pick at"],antonyms:["blandish","flatter"],collocations:["should not disparage citizens who","Political leaders should not disparage citizens who express legitimate"]},
  disseminate:{pos:"verb",synonyms:["propagate","diffuse"],antonyms:["明確な反意語なし"],collocations:["policy could disseminate efforts to","The new policy could disseminate efforts to restore public"]},
  dissuade:{pos:"unknown",synonyms:["deter","prevent"],antonyms:["persuade"],collocations:["tried to dissuade young people","Experts tried to dissuade young people from investing"]},
  dogmatic:{pos:"adjective",synonyms:["dogmatical","narrow-minded"],antonyms:["明確な反意語なし"],collocations:["considered an dogmatic approach to","what it considered an dogmatic approach to the problem"]},
  dubious:{pos:"adjective",synonyms:["questionable","doubtful"],antonyms:["明確な反意語なし"],collocations:["Her dubious explanation changed","Her dubious explanation changed how the"]},
  ebullient:{pos:"adjective",synonyms:["exuberant","high-spirited"],antonyms:["明確な反意語なし"],collocations:["response as ebullient during the","the government's response as ebullient during the national debate"]},
  eclectic:{pos:"adjective",synonyms:["eclecticist","discriminating"],antonyms:["明確な反意語なし"],collocations:["considered an eclectic approach to","what it considered an eclectic approach to the problem"]},
  edify:{pos:"verb",synonyms:["enlighten","build"],antonyms:["明確な反意語なし"],collocations:["officials might edify the principles","warned that officials might edify the principles they had"]},
  efficacy:{pos:"noun",synonyms:["efficaciousness","efficacious"],antonyms:["inefficacy","inefficaciousness"],collocations:["report identified efficacy as a","The report identified efficacy as a serious obstacle"]},
  egregious:{pos:"adjective",synonyms:["flagrant","gross"],antonyms:["明確な反意語なし"],collocations:["considered an egregious approach to","what it considered an egregious approach to the problem"]},
  elicit:{pos:"verb",synonyms:["evoke","draw out"],antonyms:["suppress","stifle"],collocations:["elicit a response","elicit information"]},
  elusive:{pos:"adjective",synonyms:["evasive","subtle"],antonyms:["明確な反意語なし"],collocations:["Her elusive explanation changed","Her elusive explanation changed how the"]},
  embellish:{pos:"verb",synonyms:["adorn","decorate"],antonyms:["uglify"],collocations:["policy could embellish efforts to","The new policy could embellish efforts to restore public"]},
  empirical:{pos:"adjective",synonyms:["experiential","existential"],antonyms:["theoretical","theoretic"],collocations:["considered an empirical approach to","what it considered an empirical approach to the problem"]},
  emulate:{pos:"verb",synonyms:["copy","mimic"],antonyms:["明確な反意語なし"],collocations:["try to emulate the management","Many startups try to emulate the management style of"]},
  encroach:{pos:"verb",synonyms:["infringe","impinge"],antonyms:["明確な反意語なし"],collocations:["officials might encroach the principles","warned that officials might encroach the principles they had"]},
  endemic:{pos:"adjective",synonyms:["autochthonous","autochthonic"],antonyms:["cosmopolitan","epidemic"],collocations:["response as endemic during the","the government's response as endemic during the national debate"]},
  enervate:{pos:"verb",synonyms:["unnerve","faze"],antonyms:["明確な反意語なし"],collocations:["tried to enervate the claim","Independent investigators tried to enervate the claim before the"]},
  enfranchise:{pos:"verb",synonyms:["affranchise","empower"],antonyms:["disenfranchise","disfranchise"],collocations:["officials might enfranchise the principles","warned that officials might enfranchise the principles they had"]},
  engender:{pos:"unknown",synonyms:["beget","breed"],antonyms:["明確な反意語なし"],collocations:["transparency can engender distrust among","Lack of transparency can engender distrust among citizens"]},
  enigmatic:{pos:"adjective",synonyms:["enigmatical","ambiguous"],antonyms:["明確な反意語なし"],collocations:["response as enigmatic during the","the government's response as enigmatic during the national debate"]},
  enmity:{pos:"noun",synonyms:["antagonism","hostility"],antonyms:["明確な反意語なし"],collocations:["concern about enmity grew after","Public concern about enmity grew after the investigation"]},
  entrench:{pos:"verb",synonyms:["trench","dig in"],antonyms:["明確な反意語なし"],collocations:["officials might entrench the principles","warned that officials might entrench the principles they had"]},
  ephemeral:{pos:"adjective",synonyms:["fleeting","transient"],antonyms:["enduring","permanent"],collocations:["ephemeral fame","ephemeral nature"]},
  equivocal:{pos:"unknown",synonyms:["ambiguous","ambivalent"],antonyms:["unequivocal","univocal"],collocations:["gave an equivocal answer when","The minister gave an equivocal answer when asked about"]},
  eradicate:{pos:"verb",synonyms:["extirpate","uproot"],antonyms:["明確な反意語なし"],collocations:["tried to eradicate the claim","Independent investigators tried to eradicate the claim before the"]},
  erratic:{pos:"adjective",synonyms:["fickle","unsettled"],antonyms:["明確な反意語なし"],collocations:["response as erratic during the","the government's response as erratic during the national debate"]},
  esoteric:{pos:"adjective",synonyms:["mystical","mystic"],antonyms:["exoteric"],collocations:["Her esoteric explanation changed","Her esoteric explanation changed how the"]},
  euphemism:{pos:"noun",synonyms:["understatement","rewording"],antonyms:["明確な反意語なし"],collocations:["report identified euphemism as a","The report identified euphemism as a serious obstacle"]},
  evince:{pos:"verb",synonyms:["show","express"],antonyms:["明確な反意語なし"],collocations:["tried to evince the claim","Independent investigators tried to evince the claim before the"]},
  exacerbate:{pos:"verb",synonyms:["aggravate","worsen"],antonyms:["alleviate","mitigate"],collocations:["exacerbate tensions","exacerbate the problem"]},
  exasperate:{pos:"verb",synonyms:["aggravate","infuriate"],antonyms:["ameliorate","improve"],collocations:["officials might exasperate the principles","warned that officials might exasperate the principles they had"]},
  exculpate:{pos:"verb",synonyms:["assoil","acquit"],antonyms:["convict"],collocations:["policy could exculpate efforts to","The new policy could exculpate efforts to restore public"]},
  exemplary:{pos:"unknown",synonyms:["worthy","cautionary"],antonyms:["明確な反意語なし"],collocations:["regarded as exemplary","was widely regarded as exemplary"]},
  exonerate:{pos:"unknown",synonyms:["discharge","exculpate"],antonyms:["convict"],collocations:["investigation helped exonerate the employee","The investigation helped exonerate the employee of wrongdoing"]},
  exorbitant:{pos:"adjective",synonyms:["immoderate","outrageous"],antonyms:["明確な反意語なし"],collocations:["considered an exorbitant approach to","what it considered an exorbitant approach to the problem"]},
  expedite:{pos:"verb",synonyms:["hasten","expeditiously"],antonyms:["明確な反意語なし"],collocations:["officials might expedite the principles","warned that officials might expedite the principles they had"]},
  extol:{pos:"verb",synonyms:["laud","exalt"],antonyms:["明確な反意語なし"],collocations:["policy could extol efforts to","The new policy could extol efforts to restore public"]},
  extraneous:{pos:"adjective",synonyms:["extrinsic","foreign"],antonyms:["明確な反意語なし"],collocations:["considered an extraneous approach to","what it considered an extraneous approach to the problem"]},
  fallacious:{pos:"adjective",synonyms:["deceitful","fraudulent"],antonyms:["明確な反意語なし"],collocations:["Her fallacious explanation changed","Her fallacious explanation changed how the"]},
  fastidious:{pos:"adjective",synonyms:["exacting","fussy"],antonyms:["unfastidious"],collocations:["was so fastidious that even","The editor was so fastidious that even minor punctuation"]},
  fervent:{pos:"adjective",synonyms:["perfervid","ardent"],antonyms:["明確な反意語なし"],collocations:["response as fervent during the","the government's response as fervent during the national debate"]},
  fiasco:{pos:"noun",synonyms:["debacle","chaos"],antonyms:["明確な反意語なし"],collocations:["public relations fiasco","into a public relations fiasco"]},
  flagrant:{pos:"adjective",synonyms:["egregious","gross"],antonyms:["明確な反意語なし"],collocations:["considered an flagrant approach to","what it considered an flagrant approach to the problem"]},
  flippant:{pos:"adjective",synonyms:["light-minded","frivolous"],antonyms:["明確な反意語なし"],collocations:["Her flippant explanation changed","Her flippant explanation changed how the"]},
  forfeit:{pos:"unknown",synonyms:["forfeiture","waive"],antonyms:["arrogate","claim"],collocations:["rules may forfeit their medals","violate the rules may forfeit their medals"]},
  formidable:{pos:"unknown",synonyms:["redoubtable","alarming"],antonyms:["明確な反意語なし"],collocations:["effort faces formidable political opposition","The reform effort faces formidable political opposition"]},
  fortuitous:{pos:"adjective",synonyms:["fortunate","uncaused"],antonyms:["明確な反意語なし"],collocations:["response as fortuitous during the","the government's response as fortuitous during the national debate"]},
  fractious:{pos:"adjective",synonyms:["nettlesome","irritable"],antonyms:["明確な反意語なし"],collocations:["considered an fractious approach to","what it considered an fractious approach to the problem"]},
  fraudulent:{pos:"adjective",synonyms:["deceitful","fallacious"],antonyms:["明確な反意語なし"],collocations:["detected several fraudulent transactions in","The bank detected several fraudulent transactions in the account"]},
  furtive:{pos:"adjective",synonyms:["sneaky","stealthy"],antonyms:["明確な反意語なし"],collocations:["Her furtive explanation changed","Her furtive explanation changed how the"]},
  galvanize:{pos:"verb",synonyms:["animate","startle"],antonyms:["明確な反意語なし"],collocations:["crisis helped galvanize young voters","The crisis helped galvanize young voters into participating"]},
  garrulous:{pos:"adjective",synonyms:["talkative","loquacious"],antonyms:["明確な反意語なし"],collocations:["response as garrulous during the","the government's response as garrulous during the national debate"]},
  germane:{pos:"adjective",synonyms:["relevant","related"],antonyms:["明確な反意語なし"],collocations:["considered an germane approach to","what it considered an germane approach to the problem"]},
  glib:{pos:"adjective",synonyms:["superficial","smooth-tongued"],antonyms:["明確な反意語なし"],collocations:["Her glib explanation changed","Her glib explanation changed how the"]},
  gratuitous:{pos:"adjective",synonyms:["gratis","free"],antonyms:["明確な反意語なし"],collocations:["response as gratuitous during the","the government's response as gratuitous during the national debate"]},
  hackneyed:{pos:"adjective",synonyms:["trite","banal"],antonyms:["明確な反意語なし"],collocations:["considered an hackneyed approach to","what it considered an hackneyed approach to the problem"]},
  haphazard:{pos:"adjective",synonyms:["hit-or-miss","random"],antonyms:["明確な反意語なし"],collocations:["Her haphazard explanation changed","Her haphazard explanation changed how the"]},
  harangue:{pos:"verb",synonyms:["ranting","rant"],antonyms:["明確な反意語なし"],collocations:["policy could harangue efforts to","The new policy could harangue efforts to restore public"]},
  heed:{pos:"verb",synonyms:["attentiveness","regard"],antonyms:["inattentiveness","heedlessness"],collocations:["tried to heed the claim","Independent investigators tried to heed the claim before the"]},
  heinous:{pos:"adjective",synonyms:["atrocious","evil"],antonyms:["明確な反意語なし"],collocations:["Her heinous explanation changed","Her heinous explanation changed how the"]},
  herald:{pos:"verb",synonyms:["announce","annunciate"],antonyms:["明確な反意語なし"],collocations:["policy could herald efforts to","The new policy could herald efforts to restore public"]},
  imminent:{pos:"adjective",synonyms:["immediate","impending"],antonyms:["明確な反意語なし"],collocations:["shortage was imminent","a water shortage was imminent"]},
  impede:{pos:"verb",synonyms:["hinder","obstruct"],antonyms:["facilitate","assist"],collocations:["impede progress","seriously impede"]},
  impetus:{pos:"unknown",synonyms:["impulsion","impulse"],antonyms:["明確な反意語なし"],collocations:["provided the impetus for political","Public outrage provided the impetus for political reform"]},
  inadvertent:{pos:"unknown",synonyms:["unintended","accidental"],antonyms:["明確な反意語なし"],collocations:["An inadvertent error in","An inadvertent error in the software"]},
  incumbent:{pos:"unknown",synonyms:["officeholder","superjacent"],antonyms:["明確な反意語なし"],collocations:["The incumbent mayor faces","The incumbent mayor faces a strong"]},
  indispensable:{pos:"unknown",synonyms:["critical","essential"],antonyms:["dispensable"],collocations:["data is indispensable for effective","Reliable data is indispensable for effective policymaking"]},
  indolent:{pos:"adjective",synonyms:["slothful","idle"],antonyms:["明確な反意語なし"],collocations:["considered an indolent approach to","what it considered an indolent approach to the problem"]},
  infallible:{pos:"adjective",synonyms:["inerrable","inerrant"],antonyms:["fallible"],collocations:["Her infallible explanation changed","Her infallible explanation changed how the"]},
  ingenuous:{pos:"adjective",synonyms:["naif","naive"],antonyms:["artful","disingenuous"],collocations:["response as ingenuous during the","the government's response as ingenuous during the national debate"]},
  inhibit:{pos:"verb",synonyms:["subdue","suppress"],antonyms:["明確な反意語なし"],collocations:["tried to inhibit the claim","Independent investigators tried to inhibit the claim before the"]},
  innocuous:{pos:"adjective",synonyms:["harmless","innoxious"],antonyms:["harmful","noxious"],collocations:["Her innocuous explanation changed","Her innocuous explanation changed how the"]},
  insidious:{pos:"adjective",synonyms:["pernicious","harmful"],antonyms:["明確な反意語なし"],collocations:["response as insidious during the","the government's response as insidious during the national debate"]},
  insolent:{pos:"adjective",synonyms:["impudent","brazen-faced"],antonyms:["明確な反意語なし"],collocations:["considered an insolent approach to","what it considered an insolent approach to the problem"]},
  intransigent:{pos:"noun",synonyms:["adamant","inflexible"],antonyms:["明確な反意語なし"],collocations:["sides remained intransigent","because both sides remained intransigent"]},
  intrepid:{pos:"adjective",synonyms:["brave","audacious"],antonyms:["明確な反意語なし"],collocations:["Her intrepid explanation changed","Her intrepid explanation changed how the"]},
  inundate:{pos:"unknown",synonyms:["deluge","submerge"],antonyms:["明確な反意語なし"],collocations:["agency was inundate with requests","The agency was inundate with requests after the"]},
  irascible:{pos:"adjective",synonyms:["quick-tempered","ill-natured"],antonyms:["明確な反意語なし"],collocations:["response as irascible during the","the government's response as irascible during the national debate"]},
  irrefutable:{pos:"adjective",synonyms:["undeniable","incontrovertible"],antonyms:["明確な反意語なし"],collocations:["considered an irrefutable approach to","what it considered an irrefutable approach to the problem"]},
  jettison:{pos:"verb",synonyms:["ditch","dump"],antonyms:["明確な反意語なし"],collocations:["officials might jettison the principles","warned that officials might jettison the principles they had"]},
  jubilant:{pos:"adjective",synonyms:["exulting","rejoicing"],antonyms:["明確な反意語なし"],collocations:["response as jubilant during the","the government's response as jubilant during the national debate"]},
  judicious:{pos:"adjective",synonyms:["wise","prudent"],antonyms:["明確な反意語なし"],collocations:["considered an judicious approach to","what it considered an judicious approach to the problem"]},
  laconic:{pos:"adjective",synonyms:["concise","pithy"],antonyms:["bombastic","long-winded"],collocations:["His laconic reply made","His laconic reply made it difficult"]},
  languid:{pos:"adjective",synonyms:["lethargic","languorous"],antonyms:["明確な反意語なし"],collocations:["Her languid explanation changed","Her languid explanation changed how the"]},
  laud:{pos:"verb",synonyms:["extol","exalt"],antonyms:["明確な反意語なし"],collocations:["policy could laud efforts to","The new policy could laud efforts to restore public"]},
  lethargic:{pos:"adjective",synonyms:["logy","languid"],antonyms:["energetic"],collocations:["considered an lethargic approach to","what it considered an lethargic approach to the problem"]},
  lucid:{pos:"adjective",synonyms:["perspicuous","crystal clear"],antonyms:["明確な反意語なし"],collocations:["Her lucid explanation changed","Her lucid explanation changed how the"]},
  lucrative:{pos:"unknown",synonyms:["profitable","remunerative"],antonyms:["明確な反意語なし"],collocations:["become a lucrative market for","energy has become a lucrative market for investors"]},
  magnanimous:{pos:"unknown",synonyms:["generous","greathearted"],antonyms:["明確な反意語なし"],collocations:["She was magnanimous in victory","She was magnanimous in victory and praised"]},
  malevolent:{pos:"adjective",synonyms:["malicious","evil"],antonyms:["benevolent","good"],collocations:["considered an malevolent approach to","what it considered an malevolent approach to the problem"]},
  malleable:{pos:"adjective",synonyms:["elastic","ductile"],antonyms:["明確な反意語なし"],collocations:["Her malleable explanation changed","Her malleable explanation changed how the"]},
  mendacious:{pos:"adjective",synonyms:["untruthful","lying"],antonyms:["明確な反意語なし"],collocations:["response as mendacious during the","the government's response as mendacious during the national debate"]},
  mercurial:{pos:"adjective",synonyms:["quicksilver","changeful"],antonyms:["明確な反意語なし"],collocations:["response as mercurial during the","the government's response as mercurial during the national debate"]},
  meticulous:{pos:"unknown",synonyms:["punctilious","fastidious"],antonyms:["明確な反意語なし"],collocations:["conducted a meticulous review of","The scientist conducted a meticulous review of the experimental"]},
  mitigate:{pos:"verb",synonyms:["alleviate","lessen"],antonyms:["aggravate","intensify"],collocations:["mitigate risk","mitigate the effects"]},
  mollify:{pos:"verb",synonyms:["lenify","appease"],antonyms:["明確な反意語なし"],collocations:["officials might mollify the principles","warned that officials might mollify the principles they had"]},
  moratorium:{pos:"unknown",synonyms:["waiver","embargo"],antonyms:["明確な反意語なし"],collocations:["imposed a moratorium on new","The city imposed a moratorium on new hotel construction"]},
  morose:{pos:"adjective",synonyms:["glum","sullen"],antonyms:["明確な反意語なし"],collocations:["considered an morose approach to","what it considered an morose approach to the problem"]},
  mundane:{pos:"noun",synonyms:["worldly","everyday"],antonyms:["明確な反意語なし"],collocations:["automate many mundane tasks that","AI can automate many mundane tasks that once consumed"]},
  nebulous:{pos:"adjective",synonyms:["nebulose","cloudy"],antonyms:["明確な反意語なし"],collocations:["response as nebulous during the","the government's response as nebulous during the national debate"]},
  nefarious:{pos:"adjective",synonyms:["villainous","wicked"],antonyms:["明確な反意語なし"],collocations:["considered an nefarious approach to","what it considered an nefarious approach to the problem"]},
  obdurate:{pos:"verb",synonyms:["obstinate","hardhearted"],antonyms:["明確な反意語なし"],collocations:["board remained obdurate despite repeated","The board remained obdurate despite repeated warnings from"]},
  obfuscate:{pos:"unknown",synonyms:["overshadow","darken"],antonyms:["elucidate","clarify"],collocations:["jargon to obfuscate the real","used technical jargon to obfuscate the real issue"]},
  oblivious:{pos:"adjective",synonyms:["unaware","inattentive"],antonyms:["明確な反意語なし"],collocations:["considered an oblivious approach to","what it considered an oblivious approach to the problem"]},
  obsequious:{pos:"adjective",synonyms:["bootlicking","sycophantic"],antonyms:["明確な反意語なし"],collocations:["Her obsequious explanation changed","Her obsequious explanation changed how the"]},
  onerous:{pos:"adjective",synonyms:["demanding","difficult"],antonyms:["明確な反意語なし"],collocations:["were too onerous","reporting rules were too onerous"]},
  opulent:{pos:"adjective",synonyms:["sumptuous","luxurious"],antonyms:["明確な反意語なし"],collocations:["Her opulent explanation changed","Her opulent explanation changed how the"]},
  ostensible:{pos:"unknown",synonyms:["ostensive","seeming"],antonyms:["明確な反意語なし"],collocations:["The ostensible reason for","The ostensible reason for the policy"]},
  ostracize:{pos:"verb",synonyms:["blackball","banish"],antonyms:["明確な反意語なし"],collocations:["tried to ostracize the claim","Independent investigators tried to ostracize the claim before the"]},
  palpable:{pos:"adjective",synonyms:["tangible","perceptible"],antonyms:["impalpable"],collocations:["Her palpable explanation changed","Her palpable explanation changed how the"]},
  parochial:{pos:"unknown",synonyms:["provincial","insular"],antonyms:["明確な反意語なし"],collocations:["took a parochial view of","The committee took a parochial view of a global"]},
  perfunctory:{pos:"adjective",synonyms:["automatic","cursory"],antonyms:["careful","complete"],collocations:["issued a perfunctory apology that","The company issued a perfunctory apology that failed to"]},
  pernicious:{pos:"adjective",synonyms:["harmful","noxious"],antonyms:["明確な反意語なし"],collocations:["Her pernicious explanation changed","Her pernicious explanation changed how the"]},
  perpetuate:{pos:"unknown",synonyms:["continuity","permanent"],antonyms:["明確な反意語なし"],collocations:["policy can perpetuate social inequality","Poor education policy can perpetuate social inequality"]},
  placate:{pos:"verb",synonyms:["pacify","appease"],antonyms:["明確な反意語なし"],collocations:["policy could placate efforts to","The new policy could placate efforts to restore public"]},
  plausible:{pos:"adjective",synonyms:["likely","probable"],antonyms:["implausible","improbable"],collocations:["explanation sounded plausible but lacked","His explanation sounded plausible but lacked supporting evidence"]},
  pragmatic:{pos:"noun",synonyms:["pragmatical","practical"],antonyms:["明確な反意語なし"],collocations:["A more pragmatic approach is","A more pragmatic approach is needed to"]},
  precarious:{pos:"adjective",synonyms:["parlous","dangerous"],antonyms:["明確な反意語なし"],collocations:["Her precarious explanation changed","Her precarious explanation changed how the"]},
  precipitate:{pos:"verb",synonyms:["hasty","hurried"],antonyms:["明確な反意語なし"],collocations:["policy could precipitate efforts to","The new policy could precipitate efforts to restore public"]},
  precipitous:{pos:"unknown",synonyms:["abrupt","sharp"],antonyms:["明確な反意語なし"],collocations:["suffered a precipitous decline in","The company suffered a precipitous decline in sales after"]},
  preclude:{pos:"verb",synonyms:["prevent","forbid"],antonyms:["明確な反意語なし"],collocations:["tried to preclude the claim","Independent investigators tried to preclude the claim before the"]},
  predicament:{pos:"unknown",synonyms:["quandary","plight"],antonyms:["明確な反意語なし"],collocations:["a difficult predicament","company in a difficult predicament"]},
  prescient:{pos:"unknown",synonyms:["discerning","prescious"],antonyms:["明確な反意語なし"],collocations:["proved remarkably prescient","cybersecurity risks proved remarkably prescient"]},
  presumptuous:{pos:"adjective",synonyms:["assumptive","assuming"],antonyms:["明確な反意語なし"],collocations:["response as presumptuous during the","the government's response as presumptuous during the national debate"]},
  prodigal:{pos:"adjective",synonyms:["lavish","profligate"],antonyms:["明確な反意語なし"],collocations:["Her prodigal explanation changed","Her prodigal explanation changed how the"]},
  proliferate:{pos:"verb",synonyms:["spread","extend"],antonyms:["明確な反意語なし"],collocations:["information can proliferate rapidly during","False information can proliferate rapidly during a national"]},
  prolific:{pos:"adjective",synonyms:["fecund","productive"],antonyms:["明確な反意語なし"],collocations:["response as prolific during the","the government's response as prolific during the national debate"]},
  propensity:{pos:"noun",synonyms:["tendency","proclivity"],antonyms:["明確な反意語なし"],collocations:["concern about propensity grew after","Public concern about propensity grew after the investigation"]},
  propitiate:{pos:"verb",synonyms:["appease","repropitiate"],antonyms:["明確な反意語なし"],collocations:["officials might propitiate the principles","warned that officials might propitiate the principles they had"]},
  proponent:{pos:"unknown",synonyms:["advocate","exponent"],antonyms:["明確な反意語なし"],collocations:["a strong proponent of stricter","She is a strong proponent of stricter environmental protection"]},
  proscribe:{pos:"verb",synonyms:["forbid","prohibit"],antonyms:["countenance","allow"],collocations:["policy could proscribe efforts to","The new policy could proscribe efforts to restore public"]},
  quandary:{pos:"noun",synonyms:["predicament","dilemma"],antonyms:["明確な反意語なし"],collocations:["report identified quandary as a","The report identified quandary as a serious obstacle"]},
  quell:{pos:"verb",synonyms:["squelch","stay"],antonyms:["明確な反意語なし"],collocations:["tried to quell the claim","Independent investigators tried to quell the claim before the"]},
  quixotic:{pos:"unknown",synonyms:["romantic","wild-eyed"],antonyms:["明確な反意語なし"],collocations:["noble but quixotic","overnight was noble but quixotic"]},
  ramification:{pos:"unknown",synonyms:["branching","fork"],antonyms:["明確な反意語なし"],collocations:["have serious ramification for future","decision could have serious ramification for future trade negotiations"]},
  rancor:{pos:"unknown",synonyms:["resentment","bitterness"],antonyms:["明確な反意語なし"],collocations:["by personal rancor rather than","was marked by personal rancor rather than reasoned argument"]},
  ravenous:{pos:"adjective",synonyms:["ravening","rapacious"],antonyms:["明確な反意語なし"],collocations:["response as ravenous during the","the government's response as ravenous during the national debate"]},
  recalcitrant:{pos:"noun",synonyms:["refractory","defiant"],antonyms:["明確な反意語なし"],collocations:["manage a recalcitrant student who","struggled to manage a recalcitrant student who ignored every"]},
  reclusive:{pos:"adjective",synonyms:["secluded","private"],antonyms:["明確な反意語なし"],collocations:["response as reclusive during the","the government's response as reclusive during the national debate"]},
  reconcile:{pos:"verb",synonyms:["settle","conciliate"],antonyms:["明確な反意語なし"],collocations:["tried to reconcile the claim","Independent investigators tried to reconcile the claim before the"]},
  rectify:{pos:"unknown",synonyms:["remedy","amend"],antonyms:["明確な反意語なし"],collocations:["promised to rectify the accounting","The company promised to rectify the accounting error immediately"]},
  redundant:{pos:"adjective",synonyms:["superfluous","extra"],antonyms:["明確な反意語なし"],collocations:["considered an redundant approach to","what it considered an redundant approach to the problem"]},
  relegate:{pos:"unknown",synonyms:["banish","submit"],antonyms:["advance","promote"],collocations:["issue was relegate to the","The issue was relegate to the end of"]},
  relinquish:{pos:"verb",synonyms:["give up","quit"],antonyms:["明確な反意語なし"],collocations:["officials might relinquish the principles","warned that officials might relinquish the principles they had"]},
  reprehensible:{pos:"adjective",synonyms:["condemnable","criminal"],antonyms:["明確な反意語なし"],collocations:["response as reprehensible during the","the government's response as reprehensible during the national debate"]},
  repudiate:{pos:"verb",synonyms:["contradict","deny"],antonyms:["明確な反意語なし"],collocations:["tried to repudiate the controversial","senator quickly tried to repudiate the controversial remarks made"]},
  rescind:{pos:"verb",synonyms:["revoke","annul"],antonyms:["明確な反意語なし"],collocations:["tried to rescind the claim","Independent investigators tried to rescind the claim before the"]},
  resilient:{pos:"adjective",synonyms:["robust","adaptable"],antonyms:["fragile","vulnerable"],collocations:["a resilient economy","remarkably resilient"]},
  reticent:{pos:"adjective",synonyms:["reserved","taciturn"],antonyms:["明確な反意語なし"],collocations:["Her reticent explanation changed","Her reticent explanation changed how the"]},
  retribution:{pos:"noun",synonyms:["vengeance","revenge"],antonyms:["明確な反意語なし"],collocations:["consequences of retribution","the social consequences of retribution"]},
  reverent:{pos:"adjective",synonyms:["reverential","worshipful"],antonyms:["irreverent"],collocations:["considered an reverent approach to","what it considered an reverent approach to the problem"]},
  sagacious:{pos:"adjective",synonyms:["sapient","wise"],antonyms:["明確な反意語なし"],collocations:["response as sagacious during the","the government's response as sagacious during the national debate"]},
  salient:{pos:"noun",synonyms:["conspicuous","outstanding"],antonyms:["reentrant","re-entrant"],collocations:["The most salient feature of","The most salient feature of the report"]},
  sanguine:{pos:"unknown",synonyms:["rubicund","ruddy"],antonyms:["明確な反意語なし"],collocations:["Analysts remain sanguine about the","Analysts remain sanguine about the company’s long-term"]},
  sardonic:{pos:"adjective",synonyms:["sarcastic","wry"],antonyms:["明確な反意語なし"],collocations:["considered an sardonic approach to","what it considered an sardonic approach to the problem"]},
  scrupulous:{pos:"adjective",synonyms:["conscientious","painstaking"],antonyms:["unscrupulous"],collocations:["Her scrupulous explanation changed","Her scrupulous explanation changed how the"]},
  scrutinize:{pos:"verb",synonyms:["examine","inspect"],antonyms:["overlook","ignore"],collocations:["scrutinize the evidence","closely scrutinize"]},
  sporadic:{pos:"adjective",synonyms:["intermittent","isolated"],antonyms:["continual"],collocations:["Her sporadic explanation changed","Her sporadic explanation changed how the"]},
  spurious:{pos:"adjective",synonyms:["inauthentic","counterfeit"],antonyms:["明確な反意語なし"],collocations:["response as spurious during the","the government's response as spurious during the national debate"]},
  staunch:{pos:"adjective",synonyms:["steadfast","constant"],antonyms:["明確な反意語なし"],collocations:["considered an staunch approach to","what it considered an staunch approach to the problem"]},
  stringent:{pos:"adjective",synonyms:["rigorous","tight"],antonyms:["明確な反意語なし"],collocations:["government introduced stringent rules to","The government introduced stringent rules to prevent financial"]},
  substantiate:{pos:"verb",synonyms:["verify","corroborate"],antonyms:["refute","disprove"],collocations:["substantiate a claim","substantiate allegations"]},
  succinct:{pos:"adjective",synonyms:["concise","summary"],antonyms:["明確な反意語なし"],collocations:["considered an succinct approach to","what it considered an succinct approach to the problem"]},
  superfluous:{pos:"adjective",synonyms:["extra","excess"],antonyms:["明確な反意語なし"],collocations:["Her superfluous explanation changed","Her superfluous explanation changed how the"]},
  suppress:{pos:"verb",synonyms:["repress","subdue"],antonyms:["明確な反意語なし"],collocations:["policy could suppress efforts to","The new policy could suppress efforts to restore public"]},
  surreptitious:{pos:"unknown",synonyms:["stealthy","sneaky"],antonyms:["明確な反意語なし"],collocations:["held a surreptitious meeting before","The executives held a surreptitious meeting before the announcement"]},
  tacit:{pos:"unknown",synonyms:["silent","inexplicit"],antonyms:["明確な反意語なし"],collocations:["was a tacit agreement not","There was a tacit agreement not to discuss"]},
  tenacious:{pos:"adjective",synonyms:["pertinacious","dogged"],antonyms:["明確な反意語なし"],collocations:["Her tenacious explanation changed","Her tenacious explanation changed how the"]},
  tenuous:{pos:"adjective",synonyms:["weak","flimsy"],antonyms:["strong","substantial"],collocations:["a tenuous link","a tenuous argument"]},
  tirade:{pos:"noun",synonyms:["broadside","philippic"],antonyms:["明確な反意語なし"],collocations:["concern about tirade grew after","Public concern about tirade grew after the investigation"]},
  transient:{pos:"adjective",synonyms:["fugacious","passing"],antonyms:["immanent","subjective"],collocations:["Her transient explanation changed","Her transient explanation changed how the"]},
  truculent:{pos:"unknown",synonyms:["aggressive","hostile"],antonyms:["明確な反意語なし"],collocations:["The negotiator’s truculent tone made","The negotiator’s truculent tone made compromise impossible"]},
  turbulent:{pos:"adjective",synonyms:["tumultuous","riotous"],antonyms:["明確な反意語なし"],collocations:["response as turbulent during the","the government's response as turbulent during the national debate"]},
  ubiquitous:{pos:"adjective",synonyms:["omnipresent","pervasive"],antonyms:["rare","scarce"],collocations:["increasingly ubiquitous","ubiquitous presence"]},
  unequivocal:{pos:"adjective",synonyms:["unambiguous","unquestionable"],antonyms:["ambiguous","equivocal"],collocations:["considered an unequivocal approach to","what it considered an unequivocal approach to the problem"]},
  unprecedented:{pos:"adjective",synonyms:["unexampled","new"],antonyms:["precedented"],collocations:["considered an unprecedented approach to","what it considered an unprecedented approach to the problem"]},
  untenable:{pos:"unknown",synonyms:["indefensible","unreasonable"],antonyms:["明確な反意語なし"],collocations:["position became untenable after new","The minister’s position became untenable after new evidence emerged"]},
  vacillate:{pos:"verb",synonyms:["stagger","blow hot and cold"],antonyms:["明確な反意語なし"],collocations:["continued to vacillate between two","The committee continued to vacillate between two competing proposals"]},
  vaunted:{pos:"verb",synonyms:["boast","brag"],antonyms:["明確な反意語なし"],collocations:["The company’s vaunted security system","The company’s vaunted security system failed during"]},
  venerate:{pos:"verb",synonyms:["reverence","revere"],antonyms:["明確な反意語なし"],collocations:["policy could venerate efforts to","The new policy could venerate efforts to restore public"]},
  vicarious:{pos:"adjective",synonyms:["secondary","ancillary"],antonyms:["明確な反意語なし"],collocations:["response as vicarious during the","the government's response as vicarious during the national debate"]},
  vindicate:{pos:"verb",synonyms:["justify","exonerate"],antonyms:["condemn","implicate"],collocations:["vindicate a decision","feel vindicated"]},
  virulent:{pos:"adjective",synonyms:["venomous","toxic"],antonyms:["avirulent"],collocations:["Her virulent explanation changed","Her virulent explanation changed how the"]},
  vitriolic:{pos:"adjective",synonyms:["sulfurous","sulphurous"],antonyms:["明確な反意語なし"],collocations:["response as vitriolic during the","the government's response as vitriolic during the national debate"]},
  vociferous:{pos:"unknown",synonyms:["clamorous","clamourous"],antonyms:["明確な反意語なし"],collocations:["There was vociferous opposition to","There was vociferous opposition to the proposed"]},
  volatile:{pos:"adjective",synonyms:["vaporific","volatilizable"],antonyms:["nonvolatile","nonvolatilizable"],collocations:["response as volatile during the","the government's response as volatile during the national debate"]},
  wane:{pos:"verb",synonyms:["decline","go down"],antonyms:["full","rise"],collocations:["officials might wane the principles","warned that officials might wane the principles they had"]},
  wary:{pos:"adjective",synonyms:["cautious","vigilant"],antonyms:["trusting","careless"],collocations:["wary of change","remain wary"]},
  watershed:{pos:"noun",synonyms:["water parting","divide"],antonyms:["明確な反意語なし"],collocations:["report identified watershed as a","The report identified watershed as a serious obstacle"]},
  whimsical:{pos:"adjective",synonyms:["capricious","impulsive"],antonyms:["明確な反意語なし"],collocations:["considered an whimsical approach to","what it considered an whimsical approach to the problem"]},
  withstand:{pos:"verb",synonyms:["stand firm","hold out"],antonyms:["surrender","give up"],collocations:["tried to withstand the claim","Independent investigators tried to withstand the claim before the"]},
  yearn:{pos:"verb",synonyms:["hanker","ache"],antonyms:["明確な反意語なし"],collocations:["tried to yearn the claim","Independent investigators tried to yearn the claim before the"]},
  zealot:{pos:"noun",synonyms:["partisan","fanatic"],antonyms:["明確な反意語なし"],collocations:["consequences of zealot","the social consequences of zealot"]},
  zealous:{pos:"unknown",synonyms:["avid","enthusiastic"],antonyms:["明確な反意語なし"],collocations:["is a zealous advocate of","She is a zealous advocate of education reform"]}
};
Object.assign(DETAILS,{
  aberration:{pos:"noun",synonyms:["anomaly","deviation"],antonyms:["normality","regularity"],collocations:["a statistical aberration","an aberration from the norm","a temporary aberration","regard something as an aberration"]},
  acrimonious:{pos:"adjective",synonyms:["bitter","hostile"],antonyms:["amicable","cordial"],collocations:["an acrimonious dispute","an acrimonious debate","an acrimonious divorce","an acrimonious exchange"]},
  anomaly:{pos:"noun",synonyms:["irregularity","aberration"],antonyms:["normality","regularity"],collocations:["detect an anomaly","an anomaly in the data","a statistical anomaly","an unexplained anomaly"]},
  assuage:{pos:"verb",synonyms:["ease","alleviate"],antonyms:["aggravate","intensify"],collocations:["assuage fears","assuage concerns","assuage public anxiety","assuage someone's guilt"]},
  austere:{pos:"adjective",synonyms:["severe","spartan"],antonyms:["luxurious","ornate"],collocations:["an austere budget","austere economic measures","an austere lifestyle","an austere approach to spending"]},
  belligerent:{pos:"adjective",synonyms:["hostile","aggressive"],antonyms:["peaceful","conciliatory"],collocations:["belligerent rhetoric","a belligerent stance","a belligerent attitude","belligerent behavior"]},
  bolster:{pos:"verb",synonyms:["strengthen","reinforce"],antonyms:["weaken","undermine"],collocations:["bolster confidence","bolster the economy","bolster an argument","bolster support for a policy"]},
  capricious:{pos:"adjective",synonyms:["unpredictable","whimsical"],antonyms:["consistent","predictable"],collocations:["a capricious decision","capricious behavior","capricious changes","a capricious leader"]},
  censure:{pos:"verb",synonyms:["condemn","reprimand"],antonyms:["praise","commend"],collocations:["censure an official","censure a government","face public censure","a motion of censure"]},
  concede:{pos:"verb",synonyms:["admit","acknowledge"],antonyms:["deny","dispute"],collocations:["concede that","concede a point","concede defeat","concede an election"]},
  dearth:{pos:"noun",synonyms:["scarcity","shortage"],antonyms:["abundance","surplus"],collocations:["a dearth of evidence","a dearth of information","a dearth of qualified workers","a dearth of investment"]},
  deleterious:{pos:"adjective",synonyms:["harmful","damaging"],antonyms:["beneficial","harmless"],collocations:["deleterious effects","a deleterious impact","deleterious consequences","be deleterious to health"]},
  disparage:{pos:"verb",synonyms:["belittle","denigrate"],antonyms:["praise","commend"],collocations:["disparage a rival","disparage someone's achievements","disparage a person's character","publicly disparage someone"]},
  elicit:{pos:"verb",synonyms:["evoke","draw out"],antonyms:["suppress","stifle"],collocations:["elicit a response","elicit sympathy","elicit information","elicit laughter"]},
  emulate:{pos:"verb",synonyms:["imitate","copy"],antonyms:["differ from","depart from"],collocations:["emulate a model","emulate someone's success","emulate a strategy","seek to emulate"]},
  ephemeral:{pos:"adjective",synonyms:["short-lived","transient"],antonyms:["lasting","enduring"],collocations:["an ephemeral trend","ephemeral popularity","the ephemeral nature of fame","an ephemeral pleasure"]},
  exacerbate:{pos:"verb",synonyms:["worsen","aggravate"],antonyms:["alleviate","mitigate"],collocations:["exacerbate a problem","exacerbate tensions","exacerbate inequality","exacerbate the situation"]},
  fastidious:{pos:"adjective",synonyms:["meticulous","scrupulous"],antonyms:["careless","sloppy"],collocations:["fastidious attention to detail","fastidious about hygiene","a fastidious editor","fastidious standards"]},
  galvanize:{pos:"verb",synonyms:["mobilize","spur"],antonyms:["discourage","demoralize"],collocations:["galvanize public opinion","galvanize support","galvanize voters into action","galvanize a movement"]},
  intransigent:{pos:"adjective",synonyms:["uncompromising","obdurate"],antonyms:["flexible","conciliatory"],collocations:["an intransigent stance","remain intransigent","an intransigent position","intransigent demands"]},
  laconic:{pos:"adjective",synonyms:["terse","succinct"],antonyms:["verbose","garrulous"],collocations:["a laconic reply","a laconic comment","a laconic manner","be laconic in speech"]},
  mitigate:{pos:"verb",synonyms:["alleviate","reduce"],antonyms:["exacerbate","aggravate"],collocations:["mitigate the effects of","mitigate a risk","mitigate climate change","mitigate the impact"]},
  obdurate:{pos:"adjective",synonyms:["stubborn","intransigent"],antonyms:["flexible","amenable"],collocations:["remain obdurate","an obdurate refusal","an obdurate attitude","be obdurate in the face of criticism"]},
  perfunctory:{pos:"adjective",synonyms:["cursory","superficial"],antonyms:["thorough","meticulous"],collocations:["a perfunctory review","a perfunctory apology","a perfunctory inspection","give a perfunctory response"]},
  proliferate:{pos:"verb",synonyms:["multiply","spread"],antonyms:["decline","diminish"],collocations:["proliferate rapidly","proliferate online","weapons proliferate","a proliferation of rumors"]},
  recalcitrant:{pos:"adjective",synonyms:["defiant","uncooperative"],antonyms:["compliant","cooperative"],collocations:["a recalcitrant child","a recalcitrant employee","recalcitrant behavior","remain recalcitrant"]},
  repudiate:{pos:"verb",synonyms:["reject","disown"],antonyms:["accept","endorse"],collocations:["repudiate a claim","repudiate a contract","repudiate an allegation","repudiate responsibility"]},
  resilient:{pos:"adjective",synonyms:["robust","adaptable"],antonyms:["fragile","vulnerable"],collocations:["a resilient economy","a resilient community","be resilient in the face of adversity","a resilient supply chain"]},
  scrutinize:{pos:"verb",synonyms:["examine","inspect"],antonyms:["overlook","ignore"],collocations:["scrutinize the evidence","scrutinize a proposal","closely scrutinize","come under scrutiny"]},
  tenuous:{pos:"adjective",synonyms:["weak","fragile"],antonyms:["strong","solid"],collocations:["a tenuous link","tenuous evidence","a tenuous relationship","a tenuous hold on power"]},
  ubiquitous:{pos:"adjective",synonyms:["widespread","omnipresent"],antonyms:["rare","scarce"],collocations:["be ubiquitous in","become ubiquitous","a ubiquitous feature","ubiquitous access to technology"]},
  vacillate:{pos:"verb",synonyms:["waver","hesitate"],antonyms:["decide","resolve"],collocations:["vacillate between two options","vacillate over a decision","continue to vacillate","vacillate between optimism and pessimism"]},
  vindicate:{pos:"verb",synonyms:["exonerate","justify"],antonyms:["incriminate","discredit"],collocations:["vindicate a decision","vindicate someone's actions","be vindicated by evidence","feel vindicated"]},
  wary:{pos:"adjective",synonyms:["cautious","suspicious"],antonyms:["trusting","careless"],collocations:["wary of strangers","wary of making promises","be wary about","a wary response"]},
  onerous:{pos:"adjective",synonyms:["burdensome","demanding"],antonyms:["easy","undemanding"],collocations:["an onerous task","onerous requirements","an onerous burden","onerous regulations"]},
  destitute:{pos:"adjective",synonyms:["impoverished","penniless"],antonyms:["wealthy","affluent"],collocations:["be left destitute","a destitute family","destitute of resources","the destitute and homeless"]},
  amnesty:{pos:"noun",synonyms:["pardon","reprieve"],antonyms:["prosecution","punishment"],collocations:["grant an amnesty","declare an amnesty","a general amnesty","an amnesty for political prisoners"]},
  conundrum:{pos:"noun",synonyms:["dilemma","puzzle"],antonyms:["solution","certainty"],collocations:["pose a conundrum","a moral conundrum","face a conundrum","a policy conundrum"]},
  contentious:{pos:"adjective",synonyms:["controversial","disputed"],antonyms:["uncontroversial","agreed"],collocations:["a contentious issue","a contentious debate","a highly contentious proposal","remain contentious"]},
  candid:{pos:"adjective",synonyms:["frank","open"],antonyms:["evasive","guarded"],collocations:["a candid assessment","a candid conversation","be candid about","a candid admission"]},
  mundane:{pos:"adjective",synonyms:["ordinary","routine"],antonyms:["extraordinary","remarkable"],collocations:["a mundane task","mundane details","the mundane realities of","a mundane routine"]},
  fiasco:{pos:"noun",synonyms:["debacle","disaster"],antonyms:["success","triumph"],collocations:["end in fiasco","a public fiasco","an electoral fiasco","turn into a fiasco"]},
  defunct:{pos:"adjective",synonyms:["disbanded","obsolete"],antonyms:["active","operational"],collocations:["a defunct company","a defunct organization","a long-defunct factory","a defunct political party"]},
  vaunted:{pos:"adjective",synonyms:["celebrated","much-praised"],antonyms:["unheralded","underrated"],collocations:["a vaunted reputation","a vaunted achievement","the vaunted benefits of","a much-vaunted policy"]},
  fraudulent:{pos:"adjective",synonyms:["deceptive","dishonest"],antonyms:["genuine","legitimate"],collocations:["fraudulent activity","a fraudulent claim","fraudulent transactions","a fraudulent scheme"]},
  stringent:{pos:"adjective",synonyms:["strict","rigorous"],antonyms:["lenient","lax"],collocations:["stringent regulations","stringent safety standards","stringent requirements","stringent measures"]},
  pragmatic:{pos:"adjective",synonyms:["practical","realistic"],antonyms:["idealistic","impractical"],collocations:["a pragmatic approach","a pragmatic solution","a pragmatic decision","take a pragmatic view"]},
  salient:{pos:"adjective",synonyms:["notable","prominent"],antonyms:["minor","irrelevant"],collocations:["a salient feature","the salient point","salient facts","a salient issue"]},
  imminent:{pos:"adjective",synonyms:["impending","forthcoming"],antonyms:["distant","remote"],collocations:["an imminent threat","imminent danger","be imminent","an imminent departure"]},
  plausible:{pos:"adjective",synonyms:["credible","believable"],antonyms:["implausible","unconvincing"],collocations:["a plausible explanation","a plausible argument","a plausible scenario","seem plausible"]}
  ,arbitrary:{pos:"adjective",synonyms:["random","capricious"],antonyms:["fair","reasoned"],collocations:["an arbitrary decision","arbitrary rules","an arbitrary limit","seem arbitrary"]}
  ,coherent:{pos:"adjective",synonyms:["logical","consistent"],antonyms:["incoherent","confused"],collocations:["a coherent argument","a coherent policy","a coherent explanation","a coherent strategy"]}
  ,ambiguous:{pos:"adjective",synonyms:["vague","equivocal"],antonyms:["clear","unequivocal"],collocations:["ambiguous language","an ambiguous statement","an ambiguous result","remain ambiguous"]}
  ,conspicuous:{pos:"adjective",synonyms:["noticeable","prominent"],antonyms:["inconspicuous","hidden"],collocations:["a conspicuous absence","conspicuous consumption","be conspicuous by its absence","a conspicuous feature"]}
  ,lucrative:{pos:"adjective",synonyms:["profitable","rewarding"],antonyms:["unprofitable","loss-making"],collocations:["a lucrative business","a lucrative contract","a lucrative market","a lucrative career"]}
  ,precipitous:{pos:"adjective",synonyms:["steep","sudden"],antonyms:["gradual","gentle"],collocations:["a precipitous decline","a precipitous drop","a precipitous fall","a precipitous slope"]}
  ,untenable:{pos:"adjective",synonyms:["indefensible","unsustainable"],antonyms:["defensible","sustainable"],collocations:["an untenable position","an untenable situation","become untenable","an untenable argument"]}
  ,indispensable:{pos:"adjective",synonyms:["essential","vital"],antonyms:["dispensable","optional"],collocations:["an indispensable role","indispensable to success","an indispensable tool","an indispensable part of"]}
  ,meticulous:{pos:"adjective",synonyms:["careful","thorough"],antonyms:["careless","sloppy"],collocations:["meticulous planning","meticulous attention to detail","a meticulous review","meticulous research"]}
  ,formidable:{pos:"adjective",synonyms:["daunting","powerful"],antonyms:["weak","manageable"],collocations:["a formidable challenge","a formidable opponent","a formidable task","formidable obstacles"]}
  ,inadvertent:{pos:"adjective",synonyms:["unintentional","accidental"],antonyms:["deliberate","intentional"],collocations:["an inadvertent error","an inadvertent omission","inadvertent disclosure","an inadvertent consequence"]}
  ,complacent:{pos:"adjective",synonyms:["self-satisfied","smug"],antonyms:["vigilant","concerned"],collocations:["become complacent","a complacent attitude","complacent about success","remain complacent"]}
  ,exemplary:{pos:"adjective",synonyms:["outstanding","commendable"],antonyms:["poor","substandard"],collocations:["exemplary conduct","an exemplary record","an exemplary performance","set an exemplary standard"]}
  ,discrepancy:{pos:"noun",synonyms:["inconsistency","difference"],antonyms:["agreement","consistency"],collocations:["a discrepancy between","a discrepancy in the data","explain a discrepancy","a significant discrepancy"]}
  ,ramification:{pos:"noun",synonyms:["consequence","implication"],antonyms:["cause","origin"],collocations:["far-reaching ramifications","legal ramifications","the ramifications of a decision","have serious ramifications"]}
  ,predicament:{pos:"noun",synonyms:["dilemma","plight"],antonyms:["advantage","solution"],collocations:["find oneself in a predicament","a difficult predicament","an embarrassing predicament","get out of a predicament"]}
  ,proponent:{pos:"noun",synonyms:["advocate","supporter"],antonyms:["opponent","detractor"],collocations:["a leading proponent of","proponents argue that","a vocal proponent","a proponent of reform"]}
  ,detractor:{pos:"noun",synonyms:["critic","opponent"],antonyms:["supporter","proponent"],collocations:["detractors argue that","a vocal detractor","critics and detractors","detractors of the policy"]}
  ,impetus:{pos:"noun",synonyms:["stimulus","driving force"],antonyms:["hindrance","deterrent"],collocations:["provide an impetus for","give impetus to","the impetus behind","a major impetus"]}
  ,moratorium:{pos:"noun",synonyms:["suspension","freeze"],antonyms:["resumption","continuation"],collocations:["impose a moratorium on","a temporary moratorium","lift a moratorium","call for a moratorium"]}
  ,adversity:{pos:"noun",synonyms:["hardship","misfortune"],antonyms:["prosperity","advantage"],collocations:["face adversity","overcome adversity","in the face of adversity","adversity and hardship"]}
  ,alleviate:{pos:"verb",synonyms:["ease","relieve"],antonyms:["aggravate","worsen"],collocations:["alleviate poverty","alleviate pain","alleviate concerns","alleviate the burden"]}
  ,curtail:{pos:"verb",synonyms:["reduce","restrict"],antonyms:["expand","extend"],collocations:["curtail spending","curtail freedom","curtail production","curtail the use of"]}
  ,deride:{pos:"verb",synonyms:["mock","ridicule"],antonyms:["praise","respect"],collocations:["deride an idea","deride a proposal","be widely derided","deride someone as"]}
  ,dissuade:{pos:"verb",synonyms:["deter","discourage"],antonyms:["persuade","encourage"],collocations:["dissuade someone from","dissuade potential investors","be dissuaded by","dissuade people from voting"]}
  ,engender:{pos:"verb",synonyms:["generate","foster"],antonyms:["destroy","eradicate"],collocations:["engender trust","engender resentment","engender support","engender a sense of"]}
  ,forfeit:{pos:"verb",synonyms:["lose","surrender"],antonyms:["retain","gain"],collocations:["forfeit a right","forfeit an opportunity","forfeit a deposit","forfeit the right to"]}
  ,impede:{pos:"verb",synonyms:["hinder","obstruct"],antonyms:["facilitate","expedite"],collocations:["impede progress","impede economic growth","impede access to","impede the development of"]}
  ,obfuscate:{pos:"verb",synonyms:["obscure","confuse"],antonyms:["clarify","illuminate"],collocations:["obfuscate the issue","obfuscate the facts","deliberately obfuscate","obfuscate the distinction between"]}
  ,perpetuate:{pos:"verb",synonyms:["continue","reinforce"],antonyms:["end","eradicate"],collocations:["perpetuate a myth","perpetuate inequality","perpetuate a stereotype","perpetuate the cycle of"]}
  ,rectify:{pos:"verb",synonyms:["correct","remedy"],antonyms:["worsen","aggravate"],collocations:["rectify an error","rectify a problem","take steps to rectify","rectify an injustice"]}
  ,substantiate:{pos:"verb",synonyms:["support","verify"],antonyms:["refute","disprove"],collocations:["substantiate a claim","substantiate an allegation","be substantiated by evidence","fail to substantiate"]}
  ,surreptitious:{pos:"adjective",synonyms:["secretive","covert"],antonyms:["open","overt"],collocations:["a surreptitious glance","a surreptitious attempt","surreptitious activity","act in a surreptitious manner"]}
  ,tacit:{pos:"adjective",synonyms:["implicit","unspoken"],antonyms:["explicit","stated"],collocations:["tacit approval","tacit consent","a tacit agreement","a tacit understanding"]}
  ,ostensible:{pos:"adjective",synonyms:["apparent","supposed"],antonyms:["real","actual"],collocations:["the ostensible purpose","an ostensible reason","the ostensible aim of","ostensibly independent"]}
  ,equivocal:{pos:"adjective",synonyms:["ambiguous","uncertain"],antonyms:["unequivocal","clear"],collocations:["an equivocal response","equivocal language","an equivocal statement","remain equivocal"]}
  ,incumbent:{pos:"adjective",synonyms:["obligatory","necessary"],antonyms:["optional","unnecessary"],collocations:["it is incumbent on","incumbent upon someone to","an incumbent president","the incumbent government"]}
  ,magnanimous:{pos:"adjective",synonyms:["generous","forgiving"],antonyms:["petty","vindictive"],collocations:["be magnanimous in victory","a magnanimous gesture","a magnanimous response","magnanimous toward an opponent"]}
  ,parochial:{pos:"adjective",synonyms:["narrow-minded","provincial"],antonyms:["broad-minded","cosmopolitan"],collocations:["a parochial outlook","parochial interests","a parochial view","a parochial attitude"]}
  ,prescient:{pos:"adjective",synonyms:["far-sighted","prophetic"],antonyms:["short-sighted","unforeseeing"],collocations:["a prescient warning","a prescient observation","a prescient analysis","be prescient about"]}
  ,quixotic:{pos:"adjective",synonyms:["idealistic","impractical"],antonyms:["pragmatic","realistic"],collocations:["a quixotic quest","a quixotic attempt","a quixotic vision","a quixotic plan"]}
  ,rancor:{pos:"noun",synonyms:["bitterness","resentment"],antonyms:["goodwill","amity"],collocations:["deep-seated rancor","rancor toward someone","with no rancor","political rancor"]}
  ,relegate:{pos:"verb",synonyms:["demote","assign"],antonyms:["promote","elevate"],collocations:["relegate someone to","relegate to a minor role","be relegated to","relegate an issue to"]}
  ,sanguine:{pos:"adjective",synonyms:["optimistic","confident"],antonyms:["pessimistic","gloomy"],collocations:["be sanguine about","a sanguine outlook","remain sanguine","a sanguine assessment"]}
  ,truculent:{pos:"adjective",synonyms:["aggressive","belligerent"],antonyms:["peaceful","conciliatory"],collocations:["a truculent response","truculent behavior","a truculent tone","become truculent"]}
  ,vociferous:{pos:"adjective",synonyms:["outspoken","loud"],antonyms:["quiet","reticent"],collocations:["vociferous opposition","a vociferous critic","be vociferous in support of","vociferous demands"]}
  ,zealous:{pos:"adjective",synonyms:["enthusiastic","ardent"],antonyms:["indifferent","apathetic"],collocations:["a zealous advocate","zealous support","be zealous in","a zealous campaigner"]}
  ,abate:{pos:"verb",synonyms:["subside","diminish"],antonyms:["intensify","increase"],collocations:["the storm abated","abate a nuisance","show no sign of abating","abate gradually"]}
  ,inundate:{pos:"verb",synonyms:["flood","overwhelm"],antonyms:["drain","relieve"],collocations:["inundate an area","be inundated with requests","inundate the market","inundate a town with floodwater"]}
  ,exonerate:{pos:"verb",synonyms:["clear","acquit"],antonyms:["incriminate","convict"],collocations:["exonerate someone of a crime","fully exonerate","exonerate an official","evidence exonerates someone"]}
  ,abdicate:{pos:"verb",synonyms:["renounce","relinquish"],antonyms:["assume","retain"],collocations:["abdicate the throne","abdicate responsibility","abdicate a duty","abdicate in favor of"]}
  ,abhor:{pos:"verb",synonyms:["loathe","detest"],antonyms:["love","admire"],collocations:["abhor violence","abhor discrimination","abhor the thought of","be universally abhorred"]}
  ,abject:{pos:"adjective",synonyms:["miserable","wretched"],antonyms:["proud","prosperous"],collocations:["abject poverty","abject failure","abject humiliation","abject misery"]}
  ,abrogate:{pos:"verb",synonyms:["repeal","revoke"],antonyms:["enact","uphold"],collocations:["abrogate a treaty","abrogate an agreement","abrogate a law","abrogate a contract"]}
  ,accolade:{pos:"noun",synonyms:["award","honor"],antonyms:["criticism","censure"],collocations:["receive an accolade","win an accolade","a prestigious accolade","bestow an accolade on"]}
  ,acquiesce:{pos:"verb",synonyms:["consent","comply"],antonyms:["resist","object"],collocations:["acquiesce in a decision","acquiesce to a request","reluctantly acquiesce","acquiesce without protest"]}
  ,admonish:{pos:"verb",synonyms:["reprimand","rebuke"],antonyms:["praise","commend"],collocations:["admonish someone for","admonish someone to","gently admonish","admonish a child"]}
  ,adroit:{pos:"adjective",synonyms:["skillful","deft"],antonyms:["clumsy","inept"],collocations:["an adroit negotiator","an adroit handling of","an adroit move","adroit at managing"]}
  ,affable:{pos:"adjective",synonyms:["friendly","genial"],antonyms:["aloof","unfriendly"],collocations:["an affable manner","an affable host","be affable toward","an affable personality"]}
  ,affluent:{pos:"adjective",synonyms:["wealthy","prosperous"],antonyms:["poor","destitute"],collocations:["an affluent society","an affluent neighborhood","affluent consumers","an affluent country"]}
  ,aggrandize:{pos:"verb",synonyms:["enhance","exaggerate"],antonyms:["diminish","belittle"],collocations:["aggrandize one's power","aggrandize oneself","aggrandize a reputation","seek to aggrandize"]}
  ,alacrity:{pos:"noun",synonyms:["eagerness","promptness"],antonyms:["reluctance","hesitation"],collocations:["with alacrity","respond with alacrity","accept with alacrity","act with alacrity"]}
  ,alienate:{pos:"verb",synonyms:["estrange","isolate"],antonyms:["unite","reconcile"],collocations:["alienate voters","alienate an audience","alienate someone from","feel alienated from"]}
  ,amalgamate:{pos:"verb",synonyms:["combine","merge"],antonyms:["separate","divide"],collocations:["amalgamate two companies","amalgamate into a single entity","amalgamate resources","be amalgamated with"]}
  ,ambivalent:{pos:"adjective",synonyms:["conflicted","uncertain"],antonyms:["certain","decisive"],collocations:["feel ambivalent about","be ambivalent toward","an ambivalent attitude","remain ambivalent"]}
  ,amenable:{pos:"adjective",synonyms:["receptive","willing"],antonyms:["resistant","intransigent"],collocations:["amenable to change","amenable to negotiation","amenable to treatment","amenable to compromise"]}
  ,anachronism:{pos:"noun",synonyms:["relic","incongruity"],antonyms:["modernity","innovation"],collocations:["an obvious anachronism","a historical anachronism","regard as an anachronism","seem like an anachronism"]}
  ,animosity:{pos:"noun",synonyms:["hostility","resentment"],antonyms:["goodwill","amity"],collocations:["deep-seated animosity","animosity toward someone","racial animosity","feel animosity toward"]}
  ,antipathy:{pos:"noun",synonyms:["aversion","hostility"],antonyms:["affection","sympathy"],collocations:["an antipathy toward","a deep antipathy","feel antipathy toward","mutual antipathy"]}
  ,appease:{pos:"verb",synonyms:["placate","calm"],antonyms:["provoke","aggravate"],collocations:["appease public concern","appease an opponent","appease someone's anger","attempt to appease"]}
  ,apprehensive:{pos:"adjective",synonyms:["anxious","worried"],antonyms:["confident","reassured"],collocations:["feel apprehensive about","be apprehensive of","an apprehensive look","grow apprehensive"]}
  ,arcane:{pos:"adjective",synonyms:["obscure","esoteric"],antonyms:["clear","accessible"],collocations:["arcane knowledge","an arcane subject","arcane terminology","an arcane rule"]}
  ,arduous:{pos:"adjective",synonyms:["strenuous","laborious"],antonyms:["easy","effortless"],collocations:["an arduous task","an arduous journey","an arduous process","an arduous undertaking"]}
  ,articulate:{pos:"verb",synonyms:["express","state"],antonyms:["conceal","suppress"],collocations:["articulate a view","articulate clearly","articulate a concern","articulate the need for"]}
  ,ascertain:{pos:"verb",synonyms:["determine","establish"],antonyms:["guess","ignore"],collocations:["ascertain whether","ascertain the facts","ascertain the cause","be difficult to ascertain"]}
  ,astute:{pos:"adjective",synonyms:["shrewd","perceptive"],antonyms:["naive","unwise"],collocations:["an astute observer","an astute decision","astute political judgment","an astute analysis"]}
  ,atrophy:{pos:"verb",synonyms:["wither","deteriorate"],antonyms:["develop","strengthen"],collocations:["muscles atrophy","atrophy through disuse","begin to atrophy","a sense of atrophy"]}
  ,avarice:{pos:"noun",synonyms:["greed","cupidity"],antonyms:["generosity","charity"],collocations:["insatiable avarice","driven by avarice","a symbol of avarice","personal avarice"]}
  ,avert:{pos:"verb",synonyms:["prevent","avoid"],antonyms:["cause","trigger"],collocations:["avert a crisis","avert a disaster","avert the risk of","help avert"]}
  ,banal:{pos:"adjective",synonyms:["trite","hackneyed"],antonyms:["original","innovative"],collocations:["a banal remark","a banal observation","banal clichés","sound banal"]}
  ,belie:{pos:"verb",synonyms:["contradict","disguise"],antonyms:["confirm","reveal"],collocations:["belie appearances","belie the fact that","a smile belies","belie someone's age"]}
  ,bereft:{pos:"adjective",synonyms:["deprived","devoid"],antonyms:["endowed","provided"],collocations:["bereft of hope","bereft of meaning","be left bereft","bereft of resources"]}
  ,blatant:{pos:"adjective",synonyms:["obvious","flagrant"],antonyms:["subtle","concealed"],collocations:["a blatant lie","a blatant violation","blatant discrimination","be blatantly unfair"]}
  ,boisterous:{pos:"adjective",synonyms:["rowdy","lively"],antonyms:["quiet","subdued"],collocations:["boisterous laughter","a boisterous crowd","boisterous behavior","a boisterous celebration"]}
  ,brevity:{pos:"noun",synonyms:["conciseness","shortness"],antonyms:["length","verbosity"],collocations:["for the sake of brevity","brevity and clarity","remarkable brevity","the brevity of"]}
  ,cajole:{pos:"verb",synonyms:["persuade","coax"],antonyms:["dissuade","deter"],collocations:["cajole someone into","cajole someone to","try to cajole","cajole a reluctant witness"]}
  ,callous:{pos:"adjective",synonyms:["insensitive","heartless"],antonyms:["compassionate","sensitive"],collocations:["a callous disregard for","a callous attitude","callous treatment","be callous toward"]}
  ,camaraderie:{pos:"noun",synonyms:["companionship","fellowship"],antonyms:["isolation","hostility"],collocations:["a sense of camaraderie","foster camaraderie","team camaraderie","build camaraderie among"]}
  ,catharsis:{pos:"noun",synonyms:["release","purging"],antonyms:["suppression","restraint"],collocations:["a sense of catharsis","provide catharsis","emotional catharsis","experience a catharsis"]}
  ,circumspect:{pos:"adjective",synonyms:["cautious","prudent"],antonyms:["rash","reckless"],collocations:["be circumspect about","a circumspect approach","remain circumspect","circumspect in dealing with"]}
  ,coalesce:{pos:"verb",synonyms:["merge","unite"],antonyms:["separate","fragment"],collocations:["coalesce around an idea","coalesce into a group","begin to coalesce","coalesce into a movement"]}
  ,coerce:{pos:"verb",synonyms:["compel","force"],antonyms:["persuade","encourage"],collocations:["coerce someone into","coerce someone to","be coerced into","use force to coerce"]}
  ,cogent:{pos:"adjective",synonyms:["convincing","persuasive"],antonyms:["weak","unconvincing"],collocations:["a cogent argument","cogent evidence","a cogent explanation","make a cogent case"]}
  ,commensurate:{pos:"adjective",synonyms:["proportionate","corresponding"],antonyms:["disproportionate","inadequate"],collocations:["commensurate with experience","commensurate with the risk","be commensurate with","a commensurate increase"]}
  ,complicity:{pos:"noun",synonyms:["involvement","collusion"],antonyms:["innocence","noninvolvement"],collocations:["complicity in a crime","be complicit in","alleged complicity","deny complicity"]}
  ,conciliatory:{pos:"adjective",synonyms:["peaceful","accommodating"],antonyms:["hostile","confrontational"],collocations:["a conciliatory tone","a conciliatory gesture","a conciliatory approach","make a conciliatory statement"]}
  ,conflagration:{pos:"noun",synonyms:["blaze","inferno"],antonyms:["extinction","calm"],collocations:["a major conflagration","a raging conflagration","a conflagration broke out","contain a conflagration"]}
  ,conscientious:{pos:"adjective",synonyms:["diligent","scrupulous"],antonyms:["careless","negligent"],collocations:["a conscientious effort","a conscientious employee","be conscientious about","conscientious attention to"]}
  ,clandestine:{pos:"adjective",synonyms:["secret","covert"],antonyms:["open","overt"],collocations:["a clandestine operation","a clandestine meeting","clandestine activities","remain clandestine"]}
  ,construe:{pos:"verb",synonyms:["interpret","understand"],antonyms:["misinterpret","ignore"],collocations:["construe as a sign of","construe a statement as","strictly construe","construe the law"]}
  ,contemptuous:{pos:"adjective",synonyms:["scornful","disdainful"],antonyms:["respectful","admiring"],collocations:["a contemptuous tone","a contemptuous remark","be contemptuous of","a contemptuous glance"]}
  ,contrite:{pos:"adjective",synonyms:["remorseful","penitent"],antonyms:["unrepentant","defiant"],collocations:["be deeply contrite","a contrite apology","feel contrite about","a contrite expression"]}
  ,copious:{pos:"adjective",synonyms:["abundant","plentiful"],antonyms:["scant","meager"],collocations:["copious amounts of","copious notes","copious evidence","in copious detail"]}
  ,corroborate:{pos:"verb",synonyms:["confirm","support"],antonyms:["contradict","refute"],collocations:["corroborate evidence","corroborate a claim","be corroborated by","corroborate an account"]}
  ,credulous:{pos:"adjective",synonyms:["gullible","naive"],antonyms:["skeptical","discerning"],collocations:["a credulous audience","be credulous about","the credulous public","overly credulous"]}
  ,culpable:{pos:"adjective",synonyms:["guilty","blameworthy"],antonyms:["innocent","blameless"],collocations:["be culpable for","hold someone culpable","culpable negligence","morally culpable"]}
  ,debase:{pos:"verb",synonyms:["degrade","demean"],antonyms:["elevate","dignify"],collocations:["debase a currency","debase oneself","debase public discourse","be debased by"]}
  ,debilitate:{pos:"verb",synonyms:["weaken","impair"],antonyms:["strengthen","revitalize"],collocations:["debilitate the economy","a debilitating illness","be debilitated by","severely debilitating"]}
  ,deference:{pos:"noun",synonyms:["respect","regard"],antonyms:["disrespect","defiance"],collocations:["show deference to","with due deference to","out of deference to","deference to authority"]}
  ,delineate:{pos:"verb",synonyms:["outline","define"],antonyms:["obscure","confuse"],collocations:["delineate a boundary","clearly delineate","delineate the scope of","delineate responsibilities"]}
  ,demure:{pos:"adjective",synonyms:["modest","reserved"],antonyms:["bold","forward"],collocations:["a demure smile","a demure manner","appear demure","a demure appearance"]}
  ,denigrate:{pos:"verb",synonyms:["belittle","disparage"],antonyms:["praise","commend"],collocations:["denigrate an opponent","denigrate someone's work","publicly denigrate","seek to denigrate"]}
  ,deplore:{pos:"verb",synonyms:["lament","condemn"],antonyms:["approve","praise"],collocations:["deplore the loss of","deeply deplore","deplore the decision","deplore violence"]}
  ,depravity:{pos:"noun",synonyms:["wickedness","corruption"],antonyms:["virtue","morality"],collocations:["moral depravity","an act of depravity","sink into depravity","human depravity"]}
  ,decry:{pos:"verb",synonyms:["condemn","criticize"],antonyms:["praise","endorse"],collocations:["decry a policy","decry the decision","widely decried","decry the use of"]}
  ,despondent:{pos:"adjective",synonyms:["hopeless","dejected"],antonyms:["hopeful","cheerful"],collocations:["feel despondent about","become despondent","a despondent mood","grow despondent"]}
  ,dexterous:{pos:"adjective",synonyms:["skillful","nimble"],antonyms:["clumsy","awkward"],collocations:["dexterous hands","a dexterous performance","dexterous at","a dexterous use of"]}
  ,didactic:{pos:"adjective",synonyms:["instructive","moralizing"],antonyms:["entertaining","uninstructive"],collocations:["a didactic tone","a didactic novel","overly didactic","a didactic approach"]}
  ,diffident:{pos:"adjective",synonyms:["shy","self-effacing"],antonyms:["confident","assertive"],collocations:["a diffident manner","be diffident about","a diffident smile","remain diffident"]}
  ,dilapidated:{pos:"adjective",synonyms:["run-down","decrepit"],antonyms:["well-maintained","new"],collocations:["a dilapidated building","a dilapidated house","become dilapidated","a dilapidated state"]}
  ,diligent:{pos:"adjective",synonyms:["hardworking","industrious"],antonyms:["lazy","negligent"],collocations:["a diligent student","diligent efforts","be diligent in","diligent research"]}
  ,discerning:{pos:"adjective",synonyms:["perceptive","discriminating"],antonyms:["undiscerning","uncritical"],collocations:["a discerning reader","a discerning eye","discerning customers","be discerning about"]}
  ,disconcert:{pos:"verb",synonyms:["unsettle","confuse"],antonyms:["reassure","calm"],collocations:["deeply disconcert","be disconcerted by","a disconcerting discovery","disconcert an opponent"]}
  ,discredit:{pos:"verb",synonyms:["undermine","disparage"],antonyms:["validate","support"],collocations:["discredit a claim","discredit a witness","attempt to discredit","be discredited by evidence"]}
  ,disdain:{pos:"noun",synonyms:["contempt","scorn"],antonyms:["respect","admiration"],collocations:["show disdain for","with disdain","open disdain","feel disdain toward"]}
  ,disseminate:{pos:"verb",synonyms:["spread","distribute"],antonyms:["withhold","suppress"],collocations:["disseminate information","widely disseminate","disseminate research findings","disseminate through"]}
  ,dogmatic:{pos:"adjective",synonyms:["doctrinaire","rigid"],antonyms:["open-minded","flexible"],collocations:["a dogmatic view","a dogmatic approach","remain dogmatic","dogmatic beliefs"]}
  ,dubious:{pos:"adjective",synonyms:["questionable","uncertain"],antonyms:["certain","credible"],collocations:["of dubious value","a dubious claim","dubious about","a dubious distinction"]}
  ,ebullient:{pos:"adjective",synonyms:["exuberant","enthusiastic"],antonyms:["morose","subdued"],collocations:["an ebullient personality","ebullient enthusiasm","an ebullient mood","remain ebullient"]}
  ,eclectic:{pos:"adjective",synonyms:["diverse","wide-ranging"],antonyms:["narrow","uniform"],collocations:["an eclectic mix","eclectic tastes","an eclectic collection","an eclectic approach"]}
  ,edify:{pos:"verb",synonyms:["educate","enlighten"],antonyms:["mislead","confuse"],collocations:["edify readers","edify an audience","seek to edify","edify through"]}
  ,efficacy:{pos:"noun",synonyms:["effectiveness","usefulness"],antonyms:["ineffectiveness","futility"],collocations:["the efficacy of","demonstrate efficacy","clinical efficacy","question the efficacy of"]}
  ,egregious:{pos:"adjective",synonyms:["flagrant","gross"],antonyms:["minor","excusable"],collocations:["an egregious error","an egregious violation","egregious misconduct","an egregious abuse of power"]}
  ,elusive:{pos:"adjective",synonyms:["evasive","hard-to-find"],antonyms:["obvious","attainable"],collocations:["remain elusive","an elusive goal","elusive evidence","an elusive answer"]}
  ,embellish:{pos:"verb",synonyms:["adorn","exaggerate"],antonyms:["simplify","understate"],collocations:["embellish a story","embellish the truth","embellish with details","embellish a report"]}
  ,empirical:{pos:"adjective",synonyms:["evidence-based","observed"],antonyms:["theoretical","speculative"],collocations:["empirical evidence","empirical research","empirical data","an empirical study"]}
  ,encroach:{pos:"verb",synonyms:["intrude","infringe"],antonyms:["retreat","withdraw"],collocations:["encroach on privacy","encroach upon land","encroach on someone's rights","gradually encroach"]}
  ,endemic:{pos:"adjective",synonyms:["prevalent","widespread"],antonyms:["rare","eradicated"],collocations:["endemic to a region","an endemic disease","become endemic","endemic corruption"]}
  ,enervate:{pos:"verb",synonyms:["weaken","exhaust"],antonyms:["energize","invigorate"],collocations:["enervate the economy","be enervated by","an enervating routine","enervate one's resolve"]}
  ,enfranchise:{pos:"verb",synonyms:["empower","grant voting rights"],antonyms:["disenfranchise","exclude"],collocations:["enfranchise voters","enfranchise women","the right to enfranchise","be enfranchised"]}
  ,enigmatic:{pos:"adjective",synonyms:["mysterious","puzzling"],antonyms:["clear","obvious"],collocations:["an enigmatic figure","an enigmatic smile","remain enigmatic","an enigmatic message"]}
  ,enmity:{pos:"noun",synonyms:["hostility","animosity"],antonyms:["friendship","amity"],collocations:["deep-seated enmity","enmity between","long-standing enmity","feel enmity toward"]}
  ,entrench:{pos:"verb",synonyms:["establish","embed"],antonyms:["dislodge","dismantle"],collocations:["entrench a system","be deeply entrenched","entrench inequality","entrench a position"]}
  ,erratic:{pos:"adjective",synonyms:["unpredictable","irregular"],antonyms:["consistent","stable"],collocations:["erratic behavior","erratic weather","erratic performance","an erratic pattern"]}
  ,eradicate:{pos:"verb",synonyms:["eliminate","wipe out"],antonyms:["establish","preserve"],collocations:["eradicate poverty","eradicate a disease","eradicate discrimination","efforts to eradicate"]}
  ,esoteric:{pos:"adjective",synonyms:["obscure","arcane"],antonyms:["accessible","common"],collocations:["esoteric knowledge","an esoteric subject","esoteric terminology","an esoteric field"]}
  ,euphemism:{pos:"noun",synonyms:["mild term","circumlocution"],antonyms:["directness","bluntness"],collocations:["a euphemism for","use a euphemism","a polite euphemism","political euphemism"]}
  ,evince:{pos:"verb",synonyms:["show","demonstrate"],antonyms:["conceal","suppress"],collocations:["evince interest in","evince a desire to","evince no sign of","evince concern"]}
  ,exasperate:{pos:"verb",synonyms:["frustrate","irritate"],antonyms:["soothe","placate"],collocations:["deeply exasperate","be exasperated by","an exasperating delay","exasperate someone"]}
  ,exculpate:{pos:"verb",synonyms:["absolve","clear"],antonyms:["incriminate","implicate"],collocations:["exculpate someone from","evidence that exculpates","fully exculpate","exculpate an accused person"]}
  ,exorbitant:{pos:"adjective",synonyms:["excessive","extortionate"],antonyms:["reasonable","modest"],collocations:["exorbitant prices","an exorbitant fee","an exorbitant cost","charge an exorbitant amount"]}
  ,expedite:{pos:"verb",synonyms:["accelerate","hasten"],antonyms:["delay","hinder"],collocations:["expedite a process","expedite delivery","expedite the approval of","help expedite"]}
  ,extol:{pos:"verb",synonyms:["praise","laud"],antonyms:["criticize","denigrate"],collocations:["extol the virtues of","widely extol","extol a leader","extol the benefits of"]}
  ,extraneous:{pos:"adjective",synonyms:["irrelevant","unnecessary"],antonyms:["relevant","essential"],collocations:["extraneous information","extraneous details","remove extraneous material","an extraneous factor"]}
  ,fallacious:{pos:"adjective",synonyms:["misleading","unsound"],antonyms:["valid","sound"],collocations:["a fallacious argument","fallacious reasoning","a fallacious assumption","prove fallacious"]}
  ,fervent:{pos:"adjective",synonyms:["passionate","ardent"],antonyms:["apathetic","lukewarm"],collocations:["fervent support","a fervent believer","fervent hope","a fervent plea"]}
  ,flagrant:{pos:"adjective",synonyms:["blatant","glaring"],antonyms:["minor","subtle"],collocations:["a flagrant violation","flagrant disregard for","a flagrant abuse of","a flagrant breach"]}
  ,flippant:{pos:"adjective",synonyms:["frivolous","dismissive"],antonyms:["serious","respectful"],collocations:["a flippant remark","a flippant attitude","sound flippant","be flippant about"]}
  ,fortuitous:{pos:"adjective",synonyms:["accidental","unexpected"],antonyms:["deliberate","planned"],collocations:["a fortuitous coincidence","a fortuitous discovery","a fortuitous meeting","purely fortuitous"]}
  ,fractious:{pos:"adjective",synonyms:["irritable","quarrelsome"],antonyms:["cooperative","compliant"],collocations:["a fractious debate","a fractious coalition","fractious negotiations","a fractious child"]}
  ,furtive:{pos:"adjective",synonyms:["secretive","stealthy"],antonyms:["open","overt"],collocations:["a furtive glance","a furtive movement","furtive behavior","look furtive"]}
  ,garrulous:{pos:"adjective",synonyms:["talkative","loquacious"],antonyms:["taciturn","reserved"],collocations:["a garrulous old man","a garrulous host","become garrulous","a garrulous conversation"]}
  ,germane:{pos:"adjective",synonyms:["relevant","pertinent"],antonyms:["irrelevant","extraneous"],collocations:["germane to the issue","germane to the discussion","highly germane","remain germane"]}
  ,glib:{pos:"adjective",synonyms:["slick","superficial"],antonyms:["thoughtful","sincere"],collocations:["a glib answer","a glib explanation","glib assurances","sound glib"]}
  ,gratuitous:{pos:"adjective",synonyms:["unnecessary","unwarranted"],antonyms:["necessary","justified"],collocations:["gratuitous violence","a gratuitous insult","gratuitous cruelty","seem gratuitous"]}
  ,hackneyed:{pos:"adjective",synonyms:["trite","cliched"],antonyms:["original","fresh"],collocations:["a hackneyed phrase","a hackneyed plot","hackneyed cliches","sound hackneyed"]}
  ,haphazard:{pos:"adjective",synonyms:["random","disorganized"],antonyms:["systematic","methodical"],collocations:["a haphazard approach","haphazard planning","haphazard implementation","seem haphazard"]}
  ,harangue:{pos:"verb",synonyms:["lecture","berate"],antonyms:["praise","commend"],collocations:["harangue the audience","harangue someone about","a long harangue","deliver a harangue"]}
  ,heed:{pos:"verb",synonyms:["observe","mind"],antonyms:["ignore","disregard"],collocations:["heed a warning","heed advice","pay heed to","fail to heed"]}
  ,heinous:{pos:"adjective",synonyms:["atrocious","monstrous"],antonyms:["minor","forgivable"],collocations:["a heinous crime","a heinous act","heinous murder","especially heinous"]}
  ,herald:{pos:"verb",synonyms:["signal","announce"],antonyms:["follow","obscure"],collocations:["herald a new era","herald a change","be heralded as","widely heralded"]}
  ,indolent:{pos:"adjective",synonyms:["lazy","sluggish"],antonyms:["diligent","industrious"],collocations:["an indolent lifestyle","an indolent student","become indolent","indolent habits"]}
  ,infallible:{pos:"adjective",synonyms:["unerring","faultless"],antonyms:["fallible","mistaken"],collocations:["an infallible guide","an infallible method","claim to be infallible","far from infallible"]}
  ,ingenuous:{pos:"adjective",synonyms:["naive","innocent"],antonyms:["disingenuous","cunning"],collocations:["an ingenuous smile","an ingenuous question","seem ingenuous","ingenuous honesty"]}
  ,inhibit:{pos:"verb",synonyms:["hinder","restrain"],antonyms:["encourage","facilitate"],collocations:["inhibit growth","inhibit development","inhibit innovation","inhibit someone from"]}
  ,innocuous:{pos:"adjective",synonyms:["harmless","inoffensive"],antonyms:["harmful","dangerous"],collocations:["an innocuous remark","seem innocuous","apparently innocuous","an innocuous substance"]}
  ,insidious:{pos:"adjective",synonyms:["subtle","treacherous"],antonyms:["obvious","benign"],collocations:["an insidious disease","an insidious threat","insidious effects","an insidious form of"]}
  ,insolent:{pos:"adjective",synonyms:["rude","impudent"],antonyms:["respectful","polite"],collocations:["an insolent reply","an insolent attitude","insolent behavior","be insolent to"]}
  ,intrepid:{pos:"adjective",synonyms:["fearless","bold"],antonyms:["timid","cowardly"],collocations:["an intrepid explorer","an intrepid journalist","intrepid travelers","remain intrepid"]}
  ,irascible:{pos:"adjective",synonyms:["irritable","short-tempered"],antonyms:["patient","placid"],collocations:["an irascible old man","an irascible temperament","become irascible","notoriously irascible"]}
  ,irrefutable:{pos:"adjective",synonyms:["undeniable","incontrovertible"],antonyms:["questionable","disputable"],collocations:["irrefutable evidence","an irrefutable argument","irrefutable proof","seem irrefutable"]}
  ,jettison:{pos:"verb",synonyms:["discard","abandon"],antonyms:["retain","preserve"],collocations:["jettison a plan","jettison old assumptions","jettison unnecessary cargo","be forced to jettison"]}
  ,jubilant:{pos:"adjective",synonyms:["ecstatic","exultant"],antonyms:["dejected","mournful"],collocations:["a jubilant crowd","jubilant supporters","be jubilant about","a jubilant celebration"]}
  ,judicious:{pos:"adjective",synonyms:["prudent","sensible"],antonyms:["rash","imprudent"],collocations:["a judicious choice","judicious use of","a judicious approach","seem judicious"]}
  ,languid:{pos:"adjective",synonyms:["listless","lethargic"],antonyms:["energetic","vigorous"],collocations:["a languid pace","a languid afternoon","a languid gesture","languid movement"]}
  ,laud:{pos:"verb",synonyms:["praise","extol"],antonyms:["criticize","condemn"],collocations:["laud someone's efforts","laud the decision","be widely lauded","laud the virtues of"]}
  ,lethargic:{pos:"adjective",synonyms:["sluggish","listless"],antonyms:["energetic","alert"],collocations:["feel lethargic","a lethargic response","become lethargic","lethargic behavior"]}
  ,lucid:{pos:"adjective",synonyms:["clear","coherent"],antonyms:["confused","obscure"],collocations:["a lucid explanation","lucid prose","a lucid account","remain lucid"]}
  ,mercurial:{pos:"adjective",synonyms:["volatile","changeable"],antonyms:["stable","steady"],collocations:["a mercurial temperament","a mercurial leader","mercurial behavior","notoriously mercurial"]}
  ,malevolent:{pos:"adjective",synonyms:["malicious","hostile"],antonyms:["benevolent","kind"],collocations:["a malevolent force","malevolent intent","a malevolent glare","seem malevolent"]}
  ,malleable:{pos:"adjective",synonyms:["pliable","adaptable"],antonyms:["rigid","inflexible"],collocations:["a malleable material","malleable metal","a malleable mind","highly malleable"]}
  ,mendacious:{pos:"adjective",synonyms:["dishonest","deceitful"],antonyms:["truthful","honest"],collocations:["a mendacious claim","mendacious propaganda","a mendacious politician","mendacious statements"]}
  ,morose:{pos:"adjective",synonyms:["gloomy","sullen"],antonyms:["cheerful","buoyant"],collocations:["a morose mood","look morose","become morose","a morose silence"]}
  ,mollify:{pos:"verb",synonyms:["appease","pacify"],antonyms:["provoke","aggravate"],collocations:["mollify critics","mollify public anger","attempt to mollify","mollify someone's concerns"]}
  ,nebulous:{pos:"adjective",synonyms:["vague","indistinct"],antonyms:["clear","definite"],collocations:["a nebulous idea","a nebulous concept","nebulous goals","remain nebulous"]}
  ,nefarious:{pos:"adjective",synonyms:["wicked","criminal"],antonyms:["virtuous","lawful"],collocations:["a nefarious scheme","nefarious activities","nefarious purposes","a nefarious plot"]}
  ,opulent:{pos:"adjective",synonyms:["luxurious","lavish"],antonyms:["plain","austere"],collocations:["an opulent hotel","opulent surroundings","opulent decor","an opulent lifestyle"]}
  ,proscribe:{pos:"verb",synonyms:["ban","prohibit"],antonyms:["permit","authorize"],collocations:["proscribe a practice","be legally proscribed","proscribe certain activities","strictly proscribe"]}
  ,oblivious:{pos:"adjective",synonyms:["unaware","heedless"],antonyms:["aware","attentive"],collocations:["oblivious to danger","seem oblivious","remain oblivious","oblivious of the risks"]}
  ,obsequious:{pos:"adjective",synonyms:["servile","fawning"],antonyms:["assertive","independent"],collocations:["an obsequious manner","obsequious flattery","sound obsequious","obsequious behavior"]}
  ,presumptuous:{pos:"adjective",synonyms:["arrogant","overconfident"],antonyms:["modest","humble"],collocations:["a presumptuous question","be presumptuous of someone","seem presumptuous","a presumptuous assumption"]}
  ,ostracize:{pos:"verb",synonyms:["exclude","shun"],antonyms:["accept","include"],collocations:["ostracize someone from","be socially ostracized","ostracize dissenters","feel ostracized"]}
  ,palpable:{pos:"adjective",synonyms:["tangible","obvious"],antonyms:["imperceptible","subtle"],collocations:["palpable tension","a palpable sense of","palpable fear","become palpable"]}
  ,ravenous:{pos:"adjective",synonyms:["famished","voracious"],antonyms:["sated","full"],collocations:["feel ravenous","a ravenous appetite","ravenous hunger","be absolutely ravenous"]}
  ,redundant:{pos:"adjective",synonyms:["unnecessary","superfluous"],antonyms:["essential","necessary"],collocations:["make someone redundant","redundant workers","a redundant phrase","become redundant"]}
  ,pernicious:{pos:"adjective",synonyms:["harmful","destructive"],antonyms:["beneficial","benign"],collocations:["a pernicious effect","pernicious influence","a pernicious myth","pernicious consequences"]}
  ,placate:{pos:"verb",synonyms:["appease","pacify"],antonyms:["provoke","enrage"],collocations:["placate critics","placate public anger","attempt to placate","placate someone's fears"]}
  ,reverent:{pos:"adjective",synonyms:["respectful","devout"],antonyms:["irreverent","disrespectful"],collocations:["a reverent tone","a reverent silence","a reverent attitude","reverent toward tradition"]}
  ,precarious:{pos:"adjective",synonyms:["unstable","insecure"],antonyms:["secure","stable"],collocations:["a precarious position","a precarious situation","a precarious balance","precarious employment"]}
  ,precipitate:{pos:"verb",synonyms:["trigger","hasten"],antonyms:["prevent","delay"],collocations:["precipitate a crisis","precipitate a decline","precipitate change","be precipitated by"]}
  ,preclude:{pos:"verb",synonyms:["prevent","rule out"],antonyms:["allow","permit"],collocations:["preclude the possibility of","preclude someone from","preclude further discussion","effectively preclude"]}
  ,prodigal:{pos:"adjective",synonyms:["wasteful","extravagant"],antonyms:["frugal","thrifty"],collocations:["prodigal spending","a prodigal son","prodigal use of","prodigal habits"]}
  ,prolific:{pos:"adjective",synonyms:["productive","fruitful"],antonyms:["unproductive","barren"],collocations:["a prolific writer","a prolific inventor","prolific output","highly prolific"]}
  ,propensity:{pos:"noun",synonyms:["tendency","inclination"],antonyms:["aversion","disinclination"],collocations:["a propensity for","a propensity to","show a propensity","a natural propensity"]}
  ,propitiate:{pos:"verb",synonyms:["appease","conciliate"],antonyms:["provoke","alienate"],collocations:["propitiate the gods","propitiate an angry crowd","attempt to propitiate","propitiate hostile critics"]}
  ,quandary:{pos:"noun",synonyms:["dilemma","predicament"],antonyms:["solution","certainty"],collocations:["in a quandary","face a quandary","a moral quandary","pose a quandary"]}
  ,quell:{pos:"verb",synonyms:["suppress","subdue"],antonyms:["incite","provoke"],collocations:["quell unrest","quell fears","quell rumors","quell a rebellion"]}
  ,retribution:{pos:"noun",synonyms:["punishment","reprisal"],antonyms:["forgiveness","clemency"],collocations:["seek retribution","fear retribution","divine retribution","acts of retribution"]}
  ,reclusive:{pos:"adjective",synonyms:["solitary","withdrawn"],antonyms:["sociable","outgoing"],collocations:["a reclusive writer","a reclusive billionaire","lead a reclusive life","become increasingly reclusive"]}
  ,reconcile:{pos:"verb",synonyms:["harmonize","settle"],antonyms:["alienate","estrange"],collocations:["reconcile differences","reconcile conflicting views","reconcile oneself to","be reconciled with"]}
  ,relinquish:{pos:"verb",synonyms:["surrender","give up"],antonyms:["retain","keep"],collocations:["relinquish control","relinquish power","relinquish a claim","reluctantly relinquish"]}
  ,reprehensible:{pos:"adjective",synonyms:["deplorable","blameworthy"],antonyms:["commendable","admirable"],collocations:["morally reprehensible","reprehensible behavior","a reprehensible act","utterly reprehensible"]}
  ,rescind:{pos:"verb",synonyms:["revoke","cancel"],antonyms:["enact","uphold"],collocations:["rescind a decision","rescind an order","rescind a contract","vote to rescind"]}
  ,reticent:{pos:"adjective",synonyms:["reserved","uncommunicative"],antonyms:["talkative","forthcoming"],collocations:["reticent about","remain reticent","a reticent witness","naturally reticent"]}
  ,sagacious:{pos:"adjective",synonyms:["wise","shrewd"],antonyms:["foolish","shortsighted"],collocations:["a sagacious leader","sagacious advice","a sagacious observer","seem sagacious"]}
  ,sardonic:{pos:"adjective",synonyms:["mocking","wry"],antonyms:["earnest","sincere"],collocations:["a sardonic smile","a sardonic remark","sardonic humor","sound sardonic"]}
  ,scrupulous:{pos:"adjective",synonyms:["meticulous","conscientious"],antonyms:["careless","unscrupulous"],collocations:["scrupulous attention to","scrupulous honesty","be scrupulous about","a scrupulous investigation"]}
  ,spurious:{pos:"adjective",synonyms:["false","bogus"],antonyms:["genuine","valid"],collocations:["a spurious claim","spurious arguments","spurious evidence","dismiss as spurious"]}
  ,staunch:{pos:"adjective",synonyms:["loyal","steadfast"],antonyms:["disloyal","wavering"],collocations:["a staunch supporter","a staunch ally","staunch opposition","remain staunch"]}
  ,sporadic:{pos:"adjective",synonyms:["occasional","intermittent"],antonyms:["constant","continuous"],collocations:["sporadic violence","sporadic outbreaks","sporadic reports","sporadic attempts"]}
  ,suppress:{pos:"verb",synonyms:["restrain","stifle"],antonyms:["encourage","release"],collocations:["suppress dissent","suppress evidence","suppress a rebellion","suppress information"]}
  ,succinct:{pos:"adjective",synonyms:["concise","brief"],antonyms:["verbose","wordy"],collocations:["a succinct summary","a succinct explanation","succinctly put","be succinct"]}
  ,superfluous:{pos:"adjective",synonyms:["unnecessary","redundant"],antonyms:["essential","necessary"],collocations:["superfluous detail","superfluous information","seem superfluous","remove superfluous material"]}
  ,turbulent:{pos:"adjective",synonyms:["unstable","stormy"],antonyms:["calm","stable"],collocations:["turbulent times","turbulent waters","a turbulent period","turbulent markets"]}
  ,unprecedented:{pos:"adjective",synonyms:["unparalleled","extraordinary"],antonyms:["ordinary","precedented"],collocations:["an unprecedented scale","unprecedented growth","an unprecedented crisis","almost unprecedented"]}
  ,tenacious:{pos:"adjective",synonyms:["persistent","determined"],antonyms:["wavering","yielding"],collocations:["a tenacious opponent","tenacious resistance","a tenacious grip","tenacious pursuit of"]}
  ,vicarious:{pos:"adjective",synonyms:["indirect","secondhand"],antonyms:["direct","firsthand"],collocations:["vicarious pleasure","vicarious experience","vicarious thrill","live vicariously through"]}
  ,tirade:{pos:"noun",synonyms:["diatribe","rant"],antonyms:["praise","commendation"],collocations:["launch into a tirade","a tirade against","a furious tirade","endure a tirade"]}
  ,transient:{pos:"adjective",synonyms:["temporary","fleeting"],antonyms:["permanent","lasting"],collocations:["a transient phenomenon","transient symptoms","a transient population","transient nature"]}
  ,volatile:{pos:"adjective",synonyms:["unstable","unpredictable"],antonyms:["stable","steady"],collocations:["a volatile market","volatile prices","a volatile situation","highly volatile"]}
  ,unequivocal:{pos:"adjective",synonyms:["clear","unambiguous"],antonyms:["ambiguous","equivocal"],collocations:["an unequivocal statement","unequivocal support","unequivocal evidence","make it unequivocal"]}
  ,wane:{pos:"verb",synonyms:["decline","diminish"],antonyms:["increase","wax"],collocations:["begin to wane","support waned","interest waned","wane over time"]}
  ,venerate:{pos:"verb",synonyms:["revere","honor"],antonyms:["despise","disparage"],collocations:["venerate ancestors","venerate a saint","be widely venerated","venerate tradition"]}
  ,withstand:{pos:"verb",synonyms:["endure","resist"],antonyms:["succumb","yield"],collocations:["withstand pressure","withstand scrutiny","withstand criticism","withstand the impact of"]}
  ,virulent:{pos:"adjective",synonyms:["toxic","bitter"],antonyms:["mild","benign"],collocations:["a virulent strain","virulent criticism","virulent opposition","a virulent attack"]}
  ,vitriolic:{pos:"adjective",synonyms:["scathing","bitter"],antonyms:["mild","praising"],collocations:["vitriolic criticism","a vitriolic attack","vitriolic rhetoric","vitriolic comments"]}
  ,whimsical:{pos:"adjective",synonyms:["fanciful","playful"],antonyms:["serious","practical"],collocations:["a whimsical design","a whimsical touch","whimsical humor","seem whimsical"]}
  ,zealot:{pos:"noun",synonyms:["fanatic","extremist"],antonyms:["moderate","skeptic"],collocations:["a religious zealot","a political zealot","a reform zealot","zealous followers"]}
  ,watershed:{pos:"noun",synonyms:["turning point","milestone"],antonyms:["non-event","continuity"],collocations:["a watershed moment","a watershed event","mark a watershed","a political watershed"]}
  ,yearn:{pos:"verb",synonyms:["long","crave"],antonyms:["dislike","reject"],collocations:["yearn for freedom","yearn to return","yearn for stability","deeply yearn"]}
});
(window.EIKEN_WORDS||[]).forEach(function(word){
  var detail=DETAILS[word.w]||{};
  word.pos=detail.pos||word.p||'';
  word.synonyms=detail.synonyms||[];
  word.antonyms=detail.antonyms||[];
  word.collocations=detail.collocations||[];
  delete word.u;
});
})();
