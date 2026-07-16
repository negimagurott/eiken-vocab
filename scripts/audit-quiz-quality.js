const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
['words.js','words-extra.js','word-details.js','quiz-quality.js','quiz-data.js'].forEach(file=>vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file}));
const items=context.window.EIKEN_QUIZ_ITEMS||[];
const library=context.window.EIKEN_EXAMPLE_LIBRARY||[];
const min=context.window.EIKEN_QUIZ_QUALITY.MIN_SCORE;
const rejected=items.filter(item=>!item.quality||item.quality.total<min);
const average=Math.round(items.reduce((sum,item)=>sum+(item.quality?item.quality.total:0),0)/Math.max(1,items.length));
const averageDifficulty=Math.round(items.reduce((sum,item)=>sum+(item.difficulty||0),0)/Math.max(1,items.length));
const result={questions:items.length,library:library.length,minimumScore:min,averageScore:average,averageDifficulty,rejected:rejected.length};
console.log(JSON.stringify(result,null,2));
if(library.length!==items.length||rejected.length){
  if(rejected.length)console.error(rejected.map(item=>`${item.word}: ${item.quality?item.quality.total:'unscored'}`).join('\n'));
  process.exit(1);
}
