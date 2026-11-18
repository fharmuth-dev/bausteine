// Verbindet das Formular mit der Prüfung: Fehler am Feld anzeigen, Fokus auf das erste fehlerhafte Feld.
import { pruefe } from './pruefe.mjs';

const form = document.getElementById('anfrage');
const meldung = document.getElementById('meldung');

function zeigeFehler(name, text) {
  const feld = form.elements[name];
  const hinweis = document.getElementById(`fehler-${name}`);
  if (!feld || !hinweis) return;
  feld.setAttribute('aria-invalid', text ? 'true' : 'false');
  hinweis.textContent = text || '';
}

form.noValidate = true; // eigene, verständliche Meldungen statt der Browser-Blasen

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const daten = Object.fromEntries(new FormData(form));
  daten.einwilligung = form.elements.einwilligung.checked;

  const { ok, fehler, spam } = pruefe(daten);
  for (const name of ['name', 'kontakt', 'nachricht', 'einwilligung']) zeigeFehler(name, fehler[name]);

  if (spam) {
    // Bots bekommen dieselbe Antwort wie Menschen, damit sie nichts lernen.
    meldung.textContent = 'Danke! Ihre Anfrage ist angekommen.';
    form.reset();
    return;
  }
  if (!ok) {
    meldung.textContent = 'Bitte prüfen Sie die markierten Felder.';
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  // Hier würde die Anfrage an den Server gehen (fetch). Im Beispiel bleibt sie im Browser.
  meldung.textContent = `Danke, ${daten.name.split(' ')[0]}! Im Beispiel wurde nichts verschickt.`;
  form.reset();
});

// Fehler verschwinden, sobald das Feld korrigiert wird.
form.addEventListener('input', (event) => {
  const name = event.target.name;
  if (event.target.getAttribute('aria-invalid') === 'true') {
    const daten = Object.fromEntries(new FormData(form));
    daten.einwilligung = form.elements.einwilligung.checked;
    zeigeFehler(name, pruefe(daten).fehler[name]);
  }
});
