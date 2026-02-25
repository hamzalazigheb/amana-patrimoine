import prisma from '../lib/db';

export default async function sitemap() {
  const baseUrl = 'https://amana-patrimoine.fr';

  const pages = await prisma.page.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  return pages.map((page) => ({
    url: page.slug === 'home' ? baseUrl : `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: page.slug === 'mentions-legales' ? 'yearly' : 'monthly',
    priority: page.slug === 'home' ? 1.0 : page.slug === 'mentions-legales' ? 0.3 : 0.8,
  }));
}
