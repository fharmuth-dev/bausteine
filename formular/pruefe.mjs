// Prüft die Angaben eines Kontaktformulars. Reine Funktion: kein DOM, kein Netz, deshalb leicht zu testen.
// Gibt { ok, felder, fehler, spam } zurück: felder sind die bereinigten Werte, fehler je Feld eine Meldung.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFON = /^\+?[\d ()/-]{6,20}$/;
const MAX = { name: 100, kontakt: 120, nachricht: 2000 };

// Steuerzeichen entfernen, Leerraum glätten. Zeilenumbrüche nur in der Nachricht behalten.
const saeubere = (wert, mehrzeilig = false) => {
  const text = String(wert ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  return mehrzeilig
    ? text.replace(/\r\n?/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
    : text.replace(/\s+/g, ' ').trim();
};

export function pruefe(eingabe = {}) {
  const felder = {
    name: saeubere(eingabe.name),
    kontakt: saeubere(eingabe.kontakt),
    nachricht: saeubere(eingabe.nachricht, true),
  };
  const fehler = {};

  if (!felder.name) fehler.name = 'Bitte geben Sie Ihren Namen an.';
  else if (felder.name.length > MAX.name) fehler.name = `Bitte höchstens ${MAX.name} Zeichen.`;

  if (!felder.kontakt) fehler.kontakt = 'Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.';
  else if (felder.kontakt.length > MAX.kontakt) fehler.kontakt = `Bitte höchstens ${MAX.kontakt} Zeichen.`;
  else if (!EMAIL.test(felder.kontakt) && !TELEFON.test(felder.kontakt)) {
    fehler.kontakt = 'Das sieht weder nach einer E-Mail-Adresse noch nach einer Telefonnummer aus.';
  }

  if (felder.nachricht.length > MAX.nachricht) fehler.nachricht = `Bitte höchstens ${MAX.nachricht} Zeichen.`;

  if (!eingabe.einwilligung) fehler.einwilligung = 'Bitte bestätigen Sie die Einwilligung.';

  // Spam: Das versteckte Feld füllen nur Bots aus. Viele Links in einer Nachricht sind ebenfalls ein starkes Zeichen.
  const spam = Boolean(saeubere(eingabe.website)) || (felder.nachricht.match(/https?:\/\//g) || []).length > 2;

  return { ok: Object.keys(fehler).length === 0 && !spam, felder, fehler, spam };
}
