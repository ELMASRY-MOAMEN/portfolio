'use client';

import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { FaArrowRight } from 'react-icons/fa';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const { t, locale } = useTranslation();

  // Préfixe de langue pour les URLs
  const langPrefix = `/${locale}`;

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
            {t.about.title}
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto text-text-secondary ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            {t.about.description}
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
              {t.about.expertise.title}
            </h3>
            
            <p className="text-text-secondary">
              {t.about.expertise.paragraph1}
            </p>
            
            <p className="text-text-secondary">
              {t.about.expertise.paragraph2}
            </p>
            
            <h4 className="text-xl font-unbounded font-semibold text-text-primary mt-8">
              {t.about.vision.title}
            </h4>
            
            <p className="text-text-secondary">
              {t.about.vision.paragraph}
            </p>
            
            <div className="pt-4">
              <Link href={`${langPrefix}/a-propos`} className="btn-secondary">
                {t.about.cta}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Statistiques / Points forts */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <div className="text-center p-6 rounded-xl bg-white shadow-sm">
            <div className="text-4xl font-unbounded font-bold text-primary mb-3">{t.about.projects.count}</div>
            <p className="text-text-secondary">{t.about.projects.description}</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white shadow-sm">
            <div className="text-4xl font-unbounded font-bold text-primary mb-3">{t.about.experience.years}</div>
            <p className="text-text-secondary">{t.about.experience.description}</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white shadow-sm">
            <div className="text-4xl font-unbounded font-bold text-primary mb-3">{t.about.international.count}</div>
            <p className="text-text-secondary">{t.about.international.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
          <div className="order-2 lg:order-1 animate-fade-up">
            <h2 className="text-3xl font-semibold mb-6 font-unbounded">
              {t.about.title}
            </h2>
            
            <div className="space-y-4 text-slate-700 dark:text-slate-300 font-bricolage">
              <p>{t.about.paragraphs[0]}</p>
              <p>{t.about.paragraphs[1]}</p>
              <p>{t.about.paragraphs[2]}</p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="group">
                <a href={t.about.cvPath} download>
                  {t.about.downloadCV}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative animate-fade-up">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl bg-primary/10">
              <Image 
                src="/images/profile-2.jpg" 
                alt={t.about.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-primary rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-white font-unbounded text-xl font-bold">10+</span>
            </div>
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-secondary rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-white font-unbounded text-xl font-bold">50+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 