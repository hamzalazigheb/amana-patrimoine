/**
 * Fixes UTF-8 mojibake (Latin-1 misread) in all affected page.js files.
 * Run: node scripts/fix-encoding.js
 */
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..');

const files = [
  'app/reduire-impots/page.js',
  'app/reduire-impots-entreprise/page.js',
  'app/retraite/page.js',
  'app/strategie/page.js',
  'app/succession/page.js',
  'app/scpi-halal/page.js',
  'app/qui-sommes-nous/page.js',
  'app/mentions-legales/page.js',
  'app/lexique/page.js',
  'app/investissement/page.js',
  'app/immobilier/page.js',
  'app/finance-islamique/page.js',
  'app/enfants/page.js',
  'app/blog/page.js',
  'app/bilan-patrimonial/page.js',
  'app/assurance-vie-islamique/page.js',
  'app/page.js',
];

// Mojibake → correct character mappings
// These come from UTF-8 bytes being interpreted as Latin-1 (Windows-1252)
const replacements = [
  // Lowercase accented vowels
  ['\u00c3\u00a9', '\u00e9'], // é
  ['\u00c3\u00a8', '\u00e8'], // è
  ['\u00c3\u00aa', '\u00ea'], // ê
  ['\u00c3\u00ab', '\u00eb'], // ë
  ['\u00c3\u00a0', '\u00e0'], // à
  ['\u00c3\u00a2', '\u00e2'], // â
  ['\u00c3\u00ae', '\u00ee'], // î
  ['\u00c3\u00af', '\u00ef'], // ï
  ['\u00c3\u00b4', '\u00f4'], // ô
  ['\u00c3\u00b9', '\u00f9'], // ù
  ['\u00c3\u00ba', '\u00fa'], // ú
  ['\u00c3\u00bb', '\u00fb'], // û
  ['\u00c3\u00bc', '\u00fc'], // ü
  ['\u00c3\u00a7', '\u00e7'], // ç
  ['\u00c3\u00b1', '\u00f1'], // ñ
  // Uppercase accented
  ['\u00c3\u0089', '\u00c9'], // É
  ['\u00c3\u0080', '\u00c0'], // À
  ['\u00c3\u0087', '\u00c7'], // Ç
  ['\u00c3\u0082', '\u00c2'], // Â
  ['\u00c3\u008b', '\u00cb'], // Ë
  ['\u00c3\u0094', '\u00d4'], // Ô
  ['\u00c3\u009b', '\u00db'], // Û
  ['\u00c3\u009c', '\u00dc'], // Ü
  // Ligatures
  ['\u00c5\u0093', '\u0153'], // œ
  ['\u00c5\u0092', '\u0152'], // Œ
  // Smart quotes / dashes (â€™ etc.)
  ['\u00e2\u0080\u0099', '\u2019'], // '
  ['\u00e2\u0080\u009c', '\u201c'], // "
  ['\u00e2\u0080\u009d', '\u201d'], // "
  ['\u00e2\u0080\u0093', '\u2013'], // –
  ['\u00e2\u0080\u0094', '\u2014'], // —
  ['\u00e2\u0080\u00a6', '\u2026'], // …
];

let totalFixed = 0;

for (const rel of files) {
  const fullPath = path.join(base, rel);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${rel}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;

  for (const [bad, good] of replacements) {
    content = content.split(bad).join(good);
  }

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`FIXED: ${rel}`);
    totalFixed++;
  } else {
    console.log(`OK (no change): ${rel}`);
  }
}

console.log(`\nDone. ${totalFixed} file(s) fixed.`);
