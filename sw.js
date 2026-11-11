// sw.js — cho app mở ngay (lấy từ bộ nhớ đệm) và chạy được khi mất mạng.
// Cách làm "stale-while-revalidate": trả bản đã lưu ngay lập tức, đồng thời tải bản mới về để lần mở sau dùng.
// Khi đổi nhiều file cùng lúc, tăng số phiên bản CACHE để xoá bộ đệm cũ.
const CACHE = 'thcs-v2';
const SHELL = ['./', 'index.html', 'styles.css', 'manifest.webmanifest', 'icon.svg',
  'js/app.js', 'js/gen.js', 'js/math.js', 'js/svg.js', 'js/api.js', 'js/config.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // máy chủ Apps Script: không đụng tới
  e.respondWith(caches.open(CACHE).then(async (c) => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then((r) => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit || c.match('index.html'));
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
