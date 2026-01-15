'use client';

import { useEffect, useRef } from 'react';

const steps = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
        title: 'Planifiez votre rendez-vous',
        description: 'Un premier échange confidentiel pour faire connaissance et comprendre vos objectifs de vie.'
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        title: 'Réalisez votre bilan patrimonial',
        description: 'Nos experts analysent votre structure actuelle pour identifier les leviers d\'optimisation éthique.'
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <text x="12" y="18" fontSize="20" fontWeight="bold" textAnchor="middle" fill="currentColor">€</text>
            </svg>
        ),
        title: 'Déployez votre stratégie',
        description: 'Déploiement de votre stratégie sur-mesure avec un suivi rigoureux de la performance et de la conformité.'
    }
];

export default function Methodology() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const items = entry.target.querySelectorAll('.timeline-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('active');
                            }, index * 200);
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
        <section className="methodology-section" id="methodology" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Processus</span>
                    <h2 className="section-title">Comment bénéficier de nos conseils ?</h2>
                    <p className="section-desc">
                        Un parcours structuré en trois étapes clés pour bâtir un patrimoine qui vous ressemble.
                    </p>
                </div>

                <div className="methodology-timeline">
                    {steps.map((step, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-icon-box">
                                {step.icon}
                            </div>
                            <div className="timeline-content">
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
