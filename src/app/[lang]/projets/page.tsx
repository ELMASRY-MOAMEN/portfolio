import { Metadata } from 'next';
import { Lang, langs } from '../params';
import translations from '@/data/translations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = translations[params.lang].meta;
  
  return {
    title: `${t.title} | Projets`,
    description: 'Découvrez mes projets en tant que Project Manager et Product Owner, avec des résultats concrets et mesurables.',
    keywords: [...t.keywords, 'projets', 'portfolio', 'études de cas'],
    alternates: {
      canonical: 'https://moamen.fr/projets',
      languages: {
        'fr': 'https://moamen.fr/projets',
        'en': 'https://moamen.fr/en/projects',
      },
    },
  };
}

export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default function ProjectsPage({ params }: { params: { lang: Lang } }) {
  return (
    <>
      <Header />
      <main id="content" className="flex flex-col pt-24">
        <div className="container-custom py-12">
          <h1 className="font-unbounded text-4xl md:text-5xl font-bold mb-6 text-center">
            Mes Projets
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto text-center mb-12">
            Découvrez mes projets clés, présentant mon expertise en gestion de projets et product ownership avec des résultats concrets et mesurables.
          </p>
        </div>
        
        {/* Section Projets */}
        <ProjectsSection />
        
        {/* Section Témoignages pour renforcer la crédibilité */}
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
} 