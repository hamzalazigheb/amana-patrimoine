'use client';

import ImageUpload from '../ImageUpload';

export default function ContentEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  const updateParagraph = (index, value) => {
    const paragraphs = [...(content.paragraphs || [])];
    paragraphs[index] = value;
    update('paragraphs', paragraphs);
  };

  const addParagraph = () => {
    update('paragraphs', [...(content.paragraphs || []), '']);
  };

  const removeParagraph = (index) => {
    update('paragraphs', (content.paragraphs || []).filter((_, i) => i !== index));
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
        <label className="admin-field-label">Label (petit texte au-dessus)</label>
        <input
          value={content.label || ''}
          onChange={(e) => update('label', e.target.value)}
          className="admin-field-input"
          placeholder="Ex: Notre Philosophie"
        />
      </div>

      <div className="admin-field">
        <label className="admin-field-label">Titre</label>
        <input
          value={content.title || ''}
          onChange={(e) => update('title', e.target.value)}
          className="admin-field-input"
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Paragraphes</label>
          <button type="button" onClick={addParagraph} className="admin-btn-add-small">+ Ajouter</button>
        </div>
        {(content.paragraphs || []).map((p, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">Paragraphe {i + 1}</span>
              <button type="button" onClick={() => removeParagraph(i)} className="admin-repeater-remove">×</button>
            </div>
            <textarea
              value={p}
              onChange={(e) => updateParagraph(i, e.target.value)}
              className="admin-field-textarea"
              rows={3}
            />
          </div>
        ))}
      </div>

      <div className="admin-field">
        <label className="admin-field-label">Texte mis en avant (citation / encadré)</label>
        <textarea
          value={content.highlight || ''}
          onChange={(e) => update('highlight', e.target.value)}
          className="admin-field-textarea"
          rows={2}
          placeholder="Ex: « La meilleure stratégie n'est pas la plus complexe... »"
        />
      </div>

      <div className="admin-field">
        <label className="admin-field-label">Texte important (en gras, grand)</label>
        <input
          value={content.bigText || ''}
          onChange={(e) => update('bigText', e.target.value)}
          className="admin-field-input"
          placeholder="Ex: -45% de revenus en moyenne..."
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Étapes numérotées (optionnel)</label>
          <button type="button" onClick={addStep} className="admin-btn-add-small">+ Ajouter</button>
        </div>
        {(content.steps || []).map((step, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">{String(i + 1).padStart(2, '0')}.</span>
              <button type="button" onClick={() => removeStep(i)} className="admin-repeater-remove">×</button>
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Titre</label>
              <input value={step.title || ''} onChange={(e) => updateStep(i, 'title', e.target.value)} className="admin-field-input" />
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Description</label>
              <textarea value={step.description || ''} onChange={(e) => updateStep(i, 'description', e.target.value)} className="admin-field-textarea" rows={2} />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-field">
        <label className="admin-field-label">Fond</label>
        <select
          value={content.background || ''}
          onChange={(e) => update('background', e.target.value)}
          className="admin-field-select"
        >
          <option value="">Blanc (défaut)</option>
          <option value="beige">Beige</option>
        </select>
      </div>

      <ImageUpload
        label="Image (optionnel)"
        value={content.image || ''}
        onChange={(url) => update('image', url)}
      />
    </div>
  );
}
