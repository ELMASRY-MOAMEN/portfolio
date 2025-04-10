'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation au chargement de la page
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary-light"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div 
            className={`order-2 md:order-1 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <h1 
              id="hero-heading"
              className="font-unbounded text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-text-primary"
              itemProp="headline"
            >
              Expert en <span className="text-primary">Gestion de Projets</span> & Product Ownership
            </h1>
            <p 
              className="font-bricolage text-lg md:text-xl text-text-secondary mb-8 max-w-2xl animate-fade-up"
              style={{ animationDelay: '500ms' }}
              itemProp="description"
            >
              Bienvenue sur mon portfolio. Je transforme des idées complexes en projets structurés et orientés résultats, 
              avec une approche centrée sur la valeur métier et l'expérience utilisateur.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '700ms' }}
            >
              <Link 
                href="/projets" 
                className="btn-primary"
                role="button"
                aria-label="Découvrir mes projets"
              >
                Découvrir mes projets
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                href="/contact" 
                className="btn-secondary"
                role="button"
                aria-label="Me contacter"
              >
                Me contacter
              </Link>
            </div>
          </div>
          
          {/* Image de profil */}
          <div 
            className={`order-1 md:order-2 flex justify-center transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 overflow-hidden">
              {/* Remplacer par votre photo */}
              <div className="absolute inset-0 flex items-center justify-center text-primary">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Lorsque vous aurez une photo */}
              {/* <Image
                src="/images/profile.jpg"
                alt="Votre Nom - Expert en Gestion de Projets et Product Ownership"
                fill
                sizes="(max-width: 768px) 18rem, 24rem"
                priority
                className="object-cover"
              /> */}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <a 
            href="#a-propos" 
            className="text-text-primary hover:text-primary transition-colors"
            aria-label="Découvrir mon profil"
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