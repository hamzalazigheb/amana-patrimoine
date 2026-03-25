'use client';

export default function IntroEditor({ content, onChange }) {
  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Paragraphes (un par ligne)</label>
        <textarea
          value={(content.paragraphs || []).join('\n')}
          onChange={(e) => onChange({ ...content, paragraphs: e.target.value.split('\n') })}
          className="admin-field-textarea"
          rows={6}
          placeholder="Premier paragraphe&#10;Deuxième paragraphe&#10;..."
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', marginTop: '4px' }}>
          Chaque ligne devient un paragraphe séparé.
        </p>
      </div>
    </div>
  );
}
