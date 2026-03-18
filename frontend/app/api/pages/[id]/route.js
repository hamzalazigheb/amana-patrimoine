import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';

export async function GET(request, { params }) {
  try {
    const page = await prisma.page.findUnique({
      where: { id: params.id },
      include: { blocks: { orderBy: { order: 'asc' } } },
    });
    if (!page) return NextResponse.json({ error: 'Page non trouvée' }, { status: 404 });

    return NextResponse.json({
      ...page,
      blocks: page.blocks.map((b) => ({ ...b, content: JSON.parse(b.content) })),
    });
  } catch (error) {
    console.error('Page fetch error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de la page' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const page = await prisma.page.update({
      where: { id: params.id },
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        keywords: body.keywords,
        published: body.published,
      },
    });
    return NextResponse.json(page);
  } catch (error) {
    console.error('Page update error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de la page' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await prisma.page.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Page delete error:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de la page' }, { status: 500 });
  }
}
