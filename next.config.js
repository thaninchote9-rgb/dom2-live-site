/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.VPS_STANDALONE === '1' ? { output: 'standalone' } : {}),
  reactStrictMode: true,
};

module.exports = nextConfig;
