'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminShell from '../AdminShell';

const STATUS_LABELS = { new: 'Nouveau', read: 'Lu', replied: 'Répondu' };
const STATUS_COLORS = { new: '#c0392b', read: '#2980b9', replied: '#27ae60' };

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contacts');
      if (res.ok) setContacts(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const filtered = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter);
  const newCount = contacts.filter((c) => c.status === 'new').length;

  return (
    <AdminShell>
      <div style={{ padding: '2rem', maxWidth: '1100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '1.6rem', color: '#2d4a3e', margin: 0 }}>
            Messages reçus
            {newCount > 0 && (
              <span style={{ marginLeft: '0.75rem', background: '#c0392b', color: '#fff', borderRadius: '20px', fontSize: '0.75rem', padding: '2px 10px', fontFamily: 'sans-serif' }}>
                {newCount} nouveau{newCount > 1 ? 'x' : ''}
              </span>
            )}
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'new', 'read', 'replied'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.35rem 0.9rem',
                  borderRadius: '6px',
                  border: '1.5px solid',
                  borderColor: filter === f ? '#2d4a3e' : '#ddd',
                  background: filter === f ? '#2d4a3e' : '#fff',
                  color: filter === f ? '#fff' : '#555',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: filter === f ? 600 : 400,
                }}
              >
                {f === 'all' ? 'Tous' : STATUS_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p style={{ color: '#999' }}>Chargement…</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#999' }}>
            <p style={{ fontSize: '1rem' }}>Aucun message{filter !== 'all' ? ` avec le statut "${STATUS_LABELS[filter]}"` : ''}.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.4fr' : '1fr', gap: '1rem' }}>
            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filtered.map((c) => (
                <div
                  key={c.id}
                  onClick={() => { setSelected(c); updateStatus(c.id, c.status === 'new' ? 'read' : c.status); }}
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${selected?.id === c.id ? '#2d4a3e' : '#e8e4dc'}`,
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#222' }}>{c.name}</span>
                    <span style={{ fontSize: '0.72rem', color: STATUS_COLORS[c.status], fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {STATUS_LABELS[c.status]}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>{c.email}{c.subject ? ` · ${c.subject}` : ''}</div>
                  <div style={{ fontSize: '0.82rem', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</div>
                  <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: '0.4rem' }}>
                    {new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            {selected && (
              <div style={{ background: '#fff', border: '1.5px solid #e8e4dc', borderRadius: '8px', padding: '1.5rem', position: 'sticky', top: '1rem', alignSelf: 'start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Georgia,serif', fontSize: '1.15rem', color: '#2d4a3e', margin: '0 0 0.2rem' }}>{selected.name}</h2>
                    <a href={`mailto:${selected.email}`} style={{ color: '#2980b9', fontSize: '0.85rem' }}>{selected.email}</a>
                    {selected.phone && <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: '#555' }}>· {selected.phone}</span>}
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1.2rem' }}>✕</button>
                </div>

                {selected.subject && (
                  <div style={{ background: '#f5f0e8', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.82rem', color: '#555', marginBottom: '1rem', display: 'inline-block' }}>
                    {selected.subject}
                  </div>
                )}

                <div style={{ background: '#fafaf8', border: '1px solid #e8e4dc', borderRadius: '6px', padding: '1rem', fontSize: '0.88rem', lineHeight: '1.7', color: '#333', whiteSpace: 'pre-wrap', marginBottom: '1.25rem' }}>
                  {selected.message}
                </div>

                <div style={{ fontSize: '0.75rem', color: '#bbb', marginBottom: '1.25rem' }}>
                  Reçu le {new Date(selected.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  {selected.ip && ` · IP: ${selected.ip}`}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {Object.entries(STATUS_LABELS).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => updateStatus(selected.id, val)}
                      style={{
                        padding: '0.35rem 0.9rem',
                        borderRadius: '6px',
                        border: '1.5px solid',
                        borderColor: selected.status === val ? STATUS_COLORS[val] : '#ddd',
                        background: selected.status === val ? STATUS_COLORS[val] : '#fff',
                        color: selected.status === val ? '#fff' : '#555',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: selected.status === val ? 600 : 400,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || 'Votre demande — Amana Patrimoine')}`}
                    style={{
                      padding: '0.35rem 0.9rem',
                      borderRadius: '6px',
                      border: '1.5px solid #2d4a3e',
                      background: '#2d4a3e',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      marginLeft: 'auto',
                    }}
                    onClick={() => updateStatus(selected.id, 'replied')}
                  >
                    Répondre par email
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
