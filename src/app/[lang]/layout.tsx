import '@/styles/globals.css';
import type { Metadata } from 'next';
import { generatePersonSchema } from '@/utils/seo';
import { Lang, langs } from './params';
import LangProvider from '@/components/LangProvider';
import Script from 'next/script';

// Re-export the Lang type only
export type { Lang };

// Configuration des données personnelles pour les métadonnées
const personalInfo = {
  name: 'Moamen Elmasry',
  domain: 'https://moamen.fr',
  twitterHandle: '@moamenelmasry',
  company: 'Votre Entreprise Actuelle'
};

// Base metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(personalInfo.domain),
  authors: [{ name: personalInfo.name, url: personalInfo.domain }],
  creator: personalInfo.name,
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
  verification: {
    google: 'google-site-verification=votrecode', // Remplacer par votre code de vérification Google
  }
};

// Schema.org JSON-LD pour une personne (SEO structured data)
const personSchema = generatePersonSchema({
  name: personalInfo.name,
  jobTitle: 'Product Owner & Project Manager',
  url: personalInfo.domain,
  image: `${personalInfo.domain}/images/photo-profil.jpg`,
  company: personalInfo.company,
  socialLinks: [
    `https://www.linkedin.com/in/${personalInfo.name.toLowerCase().replace(' ', '-')}/`,
    `https://github.com/${personalInfo.name.toLowerCase().replace(' ', '-')}`,
    `https://twitter.com/${personalInfo.twitterHandle.replace('@', '')}`
  ],
  description: 'Expert en gestion de projets et product ownership'
});

// Script Arcade pour les démos interactives
const arcadeScript = `
  function onArcadeIframeMessage(e) {
    if (e.origin !== 'https://demo.arcade.software' || !e.isTrusted) return;
    
    const arcadeIframe = document.querySelector('iframe[src*="R4EdYeJx1ocNFzBr7mvw"]');
    if (!arcadeIframe || !arcadeIframe.contentWindow) return;
    
    if (e.data.event === 'arcade-init') {
      arcadeIframe.contentWindow.postMessage({event: 'register-popout-handler'}, '*');
    }
    
    if (e.data.event === 'arcade-popout-open') {
      arcadeIframe.style.position = 'fixed';
      arcadeIframe.style.zIndex = '9999999';
    }
    
    if (e.data.event === 'arcade-popout-close') {
      arcadeIframe.style.position = 'absolute';
      arcadeIframe.style.zIndex = 'auto';
    }
  }
  
  window.addEventListener('message', onArcadeIframeMessage);
`;

export default function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  return (
    <html lang={lang}>
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
        <LangProvider lang={lang}>
          {children}
        </LangProvider>
        
        {/* Script pour gérer les démos Arcade */}
        <Script id="arcade-handler" dangerouslySetInnerHTML={{ __html: arcadeScript }} />
      </body>
    </html>
  );
} 