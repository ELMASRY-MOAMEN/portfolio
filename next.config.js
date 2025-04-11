/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configuration du port
  server: {
    port: 4000,
  },
  // Assurez-vous que Netlify peut correctement servir les pages
  trailingSlash: true,
};

module.exports = nextConfig; 