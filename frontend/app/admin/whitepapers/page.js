'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import AdminShell from '../AdminShell';

const PROJECT_LABELS = {
  bilan: 'Bilan patrimonial',
  investissement: 'Investissement halal',
  zakat: 'Zakat & purification',
  retraite: 'Retraite / PER halal',
  succession: 'Succession & transmission',
  fiscalite: 'Optimisation fiscale',
  autre: 'Autre',
};

const PAPER_LABELS = {
  'investissement-halal': "Guide de l'investissement halal",
  'zakat-patrimoine': 'Zakat & purification du patrimoine',
  'transmission-succession': 'Transmission & succession',
  'bilan-patrimonial': 'Bilan patrimonial islamique',
};

function paperLabel(id) {
  return PAPER_LABELS[id] || id;
}

function formatDate(dateStr, opts = {}) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...opts,
  });
}

function initials(firstName, lastName) {
  return `${(firstName || '?')[0]}${(lastName || '')[0] || ''}`.toUpperCase();
}

export default function WhitepapersAdminPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/whitepapers');
      if (res.ok) setLeads(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const stats = useMemo(() => {
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    return {
      total: leads.length,
      week: leads.filter((l) => new Date(l.createdAt).getTime() >= weekAgo).length,
      newsletter: leads.filter((l) => l.newsletter).length,
    };
  }, [leads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) => {
      const haystack = [
        l.firstName,
        l.lastName,
        l.email,
        l.phone,
        ...(l.paperIds || []),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [leads, search]);

  return (
    <AdminShell>
      <div className="wp-admin">
        <header className="wp-admin-header">
          <div>
            <h1 className="wp-admin-title">Demandes livres blancs</h1>
            <p className="wp-admin-subtitle">
              Leads générés via{' '}
              <a href="/livres-blancs" target="_blank" rel="noopener noreferrer">/livres-blancs</a>
              {' '}· Contenu éditable dans Pages → livres-blancs
            </p>
          </div>
          <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={load} disabled={loading}>
            Actualiser
          </button>
        </header>

        {!loading && leads.length > 0 && (
          <div className="wp-admin-stats">
            <div className="wp-admin-stat">
              <span className="wp-admin-stat-value">{stats.total}</span>
              <span className="wp-admin-stat-label">Demandes totales</span>
            </div>
            <div className="wp-admin-stat">
              <span className="wp-admin-stat-value">{stats.week}</span>
              <span className="wp-admin-stat-label">Cette semaine</span>
            </div>
            <div className="wp-admin-stat">
              <span className="wp-admin-stat-value">{stats.newsletter}</span>
              <span className="wp-admin-stat-label">Inscrits newsletter</span>
            </div>
          </div>
        )}

        {!loading && leads.length > 0 && (
          <div className="wp-admin-toolbar">
            <input
              type="search"
              className="wp-admin-search"
              placeholder="Rechercher par nom, e-mail, guide…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="wp-admin-count">
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {loading ? (
          <div className="wp-admin-loading">
            <div className="wp-admin-spinner" aria-hidden="true" />
            <p>Chargement des demandes…</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="wp-admin-empty">
            <div className="wp-admin-empty-icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h2>Aucune demande pour le moment</h2>
            <p>Les formulaires soumis sur la page Livres blancs apparaîtront ici.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="wp-admin-empty">
            <p>Aucun résultat pour « {search} ».</p>
          </div>
        ) : (
          <div className={`wp-admin-layout${selected ? ' wp-admin-layout--split' : ''}`}>
            <div className="wp-admin-list">
              {filtered.map((l) => {
                const isActive = selected?.id === l.id;
                const papers = l.paperIds || [];
                return (
                  <button
                    key={l.id}
                    type="button"
                    className={`wp-admin-card${isActive ? ' wp-admin-card--active' : ''}`}
                    onClick={() => setSelected(l)}
                  >
                    <div className="wp-admin-card-top">
                      <div className="wp-admin-avatar" aria-hidden="true">
                        {initials(l.firstName, l.lastName)}
                      </div>
                      <div className="wp-admin-card-main">
                        <div className="wp-admin-card-row">
                          <span className="wp-admin-card-name">{l.firstName} {l.lastName}</span>
                          <time className="wp-admin-card-date" dateTime={l.createdAt}>
                            {formatDate(l.createdAt)}
                          </time>
                        </div>
                        <span className="wp-admin-card-email">{l.email}</span>
                      </div>
                    </div>
                    <div className="wp-admin-card-tags">
                      {papers.slice(0, 3).map((id) => (
                        <span key={id} className="wp-admin-tag">{paperLabel(id)}</span>
                      ))}
                      {papers.length > 3 && (
                        <span className="wp-admin-tag wp-admin-tag--muted">+{papers.length - 3}</span>
                      )}
                      {l.newsletter && <span className="wp-admin-tag wp-admin-tag--newsletter">Newsletter</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {selected && (
              <aside className="wp-admin-detail">
                <div className="wp-admin-detail-header">
                  <div className="wp-admin-detail-identity">
                    <div className="wp-admin-avatar wp-admin-avatar--lg" aria-hidden="true">
                      {initials(selected.firstName, selected.lastName)}
                    </div>
                    <div>
                      <h2>{selected.firstName} {selected.lastName}</h2>
                      <time dateTime={selected.createdAt}>
                        {formatDate(selected.createdAt, { weekday: 'long', month: 'long' })}
                      </time>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="wp-admin-close"
                    onClick={() => setSelected(null)}
                    aria-label="Fermer"
                  >
                    ×
                  </button>
                </div>

                <div className="wp-admin-detail-grid">
                  <div className="wp-admin-field">
                    <span className="wp-admin-field-label">E-mail</span>
                    <a href={`mailto:${selected.email}`} className="wp-admin-field-value wp-admin-link">
                      {selected.email}
                    </a>
                  </div>
                  <div className="wp-admin-field">
                    <span className="wp-admin-field-label">Téléphone</span>
                    <a href={`tel:${selected.phone}`} className="wp-admin-field-value wp-admin-link">
                      {selected.phone}
                    </a>
                  </div>
                  {selected.project && (
                    <div className="wp-admin-field">
                      <span className="wp-admin-field-label">Projet</span>
                      <span className="wp-admin-field-value">
                        {PROJECT_LABELS[selected.project] || selected.project}
                      </span>
                    </div>
                  )}
                  <div className="wp-admin-field">
                    <span className="wp-admin-field-label">Newsletter</span>
                    <span className={`wp-admin-badge-inline${selected.newsletter ? ' wp-admin-badge-inline--yes' : ''}`}>
                      {selected.newsletter ? 'Inscrit' : 'Non inscrit'}
                    </span>
                  </div>
                </div>

                <div className="wp-admin-guides">
                  <span className="wp-admin-field-label">Guides demandés</span>
                  <ul className="wp-admin-guides-list">
                    {(selected.paperIds || []).map((id) => (
                      <li key={id} className="wp-admin-guide-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        {paperLabel(id)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="wp-admin-detail-actions">
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent('Vos livres blancs — Amana Patrimoine')}`}
                    className="admin-btn admin-btn-primary admin-btn-sm"
                  >
                    Envoyer les guides par e-mail
                  </a>
                  <a href={`tel:${selected.phone}`} className="admin-btn admin-btn-outline admin-btn-sm">
                    Appeler
                  </a>
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
