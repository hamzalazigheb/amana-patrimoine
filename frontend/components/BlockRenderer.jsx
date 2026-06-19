'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatsSection from './StatsSection';
import Testimonials from './Testimonials';
import CertBadges from './CertBadges';
import ContactForm from './ContactForm';
import { WhitepapersSection } from './WhitepapersSection';
import ActualitesSection from './ActualitesSection';
import { normalizeYouTubeThumbnail } from '@/lib/youtube';
import { trackCalendlyClick } from '../lib/track';
/**
 * Sanitize HTML from the database to prevent XSS.
 * - Browser: uses native DOMParser (no dependency, no eval)
 * - Server (SSR): uses regex to strip scripts and event handlers
 */
function sanitize(html) {
  if (!html) return '';

  if (typeof window === 'undefined') {
    // SSR path — scripts don't execute on the server, but strip them anyway
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
      .replace(/href\s*=\s*["']?\s*javascript\s*:/gi, 'href="blocked:');
  }

  // Client path — use native DOMParser, no external dependency
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script, iframe, object, embed, form').forEach((el) => el.remove());
    doc.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith('on') || /^javascript\s*:/i.test(attr.value)) {
          el.removeAttribute(attr.name);
        }
      });
    });
    return doc.body.innerHTML;
  } catch {
    return '';
  }
}

/** Validate a URL is safe to use as an image src (prevents CSS injection). */
function safeBgUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  // Allow relative paths and http(s) URLs — block javascript: and data: schemes
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://')
  ) {
    return trimmed;
  }
  return '';
}

