const assert=require('assert');
const fs=require('fs');
const vm=require('vm');

const app=fs.readFileSync('app.js','utf8');
const source=(app.match(/function addWrongChoicesToDailyReview\(words\)\{[^\n]+\}/)||[])[0];
assert(source,'wrong-choice review helper should exist');

const context={
  state:{
    answers:{target1:'wrong1',target2:'wrong1',target3:'target3',target4:'unknown'},
    dailyReviewByDate:{'2026-08-25':['alpha','beta']}
  },
  today:'2026-08-25',
  WORDS:[{w:'alpha'},{w:'beta'},{w:'wrong1'},{w:'target1'},{w:'target2'},{w:'target3'},{w:'target4'}],
  ensureDailyReview(){}
};
vm.runInNewContext(source,context);

const questions=[{w:'target1'},{w:'target2'},{w:'target3'},{w:'target4'}];
assert.strictEqual(context.addWrongChoicesToDailyReview(questions),1,'only one unique valid wrong choice should be added');
assert.deepStrictEqual(Array.from(context.state.dailyReviewByDate[context.today]),['alpha','beta','wrong1']);
assert.strictEqual(context.addWrongChoicesToDailyReview(questions),0,'regrading logic must not duplicate a card');
assert(app.includes("var added=addWrongChoicesToDailyReview(words)"),'grading should add selected mistakes to cards');
assert(app.includes("cardTarget=reviewWords().length||REVIEW_LIMIT"),'mission completion should include added cards');
assert(app.includes("$('cardsTotal').textContent=reviewTotal"),'the displayed card total should include added cards');

console.log('quiz mistake card tests passed');
