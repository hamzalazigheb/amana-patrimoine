'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminShell from '../../AdminShell';
import ImageUpload from '../../../../components/admin/ImageUpload';
import WhitepapersEditor from '../../../../components/admin/blocks/WhitepapersEditor';
import ActualitesEditor from '../../../../components/admin/blocks/ActualitesEditor';

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
  { value: 'whitepapers', label: 'Livres blancs (grille + formulaire)', fields: ['sectionTitle', 'items', 'form'] },
  { value: 'actualites', label: 'Nos actualités (vidéos YouTube)', fields: ['sectionTitle', 'items'] },
  { value: 'legal', label: 'Mentions légales', fields: ['body'] },
  { value: 'caseStudy', label: 'Étude de cas', fields: ['title', 'body'] },
  { value: 'stats', label: 'Chiffres clés (KPI)', fields: ['items'] },
  { value: 'testimonials', label: 'Témoignages clients', fields: ['title', 'items'] },
  { value: 'contact', label: 'Formulaire de contact', fields: ['title', 'description'] },
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
  partners:    [{ key: 'name', label: 'Nom', type: 'text' }, { key: 'logo', label: 'Logo', type: 'image' }],
  founders:    [{ key: 'name', label: 'Nom', type: 'text' }, { key: 'role', label: 'Rôle', type: 'text' }, { key: 'image', label: 'Photo', type: 'image' }, { key: 'description', label: 'Description', type: 'textarea' }],
  reassurance: [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }],
  education:      [{ key: 'image', label: 'Image', type: 'image' }, { key: 'tag', label: 'Tag (ex: Guide, Livre Blanc)', type: 'text' }, { key: 'title', label: 'Titre', type: 'text' }, { key: 'description', label: 'Description courte', type: 'textarea' }, { key: 'link', label: 'Lien (ex: /blog/mon-article)', type: 'text' }, { key: 'linkLabel', label: 'Texte du lien (ex: Lire la suite)', type: 'text' }],
  stats:          [{ key: 'value', label: 'Valeur (nombre)', type: 'text' }, { key: 'suffix', label: 'Suffixe (ex: +, %)', type: 'text' }, { key: 'prefix', label: 'Préfixe (optionnel)', type: 'text' }, { key: 'label', label: 'Libellé', type: 'text' }],
  testimonials:   [{ key: 'name', label: 'Prénom (ex: Karim B.)', type: 'text' }, { key: 'location', label: 'Ville', type: 'text' }, { key: 'context', label: 'Contexte (ex: SCPI halal)', type: 'text' }, { key: 'text', label: 'Témoignage', type: 'textarea' }, { key: 'rating', label: 'Note (1-5)', type: 'text' }],
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
              {field.type === 'image' ? (
                <ImageUpload
                  label={field.label}
                  hint="400 × 400 px"
                  value={item[field.key] || ''}
                  onChange={(url) => updateItem(idx, field.key, url)}
                />
              ) : (
                <>
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
                </>
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
        coverImage: page.coverImage || '',
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

  function updateBlockContentFull(index, content) {
    const updated = [...blocks];
    updated[index] = { ...updated[index], content };
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
        <h3>Paramètres SEO de la page</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="admin-form-group">
            <label>Slug</label>
            <input className="admin-input" value={page.slug} onChange={(e) => setPage({ ...page, slug: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Titre SEO</span>
              <span style={{ fontSize: '11px', color: (page.title || '').length >= 40 && (page.title || '').length <= 65 ? '#2e7d32' : '#c62828', fontWeight: 600 }}>
                {(page.title || '').length}/65
              </span>
            </label>
            <input className="admin-input" value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} />
            <span style={{ fontSize: '11px', color: '#888' }}>Optimal : 40–65 caractères</span>
          </div>
        </div>
        <div className="admin-form-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Description SEO (meta description)</span>
            <span style={{ fontSize: '11px', color: (page.description || '').length >= 120 && (page.description || '').length <= 160 ? '#2e7d32' : (page.description || '').length > 0 ? '#c62828' : '#aaa', fontWeight: 600 }}>
              {(page.description || '').length}/160
            </span>
          </label>
          <textarea className="admin-textarea" style={{ minHeight: '70px' }} value={page.description || ''} onChange={(e) => setPage({ ...page, description: e.target.value })} />
          <span style={{ fontSize: '11px', color: '#888' }}>Optimal : 120–160 caractères · Résumez la page, incluez le mot-clé principal</span>
        </div>
        {/* SERP preview */}
        {(page.title || page.description) && (
          <div style={{ background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '14px 16px', marginTop: '4px', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aperçu Google SERP</div>
            <div style={{ fontSize: '18px', color: '#1a0dab', fontWeight: 400, lineHeight: 1.3, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {(page.title || '').slice(0, 65) || 'Titre de la page'}
            </div>
            <div style={{ fontSize: '13px', color: '#006621', marginBottom: '4px' }}>
              https://amana-patrimoine.fr/{page.slug}
            </div>
            <div style={{ fontSize: '13px', color: '#545454', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {(page.description || '').slice(0, 160) || 'Aucune description renseignée — Google utilisera un extrait de la page.'}
            </div>
          </div>
        )}
        <div className="admin-form-group">
          <label>Mots-clés (séparés par des virgules)</label>
          <input className="admin-input" value={page.keywords || ''} onChange={(e) => setPage({ ...page, keywords: e.target.value })} placeholder="ex: finance islamique, SCPI halal, gestion patrimoine Paris" />
        </div>
        {page.slug?.startsWith('blog/') && (
          <div className="admin-form-group">
            <ImageUpload
              label="Image de fond — liste du blog"
              hint="1200 × 800 px — arrière-plan de la carte sur /blog"
              value={page.coverImage || ''}
              onChange={(url) => setPage({ ...page, coverImage: url })}
            />
          </div>
        )}
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

            {block.type === 'whitepapers' ? (
              <WhitepapersEditor
                content={block.content || {}}
                onChange={(content) => updateBlockContentFull(index, content)}
              />
            ) : block.type === 'actualites' ? (
              <ActualitesEditor
                content={block.content || {}}
                onChange={(content) => updateBlockContentFull(index, content)}
              />
            ) : (
            <>
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
            {(blockDef.fields.includes('image') || blockDef.fields.includes('backgroundImage')) && (() => {
              const imgKey = blockDef.fields.includes('backgroundImage') ? 'backgroundImage' : 'image';
              const hint = imgKey === 'backgroundImage' ? '1920 × 800 px' : '800 × 600 px';
              return (
                <ImageUpload
                  label="Image"
                  hint={hint}
                  value={block.content[imgKey] || block.content.image || block.content.backgroundImage || ''}
                  onChange={(url) => updateBlockContent(index, imgKey, url)}
                />
              );
            })()}
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
            </>
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
