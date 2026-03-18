import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { blocks: { orderBy: { order: 'asc' } } },
    });
    return NextResponse.json({ pages });
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la récupération des pages' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
      return NextResponse.json({ error: 'Le slug est requis' }, { status: 400 });
    }
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
      return NextResponse.json({ error: 'Le titre est requis' }, { status: 400 });
    }

    const page = await prisma.page.create({
      data: {
        slug: data.slug.trim().toLowerCase(),
        title: data.title.trim(),
        description: data.description || '',
        keywords: data.keywords || '',
        published: data.published ?? false,
      },
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Ce slug existe déjà' }, { status: 409 });
    }
    console.error('Page creation error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création de la page' }, { status: 500 });
  }
}
