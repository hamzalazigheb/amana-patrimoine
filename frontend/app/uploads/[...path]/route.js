import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const segments = params.path;
  const filename = Array.isArray(segments) ? segments.join('/') : segments;

  if (!filename || filename.includes('..')) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const filePath = path.resolve(UPLOAD_DIR, filename);
  if (!filePath.startsWith(path.resolve(UPLOAD_DIR))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const body = fs.readFileSync(filePath);

  return new NextResponse(body, {
    headers: {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=2592000',
    },
  });
}
