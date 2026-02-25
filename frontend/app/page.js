import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockRenderer from '../components/BlockRenderer';
import { getPageBySlug } from '../lib/cms';
import { buildMetadata } from '../lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    const page = await getPageBySlug('home');
    return buildMetadata(
        page,
        'home',
        'Amana Patrimoine - Conseil en Gestion de Patrimoine et Finance Islamique | Paris',
        'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique. Investissement, retraite, transmission. Paris et Île-de-France.'
    );
}

export default async function Home() {
    const page = await getPageBySlug('home');

    return (
        <>
            <Header />
            <main id="main-content">
                {page ? (
                    <BlockRenderer blocks={page.blocks} />
                ) : (
                    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                        <p>Contenu en cours de chargement...</p>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
