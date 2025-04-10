'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="a-propos"
      ref={sectionRef}
      className="section-padding bg-white"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container-custom">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 
            id="about-heading"
            className={`inline-block relative ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            À propos de moi
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`relative ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
              {/* Remplacer par votre photo */}
              <div className="absolute inset-0 flex items-center justify-center bg-primary-light text-primary">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Lorsque vous aurez une photo */}
              {/* <Image
                src="/images/about-image.jpg"
                alt="Votre Nom - Expert en Gestion de Projets et Product Ownership"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              /> */}
            </div>
          </div>

          {/* Contenu */}
          <div>
            <h3 
              className={`text-2xl font-unbounded mb-4 text-text-primary ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '300ms' }}
              itemProp="name"
            >
              Expert en Gestion de Projets & Product Ownership
            </h3>
            
            <div 
              className={`space-y-4 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '400ms' }}
              itemProp="description"
            >
              <p>
                Avec plus de X années d'expérience dans la gestion de projets digitaux, je me spécialise dans la transformation numérique 
                des entreprises et l'optimisation des processus de développement produit. Mon approche combine rigueur méthodologique 
                et vision centrée utilisateur.
              </p>
              
              <p>
                J'ai eu l'opportunité de travailler sur des projets stratégiques variés, allant des systèmes d'information internes 
                aux plateformes B2B/B2C, en passant par des applications mobiles innovantes. Ma philosophie se base sur la création de valeur 
                tangible pour les utilisateurs tout en alignant les objectifs business.
              </p>
              
              <p>
                En tant que Product Owner, je m'assure que chaque fonctionnalité répond à un besoin réel, est développée avec efficacité, 
                et s'intègre dans une vision cohérente du produit. Je suis particulièrement à l'aise avec les méthodologies Agile/Scrum 
                et les approches Lean.
              </p>
            </div>
            
            {/* Chiffres clés */}
            <div 
              className={`grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '500ms' }}
            >
              <div className="text-center">
                <div className="text-4xl font-unbounded text-primary font-bold">X+</div>
                <div className="text-text-secondary mt-1">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-unbounded text-primary font-bold">XX+</div>
                <div className="text-text-secondary mt-1">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-unbounded text-primary font-bold">X</div>
                <div className="text-text-secondary mt-1">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-unbounded text-primary font-bold">XX+</div>
                <div className="text-text-secondary mt-1">Clients satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 