'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import HeroEditor from '@/components/admin/blocks/HeroEditor';
import TrustEditor from '@/components/admin/blocks/TrustEditor';
import ContentEditor from '@/components/admin/blocks/ContentEditor';
import ServicesEditor from '@/components/admin/blocks/ServicesEditor';
import MethodologyEditor from '@/components/admin/blocks/MethodologyEditor';
import EducationEditor from '@/components/admin/blocks/EducationEditor';
import PartnersEditor from '@/components/admin/blocks/PartnersEditor';
import CTAEditor from '@/components/admin/blocks/CTAEditor';

const BLOCK_LABELS = {
  hero: 'Hero (bannière principale)',
  pageHero: 'Hero de page',
  content: 'Contenu texte',
  trust: 'Points de confiance',
  services: 'Services',
  methodology: 'Méthodologie / Étapes',
  education: 'Ressources pédagogiques',
  partners: 'Partenaires',
  cta: 'Appel à l\'action',
  tools: 'Outils / Solutions',
  caseStudy: 'Étude de cas',
  reassurance: 'Réassurance',
  faq: 'Questions fréquentes',
  profiles: 'Profils',
  founders: 'Fondateurs',
  legal: 'Mentions légales',
};

function getBlockEditor(type) {
  switch (type) {
    case 'hero':
    case 'pageHero':
      return HeroEditor;
    case 'trust':
    case 'reassurance':
      return TrustEditor;
    case 'content':
    case 'legal':
      return ContentEditor;
    case 'services':
      return ServicesEditor;
    case 'methodology':
      return MethodologyEditor;
    case 'education':
      return EducationEditor;
    case 'partners':
      return PartnersEditor;
    case 'cta':
      return CTAEditor;
    default:
      return null;
  }
}

