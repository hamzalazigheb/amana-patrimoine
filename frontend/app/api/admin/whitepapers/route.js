import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const leads = await prisma.whitePaperDownload.findMany({
    orderBy: { createdAt: 'desc' },
    take: 300,
  });

  return NextResponse.json(
    leads.map((l) => ({
      ...l,
      paperIds: JSON.parse(l.paperIds || '[]'),
    }))
  );
}
