'use client';

import { useState } from 'react';

const DEFAULT_TESTIMONIALS = [
    {
        name: 'Karim B.',
        location: 'Paris 15e',
        context: 'Investissement immobilier & SCPI',
        text: "J'avais besoin d'investir en respectant mes convictions. L'équipe Amana a su m'orienter vers des SCPI conformes à la finance islamique avec une pédagogie remarquable. Je recommande vivement.",
        rating: 5,
    },
    {
        name: 'Sarah M.',
        location: 'Île-de-France',
        context: 'Préparation retraite',
        text: "Suivi sérieux, écoute réelle de mes besoins. On m'a proposé un PER avec des fonds halal que je ne connaissais pas. La déduction fiscale est un vrai plus. Très satisfaite de l'accompagnement.",
        rating: 5,
    },
    {
        name: 'Youssef A.',
        location: 'Lyon',
        context: 'Transmission de patrimoine',
        text: "Cabinet indépendant, pas de produit à vendre à tout prix. Le conseiller a pris le temps d'étudier ma situation familiale pour proposer une stratégie de transmission adaptée. Professionnalisme exemplaire.",
        rating: 5,
    },
];

function Stars({ count }) {
    return (
        <div className="testimonial-stars" aria-label={`${count} étoiles sur 5`}>
            {Array.from({ length: Number(count) || 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            ))}
        </div>
    );
}

export default function Testimonials({ testimonials, sectionTitle }) {
    const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
    const [active, setActive] = useState(0);
    const title = sectionTitle || 'Ce que disent nos clients';

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Témoignages</span>
                    <h2 className="section-title">{title}</h2>
                </div>

                <div className="testimonials-carousel">
                    <div className="testimonial-card">
                        <Stars count={items[active]?.rating} />
                        <blockquote className="testimonial-text">
                            &ldquo;{items[active]?.text}&rdquo;
                        </blockquote>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">
                                {(items[active]?.name || '?').charAt(0)}
                            </div>
                            <div>
                                <div className="testimonial-name">{items[active]?.name}</div>
                                <div className="testimonial-meta">{items[active]?.location} · {items[active]?.context}</div>
                            </div>
                        </div>
                    </div>

                    {items.length > 1 && (
                        <div className="testimonial-dots">
                            {items.map((_, i) => (
                                <button
                                    key={i}
                                    className={`testimonial-dot${i === active ? ' active' : ''}`}
                                    onClick={() => setActive(i)}
                                    aria-label={`Témoignage ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <p className="testimonials-disclaimer">
                    * Les prénoms ont été modifiés pour respecter la confidentialité de nos clients.
                </p>
            </div>
        </section>
    );
}
