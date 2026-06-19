/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

// Additional runtime origins that must be whitelisted on top of 'self'.
// Drive these via environment variables so staging/prod can differ from dev
// without editing source.
//
//   NEXT_PUBLIC_SITE_URL           — canonical public URL, e.g. https://amana-patrimoine.fr
//   NEXT_PUBLIC_CHATBOT_API_URL    — chatbot backend origin (override). Defaults to the
//                                    current preprod backend on http://54.89.244.17:8000
//                                    so the widget works out-of-the-box without extra env
//                                    config. Swap for https://chat.amana-patrimoine.fr once
//                                    the final domain is wired up.
//
// Any of these that are not set are simply omitted from the CSP (except the chatbot URL
// which always has a working default).
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
const chatbotApiUrl = (
  process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://54.89.244.17:8000'
).replace(/\/$/, '');

function toWs(httpUrl) {
  if (!httpUrl) return '';
  if (httpUrl.startsWith('https://')) return httpUrl.replace(/^https:\/\//, 'wss://');
  if (httpUrl.startsWith('http://')) return httpUrl.replace(/^http:\/\//, 'ws://');
  return '';
}

// Host entries used by CSP — compact, deduplicated, env-aware.
const csp = {
  img: [
    "'self'",
    'data:',
    'blob:',
    'https://images.unsplash.com',
    'https://i.ytimg.com',
    'https://amana-patrimoine.fr',
    siteUrl,
    chatbotApiUrl,
    // Dev-only convenience: local backend + Next dev server
    ...(isDev
      ? ['http://localhost:3000', 'http://localhost:8000']
      : []),
  ],
  connect: [
    "'self'",
    'https://calendly.com',
    'https://wa.me',
    'https://amana-patrimoine.fr',
    siteUrl,
    chatbotApiUrl,
    toWs(chatbotApiUrl),
    ...(isDev
      ? [
        'http://localhost:3000',
        'http://localhost:8000',
        'ws://localhost:3000',
        'ws://localhost:8000',
      ]
      : []),
  ],
};

// Remove empties and duplicates while preserving order
function uniq(list) {
  return Array.from(new Set(list.filter(Boolean)));
}

const imgSrc = uniq(csp.img).join(' ');
const connectSrc = uniq(csp.connect).join(' ');

const securityHeaders = [
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer information
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features not needed by this site
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // Force HTTPS (only when ENABLE_HSTS=true, i.e. after SSL is configured)
  ...(process.env.ENABLE_HSTS === 'true'
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }]
    : []),
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-eval' required in dev for React Fast Refresh
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'",
      // Inline styles used throughout the site (fonts self-hosted via next/font)
      "style-src 'self' 'unsafe-inline'",
      // Fonts are self-hosted via next/font — no external font CDN needed
      "font-src 'self'",
      `img-src ${imgSrc}`,
      `connect-src ${connectSrc}`,
      // Calendly + YouTube embeds (nos-actualites)
      "frame-src https://calendly.com https://www.youtube-nocookie.com https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      ...(process.env.ENABLE_HSTS === 'true' ? ["upgrade-insecure-requests"] : []),
    ].join('; '),
  },
];

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Required for Docker deployment — creates a minimal self-contained build
  output: 'standalone',
  // Browsers request /favicon.ico by default; we only ship public/favicon.svg
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/favicon.svg' }];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'amana-patrimoine.fr' },
      // Chatbot backend — preprod default, overridable via NEXT_PUBLIC_CHATBOT_API_URL
      ...(() => {
        try {
          const u = new URL(chatbotApiUrl);
          return [{ protocol: u.protocol.replace(':', ''), hostname: u.hostname, port: u.port || undefined }];
        } catch { return []; }
      })(),
      // Dev-only image sources — keep build working with uploads coming from local backend
      ...(isDev
        ? [
          { protocol: 'http', hostname: 'localhost' },
        ]
        : []),
    ],
    formats: ['image/avif', 'image/webp'],
    // Tailored to the real viewport mix of this site (mobile-first audience)
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 384],
    // Keep optimized variants cached aggressively — content rarely changes
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
