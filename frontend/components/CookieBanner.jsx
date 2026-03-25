'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) setVisible(true);
    }, []);

    function accept() {
        localStorage.setItem('cookie-consent', 'accepted');
        setVisible(false);
    }

    function refuse() {
        localStorage.setItem('cookie-consent', 'refused');
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="cookie-banner" role="dialog" aria-label="Consentement cookies">
            <p>
                Nous utilisons des cookies pour analyser notre trafic et améliorer votre expérience.
                En continuant, vous acceptez notre{' '}
                <Link href="/politique-confidentialite">politique de confidentialité</Link>.
            </p>
            <div className="cookie-banner-actions">
                <button className="cookie-btn-refuse" onClick={refuse}>Refuser</button>
                <button className="cookie-btn-accept" onClick={accept}>Accepter</button>
            </div>
        </div>
    );
}