function FallbackEditor({ content, onChange }) {
  const [raw, setRaw] = useState(JSON.stringify(content, null, 2));

  const handleBlur = () => {
    try {
      onChange(JSON.parse(raw));
    } catch { /* invalid JSON, keep as is */ }
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Contenu (JSON)</label>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onBlur={handleBlur}
          className="admin-field-textarea admin-field-json"
          rows={10}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

function BlockItem({ block, index, total, onUpdate, onMove, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const Editor = getBlockEditor(block.type) || FallbackEditor;
  const label = BLOCK_LABELS[block.type] || block.type;

  return (
    <div className="admin-block-card">
      <div className="admin-block-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="admin-block-card-left">
          <span className={`admin-block-chevron ${expanded ? 'open' : ''}`}>›</span>
          <span className="admin-block-type-badge">{label}</span>
        </div>
        <div className="admin-block-card-actions" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onMove(-1)} disabled={index === 0} title="Monter" className="admin-icon-btn">↑</button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} title="Descendre" className="admin-icon-btn">↓</button>
          <button onClick={onRemove} title="Supprimer" className="admin-icon-btn danger">×</button>
        </div>
      </div>
      {expanded && (
        <div className="admin-block-card-body">
          <Editor content={block.content} onChange={(newContent) => onUpdate(newContent)} />
        </div>
      )}
    </div>
  );
}

function PageEditor({ page, onClose, onSaved }) {
  const [blocks, setBlocks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const parsed = (page.blocks || []).map((b) => ({
      ...b,
      content: typeof b.content === 'string' ? JSON.parse(b.content || '{}') : b.content,
    }));
    setBlocks(parsed);
  }, [page]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const blocksData = blocks.map((b) => ({ type: b.type, content: b.content }));
      const res = await fetch(`/api/admin/pages/${page.id}/blocks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks: blocksData }),
      });
      if (!res.ok) throw new Error('Erreur de sauvegarde');
      setMessage('Contenu sauvegardé avec succès !');
      onSaved();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Erreur : ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateBlock = (index, newContent) => {
    const updated = [...blocks];
    updated[index] = { ...updated[index], content: newContent };
    setBlocks(updated);
  };

  const moveBlock = (index, dir) => {
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    const updated = [...blocks];
    [updated[index], updated[newIdx]] = [updated[newIdx], updated[index]];
    setBlocks(updated);
  };

  const removeBlock = (index) => {
    if (!confirm('Supprimer ce bloc ?')) return;
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const addBlock = (type) => {
    setBlocks([...blocks, { type, content: {} }]);
  };

  return (
    <div className="admin-editor">
      <div className="admin-editor-topbar">
        <div className="admin-editor-topbar-left">
          <button onClick={onClose} className="admin-btn-back">← Retour</button>
          <div className="admin-editor-page-info">
            <h2>/{page.slug}</h2>
            <span className="admin-editor-page-title">{page.title}</span>
          </div>
        </div>
        <div className="admin-editor-topbar-right">
          {message && (
            <span className={message.includes('Erreur') ? 'admin-msg-error' : 'admin-msg-success'}>
              {message}
            </span>
          )}
          <button onClick={handleSave} disabled={saving} className="admin-btn-save">
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="admin-editor-content">
        <div className="admin-blocks-list">
          {blocks.map((block, i) => (
            <BlockItem
              key={`${block.type}-${i}`}
              block={block}
              index={i}
              total={blocks.length}
              onUpdate={(content) => updateBlock(i, content)}
              onMove={(dir) => moveBlock(i, dir)}
              onRemove={() => removeBlock(i)}
            />
          ))}
        </div>

        <div className="admin-add-block-bar">
          <span className="admin-add-block-label">Ajouter un bloc :</span>
          <div className="admin-add-block-options">
            {Object.entries(BLOCK_LABELS).map(([type, label]) => (
              <button key={type} onClick={() => addBlock(type)} className="admin-add-block-btn">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({ onClose }) {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => { setSettings(d.settings || {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      setMessage('Paramètres sauvegardés');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Erreur de sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Chargement...</div>;

  const settingLabels = {
    site_name: 'Nom du site',
    site_description: 'Description du site',
    hero_title: 'Titre Hero',
    hero_subtitle: 'Sous-titre Hero',
    hero_cta_text: 'Texte CTA Hero',
    hero_cta_link: 'Lien CTA Hero',
    hero_image: 'Image Hero',
    footer_description: 'Description Footer',
    contact_phone: 'Téléphone',
    contact_email: 'Email',
    contact_address: 'Adresse',
    calendly_url: 'URL Calendly',
  };

  return (
    <div className="admin-editor">
      <div className="admin-editor-topbar">
        <div className="admin-editor-topbar-left">
          <button onClick={onClose} className="admin-btn-back">← Retour</button>
          <h2>Paramètres globaux</h2>
        </div>
        <div className="admin-editor-topbar-right">
          {message && (
            <span className={message.includes('Erreur') ? 'admin-msg-error' : 'admin-msg-success'}>
              {message}
            </span>
          )}
          <button onClick={handleSave} disabled={saving} className="admin-btn-save">
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
      <div className="admin-settings-panel">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="admin-field">
            <label className="admin-field-label">{settingLabels[key] || key}</label>
            {String(value).length > 80 ? (
              <textarea
                value={String(value)}
                onChange={(e) => handleChange(key, e.target.value)}
                className="admin-field-textarea"
                rows={3}
              />
            ) : (
              <input
                value={String(value)}
                onChange={(e) => handleChange(key, e.target.value)}
                className="admin-field-input"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  const fetchPages = useCallback(async () => {
    const res = await fetch('/api/admin/pages');
    if (res.ok) {
      const data = await res.json();
      setPages(data.pages);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) { router.push('/admin/login'); return; }
        const data = await res.json();
        setUser(data.user);
        await fetchPages();
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, fetchPages]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-loading-page">
        <div className="admin-spinner" />
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) return null;

  if (editingPage) {
    return (
      <div className="admin-wrapper">
        <PageEditor
          page={editingPage}
          onClose={() => { setEditingPage(null); fetchPages(); }}
          onSaved={fetchPages}
        />
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="admin-wrapper">
        <SettingsPanel onClose={() => setShowSettings(false)} />
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src="/1amanap-patrimoine.svg" alt="Amana" className="admin-sidebar-logo" />
        </div>

        <nav className="admin-sidebar-nav">
          <button className="admin-nav-item active">
            <span className="admin-nav-icon">📄</span>
            <span>Pages</span>
          </button>
          <button className="admin-nav-item" onClick={() => setShowSettings(true)}>
            <span className="admin-nav-icon">⚙️</span>
            <span>Paramètres</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <span className="admin-user-avatar">{user.name?.[0] || 'A'}</span>
            <div>
              <div className="admin-user-name">{user.name}</div>
              <div className="admin-user-email">{user.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-btn-logout">Déconnexion</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h1>Gestion des pages</h1>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn-outline">
            Voir le site →
          </a>
        </div>

        <div className="admin-pages-grid">
          {pages.map((page) => (
            <div key={page.id} className="admin-page-card" onClick={() => setEditingPage(page)}>
              <div className="admin-page-card-header">
                <span className={`admin-status ${page.published ? 'published' : 'draft'}`}>
                  {page.published ? 'Publié' : 'Brouillon'}
                </span>
                <span className="admin-page-blocks">{page.blocks?.length || 0} blocs</span>
              </div>
              <h3 className="admin-page-slug">/{page.slug}</h3>
              <p className="admin-page-title">{page.title}</p>
              <div className="admin-page-card-footer">
                Modifié le {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
