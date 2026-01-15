'use client';

export default function CTASection() {
    return (
        <section className="cta-section" id="contact">
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-title">
                        Planifier un entretien
                    </h2>
                    <p className="cta-desc">
                        Rencontrez un de nos experts pour une analyse discrète et rigoureuse
                        de vos besoins patrimoniaux. Aucun engagement n'est requis.
                    </p>
                    <div className="cta-buttons">
                        <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                            Prendre rendez-vous
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
