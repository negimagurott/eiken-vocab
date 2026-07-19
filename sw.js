const RELEASE='20260719-dom-xss-hardening';
const CACHE_PREFIX='eiken-vocab-v2-';
const CACHE_NAME=CACHE_PREFIX+RELEASE;
const ASSETS=['./','./index.html?v='+RELEASE,'./style.css?v='+RELEASE,'./writing.css?v='+RELEASE,'./modern.css?v='+RELEASE,'./words.js?v='+RELEASE,'./words-extra.js?v='+RELEASE,'./word-details.js?v='+RELEASE,'./quiz-quality.js?v='+RELEASE,'./quiz-data.js?v='+RELEASE,'./quiz-translations.js?v='+RELEASE,'./writing.js?v='+RELEASE,'./streak.js?v='+RELEASE,'./app.js?v='+RELEASE,'./manifest.webmanifest?v='+RELEASE,'./icon.svg?v='+RELEASE,'./apple-touch-icon.png?v='+RELEASE,'./icon-192.png?v='+RELEASE,'./icon-512.png?v='+RELEASE];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(res=>{
    if(!res.ok)return res;
    const copy=res.clone();
    return caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>undefined).then(()=>res);
  }).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match('./index.html?v='+RELEASE):Response.error()))));
});

