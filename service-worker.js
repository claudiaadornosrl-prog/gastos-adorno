// Service Worker · network-first para HTML, cache-first para assets
const CACHE_VERSION = 'gastos-v1';
const CACHE_ASSETS = ['fonts/URWGothic-Book.ttf', './', './index.html', './manual.js', './manifest.webmanifest'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(CACHE_ASSETS)).catch(err => console.warn('[SW]', err)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.includes('supabase.co') || url.hostname.includes('jsdelivr.net') || url.hostname.includes('cdnjs.cloudflare.com')) return;
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(fetch(req).then(r => { if (r && r.ok) { const c = r.clone(); caches.open(CACHE_VERSION).then(x => x.put('./index.html', c)); } return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(cached => cached || fetch(req).then(r => {
    if (r && r.ok) { const c = r.clone(); caches.open(CACHE_VERSION).then(x => x.put(req, c)); } return r; }).catch(() => cached)));
});
