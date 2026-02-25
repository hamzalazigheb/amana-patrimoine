'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        const elements = heroRef.current?.querySelectorAll('.animate-on-load');
        elements?.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            <div
                className="hero-slide active"
                style={{
                    backgroundImage: 'url("/Design sans titre (1) (1).png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className="container">
                <div className="hero-content">
                    <h1 className="animate-on-load">Conseil en gestion de patrimoine et finance islamique</h1>
                    <p className="hero-subtitle animate-on-load">
                        15 ans d&apos;expérience pour construire une stratégie patrimoniale sur-mesure, en accord avec vos convictions
                    </p>
                    <div className="hero-cta animate-on-load">
                        <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Prendre rendez-vous
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
