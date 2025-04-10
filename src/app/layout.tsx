import '@/styles/globals.css';
import type { Metadata } from 'next';

// SEO metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://www.monportfolio.fr'), // Remplacer par votre domaine
  title: {
    default: 'Portfolio | Expert en Gestion de Projets & Product Ownership',
    template: '%s | Portfolio Professionnel'
  },
  description: 'Expert en gestion de projets et product ownership, spécialisé dans la transformation digitale et la livraison de projets à forte valeur ajoutée.',
  keywords: ['gestion de projets', 'product ownership', 'transformation digitale', 'expert digital', 'product manager', 'portfolio'],
  authors: [{ name: 'Votre Nom', url: 'https://www.monportfolio.fr' }],
  creator: 'Votre Nom',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.monportfolio.fr',
    title: 'Portfolio | Expert en Gestion de Projets & Product Ownership',
    description: 'Expert en gestion de projets et product ownership, spécialisé dans la transformation digitale et la livraison de projets à forte valeur ajoutée.',
    siteName: 'Portfolio Professionnel',
    images: [
      {
        url: '/images/og-image.jpg', // À créer dans /public/images/
        width: 1200,
        height: 630,
        alt: 'Aperçu du Portfolio Professionnel'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Expert en Gestion de Projets & Product Ownership',
    description: 'Expert en gestion de projets et product ownership, spécialisé dans la transformation digitale.',
    creator: '@votrecompte', // Votre compte Twitter
    images: ['/images/twitter-image.jpg'], // À créer dans /public/images/
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.monportfolio.fr', // URL canonique
    languages: {
      'fr-FR': 'https://www.monportfolio.fr',
      'en-US': 'https://www.monportfolio.fr/en', // Si vous avez une version anglaise
    },
  },
  verification: {
    google: 'google-site-verification=votrecode', // Remplacer par votre code de vérification Google
  }
};

// Schema.org JSON-LD pour une personne (SEO structured data)
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Votre Nom',
  url: 'https://www.monportfolio.fr',
  image: 'https://www.monportfolio.fr/images/photo-profil.jpg',
  jobTitle: 'Expert en Gestion de Projets & Product Ownership',
  worksFor: {
    '@type': 'Organization',
    name: 'Votre Entreprise Actuelle'
  },
  sameAs: [
    'https://www.linkedin.com/in/votre-profil/',
    'https://github.com/votre-profil',
    'https://twitter.com/votre-profil'
  ],
  description: 'Expert en gestion de projets et product ownership avec plus de X années d\'expérience dans la transformation digitale et la livraison de produits innovants.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Préchargement des polices pour optimiser le chargement */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&display=swap"
          as="style"
        />
        {/* Inclusion des données structurées Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
} 