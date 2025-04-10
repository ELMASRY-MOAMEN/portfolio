'use client';

import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section 
      id="a-propos" 
      ref={sectionRef}
      className="section-padding"
      aria-labelledby="about-heading"
    >
      <div className="container-custom">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 
            id="about-heading"
            className={`inline-block relative ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            À Propos
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto text-text-secondary ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            Découvrez mon parcours, mon expertise et ma vision en tant que gestionnaire de projet
            et product owner spécialisé dans la transformation digitale.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Illustration (à remplacer par votre propre image) */}
          <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 flex items-center justify-center bg-primary-light text-primary rounded-xl">
                <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Texte */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            <h3 className="text-2xl font-unbounded font-bold text-text-primary">
              Expertise en Gestion de Projets et Product Ownership
            </h3>
            
            <p className="text-text-secondary">
              Fort d'une expérience de plus de 5 ans dans la gestion de projets digitaux, j'accompagne les entreprises
              dans leur transformation numérique avec une approche centrée sur l'utilisateur et les résultats.
            </p>
            
            <p className="text-text-secondary">
              Ma méthodologie s'articule autour de trois principes fondamentaux : l'écoute active des besoins utilisateurs,
              l'itération rapide et la prise de décision basée sur les données.
            </p>
            
            <h4 className="text-xl font-unbounded font-semibold text-text-primary mt-8">
              Ma vision
            </h4>
            
            <p className="text-text-secondary">
              Je crois fermement que la technologie doit être au service de l'humain, et non l'inverse. C'est pourquoi
              je m'attache à concevoir des produits digitaux intuitifs, accessibles et créateurs de valeur réelle.
            </p>
            
            <div className="pt-4">
              <a href="/a-propos" className="btn-secondary">
                En savoir plus
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Statistiques / Points forts */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <div className="text-center p-6 rounded-xl bg-white shadow-sm">
            <div className="text-4xl font-unbounded font-bold text-primary mb-3">+50</div>
            <p className="text-text-secondary">Projets livrés avec succès dans divers secteurs d'activité</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white shadow-sm">
            <div className="text-4xl font-unbounded font-bold text-primary mb-3">95%</div>
            <p className="text-text-secondary">Satisfaction client grâce à une méthodologie axée sur la valeur</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white shadow-sm">
            <div className="text-4xl font-unbounded font-bold text-primary mb-3">+20</div>
            <p className="text-text-secondary">Équipes accompagnées dans l'adoption de méthodes agiles</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 