'use client';

import { useEffect, useRef } from 'react';

export default function IslamicFinanceSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const elements = entry.target.querySelectorAll('.fade-in-element');
                        elements.forEach((el, index) => {
                            el.style.opacity = '0';
                            el.style.transform = 'translateY(15px)';
                            setTimeout(() => {
                                el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
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
        <section className="content-section" style={{ backgroundColor: 'var(--color-ivory)' }} ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Finance islamique : notre spécialité</h2>
                </div>
                <div className="content-section-main" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="fade-in-element" style={{ 
                        fontSize: 'var(--text-base)', 
                        color: 'var(--color-text)', 
                        lineHeight: '1.8',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <p style={{ marginBottom: 'var(--space-4)' }}>
                            Tous nos investissements sont conformes aux principes de la finance islamique. Cela signifie : <strong>exclusion totale des intérêts (riba)</strong>, pas d'investissement dans les secteurs interdits (alcool, armement, banques conventionnelles, jeux de hasard), validation par des comités charia reconnus.
                        </p>
                        <p style={{ marginBottom: 'var(--space-4)' }}>
                            Nos conseillers sont formés à la finance islamique et au fiqh al-mu'amalat (droit musulman des transactions). Nous pouvons également vous accompagner sur le calcul de la <strong>Zakat</strong>, un pilier de l'islam qui peut s'avérer complexe quand le patrimoine est diversifié.
                        </p>
                        <p>
                            Cette approche éthique ne compromet pas la performance. Au contraire, elle permet d'investir dans l'économie réelle, sur des actifs tangibles, avec une vision de long terme.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
