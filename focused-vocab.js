(function(){
'use strict';
// Original examples for a general-purpose focused vocabulary collection.
var DATA=[
  [
    "straddle",
    "またがる",
    "verb",
    "The proposed nature reserve would ____ two provinces, requiring approval from both regional authorities.",
    "計画中の自然保護区は2つの州にまたがるため、両地域の当局の承認が必要になる。",
    "span|extend across",
    "straddle a border|straddle two regions|straddle a divide"
  ],
  [
    "coddle",
    "甘やかす",
    "verb",
    "Parents who continually ____ their children may prevent them from learning to handle everyday disappointments.",
    "子供を絶えず甘やかす親は、子供が日常の失望に対処する方法を学ぶのを妨げることがある。",
    "pamper|overprotect",
    "coddle a child|coddle an employee|coddle someone excessively"
  ],
  [
    "recede",
    "後退する、薄れる",
    "verb",
    "The floodwaters began to ____ overnight, revealing muddy streets that had been completely submerged.",
    "洪水の水が夜の間に引き始め、完全に水没していた泥だらけの道路が現れた。",
    "retreat|ebb",
    "floodwaters recede|a receding hairline|recede into the distance"
  ],
  [
    "denounce",
    "公然と非難する",
    "verb",
    "Several journalists chose to ____ the censorship law publicly, describing it as an attack on press freedom.",
    "数人の記者は検閲法を報道の自由への攻撃と評し、公然と非難することを選んだ。",
    "condemn|censure",
    "denounce corruption|publicly denounce|denounce a policy"
  ],
  [
    "banish",
    "追放する",
    "verb",
    "The king threatened to ____ the conspirators from the kingdom and forbid their return permanently.",
    "王は共謀者を王国から追放し、永久に帰還を禁じると脅した。",
    "exile|expel",
    "banish from the kingdom|banish all doubt|banish someone forever"
  ],
  [
    "postulate",
    "仮定する",
    "verb",
    "Researchers ____ that an unseen planet influences these orbits, although direct evidence has yet to emerge.",
    "研究者たちは未知の惑星がこれらの軌道に影響すると仮定しているが、直接の証拠はまだない。",
    "hypothesize|posit",
    "postulate a theory|postulate the existence of|postulate a connection"
  ],
  [
    "mesmerize",
    "魅了する",
    "verb",
    "The illusionist hopes to ____ spectators with a silent routine that makes ordinary objects appear to float.",
    "奇術師は日用品が浮かんで見える無言の演技で観客を魅了したいと考えている。",
    "hypnotize|captivate",
    "mesmerize an audience|be mesmerized by|a mesmerizing performance"
  ],
  [
    "prose",
    "散文",
    "noun",
    "Unlike the rhyming poems in her earlier collection, the new book consists entirely of ____ narratives.",
    "以前の詩集の韻を踏む詩とは異なり、新著はすべて散文の物語から成る。",
    "ordinary writing|nonmetrical writing",
    "clear prose|prose fiction|write in prose"
  ],
  [
    "tremor",
    "震え、微震",
    "noun",
    "A slight ____ shook the laboratory floor, but the instruments recorded no damage to the building.",
    "わずかな揺れが研究室の床を揺らしたが、計器は建物の損傷を記録しなかった。",
    "shaking|vibration",
    "a slight tremor|a hand tremor|an earth tremor"
  ],
  [
    "dent",
    "へこみ",
    "noun",
    "The falling branch left a deep ____ in the car door without breaking either window.",
    "落ちた枝は窓を割らずに車のドアに深いへこみを残した。",
    "indentation|depression",
    "a deep dent|make a dent|a dent in confidence"
  ],
  [
    "petrified",
    "恐怖で動けない",
    "adjective",
    "The child stood ____ beside the barking dog, too frightened even to call for help.",
    "子供はほえる犬のそばで恐怖に固まり、助けを呼ぶことさえできなかった。",
    "terrified|panic-stricken",
    "be petrified of|stand petrified|absolutely petrified"
  ],
  [
    "dignified",
    "威厳のある",
    "adjective",
    "Despite the insults, the ambassador maintained a ____ silence and left the chamber with calm self-respect.",
    "侮辱にもかかわらず、大使は威厳ある沈黙を保ち、冷静に自尊心を持って議場を去った。",
    "stately|composed",
    "a dignified manner|a dignified response|maintain a dignified silence"
  ],
  [
    "lavish",
    "豪華な、惜しみない",
    "adjective",
    "The charity canceled its ____ banquet with imported flowers and expensive entertainment to reduce administrative costs.",
    "慈善団体は管理費を減らすため、輸入花や高価な余興を伴う豪華な宴会を中止した。",
    "extravagant|sumptuous",
    "a lavish banquet|lavish praise|a lavish lifestyle"
  ],
  [
    "gentry",
    "地方の上流階級",
    "noun",
    "For centuries, the landed ____ owned these estates and dominated the social life of the surrounding villages.",
    "何世紀もの間、地主階級がこれらの領地を所有し、周辺の村の社会生活を支配していた。",
    "landed elite|local upper class",
    "landed gentry|country gentry|members of the gentry"
  ],
  [
    "squad",
    "分隊、班",
    "noun",
    "The commander sent a small ____ of soldiers ahead to inspect the deserted bridge before the main force arrived.",
    "指揮官は主力部隊の到着前に無人の橋を調べるため、少人数の分隊を先に送った。",
    "unit|detachment",
    "a rescue squad|a police squad|a squad of soldiers"
  ],
  [
    "parchment",
    "羊皮紙",
    "noun",
    "The medieval contract was written on ____ made from animal skin rather than on paper.",
    "その中世の契約書は紙ではなく、動物の皮から作った羊皮紙に書かれていた。",
    "vellum|writing skin",
    "a parchment scroll|write on parchment|a sheet of parchment"
  ],
  [
    "rift",
    "亀裂、不和",
    "noun",
    "Disagreement over succession created a lasting ____ between the brothers, who refused to speak for years.",
    "相続をめぐる意見の対立で兄弟の間に長く続く亀裂が生じ、何年も口をきかなかった。",
    "split|breach",
    "a deep rift|heal a rift|a rift between allies"
  ],
  [
    "sluggish",
    "動きの鈍い",
    "adjective",
    "The old computer became increasingly ____ after the update, taking several minutes to open even small files.",
    "更新後、古いパソコンはますます動作が鈍くなり、小さなファイルを開くにも数分かかった。",
    "slow|lethargic",
    "sluggish growth|a sluggish response|feel sluggish"
  ],
  [
    "cranky",
    "不機嫌な",
    "adjective",
    "After missing her afternoon nap, the toddler became ____ and complained about every meal and toy.",
    "昼寝をし損ねた幼児は不機嫌になり、食事やおもちゃのすべてに文句を言った。",
    "irritable|grumpy",
    "a cranky child|feel cranky|get cranky"
  ],
  [
    "distasteful",
    "不快な、嫌な",
    "adjective",
    "Employees found the manager's jokes about injured colleagues ____ and asked him to stop making them.",
    "従業員は負傷した同僚についての上司の冗談を不快に思い、やめるよう求めた。",
    "unpleasant|offensive",
    "find something distasteful|a distasteful joke|deeply distasteful"
  ],
  [
    "corpulent",
    "肥満した",
    "adjective",
    "The ____ patient required a reinforced chair because his considerable body weight exceeded the standard model's limit.",
    "その肥満した患者は体重が標準型の上限を超えていたため、補強した椅子を必要とした。",
    "obese|portly",
    "a corpulent figure|a corpulent man|become corpulent"
  ],
  [
    "peripheral",
    "周辺的な、副次的な",
    "adjective",
    "The editor removed ____ details about the speaker's clothes so readers could focus on the central argument.",
    "編集者は読者が中心的な議論に集中できるよう、話者の服装に関する副次的な細部を削除した。",
    "marginal|secondary",
    "peripheral details|peripheral vision|peripheral to the debate"
  ],
  [
    "taint",
    "汚染する、評判を汚す",
    "verb",
    "Even an unproven bribery allegation can ____ a candidate's reputation and undermine years of public service.",
    "証明されていない贈賄疑惑でさえ候補者の評判を汚し、長年の公務の実績を損ない得る。",
    "contaminate|tarnish",
    "taint a reputation|taint the evidence|be tainted by corruption"
  ],
  [
    "scour",
    "徹底的に捜す、こすり洗いする",
    "verb",
    "Volunteers plan to ____ the coastline for missing fishing equipment, examining every inlet and rocky beach.",
    "ボランティアたちは入り江や岩場の浜を一つずつ調べ、紛失した漁具を求めて海岸を徹底的に捜す予定だ。",
    "search thoroughly|scrub",
    "scour the countryside|scour a surface|scour the internet"
  ],
  [
    "diminutive",
    "非常に小さい",
    "adjective",
    "The museum displayed a ____ bronze statue only three centimeters tall beside a life-size replica.",
    "博物館は等身大の複製の横に、高さわずか3センチの小さな銅像を展示した。",
    "tiny|miniature",
    "a diminutive figure|a diminutive statue|diminutive size"
  ],
  [
    "superficial",
    "表面的な",
    "adjective",
    "The inspection was merely ____, covering visible paintwork while ignoring serious structural faults beneath the surface.",
    "検査は見える塗装だけを対象にして内部の重大な構造欠陥を無視した、表面的なものだった。",
    "shallow|cursory",
    "a superficial inspection|superficial knowledge|a superficial resemblance"
  ],
  [
    "tedious",
    "退屈で骨の折れる",
    "adjective",
    "Copying thousands of identical figures by hand was a ____ task that left the accountant bored and exhausted.",
    "何千もの同じ数字を手で書き写す作業は単調で骨が折れ、会計士を退屈させ疲れ果てさせた。",
    "monotonous|wearisome",
    "a tedious task|tedious paperwork|a tedious process"
  ],
  [
    "coup",
    "クーデター、大成功",
    "noun",
    "Military officers launched a ____ before dawn, seizing the presidential palace and removing the elected government.",
    "軍将校たちは夜明け前にクーデターを起こし、大統領宮殿を占拠して選挙で選ばれた政府を倒した。",
    "putsch|overthrow",
    "a military coup|stage a coup|a diplomatic coup"
  ],
  [
    "dissipate",
    "消散する、消散させる",
    "verb",
    "The thick morning fog began to ____ as sunlight warmed the valley and visibility gradually improved.",
    "日光が谷を暖め、視界が徐々に改善するにつれて、濃い朝霧が消え始めた。",
    "disperse|dissolve",
    "dissipate heat|fears dissipate|dissipate energy"
  ],
  [
    "busker",
    "大道芸人",
    "noun",
    "A talented ____ played the violin outside the station while passersby dropped coins into her open case.",
    "才能ある大道芸人が駅の外でバイオリンを弾き、通行人は開いたケースに硬貨を入れた。",
    "street performer|street musician",
    "a street busker|a talented busker|listen to a busker"
  ],
  [
    "queasy",
    "吐き気のする、不安な",
    "adjective",
    "Passengers began to feel ____ as the ferry rolled in heavy waves, and several reached for sickness bags.",
    "フェリーが大波で揺れると乗客は吐き気を感じ始め、何人かは嘔吐用の袋に手を伸ばした。",
    "nauseous|sick",
    "feel queasy|a queasy stomach|make someone queasy"
  ],
  [
    "porous",
    "多孔質の、浸透しやすい",
    "adjective",
    "The ____ stone absorbed spilled water through countless tiny holes instead of leaving it on the surface.",
    "その多孔質の石は、こぼれた水を表面に残さず、無数の小さな穴から吸収した。",
    "permeable|absorbent",
    "porous rock|a porous surface|a porous border"
  ],
  [
    "scruffy",
    "身なりのだらしない",
    "adjective",
    "His ____ coat had torn cuffs and mud stains, making him look unprepared for the formal interview.",
    "彼のだらしないコートは袖口が破れ、泥の染みがあり、正式な面接の準備ができていないように見えた。",
    "unkempt|shabby",
    "scruffy clothes|a scruffy appearance|look scruffy"
  ],
  [
    "identify with",
    "共感する、自分を重ねる",
    "verb",
    "Readers who have experienced migration may ____ the heroine's loneliness and her search for a new home.",
    "移住を経験した読者は、主人公の孤独や新しい故郷を探す姿に共感するかもしれない。",
    "empathize with|relate to",
    "identify with a character|identify with an experience|identify with the audience"
  ],
  [
    "reel in",
    "リールを巻いて引き寄せる",
    "verb",
    "The angler began to ____ the hooked trout, turning the handle steadily as the fish resisted.",
    "釣り人は魚の抵抗に合わせてハンドルを一定に回し、針にかかったマスを引き寄せ始めた。",
    "draw in|pull in",
    "reel in a fish|reel in a catch|reel in the line"
  ],
  [
    "polish off",
    "平らげる、さっさと仕上げる",
    "verb",
    "The hungry hikers managed to ____ an entire pot of soup, leaving nothing for the late arrivals.",
    "空腹のハイカーたちは鍋のスープをすべて平らげ、遅れて来た人の分を残さなかった。",
    "finish off|consume completely",
    "polish off a meal|polish off a cake|polish off the leftovers"
  ],
  [
    "black out",
    "意識を失う、停電させる",
    "verb",
    "Patients can ____ from severe dehydration, briefly losing consciousness when blood flow to the brain becomes inadequate.",
    "重度の脱水で脳への血流が不十分になると、患者は一時的に意識を失うことがある。",
    "lose consciousness|faint",
    "black out suddenly|black out a city|black out information"
  ],
  [
    "tamper with",
    "不正にいじる",
    "verb",
    "Only authorized technicians may open the cabinet, as anyone trying to ____ the meter risks an electric shock.",
    "許可された技術者だけが盤を開けられ、計器を不正にいじろうとする人は感電の危険を負う。",
    "interfere with|meddle with",
    "tamper with evidence|tamper with a meter|tamper with a lock"
  ],
  [
    "ease off",
    "和らぐ、緩める",
    "verb",
    "Traffic should ____ after the holiday weekend, allowing delivery vehicles to move without long delays.",
    "連休が終われば交通量は減り、配送車は長い遅れなしに移動できるはずだ。",
    "slacken|lessen",
    "ease off the pressure|rain begins to ease off|ease off the accelerator"
  ],
  [
    "trump up",
    "でっち上げる",
    "verb",
    "Investigators found that the police had tried to ____ charges against the activist using entirely fabricated witness statements.",
    "捜査官たちは、警察が完全に捏造した証言で活動家への容疑をでっち上げようとしたことを発見した。",
    "fabricate|concoct",
    "trump up charges|trump up an accusation|trump up an excuse"
  ],
  [
    "branch out",
    "新分野に進出する",
    "verb",
    "After years of selling only bread, the bakery decided to ____ into catering for weddings and corporate events.",
    "長年パンだけを販売していたその店は、結婚式や企業行事の仕出しに進出することを決めた。",
    "diversify|expand into new areas",
    "branch out into catering|branch out on one's own|branch out into new markets"
  ],
  [
    "dole out",
    "少しずつ配る",
    "verb",
    "Relief workers had to ____ drinking water in small daily portions because supplies were running dangerously low.",
    "物資が危険なほど不足していたため、救援作業員は飲料水を毎日少量ずつ配らなければならなかった。",
    "distribute sparingly|ration out",
    "dole out money|dole out food|dole out advice"
  ],
  [
    "clam up",
    "口をつぐむ",
    "verb",
    "Witnesses sometimes ____ when questioned about powerful neighbors, refusing to provide even the simplest details.",
    "有力な近隣住民について尋ねられると、証人は口をつぐみ、ごく簡単な詳細さえ話さないことがある。",
    "stop talking|fall silent",
    "clam up completely|clam up under questioning|suddenly clam up"
  ],
  [
    "mete out",
    "罰などを与える",
    "verb",
    "The tribunal was established to ____ punishment to commanders responsible for crimes against civilian populations.",
    "その法廷は民間人に対する犯罪の責任を負う指揮官に処罰を与えるために設置された。",
    "administer|dispense",
    "mete out punishment|mete out justice|mete out a sentence"
  ],
  [
    "pluck up",
    "勇気を振り絞る",
    "verb",
    "Despite fearing rejection, the shy apprentice managed to ____ the courage to present her invention to the director.",
    "拒絶を恐れながらも、内気な見習いは勇気を振り絞り、自分の発明を責任者に示すことができた。",
    "summon|muster",
    "pluck up courage|pluck up the courage to ask|pluck up enough courage"
  ],
  [
    "penchant",
    "強い好み、傾向",
    "noun",
    "Her ____ for collecting antique maps explains why every wall in the house is covered with them.",
    "古地図収集への彼女の強い好みが、家中の壁が地図で覆われている理由だ。",
    "fondness|inclination",
    "a penchant for collecting|show a penchant for|a strong penchant"
  ],
  [
    "congregation",
    "礼拝の会衆、集まり",
    "noun",
    "After the Sunday service, the entire ____ remained in the church to welcome its newly appointed minister.",
    "日曜の礼拝後、新任の牧師を歓迎するため、会衆全員が教会に残った。",
    "worshippers|assembly",
    "a church congregation|address the congregation|members of the congregation"
  ],
  [
    "precedent",
    "先例",
    "noun",
    "The court's ruling established a ____ that judges could follow when deciding similar disputes in the future.",
    "その判決は、裁判官が今後同様の紛争を判断する際に従える先例を作った。",
    "prior example|legal authority",
    "set a precedent|a legal precedent|without precedent"
  ],
  [
    "epitaph",
    "墓碑銘",
    "noun",
    "Visitors paused to read the ____ carved beneath the poet's name on the weathered tombstone.",
    "訪問者たちは、風化した墓石の詩人の名前の下に刻まれた墓碑銘を読むため立ち止まった。",
    "tomb inscription|memorial inscription",
    "write an epitaph|an epitaph on a tomb|a fitting epitaph"
  ],
  [
    "cluster",
    "集まり、群れ",
    "noun",
    "Astronomers identified a dense ____ of stars bound together by gravity near the edge of the galaxy.",
    "天文学者たちは銀河の端近くで、重力で結びついた密集した星の集まりを特定した。",
    "group|bunch",
    "a star cluster|a cluster of houses|a cluster of cases"
  ],
  [
    "downfall",
    "失脚、没落",
    "noun",
    "The revelation of secret payments triggered the minister's ____, ending a political career that had lasted three decades.",
    "秘密の支払いの発覚は大臣の失脚を招き、30年続いた政治家人生を終わらせた。",
    "ruin|collapse",
    "a political downfall|bring about a downfall|lead to someone's downfall"
  ],
  [
    "rampage",
    "暴れ回ること",
    "noun",
    "The escaped bull went on a ____ through the market, overturning stalls and sending shoppers fleeing.",
    "逃げた雄牛は市場で暴れ回り、露店をひっくり返して買い物客を逃げ惑わせた。",
    "violent frenzy|destructive spree",
    "go on a rampage|a violent rampage|a rampage through the streets"
  ],
  [
    "pretext",
    "口実",
    "noun",
    "Officials used a minor paperwork error as a ____ to cancel a meeting they had never wanted to attend.",
    "当局者たちは、もともと出たくなかった会議を中止する口実に軽微な書類の誤りを利用した。",
    "excuse|ostensible reason",
    "under the pretext of|a pretext for delay|use as a pretext"
  ],
  [
    "adjourn",
    "会議などを中断する",
    "verb",
    "The chair proposed to ____ the hearing until Monday so both sides could examine the newly submitted documents.",
    "議長は双方が新たな提出書類を調べられるよう、審理を月曜日まで中断することを提案した。",
    "suspend proceedings|recess",
    "adjourn a meeting|adjourn until Monday|adjourn the hearing"
  ],
  [
    "detonate",
    "爆発する、爆発させる",
    "verb",
    "Engineers planned to ____ small explosive charges inside the abandoned quarry after evacuating everyone from the area.",
    "技術者たちは全員を避難させた後、廃採石場内で小さな爆薬を爆発させる計画を立てた。",
    "explode|set off",
    "detonate a charge|detonate explosives|detonate remotely"
  ],
  [
    "serene",
    "穏やかな",
    "adjective",
    "The lake looked ____ at dawn, its still surface reflecting the mountains without a single ripple.",
    "夜明けの湖は穏やかで、波紋一つない静かな水面に山々を映していた。",
    "tranquil|peaceful",
    "a serene landscape|a serene expression|remain serene"
  ],
  [
    "despicable",
    "卑劣な、軽蔑すべき",
    "adjective",
    "Stealing donations intended for disaster survivors was a ____ act that even the defendant's friends condemned.",
    "被災者への寄付金を盗むことは、被告の友人さえ非難する卑劣な行為だった。",
    "contemptible|vile",
    "a despicable act|despicable behavior|utterly despicable"
  ],
  [
    "obstinate",
    "頑固な",
    "adjective",
    "The ____ owner rejected every compromise and insisted on keeping the disputed fence exactly where it stood.",
    "頑固な所有者はすべての妥協案を拒み、争いのある塀を元の位置に保つと言い張った。",
    "stubborn|unyielding",
    "an obstinate refusal|remain obstinate|obstinate resistance"
  ],
  [
    "expel",
    "追放する、排出する",
    "verb",
    "The disciplinary panel may ____ students who repeatedly threaten others despite receiving several formal warnings.",
    "懲戒委員会は正式な警告を何度も受けても他人を脅し続ける学生を退学にする場合がある。",
    "eject|remove",
    "expel a student|expel from school|expel air"
  ],
  [
    "catapult",
    "勢いよく押し上げる",
    "verb",
    "A single breakthrough could ____ the little-known laboratory into international prominence and attract substantial research funding.",
    "一つの画期的成果が無名の研究所を一躍国際的に有名にし、多額の研究資金を呼び込む可能性がある。",
    "propel|launch",
    "catapult into fame|catapult to prominence|catapult someone into power"
  ],
  [
    "modulate",
    "調節する",
    "verb",
    "Experienced broadcasters ____ their voices to maintain a steady volume even when discussing emotionally charged subjects.",
    "経験豊富な放送者は、感情的な話題でも音量を一定に保つため声を調節する。",
    "adjust|regulate",
    "modulate the voice|modulate a signal|modulate the intensity"
  ],
  [
    "mutilate",
    "ひどく損傷する、切断する",
    "verb",
    "The conservation team warned that careless restoration could ____ the statue by permanently removing its original facial features.",
    "保全班は、不注意な修復で元の顔の特徴を永久に削り、像をひどく損傷する恐れがあると警告した。",
    "disfigure|maim",
    "mutilate a statue|a mutilated document|badly mutilated remains"
  ],
  [
    "clatter",
    "ガタガタという音",
    "noun",
    "The sudden ____ of metal trays falling onto the kitchen floor interrupted the quiet conversation in the dining room.",
    "金属のトレーが台所の床に落ちる突然のガタガタという音が、食堂の静かな会話を遮った。",
    "rattling noise|clanking noise",
    "a loud clatter|the clatter of dishes|fall with a clatter"
  ],
  [
    "spurn",
    "はねつける",
    "verb",
    "The athlete chose to ____ a lucrative sponsorship offer because the company's practices conflicted with her ethical principles.",
    "その選手は企業の慣行が自身の倫理観に反するとして、有利なスポンサー契約の申し出をはねつけた。",
    "reject scornfully|rebuff",
    "spurn an offer|spurn advice|spurn an invitation"
  ],
  [
    "roll out",
    "導入する、展開する",
    "verb",
    "The bank plans to ____ its new payment service nationwide after completing a successful trial in three cities.",
    "銀行は3都市での試験が成功した後、新しい決済サービスを全国に展開する予定だ。",
    "launch|introduce",
    "roll out a service|roll out an update|roll out nationwide"
  ],
  [
    "strike up",
    "会話や交友を始める",
    "verb",
    "Travelers often ____ conversations with strangers while waiting together for delayed trains on the platform.",
    "旅行者は遅れた列車をホームで一緒に待つ間、よく知らない人と会話を始める。",
    "initiate|start",
    "strike up a conversation|strike up a friendship|strike up an acquaintance"
  ],
  [
    "leaf through",
    "ぱらぱらとめくる",
    "verb",
    "Customers can ____ the catalog to glance at the illustrations before deciding which furniture to order.",
    "客はどの家具を注文するか決める前に、カタログをぱらぱらとめくって写真を見ることができる。",
    "browse|skim",
    "leaf through a magazine|leaf through a catalog|leaf through the pages"
  ],
  [
    "toy with",
    "考えをもてあそぶ、漠然と考える",
    "verb",
    "The chef began to ____ the idea of opening a second restaurant but had not made any definite plans.",
    "料理人は2軒目の店を開く考えを漠然と思い始めたが、具体的な計画はまだ立てていなかった。",
    "consider casually|entertain",
    "toy with an idea|toy with a proposal|toy with someone's feelings"
  ]
];
var FOCUS_WORDS=[
  "abate",
  "adjourn",
  "adroit",
  "alleviate",
  "assassination",
  "auspicious",
  "banish",
  "bemoan",
  "black out",
  "boon",
  "branch out",
  "busker",
  "buttress",
  "capricious",
  "catapult",
  "clam up",
  "clatter",
  "cluster",
  "coddle",
  "collate",
  "congregation",
  "consignment",
  "consolidate",
  "contrite",
  "corpulent",
  "coup",
  "cranky",
  "credence",
  "defer",
  "denounce",
  "dent",
  "despicable",
  "detonate",
  "dignified",
  "digression",
  "diminutive",
  "discord",
  "dissipate",
  "distasteful",
  "dole out",
  "downfall",
  "dubious",
  "ease off",
  "eccentric",
  "elucidate",
  "emanate",
  "endemic",
  "entreaty",
  "envoy",
  "epitaph",
  "equivocate",
  "expel",
  "flounder",
  "gaunt",
  "gentry",
  "germination",
  "graft",
  "gratify",
  "haphazard",
  "heedless",
  "heresy",
  "hoard",
  "identify with",
  "implore",
  "impromptu",
  "inherent",
  "insipid",
  "intrepid",
  "jilt",
  "lavish",
  "leaf through",
  "levity",
  "liaison",
  "lucrative",
  "meager",
  "mesmerize",
  "mete out",
  "meticulous",
  "modulate",
  "mutilate",
  "obstinate",
  "ornate",
  "paramount",
  "parchment",
  "penchant",
  "peripheral",
  "pertinent",
  "petrified",
  "pluck up",
  "polish off",
  "porous",
  "postulate",
  "precedent",
  "pretext",
  "pristine",
  "prose",
  "purge",
  "queasy",
  "quell",
  "rampage",
  "recant",
  "recede",
  "rectify",
  "reel in",
  "repudiate",
  "revert",
  "revoke",
  "rife",
  "rift",
  "roll out",
  "scour",
  "scruffy",
  "serene",
  "sluggish",
  "solicit",
  "spurn",
  "squad",
  "staunch",
  "straddle",
  "strike up",
  "superficial",
  "taint",
  "tamper with",
  "tedious",
  "thwart",
  "torment",
  "toy with",
  "tremor",
  "trump up",
  "vestige",
  "vigilant",
  "virile"
];
var words=window.EIKEN_WORDS,questions=window.EIKEN_VOCAB_EXPANSION_QUESTIONS,translations=window.EIKEN_VOCAB_EXPANSION_TRANSLATIONS;
DATA.forEach(function(a){
 if(words.some(function(x){return x.w===a[0]}))throw new Error('Duplicate vocabulary: '+a[0]);
 words.push({w:a[0],m:a[1],j:a[1],p:a[2],s:a[3],synonyms:a[5].split('|'),antonyms:['明確な反意語なし'],collocations:a[6].split('|')});
 translations[a[0]]=a[4];
});
// Fixed, same-part-of-speech distractors. They are not the original exam choices.
var distractors={verb:['substantiate','alleviate','reconcile'],adjective:['austere','capricious','meticulous'],noun:['clemency','solvency','anomaly']};
DATA.forEach(function(a){
 var choices=[a[0]].concat(distractors[a[2]]);
 questions[a[0]]={sentence:a[3],choices:choices};
});
FOCUS_WORDS.forEach(function(word){
 var item=words.find(function(x){return x.w===word});
 if(!item)throw new Error('Missing focus vocabulary: '+word);
 item.focusReview=true;
});
})();
