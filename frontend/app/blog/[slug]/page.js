import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlockRenderer from '../../../components/BlockRenderer';
import { getPageBySlug, getBlogArticles } from '../../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd, buildFaqJsonLd } from '../../../lib/seo';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const page = await getPageBySlug(`blog/${slug}`);
    return buildMetadata(
        page,
        `blog/${slug}`,
        page?.title || 'Article de blog',
        page?.description || 'Article sur la finance islamique et la gestion de patrimoine.'
    );
}

export default async function BlogArticlePage({ params }) {
    const { slug } = await params;
    const page = await getPageBySlug(`blog/${slug}`);

    if (!page) {
        return (
            <>
                <Header />
                <main id="main-content">
                    <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                        <h1 style={{ color: 'var(--color-forest)' }}>Article introuvable</h1>
                        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>Cet article n&apos;existe pas ou a été déplacé.</p>
                        <Link href="/blog" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
                            Retour au blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Blog', slug: 'blog' },
        { name: page.title, slug: `blog/${slug}` },
    ]);
    const faqBlock = page?.blocks?.find(b => b.type === 'faq');
    const faqJsonLd = faqBlock ? buildFaqJsonLd(faqBlock.content?.items) : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <Header />
            <main id="main-content">
                <div className="blog-article-breadcrumb">
                    <div className="container">
                        <Link href="/blog">← Retour au blog</Link>
                    </div>
                </div>
                <BlockRenderer blocks={page.blocks} />
            </main>
            <Footer />
        </>
    );
}
