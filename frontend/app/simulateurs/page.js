import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ZakatCalculator from '../../components/ZakatCalculator';
import { buildBreadcrumbJsonLd } from '../../lib/seo';
import './zakat.css';

const SITE_URL = 'https://amana-patrimoine.fr';

export const metadata = {
    title: 'Calculateur de Zakat Islamique - Simulateur Gratuit',
    description: 'Calculez votre Zakat en ligne avec notre simulateur islamique complet : liquidités, or, investissements, immobilier, commerce, cheptel. Conforme à la jurisprudence islamique.',
    keywords: 'simulateur zakat, calcul zakat, calculatrice zakat islamique, nisab, zakat en ligne',
    alternates: { canonical: `${SITE_URL}/simulateurs` },
    openGraph: {
        title: 'Calculateur de Zakat Islamique - Simulateur Gratuit',
        description: 'Calculez votre Zakat en ligne avec notre simulateur islamique complet, conforme à la jurisprudence.',
        url: `${SITE_URL}/simulateurs`,
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Amana Patrimoine',
        images: [{ url: `${SITE_URL}/logo10.png`, width: 1200, height: 630, alt: 'Calculateur Zakat Amana Patrimoine' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Calculateur de Zakat Islamique - Simulateur Gratuit',
        description: 'Calculez votre Zakat en ligne : liquidités, or, investissements, immobilier, commerce, cheptel.',
        images: [`${SITE_URL}/logo10.png`],
    },
};

export default function SimulateursPage() {
    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Calculateur de Zakat', slug: 'simulateurs' }]);

    const webAppJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/simulateurs#zakat-calculator`,
        name: 'Calculateur de Zakat',
        url: `${SITE_URL}/simulateurs`,
        description: 'Simulateur de Zakat en ligne complet : liquidités, or, investissements, immobilier, commerce, cheptel.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        inLanguage: 'fr-FR',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        provider: { '@type': 'Organization', name: 'Amana Patrimoine', url: SITE_URL },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
            <Header />
            <Breadcrumb items={[{ name: 'Calculateur Zakat', href: '/simulateurs' }]} />
            <main id="main-content">
                <ZakatCalculator />
            </main>
            <Footer />
        </>
    );
}
