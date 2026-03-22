import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';
import RetraiteFaqItem from './FaqItem';

export const metadata = {
    title: "Retraite Islamique & PER Halal : Préparez l'Avenir sans Riba",
    description: "Préparez votre retraite islamique avec un PER halal, une SCPI conforme ou une assurance-vie éthique. Conseil CGP expert en finance islamique à Paris.",
};

const faqItems = [
    {
        question: "Qu'est-ce qui rend un PER éthique ?",
        answer: "Un PER est considéré comme éthique quand il investit uniquement sur des supports conformes à la finance islamique : fonds actions excluant les secteurs interdits, SCPI sans dette bancaire, obligations sukuk. Ces supports sont validés par des comités charia (Shariah Board) qui vérifient la conformité des investissements et des contrats. Tous nos PER respectent ces critères et sont audités par des experts en finance islamique.",
    },
    {
        question: "Puis-je retirer mon capital avant la retraite ?",
        answer: "Cela dépend du support. Le PER bloque le capital jusqu'à la retraite, sauf pour l'achat de la résidence principale ou en cas d'accident de la vie (invalidité, décès du conjoint, surendettement, expiration des droits au chômage). L'assurance-vie, elle, est totalement liquide : vous pouvez retirer votre argent à tout moment, sans condition.",
    },
    {
        question: "L'avantage fiscal du PER est-il immédiat ?",
        answer: "Oui, absolument. Les versements effectués en 2025 sont déductibles de vos revenus imposables déclarés en 2026. Si vous versez 10 000 € et que vous êtes dans la tranche à 30%, vous économisez 3 000 € d'impôt dès l'année suivante.",
    },
];

const solutions = [
    {
        title: "Le PER (Plan d'Épargne Retraite)",
        desc: "Le plan d'épargne retraite est devenu l'outil de référence pour préparer sa retraite tout en réduisant ses impôts. Les versements effectués sur un PER sont déductibles de vos revenus imposables, dans la limite d'un plafond annuel.",
        features: ['Déductibilité fiscale immédiate', 'Supports conformes finance islamique', 'Sortie en capital ou rente'],
    },
    {
        title: 'Les SCPI',
        desc: "Les SCPI permettent d'investir dans l'immobilier professionnel avec un ticket d'entrée accessible. Vous percevez des revenus trimestriels sous forme de loyers, sans avoir à gérer vous-même les biens.",
        features: ['Revenus trimestriels', 'Sans dette bancaire', 'Conformité Shariah'],
    },
    {
        title: "L\u2019assurance-vie",
        desc: "L'assurance-vie reste l'un des placements préférés des Français : fiscalité avantageuse après 8 ans, souplesse totale, transmission optimisée hors succession.",
        features: ['Capital disponible à tout moment', 'Fonds conformes sans riba', 'Transmission optimisée'],
    },
    {
        title: "L\u2019investissement immobilier locatif",
        desc: "Investir dans l'immobilier locatif permet de se constituer une rente régulière et de valoriser son capital sur le long terme. La location meublée non professionnelle (LMNP) offre une fiscalité avantageuse.",
        features: ['Rente régulière', 'Valorisation du capital', 'Fiscalité LMNP avantageuse'],
    },
];

