'use client';

import { useEffect, useRef } from 'react';

const services = [
    {
        title: 'Stratégie patrimoniale',
        description: 'Construire une vision d\'ensemble de votre patrimoine. Nous réalisons un bilan complet de votre situation (actifs, passifs, revenus, fiscalité) pour définir une stratégie cohérente qui répond à vos objectifs de vie.',
        link: '/strategie',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
            </svg>
        )
    },
    {
        title: 'Investissement immobilier',
        description: 'Investir dans la pierre, en direct ou via des SCPI conformes aux normes de finance islamique. Location meublée (LMNP), déficit foncier, dispositifs fiscaux (Pinel, Malraux), SCPI sans dette bancaire : nous vous accompagnons sur tous les montages immobiliers.',
        link: '/immobilier',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
        )
    },
    {
        title: 'Préparation de la retraite',
        description: 'Anticiper votre retraite avec des solutions d\'épargne performantes et éthiques. Plan d\'épargne retraite (PER), assurance-vie, SCPI : nous construisons un complément de revenus qui vous permettra de maintenir votre niveau de vie.',
        link: '/retraite',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
        )
    },
    {
        title: 'Transmission et fiscalité',
        description: 'Transmettre votre patrimoine dans les meilleures conditions et réduire légalement vos impôts. Donation, démembrement, assurance-vie, optimisation IFI : nous organisons votre succession et votre fiscalité en respectant vos valeurs.',
        link: '/succession',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
        )
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
                    <h2 className="section-title">Nos domaines d&apos;expertise</h2>
                    <p className="section-desc">
                        Nous intervenons sur l&apos;ensemble des problématiques patrimoniales, avec une spécialisation en finance islamique et une approche globale de votre situation.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <a key={index} href={service.link} className="service-card">
                            <div className="service-icon-wrap">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                            <span className="service-link">
                                En savoir plus
                                <svg className="service-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
