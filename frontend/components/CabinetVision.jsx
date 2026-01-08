'use client';

export default function CabinetVision() {
    return (
        <section className="vision-section">
            <div className="container">
                <div className="vision-grid">
                    <div className="vision-image-wrapper">
                        <img src="/hero-bg.png" alt="Cabinet Amana Patrimoine" className="vision-image" />
                    </div>
                    <div className="vision-content">
                        <span className="section-label">L'Institution</span>
                        <h2 className="section-title">Une vision pérenne de la gestion privée</h2>
                        <p>
                            Amana Patrimoine n'est pas simplement un cabinet de conseil ; c'est une institution bâtie sur des valeurs de discrétion, d'excellence technique et de fidélité à vos principes éthiques.
                        </p>
                        <p>
                            Dans un monde financier en constante mutation, nous agissons comme une boussole stable pour les familles et les dirigeants. Notre indépendance totale nous permet de sélectionner les solutions les plus rigoureuses, loin de toute pression commerciale.
                        </p>
                        <div className="vision-features">
                            <div className="vision-feature">
                                <span className="feature-bold">Indépendance Statutaire</span>
                                <p>Libre choix des partenaires et absence de conflit d'intérêts.</p>
                            </div>
                            <div className="vision-feature">
                                <span className="feature-bold">Rigueur Éthique</span>
                                <p>Sérénité d'un investissement en parfaite conformité avec vos valeurs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
