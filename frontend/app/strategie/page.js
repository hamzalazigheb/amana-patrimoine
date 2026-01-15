import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import ProfileTable from '../../components/ProfileTable';
import ReassuranceBlock from '../../components/ReassuranceBlock';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Stratégie Patrimoniale | Amana Patrimoine',
    description: 'Construisez une stratégie patrimoniale cohérente, durable et personnalisée. Vision globale pour un avenir maîtrisé avec Amana Patrimoine.',
};

const profiles = [
    { profile: 'Cadre avec forte imposition', solutions: 'PER, SCPI, assurance-vie, immobilier' },
    { profile: 'Jeune actif qui démarre', solutions: 'Assurance-vie, épargne régulière, SCPI' },
    { profile: 'Famille avec enfants', solutions: 'Assurance-vie, démembrement, donation' },
    { profile: 'Entrepreneur', solutions: 'Holding + fonds conformes, PER, fiducie' },
    { profile: 'Retraité avec capital à placer', solutions: 'SCPI, assurance-vie, gestion prudente' }
];

export default function StrategiePage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Stratégie"
                    title="Une vision globale pour un avenir maîtrisé"
                    subtitle="Votre patrimoine mérite une architecture cohérente. Nous organisons vos actifs de manière durable et personnalisée, en parfaite adéquation avec vos aspirations profondes."
                    image="/hero-bg.png"
                />

                <ContentSection
                    label="Notre Philosophie"
                    title="Au-delà des produits, un écosystème"
                    intro="Nous ne nous contentons pas d'empiler des solutions financières. Nous construisons une structure qui donne du sens à votre réussite."
                    image="/hero-nature.png"
                    imageSide="right"
                >
                    <p>
                        Une stratégie patrimoniale sérieuse ne subit pas les modes du marché. Elle s'inscrit dans le temps long et répond à des besoins fondamentaux de protection, de transmission et d'éthique.
                    </p>
                    <div className="highlight-box">
                        <p>« La meilleure stratégie n'est pas la plus complexe, mais la plus fidèle à vos objectifs. »</p>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Notre Méthode"
                    title="Les étapes de la construction"
                    image="/edu-heritage.png"
                    imageSide="left"
                >
                    <div className="method-steps-list">
                        <div className="method-step-item" style={{ marginBottom: '2rem' }}>
                            <h4 style={{ color: 'var(--color-brass)', marginBottom: '0.5rem' }}>01. Diagnostic Global</h4>
                            <p>Analyse exhaustive de votre actif et passif pour identifier les forces et faiblesses de votre structure actuelle.</p>
                        </div>
                        <div className="method-step-item" style={{ marginBottom: '2rem' }}>
                            <h4 style={{ color: 'var(--color-brass)', marginBottom: '0.5rem' }}>02. Définition des objectifs</h4>
                            <p>Clarification de vos priorités : revenus immédiats, capitalisation, transmission ou investissement de sens.</p>
                        </div>
                        <div className="method-step-item">
                            <h4 style={{ color: 'var(--color-brass)', marginBottom: '0.5rem' }}>03. Déploiement stratégique</h4>
                            <p>Arbitrage des solutions patrimoniales et d'investissement pour atteindre vos objectifs.</p>
                        </div>
                    </div>
                </ContentSection>

                <ReassuranceBlock />

                <ContentSection
                    label="Personnalisation"
                    title="Exemples de structuration"
                >
                    <ProfileTable profiles={profiles} />
                </ContentSection>

                <CTASection />
            </main>
            <Footer />
        </>
    );
}
