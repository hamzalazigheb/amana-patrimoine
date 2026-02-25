'use client';

export default function CTASection({
    title = "Planifier un entretien",
    subtitle = "Rencontrez un de nos experts pour une analyse discrète et rigoureuse de vos besoins patrimoniaux. Aucun engagement n'est requis.",
    description
}) {
    return (
        <section className="cta-section" id="contact">
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-title">{title}</h2>
                    <p className="cta-desc">{subtitle}</p>
                    {description && (
                        <p className="cta-desc" style={{ marginTop: 'var(--space-4)' }}>{description}</p>
                    )}
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
