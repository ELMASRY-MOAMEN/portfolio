'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { useTranslation } from '@/hooks/useTranslation';

const HeroSection = () => {
  const { t, locale } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = locale === 'fr' 
    ? 'solutions digitales concrètes pour un ROI mesurable' 
    : 'concrete digital solutions for measurable ROI';
  const typingSpeed = 80;

  // Animation au chargement de la page
  useEffect(() => {
    setIsLoaded(true);

    // Effet de typing
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [fullText]);

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
          <div 
            className={`order-2 md:order-1 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-bold rounded-full mb-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
              Moamen Elmasry — {t.hero.tagline}
            </div>
            
            <h1 
              id="hero-heading"
              className="font-unbounded text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-text-primary"
              itemProp="headline"
            >
              {locale === 'fr' ? 'Moamen Elmasry – Project Manager & Product Owner' : 'Moamen Elmasry – Project Manager & Product Owner'}
            </h1>
            
            <h2 className="font-bricolage text-2xl md:text-3xl text-text-primary font-medium mb-6 animate-fade-up" style={{ animationDelay: '500ms' }}>
              {locale === 'fr' ? 'Transformer les idées en ' : 'Transforming ideas into '}
              <span className="text-primary relative">
                {typedText}
                <span className="absolute right-0 border-r-2 border-primary animate-pulse"></span>
              </span>
            </h2>
            
            <p 
              className="font-bricolage text-lg text-text-secondary mb-8 max-w-2xl animate-fade-up"
              style={{ animationDelay: '600ms' }}
              itemProp="description"
            >
              {locale === 'fr' 
                ? 'Fort de plus de 9 ans d\'expérience en gestion de projets digitaux et product ownership, j\'accompagne les entreprises dans leur transformation numérique en alliant vision stratégique et exécution opérationnelle.'
                : 'With over 9 years of experience in digital project management and product ownership, I help companies in their digital transformation by combining strategic vision and operational execution.'}
            </p>
            
            {/* Points clés */}
            <div className="flex flex-wrap gap-6 mb-10 animate-fade-up" style={{ animationDelay: '700ms' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <span className="text-text-primary font-medium block">PMP & PRINCE2</span>
                  <span className="text-text-secondary text-sm">{locale === 'fr' ? 'Certifié' : 'Certified'}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <span className="text-text-primary font-medium block">+50</span>
                  <span className="text-text-secondary text-sm">{locale === 'fr' ? 'Projets livrés' : 'Delivered projects'}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <span className="text-text-primary font-medium block">+6</span>
                  <span className="text-text-secondary text-sm">{locale === 'fr' ? 'Pays' : 'Countries'}</span>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons - Gateway vers les principales sections */}
            <div 
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '800ms' }}
            >
              <Link 
                href={`/${locale}/a-propos`} 
                className="btn-primary"
                role="button"
                aria-label={locale === 'fr' ? 'En savoir plus sur mon parcours' : 'Learn more about my journey'}
              >
                {locale === 'fr' ? 'À propos de moi' : 'About me'}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                href={`/${locale}/realisations`} 
                className="btn-secondary"
                role="button"
                aria-label={locale === 'fr' ? 'Découvrir mes réalisations' : 'Discover my projects'}
              >
                {locale === 'fr' ? 'Voir mes réalisations' : 'View my projects'}
              </Link>
              <Link 
                href="/CV_Moamen_Elmasry_Ingenieur_IA.pdf" 
                className="btn-outline"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label={locale === 'fr' ? 'Télécharger mon CV' : 'Download my resume'}
              >
                {locale === 'fr' ? 'Télécharger CV' : 'Download CV'}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Image de profil */}
          <div 
            className={`order-1 md:order-2 flex justify-center transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-xl border-4 border-white">
                {/* Image de profil */}
                <OptimizedImage
                  src="/images/profile.jpg"
                  alt={`Moamen Elmasry - ${locale === 'fr' ? 'Expert en Gestion de Projets et Product Ownership' : 'Project Management and Product Ownership Expert'}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 20rem, 24rem"
                />
              </div>
              
              {/* Badge flottant 1 */}
              <div className="absolute top-8 -right-4 bg-white rounded-xl p-3 shadow-lg animate-float">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center mr-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">{locale === 'fr' ? 'Certifié' : 'Certified'}</div>
                    <div className="text-sm font-semibold">PMP & Prince2</div>
                  </div>
                </div>
              </div>
              
              {/* Badge flottant 2 */}
              <div className="absolute bottom-10 -left-4 bg-white rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center mr-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">+6 {locale === 'fr' ? 'pays' : 'countries'}</div>
                    <div className="text-sm font-semibold">{locale === 'fr' ? 'Expérience' : 'Experience'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sections grid - Gateway visuelle vers les différentes sections */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <Link 
            href={`/${locale}/a-propos`}
            className="card bg-white p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-unbounded text-xl font-bold mb-2">
              {locale === 'fr' ? 'À Propos' : 'About'}
            </h3>
            <p className="text-text-secondary mb-4">
              {locale === 'fr' 
                ? 'Découvrez mon parcours, mes valeurs et ma vision professionnelle.' 
                : 'Discover my journey, values and professional vision.'}
            </p>
            <div className="text-primary font-medium inline-flex items-center">
              {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
          
          <Link 
            href={`/${locale}/realisations`}
            className="card bg-white p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-unbounded text-xl font-bold mb-2">
              {locale === 'fr' ? 'Réalisations' : 'Projects'}
            </h3>
            <p className="text-text-secondary mb-4">
              {locale === 'fr' 
                ? 'Consultez mes projets clés et leurs résultats concrets.' 
                : 'Check out my key projects and their concrete results.'}
            </p>
            <div className="text-primary font-medium inline-flex items-center">
              {locale === 'fr' ? 'Voir les projets' : 'View projects'}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
          
          <Link 
            href={`/${locale}/contact`}
            className="card bg-white p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-unbounded text-xl font-bold mb-2">
              {locale === 'fr' ? 'Contact' : 'Contact'}
            </h3>
            <p className="text-text-secondary mb-4">
              {locale === 'fr' 
                ? 'Discutons de vos besoins en gestion de projets ou product ownership.' 
                : 'Let\'s discuss your project management or product ownership needs.'}
            </p>
            <div className="text-primary font-medium inline-flex items-center">
              {locale === 'fr' ? 'Me contacter' : 'Contact me'}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 