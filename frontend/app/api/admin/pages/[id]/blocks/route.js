import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { blocks } = await request.json();

  await prisma.block.deleteMany({ where: { pageId: params.id } });

  const created = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = await prisma.block.create({
      data: {
        pageId: params.id,
        type: blocks[i].type,
        order: i,
        content: typeof blocks[i].content === 'string'
          ? blocks[i].content
          : JSON.stringify(blocks[i].content),
      },
    });
    created.push(block);
  }

  try {
    const page = await prisma.page.findUnique({
      where: { id: params.id },
      select: { slug: true },
    });
    if (page?.slug) {
      const path = page.slug === 'home' ? '/' : `/${page.slug}`;
      revalidatePath(path);
      revalidatePath('/sitemap.xml');
    }
  } catch (err) {
    console.error('[revalidate] failed:', err?.message);
  }

  return NextResponse.json({ blocks: created });
}
