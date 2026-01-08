'use client';

import { useEffect, useRef } from 'react';

const trustItems = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        title: '15 Ans d\'Expertise',
        description: 'Une maîtrise pointue des enjeux patrimoniaux et fiscaux au service de votre sérénité.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: 'Accompagnement Dédié',
        description: 'Un interlocuteur unique pour une stratégie sur-mesure totalement intégrée.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: 'Indépendance Totale',
        description: 'Liberté de sélection absolue des solutions pour garantir votre seul intérêt.'
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
        ),
        title: 'Transparence Absolue',
        description: 'Clarté totale sur les frais et les rapports de gestion pour une confiance durable.'
    }
];

export default function TrustIndicators() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const items = entry.target.querySelectorAll('.trust-item');
                        items.forEach((item, index) => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(15px)';
                            setTimeout(() => {
                                item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
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
        <section className="trust-section" ref={sectionRef}>
            <div className="container">
                <div className="trust-grid">
                    {trustItems.map((item, index) => (
                        <div key={index} className="trust-item">
                            <div className="trust-icon">
                                {item.icon}
                            </div>
                            <h3 className="trust-title">{item.title}</h3>
                            <p className="trust-desc">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
