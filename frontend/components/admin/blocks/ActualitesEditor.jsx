'use client';

function isValidYouTubeUrl(url) {
  if (!url?.trim()) return false;
  return /youtube\.com|youtu\.be/.test(url);
}

function getVideo(content) {
  const fromItems = (content?.items || []).find((item) => item?.youtubeUrl?.trim());
  if (fromItems) return fromItems;
  if (content?.video) return content.video;
  return {
    title: '',
    description: '',
    date: '',
    youtubeUrl: '',
  };
}

export default function ActualitesEditor({ content, onChange }) {
  const update = (field, value) => onChange({ ...content, [field]: value });

  const video = getVideo(content);

  const updateVideo = (field, value) => {
    const next = { ...video, [field]: value };
    onChange({ ...content, video: next, items: [next] });
  };

  const articles = content.articles || [];

  const updateArticle = (index, field, value) => {
    const next = [...articles];
    next[index] = { ...next[index], [field]: value };
    update('articles', next);
  };

  const addArticle = () => {
    update('articles', [...articles, { tag: '', title: '', description: '', url: '', linkLabel: '' }]);
  };

  const removeArticle = (index) => {
    update('articles', articles.filter((_, i) => i !== index));
  };

  return (
    <div className="block-editor-fields">
      <div className="admin-field">
        <label className="admin-field-label">Titre de la section vidéo</label>
        <input
          value={content.sectionTitle || ''}
          onChange={(e) => update('sectionTitle', e.target.value)}
          className="admin-field-input"
          placeholder="Notre dernière vidéo"
        />
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Description vidéo</label>
        <textarea
          value={content.sectionDescription || ''}
          onChange={(e) => update('sectionDescription', e.target.value)}
          className="admin-field-textarea"
          rows={2}
        />
      </div>

      <div className="admin-repeater-item" style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '1rem' }}>
          Une seule vidéo mise en avant en plein écran sur la page.
        </p>

        <div className="admin-field">
          <label className="admin-field-label">URL YouTube *</label>
          <input
            value={video.youtubeUrl || ''}
            onChange={(e) => updateVideo('youtubeUrl', e.target.value)}
            className="admin-field-input"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          {video.youtubeUrl && !isValidYouTubeUrl(video.youtubeUrl) && (
            <span style={{ color: '#b33', fontSize: '12px' }}>URL YouTube invalide</span>
          )}
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Titre de la vidéo</label>
          <input
            value={video.title || ''}
            onChange={(e) => updateVideo('title', e.target.value)}
            className="admin-field-input"
            placeholder="Ex : Comment investir en SCPI halal ?"
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Description</label>
          <textarea
            value={video.description || ''}
            onChange={(e) => updateVideo('description', e.target.value)}
            className="admin-field-textarea"
            rows={3}
          />
        </div>

        <div className="admin-field">
          <label className="admin-field-label">Date de publication</label>
          <input
            type="date"
            value={video.date || ''}
            onChange={(e) => updateVideo('date', e.target.value)}
            className="admin-field-input"
          />
        </div>
      </div>

      <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--admin-border, #e5e5e5)' }} />

      <div className="admin-field">
        <label className="admin-field-label">Titre section articles (presse, infos…)</label>
        <input
          value={content.articlesSectionTitle || ''}
          onChange={(e) => update('articlesSectionTitle', e.target.value)}
          className="admin-field-input"
          placeholder="Presse & informations"
        />
      </div>
      <div className="admin-field">
        <label className="admin-field-label">Description section articles</label>
        <textarea
          value={content.articlesSectionDescription || ''}
          onChange={(e) => update('articlesSectionDescription', e.target.value)}
          className="admin-field-textarea"
          rows={2}
          placeholder="Retrouvez nos interventions et articles de presse."
        />
      </div>

      <div className="admin-repeater">
        <div className="admin-repeater-header">
          <label className="admin-field-label">Articles / liens externes</label>
          <button type="button" onClick={addArticle} className="admin-btn-add-small">+ Ajouter</button>
        </div>

        {articles.map((article, i) => (
          <div key={i} className="admin-repeater-item">
            <div className="admin-repeater-item-header">
              <span className="admin-repeater-number">{i + 1}</span>
              <button type="button" onClick={() => removeArticle(i)} className="admin-repeater-remove">×</button>
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label className="admin-field-label-sm">Tag (Presse, Info…)</label>
                <input
                  value={article.tag || ''}
                  onChange={(e) => updateArticle(i, 'tag', e.target.value)}
                  className="admin-field-input"
                  placeholder="Presse"
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Titre</label>
                <input
                  value={article.title || ''}
                  onChange={(e) => updateArticle(i, 'title', e.target.value)}
                  className="admin-field-input"
                />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-field-label-sm">Description</label>
              <textarea
                value={article.description || ''}
                onChange={(e) => updateArticle(i, 'description', e.target.value)}
                className="admin-field-textarea"
                rows={2}
              />
            </div>
            <div className="admin-field-row">
              <div className="admin-field">
                <label className="admin-field-label-sm">URL (lien externe ou interne)</label>
                <input
                  value={article.url || ''}
                  onChange={(e) => updateArticle(i, 'url', e.target.value)}
                  className="admin-field-input"
                  placeholder="https://... ou /blog/mon-article"
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label-sm">Texte du lien (optionnel)</label>
                <input
                  value={article.linkLabel || ''}
                  onChange={(e) => updateArticle(i, 'linkLabel', e.target.value)}
                  className="admin-field-input"
                  placeholder="Lire la suite"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
