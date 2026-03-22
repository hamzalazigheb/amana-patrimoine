import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';
import InvestissementFaqItem from './FaqItem';

export const metadata = {
    title: "Investissement Éthique & Placements Halal | Amana Patrimoine",
    description: "Investissez selon vos convictions : placements conformes à la finance islamique, fonds Shariah Compliant, SCPI, PER halal. Conseil CGP indépendant à Paris.",
};

const faqItems = [
    {
        question: "Qu'est-ce qu'un fonds Shariah Compliant ?",
        answer: "Un fonds Shariah Compliant est un fonds d'investissement conforme aux principes de la finance islamique. Il exclut les secteurs interdits (alcool, armement, banques conventionnelles), n'investit pas dans des entreprises trop endettées, et ne génère pas de revenus liés à l'intérêt (riba). Les investissements sont audités par un comité charia (Shariah Board) qui vérifie la conformité des placements.",
    },
    {
        question: "La performance est-elle au rendez-vous ?",
        answer: "Oui. Les études montrent que les fonds éthiques et Shariah Compliant peuvent offrir des performances comparables, voire supérieures aux fonds traditionnels sur le long terme. L'exclusion de certains secteurs à risque (jeux, alcool, tabac) et l'accent mis sur la durabilité peuvent réduire la volatilité. Cependant, comme tout investissement, les performances passées ne garantissent pas les résultats futurs.",
    },
    {
        question: "Comment gérez-vous les dividendes impurs ?",
        answer: "Si une entreprise génère une petite partie de ses revenus via des activités non conformes (généralement moins de 5%), les dividendes correspondants sont considérés comme impurs. Nous calculons cette proportion et vous accompagnons pour reverser cette somme à des œuvres caritatives, conformément aux principes de purification (tazkiya). Cela garantit que votre investissement reste éthique.",
    },
];

const solutions = [
    {
        title: "L'assurance-vie",
        desc: "L'outil préféré des Français pour investir à long terme. L'assurance-vie combine fiscalité avantageuse après 8 ans, souplesse totale, et transmission optimisée.",
        features: ["Abattement annuel 4 600€", "Capital disponible", "Fonds éthiques validés"],
    },
    {
        title: "Le PER (Plan Épargne Retraite)",
        desc: "Préparez votre retraite tout en réduisant vos impôts. Les versements effectués sur un PER sont déductibles du revenu imposable.",
        features: ["Déduction fiscale immédiate", "Supports éthiques", "Capital à la retraite"],
    },
    {
        title: "Les SCPI",
        desc: "Investir dans l'immobilier professionnel de manière accessible. Les SCPI permettent de percevoir des revenus réguliers sous forme de loyers.",
        features: ["Revenus trimestriels", "Sans dette bancaire", "Conformité Shariah"],
    },
    {
        title: "L'immobilier locatif",
        desc: "Se constituer une rente tangible et stable. L'investissement dans l'immobilier locatif permet de générer des revenus réguliers.",
        features: ["Rente régulière", "Fiscalité LMNP", "Structuration SCI"],
    },
    {
        title: "Les marchés financiers",
        desc: "Investir en bourse permet de dynamiser son épargne sur le long terme, à condition d'adopter une approche disciplinée.",
        features: ["Fonds Shariah Compliant", "Validation comités charia", "Diversification"],
    },
    {
        title: "Le Private Equity",
        desc: "Financer l'économie réelle en investissant dans des PME ou start-ups. Le private equity offre un rendement potentiel élevé.",
        features: ["Économie réelle", "Rendement potentiel élevé", "Diversification"],
    },
];

