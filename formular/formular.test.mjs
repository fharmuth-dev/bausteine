import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pruefe } from './pruefe.mjs';

const gut = { name: 'Erika Muster', kontakt: 'erika@example.org', nachricht: 'Hallo!', einwilligung: true };

test('gültige Angaben gehen durch', () => {
  const r = pruefe(gut);
  assert.equal(r.ok, true);
  assert.deepEqual(r.fehler, {});
});

test('Telefonnummer statt E-Mail ist erlaubt', () => {
  for (const kontakt of ['0731 123456', '+49 151 2345678', '(0731) 12-34-56']) {
    assert.equal(pruefe({ ...gut, kontakt }).ok, true, kontakt);
  }
});

test('Pflichtfelder fehlen', () => {
  const r = pruefe({});
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.fehler).sort(), ['einwilligung', 'kontakt', 'name']);
});

test('Kontakt muss E-Mail oder Telefon sein', () => {
  assert.ok(pruefe({ ...gut, kontakt: 'morgen mittag' }).fehler.kontakt);
  assert.ok(pruefe({ ...gut, kontakt: 'erika@' }).fehler.kontakt);
});

test('Längen werden begrenzt', () => {
  assert.ok(pruefe({ ...gut, name: 'x'.repeat(101) }).fehler.name);
  assert.ok(pruefe({ ...gut, nachricht: 'x'.repeat(2001) }).fehler.nachricht);
});

test('Steuerzeichen fliegen raus, Zeilenumbrüche in der Nachricht bleiben', () => {
  const r = pruefe({ ...gut, name: ' Erika\u0000  Muster ', nachricht: 'Zeile 1\r\nZeile 2\n\n\n\nZeile 3' });
  assert.equal(r.felder.name, 'Erika Muster');
  assert.equal(r.felder.nachricht, 'Zeile 1\nZeile 2\n\nZeile 3');
});

test('Spam: verstecktes Feld oder viele Links', () => {
  assert.equal(pruefe({ ...gut, website: 'http://spam.example' }).spam, true);
  assert.equal(pruefe({ ...gut, nachricht: 'https://a https://b https://c' }).spam, true);
  assert.equal(pruefe({ ...gut, nachricht: 'Unsere Seite: https://a' }).spam, false);
  assert.equal(pruefe({ ...gut, website: 'x' }).ok, false);
});
