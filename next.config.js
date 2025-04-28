/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Assurez-vous que Netlify peut correctement servir les pages
  trailingSlash: true,
  
  // Assurez-vous que les fichiers comme _headers sont inclus dans l'export
  // Cette configuration est importante pour que le fichier _headers soit copié lors du build
  distDir: 'out',
};

module.exports = nextConfig; 