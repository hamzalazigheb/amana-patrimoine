'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminShell from '../../AdminShell';

const BLOCK_TYPES = [
  { value: 'pageHero', label: 'Hero de page', fields: ['badge', 'title', 'subtitle', 'image', 'ctaText'] },
  { value: 'hero', label: 'Hero (accueil)', fields: ['title', 'subtitle', 'ctaText', 'ctaLink', 'backgroundImage'] },
  { value: 'content', label: 'Section de contenu', fields: ['label', 'title', 'body', 'background'] },
  { value: 'services', label: 'Services', fields: ['title', 'description', 'items'] },
  { value: 'tools', label: 'Outils / Solutions', fields: ['title', 'items'] },
  { value: 'faq', label: 'FAQ', fields: ['items'] },
  { value: 'cta', label: 'Call to Action', fields: ['title', 'subtitle', 'description', 'ctaText', 'ctaLink'] },
  { value: 'profiles', label: 'Tableau profils', fields: ['items'] },
  { value: 'trust', label: 'Indicateurs de confiance', fields: ['title', 'items'] },
  { value: 'methodology', label: 'Méthodologie', fields: ['title', 'steps'] },
  { value: 'partners', label: 'Partenaires', fields: ['title', 'description', 'items'] },
  { value: 'founders', label: 'Fondateurs', fields: ['items'] },
  { value: 'islamicFinance', label: 'Finance islamique', fields: ['title', 'paragraphs'] },
  { value: 'intro', label: 'Introduction', fields: ['paragraphs'] },
  { value: 'reassurance', label: 'Réassurance', fields: ['items'] },
  { value: 'education', label: 'Ressources éducatives', fields: ['title', 'description', 'items'] },
  { value: 'legal', label: 'Mentions légales', fields: ['body'] },
  { value: 'caseStudy', label: 'Étude de cas', fields: ['title', 'body'] },
  { value: 'custom', label: 'Bloc personnalisé', fields: ['body'] },
];

// ── Item field configs per block type ──
const ITEM_FIELDS = {
  services:    [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'link', label: 'Lien', type: 'text' }],
  tools:       [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'features', label: 'Caractéristiques (une par ligne)', type: 'features' }],
  faq:         [{ key: 'question', label: 'Question', type: 'text' }, { key: 'answer', label: 'Réponse', type: 'textarea' }],
  profiles:    [{ key: 'profile', label: 'Profil', type: 'text' }, { key: 'solutions', label: 'Solutions', type: 'text' }],
  trust:       [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }],
  methodology: [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }],
  partners:    [{ key: 'name', label: 'Nom', type: 'text' }, { key: 'logo', label: 'Logo (chemin)', type: 'text' }],
  founders:    [{ key: 'name', label: 'Nom', type: 'text' }, { key: 'role', label: 'Rôle', type: 'text' }, { key: 'image', label: 'Photo (chemin)', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }],
  reassurance: [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }],
  education:   [{ key: 'image', label: 'Image (chemin)', type: 'text' }, { key: 'tag', label: 'Tag', type: 'text' }, { key: 'title', label: 'Titre', type: 'text' }],
};

