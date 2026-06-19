'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { track } from '@/lib/track';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-().]{7,20}$/;

export default function WhitePaperForm({ papers = [], formConfig = {}, preselectedId = null }) {
  const formRef = useRef(null);
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    project: '',
    paperIds: preselectedId ? [preselectedId] : [],
    newsletter: false,
    consent: false,
    website: '',
    address_confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const togglePaper = (id) => {
    setFields((prev) => ({
      ...prev,
      paperIds: prev.paperIds.includes(id)
        ? prev.paperIds.filter((p) => p !== id)
        : [...prev.paperIds, id],
    }));
  };

  const validate = () => {
    const next = {};
    if (!fields.firstName.trim() || fields.firstName.trim().length < 2) {
      next.firstName = 'Prénom requis (min. 2 caractères).';
    }
    if (!fields.lastName.trim() || fields.lastName.trim().length < 2) {
      next.lastName = 'Nom requis (min. 2 caractères).';
    }
    if (!fields.email.trim() || !EMAIL_RE.test(fields.email.trim())) {
      next.email = 'Adresse e-mail invalide.';
    }
    if (!fields.phone.trim() || !PHONE_RE.test(fields.phone.trim())) {
      next.phone = 'Numéro de téléphone invalide.';
    }
    if (!fields.paperIds.length) {
      next.paperIds = 'Sélectionnez au moins un livre blanc.';
    }
    if (!fields.consent) {
      next.consent = 'Vous devez accepter la politique de confidentialité.';
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      const res = await fetch('/api/whitepapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrors(data.errors || { _global: 'Une erreur est survenue.' });
        setStatus('idle');
        return;
      }
      setSubmittedEmail(fields.email.trim());
      setStatus('success');
      track('whitepaper_request', {
        event_category: 'Lead',
        paper_ids: fields.paperIds.join(','),
        project: fields.project || 'unspecified',
      });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Whitepaper',
          event_label: fields.paperIds.join(','),
        });
      }
    } catch {
      setErrors({ _global: 'Impossible de contacter le serveur. Réessayez plus tard.' });
      setStatus('idle');
    }
  };

  if (status === 'success') {
    const successTitle = formConfig.successTitle || 'Merci pour votre demande';
    const successMessage =
      formConfig.successMessage ||
      'Le(s) guide(s) sélectionné(s) vous seront envoyés par e-mail sous 24 à 48 h. Pensez à vérifier vos spams.';

    return (
      <div className="wp-form-success" role="alert" aria-live="polite">
        <div className="wp-form-success-icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
        <h3>{successTitle}</h3>
        <p>{successMessage}</p>
        {submittedEmail && (
          <p className="wp-form-success-email">
            Le guide sera envoyé à l&apos;adresse&nbsp;: <strong>{submittedEmail}</strong>
          </p>
        )}
        <p className="wp-form-success-note">
          Besoin d&apos;un accompagnement personnalisé ?{' '}
          <Link href="/bilan-patrimonial">Demandez votre bilan patrimonial</Link>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="wp-form" onSubmit={handleSubmit} noValidate>
      <input type="text" name="website" value={fields.website} onChange={update('website')} tabIndex={-1} autoComplete="off" className="hp-field" aria-hidden="true" />
      <input type="text" name="address_confirm" value={fields.address_confirm} onChange={update('address_confirm')} tabIndex={-1} autoComplete="off" className="hp-field" aria-hidden="true" />

      {formConfig.title && <h2 className="wp-form-title">{formConfig.title}</h2>}
      {formConfig.description && <p className="wp-form-desc">{formConfig.description}</p>}

      {errors._global && <p className="wp-form-error-global" role="alert">{errors._global}</p>}

      <div className="wp-form-grid">
        <div className="wp-field">
          <label htmlFor="wp-firstName">Prénom *</label>
          <input id="wp-firstName" type="text" value={fields.firstName} onChange={update('firstName')} autoComplete="given-name" className={errors.firstName ? 'invalid' : ''} />
          {errors.firstName && <span className="wp-field-error">{errors.firstName}</span>}
        </div>
        <div className="wp-field">
          <label htmlFor="wp-lastName">Nom *</label>
          <input id="wp-lastName" type="text" value={fields.lastName} onChange={update('lastName')} autoComplete="family-name" className={errors.lastName ? 'invalid' : ''} />
          {errors.lastName && <span className="wp-field-error">{errors.lastName}</span>}
        </div>
        <div className="wp-field">
          <label htmlFor="wp-phone">Téléphone *</label>
          <input id="wp-phone" type="tel" value={fields.phone} onChange={update('phone')} autoComplete="tel" className={errors.phone ? 'invalid' : ''} />
          {errors.phone && <span className="wp-field-error">{errors.phone}</span>}
        </div>
        <div className="wp-field">
          <label htmlFor="wp-email">E-mail *</label>
          <input id="wp-email" type="email" value={fields.email} onChange={update('email')} autoComplete="email" className={errors.email ? 'invalid' : ''} />
          {errors.email && <span className="wp-field-error">{errors.email}</span>}
        </div>
      </div>

      {(formConfig.projectOptions || []).length > 0 && (
        <div className="wp-field">
          <label htmlFor="wp-project">Quel est votre projet ?</label>
          <select id="wp-project" value={fields.project} onChange={update('project')}>
            <option value="">Sélectionnez une option</option>
            {formConfig.projectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="wp-field wp-papers-group">
        <span className="wp-papers-label" id="wp-papers-label">
          Livre(s) blanc(s) souhaité(s) <span aria-hidden="true">*</span>
        </span>
        <div className="wp-papers-grid" role="group" aria-labelledby="wp-papers-label">
          {papers.map((paper) => {
            const checked = fields.paperIds.includes(paper.id);
            return (
              <label
                key={paper.id}
                className={`wp-paper-option${checked ? ' wp-paper-option--selected' : ''}`}
              >
                <input
                  type="checkbox"
                  className="wp-paper-option-input"
                  checked={checked}
                  onChange={() => togglePaper(paper.id)}
                />
                <span className="wp-paper-option-indicator" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="wp-paper-option-title">{paper.title}</span>
              </label>
            );
          })}
        </div>
        {errors.paperIds && <span className="wp-field-error">{errors.paperIds}</span>}
      </div>

      <div className="wp-consent-group">
        <label className={`wp-consent-item${fields.consent ? ' wp-consent-item--checked' : ''}${errors.consent ? ' wp-consent-item--error' : ''}`}>
          <input
            type="checkbox"
            className="wp-consent-input"
            checked={fields.consent}
            onChange={update('consent')}
          />
          <span className="wp-consent-indicator" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="wp-consent-text">
            J&apos;accepte que mes données soient traitées conformément à la{' '}
            <Link href="/politique-confidentialite" target="_blank">politique de confidentialité</Link>. *
          </span>
        </label>
        {errors.consent && <span className="wp-field-error">{errors.consent}</span>}

        {formConfig.newsletterLabel && (
          <label className={`wp-consent-item wp-consent-item--optional${fields.newsletter ? ' wp-consent-item--checked' : ''}`}>
            <input
              type="checkbox"
              className="wp-consent-input"
              checked={fields.newsletter}
              onChange={update('newsletter')}
            />
            <span className="wp-consent-indicator" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="wp-consent-text">{formConfig.newsletterLabel}</span>
          </label>
        )}
      </div>

      <button type="submit" className="btn btn-primary wp-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Envoi en cours…' : (formConfig.submitLabel || 'Envoyer ma demande')}
      </button>
      <p className="wp-form-legal">* Champs obligatoires</p>
    </form>
  );
}

export function WhitepapersSection({ content }) {
  const formRef = useRef(null);
  const [preselected, setPreselected] = useState(null);
  const papers = content?.items || [];
  const formConfig = content?.form || {};

  const scrollToForm = (paperId) => {
    setPreselected(paperId);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="wp-section" id="livres-blancs-guides">
      <div className="container">
        {(content?.sectionTitle || content?.sectionDescription) && (
          <div className="section-header">
            {content.sectionTitle && <h2 className="section-title">{content.sectionTitle}</h2>}
            {content.sectionDescription && <p className="section-desc">{content.sectionDescription}</p>}
          </div>
        )}

        <div className="wp-grid">
          {papers.map((paper) => (
            <article key={paper.id} className="wp-card">
              {paper.image && (
                <div className="wp-card-image">
                  <Image
                    src={paper.image}
                    alt=""
                    width={400}
                    height={260}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className="wp-card-body">
                <h3 className="wp-card-title">{paper.title}</h3>
                {paper.subtitle && <p className="wp-card-subtitle">{paper.subtitle}</p>}
                <button
                  type="button"
                  className="wp-card-cta"
                  onClick={() => scrollToForm(paper.id)}
                >
                  {formConfig.cardCtaLabel || 'Recevoir le guide'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="wp-form-wrapper" ref={formRef} id="formulaire-livres-blancs">
          <WhitePaperForm
            key={preselected || 'default'}
            papers={papers}
            formConfig={formConfig}
            preselectedId={preselected}
          />
        </div>
      </div>
    </section>
  );
}
