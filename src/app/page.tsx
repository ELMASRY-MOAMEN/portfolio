import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accueil | Expert en Gestion de Projets & Product Ownership',
  description: 'Portfolio professionnel d\'un expert en gestion de projets et product ownership, spécialisé dans la transformation digitale et la livraison de projets à forte valeur ajoutée.',
  keywords: ['accueil', 'portfolio', 'gestion de projets', 'product ownership', 'transformation digitale'],
  alternates: {
    canonical: 'https://www.monportfolio.fr/',
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="content" className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        {/* Ces composants seront développés ultérieurement */}
        {/* <SkillsSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </>
  );
} 