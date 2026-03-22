import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { buildMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';
import ImmobilierFaqItem from './FaqItem';

export const metadata = {
    title: 'SCPI Halal & Immobilier Islamique : Investir sans Riba',
    description: "Investissez dans l'immobilier halal : SCPI conformes à la finance islamique, financement sans riba, SCI, locatif éthique. Conseil CGP indépendant Paris.",
};

const faqItems = [
    {
        question: "Comment commencer à investir dans l'immobilier ?",
        answer: "Il existe diverses stratégies pour commencer à investir dans l'immobilier. La stratégie d'investissement dépend d'une multitude de facteurs : budget, localisation, objectifs, temps disponible pour la gestion, aversion au risque. Nos conseillers en gestion de patrimoine commenceront par réaliser un bilan patrimonial complet et par définir vos objectifs afin de vous accompagner au mieux. Par la suite, la stratégie à adopter et des opportunités d'investissement pourront vous être présentées.",
    },
    {
        question: "Qui peut investir dans l'immobilier ?",
        answer: "Tout le monde peut investir dans l'immobilier, sans avoir recours à l'emprunt avec intérêt. L'investissement immobilier via SCPI est accessible avec un ticket d'entrée modéré et des versements mensuels programmés. Nous vous proposons des stratégies patrimoniales correspondant à vos objectifs en fonction de vos capacités.",
    },
    {
        question: "Comment investir dans l'immobilier en conformité avec les normes de finance islamique ?",
        answer: "L'investissement dans la pierre est un investissement rassurant car très concret. Il fait ainsi partie des placements préférés des grandes fortunes. La finance islamique permet l'investissement immobilier, à la fois dans le neuf, dans l'ancien, dans des fonds immobiliers, dans de la location gérée et autres types d'investissement immobilier. Les outils à notre disposition sont variés et nul besoin d'avoir recours au prêt à intérêt (riba).",
    },
    {
        question: "Comment financer un bien immobilier ?",
        answer: "Dans nos stratégies patrimoniales, nous pouvons accompagner sur les différents modes de financement disponibles en finance islamique, bien que nous ne soyons pas nous-même financeurs. Nous pouvons vous accompagner sur la structuration de vos contrats de financement, proposer des solutions de financement Shariah Compliant dans vos stratégies patrimoniales (Mourabaha, Istithna, Musharaka). Prenons rendez-vous pour parler de vos projets.",
    },
];

export default function ImmobilierPage() {
    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'SCPI halal & immobilier islamique', slug: 'immobilier' }]);
    const service = buildServiceJsonLd('Investissement Immobilier Halal', 'Conseil en investissement immobilier halal : SCPI conformes, financement islamique, SCI, locatif éthique.', 'immobilier');
    const faqJsonLd = buildFaqJsonLd(faqItems);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <Header />
            <main id="main-content">

                {/* Hero */}
                <section className="page-hero page-hero-has-bg" style={{
                    backgroundImage: 'url("/edu-paris.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="container">
                        <div className="page-hero-content">
                            <span className="page-hero-badge">Investissement Immobilier</span>
                            <h1 className="page-hero-title">Investir dans l'immobilier : un pilier incontournable du patrimoine</h1>
                            <p className="page-hero-subtitle">
                                L'immobilier occupe une place centrale dans une stratégie patrimoniale. Il permet un investissement tangible, stable et de générer une rente récurrente. L'investissement immobilier ne se fait pas d'une seule façon. En fonction de votre profil, de votre appétence au risque, de vos moyens et de nombreux facteurs, la stratégie change du tout au tout. Face à toutes les possibilités, à la complexité des montages, aux freins juridiques, fiscaux et financiers, il est nécessaire de se faire accompagner par un professionnel.
                            </p>
                            <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white-outline">
                                Prendre rendez-vous
                            </a>
                        </div>
                    </div>
                </section>

                {/* Approche */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-grid">
                            <div className="content-section-main">
                                <div className="content-section-header">
                                    <span className="section-label">Notre approche</span>
                                    <h2 className="section-title">Une approche indépendante, personnalisée et éthique</h2>
                                </div>
                                <div className="content-section-body">
                                    <div className="text-content">
                                        <p>Amana Patrimoine accompagne ses clients avec une démarche indépendante, sur-mesure et éthique.</p>
                                        <p><strong>Nous sommes indépendants :</strong> nous travaillons avec des partenaires qualifiés que nous choisissons parce qu'ils conviennent à notre clientèle. Nous n'avons pas de biais commercial et une liberté totale dans la sélection des solutions. Notre priorité est votre satisfaction.</p>
                                        <p><strong>Notre accompagnement est sur-mesure :</strong> nous débutons chaque mission par une analyse détaillée de vos besoins et de votre profil afin de vous proposer un accompagnement le plus adapté possible. Chaque détail compte : objectifs, budget, situation familiale, fiscalité.</p>
                                        <p><strong>Nous respectons vos convictions :</strong> notre équipe peut vous accompagner sur des montages conformes à la finance islamique pour financer vos différents projets immobiliers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Méthodologie */}
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Méthodologie</span>
                            <h2 className="section-title">Un accompagnement global, du conseil à la concrétisation</h2>
                        </div>
                        <div className="content-section-body" style={{ marginTop: '2rem' }}>
                            <div className="content-steps-cards content-steps-grid">
                                {[
                                    { num: '01', title: 'Audit patrimonial et définition des objectifs', desc: 'Comprendre votre situation personnelle, vos objectifs patrimoniaux, vos contraintes éthiques ou fiscales.' },
                                    { num: '02', title: 'Élaboration de la stratégie', desc: 'Choix de la bonne solution : rendement, défiscalisation, localisation, transmission, diversification.' },
                                    { num: '03', title: 'Mise en œuvre', desc: 'Accompagnement pour les démarches : recherche de biens, montage juridique, financement. Mise en relation avec des partenaires de confiance (promoteurs, notaires, banques, SCPI).' },
                                    { num: '04', title: 'Suivi dans le temps', desc: 'Optimisation continue. Conseil sur la transmission ou la revente.' },
                                ].map((step) => (
                                    <div key={step.num} className="content-step-card">
                                        <span className="content-step-number">{step.num}</span>
                                        <h3 className="content-step-title">{step.title}</h3>
                                        <hr className="content-step-divider" />
                                        <p className="content-step-desc">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solutions */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Solutions</span>
                            <h2 className="section-title">Une expertise large, couvrant l'ensemble des possibilités immobilières</h2>
                        </div>
                        <div className="content-section-body" style={{ marginTop: '2rem' }}>
                            <div className="content-cards-grid">
                                {[
                                    { title: 'Résidence principale', desc: 'Accompagnement sur l\'achat, la fiscalité et la transmission.' },
                                    { title: 'Investissement locatif direct', desc: 'Location nue ou meublée (LMNP), optimisation fiscale (déficit foncier, amortissement), structuration via société civile immobilière (SCI) si nécessaire.' },
                                    { title: 'Dispositifs fiscaux', desc: 'Pinel, Malraux, Monuments historiques.' },
                                    { title: 'SCPI', desc: 'Investissement de manière progressive et accessible, avec des versements mensuels programmés dans l\'immobilier professionnel, totalement conforme aux normes de finance islamique (sans intérêt, sans placement de trésorerie), respectant les normes ESG.' },
                                    { title: 'Création et structuration de SCI', desc: 'Pour faciliter l\'achat collectif ou transmettre efficacement.' },
                                    { title: 'Immobilier à l\'étranger', desc: 'Accompagnement juridique et fiscal, gestion des risques de succession internationale.' },
                                    { title: 'Déclarations et régularisations', desc: 'IFI (Impôt sur la Fortune Immobilière), mise en conformité juridique et fiscale.' },
                                ].map((item, i) => (
                                    <div key={i} className="content-card-item">
                                        <div className="content-card-icon">
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                                            </svg>
                                        </div>
                                        <div className="content-card-body">
                                            <h3 className="content-card-title">{item.title}</h3>
                                            <div className="content-card-divider" />
                                            <p className="content-card-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Finance Islamique */}
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Finance Islamique</span>
                            <h2 className="section-title">Finance islamique et immobilier</h2>
                        </div>
                        <div className="content-section-body" style={{ marginTop: '2rem' }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Nos SCPI font l'objet d'un audit de conformité par des comités charia (Shariah Board) reconnus.</p>
                            <p style={{ marginBottom: '1rem' }}>Nous garantissons :</p>
                            <div className="highlight-box">
                                <p>✓ L'absence de financement par la dette bancaire</p>
                                <p>✓ Le respect des critères ESG (Environnementaux, Sociaux et de bonne Gouvernance)</p>
                                <p>✓ La sélection rigoureuse d'activités locatives conformes (pas de banques, d'assurances, de bars, de casinos)</p>
                                <p>✓ Un investissement totalement conforme aux normes de la finance islamique</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="faq-section">
                    <div className="container">
                        <div className="faq-header">
                            <span className="section-label">FAQ</span>
                            <h2 className="section-title">Questions fréquentes sur l'investissement immobilier</h2>
                        </div>
                        <div className="faq-list">
                            {faqItems.map((item, i) => (
                                <ImmobilierFaqItem key={i} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reassurance */}
                <section className="reassurance-section">
                    <div className="container">
                        <div className="reassurance-grid">
                            {[
                                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Conseil expert', desc: 'Accompagnement par nos experts patrimoniaux et financiers.' },
                                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>, title: 'Sur-mesure', desc: 'Un suivi personnalisé pour atteindre vos objectifs.' },
                                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, title: 'Secret professionnel', desc: 'Confidentialité rigoureuse et protection de votre sphère privée patrimoniale.' },
                            ].map((item, i) => (
                                <div key={i} className="reassurance-item">
                                    <div className="reassurance-icon-circle">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-section" id="contact">
                    <div className="container">
                        <div className="cta-content">
                            <h2 className="cta-title">Parlons de votre projet immobilier</h2>
                            <p className="cta-desc">Vous souhaitez investir dans l'immobilier ? Optimiser votre fiscalité ? Construire une stratégie conforme à vos convictions ?</p>
                            <p className="cta-desc" style={{ marginTop: '0.5rem' }}>Prenez rendez-vous pour un premier échange gratuit et sans engagement.</p>
                            <div className="cta-buttons">
                                <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                                    Prendre rendez-vous
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}

