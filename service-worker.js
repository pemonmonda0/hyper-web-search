/* ===== Hyper Web Search – Service Worker ===== */

const CACHE_VERSION = 'v4';          // ← 更新時は文字を変える
const CACHE_NAME    = 'hws-' + CACHE_VERSION;
const ASSETS = [
  '/', 'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(k=>k!==CACHE_NAME)
                      .map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(r=>r || fetch(e.request))
  );
});
