'use client';

import { useState } from 'react';

const SUBJECTS = [
  'Bilan patrimonial',
  'Finance islamique',
  'Investissement / SCPI',
  'Préparer ma retraite',
  'Succession & transmission',
  'Optimisation fiscale',
  'Simulateur Zakat',
  'Autre',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields) {
  const errors = {};
  if (!fields.name || fields.name.trim().length < 2)
    errors.name = 'Veuillez indiquer votre prénom et nom.';
  if (!fields.email || !EMAIL_RE.test(fields.email.trim()))
    errors.email = 'Adresse email invalide.';
  if (!fields.message || fields.message.trim().length < 20)
    errors.message = 'Votre message doit contenir au moins 20 caractères.';
  return errors;
}

export default function ContactForm({ title, description }) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',        // honeypot — hidden from humans
    address_confirm: '', // second honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const update = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validate(fields);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      const firstKey = Object.keys(clientErrors)[0];
      document.getElementById(`cf-${firstKey}`)?.focus();
      return;
    }
    setErrors({});
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFields({ name: '', email: '', phone: '', subject: '', message: '', website: '', address_confirm: '' });
      } else {
        setErrors(data.errors || { _global: 'Une erreur est survenue.' });
        setStatus('idle');
      }
    } catch {
      setErrors({ _global: 'Impossible de contacter le serveur. Réessayez plus tard.' });
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-success" role="alert" aria-live="polite">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ color: 'var(--color-forest)', marginBottom: '1rem' }}>
          <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
        </svg>
        <h3>Message envoyé !</h3>
        <p>Nous avons bien reçu votre message et vous répondrons dans les 24 heures ouvrées.</p>
        <button className="btn btn-secondary" style={{ marginTop: '1.5rem' }} onClick={() => setStatus('idle')}>
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
      {title && <h2 className="contact-form-title">{title}</h2>}
      {description && <p className="contact-form-desc">{description}</p>}

      {errors._global && (
        <div className="contact-form-error-global" role="alert">{errors._global}</div>
      )}

      {/* ── Honeypot fields — hidden from real users ── */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="cf-website">Ne pas remplir</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={fields.website} onChange={update('website')} />
        <label htmlFor="cf-address_confirm">Ne pas remplir</label>
        <input id="cf-address_confirm" name="address_confirm" type="text" tabIndex={-1} autoComplete="off" value={fields.address_confirm} onChange={update('address_confirm')} />
      </div>

      <div className="contact-form-row">
        {/* Name */}
        <div className="contact-form-group">
          <label htmlFor="cf-name" className="contact-form-label">
            Prénom et nom <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            className={`contact-form-input${errors.name ? ' is-error' : ''}`}
            placeholder="Mohamed Martin"
            value={fields.name}
            onChange={update('name')}
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
          />
          {errors.name && <span id="cf-name-error" className="contact-form-field-error" role="alert">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="contact-form-group">
          <label htmlFor="cf-email" className="contact-form-label">
            Adresse email <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            className={`contact-form-input${errors.email ? ' is-error' : ''}`}
            placeholder="vous@exemple.fr"
            value={fields.email}
            onChange={update('email')}
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
          />
          {errors.email && <span id="cf-email-error" className="contact-form-field-error" role="alert">{errors.email}</span>}
        </div>
      </div>

      <div className="contact-form-row">
        {/* Phone */}
        <div className="contact-form-group">
          <label htmlFor="cf-phone" className="contact-form-label">
            Téléphone <span className="contact-form-optional">(optionnel)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            className={`contact-form-input${errors.phone ? ' is-error' : ''}`}
            placeholder="+33 6 12 34 56 78"
            value={fields.phone}
            onChange={update('phone')}
            autoComplete="tel"
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
          />
          {errors.phone && <span id="cf-phone-error" className="contact-form-field-error" role="alert">{errors.phone}</span>}
        </div>

        {/* Subject */}
        <div className="contact-form-group">
          <label htmlFor="cf-subject" className="contact-form-label">
            Sujet <span className="contact-form-optional">(optionnel)</span>
          </label>
          <select
            id="cf-subject"
            name="subject"
            className="contact-form-input contact-form-select"
            value={fields.subject}
            onChange={update('subject')}
          >
            <option value="">Choisissez un sujet…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="contact-form-group">
        <label htmlFor="cf-message" className="contact-form-label">
          Votre message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          className={`contact-form-input contact-form-textarea${errors.message ? ' is-error' : ''}`}
          placeholder="Décrivez votre situation et vos objectifs en quelques lignes…"
          rows={5}
          value={fields.message}
          onChange={update('message')}
          aria-required="true"
          aria-describedby={errors.message ? 'cf-message-error' : 'cf-message-hint'}
          maxLength={2000}
        />
        <span id="cf-message-hint" className="contact-form-hint">
          {fields.message.length}/2000 caractères
        </span>
        {errors.message && <span id="cf-message-error" className="contact-form-field-error" role="alert">{errors.message}</span>}
      </div>

      <div className="contact-form-footer">
        <p className="contact-form-privacy">
          Vos données sont traitées conformément à notre{' '}
          <a href="/politique-confidentialite" style={{ color: 'var(--color-brass-dark)' }}>politique de confidentialité</a>.
          Elles ne sont jamais revendues.
        </p>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }}>
                <circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Envoi en cours…
            </>
          ) : 'Envoyer le message'}
        </button>
      </div>
    </form>
  );
}
