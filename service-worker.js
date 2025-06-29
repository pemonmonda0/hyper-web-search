const CACHE = 'hyper-cache-v1';
const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)));
});

self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).catch(
      ()=> caches.match('./offline.html')))
  );
});
