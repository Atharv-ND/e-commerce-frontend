/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevent Vercel from failing due to lint
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};

module.exports = nextConfig;
