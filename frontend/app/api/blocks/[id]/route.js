import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';

export async function PUT(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const data = {};
    if (body.type !== undefined) data.type = body.type;
    if (body.order !== undefined) data.order = body.order;
    if (body.content !== undefined) data.content = JSON.stringify(body.content);

    const block = await prisma.block.update({ where: { id: params.id }, data });
    return NextResponse.json({ ...block, content: JSON.parse(block.content) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await prisma.block.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
