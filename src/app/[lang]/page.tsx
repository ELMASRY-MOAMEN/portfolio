import Header from '@/components/Header';
import { HeroSection } from '@/components/hero';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Lang, langs } from './params';
import translations from '@/data/translations.json';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = translations[params.lang].meta;
  
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: params.lang === 'fr' ? 'https://moamen.fr/' : 'https://moamen.fr/en/',
      languages: {
        'fr': 'https://moamen.fr/',
        'en': 'https://moamen.fr/en/',
      },
    },
  };
}

export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default function Home({ params }: { params: { lang: Lang } }) {
  return (
    <>
      <Header />
      <main id="content" className="flex flex-col">
        {/* Page d'accueil servant de gateway */}
        <HeroSection />
      </main>
      <Footer />
    </>
  );
} 