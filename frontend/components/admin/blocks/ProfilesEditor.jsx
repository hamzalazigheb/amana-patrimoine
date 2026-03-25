'use client';

export default function ProfilesEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), { profile: '', solutions: '' }]);
  };

  const removeItem = (index) => {
    update('items', (content.items || []).filter((_, i) => i !== index));
  };

  return (
    <div className="block-editor-fields">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <div className="admin-field">
          <label className="admin-field-label">Label (optionnel)</label>
          <input value={content.label || ''} onChange={(e) => update('label', e.target.value)} className="admin-field-input" placeholder="ex: Nos profils clients" />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Titre (optionnel)</label>
          <input value={content.title || ''} onChange={(e) => update('title', e.target.value)} className="admin-field-input" placeholder="Titre de la section" />
        </div>
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Profils</label>
          <button type="button" onClick={addItem} className="admin-btn-add-small">+ Ajouter</button>
        </div>
        {(content.items || []).map((item, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">{i + 1}</span>
              <button type="button" onClick={() => removeItem(i)} className="admin-repeater-remove">×</button>
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Profil client</label>
              <input value={item.profile || ''} onChange={(e) => updateItem(i, 'profile', e.target.value)} className="admin-field-input" placeholder="ex: Cadre supérieur" />
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Solutions recommandées</label>
              <textarea value={item.solutions || ''} onChange={(e) => updateItem(i, 'solutions', e.target.value)} className="admin-field-textarea" rows={2} placeholder="ex: PER, SCPI halal, Assurance-vie" />
            </div>
          </div>
        ))}
        {!(content.items?.length) && (
          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', textAlign: 'center', padding: '16px 0' }}>Aucun profil. Cliquez sur &quot;+ Ajouter&quot;.</p>
        )}
      </div>
    </div>
  );
}
