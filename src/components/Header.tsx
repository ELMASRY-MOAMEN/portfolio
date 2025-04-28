'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, locale } = useTranslation();
  
  // Effet pour détecter le scroll et changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Préfixe de langue pour les URLs
  const langPrefix = `/${locale}`;

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}
      aria-label={t.navigation.ariaLabels.mainHeader}
    >
      <div className="container-custom">
        <nav className="flex justify-between items-center" aria-label={t.navigation.ariaLabels.mainNavigation}>
          <div className="flex-shrink-0 animate-fade-in">
            <Link href={langPrefix} className={`font-unbounded text-2xl font-bold ${scrolled ? 'text-primary' : 'text-white'} flex items-center`} aria-label={t.navigation.home}>
              {/* Logo optionnel */}
              {/* <Image src="/images/logo.svg" alt="Logo Portfolio" width={40} height={40} className="mr-2" /> */}
              Moamen Elmasry
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8 animate-fade-in">
            <Link href={langPrefix} className={`font-bricolage ${scrolled ? 'text-text-primary' : 'text-white'} hover:text-primary transition-colors`}>
              {t.navigation.home}
            </Link>
            <Link href={`${langPrefix}/#projets`} className={`font-bricolage ${scrolled ? 'text-text-primary' : 'text-white'} hover:text-primary transition-colors`}>
              {locale === 'fr' ? 'Projets' : 'Projects'}
            </Link>
            <a href="https://calendly.com/elmasrymoamen/30min" className={`font-bricolage ${scrolled ? 'text-text-primary' : 'text-white'} hover:text-primary transition-colors`} target="_blank" rel="noopener noreferrer">
              {t.navigation.contact}
            </a>
            <a 
              href="/cv/MOAMEN_ELMASRY_CV_Project_Manager.pdf" 
              className={`font-bricolage ${scrolled ? 'btn-sm-primary' : 'text-white border border-white hover:bg-white/10 hover:text-white px-4 py-2 rounded-md text-sm transition-colors'}`}
              download
            >
              {t.navigation.downloadCv}
            </a>
            <LanguageSwitcher scrolled={scrolled} />
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher scrolled={scrolled} />
            <button 
              onClick={toggleMobileMenu} 
              className={`${scrolled ? 'text-text-primary' : 'text-white'} focus:outline-none`}
              aria-expanded={mobileMenuOpen}
              aria-label={t.navigation.ariaLabels.mainMenu}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden pt-4 pb-3 border-t border-gray-200 animate-fade-in bg-white"
            role="navigation"
            aria-label={t.navigation.ariaLabels.mobileMenu}
          >
            <div className="flex flex-col space-y-3">
              <Link href={langPrefix} className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors">
                {t.navigation.home}
              </Link>
              <Link href={`${langPrefix}/#projets`} className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors">
                {locale === 'fr' ? 'Projets' : 'Projects'}
              </Link>
              <a href="https://calendly.com/elmasrymoamen/30min" className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                {t.navigation.contact}
              </a>
              <a 
                href="/cv/MOAMEN_ELMASRY_CV_Project_Manager.pdf" 
                className="px-2 py-1 font-bricolage text-primary font-medium hover:underline transition-colors inline-flex items-center"
                download
              >
                {t.navigation.downloadCv}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 