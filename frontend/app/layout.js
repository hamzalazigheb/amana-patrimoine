import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';

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
    name: 'Amana Patrimoine',
    url: SITE_URL,
    logo: `${SITE_URL}/1amanap-patrimoine.svg`,
    description: 'Cabinet de conseil en gestion de patrimoine indépendant, spécialisé en finance islamique. Investissement, retraite, transmission.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
    },
    telephone: '+33189700000',
    email: 'contact@amana-patrimoine.fr',
    areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 48.8566, longitude: 2.3522 },
        geoRadius: '50000',
    },
    priceRange: '€€',
    knowsAbout: [
        'Gestion de patrimoine',
        'Finance islamique',
        'Investissement halal',
        'SCPI',
        'Assurance-vie',
        'Préparation retraite',
        'Transmission de patrimoine',
        'Optimisation fiscale',
    ],
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
            </head>
            <body>
                <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
                {children}
            </body>
        </html>
    );
}
