/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Assurez-vous que Netlify peut correctement servir les pages
  trailingSlash: true,
};

module.exports = nextConfig; 