// Service Worker anmelden und den Verbindungsstatus anzeigen.
const status = document.getElementById('status');

function zeigeStatus() {
  const online = navigator.onLine;
  status.dataset.online = String(online);
  status.textContent = online ? 'Online' : 'Offline, Seite kommt aus dem Speicher';
}

addEventListener('online', zeigeStatus);
addEventListener('offline', zeigeStatus);
zeigeStatus();

if ('serviceWorker' in navigator) {
  // Erst nach dem Laden anmelden, damit der erste Aufruf nicht langsamer wird.
  addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((err) => console.warn('Service Worker nicht angemeldet:', err));
  });
}
