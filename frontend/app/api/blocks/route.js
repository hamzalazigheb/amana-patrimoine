import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';

export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const block = await prisma.block.create({
      data: {
        pageId: body.pageId,
        type: body.type,
        order: body.order ?? 0,
        content: JSON.stringify(body.content || {}),
      },
    });
    return NextResponse.json({ ...block, content: JSON.parse(block.content) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
