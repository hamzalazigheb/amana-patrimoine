import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import ToolCard from '../../components/ToolCard';
import FAQ from '../../components/FAQ';
import ReassuranceBlock from '../../components/ReassuranceBlock';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Retraite Éthique | Amana Patrimoine',
    description: 'Préparez votre retraite sans Riba. Optimisation fiscale via le PER, investissement immobilier de rente et capitalisation sereine.',
};

const tools = [
    {
        title: 'PER Individuel',
        description: 'La solution phare pour transformer votre impôt en capital retraite, sur des supports audités sans Riba.',
        features: ['Option de capitalisation', 'Sans effet de levier', 'Revenus récurrents']
    },
    {
        title: 'SCPI Éthique',
        description: 'Bâtissez un revenu trimestriel décorrélé des marchés financiers, adossé à l\'immobilier réel.',
        features: ['Loyers nets de frais', 'Zéro gestion locative', 'Conformité Shariah']
    },
    {
        title: 'Assurance-Vie Capitalisation',
        description: 'La flexibilité absolue pour disposer de revenus à tout moment, avec un cadre fiscal privilégié.',
        features: ['Fonds Shariah Compliant', 'Transmission optimisée', 'Disponibilité du capital']
    },
    {
        title: 'Investissement Immobilier',
        description: 'Structurez une rente grâce à l\'investissement immobilier',
        features: ['Revenus régulier', 'Biens tangibles', 'Croissance du patrimoine']
    }
];

const faqs = [
    {
        question: "Qu'est-ce qui rend un PER éthique ?",
        answer: "Un PER est considéré comme éthique lorsqu'il est investi exclusivement dans des supports (fonds d'investissements, actions, SCPI) qui respectent les principes de la finance islamique : absence d'intérêt (riba), pas de spéculation excessive (gharar) et exclusion des secteurs illicites (alcool, porc, banques conventionnelles, armement)."
    },
    {
        question: "Puis-je retirer mon capital en une seule fois ?",
        answer: "Oui, depuis la loi PACTE de 2019, le PER permet une sortie en capital à 100% au moment de la retraite. Il est également possible de sortir en capital pour l'achat de sa résidence principale avant la retraite."
    },
    {
        question: "L'avantage fiscal est-il immédiat ?",
        answer: "Absolument. Les versements effectués sur votre PER sont déductibles de votre revenu imposable de l'année en cours. Par exemple, si vous versez 10 000 € en 2024, votre revenu déclaré aux impôts en 2025 sera réduit de 10 000 €."
    }
];

export default function RetraitePage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Prévoyance Retraite"
                    title="Votre liberté de demain se dessine aujourd'hui"
                    subtitle="Face à la baisse inévitable des pensions d'État, l'anticipation est un devoir. Nous architecturons votre future autonomie financière sans compromis sur vos valeurs."
                    image="/edu-vineyard.png"
                    ctaText="Simuler ma retraite"
                />

                <ContentSection
                    label="Le Constat"
                    title="Comprendre le déficit de pension"
                    intro="Le passage à la retraite s'accompagne d'une chute brutale de revenus, souvent sous-estimée."
                    image="/hero-nature.png"
                    imageSide="right"
                >
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-brass-dark)', fontWeight: '500', marginBottom: '1.5rem' }}>
                        -45% de revenus en moyenne pour les cadres supérieurs.
                    </p>
                    <p>
                        Se reposer uniquement sur le système par répartition expose votre niveau de vie à un risque majeur. Investir dès maintenant dans un <strong>complément de retraite éthique</strong> permet de combler ce vide financier tout en respectant vos convictions.
                    </p>
                    <div className="highlight-box">
                        <p>« Ne pas agir aujourd'hui, c'est accepter une baisse drastique de son train de vie demain. »</p>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Étude de Cas"
                    title="L'impact d'une stratégie performante"
                >
                    <div className="case-study-box">
                        <div className="case-study-header">
                            <div className="case-study-persona">Samir, 42 ans, Cadre Supérieur</div>
                            <p style={{ color: 'var(--color-text-muted)' }}>Objectif : Protéger son train de vie de famille et préparer son héritage.</p>
                        </div>

                        <div className="case-study-grid">
                            <div className="case-study-item">
                                <span className="case-study-label">Effort Mensuel</span>
                                <span className="case-study-value">450 €</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Économie d'impôt Annuelle</span>
                                <span className="case-study-value">1 620 €*</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Horizon</span>
                                <span className="case-study-value">22 ans</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Allocation</span>
                                <span className="case-study-value">DYNAMIQUE ÉTHIQUE</span>
                            </div>
                        </div>

                        <div className="case-study-comparison">
                            <div className="comparison-chart-bar">
                                <div className="bar-visual secondary" style={{ height: '80px' }}></div>
                                <span className="comparison-label">Livret A (Épargne Standard)</span>
                                <div style={{ marginTop: '5px', fontWeight: 'bold' }}>142 000 €</div>
                            </div>
                            <div className="comparison-chart-bar">
                                <div className="bar-visual primary" style={{ height: '180px' }}></div>
                                <span className="comparison-label">Stratégie PER Amana (Optimisée)</span>
                                <div style={{ marginTop: '5px', fontWeight: 'bold', color: 'var(--color-brass-dark)' }}>315 000 €**</div>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2rem', fontStyle: 'italic' }}>
                            * Sur la base d'une TMI à 30%. ** Simulation basée sur un rendement cible de 5,5% net. Les performances passées ne garantissent pas les résultats futurs.
                        </p>
                    </div>
                </ContentSection>

                <ContentSection
                    label="Solutions"
                    title="Les piliers de votre complément de revenu"
                >
                    <div className="tools-grid">
                        {tools.map((tool, index) => (
                            <ToolCard key={index} {...tool} />
                        ))}
                    </div>
                    <div style={{ marginTop: 'var(--space-16)', padding: 'var(--space-10)', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-brass)' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: '#444b3f', marginBottom: 'var(--space-6)', fontWeight: 'bold' }}>
                            Retraite et Finance Islamique : concilier éthique et performance
                        </h3>
                        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text)', lineHeight: '1.8', marginBottom: 'var(--space-4)' }}>
                            Chez Amana Patrimoine, nos conseillers sont formés aux principes de la finance islamique (charia compatible) et au fiqh al muamallat (droit musulman des transaction). Nos experts s'assurent que vos opérations soient conformes à l'éthique musulmane, sans intérêt (riba) et sans investissement dans des activités illicites (haram).
                        </p>
                        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text)', lineHeight: '1.8' }}>
                            Investissement, immobilier, succession, structuration : nous construisons une stratégie patrimoniale de conviction et responsable, validée par des spécialistes de la finance islamique pour concilier performance et conformité à vos valeurs.
                        </p>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Questions Fréquentes"
                    title="Tout comprendre sur la retraite éthique"
                >
                    <FAQ items={faqs} />
                </ContentSection>

                <ReassuranceBlock />

                <CTASection />
            </main>
            <Footer />
        </>
    );
}
