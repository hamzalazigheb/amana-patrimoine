'use client';

import { useState } from 'react';
import { DELIVERABLES, TIERS, WHY_AMANA_COLUMNS, CHARIA_PILLARS, TESTIMONIALS, FAQ_ITEMS } from '../../../lib/landing/data';
import { Eyebrow, BtnGold, BtnPrimary, BtnGhost, CheckIcon, StarIcon, ComparisonMark, OliveSprig } from '../ui/primitives';

export function DeliverablesSection() {
    return (
        <section className="lp-section" style={{ background: 'var(--lp-paper)' }}>
            <div className="lp-container">
                <div className="lp-section-head--center">
                    <Eyebrow>Ce qui se passe après le parcours</Eyebrow>
                    <h2 className="lp-h2">
                        Quatre étapes, <em>aucune surprise.</em>
                    </h2>
                    <p className="lp-lead">Du clic « Démarrer » à votre décision finale.</p>
                </div>
                <div className="lp-grid-4">
                    {DELIVERABLES.map((d, i) => (
                        <div key={d.t} className="lp-card">
                            <div className="lp-card__num">0{i + 1}</div>
                            <h3 className="lp-card__title">{d.t}</h3>
                            <p className="lp-card__text">{d.d}</p>
                            <div className="lp-card__tag">{d.tag}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function OffersSection({ urls }) {
    return (
        <section id="offres" className="lp-section lp-offers">
            <div className="lp-container">
                <div className="lp-section-head--center">
                    <Eyebrow>Trois offres · une exigence</Eyebrow>
                    <h2 className="lp-h2">
                        Le bilan vous oriente vers
                        <br />
                        <em>l&apos;offre adaptée.</em>
                    </h2>
                    <p className="lp-lead">
                        Trois niveaux d&apos;accompagnement.
                        Bascule libre entre les offres au fil de votre patrimoine.
                    </p>
                </div>
                <div className="lp-grid-3">
                    {TIERS.map((tier, i) => (
                        <div
                            key={tier.id}
                            className={`lp-tier ${tier.highlight ? 'lp-tier--highlight' : ''}`}
                        >
                            {tier.highlight && (
                                <div className="lp-tier__badge">★ L&apos;offre la plus choisie</div>
                            )}
                            <div className="lp-tier__range">
                                0{i + 1} · {tier.rangeShort}
                            </div>
                            <div className="lp-tier__name">
                                Amana <em>{tier.name}</em>
                            </div>
                            <p className="lp-tier__tagline">{tier.tagline}</p>
                            <div className="lp-tier__price">{tier.priceLine}</div>
                            <ul className="lp-tier__features">
                                {tier.features.map((f) => (
                                    <li key={f}>
                                        <CheckIcon size={17} className="lp-icon--gold" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            {tier.highlight ? (
                                <BtnGold href={urls.parcoursUrl} full>
                                    Démarrer mon parcours
                                </BtnGold>
                            ) : (
                                <BtnPrimary href={urls.parcoursUrl} full>
                                    Démarrer mon parcours
                                </BtnPrimary>
                            )}
                        </div>
                    ))}
                </div>
                <p className="lp-offers__footnote">
                    Toutes les offres : bascule gratuite entre offres · résiliation libre.
                </p>
            </div>
        </section>
    );
}

export function WhyAmanaSection() {
    return (
        <section className="lp-section" style={{ background: 'var(--lp-paper)' }}>
            <div className="lp-container">
                <div className="lp-split-head">
                    <div>
                        <Eyebrow>Pourquoi Amana</Eyebrow>
                        <h2 className="lp-h2">
                            Ce que nous faisons —
                            <br />
                            et ce que <em>les autres ne font pas.</em>
                        </h2>
                    </div>
                    <p className="lp-lead" style={{ justifySelf: 'end', maxWidth: 480 }}>
                        La majorité des cabinets généralistes traitent la finance islamique
                        à la marge, sans spécialiste dédié. Nous avons fait le choix inverse :
                        c&apos;est notre cœur de métier, en partenariat avec Sakina Consulting
                        pour la conformité religieuse.
                    </p>
                </div>
                <div className="lp-compare">
                    {WHY_AMANA_COLUMNS.map((col) => (
                        <div
                            key={col.who}
                            className={`lp-compare__col ${col.highlight ? 'lp-compare__col--us' : ''}`}
                        >
                            <div className="lp-compare__head">
                                <div className="lp-compare__who">{col.who}</div>
                                <div className="lp-compare__sub">{col.sub}</div>
                            </div>
                            {col.points.map((p) => (
                                <div key={p.t} className="lp-compare__row">
                                    <ComparisonMark state={p.ok} />
                                    <div>
                                        <div className="lp-compare__point">{p.t}</div>
                                        <div className="lp-compare__detail">{p.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ChariaSection() {
    return (
        <section className="lp-section lp-charia">
            <OliveSprig size={180} className="lp-charia__sprig lp-charia__sprig--tr" />
            <OliveSprig size={180} className="lp-charia__sprig lp-charia__sprig--bl" />
            <div className="lp-container" style={{ position: 'relative' }}>
                <div className="lp-charia__header">
                    <div>
                        <Eyebrow light>Notre conformité charia</Eyebrow>
                        <h2 className="lp-charia__title">
                            La conformité ne se déclare pas —
                            <br />
                            <em>elle se construit.</em>
                        </h2>
                    </div>
                    <p className="lp-charia__intro">
                        &quot;Halal&quot; est devenu un argument marketing. Pour nous, c&apos;est une exigence
                        opérationnelle vérifiable — par un tiers, chaque année, document à l&apos;appui.
                    </p>
                </div>
                <div className="lp-grid-2">
                    {CHARIA_PILLARS.map((p, i) => (
                        <div key={p.t} className="lp-pillar">
                            <div className="lp-pillar__num">
                                0{i + 1} / 04
                            </div>
                            <h3 className="lp-pillar__title">{p.t}</h3>
                            <p className="lp-pillar__text">{p.d}</p>
                            <div className="lp-pillar__ex">{p.ex}</div>
                        </div>
                    ))}
                </div>
                <div className="lp-partner">
                    <div className="lp-partner__inner">
                        <div className="lp-partner__mark">SC</div>
                        <div>
                            <div className="lp-eyebrow lp-eyebrow--light">Notre partenaire</div>
                            <div style={{ fontFamily: 'var(--lp-serif)', fontSize: 24, marginTop: 8 }}>
                                Sakina Consulting
                            </div>
                            <p style={{ fontSize: 13, color: 'rgba(245,241,232,0.7)', marginTop: 8, maxWidth: 540 }}>
                                Cabinet spécialisé en finance islamique appliquée —
                                définit avec nous le cadre éthique et la méthodologie de sélection.
                            </p>
                        </div>
                    </div>
                    <BtnGhost href="/finance-islamique" dark>
                        En savoir plus
                    </BtnGhost>
                </div>
            </div>
        </section>
    );
}

export function TestimonialsSection() {
    return (
        <section className="lp-section lp-testimonials">
            <div className="lp-container">
                <div className="lp-testimonials__header">
                    <div>
                        <Eyebrow>Ils ont fait le parcours</Eyebrow>
                        <h2 className="lp-h2">
                            Ce qu&apos;ils en ont retenu —
                            <br />
                            <em>dans leurs mots.</em>
                        </h2>
                    </div>
                    <div className="lp-rating">
                        <div className="lp-rating__stars">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} size={18} />
                            ))}
                        </div>
                        <div>
                            <div className="lp-rating__score">4,9 / 5</div>
                            <div className="lp-rating__meta">312 avis vérifiés · Google · Trustpilot</div>
                        </div>
                    </div>
                </div>
                <div className="lp-grid-3">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.who} className="lp-card lp-quote">
                            <div className="lp-quote__stars">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} size={15} />
                                ))}
                            </div>
                            <p className="lp-quote__text">&quot;{t.q}&quot;</p>
                            <div className="lp-quote__author">
                                <div className="lp-quote__avatar">{t.initials}</div>
                                <div>
                                    <div className="lp-quote__name">{t.who}</div>
                                    <div className="lp-quote__role">
                                        {t.what} · <span className="lp-quote__tier">{t.tier}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FAQSection({ urls }) {
    return (
        <section id="faq" className="lp-section" style={{ background: 'var(--lp-paper)' }}>
            <FAQAccordion urls={urls} />
        </section>
    );
}

function FAQAccordion({ urls }) {
    const [open, setOpen] = useState(0);

    return (
        <div className="lp-container">
            <div className="lp-faq__layout">
                <div className="lp-faq__sidebar">
                    <Eyebrow>Questions fréquentes</Eyebrow>
                    <h2 className="lp-h2">
                        Ce que <em>vous nous demandez</em>
                        <br />
                        le plus.
                    </h2>
                    <p className="lp-lead" style={{ marginBottom: 32, maxWidth: 380 }}>
                        Une question qui n&apos;est pas listée ? Écrivez-nous —
                        nous répondons sous 24h, sans engagement de réponse commerciale.
                    </p>
                    <a href={`mailto:${urls.contactEmail}`} className="lp-faq__email">
                        {urls.contactEmail}
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
                <div>
                    {FAQ_ITEMS.map((it, i) => (
                        <div key={it.q} className="lp-faq__item">
                            <button
                                type="button"
                                className="lp-faq__question"
                                onClick={() => setOpen(open === i ? -1 : i)}
                                aria-expanded={open === i}
                            >
                                {it.q}
                                <span className={`lp-faq__toggle ${open === i ? 'lp-faq__toggle--open' : ''}`}>
                                    +
                                </span>
                            </button>
                            <div
                                className="lp-faq__answer"
                                style={{ maxHeight: open === i ? 280 : 0 }}
                            >
                                <p>{it.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function FinalCTASection({ urls }) {
    return (
        <section className="lp-final-cta">
            <OliveSprig size={140} className="lp-final-cta__sprig lp-final-cta__sprig--tl" />
            <OliveSprig size={140} className="lp-final-cta__sprig lp-final-cta__sprig--br" />
            <div className="lp-final-cta__inner">
                <Eyebrow light>
                    Démarrez maintenant
                </Eyebrow>
                <h2 className="lp-final-cta__title">
                    Dix minutes.
                    <br />
                    <em>Un patrimoine aligné.</em>
                </h2>
                <p className="lp-final-cta__subtitle">
                    Vous gardez la main à chaque étape. À la fin du bilan,
                    vous décidez seul de la suite — sans relance commerciale subie.
                </p>
                <div className="lp-final-cta__actions">
                    <BtnGold href={urls.parcoursUrl} large>
                        Démarrer mon parcours
                    </BtnGold>
                    <BtnGhost href={urls.calendlyUrl} large dark external>
                        Parler à un conseiller d&apos;abord
                    </BtnGhost>
                </div>
                <div className="lp-final-cta__badges">
                    <span>ORIAS 25009552</span>
                    <span>Anacofi-Courtage</span>
                    <span>Partenaire Sakina</span>
                    <span>Données en France</span>
                </div>
            </div>
        </section>
    );
}
