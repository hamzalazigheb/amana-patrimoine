import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const page = await prisma.page.findUnique({
      where: { id: params.id },
      include: { blocks: { orderBy: { order: 'asc' } } },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la récupération de la page' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const data = await request.json();

    const updateData = {};
    if (data.title !== undefined) updateData.title = String(data.title).trim();
    if (data.description !== undefined) updateData.description = String(data.description || '');
    if (data.keywords !== undefined) updateData.keywords = String(data.keywords || '');
    if (data.published !== undefined) updateData.published = Boolean(data.published);

    const page = await prisma.page.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Page update error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de la page' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    await prisma.page.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la suppression de la page' }, { status: 500 });
  }
}
