import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { status } = await request.json();
  const allowed = ['new', 'read', 'replied'];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 422 });
  }

  const contact = await prisma.contact.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(contact);
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  await prisma.contact.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
