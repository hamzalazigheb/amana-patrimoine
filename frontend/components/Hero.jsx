'use client';

import { useEffect, useRef, useState } from 'react';

const slides = [
    {
        image: '/hero-nature.png',
        badge: 'Partenaire de confiance | Institutional Grade',
        title: 'Une stratégie patrimoniale pensée pour durer',
        subtitle: 'Nous accompagnons les familles, dirigeants et cadres de haut niveau dans l\'organisation et l\'optimisation de leur patrimoine avec une indépendance absolue et une rigueur institutionnelle.'
    },
    {
        image: '/hero-bg.png',
        badge: 'Expertise & Audit | Excellence Technique',
        title: 'Préserver l\'actif, bâtir l\'avenir',
        subtitle: 'Notre approche se fonde sur une analyse rigoureuse des actifs réels pour garantir une croissance stable en accord avec vos principes.'
    },
    {
        image: '/edu-vineyard.png',
        badge: 'Valeurs & Éthique | Vision Long Terme',
        title: 'L\'excellence financière, la conscience en plus',
        subtitle: 'Une gestion de patrimoine éthique qui concilie performance durable et respect scrupuleux de vos convictions.'
    }
];

export default function Hero() {
    const heroRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);

        return () => clearInterval(timer);
    }, []);

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
    }, [currentSlide]);

    return (
        <section className="hero" ref={heroRef}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                />
            ))}

            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge animate-on-load" key={`badge-${currentSlide}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        {slides[currentSlide].badge}
                    </div>

                    <h1 className="animate-on-load" key={`title-${currentSlide}`}>
                        {slides[currentSlide].title}
                    </h1>

                    <p className="hero-subtitle animate-on-load" key={`subtitle-${currentSlide}`}>
                        {slides[currentSlide].subtitle}
                    </p>

                    <div className="hero-cta animate-on-load">
                        <a href="#contact" className="btn btn-primary">
                            Prendre rendez-vous
                        </a>
                        <a href="#methodology" className="btn btn-secondary">
                            Découvrir notre approche
                        </a>
                    </div>

                    <div className="hero-stats animate-on-load">
                        <div className="hero-stat">
                            <div className="hero-stat-value">15+</div>
                            <div className="hero-stat-label">Années de conseil</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">Indépendance</div>
                            <div className="hero-stat-label">Absence de biais commercial</div>
                        </div>
                    </div>
                </div>

                <div className="hero-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
