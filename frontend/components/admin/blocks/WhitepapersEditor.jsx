'use client';

import ImageUpload from '../ImageUpload';

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function WhitepapersEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  const updateForm = (field, value) => {
    update('form', { ...(content.form || {}), [field]: value });
  };

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    if (field === 'title' && !items[index].id) {
      items[index].id = slugify(value);
    }
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), {
      id: '',
      image: '',
      title: '',
      subtitle: '',
      pdfFile: '',
    }]);
  };

  const removeItem = (index) => {
    update('items', (content.items || []).filter((_, i) => i !== index));
  };

  const updateProjectOption = (index, field, value) => {
    const opts = [...(content.form?.projectOptions || [])];
    opts[index] = { ...opts[index], [field]: value };
    updateForm('projectOptions', opts);
  };

  const addProjectOption = () => {
    updateForm('projectOptions', [...(content.form?.projectOptions || []), { value: '', label: '' }]);
  };

  const removeProjectOption = (index) => {
    updateForm('projectOptions', (content.form?.projectOptions || []).filter((_, i) => i !== index));
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Titre de la section (grille)</label>
        <input
          value={content.sectionTitle || ''}
          onChange={(e) => update('sectionTitle', e.target.value)}
          className="admin-field-input"
        />
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Description de la section</label>
        <textarea
          value={content.sectionDescription || ''}
          onChange={(e) => update('sectionDescription', e.target.value)}
          className="admin-field-textarea"
          rows={2}
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Livres blancs</label>
          <button type="button" onClick={addItem} className="admin-btn-add-small">+ Ajouter</button>
        </div>
        {(content.items || []).map((item, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">{i + 1}</span>
              <button type="button" onClick={() => removeItem(i)} className="admin-repeater-remove">×</button>
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label className="admin-field-label-sm">ID (slug unique)</label>
                <input
                  value={item.id || ''}
                  onChange={(e) => updateItem(i, 'id', e.target.value)}
                  className="admin-field-input"
                  placeholder="investissement-halal"
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Titre</label>
                <input
                  value={item.title || ''}
                  onChange={(e) => updateItem(i, 'title', e.target.value)}
                  className="admin-field-input"
                />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Sous-titre</label>
              <input
                value={item.subtitle || ''}
                onChange={(e) => updateItem(i, 'subtitle', e.target.value)}
                className="admin-field-input"
              />
            </div>
            <ImageUpload
              label="Image de couverture"
              hint="800 × 520 px"
              value={item.image || ''}
              onChange={(url) => updateItem(i, 'image', url)}
            />
            <div className="admin-field">
              <label className="admin-field-label-sm">Fichier PDF (chemin public)</label>
              <input
                value={item.pdfFile || ''}
                onChange={(e) => updateItem(i, 'pdfFile', e.target.value)}
                className="admin-field-input"
                placeholder="/downloads/mon-livre-blanc.pdf"
              />
              <p className="admin-field-hint">Déposez le PDF dans <code>public/downloads/</code> ou via Médias puis copiez le chemin.</p>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #e5e5e5' }} />

      <p className="admin-field-label" style={{ marginBottom: '0.75rem' }}>Formulaire de demande</p>
      <div className="admin-field">
        <label className="admin-field-label-sm">Titre du formulaire</label>
        <input
          value={content.form?.title || ''}
          onChange={(e) => updateForm('title', e.target.value)}
          className="admin-field-input"
        />
      </div>
      <div className="admin-field">
        <label className="admin-field-label-sm">Description</label>
        <textarea
          value={content.form?.description || ''}
          onChange={(e) => updateForm('description', e.target.value)}
          className="admin-field-textarea"
          rows={2}
        />
      </div>
      <div className="admin-field">
        <label className="admin-field-label-sm">Libellé newsletter (optionnel)</label>
        <input
          value={content.form?.newsletterLabel || ''}
          onChange={(e) => updateForm('newsletterLabel', e.target.value)}
          className="admin-field-input"
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Options « Quel est votre projet ? »</label>
          <button type="button" onClick={addProjectOption} className="admin-btn-add-small">+ Ajouter</button>
        </div>
        {(content.form?.projectOptions || []).map((opt, i) => (
          <div key={i} className="admin-field-row" style={{ marginBottom: '0.5rem' }}>
            <input
              value={opt.value || ''}
              onChange={(e) => updateProjectOption(i, 'value', e.target.value)}
              className="admin-field-input"
              placeholder="valeur"
            />
            <input
              value={opt.label || ''}
              onChange={(e) => updateProjectOption(i, 'label', e.target.value)}
              className="admin-field-input"
              placeholder="Libellé affiché"
            />
            <button type="button" onClick={() => removeProjectOption(i)} className="admin-repeater-remove">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
