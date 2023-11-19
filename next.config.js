/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    amp: {
      skipValidation: true,
    },
  },
  images: {
    domains: ["firebasestorage.googleapis.com","https://kobakoo.com","images.microcms-assets.io"],
  },
};

module.exports = nextConfig;
