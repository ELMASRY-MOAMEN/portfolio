'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const Footer = () => {
  const { t, locale } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-text-primary text-white py-12 mt-auto" 
      itemScope 
      itemType="https://schema.org/WPFooter"
      aria-label="Pied de page"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Présentation */}
          <div className="col-span-1 md:col-span-2 animate-fade-up">
            <Link 
              href={t.routes.home} 
              className="font-unbounded text-2xl font-bold text-white inline-block"
            >
              Moamen Elmasry
            </Link>
            <p className="font-bricolage mt-4 text-gray-300 max-w-md">
              {t.footer.slogan}
            </p>
            
            {/* Réseaux sociaux */}
            <div className="mt-6 flex space-x-4" itemScope itemType="https://schema.org/Person">
              <meta itemProp="name" content="Votre Nom" />
              
              <a 
                href="https://www.linkedin.com/in/moamen-elmasry/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors" 
                aria-label="LinkedIn"
                itemProp="sameAs"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              
              <a 
                href="https://github.com/moamen-elmasry" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors" 
                aria-label="GitHub"
                itemProp="sameAs"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              
              <a 
                href="https://twitter.com/moamen_elmasry" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors" 
                aria-label="Twitter"
                itemProp="sameAs"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.097 10.097 0 01-3.127 1.195 4.929 4.929 0 00-8.392 4.492 13.98 13.98 0 01-10.15-5.146 4.929 4.929 0 001.525 6.573 4.88 4.88 0 01-2.23-.616v.06a4.927 4.927 0 003.95 4.83 4.898 4.898 0 01-2.224.084 4.931 4.931 0 004.6 3.42 9.88 9.88 0 01-6.114 2.107c-.398 0-.79-.023-1.175-.068a13.952 13.952 0 007.548 2.208c9.054 0 14.01-7.5 14.01-14.007 0-.213-.005-.426-.015-.637.96-.695 1.795-1.562 2.455-2.55l-.047-.02z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h3 className="font-unbounded text-lg font-semibold mb-4">Navigation</h3>
            <nav aria-label="Navigation du pied de page">
              <ul className="space-y-2 font-bricolage">
                <li>
                  <Link 
                    href={t.routes.about} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={t.routes.skills} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t.nav.skills}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={t.routes.projects} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t.nav.projects}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={t.routes.contact} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Contact */}
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }} itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content="Votre Nom" />
            <h3 className="font-unbounded text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 font-bricolage">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:contact@monportfolio.fr" 
                  className="text-gray-300 hover:text-white transition-colors"
                  itemProp="email"
                >
                  contact@monportfolio.fr
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300" itemProp="telephone">
                  +33 (0)6 00 00 00 00
                </span>
              </li>
              <li className="flex items-start" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">
                  <span itemProp="addressLocality">Paris</span>, 
                  <span itemProp="addressCountry">France</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 font-bricolage text-sm">
            &copy; {currentYear} Moamen Elmasry. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 