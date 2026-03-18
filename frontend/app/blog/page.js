import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { getBlogArticles } from '../../lib/cms';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Blog Finance Islamique - Conseils Patrimoniaux & Guides',
    description: 'Articles et guides pratiques sur la finance islamique, l\'investissement halal, la Zakat, la retraite islamique et la transmission de patrimoine.',
    keywords: 'blog finance islamique, articles halal investissement, guide patrimoine islamique',
};

const categoryColors = {
    'Guide': '#3B6E4E',
    'Retraite': '#8B6F3E',
    'Zakat': '#6B4E8B',
};

function getCategoryFromTitle(title) {
    if (title.toLowerCase().includes('zakat')) return 'Zakat';
    if (title.toLowerCase().includes('retraite') || title.toLowerCase().includes('per')) return 'Retraite';
    return 'Guide';
}

function getReadingTime(description) {
    if (!description) return '5 min';
    const words = description.split(' ').length;
    return `${Math.max(3, Math.round(words / 200))} min`;
}

export default async function BlogPage() {
    const articles = await getBlogArticles();

    return (
        <>
            <Header />
            <main id="main-content">
                <section className="blog-page-header">
                    <div className="container">
                        <div className="blog-page-header-inner">
                            <span className="section-label">Blog</span>
                            <h1 className="blog-page-header-title">
                                Finance islamique & patrimoine :<br />
                                <em>nos guides et analyses</em>
                            </h1>
                            <div className="blog-page-header-divider" aria-hidden="true" />
                            <p className="blog-page-header-desc">
                                Conseils pratiques, guides détaillés et analyses pour gérer et développer
                                votre patrimoine en accord avec vos convictions islamiques.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="blog-listing">
                    <div className="container">
                        {articles.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                Articles bientôt disponibles...
                            </p>
                        ) : (
                            <div className="blog-grid">
                                {articles.map((article) => {
                                    const slugPart = article.slug.replace('blog/', '');
                                    const category = getCategoryFromTitle(article.title);
                                    const readTime = getReadingTime(article.description);
                                    return (
                                        <Link key={article.id} href={`/blog/${slugPart}`} className="blog-card">
                                            <div className="blog-card-body">
                                                <span className="blog-card-category" style={{ color: categoryColors[category] || 'var(--color-brass)' }}>
                                                    {category}
                                                </span>
                                                <h2 className="blog-card-title">{article.title}</h2>
                                                <p className="blog-card-excerpt">{article.description}</p>
                                            </div>
                                            <div className="blog-card-footer">
                                                <span className="blog-card-read-time">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    {readTime} de lecture
                                                </span>
                                                <span className="blog-card-arrow">
                                                    Lire l&apos;article
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                        <line x1="5" y1="12" x2="19" y2="12" />
                                                        <polyline points="12 5 19 12 12 19" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
