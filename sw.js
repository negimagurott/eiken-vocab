const CACHE_NAME='eiken-vocab-v2-20260706-20c';
const ASSETS=['./','./index.html?v=20260706-20c','./style.css?v=20260706-20c','./words.js?v=20260706-20c','./app.js?v=20260706-20c','./manifest.webmanifest?v=20260706-20c','./icon.svg?v=20260706-20c'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS).catch(()=>undefined)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request,{cache:'no-store'}).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>undefined);return res;}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html?v=20260706-20c'))));});
