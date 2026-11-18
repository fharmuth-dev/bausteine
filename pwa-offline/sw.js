// Service Worker: legt die Seiten beim ersten Besuch in den Speicher und liefert sie ohne Netz aus.
// Bei jeder Änderung an den Dateien VERSION hochzählen, dann wird der alte Speicher ersetzt.
const VERSION = 'v1';
const CACHE = `bausteine-pwa-${VERSION}`;
const VORAB = ['./', 'index.html', 'seite-2.html', 'offline.html', 'style.css', 'app.js', 'icon.svg', 'manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(VORAB)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  // Alte Versionen löschen, damit der Speicher nicht wächst.
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('bausteine-pwa-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    // Seiten: erst Netz (damit Änderungen sofort ankommen), ohne Netz aus dem Speicher, sonst die Offline-Seite.
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return res;
        })
        .catch(async () => (await caches.match(request, { ignoreSearch: true })) || caches.match('offline.html')),
    );
    return;
  }

  // Dateien (CSS, JS, Bilder): aus dem Speicher, wenn vorhanden, sonst übers Netz.
  event.respondWith(caches.match(request).then((hit) => hit || fetch(request)));
});
