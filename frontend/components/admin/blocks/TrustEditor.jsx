'use client';

export default function TrustEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    const items = [...(content.items || []), { title: '', description: '' }];
    update('items', items);
  };

  const removeItem = (index) => {
    const items = (content.items || []).filter((_, i) => i !== index);
    update('items', items);
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

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Éléments de confiance</label>
          <button type="button" onClick={addItem} className="admin-btn-add-small">+ Ajouter</button>
        </div>

        {(content.items || []).map((item, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">{i + 1}</span>
              <button type="button" onClick={() => removeItem(i)} className="admin-repeater-remove">×</button>
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Titre</label>
              <input
                value={item.title || ''}
                onChange={(e) => updateItem(i, 'title', e.target.value)}
                className="admin-field-input"
              />
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
          </div>
        ))}
      </div>
    </div>
  );
}
