/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.VPS_STANDALONE === '1' ? { output: 'standalone' } : {}),
  reactStrictMode: true,
  async redirects() {
    return Object.entries(require("./episode-redirects.json")).map(([source, destination]) => ({
      source, destination, permanent: true,
    }));
  },
};

module.exports = nextConfig;
