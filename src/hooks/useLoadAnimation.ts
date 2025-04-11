import { useState, useEffect } from 'react';

interface LoadAnimationOptions {
  delay?: number;
}

/**
 * Hook personnalisé pour gérer l'animation d'apparition au chargement d'un composant
 * @param options Configuration de l'animation
 * @returns Un booléen indiquant si le composant est chargé/visible
 */
export function useLoadAnimation({ delay = 0 }: LoadAnimationOptions = {}): boolean {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoaded;
} 