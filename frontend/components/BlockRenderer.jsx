'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function useAnimateOnScroll(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.animate-item');
            items.forEach((item, i) => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(15px)';
              setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, i * 100);
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
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.animate-on-load');
    els?.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 100);
    });
  }, []);

  return (
    <section className="hero" ref={ref}>
      <div
        className="hero-slide active"
        style={{
          backgroundImage: `url("${content.backgroundImage || ''}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="container">
        <div className="hero-content">
          <h1 className="animate-on-load">{content.title}</h1>
          <p className="hero-subtitle animate-on-load">{content.subtitle}</p>
          <div className="hero-cta animate-on-load">
            <SmartLink href={content.ctaLink || '#'} className="btn btn-primary">
              {content.ctaText || 'Prendre rendez-vous'}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
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
            <div key={i} className="trust-item animate-item">
              <h3 className="trust-title">{item.title}</h3>
              <p className="trust-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
        {content.steps.map((step, i) => (
          <div key={i}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderCards = () => {
    if (!content.cards || content.cards.length === 0) return null;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-8)', marginTop: 'var(--space-8)' }}>
        {content.cards.map((card, i) => (
          <div key={i} style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-brass)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              {card.icon && (
                <Image src={card.icon} alt={card.title || 'Icône'} width={48} height={48} style={{ objectFit: 'contain', flexShrink: 0 }} />
              )}
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', color: '#444b3f', margin: 0, marginBottom: 'var(--space-3)' }}>{card.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>{card.description}</p>
              </div>
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
                <p style={{ fontSize: '1.25rem', color: 'var(--color-brass-dark)', fontWeight: 500, marginBottom: '1.5rem' }}>
                  {content.bigText}
                </p>
              )}
              {(content.paragraphs || []).length > 0 && (
                <div className="text-content">
                  {content.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
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
              <Image src={content.image} alt={content.title || 'Illustration'} width={600} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
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
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-brass)' }}>{String(i + 1).padStart(2, '0')}</span>
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
          {(content.items || []).map((item, i) => (
            <div key={i} className="education-card animate-item">
              {item.image && (
                <div className="education-image">
                  <Image src={item.image} alt={item.title || 'Article'} width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div className="education-content">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {item.tag && <span className="education-tag">{item.tag}</span>}
                </div>
                <h3>{item.title}</h3>
                {item.description && <p className="education-desc">{item.description}</p>}
              </div>
            </div>
          ))}
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
                <Image src={p.logo} alt={`Logo ${p.name}`} width={120} height={60} style={{ objectFit: 'contain' }} className="partner-img" />
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
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">{content.title}</h2>
          <p className="cta-desc">{content.subtitle}</p>
          {content.description && <p className="cta-desc" style={{ marginTop: 'var(--space-4)' }}>{content.description}</p>}
          <div className="cta-buttons">
            <SmartLink href={content.ctaLink || 'https://calendly.com/amana-patrimoine/30min'} className="btn btn-gold">
              {content.ctaText || 'Prendre rendez-vous'}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageHeroBlock({ content }) {
  const hasImage = !!content.image;
  return (
    <section className={`page-hero ${hasImage ? 'page-hero-has-bg' : ''}`} style={hasImage ? { backgroundImage: `url("${content.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      <div className="container">
        <div className="page-hero-content">
          {content.badge && <span className="page-hero-badge">{content.badge}</span>}
          <h1 className="page-hero-title">{content.title}</h1>
          {content.subtitle && <p className="page-hero-subtitle">{content.subtitle}</p>}
          {content.ctaText && (
            <SmartLink href={content.ctaLink || 'https://calendly.com/amana-patrimoine/30min'} className="btn btn-primary">
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
        <div dangerouslySetInnerHTML={{ __html: content.body || '' }} />
      </div>
    </section>
  );
}

function ReassuranceBlock({ content }) {
  return (
    <section className="reassurance-section">
      <div className="container">
        <div className="reassurance-grid">
          {(content.items || []).map((item, i) => (
            <div key={i} className="reassurance-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQBlock({ content }) {
  return (
    <section className="faq-section">
      <div className="container">
        {content.title && <h2 className="section-title">{content.title}</h2>}
        <div className="faq-list">
          {(content.items || []).map((item, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{item.question}</summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
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
  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-content">
          {(content.paragraphs || []).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersBlock({ content }) {
  const style = content.background ? {
    backgroundImage: `url("${content.background}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section className={`founders-section ${content.background ? 'content-section-navy' : ''}`} style={style}>
      <div className="container">
        {content.label && <span className="section-label" style={content.background ? { color: 'var(--color-brass-light)' } : {}}>{content.label}</span>}
        <div className="founders-grid">
          {(content.items || []).map((f, i) => (
            <div key={i} className="founder-card">
              {f.image && <Image src={f.image} alt={`${f.name} - ${f.role}`} width={200} height={200} className="founder-image" style={{ objectFit: 'cover' }} />}
              <h3>{f.name}</h3>
              <span className="founder-role">{f.role}</span>
              <p style={{ whiteSpace: 'pre-line' }}>{f.description}</p>
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
        <div className="legal-content" dangerouslySetInnerHTML={{ __html: content.body || '' }} />
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
