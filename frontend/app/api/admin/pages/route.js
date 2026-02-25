import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { blocks: { orderBy: { order: 'asc' } } },
  });

  return NextResponse.json({ pages });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const data = await request.json();
  const page = await prisma.page.create({
    data: {
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      keywords: data.keywords || '',
      published: data.published ?? false,
    },
  });

  return NextResponse.json({ page }, { status: 201 });
}
