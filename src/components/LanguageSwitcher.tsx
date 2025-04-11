'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  
  // Remove the language prefix from the current pathname
  const pathnameWithoutLang = pathname.replace(/^\/(fr|en)/, '') || '/';
  
  // Prepare links for each language
  const frHref = `/fr${pathnameWithoutLang}`;
  const enHref = `/en${pathnameWithoutLang}`;
  
  // Get language names for accessibility
  const frName = locale === 'fr' ? 'Français (actuel)' : 'Français';
  const enName = locale === 'en' ? 'English (current)' : 'English';
  
  return (
    <div className="flex items-center justify-center space-x-2" role="navigation" aria-label={locale === 'fr' ? 'Sélection de langue' : 'Language selection'}>
      {locale === 'fr' ? (
        <span 
          className="flex items-center px-2 py-1 transition-colors duration-200 text-primary font-bold"
          aria-current="page"
        >
          <Image 
            src="/images/flags/fr.svg" 
            alt="Drapeau français" 
            width={24} 
            height={18} 
            className="border border-gray-200 rounded-sm"
          />
        </span>
      ) : (
        <Link 
          href={frHref}
          className="flex items-center px-2 py-1 transition-colors duration-200 text-text-secondary hover:text-primary"
          aria-label="Passer en français"
          hrefLang="fr"
          locale="fr"
        >
          <Image 
            src="/images/flags/fr.svg" 
            alt="Drapeau français" 
            width={24} 
            height={18} 
            className="border border-gray-200 rounded-sm opacity-70 hover:opacity-100"
          />
        </Link>
      )}
      
      {locale === 'en' ? (
        <span 
          className="flex items-center px-2 py-1 transition-colors duration-200 text-primary font-bold"
          aria-current="page"
        >
          <Image 
            src="/images/flags/gb.svg" 
            alt="British flag" 
            width={24} 
            height={18} 
            className="border border-gray-200 rounded-sm"
          />
        </span>
      ) : (
        <Link 
          href={enHref}
          className="flex items-center px-2 py-1 transition-colors duration-200 text-text-secondary hover:text-primary"
          aria-label="Switch to English"
          hrefLang="en"
          locale="en"
        >
          <Image 
            src="/images/flags/gb.svg" 
            alt="British flag" 
            width={24} 
            height={18} 
            className="border border-gray-200 rounded-sm opacity-70 hover:opacity-100"
          />
        </Link>
      )}
    </div>
  );
} 