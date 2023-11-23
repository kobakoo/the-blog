/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "https://kobakoo.com",
      "images.microcms-assets.io",
    ],
  },
};

module.exports = nextConfig;
