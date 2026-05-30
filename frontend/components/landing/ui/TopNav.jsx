'use client';

import Link from 'next/link';
import { AmanaLogo, BtnGold } from './primitives';

export default function LandingTopNav({ urls, dark = false }) {
    return (
        <header className={`lp-topnav ${dark ? 'lp-topnav--dark' : ''}`}>
            <Link href="/platform" className="lp-topnav__logo">
                <AmanaLogo dark={dark} height={40} />
            </Link>
            <nav className="lp-topnav__nav" aria-label="Navigation principale">
                <a href="#offres">Nos offres</a>
                <a href="#parcours">Comment ça marche</a>
                <Link href={urls.financeUrl}>Finance islamique</Link>
                <a href="#faq">Ressources</a>
            </nav>
            <div className="lp-topnav__actions">
                <Link href={urls.loginUrl} className="lp-topnav__login">
                    Se connecter
                </Link>
                <BtnGold href={urls.parcoursUrl}>Démarrer mon parcours</BtnGold>
            </div>
        </header>
    );
}
