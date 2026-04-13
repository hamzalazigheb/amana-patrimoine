'use client';

export default function FoundersEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), { name: '', role: '', image: '', description: '' }]);
  };

  const removeItem = (index) => {
    update('items', (content.items || []).filter((_, i) => i !== index));
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field" style={{ marginBottom: '12px' }}>
        <label className="admin-field-label">Titre de section (optionnel)</label>
        <input value={content.label || ''} onChange={(e) => update('label', e.target.value)} className="admin-field-input" placeholder="ex: L'équipe Amana" />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Membres de l&apos;équipe</label>
          <button type="button" onClick={addItem} className="admin-btn-add-small">+ Ajouter</button>
        </div>
        {(content.items || []).map((item, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">{item.name || `Membre ${i + 1}`}</span>
              <button type="button" onClick={() => removeItem(i)} className="admin-repeater-remove">×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="admin-field">
                <label className="admin-field-label-sm">Nom complet</label>
                <input value={item.name || ''} onChange={(e) => updateItem(i, 'name', e.target.value)} className="admin-field-input" placeholder="Mohamed Mosbahi" />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Rôle / Titre</label>
                <input value={item.role || ''} onChange={(e) => updateItem(i, 'role', e.target.value)} className="admin-field-input" placeholder="Conseiller en Gestion de Patrimoine" />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Photo (chemin, ex: /uploads/photo.jpg)
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#92660a', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '4px', padding: '1px 7px', whiteSpace: 'nowrap' }}>
                  400 × 400 px
                </span>
              </label>
              <input value={item.image || ''} onChange={(e) => updateItem(i, 'image', e.target.value)} className="admin-field-input" placeholder="/uploads/photo.jpg" />
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Biographie</label>
              <textarea value={item.description || ''} onChange={(e) => updateItem(i, 'description', e.target.value)} className="admin-field-textarea" rows={3} />
            </div>
          </div>
        ))}
        {!(content.items?.length) && (
          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', textAlign: 'center', padding: '16px 0' }}>Aucun membre. Cliquez sur &quot;+ Ajouter&quot;.</p>
        )}
      </div>
    </div>
  );
}
