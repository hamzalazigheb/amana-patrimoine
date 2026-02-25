'use client';

import { useState, useEffect, useRef } from 'react';
import AdminShell from '../AdminShell';

export default function AdminMediaPage() {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [alt, setAlt] = useState('');
  const fileRef = useRef(null);

  useEffect(() => { loadMedia(); }, []);

  async function loadMedia() {
    const res = await fetch('/api/media');
    const data = await res.json();
    if (Array.isArray(data)) setMedia(data);
  }

  async function handleUpload(e) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', alt);

    await fetch('/api/media', { method: 'POST', body: formData });

    setUploading(false);
    setAlt('');
    if (fileRef.current) fileRef.current.value = '';
    loadMedia();
  }

  async function deleteMedia(id) {
    if (!confirm('Supprimer ce fichier ?')) return;
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
    loadMedia();
  }

  function copyPath(path) {
    navigator.clipboard.writeText(path);
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Bibliothèque médias</h1>
      </div>

      <div className="admin-card">
        <h3>Uploader un fichier</h3>
        <form onSubmit={handleUpload}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '12px', alignItems: 'end' }}>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label>Fichier</label>
              <input type="file" ref={fileRef} className="admin-input" accept="image/*" required />
            </div>
            <div className="admin-form-group" style={{ margin: 0 }}>
              <label>Texte alternatif</label>
              <input className="admin-input" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Description" />
            </div>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
              {uploading ? 'Envoi...' : 'Uploader'}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-media-grid">
        {media.map((item) => (
          <div key={item.id} className="admin-media-item">
            <img src={item.path} alt={item.alt || item.filename} />
            <div className="admin-media-item-info">
              <div style={{ fontWeight: 600, marginBottom: '4px', wordBreak: 'break-all' }}>{item.filename}</div>
              <div>{item.path}</div>
              {item.size && <div>{(item.size / 1024).toFixed(1)} Ko</div>}
            </div>
            <div className="admin-media-item-actions">
              <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => copyPath(item.path)} title="Copier le chemin" style={{ background: '#fff', padding: '4px 8px', fontSize: '11px' }}>
                Copier
              </button>
              <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => deleteMedia(item.id)} style={{ padding: '4px 8px', fontSize: '11px' }}>
                Suppr.
              </button>
            </div>
          </div>
        ))}
        {media.length === 0 && (
          <div className="admin-empty" style={{ gridColumn: '1 / -1' }}>
            Aucun média uploadé
          </div>
        )}
      </div>
    </AdminShell>
  );
}
