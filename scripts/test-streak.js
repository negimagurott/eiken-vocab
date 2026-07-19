'use strict';
const assert=require('node:assert/strict');
const streak=require('../streak.js');

assert.equal(streak.dateKey(new Date('2026-07-18T14:59:59Z')),'2026-07-18');
assert.equal(streak.dateKey(new Date('2026-07-18T15:00:00Z')),'2026-07-19');
assert.equal(streak.addDays('2024-02-28',1),'2024-02-29');
assert.equal(streak.addDays('2026-01-01',-1),'2025-12-31');

const migrated=streak.deriveStudyDays({
  days:{'2026-07-12':true,'invalid':true},
  missions:{
    '2026-07-13':{quiz:true,cards:{}},
    '2026-07-14':{quiz:false,writing:false,cards:{}},
    '2026-07-15':{cards:{abate:true}}
  },
  writingByDate:{'2026-07-16':'draft','2026-07-17':'   '},
  stats:{abate:{lastStudied:'2026-07-17',lastCardDate:'2026-07-15'}},
  history:{'2026-07-18':['abate']}
},{includeLegacyHistory:true});
assert.deepEqual(Object.keys(migrated).sort(),['2026-07-12','2026-07-13','2026-07-15','2026-07-16','2026-07-17','2026-07-18']);

assert.deepEqual(streak.calculate({
  '2026-07-10':true,
  '2026-07-11':true,
  '2026-07-13':true,
  '2026-07-14':true,
  '2026-07-15':true,
  '2026-07-16':true,
  '2026-07-17':true,
  '2026-07-18':true,
  '2026-07-20':true
},'2026-07-19'),{current:6,longest:6,total:8});

assert.deepEqual(streak.calculate({'2026-07-19':true},'2026-07-19'),{current:1,longest:1,total:1});
assert.deepEqual(streak.calculate({'2026-07-17':true},'2026-07-19'),{current:0,longest:1,total:1});

const recoveredSeven=streak.deriveStudyDays({
  days:{'2026-07-19':true},
  history:{
    '2026-07-13':['word-1'],'2026-07-14':['word-2'],'2026-07-15':['word-3'],
    '2026-07-16':['word-4'],'2026-07-17':['word-5'],'2026-07-18':['word-6'],'2026-07-19':['word-7']
  }
},{includeLegacyHistory:true});
assert.deepEqual(streak.calculate(recoveredSeven,'2026-07-19'),{current:7,longest:7,total:7});

const manuallyRecovered=streak.fillRange({'2026-07-18':true,'2026-07-19':true},'2026-07-16','2026-07-19');
assert.deepEqual(streak.calculate(manuallyRecovered,'2026-07-19'),{current:4,longest:4,total:4});
assert.throws(()=>streak.fillRange({},'2026-07-20','2026-07-19'),/Invalid study range/);
console.log('Streak tests passed');

