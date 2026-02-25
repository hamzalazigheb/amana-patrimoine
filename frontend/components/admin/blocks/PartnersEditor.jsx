'use client';

import ImageUpload from '../ImageUpload';

export default function PartnersEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), { name: '', logo: '' }]);
  };

  const removeItem = (index) => {
    update('items', (content.items || []).filter((_, i) => i !== index));
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Titre de la section</label>
        <input
          value={content.title || ''}
          onChange={(e) => update('title', e.target.value)}
          className="admin-field-input"
        />
      </div>

      <div className="admin-field">
        <label className="admin-field-label">Description</label>
        <textarea
          value={content.description || ''}
          onChange={(e) => update('description', e.target.value)}
          className="admin-field-textarea"
          rows={2}
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Partenaires</label>
          <button type="button" onClick={addItem} className="admin-btn-add-small">+ Ajouter</button>
        </div>

        <div className="admin-partners-grid">
          {(content.items || []).map((item, i) => (
            <div key={i} className="admin-partner-card">
              <button type="button" onClick={() => removeItem(i)} className="admin-partner-remove">×</button>
              <ImageUpload
                label="Logo"
                value={item.logo || ''}
                onChange={(url) => updateItem(i, 'logo', url)}
              />
              <div className="admin-field">
                <label className="admin-field-label-sm">Nom</label>
                <input
                  value={item.name || ''}
                  onChange={(e) => updateItem(i, 'name', e.target.value)}
                  className="admin-field-input"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
