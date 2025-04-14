'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { ImageMetadata } from '@/types/admin';

// Types pour les props du composant
interface ImageManagerProps {
  imageId?: string;
  src?: string;
  alt?: string;
  locale?: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  showPlaceholder?: boolean;
}

// Cache pour les images
let imagesCache: ImageMetadata[] | null = null;
let lastFetchTime = 0;
const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

/**
 * Récupère les métadonnées des images depuis l'API
 */
const fetchImages = async (): Promise<ImageMetadata[]> => {
  // Utiliser le cache si disponible et pas trop ancien
  const now = Date.now();
  if (imagesCache && now - lastFetchTime < CACHE_MAX_AGE) {
    return imagesCache;
  }
  
  try {
    const response = await fetch('/api/images');
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    
    const images = await response.json();
    imagesCache = images;
    lastFetchTime = now;
    
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return imagesCache || [];
  }
};

/**
 * Composant pour afficher des images avec gestion d'erreurs et chargement
 */
export function ImageManager({
  imageId,
  src,
  alt,
  locale = 'fr',
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover',
  showPlaceholder = true
}: ImageManagerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src || '');
  const [imageAlt, setImageAlt] = useState(alt || '');
  
  // Charger les métadonnées de l'image si un ID est fourni
  useEffect(() => {
    // Si une source directe est fournie, l'utiliser
    if (src) {
      setImageSrc(src);
      setImageAlt(alt || '');
      return;
    }
    
    // Si un ID d'image est fourni, charger les métadonnées
    if (imageId) {
      fetchImages().then(images => {
        const image = images.find(img => img.id === imageId);
        
        if (image) {
          setImageSrc(image.path);
          setImageAlt(image.alt[locale as keyof typeof image.alt] || image.alt.fr || '');
        } else {
          console.warn(`Image with id "${imageId}" not found`);
          setHasError(true);
        }
      }).catch(error => {
        console.error('Failed to load image data:', error);
        setHasError(true);
      });
    }
  }, [imageId, src, alt, locale]);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };
  
  // Afficher un placeholder en cas d'erreur ou si aucune image n'est trouvée
  if (!imageSrc || hasError) {
    if (!showPlaceholder) return null;
    
    return (
      <div 
        className={`flex items-center justify-center bg-primary-light text-primary ${className}`}
        style={{ width: width || '100%', height: height || '100%' }}
        aria-label={imageAlt || "Image not found"}
      >
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  // Afficher l'image avec un indicateur de chargement
  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-primary-light/30 animate-pulse ${className}`}
          style={{ objectFit }}
        />
      )}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={fill ? undefined : (width || 800)}
        height={fill ? undefined : (height || 600)}
        className={`${className} ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'} transition-all duration-500`}
        fill={fill}
        priority={priority}
        sizes={sizes}
        style={{ objectFit }}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
} 