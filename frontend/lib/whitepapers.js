import prisma from './db';

export async function getWhitepapersPage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'livres-blancs' },
    include: { blocks: { orderBy: { order: 'asc' } } },
  });

  if (!page) return null;

  const blocks = page.blocks.map((b) => ({
    id: b.id,
    type: b.type,
    order: b.order,
    content: typeof b.content === 'string' ? JSON.parse(b.content) : b.content,
  }));

  const whitepapersBlock = blocks.find((b) => b.type === 'whitepapers');

  return {
    page: { ...page, blocks },
    whitepapers: whitepapersBlock?.content || null,
  };
}

export function findPaperById(content, paperId) {
  if (!content?.items) return null;
  return content.items.find((item) => item.id === paperId) || null;
}
