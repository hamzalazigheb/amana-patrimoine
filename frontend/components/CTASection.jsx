'use client';

export default function CTASection() {
    return (
        <section className="cta-section" id="contact">
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-title">
                        Planifier un entretien confidentiel
                    </h2>
                    <p className="cta-desc">
                        Rencontrez un de nos experts pour une analyse discrète et rigoureuse
                        de vos besoins patrimoniaux. Aucun engagement n'est requis.
                    </p>
                    <div className="cta-buttons">
                        <a href="#appointment" className="btn btn-gold">
                            Prendre rendez-vous
                        </a>
                        <a href="tel:+33189700000" className="btn btn-outline-white">
                            Contacter un associé
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
