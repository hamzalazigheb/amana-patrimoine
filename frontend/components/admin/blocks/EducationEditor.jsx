'use client';

import ImageUpload from '../ImageUpload';

export default function EducationEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), { image: '', tag: '', title: '', description: '', link: '', linkLabel: '' }]);
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
          <label className="admin-field-label">Ressources</label>
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
                <label className="admin-field-label-sm">Tag</label>
                <input
                  value={item.tag || ''}
                  onChange={(e) => updateItem(i, 'tag', e.target.value)}
                  className="admin-field-input"
                  placeholder="Livre Blanc"
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
              <label className="admin-field-label-sm">Description</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => updateItem(i, 'description', e.target.value)}
                className="admin-field-textarea"
                rows={2}
              />
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label className="admin-field-label-sm">Lien « Lire la suite »</label>
                <input
                  value={item.link || ''}
                  onChange={(e) => updateItem(i, 'link', e.target.value)}
                  className="admin-field-input"
                  placeholder="/blog/mon-article ou https://..."
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Texte du lien (optionnel)</label>
                <input
                  value={item.linkLabel || ''}
                  onChange={(e) => updateItem(i, 'linkLabel', e.target.value)}
                  className="admin-field-input"
                  placeholder="Lire la suite"
                />
              </div>
            </div>
            <ImageUpload
              label="Image"
              hint="800 × 500 px"
              value={item.image || ''}
              onChange={(url) => updateItem(i, 'image', url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
