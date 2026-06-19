const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'downloads');
fs.mkdirSync(dir, { recursive: true });

const files = [
  'guide-investissement-halal.pdf',
  'guide-zakat-patrimoine.pdf',
  'guide-transmission-succession.pdf',
  'guide-bilan-patrimonial.pdf',
];

function minimalPdf(title) {
  const stream = `BT /F1 18 Tf 72 720 Td (${title}) Tj ET`;
  const objects = [
    '1 0 obj<< /Type /Catalog /Pages 2 0 R>>endobj',
    '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1>>endobj',
    '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R>>>>>>endobj',
    `4 0 obj<< /Length ${stream.length}>>stream\n${stream}\nendstream\nendobj`,
    '5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica>>endobj',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += obj + '\n';
  }
  const xrefPos = Buffer.byteLength(pdf);
  pdf += 'xref\n0 6\n';
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < offsets.length; i++) {
    pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += 'trailer<< /Size 6 /Root 1 0 R>>\n';
  pdf += `startxref\n${xrefPos}\n%%EOF`;
  return Buffer.from(pdf);
}

for (const f of files) {
  const title = f.replace('guide-', '').replace(/-/g, ' ').replace('.pdf', '').slice(0, 28);
  fs.writeFileSync(path.join(dir, f), minimalPdf(title));
}

console.log(`Created ${files.length} placeholder PDFs in public/downloads/`);
