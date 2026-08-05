const assert=require('assert');
const fs=require('fs');
const vm=require('vm');

function element(tag){
  return {
    tagName:tag.toUpperCase(),
    children:[],
    attributes:{},
    style:{values:{},setProperty(name,value){this.values[name]=value}},
    appendChild(child){child.parentNode=this;this.children.push(child);return child},
    removeChild(child){this.children=this.children.filter(item=>item!==child);child.parentNode=null},
    setAttribute(name,value){this.attributes[name]=value}
  };
}

const body=element('body');
let timerDelay=0;
let timerCallback=null;
const window={
  document:{body,createElement:element},
  innerWidth:390,
  matchMedia:()=>({matches:false}),
  setTimeout(callback,delay){timerCallback=callback;timerDelay=delay;return 1},
  clearTimeout(){timerCallback=null}
};
const context={window,globalThis:window,Math};
vm.runInNewContext(fs.readFileSync('celebration.js','utf8'),context);

const layer=window.EIKEN_CELEBRATION.show({type:'perfect',title:'🎉 Perfect!',message:'Excellent work!'});
assert.strictEqual(body.children.length,1,'celebration should be mounted');
assert.strictEqual(layer.attributes.role,'status');
assert.strictEqual(layer.attributes['aria-label'],'🎉 Perfect! Excellent work!');
assert.strictEqual(layer.children[0].children[0].textContent,'🎉 Perfect!');
assert.strictEqual(layer.children[0].children[1].textContent,'Excellent work!');
assert.strictEqual(layer.children.length,49,'mobile should render 48 confetti pieces plus the message');
assert.strictEqual(timerDelay,2100,'celebration should clean up after about two seconds');
timerCallback();
assert.strictEqual(body.children.length,0,'celebration should automatically disappear');

window.matchMedia=()=>({matches:true});
const reducedLayer=window.EIKEN_CELEBRATION.show({type:'perfect'});
assert.strictEqual(reducedLayer.children.length,1,'reduced-motion mode should omit confetti');
window.EIKEN_CELEBRATION.dismiss();

const app=fs.readFileSync('app.js','utf8');
assert(app.includes("if(score===words.length&&CELEBRATION)CELEBRATION.show({type:'perfect',title:'🎉 Perfect!',message:'Excellent work!'})"),'grade should celebrate only a perfect score');
assert(!app.includes('score>=words.length'),'non-perfect scores must not celebrate');

console.log('celebration tests passed');
