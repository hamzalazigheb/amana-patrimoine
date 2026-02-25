'use client';

import ImageUpload from '../ImageUpload';

export default function HeroEditor({ content, onChange }) {
  const update = (field, value) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Titre principal</label>
        <input
          value={content.title || ''}
          onChange={(e) => update('title', e.target.value)}
          className="admin-field-input"
          placeholder="Titre du hero"
        />
      </div>

      <div className="admin-field">
        <label className="admin-field-label">Sous-titre</label>
        <textarea
          value={content.subtitle || ''}
          onChange={(e) => update('subtitle', e.target.value)}
          className="admin-field-textarea"
          rows={3}
          placeholder="Description sous le titre"
        />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label className="admin-field-label">Texte du bouton</label>
          <input
            value={content.ctaText || ''}
            onChange={(e) => update('ctaText', e.target.value)}
            className="admin-field-input"
            placeholder="Prendre rendez-vous"
          />
        </div>
        <div className="admin-field">
          <label className="admin-field-label">Lien du bouton</label>
          <input
            value={content.ctaLink || ''}
            onChange={(e) => update('ctaLink', e.target.value)}
            className="admin-field-input"
            placeholder="https://..."
          />
        </div>
      </div>

      <ImageUpload
        label="Image de fond"
        value={content.backgroundImage || ''}
        onChange={(url) => update('backgroundImage', url)}
      />
    </div>
  );
}
