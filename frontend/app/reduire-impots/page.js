import Header from '../../components/Header';
import PageHero from '../../components/PageHero';
import ContentSection from '../../components/ContentSection';
import ToolCard from '../../components/ToolCard';
import FAQ from '../../components/FAQ';
import ProfileTable from '../../components/ProfileTable';
import ReassuranceBlock from '../../components/ReassuranceBlock';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Optimisation Fiscale | Amana Patrimoine',
    description: 'Stratégies patrimoniales pour réduire votre impôt de manière éthique et légale. Vision globale de la fiscalité.',
};

const profiles = [
    { profile: 'Réduire l\'Impôt sur le Revenu (IR)', solutions: 'PER Halal, GFI, Dons éthiques' },
    { profile: 'Éviter les prélèvements sur revenus financiers', solutions: 'Assurance-vie, Contrat de Capitalisation' },
    { profile: 'Optimiser la transmission d\'actifs', solutions: 'Démembrement de propriété, Donation de titres' },
    { profile: 'Maîtriser l\'assiette de l\'IFI', solutions: 'Démembrement, GFI (Groupement Forestier)' }
];

const faqs = [
    {
        question: "Défiscalisation vs Optimisation : quelle différence ?",
        answer: "La défiscalisation cherche la réduction d'impôt à tout prix (souvent avec un risque de perte en capital). L'optimisation, telle que nous la pratiquons, est une structuration intelligente du patrimoine qui génère une économie fiscale comme conséquence d'un bon investissement."
    },
    {
        question: "Le PER est-il le meilleur outil fiscal ?",
        answer: "C'est l'un des plus puissants car il offre une réduction d'impôt proportionnelle à votre TMI (Tranche Marginale d'Imposition). Pour un contribuable à 30% ou 41%, le gain immédiat est massif."
    },
    {
        question: "Peut-on réduire ses impôts de manière éthique ?",
        answer: "Absolument. Investir dans l'économie réelle, la forêt française (GFI) ou préparer sa retraite sur des supports sans Riba sont des actes citoyens et éthiques qui bénéficient aussi d'avantages fiscaux légaux."
    }
];

export default function ImpotsPage() {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    badge="Fiscalité Stratégique"
                    title="L'optimisation au service de votre réussite"
                    subtitle="L'impôt est un paramètre, pas une fatalité. Nous structurons vos actifs pour protéger vos rendements nets et pérenniser votre capital."
                    image="/edu-heritage.png"
                    ctaText="Évaluer mon potentiel fiscal"
                />

                <ContentSection
                    label="Vision Stratégique"
                    title="Le sens avant l'avantage"
                    intro="Une stratégie fiscale pérenne repose sur des actifs de qualité."
                    image="/hero-bg.png"
                    imageSide="right"
                >
                    <p>
                        Chez Amana Patrimoine, nous refusons les produits de "one-shot" fiscal qui ne présentent pas de solidité économique. Nous privilégions l'efficience à long terme, en utilisant des enveloppes juridiques et fiscales robustes pour limiter la pression sur vos revenus et votre capital.
                    </p>
                    <div className="highlight-box">
                        <p>« Payer l'impôt est une obligation, mais ne pas utiliser les levier légaux est une négligence de gestion. »</p>
                    </div>
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="Exemple"
                    title="L'impact du PER sur votre imposition"
                >
                    <div className="case-study-box">
                        <div className="case-study-header">
                            <div className="case-study-persona">Revenu imposable : 80 000 € / an</div>
                            <p style={{ color: 'var(--color-text-muted)' }}>Situation : Célibataire, TMI à 30%.</p>
                        </div>

                        <div className="case-study-grid">
                            <div className="case-study-item">
                                <span className="case-study-label">Versement PER</span>
                                <span className="case-study-value">10 000 €</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Réduction d'impôt immédiate</span>
                                <span className="case-study-value">3 000 €</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Coût réel de l'effort</span>
                                <span className="case-study-value">7 000 €</span>
                            </div>
                            <div className="case-study-item">
                                <span className="case-study-label">Capital investi (Halal)</span>
                                <span className="case-study-value">10 000 €</span>
                            </div>
                        </div>
                    </div>
                </ContentSection>

                <ContentSection
                    label="Synthèse"
                    title="Solutions par profils d'objectifs"
                >
                    <ProfileTable profiles={profiles} />
                </ContentSection>

                <ContentSection
                    background="beige"
                    label="FAQ"
                    title="Tout savoir sur l'optimisation"
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
