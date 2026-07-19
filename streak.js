(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.EIKEN_STREAK=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  var DATE_RE=/^\d{4}-\d{2}-\d{2}$/;
  var JST='Asia/Tokyo';

  function isDateKey(value){
    if(!DATE_RE.test(String(value||'')))return false;
    var parts=String(value).split('-').map(Number),date=new Date(Date.UTC(parts[0],parts[1]-1,parts[2]));
    return date.getUTCFullYear()===parts[0]&&date.getUTCMonth()===parts[1]-1&&date.getUTCDate()===parts[2];
  }

  function dateKey(date,timeZone){
    var value=date instanceof Date?date:new Date(date==null?Date.now():date);
    if(Number.isNaN(value.getTime()))throw new TypeError('Invalid date');
    try{
      var parts=new Intl.DateTimeFormat('en-US',{timeZone:timeZone||JST,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(value),out={};
      parts.forEach(function(part){if(part.type!=='literal')out[part.type]=part.value});
      return out.year+'-'+out.month+'-'+out.day;
    }catch(e){
      var shifted=new Date(value.getTime()+9*60*60*1000);
      return shifted.toISOString().slice(0,10);
    }
  }

  function addDays(key,amount){
    if(!isDateKey(key))throw new TypeError('Invalid date key');
    var parts=key.split('-').map(Number),date=new Date(Date.UTC(parts[0],parts[1]-1,parts[2]+amount));
    return date.toISOString().slice(0,10);
  }

  function addDay(out,key){if(isDateKey(key))out[key]=true}

  function missionHasActivity(mission){
    if(!mission||typeof mission!=='object')return false;
    return !!(mission.quiz||mission.writing||mission.complete||mission.cardsDone||Object.keys(mission.cards||{}).length);
  }

  function deriveStudyDays(state,options){
    var source=state||{},out={},includeLegacyHistory=!!(options&&options.includeLegacyHistory);
    Object.keys(source.days||{}).forEach(function(key){if(source.days[key])addDay(out,key)});
    Object.keys(source.missions||{}).forEach(function(key){if(missionHasActivity(source.missions[key]))addDay(out,key)});
    Object.keys(source.writingByDate||{}).forEach(function(key){if(String(source.writingByDate[key]||'').trim())addDay(out,key)});
    Object.keys(source.stats||{}).forEach(function(word){
      var stats=source.stats[word]||{};
      addDay(out,stats.lastStudied);
      addDay(out,stats.lastCardDate);
    });
    if(includeLegacyHistory){
      Object.keys(source.history||{}).forEach(function(key){
        var items=source.history[key];
        if(Array.isArray(items)&&items.length)addDay(out,key);
      });
    }
    return out;
  }

  function calculate(days,today){
    if(!isDateKey(today))throw new TypeError('Invalid today key');
    var studied=deriveStudyDays({days:days}),keys=Object.keys(studied).filter(function(key){return key<=today}).sort(),longest=0,run=0,previous='';
    keys.forEach(function(key){
      run=previous&&addDays(previous,1)===key?run+1:1;
      if(run>longest)longest=run;
      previous=key;
    });
    var current=0,cursor=studied[today]?today:addDays(today,-1);
    while(studied[cursor]){current++;cursor=addDays(cursor,-1)}
    return{current:current,longest:longest,total:keys.length};
  }

  function fillRange(days,start,end){
    if(!isDateKey(start)||!isDateKey(end)||start>end)throw new TypeError('Invalid study range');
    var out=deriveStudyDays({days:days}),cursor=start,count=0;
    while(cursor<=end){
      out[cursor]=true;
      cursor=addDays(cursor,1);
      count++;
      if(count>3660)throw new RangeError('Study range is too large');
    }
    return out;
  }

  return{JST:JST,isDateKey:isDateKey,dateKey:dateKey,addDays:addDays,missionHasActivity:missionHasActivity,deriveStudyDays:deriveStudyDays,calculate:calculate,fillRange:fillRange};
});

