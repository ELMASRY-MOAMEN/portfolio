'use client';

import { useLoadAnimation } from '@/hooks/useLoadAnimation';
import GatewayCard from './GatewayCard';

interface GatewayGridProps {
  locale: string;
  cards: {
    about: {
      title: string;
      description: string;
      linkText: string;
      href: string;
    };
    projects: {
      title: string;
      description: string;
      linkText: string;
      href: string;
    };
    contact: {
      title: string;
      description: string;
      linkText: string;
      href: string;
    };
  };
}

/**
 * Composant pour la grille de gateway (section avec les liens vers les différentes sections)
 */
export default function GatewayGrid({ locale, cards }: GatewayGridProps) {
  const isLoaded = useLoadAnimation({ delay: 600 });

  return (
    <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
      <GatewayCard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
        title={cards.about.title}
        description={cards.about.description}
        href={cards.about.href}
        linkText={cards.about.linkText}
      />
      
      <GatewayCard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        }
        title={cards.projects.title}
        description={cards.projects.description}
        href={cards.projects.href}
        linkText={cards.projects.linkText}
      />
      
      <GatewayCard
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
        title={cards.contact.title}
        description={cards.contact.description}
        href={cards.contact.href}
        linkText={cards.contact.linkText}
      />
    </div>
  );
} 