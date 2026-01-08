import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import ToolCard from '../../components/ToolCard';
import FAQ from '../../components/FAQ';
import ReassuranceBlock from '../../components/ReassuranceBlock';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Immobilier sans Riba | Amana Patrimoine',
    description: 'Découvrez nos solutions d\'investissement et de financement immobilier conformes à l\'éthique musulmane. Murabaha, SCPI Halal et stratégies d\'apport.',
};

const expertises = [
    {
        title: 'SCPI de Rendement Halal',
        description: 'Devenez copropriétaire d\'actifs tertiaires sélectionnés pour leur absence de dette bancaire et leur conformité Shariah.',
        features: ['Revenus trimestriels', 'Gestion déléguée', 'Audit éthique permanent']
    },
    {
        title: 'Financement Murabaha',
        description: 'Accompagnement dans la structuration de contrats d\'achat-revente pour votre résidence principale ou investissement locatif.',
        features: ['Marge fixe connue', 'Pas d\'intérêt (Riba)', 'Conforme droit français']
    },
    {
        title: 'Nue-Propriété Éthique',
        description: 'Investissez dans la pierre avec une décote importante, sans frottement fiscal et sans recours à l\'emprunt.',
        features: ['Gain mécanique', 'Zéro gestion', 'Horizon 10-15 ans']
    }
];

const steps = [
    { title: '01. Constitution de l\'Apport', desc: 'Épargne programmée sur des supports halal pour maximiser votre capacité de financement.' },
    { title: '02. Sélection de l\'Actif', desc: 'Audit technique et éthique du bien ou de la SCPI cible par nos experts.' },
    { title: '03. Structuration Murabaha', desc: 'Mise en relation avec nos partenaires bancaires spécialisés pour un financement sans intérêt.' }
];

export default function ImmobilierPage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Propriété Éthique"
                    title="Votre projet immobilier, sans compromis sur vos valeurs"
                    subtitle="L'accès à la propriété immobilière sans Riba est un pilier de la liberté financière. Nous architecturons votre parcours de l'épargne initiale au financement final."
                    image="/edu-paris.png"
                    ctaText="Simuler mon projet"
                />

                <ContentSection
                    label="L'Approche"
                    title="Le chemin vers l'immobilier sans Riba"
                    intro="Acheter un bien immobilier en conformité avec l'éthique musulmane demande une méthode rigoureuse et une connaissance fine des contrats Murabaha et Moucharaka."
                    image="/hero-bg.png"
                    imageSide="right"
                >
                    <p>
                        Chez Amana Patrimoine, nous ne nous contentons pas de vous proposer des produits. Nous vous accompagnons dans la stratégie d'<strong>anticipation de l'apport</strong>, levier indispensable pour accéder aux financements Shariah Compliant en France.
                    </p>
                    <div className="methodology-steps-list" style={{ marginTop: '2rem' }}>
                        {steps.map((step, index) => (
                            <div key={index} className="method-step-item" style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ color: 'var(--color-brass)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>{step.title}</h4>
                                <p style={{ fontSize: '0.95rem' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Solutions"
                    title="Nos leviers immobiliers éthiques"
                >
                    <div className="tools-grid">
                        {expertises.map((expertise, index) => (
                            <ToolCard key={index} {...expertise} />
                        ))}
                    </div>
                </ContentSection>

                <ContentSection
                    label="Cas d'Usage"
                    title="Exemple de projet d'acquisition"
                    image="/edu-heritage.png"
                    imageSide="left"
                >
                    <div className="simulation-highlight" style={{ backgroundColor: 'var(--color-white)', padding: '2rem', border: '1px solid var(--color-ivory-dark)', borderRadius: 'var(--radius-sm)' }}>
                        <h4 style={{ color: 'var(--color-forest)', marginBottom: '1rem' }}>Acquisition d'une Résidence Principale (Exemple)</h4>
                        <ul className="check-list" style={{ marginBottom: '1.5rem' }}>
                            <li><strong>Projet :</strong> Bien de 300 000 € en région parisienne.</li>
                            <li><strong>Apport constitué :</strong> 60 000 € via notre solution d'épargne halal.</li>
                            <li><strong>Financement :</strong> Murabaha sur 20 ans avec marge fixe.</li>
                            <li><strong>Résultat :</strong> Propriété pleine et entière, sans aucun recours à l'intérêt bancaire.</li>
                        </ul>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                            * Simulation donnée à titre indicatif. Chaque dossier fait l'objet d'une étude de solvabilité personnalisée.
                        </p>
                    </div>
                </ContentSection>

                <ReassuranceBlock />

                <ContentSection
                    background="beige"
                    label="Certification"
                    title="Un conseil audité et indépendant"
                >
                    <p>
                        Toutes nos solutions immobilières, et particulièrement les <strong>SCPI Halal</strong>, font l'objet d'un audit de conformité par un comité d'éthique indépendant. Nous garantissons l'absence de financement par la dette usuraire et la sélection rigoureuse d'activités locatives licites.
                    </p>
                </ContentSection>

                <CTASection />
            </main>
            <Footer />
        </>
    );
}
