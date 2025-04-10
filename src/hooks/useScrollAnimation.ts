'use client';

import { useState, useEffect, RefObject } from 'react';

/**
 * Hook personnalisé pour gérer les animations au scroll
 * @param ref - Référence à l'élément à observer
 * @param threshold - Seuil de visibilité (0-1)
 * @param rootMargin - Marge autour de la racine
 * @returns isVisible - État de visibilité de l'élément
 */
export const useScrollAnimation = (
  ref: RefObject<HTMLElement>,
  threshold: number = 0.1,
  rootMargin: string = '0px'
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, rootMargin]);

  return isVisible;
}; 