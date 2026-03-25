'use client';

export default function TestimonialsEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    const items = [...(content.items || []), { name: '', location: '', context: '', text: '', rating: 5 }];
    update('items', items);
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
          placeholder="Ce que disent nos clients"
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Témoignages</label>
          <button type="button" onClick={addItem} className="admin-btn-add-small">+ Ajouter</button>
        </div>

        {(content.items || []).map((item, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">{i + 1}</span>
              <button type="button" onClick={() => removeItem(i)} className="admin-repeater-remove">×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="admin-field">
                <label className="admin-field-label-sm">Prénom (ex: Karim B.)</label>
                <input
                  value={item.name || ''}
                  onChange={(e) => updateItem(i, 'name', e.target.value)}
                  className="admin-field-input"
                  placeholder="Karim B."
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Ville</label>
                <input
                  value={item.location || ''}
                  onChange={(e) => updateItem(i, 'location', e.target.value)}
                  className="admin-field-input"
                  placeholder="Paris 15e"
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Contexte (prestation)</label>
                <input
                  value={item.context || ''}
                  onChange={(e) => updateItem(i, 'context', e.target.value)}
                  className="admin-field-input"
                  placeholder="SCPI halal & Immobilier"
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Note (1–5)</label>
                <select
                  value={item.rating || 5}
                  onChange={(e) => updateItem(i, 'rating', Number(e.target.value))}
                  className="admin-field-input"
                >
                  {[5, 4, 3, 2, 1].map(n => (
                    <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="admin-field" style={{ marginTop: '8px' }}>
              <label className="admin-field-label-sm">Témoignage</label>
              <textarea
                value={item.text || ''}
                onChange={(e) => updateItem(i, 'text', e.target.value)}
                className="admin-field-textarea"
                rows={3}
                placeholder="Le témoignage du client (sans guillemets, ils sont ajoutés automatiquement)"
              />
            </div>
          </div>
        ))}

        {(content.items || []).length === 0 && (
          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', textAlign: 'center', padding: '16px 0' }}>
            Aucun témoignage. Cliquez sur "+ Ajouter" pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
