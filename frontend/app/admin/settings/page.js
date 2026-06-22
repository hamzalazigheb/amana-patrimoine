'use client';

import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';
import { DEFAULT_NAV_ITEMS } from '@/lib/nav-defaults';

const GENERAL_FIELDS = [
  { key: 'site_name', label: 'Nom du site', type: 'text' },
  { key: 'site_description', label: 'Description du site', type: 'textarea' },
  { key: 'hero_title', label: 'Titre Hero (accueil)', type: 'text' },
  { key: 'hero_subtitle', label: 'Sous-titre Hero', type: 'textarea' },
  { key: 'hero_cta_text', label: 'CTA Hero texte', type: 'text' },
  { key: 'hero_cta_link', label: 'CTA Hero lien', type: 'text' },
  { key: 'hero_image', label: 'Image Hero (chemin)', type: 'text', hint: '1920 × 800 px' },
  { key: 'calendly_url', label: 'Lien Calendly', type: 'text' },
];

const CONTACT_FIELDS = [
  { key: 'contact_phone', label: 'Téléphone', type: 'text' },
  { key: 'contact_email', label: 'Email', type: 'text' },
  { key: 'contact_address', label: 'Adresse (retour à la ligne avec \\n)', type: 'textarea' },
  { key: 'contact_hours', label: 'Horaires (ex: Lun–Ven : 9h00–18h00)', type: 'text' },
];

const SOCIAL_FIELDS = [
  { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
  { key: 'social_youtube', label: 'YouTube URL', type: 'text' },
  { key: 'social_whatsapp', label: 'WhatsApp URL (ex: https://wa.me/33xxxxxxxxx)', type: 'text' },
];

const NAV_FIELDS = [
  { key: 'nav_phone', label: 'Téléphone affiché dans la barre de navigation (ex: 06 68 60 36 19)', type: 'text' },
  { key: 'nav_phone_href', label: 'Lien téléphone (ex: tel:+33189700000)', type: 'text' },
  { key: 'nav_cta_text', label: 'Texte du bouton CTA (ex: Bilan Patrimonial)', type: 'text' },
  { key: 'nav_cta_link', label: 'Lien du bouton CTA (ex: /bilan-patrimonial)', type: 'text' },
];

/* ── Nav sub-item row (href + title + desc) ── */
function NavSubItemRow({ item, onUpdate, onRemove }) {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
      <input className="admin-input" placeholder="Titre" value={item.title || ''} onChange={(e) => onUpdate('title', e.target.value)} style={{ flex: 2 }} />
      <input className="admin-input" placeholder="Description courte" value={item.desc || ''} onChange={(e) => onUpdate('desc', e.target.value)} style={{ flex: 2 }} />
      <input className="admin-input" placeholder="/url" value={item.href || ''} onChange={(e) => onUpdate('href', e.target.value)} style={{ flex: 1 }} />
      <button type="button" className="admin-btn" style={{ color: '#ef4444', padding: '4px 10px', minWidth: 'auto' }} onClick={onRemove}>✕</button>
    </div>
  );
}

/* ── Simple dropdown items list ── */
function NavDropdownEditor({ items, onChange }) {
  const update = (idx, field, val) => onChange(items.map((it, i) => i === idx ? { ...it, [field]: val } : it));
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
  const add = () => onChange([...items, { href: '/', title: 'Nouveau lien', desc: '' }]);
  return (
    <div style={{ paddingLeft: '12px', borderLeft: '3px solid var(--admin-border)', marginTop: '8px' }}>
      {items.map((item, idx) => (
        <NavSubItemRow key={idx} item={item} onUpdate={(f, v) => update(idx, f, v)} onRemove={() => remove(idx)} />
      ))}
      <button type="button" className="admin-btn" style={{ marginTop: '4px', fontSize: '0.85rem' }} onClick={add}>+ Ajouter un lien</button>
    </div>
  );
}

