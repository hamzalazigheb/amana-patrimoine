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
