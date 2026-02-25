import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const page = await prisma.page.findUnique({
    where: { id: params.id },
    include: { blocks: { orderBy: { order: 'asc' } } },
  });

  if (!page) {
    return NextResponse.json({ error: 'Page non trouvée' }, { status: 404 });
  }

  return NextResponse.json({ page });
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const data = await request.json();

  const page = await prisma.page.update({
    where: { id: params.id },
    data: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      published: data.published,
    },
  });

  return NextResponse.json({ page });
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  await prisma.page.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
