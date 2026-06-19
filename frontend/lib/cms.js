import prisma from './db';

export async function getPageBySlug(slug) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: { blocks: { orderBy: { order: 'asc' } } },
  });

  if (!page) return null;

  return {
    ...page,
    blocks: page.blocks.map((b) => ({
      id: b.id,
      type: b.type,
      order: b.order,
      content: typeof b.content === 'string' ? JSON.parse(b.content) : b.content,
    })),
  };
}

export async function getBlogArticles() {
  const pages = await prisma.page.findMany({
    where: { published: true, slug: { startsWith: 'blog/' } },
    orderBy: { createdAt: 'desc' },
    include: {
      blocks: {
        where: { type: 'pageHero' },
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
  });

  return pages.map((page) => {
    let heroImage = null;
    const heroBlock = page.blocks[0];
    if (heroBlock) {
      const content = typeof heroBlock.content === 'string'
        ? JSON.parse(heroBlock.content || '{}')
        : heroBlock.content;
      heroImage = content?.image || content?.backgroundImage || null;
    }

    const { blocks, ...rest } = page;
    return {
      ...rest,
      coverImage: page.coverImage || heroImage || null,
    };
  });
}

export async function getSettings() {
  const settings = await prisma.globalSetting.findMany();
  const obj = {};
  for (const s of settings) {
    try {
      obj[s.key] = JSON.parse(s.value);
    } catch {
      obj[s.key] = s.value;
    }
  }
  return obj;
}
