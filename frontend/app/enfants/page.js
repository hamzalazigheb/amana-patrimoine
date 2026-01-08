import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import ToolCard from '../../components/ToolCard';
import FAQ from '../../components/FAQ';
import ReassuranceBlock from '../../components/ReassuranceBlock';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Avenir des Enfants | Amana Patrimoine',
    description: 'Anticipez les besoins futurs de vos enfants : études, permis, installation. Épargne éthique et performante dès la naissance.',
};

const tools = [
    {
        title: 'Assurance-Vie Mineur',
        description: 'Prenez date dès aujourd\'hui pour offrir à votre enfant un capital disponible à sa majorité avec une fiscalité optimale.',
        features: ['Fonds Shariah Compliant', 'Libre choix de l\'âge de sortie', 'Gestion supervisée']
    },
    {
        title: 'SCPI en Démembrement',
        description: 'Optimisez la capitalisation sans fiscalité immédiate en acquérant la nue-propriété de parts immobilières.',
        features: ['Zéro impôt pendant l\'épargne', 'Valorisation automatique', 'Actif immobilier solide']
    },
    {
        title: 'Donation de Titres',
        description: 'Transmettez un portefeuille de valeurs mobilières en gommant les plus-values latentes pour vos enfants.',
        features: ['Optimisation fiscale totale', 'Prise de date', 'Éducation financière']
    }
];

const faqs = [
    {
        question: "À quel âge ouvrir un contrat pour mon enfant ?",
        answer: "Dès la naissance. Plus le contrat est ouvert tôt, plus vous bénéficiez de la puissance des intérêts composés et de l'antériorité fiscale (notamment pour l'assurance-vie après 8 ans)."
    },
    {
        question: "Est-ce que l'argent appartient à l'enfant ?",
        answer: "Oui, les fonds versés sur un contrat au nom d'un mineur lui appartiennent. Toutefois, les parents en assurent la gestion légale jusqu'à sa majorité. Il est possible d'ajouter une clause de pacte adjoint pour encadrer l'âge de mise à disposition des fonds (jusqu'à 25 ans)."
    },
    {
        question: "Comment garantir que l'épargne est éthique ?",
        answer: "Nous sélectionnons uniquement des supports certifiés Shariah Compliant ou ISR (Investissement Socialement Responsable) qui excluent les secteurs comme l'armement, le tabac ou la spéculation bancaire classique."
    }
];

export default function EnfantsPage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Famille"
                    title="Préparez l'avenir, semez la réussite"
                    subtitle="L'éducation et l'épanouissement de vos enfants sont vos plus beaux investissements. Nous vous aidons à bâtir les fondations financières de leur future autonomie."
                    image="/edu-vineyard.png"
                    ctaText="Planifier leur avenir"
                />

                <ContentSection
                    label="L'Anticipation"
                    title="Le pouvoir des intérêts composés"
                    intro="Épargner pour ses enfants dès le berceau permet de transformer de petits efforts en leviers majeurs pour leurs projets futurs."
                    image="/hero-nature.png"
                    imageSide="right"
                >
                    <p>
                        À 18 ans, les besoins financiers (études supérieures, premier logement, permis) s'accélèrent brutalement. Une épargne de 100€/mois commencée à la naissance représente un capital substantiel à la majorité, contrairement à un prêt étudiant qui endette leur début de carrière.
                    </p>
                    <div className="highlight-box">
                        <p>« Un enfant né aujourd'hui aura besoin d'un capital autonomie moyen de 45 000 € à ses 20 ans. »</p>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Simulation"
                    title="L'effet du temps sur l'épargne"
                >
                    <div className="case-study-box">
                        <div className="case-study-header">
                            <div className="case-study-persona">Projet "Avenir Serein"</div>
                            <p style={{ color: 'var(--color-text-muted)' }}>Investissement régulier sur un support dynamique éthique.</p>
                        </div>

                        <div className="case-study-grid">
                            <div className="case-study-item">
                                <span className="case-study-label">Versement Mensuel</span>
                                <span className="case-study-value">150 €</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Durée de placement</span>
                                <span className="case-study-value">18 ans</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Total des versements</span>
                                <span className="case-study-value">32 400 €</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Performance Cible</span>
                                <span className="case-study-value">~6% annuel</span>
                            </div>
                        </div>

                        <div className="case-study-comparison">
                            <div className="comparison-chart-bar">
                                <div className="bar-visual secondary" style={{ height: '70px' }}></div>
                                <span className="comparison-label">Livret A (Non risqué)</span>
                                <div style={{ marginTop: '5px', fontWeight: 'bold' }}>~38 000 €</div>
                            </div>
                            <div className="comparison-chart-bar">
                                <div className="bar-visual primary" style={{ height: '160px' }}></div>
                                <span className="comparison-label">Supports Éthiques Amana</span>
                                <div style={{ marginTop: '5px', fontWeight: 'bold', color: 'var(--color-brass-dark)' }}>~57 000 €*</div>
                            </div>
                        </div>
                    </div>
                </ContentSection>

                <ContentSection
                    label="Solutions"
                    title="Une épargne de conviction"
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
                    title="Les questions des parents"
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
