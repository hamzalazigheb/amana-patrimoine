'use client';

export default function CookieButton() {
    return (
        <button
            className="footer-legal-btn"
            onClick={() => typeof window.__openCookiePrefs === 'function' && window.__openCookiePrefs()}
        >
            Gérer mes cookies
        </button>
    );
}
