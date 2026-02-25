'use client';

import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';

export default function AdminPagesPage() {
  const [pages, setPages] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ slug: '', title: '', description: '', keywords: '' });
  const [error, setError] = useState('');

  useEffect(() => { loadPages(); }, []);

  async function loadPages() {
    const res = await fetch('/api/pages');
    const data = await res.json();
    if (Array.isArray(data)) setPages(data);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowCreate(false);
      setForm({ slug: '', title: '', description: '', keywords: '' });
      loadPages();
    } else {
      const data = await res.json();
      setError(data.error || 'Erreur');
    }
  }

  async function togglePublish(page) {
    await fetch(`/api/pages/${page.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...page, published: !page.published }),
    });
    loadPages();
  }

  async function deletePage(id) {
    if (!confirm('Supprimer cette page ?')) return;
    await fetch(`/api/pages/${id}`, { method: 'DELETE' });
    loadPages();
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Pages</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowCreate(!showCreate)}>
          + Nouvelle page
        </button>
      </div>

      {showCreate && (
        <div className="admin-card">
          <h3>Créer une page</h3>
          {error && <div className="admin-alert admin-alert-error">{error}</div>}
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="admin-form-group">
                <label>Slug (URL)</label>
                <input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="ex: strategie" required />
              </div>
              <div className="admin-form-group">
                <label>Titre SEO</label>
                <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Description SEO</label>
              <textarea className="admin-textarea" style={{ minHeight: '60px' }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Mots-clés</label>
              <input className="admin-input" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} placeholder="mot1, mot2, mot3" />
            </div>
            <div className="admin-flex">
              <button type="submit" className="admin-btn admin-btn-primary">Créer</button>
              <button type="button" className="admin-btn admin-btn-outline" onClick={() => setShowCreate(false)}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Slug</th>
              <th>Blocs</th>
              <th>Statut</th>
              <th>Modifié</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td><strong>{page.title}</strong></td>
                <td><code>/{page.slug}</code></td>
                <td>{page._count?.blocks || 0}</td>
                <td>
                  <span className={`admin-badge ${page.published ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                    {page.published ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td>{new Date(page.updatedAt).toLocaleDateString('fr-FR')}</td>
                <td>
                  <div className="admin-actions">
                    <a href={`/admin/pages/${page.id}`} className="admin-btn admin-btn-outline admin-btn-sm">Éditer</a>
                    <button className="admin-btn admin-btn-sm" style={{ background: page.published ? '#ffc107' : '#28a745', color: '#fff', border: 'none' }} onClick={() => togglePublish(page)}>
                      {page.published ? 'Dépublier' : 'Publier'}
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deletePage(page.id)}>Suppr.</button>
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan="6" className="admin-empty">Aucune page créée</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
