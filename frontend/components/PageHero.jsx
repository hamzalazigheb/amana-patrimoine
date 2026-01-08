'use client';

import { useEffect, useRef } from 'react';

export default function PageHero({
    badge,
    title,
    subtitle,
    ctaText = "Prendre rendez-vous",
    ctaLink = "#contact",
    secondaryCtaText,
    secondaryCtaLink,
    image
}) {
    const heroRef = useRef(null);

    useEffect(() => {
        const elements = heroRef.current?.querySelectorAll('.animate-on-load');
        elements?.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + index * 150);
        });
    }, []);

    const style = image ? { backgroundImage: `url(${image})` } : {};

    return (
        <section className={`page-hero ${image ? 'page-hero-has-bg' : ''}`} ref={heroRef} style={style}>
            <div className="container">
                <div className="page-hero-content">
                    {badge && (
                        <div className="page-hero-badge animate-on-load">
                            {badge}
                        </div>
                    )}

                    <h1 className="animate-on-load">{title}</h1>

                    {subtitle && (
                        <p className="page-hero-subtitle animate-on-load">{subtitle}</p>
                    )}

                    <div className="page-hero-cta animate-on-load">
                        <a href={ctaLink} className="btn btn-primary btn-lg">
                            {ctaText}
                        </a>
                        {secondaryCtaText && (
                            <a href={secondaryCtaLink || '#'} className="btn btn-secondary btn-lg">
                                {secondaryCtaText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
