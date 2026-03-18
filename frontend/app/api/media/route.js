import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MIME_TO_EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/svg+xml': '.svg' };

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(media);
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la récupération des médias' }, { status: 500 });
  }
}

export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const alt = formData.get('alt') || '';

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier envoyé' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé. Formats acceptés : JPEG, PNG, WebP, GIF, SVG.' }, { status: 400 });
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'Fichier trop volumineux. Taille maximale : 5 Mo.' }, { status: 400 });
    }

    const ext = MIME_TO_EXT[file.type] || '.png';
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, safeName);

    await writeFile(filePath, buffer);

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        path: `/uploads/${safeName}`,
        mimeType: file.type,
        size: buffer.length,
        alt,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}
