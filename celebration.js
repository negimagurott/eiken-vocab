(function(root){
'use strict';

var activeLayer=null;
var cleanupTimer=null;
var COLORS=['#5b7cff','#7ce7ff','#d9ff73','#ffcf5c','#ff6fae','#ffffff'];

function dismissCelebration(){
  if(cleanupTimer){root.clearTimeout(cleanupTimer);cleanupTimer=null}
  if(activeLayer&&activeLayer.parentNode)activeLayer.parentNode.removeChild(activeLayer);
  activeLayer=null;
}

function addConfetti(layer){
  var reduceMotion=root.matchMedia&&root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion)return;
  var count=(root.innerWidth||0)<640?48:72;
  for(var i=0;i<count;i++){
    var piece=root.document.createElement('i');
    piece.className='celebration-confetti';
    piece.setAttribute('aria-hidden','true');
    piece.style.setProperty('--x',(Math.random()*100).toFixed(2)+'vw');
    piece.style.setProperty('--drift',(Math.random()*28-14).toFixed(2)+'vw');
    piece.style.setProperty('--delay',(Math.random()*.45).toFixed(2)+'s');
    piece.style.setProperty('--duration',(1.35+Math.random()*.55).toFixed(2)+'s');
    piece.style.setProperty('--rotation',Math.floor(Math.random()*720+360)+'deg');
    piece.style.backgroundColor=COLORS[i%COLORS.length];
    layer.appendChild(piece);
  }
}

function showCelebration(options){
  options=options||{};
  if(!root.document||!root.document.body)return null;
  dismissCelebration();

  var layer=root.document.createElement('div');
  layer.className='celebration-layer celebration-'+(options.type||'default');
  layer.setAttribute('role','status');
  layer.setAttribute('aria-live','polite');
  layer.setAttribute('aria-atomic','true');
  layer.setAttribute('aria-label',(options.title||'Perfect!')+' '+(options.message||'Excellent work!'));

  var message=root.document.createElement('div');
  message.className='celebration-message';
  var title=root.document.createElement('strong');
  title.textContent=options.title||'Perfect!';
  var detail=root.document.createElement('span');
  detail.textContent=options.message||'Excellent work!';
  message.appendChild(title);
  message.appendChild(detail);
  layer.appendChild(message);
  addConfetti(layer);

  root.document.body.appendChild(layer);
  activeLayer=layer;
  cleanupTimer=root.setTimeout(dismissCelebration,2100);
  return layer;
}

root.EIKEN_CELEBRATION={show:showCelebration,dismiss:dismissCelebration};
})(typeof window!=='undefined'?window:globalThis);
