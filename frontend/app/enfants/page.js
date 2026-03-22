import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { buildBreadcrumbJsonLd, buildServiceJsonLd, buildFaqJsonLd } from '../../lib/seo';
import EnfantsFaqItem from './FaqItem';

export const metadata = {
    title: "Épargne Enfants & Financement des Études | Amana Patrimoine",
    description: "Préparez l'avenir de vos enfants avec des solutions d'épargne conformes à la finance islamique. Assurance-vie, SCPI, épargne programmée. CGP indépendant Paris.",
};

const faqItems = [
    {
        question: "À quel âge ouvrir un contrat pour mon enfant ?",
        answer: "Dès la naissance. Plus le contrat est ouvert tôt, plus vous bénéficiez de la puissance des intérêts composés et de l'antériorité fiscale (notamment pour l'assurance-vie après 8 ans). Un contrat ouvert à la naissance aura 18 ans d'ancienneté au moment des études, ce qui offre une fiscalité très avantageuse.",
    },
    {
        question: "Est-ce que l'argent appartient à l'enfant ?",
        answer: "Oui, les fonds versés sur un contrat au nom d'un mineur lui appartiennent. Toutefois, les parents en assurent la gestion légale jusqu'à sa majorité. Il est possible d'ajouter une clause de pacte adjoint pour encadrer l'âge de mise à disposition des fonds (par exemple jusqu'à 25 ans, le temps qu'il termine ses études).",
    },
    {
        question: "Comment garantir que l'épargne est éthique ?",
        answer: "Nous sélectionnons uniquement des supports certifiés Shariah Compliant ou ISR (Investissement Socialement Responsable) qui excluent les secteurs comme l'armement, le tabac, l'alcool ou la spéculation bancaire classique. Tous nos supports sont validés par des comités charia reconnus.",
    },
];

