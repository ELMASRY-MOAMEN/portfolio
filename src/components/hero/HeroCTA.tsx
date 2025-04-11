'use client';

import { useLoadAnimation } from '@/hooks/useLoadAnimation';
import HeroLink from './HeroLink';

interface HeroCTAProps {
  links: {
    aboutMe: {
      href: string;
      label: string;
      ariaLabel: string;
    };
    viewProjects: {
      href: string;
      label: string;
      ariaLabel: string;
    };
    downloadCV: {
      href: string;
      label: string;
      ariaLabel: string;
    };
  };
}

/**
 * Composant pour les boutons d'action (CTA) de la hero section
 */
export default function HeroCTA({ links }: HeroCTAProps) {
  const isLoaded = useLoadAnimation({ delay: 400 });

  return (
    <div 
      className={`flex flex-wrap gap-4 animate-fade-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ animationDelay: '800ms' }}
    >
      <HeroLink 
        href={links.aboutMe.href}
        label={links.aboutMe.label}
        ariaLabel={links.aboutMe.ariaLabel}
        variant="primary"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        }
      />
      
      <HeroLink 
        href={links.viewProjects.href}
        label={links.viewProjects.label}
        ariaLabel={links.viewProjects.ariaLabel}
        variant="secondary"
      />
      
      <HeroLink 
        href={links.downloadCV.href}
        label={links.downloadCV.label}
        ariaLabel={links.downloadCV.ariaLabel}
        variant="outline"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        }
      />
    </div>
  );
} 