function useAnimateOnScroll(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.animate-item');
            items.forEach((item, i) => {
              item.style.animationDelay = `${i * 80}ms`;
              item.classList.add('animate-item--visible');
              observer.unobserve(entry.target);
            });
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

function isInternal(href) {
  if (!href) return false;
  return href.startsWith('/') || href.startsWith('#');
}

function SmartLink({ href, children, className, ...props }) {
  if (!href) return <span className={className} {...props}>{children}</span>;
  if (isInternal(href)) {
    return <Link href={href} className={className} {...props}>{children}</Link>;
  }
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

function HeroBlock({ content }) {
  const isCalendly = (url) => url && url.includes('calendly');

  const bgSrc = safeBgUrl(content.backgroundImage);

  return (
    <section className="hero">
      {bgSrc ? (
        <div className="hero-slide active" aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <Image
            src={bgSrc}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ) : (
        <div className="hero-slide active" />
      )}
      <div className="container">
        <div className="hero-content">
          <h1 className="animate-on-load">{content.title}</h1>
          <p className="hero-subtitle animate-on-load">{content.subtitle}</p>
          <div className="hero-cta animate-on-load">
            <SmartLink
              href={content.ctaLink || '#'}
              className="btn btn-primary"
              onClick={isCalendly(content.ctaLink) ? () => trackCalendlyClick('hero-cta') : undefined}
            >
              {content.ctaText || 'Prendre rendez-vous'}
            </SmartLink>
          </div>
          <div className="hero-trust-chips animate-on-load">
            <span className="hero-chip">✓ 100+ clients accompagnés</span>
            <span className="hero-chip">✓ 100% indépendant</span>
            <span className="hero-chip">✓ Finance islamique</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`trust-item animate-item ${open ? 'trust-item--open' : ''}`}>
      <button
        className="trust-item-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="trust-item-num">0{index + 1}</span>
        <span className="trust-title">{item.title}</span>
        <span className="trust-item-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div className="trust-item-body">
        <p className="trust-desc">{item.description}</p>
      </div>
    </div>
  );
}

function TrustBlock({ content }) {
  const ref = useAnimateOnScroll();
  return (
    <section className="trust-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{content.title}</h2>
        </div>
        <div className="trust-grid">
          {(content.items || []).map((item, i) => (
            <TrustItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PRINCIPLE_META = [
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>, label: 'Exclusion riba & secteurs' },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, label: 'Conseillers certifiés' },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, label: 'Performance & éthique' },
];

function PrincipleParagraph({ text, index }) {
  const [open, setOpen] = useState(false);
  const meta = PRINCIPLE_META[index] || PRINCIPLE_META[0];
  return (
    <div className={`principle-item ${open ? 'principle-item--open' : ''}`}>
      <button className="principle-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="principle-icon" aria-hidden="true">{meta.icon}</span>
        <span className="principle-label">{meta.label}</span>
        <span className="principle-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div className="principle-body">
        <p>{text}</p>
      </div>
    </div>
  );
}

function ContentBlock({ content }) {
  const hasImage = !!content.image;
  const bgClass = content.background === 'beige' ? 'content-section-beige' : '';

  const renderSteps = () => {
    if (!content.steps || content.steps.length === 0) return null;
    if (content.stepStyle === 'methodology') {
      return (
        <div className="methodology-steps">
          {content.steps.map((step, i) => (
            <div key={i} className="methodology-step">
              <div className="step-number">{i + 1}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    const count = content.steps.length;
    return (
      <div className={`content-steps-cards ${count >= 4 ? 'content-steps-grid' : ''}`}>
        {content.steps.map((step, i) => (
          <div key={i} className="content-step-card">
            <span className="content-step-number">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="content-step-title">{step.title}</h3>
            <hr className="content-step-divider" />
            <p className="content-step-desc">{step.description}</p>
          </div>
        ))}
      </div>
    );
  };

  const CARD_ICONS = {
    '/icon-fiscal-optimization.svg': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><line x1="12" y1="14" x2="12" y2="20"/><line x1="9" y1="17" x2="15" y2="17"/>
      </svg>
    ),
    '/icon-treasury.svg': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
    '/icon-retirement.svg': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    '/icon-protection.svg': (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  };

  const renderCards = () => {
    if (!content.cards || content.cards.length === 0) return null;
    return (
      <div className="content-cards-grid">
        {content.cards.map((card, i) => (
          <div key={i} className="content-card-item">
            <div className="content-card-icon">
              {CARD_ICONS[card.icon] || (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              )}
            </div>
            <div className="content-card-body">
              <h3 className="content-card-title">{card.title}</h3>
              <div className="content-card-divider" />
              <p className="content-card-desc">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={`content-section ${bgClass}`}>
      <div className="container">
        <div className={`content-section-grid ${hasImage ? 'has-image' : ''}`}>
          <div className="content-section-main">
            <div className="content-section-header">
              {content.label && <span className="section-label">{content.label}</span>}
              {content.title && <h2 className="section-title">{content.title}</h2>}
            </div>
            <div className="content-section-body">
              {content.bigText && (
                <p className="content-big-text">{content.bigText}</p>
              )}
              {(content.paragraphs || []).length > 0 && (
                content.background === 'beige' ? (
                  <div className="text-content principles-list">
                    {content.paragraphs.map((p, i) => (
                      <PrincipleParagraph key={i} text={p} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="text-content">
                    {content.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )
              )}
              {content.highlight && (
                <div className="highlight-box">
                  <p>{content.highlight}</p>
                </div>
              )}
              {renderSteps()}
              {renderCards()}
            </div>
          </div>
          {hasImage && (
            <div className="content-section-image">
              <Image src={content.image} alt={content.title || 'Illustration'} width={600} height={400} sizes="(max-width: 768px) 100vw, 600px" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ServicesBlock({ content }) {
  const ref = useAnimateOnScroll();
  return (
    <section className="services-section" id="services" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{content.title}</h2>
          {content.description && <p className="section-desc">{content.description}</p>}
        </div>
        <div className="services-grid">
          {(content.items || []).map((svc, i) => (
            <div key={i} className="service-card animate-item">
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.description}</p>
              {svc.link && (
                <SmartLink href={svc.link} className="service-link">
                  En savoir plus
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </SmartLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const METHODOLOGY_ICONS = [
  /* 0 – Premier contact : location pin */
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>,
  /* 1 – Bilan patrimonial : document / clipboard */
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-5-6H9z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="13" y2="17"/>
  </svg>,
  /* 2 – Stratégie sur-mesure : layers / stack */
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 12 12 17 22 12"/>
    <polyline points="2 17 12 22 22 17"/>
  </svg>,
  /* 3 – Suivi régulier : trending up */
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>,
];

function MethodologyBlock({ content }) {
  const ref = useAnimateOnScroll();
  return (
    <section className="methodology-section" id="methodology" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{content.title}</h2>
        </div>
        <div className="methodology-timeline">
          {(content.steps || []).map((step, i) => (
            <div key={i} className="timeline-item animate-item">
              <div className="timeline-icon-box">
                {METHODOLOGY_ICONS[i % METHODOLOGY_ICONS.length]}
              </div>
              <div className="timeline-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationBlock({ content }) {
  const ref = useAnimateOnScroll();
  return (
    <section className="education-section" id="education" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{content.title}</h2>
          {content.description && <p className="section-desc">{content.description}</p>}
        </div>
        <div className="education-grid">
          {(content.items || []).map((item, i) => {
            const cardInner = (
              <>
                {item.image && (
                  <div className="education-image">
                    {/* Plain img — matches admin preview; avoids _next/image 404 on runtime /uploads/ files */}
                    <img
                      src={normalizeYouTubeThumbnail(item.image)}
                      alt={item.title || 'Article'}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="education-content">
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {item.tag && <span className="education-tag">{item.tag}</span>}
                  </div>
                  <h3>{item.title}</h3>
                  {item.description && <p className="education-desc">{item.description}</p>}
                  {item.link && (
                    <span className="education-link">
                      {item.linkLabel || 'Lire la suite'} →
                    </span>
                  )}
                </div>
              </>
            );
            return item.link ? (
              <Link key={i} href={item.link} className="education-card animate-item" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {cardInner}
              </Link>
            ) : (
              <div key={i} className="education-card animate-item">
                {cardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersBlock({ content }) {
  return (
    <section className="partners-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{content.title}</h2>
          {content.description && <p className="section-desc">{content.description}</p>}
        </div>
        <div className="partners-grid">
          {(content.items || []).map((p, i) => (
            <div key={i} className="partner-item">
              <div className="partner-logo-wrapper">
                <Image src={p.logo} alt={`Logo ${p.name}`} width={120} height={60} sizes="120px" style={{ objectFit: 'contain' }} className="partner-img" />
              </div>
              <span className="partner-name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABlock({ content }) {
  const href = content.ctaLink || 'https://calendly.com/amana-patrimoine/30min';
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">{content.title}</h2>
          <p className="cta-desc">{content.subtitle}</p>
          {content.description && <p className="cta-desc" style={{ marginTop: 'var(--space-4)' }}>{content.description}</p>}
          <div className="cta-buttons">
            <SmartLink
              href={href}
              className="btn btn-gold"
              onClick={() => trackCalendlyClick('cta-block')}
            >
              {content.ctaText || 'Prendre rendez-vous'}
            </SmartLink>
            <a href="tel:+33189700000" className="cta-phone-alt">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Ou appelez-nous directement
            </a>
          </div>
          <CertBadges className="cta-cert-badges" />
        </div>
      </div>
    </section>
  );
}

function PageHeroBlock({ content }) {
  const imageSrc = content.backgroundImage || content.image || '';
  const hasImage = !!imageSrc;
  const bgSrc = hasImage ? safeBgUrl(imageSrc) : '';
  const ctaHref = content.ctaLink || 'https://calendly.com/amana-patrimoine/30min';
  return (
    <section className={`page-hero ${hasImage ? 'page-hero-has-bg' : ''}`} style={{ position: 'relative' }}>
      {bgSrc && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <Image
            src={bgSrc}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      )}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="page-hero-content">
          {content.badge && <span className="page-hero-badge">{content.badge}</span>}
          <h1 className="page-hero-title">{content.title}</h1>
          {content.subtitle && <p className="page-hero-subtitle">{content.subtitle}</p>}
          {content.ctaText && (
            <SmartLink
              href={ctaHref}
              className="btn btn-white-outline"
              onClick={() => trackCalendlyClick('page-hero')}
            >
              {content.ctaText}
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  );
}

function ToolsBlock({ content }) {
  const ref = useAnimateOnScroll();
  return (
    <section className="tools-section" ref={ref}>
      <div className="container">
        {content.label && <span className="section-label">{content.label}</span>}
        <h2 className="section-title">{content.title}</h2>
        <div className="tools-grid">
          {(content.items || []).map((tool, i) => (
            <div key={i} className="tool-card animate-item">
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              {tool.features && (
                <ul className="tool-features">
                  {tool.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyBlock({ content }) {
  return (
    <section className="case-study-section">
      <div className="container">
        {content.title && <h2 className="section-title">{content.title}</h2>}
        <div dangerouslySetInnerHTML={{ __html: sanitize(content.body) }} />
      </div>
    </section>
  );
}

const REASSURANCE_ICONS = [
  /* Shield */
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  /* Check circle */
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>,
  /* Lock */
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
];

function ReassuranceBlock({ content }) {
  return (
    <section className="reassurance-section">
      <div className="container">
        <div className="reassurance-grid">
          {(content.items || []).map((item, i) => (
            <div key={i} className="reassurance-item">
              <div className="reassurance-icon-circle">
                {REASSURANCE_ICONS[i % REASSURANCE_ICONS.length]}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item-open' : ''}`}>
      <button
        className="faq-question"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="faq-question-text">{item.question}</span>
        <span className="faq-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && <p className="faq-answer">{item.answer}</p>}
    </div>
  );
}

function FAQBlock({ content }) {
  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">{content.title || 'Questions fréquentes'}</h2>
        </div>
        <div className="faq-list">
          {(content.items || []).map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfilesBlock({ content }) {
  return (
    <section className="profiles-section">
      <div className="container">
        {content.label && <span className="section-label">{content.label}</span>}
        {content.title && <h2 className="section-title">{content.title}</h2>}
        <div className="profiles-grid">
          {(content.items || []).map((item, i) => (
            <div key={i} className="profile-card">
              <h4>{item.profile}</h4>
              <p>{item.solutions}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroBlock({ content }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = content.paragraphs || [];

  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-content">
          {/* First paragraph — always visible, styled as pull-quote on mobile */}
          {paragraphs[0] && (
            <p className="intro-lead">{paragraphs[0]}</p>
          )}

          {/* Pillars row — extracted from the second paragraph on mobile */}
          <div className="intro-pillars">
            <span className="intro-pillar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              Indépendance totale
            </span>
            <span className="intro-pillar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Transparence absolue
            </span>
            <span className="intro-pillar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Conforme charia
            </span>
          </div>

          {/* Remaining paragraphs — collapsible on mobile */}
          {paragraphs.length > 1 && (
            <div className={`intro-extra ${expanded ? 'intro-extra--open' : ''}`}>
              {paragraphs.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {paragraphs.length > 1 && (
            <button
              className="intro-toggle"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? 'Réduire ↑' : 'En savoir plus ↓'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function FoundersBlock({ content }) {
  const hasBg = !!content.background;
  const style = hasBg ? {
    backgroundImage: `url("${safeBgUrl(content.background)}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section className={`founders-section ${hasBg ? 'content-section-navy' : ''}`} style={style}>
      <div className="container">
        {content.label && (
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 className="founders-title">{content.label}</h2>
          </div>
        )}
        <div className="founders-grid">
          {(content.items || []).map((f, i) => (
            <div key={i} className="founder-card">
              {f.image && (
                <div className="founder-photo-wrapper">
                  <Image src={f.image} alt={`${f.name} - ${f.role}`} width={200} height={200} sizes="200px" className="founder-image" />
                </div>
              )}
              <h3 className="founder-name">{f.name}</h3>
              <span className="founder-role">{f.role}</span>
              <p className="founder-bio" style={{ whiteSpace: 'pre-line' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegalBlock({ content }) {
  return (
    <section className="legal-section">
      <div className="container">
        <div className="legal-content" dangerouslySetInnerHTML={{ __html: sanitize(content.body) }} />
      </div>
    </section>
  );
}

function StatsBlock({ content }) {
  return <StatsSection stats={content?.items} />;
}

function TestimonialsBlock({ content }) {
  return <Testimonials testimonials={content?.items} sectionTitle={content?.title} />;
}

function ContactFormBlock({ content }) {
  return (
    <section className="contact-section">
      <div className="container">
        <ContactForm
          title={content?.title || 'Contactez-nous'}
          description={content?.description || ''}
        />
      </div>
    </section>
  );
}

const BLOCK_MAP = {
  hero: HeroBlock,
  pageHero: PageHeroBlock,
  intro: IntroBlock,
  trust: TrustBlock,
  content: ContentBlock,
  services: ServicesBlock,
  methodology: MethodologyBlock,
  education: EducationBlock,
  partners: PartnersBlock,
  cta: CTABlock,
  tools: ToolsBlock,
  caseStudy: CaseStudyBlock,
  reassurance: ReassuranceBlock,
  faq: FAQBlock,
  profiles: ProfilesBlock,
  founders: FoundersBlock,
  legal: LegalBlock,
  stats: StatsBlock,
  testimonials: TestimonialsBlock,
  contact: ContactFormBlock,
  whitepapers: WhitepapersSection,
  actualites: ActualitesSection,
};

export default function BlockRenderer({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = BLOCK_MAP[block.type];
        if (!Component) return null;
        return <Component key={block.id || block.order} content={block.content} />;
      })}
    </>
  );
}
