'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getYouTubeVideoId, getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/lib/youtube';

function isInternalUrl(url) {
  return url?.startsWith('/') || url?.startsWith('#');
}

function ArticleCardLink({ url, className, children }) {
  if (!url) return <div className={className}>{children}</div>;
  if (isInternalUrl(url)) {
    return <Link href={url} className={className}>{children}</Link>;
  }
  return (
    <a href={url} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getFeaturedVideo(content) {
  const fromItems = (content?.items || []).find((item) => getYouTubeVideoId(item.youtubeUrl));
  if (fromItems) return fromItems;
  if (content?.video && getYouTubeVideoId(content.video.youtubeUrl)) return content.video;
  return null;
}

export default function ActualitesSection({ content }) {
  const item = getFeaturedVideo(content);
  const [playing, setPlaying] = useState(false);
  const articles = (content?.articles || []).filter((a) => a?.title?.trim() || a?.url?.trim());

  const videoId = item ? getYouTubeVideoId(item.youtubeUrl) : null;
  const embedUrl = videoId ? `${getYouTubeEmbedUrl(videoId)}&autoplay=1` : null;
  const thumb = videoId ? (item.thumbnail || getYouTubeThumbnail(videoId)) : null;

  return (
    <section className="act-section" id="nos-actualites">
      <div className="container">
        {(content?.sectionTitle || content?.sectionDescription) && (
          <div className="section-header act-section-header">
            {content.sectionTitle && <h2 className="section-title">{content.sectionTitle}</h2>}
            {content.sectionDescription && <p className="section-desc">{content.sectionDescription}</p>}
          </div>
        )}
      </div>

      {!item || !videoId ? (
        <div className="container">
          <p className="act-empty">Aucune vidéo pour le moment.</p>
        </div>
      ) : (
        <div className="act-featured">
          <div className="act-theater">
            <div className="act-theater-frame">
              <div className="act-theater-inner">
                {playing ? (
                  <iframe
                    src={embedUrl}
                    title={item.title || 'Vidéo YouTube'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="act-iframe"
                  />
                ) : (
                  <button
                    type="button"
                    className="act-thumb-btn"
                    onClick={() => setPlaying(true)}
                    aria-label={`Lire la vidéo : ${item.title || 'YouTube'}`}
                  >
                    {thumb && (
                      <Image
                        src={thumb}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="act-thumb-img"
                      />
                    )}
                    <span className="act-play-ring" aria-hidden="true">
                      <span className="act-play-btn">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="8,5 19,12 8,19" />
                        </svg>
                      </span>
                    </span>
                    <span className="act-theater-badge">Lecture</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="container">
            <div className="act-meta">
              <div className="act-meta-main">
                {item.date && (
                  <time className="act-date" dateTime={item.date}>{formatDate(item.date)}</time>
                )}
                {item.title && <h3 className="act-title">{item.title}</h3>}
                {item.description && <p className="act-desc">{item.description}</p>}
              </div>
              <a
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="act-yt-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8z" />
                  <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="#fff" />
                </svg>
                Voir sur YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      {articles.length > 0 && (
        <div className="act-articles">
          <div className="container">
            {(content?.articlesSectionTitle || content?.articlesSectionDescription) && (
              <div className="section-header act-articles-header">
                {content.articlesSectionTitle && (
                  <h2 className="section-title">{content.articlesSectionTitle}</h2>
                )}
                {content.articlesSectionDescription && (
                  <p className="section-desc">{content.articlesSectionDescription}</p>
                )}
              </div>
            )}
            <div className="act-articles-grid">
              {articles.map((article, i) => (
                <ArticleCardLink
                  key={article.id || i}
                  url={article.url?.trim() || null}
                  className="act-article-card"
                >
                  {article.tag && <span className="act-article-tag">{article.tag}</span>}
                  {article.title && <h3 className="act-article-title">{article.title}</h3>}
                  {article.description && (
                    <p className="act-article-desc">{article.description}</p>
                  )}
                  {article.url?.trim() && (
                    <span className="act-article-link">
                      {article.linkLabel?.trim() || 'Lire la suite'}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  )}
                </ArticleCardLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
