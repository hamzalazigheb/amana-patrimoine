'use client';

import { useEffect, useRef } from 'react';

const trustItems = [
    {
        title: '15 ans d\'expérience en gestion de patrimoine et finance islamique',
        description: 'Une expertise reconnue pour vous accompagner sur tous vos projets patrimoniaux, de l\'investissement à la transmission. Certification AMF et diplôme en finance islamique.'
    },
    {
        title: 'Un accompagnement sur-mesure avec un interlocuteur unique',
        description: 'Nous prenons le temps de comprendre votre situation, vos objectifs et vos contraintes pour vous proposer une stratégie vraiment adaptée. Un seul conseiller centralise l\'ensemble de vos démarches.'
    },
    {
        title: 'Une indépendance totale vis-à-vis des établissements financiers',
        description: 'Aucun lien capitalistique avec nos partenaires, ce qui nous permet de sélectionner les meilleures solutions pour vous, sans conflit d\'intérêts. Notre priorité : votre satisfaction.'
    },
    {
        title: 'Une transparence absolue sur les frais et la gestion',
        description: 'Vous savez exactement où va votre argent et comment votre stratégie évolue. Clarté totale sur les frais, les placements et les rapports de gestion.'
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
                <div className="section-header">
                    <h2 className="section-title">Pourquoi choisir Amana Patrimoine ?</h2>
                </div>
                <div className="trust-grid">
                    {trustItems.map((item, index) => (
                        <div key={index} className="trust-item">
                            <h3 className="trust-title">{item.title}</h3>
                            <p className="trust-desc">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
