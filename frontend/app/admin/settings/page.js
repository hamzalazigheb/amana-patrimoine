'use client';

import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';

const SETTING_FIELDS = [
  { key: 'site_name', label: 'Nom du site', type: 'text' },
  { key: 'site_description', label: 'Description du site', type: 'textarea' },
  { key: 'hero_title', label: 'Titre Hero (accueil)', type: 'text' },
  { key: 'hero_subtitle', label: 'Sous-titre Hero', type: 'textarea' },
  { key: 'hero_cta_text', label: 'CTA Hero texte', type: 'text' },
  { key: 'hero_cta_link', label: 'CTA Hero lien', type: 'text' },
  { key: 'hero_image', label: 'Image Hero (chemin)', type: 'text' },
  { key: 'footer_description', label: 'Description footer', type: 'textarea' },
  { key: 'contact_phone', label: 'Téléphone', type: 'text' },
  { key: 'contact_email', label: 'Email', type: 'text' },
  { key: 'contact_address', label: 'Adresse', type: 'text' },
  { key: 'calendly_url', label: 'Lien Calendly', type: 'text' },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data || {});
    }
    load();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });

    setSaving(false);
    if (res.ok) {
      setMessage('Paramètres sauvegardés');
      setTimeout(() => setMessage(''), 3000);
    }
  }

  return (
    <AdminShell>
      <div className="admin-header">
        <h1>Paramètres globaux</h1>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}

      <form onSubmit={handleSave}>
        <div className="admin-card">
          <h3>Informations générales</h3>
          {SETTING_FIELDS.map((field) => (
            <div className="admin-form-group" key={field.key}>
              <label>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: '80px' }}
                  value={settings[field.key] || ''}
                  onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                />
              ) : (
                <input
                  className="admin-input"
                  value={settings[field.key] || ''}
                  onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </AdminShell>
  );
}