export default function RetraitePage() {
    const breadcrumb = buildBreadcrumbJsonLd([{ name: 'Retraite islamique & PER halal', slug: 'retraite' }]);
    const service = buildServiceJsonLd('Retraite Islamique & PER Halal', 'Conseil en préparation de retraite islamique : PER halal, SCPI conformes, assurance-vie éthique.', 'retraite');
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
                    backgroundImage: 'url("/hero-retraite.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="container">
                        <div className="page-hero-content">
                            <span className="page-hero-badge">Préparation Retraite</span>
                            <h1 className="page-hero-title">Préparer sa retraite avec des solutions conformes à la finance islamique</h1>
                            <p className="page-hero-subtitle">
                                Le système de retraite par répartition ne suffira pas à maintenir votre niveau de vie. Pour les cadres, la baisse de revenus au moment du départ à la retraite peut atteindre 40 à 50%. Anticiper cette baisse en se constituant un complément de retraite, c'est reprendre la main sur son avenir.
                            </p>
                            <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white-outline">
                                Prendre rendez-vous
                            </a>
                        </div>
                    </div>
                </section>

                {/* Pourquoi préparer */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-grid">
                            <div className="content-section-main">
                                <div className="content-section-header">
                                    <span className="section-label">Pourquoi agir maintenant</span>
                                    <h2 className="section-title">Pourquoi préparer sa retraite dès maintenant ?</h2>
                                </div>
                                <div className="content-section-body">
                                    <div className="text-content">
                                        <p>Plus vous commencez tôt, plus l'effet de capitalisation joue en votre faveur. Un versement de 200 € par mois sur 25 ans peut générer un capital bien supérieur à la somme des versements, grâce au réinvestissement des gains.</p>
                                        <p>Les pensions de retraite sont en baisse. Le montant moyen d'une pension est souvent bien inférieur au dernier salaire perçu, ce qui oblige à revoir son train de vie à la baisse. Le départ à la retraite est également repoussé, mais les projets de vie n'attendent pas.</p>
                                        <p>Il existe des solutions d'épargne défiscalisantes. Le plan d'épargne retraite (PER) permet par exemple de déduire les versements de vos revenus imposables, ce qui représente une économie d'impôt immédiate.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Étude de cas */}
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Étude de Cas</span>
                            <h2 className="section-title">Exemple concret : l'impact d'une stratégie anticipée</h2>
                        </div>
                        <div style={{ marginTop: '2.5rem', maxWidth: '760px', margin: '2.5rem auto 0' }}>
                            <div style={{ background: 'var(--color-forest)', color: '#fff', borderRadius: '12px', padding: '2rem 2.5rem', marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-brass-light)', marginBottom: '0.25rem' }}>Samir, 42 ans — Cadre Supérieur</p>
                                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Objectif : Préparer sa retraite tout en réduisant ses impôts</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                {[
                                    { label: 'Effort Mensuel', value: '450 €' },
                                    { label: 'Économie d\'impôt Annuelle', value: '1 620 €*' },
                                    { label: 'Horizon', value: '22 ans' },
                                    { label: 'Allocation', value: 'Dynamique éthique' },
                                ].map((stat) => (
                                    <div key={stat.label} style={{ background: '#fff', border: '1px solid var(--color-warm-200)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{stat.label}</p>
                                        <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-forest)', fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: '#fff', border: '1px solid var(--color-warm-200)', borderRadius: '8px', padding: '1.5rem 2rem' }}>
                                <p style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--color-forest)' }}>Résultats comparatifs</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--color-warm-100)' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Livret A (épargne standard)</span>
                                    <span style={{ fontWeight: 600 }}>142 000 €</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0' }}>
                                    <span style={{ color: 'var(--color-forest)', fontWeight: 500 }}>Stratégie PER Amana (optimisée)</span>
                                    <span style={{ fontWeight: 700, color: 'var(--color-brass-dark)', fontSize: '1.1rem' }}>315 000 €**</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', lineHeight: 1.5 }}>* Sur la base d'une tranche marginale d'imposition à 30%. ** Simulation basée sur un rendement cible de 5,5% net. Les performances passées ne garantissent pas les résultats futurs.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solutions */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Solutions</span>
                            <h2 className="section-title">Les solutions pour préparer votre retraite</h2>
                        </div>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            Chez Amana Patrimoine, nous vous accompagnons dans la construction d'une stratégie de retraite personnalisée, performante et conforme aux principes de la finance islamique.
                        </p>
                        <div className="content-cards-grid">
                            {solutions.map((sol, i) => (
                                <div key={i} className="content-card-item">
                                    <div className="content-card-icon">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
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

                {/* Finance islamique */}
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Finance Islamique</span>
                            <h2 className="section-title">Retraite et finance islamique : comment ça marche ?</h2>
                        </div>
                        <div style={{ maxWidth: '720px', margin: '2rem auto 0' }}>
                            <p style={{ marginBottom: '1.5rem' }}>Préparer sa retraite en respectant les principes de la finance islamique, c'est possible. Nos conseillers sont formés à la finance islamique et au fiqh al-mu'amalat (droit musulman des transactions).</p>
                            <div className="highlight-box">
                                <p>✓ <strong>Absence totale d'intérêt (riba).</strong> Les supports d'investissement ne génèrent pas de revenus liés à l'usure.</p>
                                <p>✓ <strong>Exclusion des secteurs interdits.</strong> Pas d'investissement dans l'alcool, le porc, l'armement, les banques conventionnelles, les jeux de hasard, la pornographie.</p>
                                <p>✓ <strong>Validation par des comités charia.</strong> Tous les fonds et SCPI que nous proposons sont audités par des Shariah Boards reconnus au niveau international.</p>
                                <p>✓ <strong>Adossement à des actifs réels.</strong> Les investissements sont liés à l'économie réelle (immobilier, entreprises), pas à de la spéculation pure.</p>
                                <p>✓ <strong>Partage équitable du risque.</strong> Contrairement aux produits bancaires classiques, le risque est partagé entre l'investisseur et le gestionnaire.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="faq-section">
                    <div className="container">
                        <div className="faq-header">
                            <span className="section-label">FAQ</span>
                            <h2 className="section-title">Questions fréquentes sur la préparation de la retraite</h2>
                        </div>
                        <div className="faq-list">
                            {faqItems.map((item, i) => (
                                <RetraiteFaqItem key={i} item={item} />
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
                            <h2 className="cta-title">Parlons de votre retraite</h2>
                            <p className="cta-desc">Vous souhaitez préparer votre retraite intelligemment ? Réduire vos impôts tout en investissant selon vos convictions ?</p>
                            <p className="cta-desc" style={{ marginTop: '0.5rem' }}>Prenez rendez-vous pour un premier échange gratuit. Nous analysons votre situation et vous proposons une stratégie adaptée à vos objectifs.</p>
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
