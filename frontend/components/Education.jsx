'use client';

import { useEffect, useRef } from 'react';

const resources = [
    {
        image: '/edu-heritage.png',
        tag: 'Livre Blanc',
        title: 'Bientôt disponible',
        description: ''
    },
    {
        image: '/edu-paris.png',
        tag: 'Analyse',
        title: 'Bientôt disponible',
        description: ''
    },
    {
        image: '/transmisison.png',
        tag: 'Guide',
        title: 'Bientôt disponible',
        description: ''
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
                    <h2 className="section-title">Nos ressources pédagogiques</h2>
                    <p className="section-desc">
                        Découvrez prochainement nos guides, livres blancs et analyses pour approfondir vos connaissances en gestion de patrimoine et finance islamique.
                    </p>
                </div>

                <div className="education-grid">
                    {resources.map((resource, index) => (
                        <div key={index} className="education-card">
                            <div className="education-image">
                                <img src={resource.image} alt={resource.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="education-content">
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span className="education-tag">{resource.tag}</span>
                                </div>
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
