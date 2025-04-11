'use client';

import { useTranslation } from '@/hooks/useTranslation';
import HeroHeader from './HeroHeader';
import ProfileImage from './ProfileImage';
import HeroStatistics from './HeroStatistics';
import HeroCTA from './HeroCTA';
import GatewayGrid from './GatewayGrid';
import { HeroStatistic } from '@/types/hero';

/**
 * Composant principal pour la section hero (page d'accueil)
 */
export default function HeroSection() {
  const { t, locale } = useTranslation();
  
  // Préfixe de langue pour les URLs
  const langPrefix = `/${locale}`;
  
  // Statistiques à afficher
  const statistics: HeroStatistic[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      value: 'PMP & PRINCE2',
      label: locale === 'fr' ? 'Certifié' : 'Certified'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      value: '+50',
      label: locale === 'fr' ? 'Projets livrés' : 'Delivered projects'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      value: '+6',
      label: locale === 'fr' ? 'Pays' : 'Countries'
    }
  ];
  
  // Liens CTA
  const ctaLinks = {
    aboutMe: {
      href: `${langPrefix}/a-propos`,
      label: locale === 'fr' ? 'À propos de moi' : 'About me',
      ariaLabel: locale === 'fr' ? 'En savoir plus sur mon parcours' : 'Learn more about my journey'
    },
    viewProjects: {
      href: `${langPrefix}/realisations`,
      label: locale === 'fr' ? 'Voir mes réalisations' : 'View my projects',
      ariaLabel: locale === 'fr' ? 'Découvrir mes réalisations' : 'Discover my projects'
    },
    downloadCV: {
      href: '/cv-moamen-elmasry.pdf',
      label: locale === 'fr' ? 'Télécharger CV' : 'Download CV',
      ariaLabel: locale === 'fr' ? 'Télécharger mon CV' : 'Download my resume'
    }
  };
  
  // Cartes de la grille gateway
  const gatewayCards = {
    about: {
      title: locale === 'fr' ? 'À Propos' : 'About',
      description: locale === 'fr' 
        ? 'Découvrez mon parcours, mes valeurs et ma vision professionnelle.' 
        : 'Discover my journey, values and professional vision.',
      linkText: locale === 'fr' ? 'En savoir plus' : 'Learn more',
      href: `${langPrefix}/a-propos`
    },
    projects: {
      title: locale === 'fr' ? 'Réalisations' : 'Projects',
      description: locale === 'fr' 
        ? 'Consultez mes projets clés et leurs résultats concrets.' 
        : 'Check out my key projects and their concrete results.',
      linkText: locale === 'fr' ? 'Voir les projets' : 'View projects',
      href: `${langPrefix}/realisations`
    },
    contact: {
      title: locale === 'fr' ? 'Contact' : 'Contact',
      description: locale === 'fr' 
        ? 'Discutons de vos besoins en gestion de projets ou product ownership.' 
        : 'Let\'s discuss your project management or product ownership needs.',
      linkText: locale === 'fr' ? 'Me contacter' : 'Contact me',
      href: `${langPrefix}/contact`
    }
  };

  return (
    <section 
      className="pt-32 pb-16 md:pt-40 md:pb-28 bg-primary-light relative overflow-hidden"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Formes décoratives */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary opacity-5 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary opacity-5 translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div className="order-2 md:order-1">
            <HeroHeader 
              title={t.hero.title}
              subtitle={{
                prefix: locale === 'fr' ? 'Transformer les idées en ' : 'Transforming ideas into ',
                typed: locale === 'fr' 
                  ? 'solutions digitales concrètes pour un ROI mesurable'
                  : 'concrete digital solutions for measurable ROI'
              }}
              tagline={t.hero.tagline}
              description={t.hero.description}
              locale={locale}
            />
            
            {/* Statistiques */}
            <HeroStatistics statistics={statistics} />
            
            {/* CTA Buttons */}
            <HeroCTA links={ctaLinks} />
          </div>
          
          {/* Image de profil */}
          <div className="order-1 md:order-2">
            <ProfileImage 
              src="/images/profile.jpg"
              alt={`Moamen Elmasry - ${locale === 'fr' ? 'Expert en Gestion de Projets et Product Ownership' : 'Project Management and Product Ownership Expert'}`}
              badges={{
                certified: 'PMP & Prince2',
                experience: locale === 'fr' ? 'Expérience' : 'Experience'
              }}
              locale={locale}
            />
          </div>
        </div>
        
        {/* Grille de gateway */}
        <GatewayGrid 
          locale={locale}
          cards={gatewayCards}
        />
      </div>
    </section>
  );
} 