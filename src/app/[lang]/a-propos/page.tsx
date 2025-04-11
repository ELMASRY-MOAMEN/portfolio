import { Metadata } from 'next';
import { Lang, langs } from '../params';
import translations from '@/data/translations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = translations[params.lang].meta;
  
  return {
    title: `${t.title} | À Propos`,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: params.lang === 'fr' ? 'https://moamen.fr/a-propos' : 'https://moamen.fr/en/about',
      languages: {
        'fr': 'https://moamen.fr/a-propos',
        'en': 'https://moamen.fr/en/about',
      },
    },
  };
}

export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default function AboutPage({ params }: { params: { lang: Lang } }) {
  return (
    <>
      <Header />
      <main id="content" className="flex flex-col pt-24">
        <div className="container-custom py-12">
          <h1 className="font-unbounded text-4xl md:text-5xl font-bold mb-12 text-center">
            {params.lang === 'fr' ? 'À Propos' : 'About Me'}
          </h1>
        </div>
        
        {/* Section Parcours et présentation personnelle */}
        <AboutSection />
        
        {/* Section compétences et soft skills */}
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
} 