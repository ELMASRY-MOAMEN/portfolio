'use client';

import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useLoadAnimation } from '@/hooks/useLoadAnimation';

interface HeroHeaderProps {
  title: string;
  subtitle: {
    prefix: string;
    typed: string;
  };
  tagline: string;
  description: string;
  locale: string;
}

/**
 * Composant pour l'en-tête de la section hero (titre, sous-titre, description)
 */
export default function HeroHeader({
  title,
  subtitle,
  tagline,
  description,
  locale
}: HeroHeaderProps) {
  const isLoaded = useLoadAnimation({ delay: 100 });
  const { typedText } = useTypingEffect({ 
    text: subtitle.typed,
    typingSpeed: 80,
    startDelay: 800
  });

  return (
    <div 
      className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: '300ms' }}
    >
      <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-bold rounded-full mb-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
        Moamen Elmasry — {tagline}
      </div>
      
      <h1 
        className="font-unbounded text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-text-primary"
        itemProp="headline"
      >
        {title}
      </h1>
      
      <h2 className="font-bricolage text-2xl md:text-3xl text-text-primary font-medium mb-6 animate-fade-up" style={{ animationDelay: '500ms' }}>
        {subtitle.prefix}
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
        {description}
      </p>
    </div>
  );
} 