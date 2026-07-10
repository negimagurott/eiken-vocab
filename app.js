(function(){
'use strict';
var VERSION='2.1.4',RELEASE='20260710-vocab300',KEY='eiken1_vocab_app_v20',OLD_KEYS=['eiken1_vocab_app_v13','eiken1_vocab_app_v12','eiken1_vocab_app_v11','eiken1_vocab_app_v5'];
var WORDS=(window.EIKEN_WORDS||[]),WRITING_TOPICS=(window.EIKEN_WRITING_TOPICS||[]),today=localDate(),deferredInstallPrompt=null,state={date:'',questions:[],answers:{},graded:false,score:0,stats:{},days:{},history:{},missions:{},writingByDate:{},card:0,reveal:false,theme:'auto',regenByDate:{}};
function $(id){return document.getElementById(id)}
function localDate(){var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){toast('保存できませんでした')}}
function load(){try{var raw=localStorage.getItem(KEY);if(!raw){for(var i=0;i<OLD_KEYS.length;i++){raw=localStorage.getItem(OLD_KEYS[i]);if(raw)break}}if(raw)state=Object.assign(state,JSON.parse(raw))}catch(e){}if(!state.stats)state.stats={};if(!state.days)state.days={};if(!state.history)state.history={};if(!state.missions)state.missions={};if(!state.answers)state.answers={};if(!state.regenByDate)state.regenByDate={};if(!state.writingByDate)state.writingByDate={};if(!state.theme)state.theme='auto';WORDS.forEach(function(x){if(!state.stats[x.w])state.stats[x.w]={seen:0,correct:0,wrong:0,known:false,due:'2000-01-01',level:0};if(!state.stats[x.w].due)state.stats[x.w].due='2000-01-01'});ensureMission();save()}
function ensureMission(){if(!state.missions)state.missions={};if(!state.missions[today])state.missions[today]={quiz:false,cards:{},cardsDone:false,writing:false,complete:false};var m=state.missions[today];if(!m.cards)m.cards={};if(typeof m.writing==='undefined')m.writing=!!m.complete}
function applyTheme(){var mode=state.theme||'auto',dark=mode==='dark'||(mode==='auto'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',dark?'dark':'light');var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',dark?'#0d111a':'#172033');if($('themeSelect'))$('themeSelect').value=mode}
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24)}return h>>>0}
function rng(seed){var x=seed||123456789;return function(){x^=x<<13;x^=x>>>17;x^=x<<5;return((x>>>0)/4294967296)}}
function shuffle(a,seed){var r=rng(seed),b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=b[i];b[i]=b[j];b[j]=t}return b}
function addDays(d,n){var x=new Date(d+'T00:00:00');x.setDate(x.getDate()+n);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)}
function speak(word){try{if(!('speechSynthesis'in window)){toast('このブラウザでは音声再生に非対応です');return}speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(word);u.lang='en-US';u.rate=.82;speechSynthesis.speak(u)}catch(e){toast('音声を再生できませんでした')}}
function schedule(word,ok){var s=state.stats[word];if(!s)return;s.seen++;if(ok){s.correct++;s.level=Math.min(5,(s.level||0)+1);var gaps=[1,2,4,7,14,30];s.due=addDays(today,gaps[s.level]||30);if(s.level>=4)s.known=true}else{s.wrong++;s.level=0;s.known=false;s.due=addDays(today,1)}}
function streak(){var n=0,d=today;while(state.days&&state.days[d]){n++;d=addDays(d,-1)}return n}
function examDays(){var target=new Date('2026-10-04T00:00:00'),now=new Date(today+'T00:00:00');return Math.max(0,Math.ceil((target-now)/86400000))}
function currentWords(){return(state.questions||[]).map(function(w){return WORDS.find(function(x){return x.w===w})}).filter(Boolean)}
function mission(){ensureMission();return state.missions[today]}
function cardsSeenCount(){return Object.keys(mission().cards||{}).length}
function updateMission(){var m=mission();m.cardsDone=cardsSeenCount()>=10;if(m.quiz&&m.cardsDone&&m.writing&&!m.complete){m.complete=true;state.days[today]=true;toast('Daily Mission Complete! Streak達成です')}save()}
function recentMap(days,includeToday){var out={},dates=Object.keys(state.history||{}).sort().slice(-days);dates.forEach(function(d){if(!includeToday&&d===today)return;(state.history[d]||[]).forEach(function(w){out[w]=true})});return out}
function priority(x,recent,current){
  var st=state.stats[x.w]||{};
  var p=0;

  // 1. 間違えた単語は最優先
  if(st.wrong)p+=st.wrong*20;

  // 2. 復習期限が来ている単語を優先
  if(!st.known&&(st.due||'2000-01-01')<=today)p+=40;

  // 3. 未学習語も一定量出す
  if(!st.seen)p+=25;

  // 4. 覚えた単語は出題頻度を下げる
  if(st.known)p-=50;

  // 5. レベルが高い単語は少し下げる
  if(st.level)p-=st.level*6;

  // 6. 直近7日に出た単語は下げる
  if(recent[x.w])p-=35;

  // 7. 再生成時は現在の10問を強く避ける
  if(current&&current[x.w])p-=100;

  return p;
}
function pickQuestions(force){var recent=recentMap(7,false),current={};(state.questions||[]).forEach(function(w){current[w]=true});var seed=hash(today+'-'+(state.regenByDate[today]||0)+'-'+RELEASE);var ranked=shuffle(WORDS,seed).sort(function(a,b){return priority(b,recent,force?current:null)-priority(a,recent,force?current:null)});var first=ranked.filter(function(x){return!recent[x.w]&&(!force||!current[x.w])});var second=ranked.filter(function(x){return first.indexOf(x)<0&&(!force||!current[x.w])});var third=ranked.filter(function(x){return first.indexOf(x)<0&&second.indexOf(x)<0});return first.concat(second,third).slice(0,10).map(function(x){return x.w})}
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
function generate(force){load();today=localDate();ensureMission();applyTheme();if(!force&&state.date===today&&state.questions&&state.questions.length===10){render();return}if(force)state.regenByDate[today]=(state.regenByDate[today]||0)+1;state.date=today;state.answers={};state.graded=false;state.score=0;state.card=0;state.reveal=false;var m=mission();m.quiz=false;m.cards={};m.cardsDone=false;m.complete=false;state.questions=pickQuestions(force);state.history[today]=state.questions;save();render();toast(force?'重複を抑えて10問を再生成しました':'今日の10問を作成しました')}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function render(){renderStats();renderQuiz();renderCard();renderWriting();renderWords();exportData()}
function renderStats(){var words=currentWords(),m=mission(),ms=(m.quiz?1:0)+(m.cardsDone?1:0)+(m.writing?1:0);$('score').textContent=(state.score||0)+'/'+(words.length||10);$('missionScore').textContent=ms+'/3';$('days').textContent=Object.keys(state.days||{}).length;$('streak').textContent=streak();$('exam').textContent=examDays();$('known').textContent=Object.keys(state.stats).filter(function(w){return state.stats[w].known}).length;$('bar').style.width=(ms/3*100)+'%';$('missionQuiz').classList.toggle('done',!!m.quiz);$('missionCards').classList.toggle('done',!!m.cardsDone);$('missionWriting').classList.toggle('done',!!m.writing);$('cardsSeen').textContent=cardsSeenCount();$('status').textContent=m.complete?'Daily Mission Complete. 英検1級まであと '+examDays()+' 日。':'今日のMission: Quiz＋Flashcards＋Writing。英検1級まであと '+examDays()+' 日。'}
function renderQuiz(){var box=$('quizBox'),words=currentWords();if(!words.length){box.innerHTML='<p>「今日の10問」を押してください。</p>';return}box.innerHTML=words.map(function(x,i){var opts=createChoices(x);return '<div class="q" data-word="'+esc(x.w)+'"><div class="meta">Question '+(i+1)+'</div><div class="sentence">'+esc(x.s)+'</div>'+opts.map(function(o){var cls='choice';if(state.answers[x.w]===o)cls+=' selected';if(state.graded&&o===x.w)cls+=' correct';if(state.graded&&state.answers[x.w]===o&&o!==x.w)cls+=' wrong';return '<button class="'+cls+'" data-choice="'+esc(o)+'">'+esc(o)+'</button>'}).join('')+'<div class="explain '+(state.graded?'show':'')+'"><b>'+esc(x.w)+'</b> <button class="speak" data-speak="'+esc(x.w)+'" type="button">🔊</button><br>'+esc(x.m)+'<br>'+esc(x.j)+'<br><b>用法：</b>'+esc(x.u)+'</div></div>'}).join('');box.querySelectorAll('.choice').forEach(function(b){b.addEventListener('click',function(){if(state.graded)return;var q=b.closest('.q');state.answers[q.getAttribute('data-word')]=b.getAttribute('data-choice');save();renderQuiz()})});box.querySelectorAll('[data-speak]').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();speak(b.getAttribute('data-speak'))})})}
function grade(){var words=currentWords();if(!words.length)return;var score=0;words.forEach(function(x){var ok=state.answers[x.w]===x.w;if(ok)score++;schedule(x.w,ok)});state.score=score;state.graded=true;mission().quiz=true;updateMission();render();toast(score+' / '+words.length+' 点です')}
function showAnswers(){state.graded=true;save();renderQuiz()}
function reviewLabel(result){if(result==='good')return '前回: 覚えた';if(result==='hard')return '前回: まだ';return ''}
function renderCard(){var words=currentWords();if(!words.length){$('cardWord').textContent='---';$('counter').textContent='';return}if(state.card>=words.length)state.card=0;if(state.card<0)state.card=words.length-1;var x=words[state.card],st=state.stats[x.w]||{},result=st.lastCardResult||'';mission().cards[x.w]=true;updateMission();$('flash').classList.toggle('flipped',!!state.reveal);$('flash').classList.remove('remembered-good','remembered-hard');if(result==='good')$('flash').classList.add('remembered-good');if(result==='hard')$('flash').classList.add('remembered-hard');$('cardWord').textContent=x.w;$('backWord').textContent=x.w;$('cardPron').textContent=x.p||'';$('cardMean').textContent=x.m+' / '+x.j;$('cardSentence').textContent=x.s.replace('____',x.w);$('cardUsage').textContent=x.u;$('cardSpeak').setAttribute('data-word',x.w);$('counter').innerHTML=(state.card+1)+' / '+words.length+(result?' <span class="review-badge '+(result==='good'?'review-good':'review-hard')+'">'+reviewLabel(result)+'</span>':'')}
function next(n){var words=currentWords();if(!words.length)return;state.card=(state.card+n+words.length)%words.length;state.reveal=false;save();renderCard();renderStats()}
function mark(ok){
  var words=currentWords();
  if(!words.length)return;

  var word=words[state.card].w;
  var btn=ok ? $('goodBtn') : $('hardBtn');
  var flash=$('flash');
  var st=state.stats[word];

  schedule(word,ok);
  st=state.stats[word];
  if(st){st.lastCardResult=ok?'good':'hard';st.lastCardDate=today;}
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
function writingTopic(){if(!WRITING_TOPICS.length)return 'Writing topic is unavailable.';return WRITING_TOPICS[hash(today)%WRITING_TOPICS.length]}
function wordCount(text){var trimmed=(text||'').trim();return trimmed?trimmed.split(/\s+/).length:0}
function renderWriting(){var draft=state.writingByDate[today]||'';$('writingTopic').textContent=writingTopic();if(document.activeElement!==$('writingDraft'))$('writingDraft').value=draft;$('writingCount').textContent=wordCount(draft)+' words';$('writingDoneBtn').textContent=mission().writing?'✓ 完了済み':'今日のWritingを完了';$('writingDoneBtn').classList.toggle('writing-complete',!!mission().writing)}
function saveWriting(){state.writingByDate[today]=$('writingDraft').value;$('writingCount').textContent=wordCount(state.writingByDate[today])+' words';save()}
function completeWriting(){saveWriting();if(wordCount(state.writingByDate[today])<1){toast('回答を入力してから完了してください');return}mission().writing=true;updateMission();renderStats();renderWriting();toast('今日のWritingを保存しました')}
function renderWords(){var q=($('search').value||'').toLowerCase();var arr=WORDS.filter(function(x){return!q||x.w.toLowerCase().includes(q)||x.m.includes(q)||x.j.includes(q)||x.s.toLowerCase().includes(q)});$('wordBox').innerHTML=arr.map(f��y����k�w��v0710-vocab300">
<link rel="stylesheet" href="writing.css?v=20260710-vocab300">
</head>
<body>
<div class="wrap">
<header><div><h1>英検1級 Companion</h1><p class="sub">v2.1 beta: Flashcards UX改善、出題優先度改善、PWA対応。</p>
<span class="version">v2.1.4</span><span id="updateBadge" class="version hidden">更新あり</span></div><div class="actions"><button id="todayBtn" class="primary">今日の10問</button><button id="regenBtn">再生成</button><button id="latestBtn">最新版URL</button><button id="installBtn" class="hidden">ホームに追加</button><button id="resetBtn" class="danger">履歴リセット</button></div></header>
<section class="panel"><div class="stats"><div class="stat"><span>Today's score</span><b id="score">0/10</b></div><div class="stat"><span>Mission</span><b id="missionScore">0/3</b></div><div class="stat"><span>Study days</span><b id="days">0</b></div><div class="stat"><span>Streak</span><b id="streak">0</b></div><div class="stat"><span>Exam countdown</span><b id="exam">--</b></div><div class="stat"><span>Known words</span><b id="known">0</b></div></div><div class="mission"><div id="missionQuiz" class="missionitem"><b>📝 Quiz</b><p class="small">10問を採点まで完了</p></div><div id="missionCards" class="missionitem"><b>🃏 Flashcards</b><p class="small"><span id="cardsSeen">0</span>/10枚を確認</p></div><div id="missionWriting" class="missionitem"><b>✍️ Writing</b><p class="small">今日の1題に回答</p></div></div><div class="progress"><div id="bar" class="bar"></div></div><p id="status" class="small">読み込み中です。</p></section>
<nav class="tabs"><button class="tab active" data-tab="quiz">Quiz</button><button class="tab" data-tab="cards">Flashcards</button><button class="tab" data-tab="writing">Writing</button><button class="tab" data-tab="words">Word List</button><button class="tab" data-tab="settings">Settings</button></nav>
<section id="quiz" class="panel tabPanel"><div id="quizBox"></div><div class="actions" style="margin-top:16px"><button id="gradeBtn" class="primary">採点する</button><button id="answerBtn">解説を表示</button></div></section>
<section id="cards" class="panel tabPanel hidden"><div class="cardstage"><div id="flash" class="flash"><div class="face front"><div><p class="small">FLASHCARD</p><h2 id="cardWord">---</h2><p><span id="cardPron" class="small"></span><button id="cardSpeak" class="speak" type="button">🔊</button></p><p class="small">タップでカードをめくる</p></div></div><div class="face back"><div><p class="small">MEANING / EXAMPLE / USAGE</p><h2 id="backWord">---</h2><p class="meaning" id="cardMean"></p><p class="usage"><b>例文：</b><span id="cardSentence"></span></p><p class="usage"><b>用法：</b><span id="cardUsage"></span></p><p class="small">タップで単語面へ戻る</p></div></div></div></div><div class="actions center"><button id="prevBtn">前へ</button><button id="hardBtn">まだ</button><button id="goodBtn" class="primary">覚えた</button><button id="nextBtn">次へ</button></div><p id="counter" class="small centerText"></p></section>
<section id="writing" class="panel tabPanel hidden"><p class="meta">TODAY'S WRITING TOPIC</p><h2 id="writingTopic" class="writing-topic"></h2><p class="small">Write 200–240 words. Give three reasons to support your answer.</p><textarea id="writingDraft" class="writing-draft" rows="12" placeholder="Write your essay here..."></textarea><div class="writing-footer"><span id="writingCount" class="small">0 words</span><button id="writingDoneBtn" class="primary">今日のWritingを完了</button></div><p id="writingSaved" class="small">入力内容はこの端末に自動保存されます。</p></section>
<section id="words" class="panel tabPanel hidden"><input id="search" type="search" placeholder="単語・意味・例文で検索"><div id="wordBox" class="wordgrid"></div></section>
<section id="settings" class="panel tabPanel hidden"><h2>Settings</h2><div class="settingrow"><div><b>Theme</b><p class="small">Light / Dark / Autoを切り替えます。</p></div><select id="themeSelect"><option value="auto">Auto</option><option value="light">Light</option><option value="dark">Dark</option></select></div><div class="settingrow"><div><b>Version</b><p class="small">v2.1.4 / 英検1級重要語彙300語。</p></div></div><div class="settingrow"><div><b>PWA更新</b><p class="small">ホーム画面から開いた場合も起動時に最新版を確認します。</p></div><button id="reloadBtn">更新を確認</button></div><div class="settingrow"><div><b>学習データ</b><p class="small">端末のlocalStorageに保存。v1.2/v1.3データを自動移行します。</p></div><button id="exportBtn">書き出し</button></div><textarea id="dataBox" rows="8"></textarea></section>
</div><div id="toast" class="toast"></div>
<script src="words.js?v=20260710-vocab300"></script>
<script src="words-extra.js?v=20260710-vocab300"></script>
<script src="writing.js?v=20260710-vocab300"></script>
<script src="app.js?v=20260710-vocab300"></script>
</body>
</html>