export default function InvestissementPage() {
    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Investissement éthique & placements halal', slug: 'investissement' }]);
    const service = buildServiceJsonLd('Investissement Éthique & Placements Halal', 'Placements conformes à la finance islamique, fonds Shariah Compliant, SCPI, PER halal.', 'investissement');
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
                    backgroundImage: 'url("/edu-heritage.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="container">
                        <div className="page-hero-content">
                            <span className="page-hero-badge">Investissement Éthique</span>
                            <h1 className="page-hero-title">Investir son argent selon ses convictions : finance islamique et placements éthiques</h1>
                            <p className="page-hero-subtitle">
                                Chez Amana Patrimoine, nous pensons qu'une stratégie d'investissement réussie commence par une vision claire de vos objectifs. Nous prenons le temps de comprendre votre situation, vos projets et vos convictions pour vous proposer des solutions adaptées, performantes et conformes aux principes de la finance islamique.
                            </p>
                            <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white-outline">
                                Prendre rendez-vous
                            </a>
                        </div>
                    </div>
                </section>

                {/* Pourquoi investir */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Pourquoi investir</span>
                            <h2 className="section-title">Pourquoi investir ?</h2>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '680px' }}>Les raisons d'investir sont aussi variées que les situations personnelles.</p>
                        <div className="content-cards-grid">
                            {[
                                { title: "Faire fructifier un capital", desc: "Laisser son argent sur un compte courant, c'est le voir perdre de la valeur à cause de l'inflation. Investir permet de préserver et d'augmenter son pouvoir d'achat." },
                                { title: "Préparer un projet à moyen terme", desc: "Achat immobilier, tour du monde, création d'entreprise : certains projets nécessitent de constituer une épargne en amont." },
                                { title: "Financer les études des enfants", desc: "Les frais de scolarité, le logement étudiant, les voyages linguistiques représentent un budget important. Anticiper ces dépenses dès la naissance permet d'éviter le recours au prêt étudiant." },
                                { title: "Se constituer un complément de revenus", desc: "Pour la retraite ou même avant, générer des revenus passifs offre une liberté financière et permet de réaliser des projets sans dépendre uniquement de son salaire." },
                                { title: "Transmettre un patrimoine", desc: "Organiser la transmission de son capital à ses proches, dans un cadre fiscal optimisé et conforme à ses valeurs." },
                            ].map((item, i) => (
                                <div key={i} className="content-card-item">
                                    <div className="content-card-icon">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
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
                </section>

                {/* Principes */}
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Principes</span>
                            <h2 className="section-title">Les grands principes de l'investissement éthique</h2>
                        </div>
                        <div style={{ maxWidth: '720px', margin: '2rem auto 0' }}>
                            <p style={{ marginBottom: '1.5rem' }}>Nous respectons les principes de la finance islamique dans tous nos placements. Cela implique plusieurs critères stricts.</p>
                            <div className="highlight-box">
                                <p>✓ <strong>Pas d'intérêt (riba).</strong> Les revenus générés proviennent de l'activité réelle (loyers, dividendes, plus-values), pas de l'usure.</p>
                                <p>✓ <strong>Exclusion des secteurs interdits.</strong> Nous n'investissons pas dans l'alcool, le porc, l'armement, les banques conventionnelles, les jeux de hasard, la pornographie.</p>
                                <p>✓ <strong>Pas de spéculation excessive (gharar et maysir).</strong> Les investissements sont adossés à des actifs réels et tangibles.</p>
                                <p>✓ <strong>Validation par des comités charia.</strong> Tous les fonds et supports que nous proposons sont audités par des Shariah Boards reconnus au niveau international.</p>
                                <p>✓ <strong>Partage équitable du risque.</strong> L'investisseur et le gestionnaire partagent les risques et les bénéfices.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Méthodologie */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Méthodologie</span>
                            <h2 className="section-title">Notre méthodologie d'investissement</h2>
                        </div>
                        <div className="content-section-body" style={{ marginTop: '2rem' }}>
                            <div className="content-steps-cards content-steps-grid">
                                {[
                                    { num: '01', title: "Analyse de votre situation", desc: "Nous étudions en détail votre situation patrimoniale, vos objectifs et vos contraintes pour vous proposer un accompagnement adapté." },
                                    { num: '02', title: "Définition de votre profil investisseur", desc: "Nous déterminons votre profil de risque, votre horizon d'investissement et vos contraintes éthiques pour construire une stratégie qui vous correspond." },
                                    { num: '03', title: "Stratégie personnalisée", desc: "Nous concevons une stratégie d'investissement sur-mesure alignée avec vos objectifs et vos valeurs : allocation d'actifs optimisée, solutions conformes, diversification adaptée." },
                                    { num: '04', title: "Mise en œuvre et suivi", desc: "Nous vous accompagnons dans la mise en place de votre stratégie et assurons un suivi régulier pour l'ajuster si nécessaire." },
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
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Solutions</span>
                            <h2 className="section-title">Les grands leviers d'investissement</h2>
                        </div>
                        <div className="content-cards-grid" style={{ marginTop: '2rem' }}>
                            {solutions.map((sol, i) => (
                                <div key={i} className="content-card-item">
                                    <div className="content-card-icon">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                                        </svg>
                                    </div>
                                    <div className="content-card-body">
                                        <h3 className="content-card-title">{sol.title}</h3>
                                        <div className="content-card-divider" />
                                        <p className="content-card-desc">{sol.desc}</p>
                                        <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem' }}>
                                            {sol.features.map((f) => (
                                                <li key={f} style={{ fontSize: '0.85rem', color: 'var(--color-brass-dark)', marginBottom: '0.25rem' }}>✓ {f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Convictions */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-grid">
                            <div className="content-section-main">
                                <div className="content-section-header">
                                    <span className="section-label">Convictions</span>
                                    <h2 className="section-title">Comment investir selon ses convictions ?</h2>
                                </div>
                                <div className="content-section-body">
                                    <div className="text-content">
                                        <p>Entre les labels ISR (Investissement Socialement Responsable), les critères ESG (Environnementaux, Sociaux et de bonne Gouvernance), les articles 8 et 9 du règlement SFDR, il n'est pas toujours simple de s'y retrouver.</p>
                                        <p>Notre rôle est de vous accompagner pour identifier des supports alignés avec vos principes. Nous travaillons avec des fonds validés par des comités charia reconnus, qui garantissent la conformité religieuse des investissements.</p>
                                        <p>Vous investissez en toute conscience, sur des actifs qui ont du sens pour vous, tout en visant une performance financière solide.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="faq-section">
                    <div className="container">
                        <div className="faq-header">
                            <span className="section-label">FAQ</span>
                            <h2 className="section-title">Questions fréquentes sur l'investissement éthique</h2>
                        </div>
                        <div className="faq-list">
                            {faqItems.map((item, i) => (
                                <InvestissementFaqItem key={i} item={item} />
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
                            <h2 className="cta-title">Parlons de votre stratégie d'investissement</h2>
                            <p className="cta-desc">Vous souhaitez faire fructifier votre épargne ? Investir en accord avec vos convictions ? Préparer votre retraite ou vos projets futurs ?</p>
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
