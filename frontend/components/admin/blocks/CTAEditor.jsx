'use client';

export default function CTAEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Titre</label>
        <input
          value={content.title || ''}
          onChange={(e) => update('title', e.target.value)}
          className="admin-field-input"
        />
      </div>

      <div className="admin-field">
        <label className="admin-field-label">Sous-titre</label>
        <textarea
          value={content.subtitle || ''}
          onChange={(e) => update('subtitle', e.target.value)}
          className="admin-field-textarea"
          rows={2}
        />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Texte du bouton</label>
          <input
            value={content.ctaText || ''}
            onChange={(e) => update('ctaText', e.target.value)}
            className="admin-field-input"
          />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Lien du bouton</label>
          <input
            value={content.ctaLink || ''}
            onChange={(e) => update('ctaLink', e.target.value)}
            className="admin-field-input"
          />
        </div>
      </div>
    </div>
  );
}
