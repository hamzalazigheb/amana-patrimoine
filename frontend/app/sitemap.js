import prisma from '../lib/db';

// Regenerate at request time so newly-published blog posts and CMS pages
// appear in the sitemap without requiring a rebuild.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://amana-patrimoine.fr';

// Canonical list of static pages (slug → priority + changeFrequency).
// Kept in sync with the 20 pages shipped in prisma/seeds/*.
const STATIC_ROUTES = [
    { slug: '', priority: 1.0, changeFrequency: 'weekly' },
    { slug: 'qui-sommes-nous', priority: 0.9, changeFrequency: 'monthly' },

    // Core services
    { slug: 'strategie', priority: 0.9, changeFrequency: 'monthly' },
    { slug: 'immobilier', priority: 0.9, changeFrequency: 'monthly' },
    { slug: 'investissement', priority: 0.9, changeFrequency: 'monthly' },
    { slug: 'retraite', priority: 0.9, changeFrequency: 'monthly' },
    { slug: 'succession', priority: 0.9, changeFrequency: 'monthly' },
    { slug: 'enfants', priority: 0.8, changeFrequency: 'monthly' },
    { slug: 'reduire-impots', priority: 0.8, changeFrequency: 'monthly' },
    { slug: 'reduire-impots-entreprise', priority: 0.8, changeFrequency: 'monthly' },

    // Finance islamique resources — high SEO value
    { slug: 'finance-islamique', priority: 0.95, changeFrequency: 'monthly' },
    { slug: 'scpi-halal', priority: 0.9, changeFrequency: 'monthly' },
    { slug: 'assurance-vie-islamique', priority: 0.9, changeFrequency: 'monthly' },
    { slug: 'zakat', priority: 0.95, changeFrequency: 'monthly' },
    { slug: 'bilan-patrimonial', priority: 0.85, changeFrequency: 'monthly' },
    { slug: 'livres-blancs', priority: 0.85, changeFrequency: 'monthly' },
    { slug: 'nos-actualites', priority: 0.85, changeFrequency: 'weekly' },
    { slug: 'lexique', priority: 0.7, changeFrequency: 'monthly' },

    // Interactive tools, blog listing, contact
    { slug: 'simulateurs', priority: 0.85, changeFrequency: 'monthly' },
    { slug: 'blog', priority: 0.8, changeFrequency: 'weekly' },
    { slug: 'contact', priority: 0.85, changeFrequency: 'monthly' },

    // Legal
    { slug: 'mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
    { slug: 'politique-confidentialite', priority: 0.3, changeFrequency: 'yearly' },
];

function buildStaticEntries(now) {
    return STATIC_ROUTES.map((route) => ({
        url: route.slug ? `${BASE_URL}/${route.slug}` : BASE_URL,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}

export default async function sitemap() {
    const now = new Date();
    const staticEntries = buildStaticEntries(now);

    let dbEntries = [];
    try {
        const pages = await prisma.page.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        });

        const knownStaticSlugs = new Set(STATIC_ROUTES.map((r) => r.slug));

        dbEntries = pages
            // Skip slugs already emitted from STATIC_ROUTES (avoid duplicates)
            // and hidden/system slugs such as "home" which maps to "/"
            .filter((p) => {
                if (!p.slug) return false;
                if (p.slug === 'home') return false;
                if (knownStaticSlugs.has(p.slug)) return false;
                return true;
            })
            .map((p) => {
                const isBlog = p.slug.startsWith('blog/');
                return {
                    url: `${BASE_URL}/${p.slug}`,
                    lastModified: p.updatedAt || now,
                    changeFrequency: 'monthly',
                    priority: isBlog ? 0.7 : 0.75,
                };
            });
    } catch (err) {
        // Never crash the sitemap — Google reading a degraded (but valid)
        // sitemap is always better than a 500.
        // eslint-disable-next-line no-console
        console.error('[sitemap] DB fetch failed, falling back to static entries only:', err?.message);
    }

    return [...staticEntries, ...dbEntries];
}
