import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import ToolCard from '../../components/ToolCard';
import FAQ from '../../components/FAQ';
import ReassuranceBlock from '../../components/ReassuranceBlock';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Préparation de Succession | Amana Patrimoine',
    description: 'Transmettez sereinement votre patrimoine. Assurance-vie, donations, testament et solutions conformes à vos valeurs éthiques.',
};

const tools = [
    {
        title: 'L\'Assurance-Vie Transmise',
        description: 'Transmettez jusqu\'à 152 500 € par bénéficiaire hors droits de succession avec une totale liberté de désignation.',
        features: ['Abattements fiscaux majeurs', 'Fonds certifiés sans Riba', 'Clause bénéficiaire sur mesure']
    },
    {
        title: 'Démembrement de Propriété',
        description: 'Donnez la nue-propriété de vos actifs tout en conservant l\'usufruit (jouissance et revenus) de votre vivant.',
        features: ['Réduction des droits de mutation', 'Transmission progressive', 'Protection du conjoint']
    },
    {
        title: 'Assurance-Vie Capitalisation',
        description: 'Optimisez la transmission de la nue-propriété d\'un contrat pour une efficacité fiscale maximale sur le long terme.',
        features: ['Efficacité civile', 'Pérennité des valeurs', 'Sur-mesure juridique']
    }
];

const faqs = [
    {
        question: "Pourquoi préparer sa succession dès 50 ans ?",
        answer: "Le droit français prévoit des abattements sur les donations qui se renouvellent tous les 15 ans. Anticiper permet de 'purger' la fiscalité plusieurs fois de son vivant, économisant potentiellement des centaines de milliers d'euros à ses héritiers."
    },
    {
        question: "Comment concilier droit civil et éthique religieuse ?",
        answer: "Nous utilisons des outils juridiques comme le testament olographe ou authentique et les clauses bénéficiaires démembrées pour que la répartition de vos biens respecte vos volontés profondes (ex: parts successorales spécifiques) tout en restant strictement légale."
    },
    {
        question: "Qu'en est-il de l'assurance-vie après 70 ans ?",
        answer: "Après 70 ans, le cadre fiscal change mais reste avantageux : un abattement global de 30 500 € s'applique sur les primes versées, et les plus-values sont totalement exonérées de droits de succession."
    }
];

export default function SuccessionPage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Succession"
                    title="L'art de transmettre avec sérénité"
                    subtitle="Anticiper sa succession, c'est protéger ceux que l'on aime et assurer la continuité de ses valeurs. Nous vous aidons à organiser votre héritage avec discrétion et efficacité."
                    image="/edu-vineyard.png"
                    ctaText="Organiser mon héritage"
                />

                <ContentSection
                    label="Héritage"
                    title="Plus qu'un capital, une continuité"
                    intro="La transmission est l'acte final d'une gestion patrimoniale réussie. Elle doit être préparée avec soin pour éviter les frottements fiscaux."
                    image="/edu-heritage.png"
                    imageSide="right"
                >
                    <p>
                        Sans anticipation, la loi décide de la répartition de vos biens, souvent au prix d'une fiscalité lourde (jusqu'à 45% en ligne directe) et de situations d'indivision complexes qui peuvent fragiliser l'harmonie familiale.
                    </p>
                    <div className="highlight-box">
                        <p>« Transmettre, c'est semer pour des générations que l'on ne verra pas. Notre rôle est de garantir que chaque graine porte ses fruits. »</p>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Comparatif"
                    title="L'impact de l'anticipation fiscale"
                >
                    <div className="case-study-box">
                        <div className="case-study-header">
                            <div className="case-study-persona">Transmission d'un capital de 500 000 €</div>
                            <p style={{ color: 'var(--color-text-muted)' }}>Simulation pour 2 enfants, actifs immobiliers et financiers cumulés.</p>
                        </div>

                        <div className="case-study-grid">
                            <div className="case-study-item">
                                <span className="case-study-label">Abattement de droit</span>
                                <span className="case-study-value">100 000 € / enfant</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Levier Assurance-Vie</span>
                                <span className="case-study-value">152 500 € / enfant</span>
                            </div>
                        </div>

                        <div className="case-study-comparison">
                            <div className="comparison-chart-bar">
                                <div className="bar-visual secondary" style={{ height: '140px' }}></div>
                                <span className="comparison-label">Sans Anticipation (Droits dus)</span>
                                <div style={{ marginTop: '5px', fontWeight: 'bold' }}>~58 000 € d'impôts</div>
                            </div>
                            <div className="comparison-chart-bar">
                                <div className="bar-visual primary" style={{ height: '40px' }}></div>
                                <span className="comparison-label">Avec Stratégie Amana</span>
                                <div style={{ marginTop: '5px', fontWeight: 'bold', color: 'var(--color-brass-dark)' }}>~8 000 € d'impôts*</div>
                            </div>
                        </div>
                    </div>
                </ContentSection>

                <ContentSection
                    label="Solutions"
                    title="Les outils de la transmission"
                >
                    <div className="tools-grid">
                        {tools.map((tool, index) => (
                            <ToolCard key={index} {...tool} />
                        ))}
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="FAQ"
                    title="Transmission & Conformité"
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
