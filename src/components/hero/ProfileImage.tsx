'use client';

import { useLoadAnimation } from '@/hooks/useLoadAnimation';
import { ImageManager } from '@/components/ui/image-manager';

interface ProfileImageProps {
  imageId?: string;
  src?: string;
  alt: string;
  badges: {
    certified: string;
    experience: string;
  };
  locale: string;
}

/**
 * Composant pour l'image de profil avec les badges flottants
 */
export default function ProfileImage({ imageId, src, alt, badges, locale }: ProfileImageProps) {
  const isLoaded = useLoadAnimation();

  return (
    <div 
      className={`flex justify-center transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: '200ms' }}
    >
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
        <div className="absolute inset-4 rounded-full overflow-hidden shadow-xl border-4 border-white">
          {/* Image de profil - Maintenant utilise ImageManager */}
          <ImageManager
            imageId={imageId}
            src={src}
            alt={alt}
            locale={locale}
            fill
            priority
            sizes="(max-width: 768px) 20rem, 24rem"
          />
        </div>
        
        {/* Badge flottant 1 - Certification */}
        <div className="absolute top-8 -right-4 bg-white rounded-xl p-3 shadow-lg animate-float">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-text-secondary">{locale === 'fr' ? 'Certifié' : 'Certified'}</div>
              <div className="text-sm font-semibold">PMP & Prince2</div>
            </div>
          </div>
        </div>
        
        {/* Badge flottant 2 - Expérience internationale */}
        <div className="absolute bottom-10 -left-4 bg-white rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center mr-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-text-secondary">+6 {locale === 'fr' ? 'pays' : 'countries'}</div>
              <div className="text-sm font-semibold">{badges.experience}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 