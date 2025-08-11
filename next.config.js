/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevent Vercel from failing due to lint
  },
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "m.media-amazon.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "rukminim2.flixcart.com",
      pathname: "/**",
    },
  ],
},
};

module.exports = nextConfig;
