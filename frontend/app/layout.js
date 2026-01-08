import './globals.css';

export const metadata = {
    title: 'Amana Patrimoine | Gestion de Patrimoine & Investissement Éthique',
    description: 'Amana Patrimoine vous accompagne dans la construction et la protection de votre patrimoine avec des stratégies éthiques et personnalisées. Expertise, transparence et vision long terme.',
    keywords: 'patrimoine, gestion de patrimoine, investissement éthique, épargne, retraite, immobilier, transmission, conseil financier',
    authors: [{ name: 'Amana Patrimoine' }],
    openGraph: {
        title: 'Amana Patrimoine | Gestion de Patrimoine & Investissement Éthique',
        description: 'Construisez et protégez votre patrimoine en toute sérénité avec Amana Patrimoine.',
        type: 'website',
        locale: 'fr_FR',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
