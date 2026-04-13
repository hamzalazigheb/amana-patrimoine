'use client';

import { useState, useRef } from 'react';

export default function ImageUpload({ value, onChange, label, hint }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      }
    } catch {
      alert('Erreur lors du téléchargement');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-image-upload">
      {label && (
        <label className="admin-field-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {label}
          {hint && (
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#92660a',
              background: '#fef3c7',
              border: '1px solid #fcd34d',
              borderRadius: '4px',
              padding: '1px 7px',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}>
              {hint}
            </span>
          )}
        </label>
      )}
      <div className="admin-image-preview-area">
        {value ? (
          <div className="admin-image-preview">
            <img src={value} alt="Aperçu" />
            <div className="admin-image-overlay">
              <button type="button" onClick={() => fileRef.current?.click()} className="admin-image-change-btn">
                {uploading ? 'Envoi...' : 'Changer'}
              </button>
              <button type="button" onClick={() => onChange('')} className="admin-image-remove-btn">
                Supprimer
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="admin-image-empty"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Envoi en cours...' : '+ Ajouter une image'}
          </button>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
      {value && <span className="admin-image-path">{value}</span>}
    </div>
  );
}
