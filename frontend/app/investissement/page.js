import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import ToolCard from '../../components/ToolCard';
import FAQ from '../../components/FAQ';
import ReassuranceBlock from '../../components/ReassuranceBlock';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Investissement Éthique | Amana Patrimoine',
    description: 'Investissement aligné avec vos valeurs. Finance islamique, ISR, ESG. Assurance-vie, PER, SCPI et investissements boursiers conformes.',
};

const principles = [
    {
        title: 'Exclusions Sectorielles',
        description: 'Éviction rigoureuse des secteurs contraires à l\'éthique (armement, alcool, tabac, jeux de hasard).',
        features: ['Zéro Tabac & Alcool', 'Zéro Armement', 'Audit éthique']
    },
    {
        title: 'Interdiction de l\'Usure',
        description: 'Application du principe de non-recours à l\'intérêt financier (Riba) dans tous nos montages.',
        features: ['Financement Murabaha', 'Fonds Shariah Compliant', 'Partage des pertes/profits']
    },
    {
        title: 'Adossement au Réel',
        description: 'Exigence de tangibilité : tout investissement doit être adossé à un actif réel et productif.',
        features: ['Actifs tangibles', 'Économie réelle', 'Zéro spéculation pure']
    }
];

const faqs = [
    {
        question: "Qu'est-ce qu'un fonds 'Shariah Compliant' ?",
        answer: "C'est un support d'investissement qui respecte les principes de la finance islamique. Les entreprises sélectionnées ne doivent pas être endettées au-delà de certains seuils techniques et leurs activités doivent être licites (halal)."
    },
    {
        question: "La performance est-elle au rendez-vous ?",
        answer: "Oui. Historiquement, les indices boursiers éthiques (ex: MSCI World Islamic) affichent des performances comparables, voire supérieures en période de crise, car ils excluent les secteurs très endettés et spéculatifs."
    },
    {
        question: "Comment gérez-vous les dividendes 'impurs' ?",
        answer: "Pour les entreprises ayant une part marginale d'activité non conforme, un processus de 'purification' est mis en place par le gestionnaire de fonds, consistant à reverser cette part à des œuvres caritatives."
    }
];

export default function InvestissementPage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Performance Éthique"
                    title="L'excellence financière, la conscience en plus"
                    subtitle="Nous concilions rigueur financière et principes éthiques. Découvrez une approche de l'investissement où la transparence et la responsabilité sont les clés de la pérennité."
                    image="/edu-heritage.png"
                    ctaText="Auditer mon portefeuille"
                />

                <ContentSection
                    label="La Méthode"
                    title="Une sélection sans concession"
                    intro="Chaque opportunité est passée au crible de filtres éthiques et financiers pour vous garantir une sérénité totale."
                    image="/hero-nature.png"
                    imageSide="right"
                >
                    <p>
                        Notre processus d'investissement repose sur une double analyse. D'une part, une analyse financière poussée pour valider la solidité du projet. D'autre part, un audit de conformité éthique strict mené par des comités spécialisés.
                    </p>
                    <div className="highlight-box">
                        <p>« Un bon investissement doit servir la prospérité de l'investisseur et celle de la société. »</p>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Nos Piliers"
                    title="Le cadre de la finance éthique"
                >
                    <div className="tools-grid">
                        {principles.map((principle, index) => (
                            <ToolCard key={index} {...principle} />
                        ))}
                    </div>
                </ContentSection>

                <ContentSection
                    label="Cas Pratique"
                    title="Allocation Dynamique Éthique"
                    image="/hero-bg.png"
                    imageSide="left"
                >
                    <div className="case-study-box">
                        <div className="case-study-header">
                            <div className="case-study-persona">Profil Investisseur - 200 000 €</div>
                            <p style={{ color: 'var(--color-text-muted)' }}>Répartition type pour un horizon de placement de 10 ans.</p>
                        </div>

                        <div className="case-study-grid">
                            <div className="case-study-item">
                                <span className="case-study-label">Part Actions Halal</span>
                                <span className="case-study-value">40 %</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Immobilier (SCPI Halal)</span>
                                <span className="case-study-value">45 %</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Métaux Précieux / Or</span>
                                <span className="case-study-value">10 %</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Liquidités Éthiques</span>
                                <span className="case-study-value">5 %</span>
                            </div>
                        </div>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Questions"
                    title="Expertise & Transparence"
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
