export const dynamic = 'force-dynamic';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlockRenderer from '../../components/BlockRenderer';
import Breadcrumb from '../../components/Breadcrumb';
import { getPageBySlug } from '../../lib/cms';
import { buildMetadata, buildBreadcrumbJsonLd } from '../../lib/seo';

export async function generateMetadata() {
  const page = await getPageBySlug('nos-actualites');
  return buildMetadata(
    page,
    'nos-actualites',
    'Nos actualités — Vidéos patrimoine & finance islamique',
    'Retrouvez les dernières vidéos d\'Amana Patrimoine sur la gestion de patrimoine et la finance islamique.'
  );
}

export default async function NosActualitesPage() {
  const page = await getPageBySlug('nos-actualites');
  const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Nos actualités', slug: 'nos-actualites' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <Breadcrumb items={[{ name: 'Nos actualités', href: '/nos-actualites' }]} />
      <main id="main-content">
        {page ? (
          <BlockRenderer blocks={page.blocks} />
        ) : (
          <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <p>Contenu en cours de chargement…</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
