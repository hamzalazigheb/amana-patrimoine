/**
 * Replaces `export const revalidate = N` with `export const dynamic = 'force-dynamic'`
 * in all public page.js files so Next.js does NOT try to pre-render them at build time.
 *
 * Run: node scripts/fix-dynamic.js
 */
const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, '..', 'app');

const files = [
  'page.js',
  'assurance-vie-islamique/page.js',
  'bilan-patrimonial/page.js',
  'blog/page.js',
  'blog/[slug]/page.js',
  'enfants/page.js',
  'finance-islamique/page.js',
  'immobilier/page.js',
  'investissement/page.js',
  'lexique/page.js',
  'mentions-legales/page.js',
  'qui-sommes-nous/page.js',
  'reduire-impots/page.js',
  'reduire-impots-entreprise/page.js',
  'retraite/page.js',
  'scpi-halal/page.js',
  'strategie/page.js',
  'succession/page.js',
  'zakat/page.js',
];

for (const rel of files) {
  const fp = path.join(base, rel);
  if (!fs.existsSync(fp)) { console.log('SKIP:', rel); continue; }
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  // Strip UTF-8 BOM if present, then replace revalidate with force-dynamic
  const BOM = '\uFEFF';
  const hasBom = c.startsWith(BOM);
  if (hasBom) c = c.slice(1);
  c = c.replace(/^export const revalidate = \d+;\r?\n?/m, "export const dynamic = 'force-dynamic';\n");
  if (hasBom && !c.startsWith(BOM)) c = BOM + c;
  if (c !== orig) {
    fs.writeFileSync(fp, c, 'utf8');
    console.log('FIXED:', rel);
  } else {
    console.log('OK (no change):', rel);
  }
}
console.log('Done.');