export default function EnfantsPage() {
    const breadcrumb = buildBreadcrumbJsonLd([{ name: "Épargne enfants & financement des études", slug: 'enfants' }]);
    const service = buildServiceJsonLd("Épargne Enfants Halal", "Solutions d'épargne pour financer les études de vos enfants conformément à la finance islamique.", 'enfants');
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
                    backgroundImage: 'url("/Site 30.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="container">
                        <div className="page-hero-content">
                            <span className="page-hero-badge">Famille</span>
                            <h1 className="page-hero-title">Financer les études de ses enfants : préparez leur avenir dès maintenant</h1>
                            <p className="page-hero-subtitle">
                                L'arrivée d'un enfant est une magnifique nouvelle. Prévoir en amont les dépenses à venir permet d'ouvrir toutes les portes à son enfant. Les dépenses importantes que représentent les études, un échange universitaire à l'étranger, le permis de conduire s'anticipent dès les premières années de vie de l'enfant.
                            </p>
                            <a href="https://calendly.com/amana-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="btn btn-white-outline">
                                Prendre rendez-vous
                            </a>
                        </div>
                    </div>
                </section>

                {/* Besoins */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Besoins</span>
                            <h2 className="section-title">Comprendre les besoins futurs</h2>
                        </div>
                        <div className="content-section-body" style={{ marginTop: '2rem', maxWidth: '760px' }}>
                            <div className="text-content">
                                <p>En France, on estime que le budget global consacré par les familles françaises aux études supérieures est d'environ <strong>7 000 à 8 000 € par an et par enfant</strong> en moyenne. Ce montant varie en fonction des écoles et du choix d'étude de chacun.</p>
                                <p>Cela est sans compter les dépenses connexes : permis de conduire (environ 1 500 €), première voiture, voyages linguistiques, matériel informatique, logement étudiant si l'enfant quitte la ville natale.</p>
                                <p>À 18 ans, les besoins financiers s'accélèrent brutalement. Une épargne régulière commencée à la naissance représente un capital substantiel à la majorité, grâce à l'effet de capitalisation.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Prêt étudiant */}
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Prêt étudiant</span>
                            <h2 className="section-title">Pourquoi ne pas compter sur le prêt étudiant ?</h2>
                        </div>
                        <div className="content-section-body" style={{ marginTop: '2rem', maxWidth: '760px' }}>
                            <div className="text-content">
                                <p>Bien qu'encore largement plébiscité, le prêt étudiant présente de nombreux défauts. Beaucoup s'y refusent pour des raisons religieuses. Nos conseillers en gestion de patrimoine sont formés à la finance islamique et sauront vous aiguiller vers des solutions excluant totalement les taux d'intérêt (riba).</p>
                                <p>En dehors de ces considérations éthiques, commencer sa vie professionnelle en s'endettant est loin d'être optimal. Le marché du travail n'est pas toujours au beau fixe, certains souhaitent se lancer dans l'entrepreneuriat ou voyager après leurs études.</p>
                                <p>Anticiper une épargne afin de financer ces dépenses, c'est s'assurer la sérénité, l'autonomie et la transmission de valeurs.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Simulateur */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Simulateur</span>
                            <h2 className="section-title">L'effet du temps sur l'épargne</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2.5rem', maxWidth: '860px', margin: '2.5rem auto 0' }}>
                            {[
                                {
                                    label: 'Simulation 1', sublabel: 'Investissement peu risqué',
                                    color: 'var(--color-forest)',
                                    stats: [
                                        { k: 'Investissement initial', v: '1 000 €' },
                                        { k: 'Épargne mensuelle', v: '100 €' },
                                        { k: 'Durée d\'épargne', v: '18 ans' },
                                        { k: 'Rendement net', v: '5%' },
                                    ],
                                    result: '37 375 €',
                                    versements: '22 600 €',
                                    benefice: '14 775 €',
                                },
                                {
                                    label: 'Simulation 2', sublabel: 'Investissement dynamique',
                                    color: 'var(--color-brass-dark)',
                                    stats: [
                                        { k: 'Investissement initial', v: '1 000 €' },
                                        { k: 'Épargne mensuelle', v: '150 €' },
                                        { k: 'Durée d\'épargne', v: '18 ans' },
                                        { k: 'Rendement net', v: '8%' },
                                    ],
                                    result: '76 213 €',
                                    versements: '33 400 €',
                                    benefice: '42 813 €',
                                },
                            ].map((sim) => (
                                <div key={sim.label} style={{ background: '#fff', border: '1px solid var(--color-warm-200)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                                    <div style={{ background: sim.color, padding: '1.25rem 1.5rem' }}>
                                        <p style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', margin: 0 }}>{sim.label}</p>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0 }}>{sim.sublabel}</p>
                                    </div>
                                    <div style={{ padding: '1.25rem 1.5rem' }}>
                                        {sim.stats.map((s) => (
                                            <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-warm-100)' }}>
                                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{s.k}</span>
                                                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{s.v}</span>
                                            </div>
                                        ))}
                                        <div style={{ marginTop: '1rem', background: 'var(--color-warm-50)', borderRadius: '8px', padding: '1rem' }}>
                                            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capital final</p>
                                            <p style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, color: sim.color, fontFamily: 'var(--font-heading)', margin: 0 }}>{sim.result}</p>
                                        </div>
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                <span>Versements cumulés</span><span>{sim.versements}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>Bénéfice investissement</span><span style={{ color: 'var(--color-brass-dark)', fontWeight: 600 }}>{sim.benefice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>* Les performances passées ne préjugent pas des performances futures. Simulations à titre indicatif.</p>
                    </div>
                </section>

                {/* Épargne */}
                <section className="content-section content-section-beige">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Épargne</span>
                            <h2 className="section-title">Mettre en place une épargne dès la naissance</h2>
                        </div>
                        <div className="content-section-body" style={{ marginTop: '2rem', maxWidth: '760px' }}>
                            <div className="text-content">
                                <p>Chez Amana Patrimoine, nous vous conseillons de mettre en place une épargne au nom de votre enfant dont l'argent fructifiera jusqu'au moment de ses études. Un horizon de 18 ans permet de profiter pleinement de la capitalisation de vos contrats.</p>
                                <p>Cet horizon long terme permet également de lisser les potentielles mauvaises performances d'investissement. L'importance de la régularité : investir automatiquement chaque mois. Le réinvestissement des profits permet d'obtenir un effet boule de neige et d'atteindre au plus vite son objectif, c'est ce qu'on appelle la capitalisation.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solutions */}
                <section className="content-section">
                    <div className="container">
                        <div className="content-section-header">
                            <span className="section-label">Solutions</span>
                            <h2 className="section-title">Comment épargner pour ses enfants ?</h2>
                        </div>
                        <div className="content-cards-grid" style={{ marginTop: '2rem' }}>
                            {[
                                {
                                    title: "Assurance-vie au nom de l'enfant",
                                    desc: "Ouvrir un contrat d'assurance-vie au nom de votre enfant dès sa naissance permet de bénéficier de la fiscalité avantageuse et de l'effet capitalisation. L'argent versé appartient à l'enfant, mais les parents en assurent la gestion légale jusqu'à sa majorité. Nous proposons des contrats investis sur des fonds conformes aux normes de finance islamique, validés par des Shariah Boards.",
                                },
                                {
                                    title: "SCPI en démembrement",
                                    desc: "Investir dans l'immobilier progressivement, sans fiscalité immédiate. Les SCPI en démembrement permettent d'acquérir la nue-propriété de parts immobilières. Pendant la période de démembrement (généralement 5 à 10 ans), vous ne percevez pas de revenus, donc vous ne payez pas d'impôt. À l'issue, vous récupérez la pleine propriété sans frais supplémentaires.",
                                },
                                {
                                    title: "Épargne programmée",
                                    desc: "Versements automatiques mensuels pour profiter de l'effet capitalisation. En programmant un virement automatique chaque mois (100 €, 150 €, 200 € selon vos capacités), vous mettez en place une discipline d'investissement. Le lissage du risque permet de moyenner le prix d'achat et de réduire l'impact des fluctuations du marché.",
                                },
                            ].map((sol, i) => (
                                <div key={i} className="content-card-item">
                                    <div className="content-card-icon">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                                        </svg>
                                    </div>
                                    <div className="content-card-body">
                                        <h3 className="content-card-title">{sol.title}</h3>
                                        <div className="content-card-divider" />
                                        <p className="content-card-desc">{sol.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="faq-section">
                    <div className="container">
                        <div className="faq-header">
                            <span className="section-label">FAQ</span>
                            <h2 className="section-title">Questions fréquentes des parents</h2>
                        </div>
                        <div className="faq-list">
                            {faqItems.map((item, i) => (
                                <EnfantsFaqItem key={i} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-section" id="contact">
                    <div className="container">
                        <div className="cta-content">
                            <h2 className="cta-title">Parlons de l'avenir de vos enfants</h2>
                            <p className="cta-desc">Vous souhaitez préparer les études de vos enfants ? Investir progressivement et sereinement ? Respecter vos convictions éthiques ?</p>
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
