'use client';

import { useEffect, useRef } from 'react';

const steps = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        title: 'Premier contact gratuit',
        description: 'Un échange confidentiel pour comprendre votre situation, vos projets et vos contraintes. Aucun engagement de votre part.'
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
        title: 'Bilan patrimonial complet',
        description: 'Nous analysons en détail vos actifs, vos revenus, votre fiscalité et vos objectifs pour identifier les leviers d\'optimisation.'
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        title: 'Stratégie sur-mesure',
        description: 'Nous vous présentons une stratégie claire, chiffrée, adaptée à votre profil. Vous décidez, nous mettons en œuvre.'
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
        title: 'Suivi régulier',
        description: 'Votre vie évolue, votre stratégie aussi. Nous restons à vos côtés pour adapter votre patrimoine à chaque étape.'
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
                    <h2 className="section-title">Comment ça marche ?</h2>
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
