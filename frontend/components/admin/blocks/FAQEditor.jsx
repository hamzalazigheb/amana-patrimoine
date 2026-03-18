'use client';

export default function FAQEditor({ content, onChange }) {
  const items = content.items || [];

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...content, items: updated });
  };

  const addItem = () => {
    onChange({ ...content, items: [...items, { question: '', answer: '' }] });
  };

  const removeItem = (index) => {
    onChange({ ...content, items: items.filter((_, i) => i !== index) });
  };

  const moveItem = (index, direction) => {
    const updated = [...items];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    onChange({ ...content, items: updated });
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Titre de la section (optionnel)</label>
        <input
          value={content.title || ''}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="admin-field-input"
          placeholder="Ex: Questions fréquentes"
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Questions / Réponses</label>
          <button type="button" onClick={addItem} className="admin-btn-add-small">
            + Ajouter une question
          </button>
        </div>

        {items.length === 0 && (
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', padding: '12px 0' }}>
            Aucune question pour l'instant. Cliquez sur "+ Ajouter une question".
          </p>
        )}

        {items.map((item, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">Q{i + 1}</span>
              <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
                <button
                  type="button"
                  onClick={() => moveItem(i, -1)}
                  className="admin-repeater-move"
                  disabled={i === 0}
                  title="Monter"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(i, 1)}
                  className="admin-repeater-move"
                  disabled={i === items.length - 1}
                  title="Descendre"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="admin-repeater-remove"
                  title="Supprimer"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="admin-field">
              <label className="admin-field-label-sm">Question</label>
              <input
                value={item.question || ''}
                onChange={(e) => updateItem(i, 'question', e.target.value)}
                className="admin-field-input"
                placeholder="Ex: Comment calculer sa Zakat ?"
              />
            </div>

            <div className="admin-field">
              <label className="admin-field-label-sm">Réponse</label>
              <textarea
                value={item.answer || ''}
                onChange={(e) => updateItem(i, 'answer', e.target.value)}
                className="admin-field-textarea"
                rows={4}
                placeholder="Rédigez la réponse ici..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
