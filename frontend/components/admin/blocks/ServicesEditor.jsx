'use client';

export default function ServicesEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), { title: '', description: '', link: '' }]);
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
          <label className="admin-field-label">Services</label>
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
                rows={3}
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Lien</label>
              <input
                value={item.link || ''}
                onChange={(e) => updateItem(i, 'link', e.target.value)}
                className="admin-field-input"
                placeholder="/strategie"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
