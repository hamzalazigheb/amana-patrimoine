async function createPage(prisma, slug, meta, blocks) {
  const page = await prisma.page.upsert({
    where: { slug },
    update: { title: meta.title, description: meta.description, keywords: meta.keywords || '', published: true },
    create: { slug, title: meta.title, description: meta.description || '', keywords: meta.keywords || '', published: true },
  });
  await prisma.block.deleteMany({ where: { pageId: page.id } });
  for (let i = 0; i < blocks.length; i++) {
    await prisma.block.create({
      data: { pageId: page.id, type: blocks[i].type, order: i, content: JSON.stringify(blocks[i].content) },
    });
  }
  console.log(`  ✓ ${slug} (${blocks.length} blocks)`);
}

module.exports = { createPage };
