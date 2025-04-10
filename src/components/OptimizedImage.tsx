'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  itemProp?: string;
}

/**
 * Composant d'image optimisé avec gestion des erreurs et du chargement
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
  itemProp,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Gestion des erreurs de chargement d'image
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Gestion du chargement d'image réussi
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Image de placeholder en cas d'erreur
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-primary-light text-primary ${className}`}
        style={{ width: width || '100%', height: height || '100%' }}
        aria-label={alt}
      >
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  // Image normale
  return (
    <div className={`relative ${className}`} style={{ width: width || '100%', height: height || '100%' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-light/30">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        fill={fill}
        priority={priority}
        sizes={sizes}
        style={{ objectFit }}
        itemProp={itemProp}
      />
    </div>
  );
};

export default OptimizedImage; 