/* ── Mega menu columns editor ── */
function NavMegaEditor({ columns, onChange }) {
  const updateCol = (ci, f, v) => onChange(columns.map((c, i) => i === ci ? { ...c, [f]: v } : c));
  const updateItems = (ci, its) => onChange(columns.map((c, i) => i === ci ? { ...c, items: its } : c));
  const removeCol = (ci) => onChange(columns.filter((_, i) => i !== ci));
  const addCol = () => onChange([...columns, { title: 'Nouvelle colonne', items: [] }]);
  return (
    <div style={{ marginTop: '8px' }}>
      {columns.map((col, ci) => (
        <div key={ci} style={{ marginBottom: '10px', border: '1px solid var(--admin-border)', borderRadius: '6px', padding: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <input className="admin-input" placeholder="Titre de la colonne" value={col.title || ''} onChange={(e) => updateCol(ci, 'title', e.target.value)} style={{ flex: 1, fontWeight: 600 }} />
            <button type="button" className="admin-btn" style={{ color: '#ef4444', padding: '4px 10px', minWidth: 'auto' }} onClick={() => removeCol(ci)}>Supprimer</button>
          </div>
          <NavDropdownEditor items={col.items || []} onChange={(its) => updateItems(ci, its)} />
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-outline" onClick={addCol}>+ Ajouter une colonne</button>
    </div>
  );
}

/* ── Single top-level nav item editor ── */
function NavTopItemEditor({ item, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ marginBottom: '8px', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '10px', background: '#fff' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button type="button" onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--admin-text)', padding: '2px 6px' }}>
          {expanded ? '▼' : '▶'}
        </button>
        <input className="admin-input" placeholder="Label" value={item.label || ''} onChange={(e) => onUpdate('label', e.target.value)} style={{ flex: 1, maxWidth: '180px', fontWeight: 600 }} />
        <select className="admin-input" value={item.type || 'link'} onChange={(e) => onUpdate('type', e.target.value)} style={{ maxWidth: '160px' }}>
          <option value="link">Lien simple</option>
          <option value="dropdown">Menu déroulant</option>
          <option value="mega">Mega menu</option>
        </select>
        <button type="button" className="admin-btn" style={{ color: '#ef4444', padding: '4px 10px', minWidth: 'auto' }} onClick={onRemove}>✕</button>
      </div>
      {expanded && (
        <div style={{ marginTop: '10px' }}>
          {item.type === 'link' && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', display: 'block', marginBottom: '4px' }}>URL</label>
              <input className="admin-input" placeholder="/qui-sommes-nous" value={item.href || ''} onChange={(e) => onUpdate('href', e.target.value)} />
            </div>
          )}
          {item.type === 'dropdown' && (
            <NavDropdownEditor items={item.items || []} onChange={(its) => onUpdate('items', its)} />
          )}
          {item.type === 'mega' && (
            <NavMegaEditor columns={item.columns || []} onChange={(cols) => onUpdate('columns', cols)} />
          )}
        </div>
      )}
    </div>
  );
}

/* ── Full nav items editor ── */
function NavItemsEditor({ items, onChange }) {
  const update = (idx, field, val) => onChange(items.map((it, i) => i === idx ? { ...it, [field]: val } : it));
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
  const add = () => onChange([...items, { label: 'Nouveau lien', type: 'link', href: '/' }]);
  return (
    <div>
      {items.map((item, idx) => (
        <NavTopItemEditor key={idx} item={item} onUpdate={(f, v) => update(idx, f, v)} onRemove={() => remove(idx)} />
      ))}
      <button type="button" className="admin-btn admin-btn-outline" onClick={add} style={{ marginTop: '6px' }}>+ Ajouter un élément de menu</button>
    </div>
  );
}

const DEFAULT_COLUMNS = [
  {
    title: 'Expertises',
    links: [
      { label: 'Stratégie Patrimoniale', href: '/strategie' },
      { label: 'Investissement Immobilier', href: '/immobilier' },
      { label: 'Préparation Retraite', href: '/retraite' },
    ],
  },
  {
    title: 'Cabinet',
    links: [
      { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
      { label: 'Notre Approche', href: '/#methodology' },
      { label: 'Mentions Légales', href: '/mentions-legales' },
    ],
  },
];

function FooterColumnsEditor({ columns, onChange }) {
  function updateColumn(colIdx, field, value) {
    const next = columns.map((c, i) => i === colIdx ? { ...c, [field]: value } : c);
    onChange(next);
  }

  function updateLink(colIdx, linkIdx, field, value) {
    const next = columns.map((c, i) => {
      if (i !== colIdx) return c;
      const links = c.links.map((l, j) => j === linkIdx ? { ...l, [field]: value } : l);
      return { ...c, links };
    });
    onChange(next);
  }

  function addLink(colIdx) {
    const next = columns.map((c, i) => {
      if (i !== colIdx) return c;
      return { ...c, links: [...(c.links || []), { label: '', href: '' }] };
    });
    onChange(next);
  }

  function removeLink(colIdx, linkIdx) {
    const next = columns.map((c, i) => {
      if (i !== colIdx) return c;
      return { ...c, links: c.links.filter((_, j) => j !== linkIdx) };
    });
    onChange(next);
  }

  function addColumn() {
    onChange([...columns, { title: 'Nouvelle colonne', links: [] }]);
  }

  function removeColumn(colIdx) {
    onChange(columns.filter((_, i) => i !== colIdx));
  }

  return (
    <div>
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="admin-card" style={{ marginBottom: '16px', border: '1px solid var(--admin-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <input
              className="admin-input"
              style={{ fontWeight: 600, fontSize: '1rem', maxWidth: '220px' }}
              value={col.title}
              placeholder="Titre de la colonne"
              onChange={(e) => updateColumn(colIdx, 'title', e.target.value)}
            />
            <button
              type="button"
              className="admin-btn"
              style={{ color: '#ef4444', borderColor: '#ef4444' }}
              onClick={() => removeColumn(colIdx)}
            >
              Supprimer la colonne
            </button>
          </div>

          <div style={{ paddingLeft: '12px', borderLeft: '3px solid var(--admin-border)' }}>
            {(col.links || []).map((link, linkIdx) => (
              <div key={linkIdx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input
                  className="admin-input"
                  placeholder="Texte du lien"
                  value={link.label}
                  onChange={(e) => updateLink(colIdx, linkIdx, 'label', e.target.value)}
                  style={{ flex: 2 }}
                />
                <input
                  className="admin-input"
                  placeholder="URL (/page ou https://...)"
                  value={link.href}
                  onChange={(e) => updateLink(colIdx, linkIdx, 'href', e.target.value)}
                  style={{ flex: 3 }}
                />
                <button
                  type="button"
                  className="admin-btn"
                  style={{ color: '#ef4444', padding: '4px 10px', minWidth: 'auto' }}
                  onClick={() => removeLink(colIdx, linkIdx)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="admin-btn"
              style={{ marginTop: '4px', fontSize: '0.85rem' }}
              onClick={() => addLink(colIdx)}
            >
              + Ajouter un lien
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="admin-btn admin-btn-secondary" onClick={addColumn}>
        + Ajouter une colonne
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({});
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [navItems, setNavItems] = useState(DEFAULT_NAV_ITEMS);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data || {});
      if (Array.isArray(data?.footer_columns) && data.footer_columns.length > 0) {
        setColumns(data.footer_columns);
      }
      if (Array.isArray(data?.nav_items) && data.nav_items.length > 0) {
        setNavItems(data.nav_items);
      }
    }
    load();
  }, []);

  function setField(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const payload = { ...settings, footer_columns: columns, nav_items: navItems };

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      setMessage('Paramètres sauvegardés avec succès !');
      setTimeout(() => setMessage(''), 4000);
    } else {
      setMessage('Erreur lors de la sauvegarde.');
    }
  }

  function renderFields(fields) {
    return fields.map((field) => (
      <div className="admin-form-group" key={field.key}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {field.label}
          {field.hint && (
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#92660a', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '4px', padding: '1px 7px', whiteSpace: 'nowrap' }}>
              {field.hint}
            </span>
          )}
        </label>
        {field.type === 'textarea' ? (
          <textarea
            className="admin-textarea"
            style={{ minHeight: '80px' }}
            value={settings[field.key] || ''}
            onChange={(e) => setField(field.key, e.target.value)}
          />
        ) : (
          <input
            className="admin-input"
            type="text"
            value={settings[field.key] || ''}
            onChange={(e) => setField(field.key, e.target.value)}
          />
        )}
      </div>
    ));
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Paramètres globaux</h1>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {message && (
        <div className={`admin-alert ${message.startsWith('Erreur') ? 'admin-alert-error' : 'admin-alert-success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <h3>Informations générales</h3>
          {renderFields(GENERAL_FIELDS)}
        </div>

        <div className="admin-card" style={{ marginTop: '24px' }}>
          <h3>Contact & Footer</h3>
          {renderFields(CONTACT_FIELDS)}
        </div>

        <div className="admin-card" style={{ marginTop: '24px' }}>
          <h3>Réseaux sociaux</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '12px' }}>
            Laissez vide pour masquer l&apos;icône correspondante.
          </p>
          {renderFields(SOCIAL_FIELDS)}
        </div>

        <div className="admin-card" style={{ marginTop: '24px' }}>
          <h3>Barre de navigation</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
            Personnalisez le numéro de téléphone et le bouton d&apos;action affiché dans le menu principal.
          </p>
          {renderFields(NAV_FIELDS)}
        </div>

        <div className="admin-card" style={{ marginTop: '24px' }}>
          <h3>Éléments du menu principal</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
            Gérez les liens, menus déroulants et mega menus affichés dans la barre de navigation.
            Cliquez sur ▶ pour dérouler un élément et modifier son contenu.
          </p>
          <NavItemsEditor items={navItems} onChange={setNavItems} />
        </div>

        <div className="admin-card" style={{ marginTop: '24px' }}>
          <h3>Colonnes de navigation du footer</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
            Gérez les colonnes de liens qui apparaissent dans le footer du site.
          </p>
          <FooterColumnsEditor columns={columns} onChange={setColumns} />
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
            {saving ? 'Sauvegarde...' : 'Sauvegarder tous les paramètres'}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
