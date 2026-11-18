# bausteine

Kleine Beispiele aus meiner Arbeit, jedes für sich lauffähig, ohne Framework und ohne Build-Schritt.
Alles hier ist neu geschrieben, kein Code aus Kundenprojekten.

| Baustein | Was er zeigt |
|---|---|
| [pwa-offline](pwa-offline/) | Eine Seite, die sich aufs Handy legen lässt und ohne Netz weiterläuft. Service Worker mit Vorab-Cache und Offline-Seite. |
| [formular](formular/) | Kontaktformular mit Prüfung im Browser, verständlichen Fehlermeldungen und einem versteckten Feld gegen Spam-Bots. Die Prüfung ist eine reine Funktion mit Tests. |

## Ausprobieren

```bash
npx serve .          # oder jeder andere statische Server, dann z. B. http://localhost:3000/pwa-offline/
npm test             # Tests (Node 20 oder neuer, keine Abhängigkeiten)
```

Ein Service Worker läuft nur über `https://` oder `localhost`, nicht über `file://`.

## Lizenz

MIT, siehe [LICENSE](LICENSE).
