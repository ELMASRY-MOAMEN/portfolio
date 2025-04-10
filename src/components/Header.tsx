'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}
      aria-label="En-tête principal"
    >
      <div className="container-custom">
        <nav className="flex justify-between items-center" aria-label="Navigation principale">
          <div className="flex-shrink-0 animate-fade-in">
            <Link href="/" className="font-unbounded text-2xl font-bold text-primary flex items-center" aria-label="Accueil">
              {/* Logo optionnel */}
              {/* <Image src="/images/logo.svg" alt="Logo Portfolio" width={40} height={40} className="mr-2" /> */}
              Portfolio
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex space-x-8 animate-fade-in">
            <Link href="/" className="font-bricolage text-text-primary hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/a-propos" className="font-bricolage text-text-primary hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/projets" className="font-bricolage text-text-primary hover:text-primary transition-colors">
              Projets
            </Link>
            <Link href="/cv" className="font-bricolage text-text-primary hover:text-primary transition-colors">
              CV
            </Link>
            <Link href="/contact" className="font-bricolage text-text-primary hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu} 
              className="text-text-primary focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Menu principal"
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
            className="md:hidden pt-4 pb-3 border-t border-gray-200 animate-fade-in"
            role="navigation"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col space-y-3">
              <Link href="/" className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="/a-propos" className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors">
                À propos
              </Link>
              <Link href="/projets" className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors">
                Projets
              </Link>
              <Link href="/cv" className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors">
                CV
              </Link>
              <Link href="/contact" className="px-2 py-1 font-bricolage text-text-primary hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 