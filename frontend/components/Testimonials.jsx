'use client';

import { useEffect, useRef } from 'react';

const testimonials = [
    {
        text: 'L\'expertise et la rigueur d\'Amana Patrimoine ont été déterminantes dans la structuration de notre patrimoine familial. Une relation de confiance durable.',
        name: 'Marie & Jean-Pierre D.',
        role: 'Dirigeants'
    },
    {
        text: 'Un accompagnement d\'une rare précision. Leur indépendance totale garantit des conseils d\'une objectivité absolue pour nos investissements.',
        name: 'Karim B.',
        role: 'Entrepreneur'
    },
    {
        text: 'Une vision long-terme et une approche éthique qui résonnent avec nos valeurs. Le cabinet Amana est devenu un partenaire incontournable.',
        name: 'Famille Lefebvre',
        role: 'Philanthropes'
    }
];

export default function Testimonials() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.testimonial-card');
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
        <section className="testimonials-section" id="testimonials" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Confiance</span>
                    <h2 className="section-title">Paroles de nos partenaires</h2>
                    <p className="section-desc">
                        L'excellence de notre service se mesure à la satisfaction de ceux que nous accompagnons.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <strong>{testimonial.name}</strong> — {testimonial.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
