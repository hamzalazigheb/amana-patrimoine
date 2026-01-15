import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Mentions Légales | Amana Patrimoine',
    description: 'Mentions légales et informations sur Amana Patrimoine - ORIAS, agréments et coordonnées.',
};

export default function MentionsLegalesPage() {
    return (
        <>
            <Header />
            <main>
                <section className="content-section" style={{ paddingTop: '120px' }}>
                    <div className="container">
                        <div className="section-header">
                            <span className="section-label">Informations Légales</span>
                            <h1 className="section-title">Mentions Légales</h1>
                        </div>

                        <div className="content-section-main" style={{ maxWidth: '900px' }}>
                            <div style={{ marginBottom: 'var(--space-12)' }}>
                                <h2 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-2xl)',
                                    color: 'var(--color-forest)',
                                    marginBottom: 'var(--space-6)'
                                }}>Éditeur du site</h2>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    Ce site est édité par la société <strong>Amana Patrimoine</strong>, société par actions simplifiée au capital social de 1000€ dont le siège social est situé <strong>60 RUE FRANCOIS IER, 75008 PARIS</strong> en France, immatriculée au registre du commerce et des sociétés de Paris sous le numéro <strong>988458436</strong>, immatriculée à l'<strong>ORIAS</strong> sous le numéro <strong>25009552</strong> en tant que <strong>COA, COBSP, CIF</strong>.
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--space-12)' }}>
                                <h2 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-2xl)',
                                    color: 'var(--color-forest)',
                                    marginBottom: 'var(--space-6)'
                                }}>Agréments ORIAS</h2>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    <strong>Numéro ORIAS :</strong> 25009552
                                </p>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    <strong>Catégories d'agrément :</strong>
                                </p>
                                <ul style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginLeft: 'var(--space-8)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    <li><strong>COA</strong> - Conseiller en Opérations de Banque et en Services de Paiement</li>
                                    <li><strong>COBSP</strong> - Conseiller en Opérations de Banque et en Services de Paiement</li>
                                    <li><strong>CIF</strong> - Conseiller en Investissements Financiers</li>
                                </ul>
                                <p style={{ 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'var(--color-text-muted)',
                                    lineHeight: '1.8',
                                    fontStyle: 'italic'
                                }}>
                                    Vous pouvez vérifier ces informations sur le site de l'ORIAS : <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brass)' }}>www.orias.fr</a>
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--space-12)' }}>
                                <h2 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-2xl)',
                                    color: 'var(--color-forest)',
                                    marginBottom: 'var(--space-6)'
                                }}>Coordonnées</h2>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    <strong>Adresse :</strong> 60 RUE FRANCOIS IER, 75008 PARIS, France
                                </p>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    <strong>RCS :</strong> Paris B 988458436
                                </p>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    <strong>Capital social :</strong> 1000€
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--space-12)' }}>
                                <h2 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-2xl)',
                                    color: 'var(--color-forest)',
                                    marginBottom: 'var(--space-6)'
                                }}>Directeur de publication</h2>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    Le directeur de la publication est le représentant légal de la société Amana Patrimoine.
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--space-12)' }}>
                                <h2 style={{ 
                                    fontFamily: 'var(--font-heading)', 
                                    fontSize: 'var(--text-2xl)',
                                    color: 'var(--color-forest)',
                                    marginBottom: 'var(--space-6)'
                                }}>Hébergement</h2>
                                <p style={{ 
                                    fontSize: 'var(--text-base)', 
                                    color: 'var(--color-text)',
                                    lineHeight: '1.8',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    Ce site est hébergé par [Nom de l'hébergeur - à compléter si nécessaire].
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

