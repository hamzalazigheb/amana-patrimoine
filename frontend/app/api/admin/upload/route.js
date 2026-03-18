import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé. Formats acceptés : JPEG, PNG, WebP, GIF, SVG.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'Fichier trop volumineux. Taille maximale : 5 Mo.' }, { status: 400 });
    }

    const MIME_TO_EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/svg+xml': '.svg' };
    const ext = MIME_TO_EXT[file.type] || '.png';
    const safeName = `upload-${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${safeName}`, filename: safeName });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Erreur upload' }, { status: 500 });
  }
}
