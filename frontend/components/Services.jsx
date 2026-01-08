'use client';

import { useEffect, useRef } from 'react';

const services = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        title: 'Gestion de Patrimoine',
        description: 'Audit complet et stratégies d\'organisation pour une vision globale de vos actifs.',
        link: '/strategie'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: 'Investissement Immobilier',
        description: 'Sélection rigoureuse, SCPI éthiques et structuration locative haut de gamme.',
        link: '/immobilier'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="11.5" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        title: 'Épargne & Retraite',
        description: 'Constitution d\'une épargne solide et préparation anticipée de votre retraite.',
        link: '/retraite'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
        title: 'Transmission & Optimisation',
        description: 'Pérenniser la transmission de votre patrimoine et optimiser votre fiscalité.',
        link: '/succession'
    }
];

export default function Services() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.service-card');
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
        <section className="services-section" id="services" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Expertises</span>
                    <h2 className="section-title">Un accompagnement d'excellence</h2>
                    <p className="section-desc">
                        Nous concevons des solutions sur mesure pour répondre aux exigences des profils les plus complexes.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                            <a href={service.link} className="service-link">
                                Découvrir
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
