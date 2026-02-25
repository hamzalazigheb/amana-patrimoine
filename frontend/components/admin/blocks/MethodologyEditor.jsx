'use client';

export default function MethodologyEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  const updateStep = (index, field, value) => {
    const steps = [...(content.steps || [])];
    steps[index] = { ...steps[index], [field]: value };
    update('steps', steps);
  };

  const addStep = () => {
    update('steps', [...(content.steps || []), { title: '', description: '' }]);
  };

  const removeStep = (index) => {
    update('steps', (content.steps || []).filter((_, i) => i !== index));
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
          <label className="admin-field-label">Étapes</label>
          <button type="button" onClick={addStep} className="admin-btn-add-small">+ Ajouter</button>
        </div>

        {(content.steps || []).map((step, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">Étape {i + 1}</span>
              <button type="button" onClick={() => removeStep(i)} className="admin-repeater-remove">×</button>
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Titre</label>
              <input
                value={step.title || ''}
                onChange={(e) => updateStep(i, 'title', e.target.value)}
                className="admin-field-input"
              />
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Description</label>
              <textarea
                value={step.description || ''}
                onChange={(e) => updateStep(i, 'description', e.target.value)}
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
