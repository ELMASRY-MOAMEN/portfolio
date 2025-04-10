'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'solutions digitales innovantes';
  const typingSpeed = 100;

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
  }, []);

  return (
    <section 
      className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary-light relative overflow-hidden"
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
              Moamen Elmasry — Expert Digital
            </div>
            
            <h1 
              id="hero-heading"
              className="font-unbounded text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text-primary"
              itemProp="headline"
            >
              Expert en <span className="text-primary">Gestion de Projets</span> & Product Ownership
            </h1>
            
            <h2 className="font-bricolage text-2xl md:text-3xl text-text-primary font-medium mb-6 animate-fade-up" style={{ animationDelay: '500ms' }}>
              Transformer les idées en <span className="text-primary relative">
                {typedText}
                <span className="absolute right-0 border-r-2 border-primary animate-pulse"></span>
              </span>
            </h2>
            
            <p 
              className="font-bricolage text-lg text-text-secondary mb-8 max-w-2xl animate-fade-up"
              style={{ animationDelay: '600ms' }}
              itemProp="description"
            >
              9+ ans d'expérience en pilotage de projets dans des environnements variés (startups, grands groupes, international).
              Je transforme les défis complexes en opportunités, avec une approche centrée sur les résultats et l'utilisateur.
            </p>
            
            {/* Points clés */}
            <div className="flex flex-wrap gap-4 mb-8 animate-fade-up" style={{ animationDelay: '700ms' }}>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span className="text-text-secondary font-medium">Certifié PMP & Prince2</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span className="text-text-secondary font-medium">Expertise SaaS & IA</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span className="text-text-secondary font-medium">Déploiement International</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '800ms' }}
            >
              <Link 
                href="#projets" 
                className="btn-primary"
                role="button"
                aria-label="Découvrir mes projets"
              >
                Voir mes réalisations
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a 
                href="/cv-moamen-elmasry.pdf" 
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Télécharger mon CV"
              >
                Télécharger mon CV
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
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
                  alt="Moamen Elmasry - Expert en Gestion de Projets et Product Ownership"
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
                    <div className="text-xs text-text-secondary">Certifié</div>
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
                    <div className="text-xs text-text-secondary">+20 pays</div>
                    <div className="text-sm font-semibold">Déploiements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <a 
            href="#competences" 
            className="text-text-primary hover:text-primary transition-colors"
            aria-label="Découvrir mon expertise"
          >
            <svg 
              className="w-8 h-8 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 