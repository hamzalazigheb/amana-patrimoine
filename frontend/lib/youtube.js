/**
 * Extract a YouTube video ID from common URL formats.
 * Returns null if the URL is invalid or not YouTube.
 */
export function getYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function getYouTubeEmbedUrl(videoId) {
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function getYouTubeThumbnail(videoId) {
  if (!videoId) return null;
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/** Normalize img.youtube.com / maxresdefault URLs to the CSP-allowed i.ytimg.com CDN. */
export function normalizeYouTubeThumbnail(url) {
  if (!url || typeof url !== 'string') return url;

  const trimmed = url.trim();
  const fromUrl = getYouTubeVideoId(trimmed);
  const fromPath = trimmed.match(/\/vi\/([a-zA-Z0-9_-]{11})(?:\/|$)/)?.[1];
  const videoId = fromUrl || fromPath;

  if (videoId) {
    return getYouTubeThumbnail(videoId);
  }

  if (trimmed.includes('img.youtube.com')) {
    return trimmed
      .replace('img.youtube.com', 'i.ytimg.com')
      .replace(/maxresdefault\.(jpg|webp)/, 'hqdefault.jpg');
  }

  return trimmed;
}