function ItemsEditor({ blockType, items, onChange }) {
  const fields = ITEM_FIELDS[blockType] || [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }];
  const isSteps = blockType === 'methodology';
  const label = isSteps ? 'étape' : 'élément';

  function updateItem(idx, key, value) {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [key]: value };
    onChange(updated);
  }

  function addItem() {
    const empty = {};
    fields.forEach(f => { empty[f.key] = f.type === 'features' ? [] : ''; });
    onChange([...items, empty]);
  }

  function removeItem(idx) {
    onChange(items.filter((_, i) => i !== idx));
  }

  function moveItem(idx, dir) {
    const updated = [...items];
    const target = idx + dir;
    if (target < 0 || target >= updated.length) return;
    [updated[idx], updated[target]] = [updated[target], updated[idx]];
    onChange(updated);
  }

  return (
    <div style={{ marginTop: '8px' }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', marginBottom: '12px', background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#666' }}>{label} {idx + 1}</span>
            <div className="admin-actions">
              <button type="button" className="admin-btn-icon" onClick={() => moveItem(idx, -1)} title="Monter">&#9650;</button>
              <button type="button" className="admin-btn-icon" onClick={() => moveItem(idx, 1)} title="Descendre">&#9660;</button>
              <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => removeItem(idx)}>Suppr.</button>
            </div>
          </div>
          {fields.map((field) => (
            <div key={field.key} className="admin-form-group" style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '12px' }}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: '70px' }}
                  value={item[field.key] || ''}
                  onChange={(e) => updateItem(idx, field.key, e.target.value)}
                />
              ) : field.type === 'features' ? (
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: '60px' }}
                  placeholder="Une caractéristique par ligne"
                  value={(item[field.key] || []).join('\n')}
                  onChange={(e) => updateItem(idx, field.key, e.target.value.split('\n').filter(l => l.trim()))}
                />
              ) : (
                <input
                  className="admin-input"
                  value={item[field.key] || ''}
                  onChange={(e) => updateItem(idx, field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="button" className="admin-btn admin-btn-outline admin-btn-sm" onClick={addItem}>
        + Ajouter un {label}
      </button>
    </div>
  );
}

export default function PageEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newBlockType, setNewBlockType] = useState('content');

  useEffect(() => { loadPage(); }, [id]);

  async function loadPage() {
    const res = await fetch(`/api/pages/${id}`);
    if (!res.ok) { router.push('/admin/pages'); return; }
    const data = await res.json();
    setPage(data);
    setBlocks(data.blocks || []);
  }

  async function savePage(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    await fetch(`/api/pages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: page.slug,
        title: page.title,
        description: page.description,
        keywords: page.keywords,
        published: page.published,
      }),
    });

    for (const block of blocks) {
      if (block.id && !block._new) {
        await fetch(`/api/blocks/${block.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: block.type, order: block.order, content: block.content }),
        });
      } else if (block._new) {
        await fetch('/api/blocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId: id, type: block.type, order: block.order, content: block.content }),
        });
      }
    }

    setSaving(false);
    setMessage('Page sauvegardée');
    loadPage();
    setTimeout(() => setMessage(''), 3000);
  }

  async function deleteBlock(block, index) {
    if (!confirm('Supprimer ce bloc ?')) return;
    if (block.id && !block._new) {
      await fetch(`/api/blocks/${block.id}`, { method: 'DELETE' });
    }
    setBlocks(blocks.filter((_, i) => i !== index));
  }

  function addBlock() {
    setBlocks([...blocks, {
      _new: true,
      type: newBlockType,
      order: blocks.length,
      content: {},
    }]);
  }

  function updateBlockContent(index, key, value) {
    const updated = [...blocks];
    updated[index] = {
      ...updated[index],
      content: { ...updated[index].content, [key]: value },
    };
    setBlocks(updated);
  }

  function moveBlock(index, direction) {
    const updated = [...blocks];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    updated.forEach((b, i) => { b.order = i; });
    setBlocks(updated);
  }

  if (!page) return <AdminShell><p>Chargement...</p></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Éditer : {page.title}</h1>
        <div className="admin-flex">
          <a href="/admin/pages" className="admin-btn admin-btn-outline">Retour</a>
          <button className="admin-btn admin-btn-primary" onClick={savePage} disabled={saving}>
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}

      <div className="admin-card">
        <h3>Paramètres de la page</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="admin-form-group">
            <label>Slug</label>
            <input className="admin-input" value={page.slug} onChange={(e) => setPage({ ...page, slug: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Titre SEO</label>
            <input className="admin-input" value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} />
          </div>
        </div>
        <div className="admin-form-group">
          <label>Description SEO</label>
          <textarea className="admin-textarea" style={{ minHeight: '60px' }} value={page.description || ''} onChange={(e) => setPage({ ...page, description: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label>Mots-clés</label>
          <input className="admin-input" value={page.keywords || ''} onChange={(e) => setPage({ ...page, keywords: e.target.value })} />
        </div>
        <div className="admin-checkbox-group">
          <input type="checkbox" checked={page.published} onChange={(e) => setPage({ ...page, published: e.target.checked })} id="published" />
          <label htmlFor="published" style={{ margin: 0 }}>Publié</label>
        </div>
      </div>

      <div className="admin-header" style={{ marginTop: '16px' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Blocs de contenu ({blocks.length})</h2>
        <div className="admin-flex">
          <select className="admin-select" style={{ width: 'auto' }} value={newBlockType} onChange={(e) => setNewBlockType(e.target.value)}>
            {BLOCK_TYPES.map((bt) => (
              <option key={bt.value} value={bt.value}>{bt.label}</option>
            ))}
          </select>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={addBlock}>+ Ajouter un bloc</button>
        </div>
      </div>

      {blocks.map((block, index) => {
        const blockDef = BLOCK_TYPES.find((bt) => bt.value === block.type) || BLOCK_TYPES[BLOCK_TYPES.length - 1];
        const hasItems = blockDef.fields.includes('items');
        const hasSteps = blockDef.fields.includes('steps');
        const itemsKey = hasSteps ? 'steps' : 'items';

        return (
          <div key={block.id || `new-${index}`} className="admin-block-item">
            <div className="admin-block-header">
              <div className="admin-flex">
                <span className="admin-block-type">{blockDef.label}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>Ordre: {index}</span>
              </div>
              <div className="admin-actions">
                <button className="admin-btn-icon" onClick={() => moveBlock(index, -1)} title="Monter">&#9650;</button>
                <button className="admin-btn-icon" onClick={() => moveBlock(index, 1)} title="Descendre">&#9660;</button>
                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteBlock(block, index)}>Suppr.</button>
              </div>
            </div>

            {blockDef.fields.includes('badge') && (
              <div className="admin-form-group">
                <label>Badge</label>
                <input className="admin-input" value={block.content.badge || ''} onChange={(e) => updateBlockContent(index, 'badge', e.target.value)} />
              </div>
            )}
            {blockDef.fields.includes('title') && (
              <div className="admin-form-group">
                <label>Titre</label>
                <input className="admin-input" value={block.content.title || ''} onChange={(e) => updateBlockContent(index, 'title', e.target.value)} />
              </div>
            )}
            {blockDef.fields.includes('label') && (
              <div className="admin-form-group">
                <label>Label</label>
                <input className="admin-input" value={block.content.label || ''} onChange={(e) => updateBlockContent(index, 'label', e.target.value)} />
              </div>
            )}
            {blockDef.fields.includes('subtitle') && (
              <div className="admin-form-group">
                <label>Sous-titre</label>
                <textarea className="admin-textarea" value={block.content.subtitle || ''} onChange={(e) => updateBlockContent(index, 'subtitle', e.target.value)} />
              </div>
            )}
            {blockDef.fields.includes('description') && (
              <div className="admin-form-group">
                <label>Description</label>
                <textarea className="admin-textarea" value={block.content.description || ''} onChange={(e) => updateBlockContent(index, 'description', e.target.value)} />
              </div>
            )}
            {blockDef.fields.includes('body') && (
              <div className="admin-form-group">
                <label>Contenu (HTML)</label>
                <textarea className="admin-textarea" style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '13px' }} value={block.content.body || ''} onChange={(e) => updateBlockContent(index, 'body', e.target.value)} />
              </div>
            )}
            {blockDef.fields.includes('paragraphs') && (
              <div className="admin-form-group">
                <label>Paragraphes (un par ligne)</label>
                <textarea className="admin-textarea" style={{ minHeight: '150px' }} value={(block.content.paragraphs || []).join('\n')} onChange={(e) => updateBlockContent(index, 'paragraphs', e.target.value.split('\n'))} />
              </div>
            )}
            {(blockDef.fields.includes('image') || blockDef.fields.includes('backgroundImage')) && (
              <div className="admin-form-group">
                <label>Image (chemin)</label>
                <input className="admin-input" value={block.content.image || block.content.backgroundImage || ''} onChange={(e) => updateBlockContent(index, blockDef.fields.includes('backgroundImage') ? 'backgroundImage' : 'image', e.target.value)} placeholder="/uploads/image.jpg" />
              </div>
            )}
            {blockDef.fields.includes('background') && (
              <div className="admin-form-group">
                <label>Fond</label>
                <select className="admin-select" value={block.content.background || 'cream'} onChange={(e) => updateBlockContent(index, 'background', e.target.value)}>
                  <option value="cream">Crème</option>
                  <option value="beige">Beige</option>
                  <option value="white">Blanc</option>
                  <option value="navy">Marine</option>
                </select>
              </div>
            )}
            {blockDef.fields.includes('ctaText') && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="admin-form-group">
                  <label>Texte CTA</label>
                  <input className="admin-input" value={block.content.ctaText || ''} onChange={(e) => updateBlockContent(index, 'ctaText', e.target.value)} />
                </div>
                {blockDef.fields.includes('ctaLink') && (
                  <div className="admin-form-group">
                    <label>Lien CTA</label>
                    <input className="admin-input" value={block.content.ctaLink || ''} onChange={(e) => updateBlockContent(index, 'ctaLink', e.target.value)} />
                  </div>
                )}
              </div>
            )}

            {(hasItems || hasSteps) && (
              <div className="admin-form-group">
                <label style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
                  {hasSteps ? 'Étapes' : 'Éléments'} ({(block.content[itemsKey] || []).length})
                </label>
                <ItemsEditor
                  blockType={block.type}
                  items={block.content[itemsKey] || []}
                  onChange={(newItems) => updateBlockContent(index, itemsKey, newItems)}
                />
              </div>
            )}
          </div>
        );
      })}

      {blocks.length === 0 && (
        <div className="admin-card admin-empty">
          <p>Aucun bloc. Utilisez le bouton ci-dessus pour ajouter du contenu.</p>
        </div>
      )}
    </AdminShell>
  );
}
