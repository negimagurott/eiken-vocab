(function(){
'use strict';
var VERSION='2.5.11',RELEASE='20260719-dom-xss-hardening',KEY='eiken1_vocab_app_v20',OLD_KEYS=['eiken1_vocab_app_v13','eiken1_vocab_app_v12','eiken1_vocab_app_v11','eiken1_vocab_app_v5'],REVIEW_LIMIT=15,SRS_GAPS=[1,3,7,14,30],STREAK=window.EIKEN_STREAK;
var MOTIVATION_MESSAGES=['今日の10分が、本番で迷わない一問をつくる。','完璧より継続。まずは今日の一問から。','覚えた単語の数だけ、英語で見える世界が広がる。','「まだ」は失敗ではなく、記憶を強くする合図。','思い出そうとした回数が、使える語彙を育てる。','一語ずつでいい。積み重ねは必ず点数になる。','昨日より一語多く分かれば、今日は前進。','忘れるのは自然。復習するたび記憶は強くなる。','難しいと感じる問題ほど、伸びしろが大きい。','小さな学習を止めない人が、最後に強い。','今日覚えた一語が、本番の選択肢を変える。','迷った単語こそ、次に正解できるチャンス。','続けた日数は、自分を裏切らない。','集中するのは10分だけ。その10分を積み上げよう。','できなかった問題は、成長する場所を教えてくれる。','語彙力は一日では増えない。でも毎日なら増えていく。','今日の復習は、未来の自分への先回り。','一問に向き合う。その繰り返しが合格を近づける。','昨日の苦手を、今日の得意に変えていこう。','ここまで続けた自分なら、今日も一歩進める。'];
var WORDS=(window.EIKEN_WORDS||[]),EXAMPLE_LIBRARY=(window.EIKEN_EXAMPLE_LIBRARY||[]),QUESTION_BANK=(EXAMPLE_LIBRARY.length?EXAMPLE_LIBRARY:(window.EIKEN_QUIZ_ITEMS||[])),QUIZ_TRANSLATIONS=(window.EIKEN_QUIZ_TRANSLATIONS||{}),QUESTION_WORDS=QUESTION_BANK.map(function(item){return WORDS.find(function(word){return word.w===item.word})}).filter(Boolean),WRITING_TOPICS=(window.EIKEN_WRITING_TOPICS||[]),today=localDate(),calendarMonth=today.slice(0,7),deferredInstallPrompt=null,state={date:'',questions:[],answers:{},graded:false,explanationsVisible:false,score:0,stats:{},days:{},history:{},missions:{},writingByDate:{},dailyReviewByDate:{},card:0,reveal:false,theme:'auto',regenByDate:{}};
function $(id){return document.getElementById(id)}
function localDate(){return STREAK.dateKey(new Date(),STREAK.JST)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){toast('保存できませんでした')}}
function load(){try{var raw=localStorage.getItem(KEY);if(!raw){for(var i=0;i<OLD_KEYS.length;i++){raw=localStorage.getItem(OLD_KEYS[i]);if(raw)break}}if(raw)state=Object.assign(state,JSON.parse(raw))}catch(e){}if(!state.stats)state.stats={};if(!state.days)state.days={};if(!state.history)state.history={};if(!state.missions)state.missions={};if(!state.answers)state.answers={};if(!state.regenByDate)state.regenByDate={};if(!state.writingByDate)state.writingByDate={};if(!state.dailyReviewByDate)state.dailyReviewByDate={};if(!state.theme)state.theme='auto';state.days=STREAK.deriveStudyDays(state,{includeLegacyHistory:state.studyDayMigrationVersion!==1});state.studyDayMigrationVersion=1;applyStudyRecovery();WORDS.forEach(function(x){var s=state.stats[x.w];if(!s)s=state.stats[x.w]={seen:0,correct:0,wrong:0,known:false,due:'',level:0};if(typeof s.hardCount!=='number')s.hardCount=0;if(typeof s.quizAttempts!=='number')s.quizAttempts=s.seen||0;if(typeof s.quizCorrect!=='number')s.quizCorrect=s.correct||0;if(typeof s.reviewStep!=='number')s.reviewStep=Math.max(0,Math.min(4,s.level||0));if(!s.lastStudied)s.lastStudied=s.lastCardDate||'';if(!s.seen&&s.due==='2000-01-01')s.due=''});ensureMission();ensureDailyReview();save()}
function ensureMission(){if(!state.missions)state.missions={};if(!state.missions[today])state.missions[today]={quiz:false,cards:{},cardsDone:false,writing:false,complete:false};var m=state.missions[today];if(!m.cards)m.cards={};if(typeof m.writing==='undefined')m.writing=!!m.complete}
function applyTheme(){var mode=state.theme||'auto',dark=mode==='dark'||(mode==='auto'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',dark?'dark':'light');var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',dark?'#0d111a':'#172033');if($('themeSelect'))$('themeSelect').value=mode}
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24)}return h>>>0}
function renderMotivation(){var dayNumber=Math.floor(new Date(today+'T00:00:00').getTime()/86400000),index=(dayNumber*7+hash('daily-motivation'))%MOTIVATION_MESSAGES.length;if($('dailyMotivation'))$('dailyMotivation').textContent=MOTIVATION_MESSAGES[index]}
function rng(seed){var x=seed||123456789;return function(){x^=x<<13;x^=x>>>17;x^=x<<5;return((x>>>0)/4294967296)}}
function shuffle(a,seed){var r=rng(seed),b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=b[i];b[i]=b[j];b[j]=t}return b}
function addDays(d,n){return STREAK.addDays(d,n)}
function rebuildStudyDays(){state.days=STREAK.deriveStudyDays(state,{includeLegacyHistory:true});state.studyDayMigrationVersion=1;state.studyRecovery='history-'+today;save();return STREAK.calculate(state.days,today)}
function restoreStudyDays(){var result=rebuildStudyDays();renderStats();toast('学習履歴から再計算しました（現在'+result.current+'日・最長'+result.longest+'日）')}
function restoreConfirmedStudyDays(){var start=$('restoreStartDate').value,earliest=addDays(today,-3650);if(!STREAK.isDateKey(start)||start>today||start<earliest){toast('過去10年以内の継続開始日を選んでください');return}if(!confirm(start+'から'+today+'までを連続学習済みとして記録しますか？'))return;rebuildStudyDays();state.days=STREAK.fillRange(state.days,start,today);state.studyRecovery='confirmed-'+start+'-'+today;save();var result=streakSummary();renderStats();toast('Streakを'+result.current+'日に復旧しました')}
function applyStudyRecovery(){try{var url=new URL(location.href);if(url.searchParams.get('restore')!=='7')return;rebuildStudyDays();url.searchParams.delete('restore');history.replaceState(null,'',url.pathname+(url.searchParams.toString()?'?'+url.searchParams.toString():'')+url.hash)}catch(e){}}
function speak(word){try{if(!('speechSynthesis'in window)){toast('このブラウザでは音声再生に非対応です');return}speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(word);u.lang='en-US';u.rate=.82;speechSynthesis.speak(u)}catch(e){toast('音声を再生できませんでした')}}
function schedule(word,ok,source){var s=state.stats[word];if(!s)return;s.lastStudied=today;if(source==='quiz'){s.quizAttempts=(s.quizAttempts||0)+1;s.seen=(s.seen||0)+1;if(ok){s.quizCorrect=(s.quizCorrect||0)+1;s.correct=(s.correct||0)+1}else{s.wrong=(s.wrong||0)+1}}else if(!ok){s.hardCount=(s.hardCount||0)+1}if(ok){var step=Math.max(0,Math.min(4,s.reviewStep||0));s.due=addDays(today,SRS_GAPS[step]);s.reviewStep=Math.min(4,step+1);s.level=s.reviewStep;if(s.reviewStep>=4)s.known=true}else{s.reviewStep=0;s.level=0;s.known=false;s.due=addDays(today,1)}}
function streakSummary(){return STREAK.calculate(state.days||{},today)}
function streak(){return streakSummary().current}
function pad2(value){return String(value).padStart(2,'0')}
function calendarDate(year,month,day){return year+'-'+pad2(month+1)+'-'+pad2(day)}
function activityCount(date){var m=(state.missions&&state.missions[date])||{},count=0;if(m.quiz)count++;if(m.cardsDone||Object.keys(m.cards||{}).length)count++;if(m.writing)count++;return count}
function shiftCalendar(delta){var parts=calendarMonth.split('-'),date=new Date(Number(parts[0]),Number(parts[1])-1+delta,1);calendarMonth=date.getFullYear()+'-'+pad2(date.getMonth()+1);renderCalendar()}
function renderCalendar(){
  if(!$('studyCalendar'))return;
  var parts=calendarMonth.split('-'),year=Number(parts[0]),month=Number(parts[1])-1,daysInMonth=new Date(year,month+1,0).getDate(),firstDay=new Date(year,month,1).getDay(),cellCount=Math.ceil((firstDay+daysInMonth)/7)*7,studied=0,html='';
  for(var day=1;day<=daysInMonth;day++)if(state.days&&state.days[calendarDate(year,month,day)])studied++;
  for(var cell=0;cell<cellCount;cell++){
    var dateDay=cell-firstDay+1;
    if(dateDay<1||dateDay>daysInMonth){html+='<div class="calendar-day outside" role="gridcell" aria-hidden="true"></div>';continue}
    var date=calendarDate(year,month,dateDay),isStudied=!!(state.days&&state.days[date]),isToday=date===today,isFuture=date>today,activities=isStudied?Math.max(1,activityCount(date)):0,classes='calendar-day'+(isStudied?' studied':'')+(isToday?' today':'')+(isFuture?' future':''),label=date+(isStudied?' 学習済み '+activities+'項目':isFuture?' 未来':' 未学習');
    html+='<div class="'+classes+'" role="gridcell" aria-label="'+esc(label)+'"><b>'+dateDay+'</b><span class="day-marker">'+(isStudied?'✓':'')+'</span><small>'+(isStudied?activities+'/3':isFuture?'':'—')+'</small></div>';
  }
  var currentMonth=today.slice(0,7),denominator=calendarMonth<currentMonth?daysInMonth:calendarMonth===currentMonth?Number(today.slice(8,10)):0,rate=denominator?Math.round(studied/denominator*100):0,streaks=streakSummary(),currentStreak=streaks.current;
  $('studyCalendar').innerHTML=html;$('calendarTitle').textContent=year+'年'+(month+1)+'月';$('monthStudyDays').textContent=studied+'日';$('monthStudyRate').textContent=denominator?rate+'%':'—';$('longestStreak').textContent=streaks.longest+'日';$('calendarNext').disabled=calendarMonth>=currentMonth;$('streakLarge').textContent=currentStreak;$('streakMessage').textContent=state.days&&state.days[today]?'今日も学習済み。この調子で続けましょう':currentStreak?'現在'+currentStreak+'日継続中。今日も記録をつなげましょう':'今日の学習から新しい記録を始めましょう';
}
function examDays(){var target=new Date('2026-10-04T00:00:00'),now=new Date(today+'T00:00:00');return Math.max(0,Math.ceil((target-now)/86400000))}
function currentWords(){return(state.questions||[]).map(function(w){var word=WORDS.find(function(x){return x.w===w}),item=QUESTION_BANK.find(function(x){return x.word===w});if(!word||!item)return null;return Object.assign({},word,{s:item.sentence,translation:QUIZ_TRANSLATIONS[w]||''})}).filter(Boolean)}
function reviewWords(){return((state.dailyReviewByDate&&state.dailyReviewByDate[today])||[]).map(function(w){return WORDS.find(function(x){return x.w===w})}).filter(Boolean)}
function daysSince(date){if(!date)return 365;return Math.max(0,Math.floor((new Date(today+'T00:00:00')-new Date(date+'T00:00:00'))/86400000))}
function mission(){ensureMission();return state.missions[today]}
function cardsSeenCount(){return Object.keys(mission().cards||{}).length}
function updateMission(){var m=mission();state.days[today]=true;m.cardsDone=cardsSeenCount()>=REVIEW_LIMIT;if(m.quiz&&m.cardsDone&&m.writing&&!m.complete){m.complete=true;toast('Daily Mission Complete! Streak達成です')}save()}
function recentMap(days,includeToday){var out={},dates=Object.keys(state.history||{}).sort().slice(-days);dates.forEach(function(d){if(!includeToday&&d===today)return;(state.history[d]||[]).forEach(function(w){out[w]=true})});return out}
function learnerAccuracy(){var attempts=0,correct=0;Object.keys(state.stats||{}).forEach(function(word){attempts+=state.stats[word].quizAttempts||0;correct+=state.stats[word].quizCorrect||0});return attempts?correct/attempts:0.6}
function priority(x,recent,current){
  var st=state.stats[x.w]||{};
  var attempts=st.quizAttempts||0,correct=st.quizCorrect||0,age=daysSince(st.lastStudied),p=0;
  p+=(st.wrong||0)*12;
  p+=(st.hardCount||0)*10;
  p+=attempts?Math.round((1-correct/attempts)*30):18;
  p+=Math.min(age,30);
  if(age>=7)p+=15;
  if(st.due&&st.due<=today)p+=45+Math.min(daysSince(st.due),30);
  if(!attempts&&!st.lastStudied)p+=15;
  if(st.known&&(!st.due||st.due>today))p-=35;
  var item=QUESTION_BANK.find(function(question){return question.word===x.w}),target=learnerAccuracy()>=.75?92:learnerAccuracy()>=.55?88:84;
  if(item&&typeof item.difficulty==='number')p+=Math.max(0,18-Math.abs(item.difficulty-target)/2);
  if(item&&item.quality)p+=(item.quality.total-80)/5;
  if(recent&&recent[x.w])p-=12;
  if(current&&current[x.w])p-=100;
  return p;
}
function rankWords(words,recent,current,seed){return shuffle(words,seed).sort(function(a,b){return priority(b,recent,current)-priority(a,recent,current)})}
function ensureDailyReview(){if(!state.dailyReviewByDate)state.dailyReviewByDate={};var saved=state.dailyReviewByDate[today];if(saved&&saved.length&&saved.every(function(w){return WORDS.some(function(x){return x.w===w})}))return;state.dailyReviewByDate[today]=rankWords(WORDS,{},null,hash(today+'-review-'+RELEASE)).slice(0,REVIEW_LIMIT).map(function(x){return x.w})}
function pickQuestions(force){var recent=recentMap(7,false),current={};(state.questions||[]).forEach(function(w){current[w]=true});var seed=hash(today+'-'+(state.regenByDate[today]||0)+'-'+RELEASE),ranked=rankWords(QUESTION_WORDS,recent,force?current:null,seed),picked=[],sentences={};ranked.forEach(function(x){var item=QUESTION_BANK.find(function(q){return q.word===x.w}),sentence=item&&item.sentence;if(picked.length<10&&sentence&&!sentences[sentence]){sentences[sentence]=true;picked.push(x)}});return picked.map(function(x){return x.w})}
function guessPos(x){
  if(x.p==='v')return 'verb';
  if(x.p==='a')return 'adjective';
  if(x.p==='n')return 'noun';
  var s=' '+(x.s||'').toLowerCase()+' ';
  var blank=' ____ ';

  if(s.includes('to ____ ')||s.includes('helped ____ ')||s.includes('can ____ ')||s.includes('must ____ ')||s.includes('should ____ ')||s.includes('would ____ ')||s.includes('could ____ ')){
    return 'verb';
  }

  if(s.includes('an ____ ')||s.includes('a ____ ')||s.includes('the ____ ')||s.includes('become ____ ')||s.includes('became ____ ')||s.includes('remained ____ ')||s.includes('was ____ ')||s.includes('were ____ ')||s.includes('is ____ ')||s.includes('are ____ ')){
    return 'adjective';
  }

  if(s.includes('of ____ ')||s.includes('an ____ for')||s.includes('a ____ of')||s.includes('major ____ ')||s.includes('policy ____ ')){
    return 'noun';
  }

  return 'unknown';
}
function createChoices(x){
  var seed=hash(today+x.w+RELEASE+'-choices');
  var approved=QUESTION_BANK.find(function(item){return item.word===x.w});
  if(approved&&Array.isArray(approved.choices)&&approved.choices.length===4)return shuffle(approved.choices,seed+1);
  var pos=guessPos(x);

  var samePos=WORDS.filter(function(y){
    return y.w!==x.w && guessPos(y)===pos;
  });

  var pool=samePos.length>=3?samePos:WORDS.filter(function(y){
    return y.w!==x.w;
  });

  var wrongs=shuffle(pool,seed).slice(0,3).map(function(y){
    return y.w;
  });

  return shuffle([x.w].concat(wrongs),seed+1);
}
function generate(force){load();today=localDate();ensureMission();applyTheme();if(!force&&state.date===today&&state.questions&&state.questions.length===10&&state.questions.every(function(word){return QUESTION_BANK.some(function(item){return item.word===word})})){render();return}if(force)state.regenByDate[today]=(state.regenByDate[today]||0)+1;state.date=today;state.answers={};state.graded=false;state.explanationsVisible=false;state.score=0;state.card=0;state.reveal=false;var m=mission();m.quiz=false;m.cards={};m.cardsDone=false;m.complete=false;state.questions=pickQuestions(force);state.history[today]=state.questions;save();render();toast(force?'重複を抑えて10問を再生成しました':'今日の10問を作成しました')}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function appendText(parent,tag,text,className){var element=document.createElement(tag);if(className)element.className=className;element.textContent=String(text);parent.appendChild(element);return element}
function render(){renderStats();renderQuiz();renderCard();renderWriting();renderWords();exportData()}
function renderStats(){var words=currentWords(),m=mission(),reviewed=cardsSeenCount(),remaining=Math.max(0,reviewWords().length-reviewed),ms=(m.quiz?1:0)+(m.cardsDone?1:0)+(m.writing?1:0);renderMotivation();$('score').textContent=(state.score||0)+'/'+(words.length||10);$('missionScore').textContent=ms+'/3';$('days').textContent=Object.keys(state.days||{}).length;$('streak').textContent=streak();$('exam').textContent=examDays();$('known').textContent=Object.keys(state.stats).filter(function(w){return state.stats[w].known}).length;$('reviewRemaining').textContent=remaining;$('startReviewBtn').classList.toggle('review-complete',remaining===0);$('startReviewBtn').querySelector('b').textContent=remaining===0?'今日の復習完了 ✓':'復習を始める →';$('bar').style.width=(ms/3*100)+'%';$('missionQuiz').classList.toggle('done',!!m.quiz);$('missionCards').classList.toggle('done',!!m.cardsDone);$('missionWriting').classList.toggle('done',!!m.writing);$('cardsSeen').textContent=reviewed;$('status').textContent=m.complete?'Daily Mission Complete. 英検1級まであと '+examDays()+' 日。':'今日のMission: Quiz＋Flashcards＋Writing。英検1級まであと '+examDays()+' 日。';renderCalendar()}
function grade(){var words=currentWords();if(!words.length||state.graded)return;var score=0;words.forEach(function(x){var ok=state.answers[x.w]===x.w;if(ok)score++;schedule(x.w,ok,'quiz')});state.score=score;state.graded=true;state.explanationsVisible=true;mission().quiz=true;updateMission();render();toast(score+' / '+words.length+' 点です')}
function showAnswers(){if(!state.graded){toast('採点後に解説を表示できます');return}state.explanationsVisible=!state.explanationsVisible;save();renderQuiz()}
function reviewLabel(result){if(result==='good')return '前回: 覚えた';if(result==='hard')return '前回: まだ';return ''}
function next(n){var words=reviewWords();if(!words.length)return;state.card=(state.card+n+words.length)%words.length;state.reveal=false;save();renderCard();renderStats()}
function mark(ok){
  var words=reviewWords();
  if(!words.length)return;

  var word=words[state.card].w;
  var btn=ok ? $('goodBtn') : $('hardBtn');
  var flash=$('flash');
  var st=state.stats[word];

  schedule(word,ok,'card');
  st=state.stats[word];
  if(st){st.lastCardResult=ok?'good':'hard';st.lastCardDate=today;}
  mission().cards[word]=true;
  updateMission();
  state.reveal=false;
  save();
  renderWords();

  flash.classList.remove('feedback-good','feedback-hard','remembered-good','remembered-hard');
  if(btn){
    btn.classList.remove('feedback-good','feedback-hard');
    btn.classList.add(ok?'feedback-good':'feedback-hard');
  }
  flash.classList.add(ok?'feedback-good':'feedback-hard');

  toast(ok ? '✓ 覚えた：復習間隔を延ばしました' : '↻ まだ：明日もう一度出します');

  setTimeout(function(){
    if(btn)btn.classList.remove('feedback-good','feedback-hard');
    flash.classList.remove('feedback-good','feedback-hard');
    next(1);
  },850);
}
function posLabel(x){return{v:'動詞',a:'形容詞',n:'名詞',verb:'動詞',adjective:'形容詞',noun:'名詞'}[x.pos||x.p||guessPos(x)]||'品詞未登録'}
function listText(value){return Array.isArray(value)&&value.length?value.join(' / '):'—'}
function contextFrame(sentence,word){var parts=String(sentence||'').split('____'),left=(parts[0]||'').trim().split(/\s+/).slice(-4).join(' '),right=(parts[1]||'').trim().split(/\s+/).slice(0,4).join(' ');return(left+' '+word+' '+right).trim()}
function answerReason(x,opts){
  var translation=x.translation||'和訳未登録',frame=contextFrame(x.s,x.w),collocations=(x.collocations||[]).filter(function(value){return String(value).toLowerCase().indexOf(x.w.toLowerCase())>=0&&String(value).split(/\s+/).length<=7}).slice(0,2),wrong=opts.filter(function(option){return option!==x.w}).map(function(option){return WORDS.find(function(word){return word.w===option})}).filter(Boolean),selected=state.answers[x.w],selectedWord=selected&&selected!==x.w?WORDS.find(function(word){return word.w===selected}):null;
  var html='<div class="reasoning"><p><b>決め手：</b>和訳の「'+esc(translation)+'」から、空欄には「'+esc(x.m)+'」を表す'+esc(posLabel(x))+'が必要です。</p><p><b>文中での結びつき：</b><span class="context-frame">'+esc(frame)+'</span> とすると、文が伝えたい意味と語法が一致します。</p>';
  if(collocations.length)html+='<p><b>関連する自然な表現：</b>'+esc(collocations.join(' / '))+'</p>';
  if(selectedWord)html+='<p class="selected-miss"><b>選んだ語との違い：</b>「'+esc(selectedWord.w)+'」は「'+esc(selectedWord.m)+'」なので、この文が必要とする「'+esc(x.m)+'」とは意味の方向が異なります。</p>';
  if(wrong.length)html+='<p><b>ほかの選択肢：</b>'+wrong.map(function(word){return esc(word.w)+'（'+esc(word.m)+'）'}).join('、')+'。品詞は同じでも、文脈が要求する意味や語の結びつきに合いません。</p>';
  return html+'</div>';
}
function syncCardHeight(){var flash=$('flash'),front=flash&&flash.querySelector('.front'),back=flash&&flash.querySelector('.back');if(!flash||!front||!back)return;flash.style.height='';var minimum=window.innerWidth<=620?480:390;flash.style.height=Math.max(minimum,front.scrollHeight,back.scrollHeight)+'px'}
function writingTopic(){if(!WRITING_TOPICS.length)return 'Writing topic is unavailable.';return WRITING_TOPICS[hash(today)%WRITING_TOPICS.length]}
function wordCount(text){var trimmed=(text||'').trim();return trimmed?trimmed.split(/\s+/).length:0}
function renderWriting(){var draft=state.writingByDate[today]||'';$('writingTopic').textContent=writingTopic();if(document.activeElement!==$('writingDraft'))$('writingDraft').value=draft;$('writingCount').textContent=wordCount(draft)+' words';$('writingDoneBtn').textContent=mission().writing?'✓ 完了済み':'今日のWritingを完了';$('writingDoneBtn').classList.toggle('writing-complete',!!mission().writing)}
function saveWriting(){state.writingByDate[today]=$('writingDraft').value;$('writingCount').textContent=wordCount(state.writingByDate[today])+' words';save()}
function completeWriting(){saveWriting();if(wordCount(state.writingByDate[today])<1){toast('回答を入力してから完了してください');return}mission().writing=true;updateMission();renderStats();renderWriting();toast('今日のWritingを保存しました')}
function renderQuiz(){
  var box=$('quizBox'),words=currentWords(),showExplanation=!!(state.graded&&state.explanationsVisible);
  if(!words.length){box.innerHTML='<p>「今日の10問」を押してください。</p>';return}
  box.innerHTML=words.map(function(x,i){
    var opts=createChoices(x);
    return '<div class="q" data-word="'+esc(x.w)+'"><div class="meta">Question '+(i+1)+'</div><div class="sentence">'+esc(x.s)+'</div>'+opts.map(function(o){
      var cls='choice',item=WORDS.find(function(y){return y.w===o}),mark='';
      if(state.answers[x.w]===o)cls+=' selected';
      if(state.graded&&o===x.w){cls+=' correct';mark='✓ '}
      if(state.graded&&state.answers[x.w]===o&&o!==x.w){cls+=' wrong';mark='✕ '}
      return '<button class="'+cls+'" data-choice="'+esc(o)+'"><span>'+mark+esc(o)+'</span>'+(state.graded?'<small>'+esc(item?item.m:'意味未登録')+'</small>':'')+'</button>';
    }).join('')+'<div class="explain '+(showExplanation?'show':'')+'"><b>'+esc(x.w)+'</b> <span class="pos-badge">'+esc(posLabel(x))+'</span> <button class="speak" data-speak="'+esc(x.w)+'" type="button">🔊</button><p><b>意味：</b>'+esc(x.m)+'</p><p><b>完成文：</b>'+esc(x.s.replace('____',x.w))+'</p><p><b>和訳：</b>'+esc(x.translation||'和訳未登録')+'</p><h4>なぜこの答え？</h4>'+answerReason(x,opts)+'</div></div>';
  }).join('');
  box.querySelectorAll('.choice').forEach(function(b){b.addEventListener('click',function(){if(state.graded)return;var q=b.closest('.q');state.answers[q.getAttribute('data-word')]=b.getAttribute('data-choice');save();renderQuiz()})});
  box.querySelectorAll('[data-speak]').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();speak(b.getAttribute('data-speak'))})});
  $('answerBtn').disabled=!state.graded;
  $('gradeBtn').disabled=!!state.graded;
  $('answerBtn').textContent=showExplanation?'解説を隠す':'解説を表示';
}
function renderCard(){
  var words=reviewWords();
  if(!words.length){$('cardWord').textContent='---';$('counter').textContent='';return}
  if(state.card>=words.length)state.card=0;if(state.card<0)state.card=words.length-1;
  var x=words[state.card],st=state.stats[x.w]||{},result=st.lastCardResult||'';
  $('flash').classList.toggle('flipped',!!state.reveal);$('flash').classList.remove('remembered-good','remembered-hard');
  if(result==='good')$('flash').classList.add('remembered-good');if(result==='hard')$('flash').classList.add('remembered-hard');
  $('cardWord').textContent=x.w;$('backWord').textContent=x.w;$('cardPron').textContent=posLabel(x);$('cardMean').textContent=x.m;$('cardSentence').textContent=x.s.replace('____',x.w);
  $('cardDetails').innerHTML='<p><b>品詞：</b>'+esc(posLabel(x))+'</p><p><b>類義語：</b>'+esc(listText(x.synonyms))+'</p><p><b>反意語：</b>'+esc(listText(x.antonyms))+'</p><p><b>コロケーション：</b>'+esc(listText(x.collocations))+'</p>';
  $('cardSpeak').setAttribute('data-word',x.w);var counter=$('counter');counter.textContent=(state.card+1)+' / '+words.length;if(result){counter.appendChild(document.createTextNode(' '));appendText(counter,'span',reviewLabel(result),'review-badge '+(result==='good'?'review-good':'review-hard'))}
  syncCardHeight();
}
function renderWords(){
  var q=($('search').value||'').toLowerCase(),box=$('wordBox'),arr=WORDS.filter(function(x){return!q||x.w.toLowerCase().includes(q)||x.m.includes(q)||x.j.includes(q)||x.s.toLowerCase().includes(q)});box.textContent='';
  arr.forEach(function(x){
    var st=state.stats[x.w]||{},label=reviewLabel(st.lastCardResult),attempts=st.quizAttempts||0,accuracy=attempts?Math.round((st.quizCorrect||0)/attempts*100)+'%':'—',card=document.createElement('div');card.className='word';
    appendText(card,'b',x.w);appendText(card,'span',posLabel(x),'pos-badge');
    var speaker=appendText(card,'button','🔊','speak');speaker.type='button';speaker.setAttribute('data-speak',x.w);speaker.addEventListener('click',function(e){e.stopPropagation();speak(x.w)});
    appendText(card,'p',x.m);
    var example=document.createElement('p');example.className='small';appendText(example,'b','例文：');example.appendChild(document.createTextNode(x.s.replace('____',x.w)));card.appendChild(example);
    if(x.collocations&&x.collocations.length){var collocation=document.createElement('p');collocation.className='small';appendText(collocation,'b','コロケーション：');collocation.appendChild(document.createTextNode(listText(x.collocations)));card.appendChild(collocation)}
    appendText(card,'span','正答率 '+accuracy,'pill');appendText(card,'span','誤答 '+(st.wrong||0),'pill');appendText(card,'span','まだ '+(st.hardCount||0),'pill');appendText(card,'span','次回 '+(st.due||'未設定'),'pill');
    if(label)appendText(card,'span',label,'pill '+(st.lastCardResult==='good'?'review-good':'review-hard'));
    box.appendChild(card);
  });
}
function switchTab(name){var achievements=name==='achievements';document.querySelectorAll('.tab').forEach(function(t){t.classList.toggle('active',t.dataset.tab===name)});document.querySelectorAll('.tabPanel').forEach(function(p){p.classList.toggle('hidden',p.id!==name)});$('homeDashboard').classList.toggle('hidden',achievements);$('mainTabs').classList.toggle('hidden',achievements);if(name==='cards')syncCardHeight();if(name==='settings')exportData();if(achievements)renderCalendar()}
function exportData(){if($('dataBox'))$('dataBox').value=JSON.stringify({version:VERSION,release:RELEASE,exportedAt:new Date().toISOString(),streaks:streakSummary(),state:state},null,2)}
function latestUrl(){var u=location.origin+location.pathname+'?v='+RELEASE;if(navigator.clipboard)navigator.clipboard.writeText(u).then(function(){toast('最新版URLをコピーしました')}).catch(function(){prompt('最新版URL',u)});else prompt('最新版URL',u)}
function toast(msg){var t=$('toast');if(!t)return;t.textContent=msg;t.className='toast show';setTimeout(function(){t.className='toast'},1800)}
function setupPwa(){window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredInstallPrompt=e;if($('installBtn'))$('installBtn').classList.remove('hidden')});if($('installBtn'))$('installBtn').addEventListener('click',function(){if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();deferredInstallPrompt=null;$('installBtn').classList.add('hidden')});if('serviceWorker'in navigator){navigator.serviceWorker.register('./sw.js?v='+RELEASE).then(function(reg){reg.update();reg.addEventListener('updatefound',function(){var nw=reg.installing;if(!nw)return;nw.addEventListener('statechange',function(){if(nw.state==='installed'&&navigator.serviceWorker.controller){$('updateBadge').classList.remove('hidden');toast('更新があります。再読み込みしてください')}})})}).catch(function(){})}}
function bind(){$('todayBtn').addEventListener('click',function(){generate(false)});$('startReviewBtn').addEventListener('click',function(){state.card=0;state.reveal=false;save();switchTab('cards');renderCard()});$('achievementBtn').addEventListener('click',function(){switchTab('achievements')});$('achievementBackBtn').addEventListener('click',function(){switchTab('quiz')});$('calendarPrev').addEventListener('click',function(){shiftCalendar(-1)});$('calendarNext').addEventListener('click',function(){shiftCalendar(1)});$('regenBtn').addEventListener('click',function(){if(confirm('今日の問題を再生成しますか？回答は消えます。'))generate(true)});$('latestBtn').addEventListener('click',latestUrl);$('reloadBtn').addEventListener('click',function(){location.reload()});$('restore7Btn').addEventListener('click',restoreStudyDays);$('restoreStartDate').min=addDays(today,-3650);$('restoreStartDate').max=today;$('restoreFromDateBtn').addEventListener('click',restoreConfirmedStudyDays);$('resetBtn').addEventListener('click',function(){if(confirm('学習履歴をすべて削除しますか？')){[KEY].concat(OLD_KEYS).forEach(function(k){localStorage.removeItem(k)});state={date:'',questions:[],answers:{},graded:false,score:0,stats:{},days:{},history:{},missions:{},writingByDate:{},dailyReviewByDate:{},card:0,reveal:false,theme:'auto',regenByDate:{}};load();generate(true)}});$('gradeBtn').addEventListener('click',grade);$('answerBtn').addEventListener('click',showAnswers);$('flash').addEventListener('click',function(e){if(e.target&&e.target.id==='cardSpeak')return;state.reveal=!state.reveal;save();renderCard()});$('cardSpeak').addEventListener('click',function(e){e.stopPropagation();speak($('cardSpeak').getAttribute('data-word')||$('cardWord').textContent)});$('prevBtn').addEventListener('click',function(){next(-1)});$('nextBtn').addEventListener('click',function(){next(1)});$('goodBtn').addEventListener('click',function(){mark(true)});$('hardBtn').addEventListener('click',function(){mark(false)});$('writingDraft').addEventListener('input',saveWriting);$('writingDoneBtn').addEventListener('click',completeWriting);$('search').addEventListener('input',renderWords);$('exportBtn').addEventListener('click',exportData);$('themeSelect').addEventListener('change',function(){state.theme=this.value;save();applyTheme();toast('テーマを変更しました')});document.querySelectorAll('.tab').forEach(function(t){t.addEventListener('click',function(){switchTab(t.dataset.tab)})});if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){if(state.theme==='auto')applyTheme()})}
function init(){if(!STREAK||!WORDS.length){toast('アプリデータを読み込めませんでした');return}load();applyTheme();bind();window.addEventListener('resize',syncCardHeight);setupPwa();generate(false)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

