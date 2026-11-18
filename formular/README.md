# formular

Ein Kontaktformular mit Prüfung im Browser, ohne Bibliothek.

**Was es kann:**

- Name, E-Mail **oder** Telefon, Nachricht, Einwilligung. Fehler stehen direkt am Feld, in ganzen Sätzen.
- Der Fokus springt auf das erste fehlerhafte Feld, Bildschirmleser lesen die Meldung vor (`aria-invalid`, `aria-live`).
- Ein verstecktes Feld fängt Spam-Bots ab, ohne Rätsel für Menschen. Bots bekommen dieselbe Antwort wie alle, damit sie nichts lernen.
- Die Prüfung steckt in `pruefe.mjs`, einer reinen Funktion ohne DOM. Im Browser und auf dem Server läuft dieselbe Prüfung, die Tests laufen in Node.

**Wichtig:** Eine Prüfung im Browser ersetzt nie die Prüfung auf dem Server. `pruefe.mjs` ist so gebaut, dass der Server sie unverändert nutzen kann.

```bash
npm test
```
