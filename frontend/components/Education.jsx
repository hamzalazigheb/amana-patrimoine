'use client';

import { useEffect, useRef } from 'react';

const resources = [
    {
        image: '/edu-heritage.png',
        tag: 'Livre Blanc',
        title: 'Principes de Gestion Privée',
        description: 'Une étude approfondie sur les stratégies de préservation du capital en période d\'incertitude.'
    },
    {
        image: '/edu-paris.png',
        tag: 'Analyse',
        title: 'Perspectives Immobilier 2024',
        description: 'Analyse des mutations du marché immobilier et opportunités de structuration fiscale.'
    },
    {
        image: '/edu-vineyard.png',
        tag: 'Guide',
        title: 'Transmission & Successsion',
        description: 'Les clés pour organiser la transmission de votre patrimoine avec sérénité et efficacité.'
    }
];

export default function Education() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.education-card');
                        cards.forEach((card, index) => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(15px)';
                            setTimeout(() => {
                                card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="education-section" id="education" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Pédagogie</span>
                    <h2 className="section-title">Notes d'Analyse & Perspectives</h2>
                    <p className="section-desc">
                        Nous partageons nos réflexions et nos outils pour éclairer vos décisions patrimoniales.
                    </p>
                </div>

                <div className="education-grid">
                    {resources.map((resource, index) => (
                        <div key={index} className="education-card">
                            <div className="education-image">
                                <img src={resource.image} alt={resource.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="education-content">
                                <span className="education-tag">{resource.tag}</span>
                                <h3>{resource.title}</h3>
                                <p className="education-desc">{resource.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
