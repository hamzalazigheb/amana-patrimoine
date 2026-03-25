'use client';

export default function CaseStudyEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Titre</label>
        <input
          value={content.title || ''}
          onChange={(e) => update('title', e.target.value)}
          className="admin-field-input"
          placeholder="ex: Étude de cas : Samir, 42 ans"
        />
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Contenu (HTML autorisé)</label>
        <textarea
          value={content.body || ''}
          onChange={(e) => update('body', e.target.value)}
          className="admin-field-textarea admin-field-json"
          rows={8}
          placeholder="<p>Contenu de l'étude de cas...</p>"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
