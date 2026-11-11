// sw.js — cho app mở ngay (lấy từ bộ nhớ đệm) và chạy được khi mất mạng.
// Trả bản đã lưu ngay lập tức, đồng thời hỏi máy chủ bản mới (bỏ qua bộ nhớ HTTP 10 phút của GitHub).
// Khi có bản mới (CACHE đổi tên), service worker mới cài lại toàn bộ file và báo trang tự tải lại một lần.
const CACHE = 'thcs-2026.11.11-7';   // đặt trùng ngày phiên bản trong js/app.js
const SHELL = ['./', 'index.html', 'styles.css', 'manifest.webmanifest', 'icon.svg',
  'js/app.js', 'js/gen.js', 'js/core.js', 'js/g6.js', 'js/g7.js', 'js/g8.js', 'js/g9.js',
  'js/math.js', 'js/svg.js', 'js/api.js', 'js/config.js'];

self.addEventListener('install', (e) => {
  // cache: 'reload' = tải thẳng từ máy chủ, không lấy bản cũ trong bộ nhớ HTTP
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // máy chủ Apps Script: không đụng tới
  e.respondWith(caches.open(CACHE).then(async (c) => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req, { cache: 'no-cache' }).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit || c.match('index.html'));
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
