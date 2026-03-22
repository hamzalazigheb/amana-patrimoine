/** @type {import('next').NextConfig} */

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
      // Next.js inline scripts + JSON-LD
      // 'unsafe-eval' required in dev for React Fast Refresh (hot reload)
      process.env.NODE_ENV === 'development'
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'",
      // Inline styles used throughout the site
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs + unsplash + uploads
      "img-src 'self' data: blob: https://images.unsplash.com",
      // API calls and Calendly embed
      "connect-src 'self' https://calendly.com https://wa.me",
      // No iframes except Calendly
      "frame-src https://calendly.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      ...(process.env.ENABLE_HSTS === 'true' ? ["upgrade-insecure-requests"] : []),
    ].join('; '),
  },
];

const isStaticBuild = process.env.STATIC_BUILD === 'true';

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: isStaticBuild,
  // Static export only when STATIC_BUILD=true (for o2switch deployment)
  // In dev mode this is OFF so API routes and admin work normally
  ...(isStaticBuild && { output: 'export' }),
  images: {
    unoptimized: isStaticBuild,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      ...(process.env.NODE_ENV !== 'production'
        ? [{ protocol: 'http', hostname: 'localhost' }]
        : []),
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // headers() is not supported in static export — security headers
  // should instead be configured via .htaccess on o2switch
};

module.exports = nextConfig;
