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
    title: `${t.title} | ${params.lang === 'fr' ? 'Réalisations' : 'Projects'}`,
    description: `${params.lang === 'fr' ? 'Découvrez mes projets et réalisations en tant que Project Manager et Product Owner, avec des résultats concrets et mesurables.' : 'Discover my projects and achievements as a Project Manager and Product Owner, with concrete and measurable results.'}`,
    keywords: [...t.keywords, 'projects', 'achievements', 'portfolio', 'case studies'],
    alternates: {
      canonical: params.lang === 'fr' ? 'https://moamen.fr/realisations' : 'https://moamen.fr/en/projects',
      languages: {
        'fr': 'https://moamen.fr/realisations',
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
            {params.lang === 'fr' ? 'Mes Réalisations' : 'My Projects'}
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto text-center mb-12">
            {params.lang === 'fr' 
              ? 'Découvrez mes projets et réalisations clés, présentant mon expertise en gestion de projets et product ownership avec des résultats concrets et mesurables.'
              : 'Discover my key projects and achievements, showcasing my expertise in project management and product ownership with concrete and measurable results.'}
          </p>
        </div>
        
        {/* Section Projets et réalisations */}
        <ProjectsSection />
        
        {/* Section Témoignages pour renforcer la crédibilité */}
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
} 