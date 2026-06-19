import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import prisma from '@/lib/db';
import { getWhitepapersPage, findPaperById } from '@/lib/whitepapers';

export async function GET(request, { params }) {
  try {
    const { token, paperId } = await params;

    if (!token || !paperId) {
      return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
    }

    const record = await prisma.whitePaperDownload.findUnique({
      where: { downloadToken: token },
    });

    if (!record || new Date() > record.expiresAt) {
      return NextResponse.json({ error: 'Lien expiré ou invalide' }, { status: 403 });
    }

    const allowedIds = JSON.parse(record.paperIds || '[]');
    if (!allowedIds.includes(paperId)) {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }

    const cms = await getWhitepapersPage();
    const paper = findPaperById(cms?.whitepapers, paperId);
    if (!paper?.pdfFile) {
      return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
    }

    const relativePath = paper.pdfFile.replace(/^\//, '');
    const filePath = path.join(process.cwd(), 'public', relativePath);

    if (!filePath.startsWith(path.join(process.cwd(), 'public', 'downloads'))) {
      return NextResponse.json({ error: 'Chemin non autorisé' }, { status: 403 });
    }

    const buffer = await readFile(filePath);
    const filename = path.basename(filePath);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err) {
    if (err?.code === 'ENOENT') {
      return NextResponse.json({ error: 'Fichier PDF non disponible' }, { status: 404 });
    }
    console.error('[Whitepaper download]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
