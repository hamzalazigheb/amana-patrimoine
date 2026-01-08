/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
