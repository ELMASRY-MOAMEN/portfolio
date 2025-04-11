import { useState, useEffect } from 'react';

interface TypedTextOptions {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
}

/**
 * Hook personnalisé pour créer un effet de texte qui s'écrit caractère par caractère
 * @param options Configuration du typing effect
 * @returns Le texte en cours d'écriture et un booléen indiquant si la frappe est terminée
 */
export function useTypingEffect({ 
  text, 
  typingSpeed = 80, 
  startDelay = 500 
}: TypedTextOptions): { typedText: string; isComplete: boolean } {
  const [typedText, setTypedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Réinitialiser l'état si le texte change
    setTypedText('');
    setIsComplete(false);
    
    // Attendez un court délai avant de commencer l'animation
    const startTimeout = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, typingSpeed);
      
      // Nettoyage lors du démontage du composant
      return () => clearInterval(typingInterval);
    }, startDelay);
    
    return () => clearTimeout(startTimeout);
  }, [text, typingSpeed, startDelay]);

  return { typedText, isComplete };
} 