import '@/styles/globals.css';
import type { Metadata } from 'next';
import { generatePersonSchema } from '@/utils/seo';

// Configuration des données personnelles pour les métadonnées
const personalInfo = {
  name: 'Moamen Elmasry',
  title: 'Expert en Gestion de Projets & Product Ownership',
  description: 'Expert en gestion de projets et product ownership, spécialisé dans la transformation digitale et la livraison de projets à forte valeur ajoutée.',
  domain: 'https://moamen.fr',
  twitterHandle: '@moamenelmasry', // À remplacer par votre vrai handle Twitter
  company: 'Votre Entreprise Actuelle' // À remplacer
};

// SEO metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(personalInfo.domain),
  title: {
    default: `${personalInfo.title} | ${personalInfo.name}`,
    template: '%s | Portfolio de ' + personalInfo.name
  },
  description: personalInfo.description,
  keywords: ['gestion de projets', 'product ownership', 'transformation digitale', 'expert digital', 'product manager', 'portfolio'],
  authors: [{ name: personalInfo.name, url: personalInfo.domain }],
  creator: personalInfo.name,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: personalInfo.domain,
    title: `${personalInfo.title} | ${personalInfo.name}`,
    description: personalInfo.description,
    siteName: `Portfolio de ${personalInfo.name}`,
    images: [
      {
        url: '/images/og-image.jpg', // À créer dans /public/images/
        width: 1200,
        height: 630,
        alt: `Portfolio de ${personalInfo.name}`
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.title} | ${personalInfo.name}`,
    description: personalInfo.description,
    creator: personalInfo.twitterHandle,
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
    canonical: personalInfo.domain,
    languages: {
      'fr-FR': personalInfo.domain,
    },
  },
  verification: {
    google: 'google-site-verification=votrecode', // Remplacer par votre code de vérification Google
  }
};

// Schema.org JSON-LD pour une personne (SEO structured data)
const personSchema = generatePersonSchema({
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: personalInfo.domain,
  image: `${personalInfo.domain}/images/photo-profil.jpg`,
  company: personalInfo.company,
  socialLinks: [
    `https://www.linkedin.com/in/${personalInfo.name.toLowerCase().replace(' ', '-')}/`,
    `https://github.com/${personalInfo.name.toLowerCase().replace(' ', '-')}`,
    `https://twitter.com/${personalInfo.twitterHandle.replace('@', '')}`
  ],
  description: personalInfo.description
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Meta-tag CSP pour autoriser les iframes d'Arcade */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; frame-src 'self' https://demo.arcade.software https://*.arcade.software; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://demo.arcade.software https://*.arcade.software;"
        />
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