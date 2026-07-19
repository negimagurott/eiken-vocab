const fs=require('fs');

const index=fs.readFileSync('index.html','utf8');
const app=fs.readFileSync('app.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
const errors=[];
const version=(app.match(/var VERSION='([^']+)'/)||[])[1];
const appRelease=(app.match(/RELEASE='([^']+)'/)||[])[1];
const swRelease=(sw.match(/const RELEASE='([^']+)'/)||[])[1];
const titleVersion=(index.match(/<title>[^<]+ v([^<]+)<\/title>/)||[])[1];
const badgeVersion=(index.match(/<span class="version">v([^<]+)<\/span>/)||[])[1];
const settingsVersion=(index.match(/<b>Version<\/b><p class="small">v([^ ]+)/)||[])[1];

if(!version||version!==titleVersion||version!==badgeVersion||version!==settingsVersion)errors.push('version display mismatch');
if(manifest.version!==version)errors.push('manifest version mismatch');
if(manifest.start_url!=='./'||manifest.scope!=='./')errors.push('GitHub Pages manifest paths are not relative');
if(!appRelease||appRelease!==swRelease)errors.push('app and service worker release mismatch');
const assetUrls=[...index.matchAll(/(?:href|src)="[^"]+\?v=([^"]+)"/g)].map(match=>match[1]);
if(!assetUrls.length||assetUrls.some(release=>release!==appRelease))errors.push('asset cache-buster mismatch');
if(!index.includes('Content-Security-Policy')||!index.includes("default-src 'self'"))errors.push('content security policy is missing');
if(!index.includes('<meta name="referrer" content="no-referrer">'))errors.push('referrer policy is missing');
if(/https:\/\/(?:fonts\.googleapis|fonts\.gstatic)\.com/.test(index))errors.push('external font dependency remains');
if(!sw.includes("const CACHE_PREFIX='eiken-vocab-v2-'" )||!sw.includes('const CACHE_NAME=CACHE_PREFIX+RELEASE'))errors.push('service worker cache name is not release-scoped');
if(!sw.includes('k.startsWith(CACHE_PREFIX)&&k!==CACHE_NAME'))errors.push('service worker cache cleanup is not app-scoped');
if(!sw.includes("event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin"))errors.push('service worker does not restrict caching to same-origin GET requests');
if(!sw.includes('if(!res.ok)return res'))errors.push('service worker caches unsuccessful responses');

console.log(JSON.stringify({version,release:appRelease,versionDisplays:3,assetUrls:assetUrls.length,errors:errors.length},null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
