// Compile hand-reviewed contextual rationales into an offline explanation bank.
const fs=require('node:fs'),vm=require('node:vm');
const ctx={window:{}};vm.createContext(ctx);
['words.js','words-extra.js','vocab-expansion.js','focused-vocab.js','word-details.js','quiz-quality.js','quiz-data.js','quiz-translations.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const words=ctx.window.EIKEN_WORDS,items=ctx.window.EIKEN_EXAMPLE_LIBRARY;
const reasons=new Map(fs.readFileSync('scripts/explanation-reasons.tsv','utf8').trim().split('\n').map(line=>{const [word,cue,reason]=line.split('|');return[word.trim(),{cue,reason}]}));
const normalized=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const explicit={
 'intransigent:equivocal':'equivocalは発言や態度が曖昧で、立場を断定しないことです。この大臣は修正を明確に拒否しており、態度の曖昧さではなく、妥協しない強硬さが論点です。',
 'intransigent:magnanimous':'magnanimousは相手を許したり、寛大に扱ったりする態度です。欠陥を指摘されても政策の修正を拒むこの場面は、相手を受け入れる寛大さを述べていません。',
 'intransigent:sanguine':'sanguineは将来への楽観を表します。本文には将来うまくいくとの予測はなく、監査後も修正を拒む行動から妥協のなさを判断します。',
 'assuage:emanate':'emanateは臭い・光・感情などが「発する」という動詞で、通常はemanate from＋発生源と使います。この文は首相がpublic anxietyに働きかけて軽減する話で、発生源を示す構造ではありません。',
 'assuage:solicit':'solicitは意見・寄付・協力などを求めることです。不安を国民に求めるのではなく、攻撃後に生じた不安を和らげようとしています。',
 'assuage:consolidate':'consolidateは別々のものを統合したり、地位などを強固にしたりすることです。国民の不安を強固にするのでなく、不安を減らす働きかけが必要です。',
 'exacerbate:suppress':'suppressは緊張や反発などを押さえ込む方向の動詞です。意思疎通の不足で対立が深まるというここでの因果関係とは逆になります。',
 'exacerbate:wane':'waneは勢いが自然に弱まることです。通常はtensions waneのように使い、ここでのようにpoor communicationがtensionsを目的語に取って悪化させる構造にはなりません。',
 'exacerbate:venerate':'venerateは人や伝統を深く敬う動詞です。tensionsは敬意を向ける相手ではなく、不十分な意思疎通によって悪化する状態です。',
 'emulate:elucidate':'elucidateは仕組みや意味を明らかに説明することです。この文は経営方法を解説するのでなく、成功企業の方法を自社でも手本にする話です。',
 'emulate:solicit':'solicitは依頼して意見や協力を求めることです。成功企業の経営方法を手本にする行動とは異なり、相手への依頼は述べられていません。',
 'emulate:emanate':'emanateは何かが発生源から出ることで、emanate fromの形が基本です。startupsがmanagement styleを目的語に取って見習う、この文の構造とは合いません。',
 'concede:jettison':'jettisonは計画や荷物などを捨て去る動詞です。that節の内容が欠陥だったと認めるにはconcede thatを使い、jettison that節とは言いません。',
 'concede:laud':'laudは人や功績を称賛します。ここでは支持者にも都合の悪い欠陥を認める必要があり、政策を褒める場面ではありません。',
 'concede:mollify':'mollifyは怒った人をなだめる動詞です。ここにはなだめる相手でなく、欠陥を述べるthat節が続いています。',
 'elicit:expel':'expelは人を追放したり、物を外へ排出したりすることです。作品が視聴者の内側から共感を引き出すというelicit sympathy fromの関係とは異なります。',
 'elicit:detonate':'detonateは爆薬などを爆発させる動詞です。sympathyという感情を生み出す場面には使いません。',
 'elicit:catapult':'catapultは人などを急に高い地位へ押し上げる比喩に使います。catapult someone into fameと異なり、ここはsympathyをfrom viewersと結び付けて引き出す文です。',
 'laconic:copious':'copiousは量が豊富であることです。返答がonly two wordsだったという情報と逆で、情報の少なさを示すlaconicが必要です。',
 'mitigate:disconcert':'disconcertは予想外のことによって人を当惑させます。ここで直接作用する対象は人でなく、植樹によって小さくする猛暑のimpactです。',
 'mitigate:discredit':'discreditは主張や人物の信用を損ないます。植樹で熱の影響を和らげることは、何かの信用を否定する行為ではありません。',
 'mitigate:disseminate':'disseminateは情報などを広く行き渡らせます。ここでは猛暑の影響を広げるのでなく、小さくするために木を植えています。',
 'proliferate:corroborate':'corroborateは証言や主張を裏付ける動詞で、通常は裏付ける対象が必要です。ここには目的語がなく、誤情報そのものが増える自動詞のproliferateを使います。',
 'proliferate:debase':'debaseは通貨や基準などの価値を下げる動詞です。ここは価値を下げられる目的語がなく、情報の件数が増えることを述べています。',
 'proliferate:debilitate':'debilitateは患者や組織を弱らせる動詞です。False information自身がrapidly増えていく文で、弱らせる相手は述べられていません。',
 'scrutinize:denounce':'denounceは公然と非難することです。記者に必要なのは発表を最初から非難することではなく、事実として報道する前に内容を調べることです。',
 'scrutinize:banish':'banishは人を追放したり、不安を払い去ったりします。声明の真偽を調べる行為は表せません。',
 'scrutinize:postulate':'postulateは証拠が確立する前に仮定を置くことです。ここは公式声明を仮定として提案するのでなく、報道前に検証する段階です。',
 'pretext:clemency':'clemencyは処罰を軽くする寛大な措置です。書類の不備を利用して会議を中止する理由にしており、誰かへの処罰を免除する場面ではありません。',
 'pretext:solvency':'solvencyは債務を支払える財務上の能力です。書類の誤りをas a pretextとして利用するこの文には、借金の返済能力は関係しません。',
 'pretext:anomaly':'anomalyは通常の傾向から外れた異例の事象です。本文のポイントは誤りが珍しいかどうかでなく、出たくない会議を中止する理由に利用したことです。',
 'postulate:substantiate':'substantiateは証拠を示して主張を立証することです。本文ではdirect evidence has yet to emergeと直接証拠がないため、立証済みでなく仮説として置くpostulateを使います。',
 'obdurate:petrified':'petrifiedは恐怖で固まる状態です。ここで理事会は危険を理解したと明言しながら変更を拒んでおり、恐怖で動けないのではなく意志を曲げないのが要点です。',
 'ramification:clemency':'clemencyは罪への寛大な処分です。市場参入条件の変更から将来の交渉に波及する結果を指しており、処罰を軽くする話ではありません。'
};
const entries={};
for(const item of items){
 const word=words.find(x=>x.w===item.word),r=reasons.get(item.word);if(!r)throw Error('Missing rationale '+item.word);
 const clues=r.cue.split(';').map(s=>s.trim()).filter(s=>normalized(item.sentence).includes(normalized(s)));if(!clues.length)throw Error('No grounded clue '+item.word);
 const contrasts={};
 for(const option of item.choices.filter(x=>x!==item.word)){
  const other=words.find(x=>x.w===option),usage=(other.collocations||[]).slice(0,2).join(' / ');
  // Each comparison contains the actual selected sense/usage and the question-specific
  // semantic requirement. Do not infer a grammar error from a meaning mismatch.
  contrasts[option]={kind:'意味・用法の比較',text:explicit[item.word+':'+option]||`「${option}」は「${other.m}」を表し、用例は「${usage}」です。一方、この文の「${clues.join(' / ')}」が示すのは、${r.reason} ここで必要な「${word.m}」と、選んだ語の「${other.m}」を区別します。`};
 }
 entries[item.word]={sentence:item.sentence,choices:item.choices.slice(),clues,reason:r.reason,contrasts};
}
if(entries&&Object.keys(entries).length!==768)throw Error('Unexpected bank size');
fs.writeFileSync('question-explanations.js',"// Offline explanations compiled from reviewed contextual rationales.\nwindow.EIKEN_QUESTION_EXPLANATIONS="+JSON.stringify(entries,null,2)+';\n');
console.log('Built explanations for '+items.length+' questions and '+items.length*3+' distractor comparisons');
