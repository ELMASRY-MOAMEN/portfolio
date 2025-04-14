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
    title: `${t.title} | Projects`,
    description: 'Discover my projects as a Project Manager and Product Owner, with concrete and measurable results.',
    keywords: [...t.keywords, 'projects', 'portfolio', 'case studies'],
    alternates: {
      canonical: 'https://moamen.fr/en/projects',
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
            My Projects
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto text-center mb-12">
            Discover my key projects, showcasing my expertise in project management and product ownership with concrete and measurable results.
          </p>
        </div>
        
        {/* Projects Section */}
        <ProjectsSection />
        
        {/* Testimonials Section to enhance credibility */}
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
} 