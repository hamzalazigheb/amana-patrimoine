import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const media = await prisma.media.findUnique({ where: { id: params.id } });
    if (!media) return NextResponse.json({ error: 'Média non trouvé' }, { status: 404 });

    const filePath = path.join(process.cwd(), 'public', media.path);
    try { await unlink(filePath); } catch { /* file may not exist */ }

    await prisma.media.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
