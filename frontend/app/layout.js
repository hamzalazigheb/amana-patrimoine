import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import WhatsAppFab from '../components/WhatsAppFab';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    variable: '--font-heading',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-body',
    display: 'swap',
});

const SITE_URL = 'https://amana-patrimoine.fr';

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Amana Patrimoine - Conseil en Gestion de Patrimoine et Finance Islamique | Paris',
        template: '%s | Amana Patrimoine',
    },
    description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique. Investissement, retraite, transmission. Paris et Île-de-France.',
    keywords: 'gestion patrimoine, conseil patrimonial, finance islamique, investissement halal, SCPI halal, PER conforme, Paris',
    authors: [{ name: 'Amana Patrimoine' }],
    manifest: '/manifest.json',
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/logo10.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        shortcut: '/logo10.png',
        apple: [
            { url: '/logo10.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    alternates: {
        canonical: SITE_URL,
        languages: { 'fr-FR': SITE_URL },
    },
    openGraph: {
        title: 'Amana Patrimoine - Conseil en Gestion de Patrimoine et Finance Islamique | Paris',
        description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.',
        type: 'website',
        locale: 'fr_FR',
        url: SITE_URL,
        siteName: 'Amana Patrimoine',
        images: [
            {
                url: '/logo10.png',
                width: 1200,
                height: 630,
                alt: 'Amana Patrimoine - Gestion de Patrimoine et Finance Islamique',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Amana Patrimoine - Conseil en Gestion de Patrimoine et Finance Islamique | Paris',
        description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.',
        images: ['/logo10.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Amana Patrimoine',
    alternateName: 'Amana Patrimoine - Finance Islamique',
    url: SITE_URL,
    logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/1amanap-patrimoine.svg`,
        width: 200,
        height: 60,
    },
    image: `${SITE_URL}/logo10.png`,
    description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique. Investissement halal, retraite islamique, SCPI halal, transmission. Paris et Île-de-France.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Île-de-France',
        postalCode: '75000',
        addressCountry: 'FR',
    },
    telephone: '+33189700000',
    email: 'contact@amana-patrimoine.fr',
    areaServed: [
        { '@type': 'City', name: 'Paris' },
        { '@type': 'AdministrativeArea', name: 'Île-de-France' },
        { '@type': 'Country', name: 'France' },
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Virement bancaire, chèque',
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [
        'https://www.linkedin.com/company/amana-patrimoine',
    ],
    knowsAbout: [
        'Finance islamique',
        'Investissement halal',
        'Placements halal',
        'SCPI halal',
        'PER halal',
        'Assurance-vie islamique',
        'Retraite islamique',
        'Succession islamique',
        'Gestion de patrimoine',
        'Bilan patrimonial',
        'Optimisation fiscale',
        'Transmission de patrimoine',
        'Zakat',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services de gestion de patrimoine islamique',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Investissement halal', url: `${SITE_URL}/investissement` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Immobilier islamique & SCPI halal', url: `${SITE_URL}/immobilier` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retraite islamique & PER halal', url: `${SITE_URL}/retraite` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transmission & succession islamique', url: `${SITE_URL}/succession` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Optimisation fiscale', url: `${SITE_URL}/reduire-impots` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Épargne enfants halal', url: `${SITE_URL}/enfants` } },
        ],
    },
};

const founderPersonJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Amana Patrimoine',
    jobTitle: 'Conseiller en Gestion de Patrimoine',
    worksFor: {
        '@type': 'FinancialService',
        '@id': `${SITE_URL}/#organization`,
        name: 'Amana Patrimoine',
    },
    knowsAbout: [
        'Finance islamique',
        'Gestion de patrimoine',
        'Investissement halal',
        'Planification retraite',
        'Transmission de patrimoine',
    ],
    url: `${SITE_URL}/qui-sommes-nous`,
    image: `${SITE_URL}/logo10.png`,
};

const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Amana Patrimoine',
    url: SITE_URL,
    description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique.',
    publisher: { '@type': 'Organization', name: 'Amana Patrimoine' },
    inLanguage: 'fr-FR',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(founderPersonJsonLd) }}
                />
            </head>
            <body>
                <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
                {children}
                <WhatsAppFab />
            </body>
        </html>
    );
}
