# pwa-offline

Eine Seite, die sich aufs Handy legen lässt und ohne Netz weiterläuft. Ohne Bibliothek, ohne Build.

**So funktioniert es:**

- `manifest.webmanifest` sagt dem Handy, wie die App heißt und wie sie aussieht. Damit erscheint „Zum Startbildschirm hinzufügen“.
- `sw.js` (Service Worker) legt beim ersten Besuch alle Dateien in den Speicher des Browsers.
- Seiten holt er zuerst übers Netz, damit Änderungen sofort ankommen. Ohne Netz kommen sie aus dem Speicher. War eine Seite noch nie geladen, zeigt er `offline.html`.
- Dateien wie CSS und Bilder kommen direkt aus dem Speicher, das spart Zeit bei jedem Aufruf.
- Ändern sich Dateien, `VERSION` in `sw.js` hochzählen. Dann ersetzt der Browser den alten Speicher beim nächsten Besuch.

**Ausprobieren:** über einen lokalen Server öffnen, einmal laden, in den Entwicklerwerkzeugen „Offline“ anhaken und neu laden.
