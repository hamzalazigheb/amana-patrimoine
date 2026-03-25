'use client';

export default function StatsEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  const updateItem = (index, field, value) => {
    const items = [...(content.items || [])];
    items[index] = { ...items[index], [field]: value };
    update('items', items);
  };

  const addItem = () => {
    update('items', [...(content.items || []), { display: '', label: '' }]);
  };

  const removeItem = (index) => {
    update('items', (content.items || []).filter((_, i) => i !== index));
  };

  return (
    <div className="block-editor-fields">
      <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
        Entrez le chiffre tel qu'il doit s'afficher (ex: <strong>100+</strong>, <strong>100%</strong>, <strong>2020</strong>). L'animation de décompte se déclenche automatiquement.
      </p>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Chiffres clés</label>
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
                <label className="admin-field-label-sm">Chiffre affiché</label>
                <input
                  value={item.display ?? item.value ?? ''}
                  onChange={(e) => updateItem(i, 'display', e.target.value)}
                  className="admin-field-input"
                  placeholder="ex: 100+ ou 2020 ou 100%"
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Libellé</label>
                <input
                  value={item.label || ''}
                  onChange={(e) => updateItem(i, 'label', e.target.value)}
                  className="admin-field-input"
                  placeholder="ex: Clients accompagnés"
                />
              </div>
            </div>
          </div>
        ))}

        {(content.items || []).length === 0 && (
          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', textAlign: 'center', padding: '16px 0' }}>
            Aucun chiffre. Cliquez sur &quot;+ Ajouter&quot; pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
