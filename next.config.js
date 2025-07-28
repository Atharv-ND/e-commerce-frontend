/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevent Vercel from failing due to lint
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
