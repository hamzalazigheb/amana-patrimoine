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
import FAQEditor from '@/components/admin/blocks/FAQEditor';

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
    case 'faq':
      return FAQEditor;
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
  const [activeSection, setActiveSection] = useState('pages'); // 'pages' | 'blog' | 'visibility'
  const [showNewArticle, setShowNewArticle] = useState(false);
  const [newArticleForm, setNewArticleForm] = useState({ slug: '', title: '', description: '' });
  const [newArticleError, setNewArticleError] = useState('');
  const [features, setFeatures] = useState({ simulateurs_visible: true });
  const [featureSaving, setFeatureSaving] = useState(false);
  const [featureMsg, setFeatureMsg] = useState('');
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
        const fr = await fetch('/api/public/features');
        if (fr.ok) setFeatures(await fr.json());
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, fetchPages]);

  const toggleFeature = async (key) => {
    const newVal = !features[key];
    setFeatureSaving(true);
    setFeatureMsg('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: newVal }),
      });
      if (!res.ok) throw new Error();
      setFeatures((prev) => ({ ...prev, [key]: newVal }));
      setFeatureMsg('Sauvegardé !');
      setTimeout(() => setFeatureMsg(''), 2500);
    } catch {
      setFeatureMsg('Erreur de sauvegarde');
    } finally {
      setFeatureSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const deleteArticle = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Supprimer cet article définitivement ?')) return;
    await fetch(`/api/pages/${id}`, { method: 'DELETE' });
    await fetchPages();
  };

  const togglePublishArticle = async (article, e) => {
    e.stopPropagation();
    await fetch(`/api/pages/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...article, published: !article.published }),
    });
    await fetchPages();
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    setNewArticleError('');
    const slug = `blog/${newArticleForm.slug.replace(/^blog\//, '').trim()}`;
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, title: newArticleForm.title, description: newArticleForm.description, keywords: '' }),
    });
    if (res.ok) {
      setShowNewArticle(false);
      setNewArticleForm({ slug: '', title: '', description: '' });
      await fetchPages();
    } else {
      const data = await res.json();
      setNewArticleError(data.error || 'Erreur lors de la création');
    }
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
          <div className="admin-nav-group-label">Contenu</div>
          <button
            className={`admin-nav-item ${activeSection === 'pages' ? 'active' : ''}`}
            onClick={() => { setActiveSection('pages'); setShowSettings(false); }}
          >
            Pages du site
          </button>
          <button
            className={`admin-nav-item ${activeSection === 'blog' ? 'active' : ''}`}
            onClick={() => { setActiveSection('blog'); setShowSettings(false); }}
          >
            Articles de blog
            <span className="admin-nav-badge">{pages.filter(p => p.slug.startsWith('blog/')).length}</span>
          </button>
          <div className="admin-nav-group-label">Configuration</div>
          <button
            className={`admin-nav-item ${activeSection === 'visibility' ? 'active' : ''}`}
            onClick={() => { setActiveSection('visibility'); setShowSettings(false); }}
          >
            Visibilité
          </button>
          <button className={`admin-nav-item ${showSettings ? 'active' : ''}`} onClick={() => { setShowSettings(true); setActiveSection(null); }}>
            Paramètres globaux
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
        {activeSection === 'pages' && (
          <>
            <div className="admin-topbar">
              <h1>Gestion des pages</h1>
              <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn-outline">
                Voir le site →
              </a>
            </div>
            <div className="admin-pages-grid">
              {pages.filter(p => !p.slug.startsWith('blog/')).map((page) => (
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
          </>
        )}

        {activeSection === 'visibility' && (
          <>
            <div className="admin-topbar">
              <h1>Visibilité des pages</h1>
              {featureMsg && <span style={{ fontSize: '0.875rem', color: featureMsg.includes('Erreur') ? '#dc3545' : '#28a745', fontWeight: 500 }}>{featureMsg}</span>}
            </div>
            <div className="admin-card">
              <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
                Activez ou désactivez des pages depuis la navigation du site. Les pages restent accessibles via leur URL directe.
              </p>
              <div className="admin-feature-list">
                <div className="admin-feature-row">
                  <div className="admin-feature-info">
                    <div className="admin-feature-name">Simulateurs</div>
                    <div className="admin-feature-desc">Page calculateur Zakat — lien dans le menu &quot;Ressources&quot;</div>
                    <code className="admin-feature-url">/simulateurs</code>
                  </div>
                  <button
                    className={`admin-toggle ${features.simulateurs_visible ? 'on' : 'off'}`}
                    onClick={() => toggleFeature('simulateurs_visible')}
                    disabled={featureSaving}
                    aria-label="Activer/désactiver Simulateurs"
                  >
                    <span className="admin-toggle-thumb" />
                    <span className="admin-toggle-label">{features.simulateurs_visible ? 'Visible' : 'Masqué'}</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'blog' && (
          <>
            <div className="admin-topbar">
              <h1>Articles de blog</h1>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a href="/blog" target="_blank" rel="noopener noreferrer" className="admin-btn-outline">
                  Voir le blog →
                </a>
                <button className="admin-btn-primary" onClick={() => setShowNewArticle(!showNewArticle)}>
                  + Nouvel article
                </button>
              </div>
            </div>

            {showNewArticle && (
              <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1rem', fontWeight: 600 }}>Créer un nouvel article</h3>
                {newArticleError && <div className="admin-alert admin-alert-error" style={{ marginBottom: '12px' }}>{newArticleError}</div>}
                <form onSubmit={handleCreateArticle}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div className="admin-field">
                      <label className="admin-field-label">Slug de l&apos;article</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>blog/</span>
                        <input
                          className="admin-field-input"
                          value={newArticleForm.slug}
                          onChange={(e) => setNewArticleForm({ ...newArticleForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          placeholder="mon-article-de-blog"
                          required
                        />
                      </div>
                    </div>
                    <div className="admin-field">
                      <label className="admin-field-label">Titre SEO</label>
                      <input
                        className="admin-field-input"
                        value={newArticleForm.title}
                        onChange={(e) => setNewArticleForm({ ...newArticleForm, title: e.target.value })}
                        placeholder="Titre de l'article"
                        required
                      />
                    </div>
                  </div>
                  <div className="admin-field" style={{ marginBottom: '16px' }}>
                    <label className="admin-field-label">Description / extrait</label>
                    <textarea
                      className="admin-field-textarea"
                      style={{ minHeight: '64px' }}
                      value={newArticleForm.description}
                      onChange={(e) => setNewArticleForm({ ...newArticleForm, description: e.target.value })}
                      placeholder="Courte description pour les moteurs de recherche et l'aperçu de la carte"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" className="admin-btn-primary">Créer l&apos;article</button>
                    <button type="button" className="admin-btn-outline" onClick={() => { setShowNewArticle(false); setNewArticleError(''); }}>Annuler</button>
                  </div>
                </form>
              </div>
            )}

            {pages.filter(p => p.slug.startsWith('blog/')).length === 0 ? (
              <div className="admin-card" style={{ textAlign: 'center', padding: '48px', color: 'var(--admin-text-muted)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✍️</div>
                <p>Aucun article de blog pour l&apos;instant.</p>
                <button className="admin-btn-primary" style={{ marginTop: '16px' }} onClick={() => setShowNewArticle(true)}>
                  Créer le premier article
                </button>
              </div>
            ) : (
              <div className="admin-blog-list">
                {pages.filter(p => p.slug.startsWith('blog/')).map((article) => (
                  <div key={article.id} className="admin-blog-row">
                    <div className="admin-blog-row-main">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span className={`admin-status ${article.published ? 'published' : 'draft'}`}>
                          {article.published ? 'Publié' : 'Brouillon'}
                        </span>
                        <code style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)' }}>/{article.slug}</code>
                        <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', marginLeft: 'auto' }}>
                          Modifié le {new Date(article.updatedAt).toLocaleDateString('fr-FR')} · {article.blocks?.length || 0} blocs
                        </span>
                      </div>
                      <h3 className="admin-blog-row-title">{article.title}</h3>
                      {article.description && (
                        <p className="admin-blog-row-desc">{article.description}</p>
                      )}
                    </div>
                    <div className="admin-blog-row-actions">
                      <button
                        className="admin-row-btn"
                        onClick={() => setEditingPage(article)}
                        title="Éditer le contenu"
                      >
                        Éditer
                      </button>
                      <button
                        className={`admin-row-btn ${article.published ? 'admin-row-btn-warn' : 'admin-row-btn-success'}`}
                        onClick={(e) => togglePublishArticle(article, e)}
                        title={article.published ? 'Dépublier' : 'Publier'}
                      >
                        {article.published ? 'Dépublier' : 'Publier'}
                      </button>
                      <button
                        className="admin-row-btn admin-row-btn-danger"
                        onClick={(e) => deleteArticle(article.id, e)}
                        title="Supprimer l'article"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
