import { Metadata } from 'next';
import { langs, type Lang } from '@/app/[lang]/params';
import translations from '@/data/translations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YVEAProjectContent from '@/components/projects/YVEAProjectContent';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = translations[params.lang].meta;
  
  return {
    title: `${t.title} | YVEA - ${params.lang === 'fr' ? 'SaaS export IA' : 'AI Export SaaS'}`,
    description: `${params.lang === 'fr' 
      ? 'Étude de cas YVEA: transformation numérique du processus de certification pour l\'export international avec l\'IA'
      : 'YVEA case study: digital transformation of certification processes for international export with AI'
    }`,
    keywords: [...t.keywords, 'YVEA', 'SaaS', 'export', 'AI', 'IA', 'certification'],
    alternates: {
      canonical: params.lang === 'fr' ? 'https://moamen.fr/projets/yvea' : 'https://moamen.fr/en/projects/yvea',
      languages: {
        'fr': 'https://moamen.fr/projets/yvea',
        'en': 'https://moamen.fr/en/projects/yvea',
      },
    },
  };
}

// Générer des versions statiques de la page pour chaque langue
export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default function YVEAProjectPage({ params }: { params: { lang: Lang } }) {
  return (
    <>
      <Header />
      <YVEAProjectContent />
      <Footer />
    </>
  );
} 