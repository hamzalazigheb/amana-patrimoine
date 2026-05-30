'use client';

import Link from 'next/link';
import Image from 'next/image';

export function CheckIcon({ size = 18, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.12" />
            <path d="M7.5 12 L10.5 15 L16.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function CrossIcon({ size = 18, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.12" />
            <path d="M9 9 L15 15 M15 9 L9 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

export function StarIcon({ size = 14, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M12 2 L14.5 8.5 L21 9.3 L16.2 13.8 L17.6 20.5 L12 17 L6.4 20.5 L7.8 13.8 L3 9.3 L9.5 8.5 Z" />
        </svg>
    );
}

export function OliveSprig({ size = 24, className = '' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
            <path d="M16 28 L16 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
            <ellipse cx="11" cy="13" rx="3" ry="1.5" fill="currentColor" transform="rotate(-30 11 13)" opacity="0.85" />
            <ellipse cx="21" cy="13" rx="3" ry="1.5" fill="currentColor" transform="rotate(30 21 13)" opacity="0.85" />
            <ellipse cx="10" cy="19" rx="3" ry="1.5" fill="currentColor" transform="rotate(-30 10 19)" opacity="0.85" />
            <ellipse cx="22" cy="19" rx="3" ry="1.5" fill="currentColor" transform="rotate(30 22 19)" opacity="0.85" />
        </svg>
    );
}

function isExternalHref(href) {
    return typeof href === 'string' && /^https?:\/\//i.test(href);
}

export function Eyebrow({ children, light = false }) {
    return (
        <span className={`lp-eyebrow ${light ? 'lp-eyebrow--light' : ''}`}>
            <span className="lp-eyebrow__line" />
            {children}
        </span>
    );
}

export function BtnGold({ children, href, large = false, full = false, onClick }) {
    const className = `lp-btn lp-btn--gold ${large ? 'lp-btn--lg' : ''} ${full ? 'lp-btn--full' : ''}`;
    if (href) {
        if (isExternalHref(href)) {
            return (
                <a href={href} className={className}>
                    {children}
                    <span aria-hidden="true">→</span>
                </a>
            );
        }
        return (
            <Link href={href} className={className}>
                {children}
                <span aria-hidden="true">→</span>
            </Link>
        );
    }
    return (
        <button type="button" className={className} onClick={onClick}>
            {children}
            <span aria-hidden="true">→</span>
        </button>
    );
}

export function BtnPrimary({ children, href, large = false, full = false }) {
    const className = `lp-btn lp-btn--primary ${large ? 'lp-btn--lg' : ''} ${full ? 'lp-btn--full' : ''}`;
    const target = href || '#';
    if (isExternalHref(target)) {
        return (
            <a href={target} className={className}>
                {children}
                <span aria-hidden="true">→</span>
            </a>
        );
    }
    return (
        <Link href={target} className={className}>
            {children}
            <span aria-hidden="true">→</span>
        </Link>
    );
}

export function BtnGhost({ children, href, large = false, dark = false, external = false }) {
    const className = `lp-btn lp-btn--ghost ${large ? 'lp-btn--lg' : ''} ${dark ? 'lp-btn--ghost-dark' : ''}`;
    if (external) {
        return (
            <a href={href} className={className} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }
    return (
        <Link href={href || '#'} className={className}>
            {children}
        </Link>
    );
}

export function AmanaLogo({ dark = false, height = 40 }) {
    return (
        <Image
            src="/1amanap-patrimoine.svg"
            alt="Amana Patrimoine"
            width={Math.round(height * 2.53)}
            height={height}
            className={dark ? 'lp-logo lp-logo--dark' : 'lp-logo'}
            priority
        />
    );
}

export function ComparisonMark({ state }) {
    if (state === true) return <CheckIcon className="lp-icon--gold" />;
    if (state === false) return <CrossIcon className="lp-icon--muted" />;
    return <span className="lp-icon--maybe">?</span>;
}
