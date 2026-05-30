import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import '../../components/landing/landing.css';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-landing-serif',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-landing-sans',
    display: 'swap',
});

const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-landing-mono',
    display: 'swap',
});

export const metadata = {
    title: 'Amana Patrimoine — Landing platform',
    description:
        'Cabinet spécialisé en finance islamique. Parcours en ligne + RDV de 30 min avec un conseiller.',
};

export default function PlatformLayout({ children }) {
    return (
        <div className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}>
            {children}
        </div>
    );
}
