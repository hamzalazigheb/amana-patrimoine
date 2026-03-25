'use client';

export default function ToolsEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), { title: '', description: '', features: [] }]);
  };

  const removeItem = (index) => {
    update('items', (content.items || []).filter((_, i) => i !== index));
  };

  return (
    <div className="block-editor-fields">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <div className="admin-field">
          <label className="admin-field-label">Label (optionnel)</label>
          <input value={content.label || ''} onChange={(e) => update('label', e.target.value)} className="admin-field-input" placeholder="ex: Nos solutions" />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Titre</label>
          <input value={content.title || ''} onChange={(e) => update('title', e.target.value)} className="admin-field-input" placeholder="Titre de la section" />
        </div>
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Outils / Solutions</label>
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
              <input value={item.title || ''} onChange={(e) => updateItem(i, 'title', e.target.value)} className="admin-field-input" />
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Description</label>
              <textarea value={item.description || ''} onChange={(e) => updateItem(i, 'description', e.target.value)} className="admin-field-textarea" rows={2} />
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Caractéristiques (une par ligne)</label>
              <textarea
                value={(item.features || []).join('\n')}
                onChange={(e) => updateItem(i, 'features', e.target.value.split('\n').filter(l => l.trim()))}
                className="admin-field-textarea"
                rows={3}
                placeholder="Caractéristique 1&#10;Caractéristique 2&#10;Caractéristique 3"
              />
            </div>
          </div>
        ))}
        {!(content.items?.length) && (
          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', textAlign: 'center', padding: '16px 0' }}>Aucun outil. Cliquez sur &quot;+ Ajouter&quot;.</p>
        )}
      </div>
    </div>
  );
}
