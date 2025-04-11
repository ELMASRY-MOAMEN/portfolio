import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { Lang, langs } from './params';
import translations from '@/data/translations.json';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import LangProvider from '@/components/LangProvider';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = translations[params.lang].meta;
  
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: params.lang === 'fr' ? 'https://moamen.fr/' : 'https://moamen.fr/en/',
      languages: {
        'fr': 'https://moamen.fr/',
        'en': 'https://moamen.fr/en/',
      },
    },
  };
}

export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default function Home({ params }: { params: { lang: Lang } }) {
  const locale = params.lang;
  const langPrefix = `/${locale}`;
  
  return (
    <LangProvider lang={locale}>
      <Header />
      <main id="content" className="flex flex-col">
        {/* HERO SECTION (ATTENTION) */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-28 bg-primary-light relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary opacity-5 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary opacity-5 translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Main content */}
              <div className="order-2 md:order-1">
                <h1 
                  id="hero-heading"
                  className="font-unbounded text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-text-primary"
                  itemProp="headline"
                >
                  Moamen Elmasry – Project Manager & Product Owner
                </h1>
                
                <h2 className="font-bricolage text-2xl md:text-3xl text-text-primary font-medium mb-6">
                  Transformer des idées ambitieuses en solutions digitales concrètes
                </h2>
                
                <p 
                  className="font-bricolage text-lg text-text-secondary mb-8 max-w-2xl"
                  itemProp="description"
                >
                  Fort de 9 ans d'expérience en transformation digitale, j'allie vision stratégique et excellence opérationnelle. 
                  Ex-entrepreneur ayant vendu une plateforme SaaS, je crée des solutions innovantes à fort ROI.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link 
                    href={`${langPrefix}/realisations`} 
                    className="btn-primary"
                    role="button"
                    aria-label="Voir mes réalisations professionnelles"
                  >
                    Voir mes réalisations
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link 
                    href="/cv-moamen-elmasry.pdf" 
                    className="btn-outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="button"
                    aria-label="Télécharger mon CV"
                  >
                    Télécharger mon CV
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Profile image - Using Next.js Image component */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  <div className="absolute inset-0 rounded-full bg-primary/10"></div>
                  <div className="absolute inset-4 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <Image
                      src="/images/profile.jpg"
                      alt="Moamen Elmasry - Expert en Gestion de Projets et Product Ownership"
                      fill
                      priority
                      sizes="(max-width: 768px) 20rem, 24rem"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* KEY INDICATORS SECTION (INTEREST) */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Indicator 1 */}
              <div className="bg-primary-light p-6 rounded-xl text-center">
                <div className="text-4xl font-unbounded font-bold text-primary mb-2">80%</div>
                <div className="text-text-secondary">Réduction des délais sur projets SaaS</div>
              </div>
              
              {/* Indicator 2 */}
              <div className="bg-primary-light p-6 rounded-xl text-center">
                <div className="text-4xl font-unbounded font-bold text-primary mb-2">200K€</div>
                <div className="text-text-secondary">Financements obtenus</div>
              </div>
              
              {/* Indicator 3 */}
              <div className="bg-primary-light p-6 rounded-xl text-center">
                <div className="text-4xl font-unbounded font-bold text-primary mb-2">50+</div>
                <div className="text-text-secondary">Taille de l'équipe pilotée</div>
              </div>
              
              {/* Indicator 4 */}
              <div className="bg-primary-light p-6 rounded-xl text-center">
                <div className="text-4xl font-unbounded font-bold text-primary mb-2">20%</div>
                <div className="text-text-secondary">Déploiement à l'international</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* VALUE PROPOSITION SECTION (DESIRE) */}
        <section className="py-16 bg-primary-light">
          <div className="container-custom">
            <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">Mon approche: Excellence et ROI mesurable</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Je transforme les défis digitaux complexes en opportunités concrètes, générant un retour sur investissement mesurable. 
                Mon approche combine leadership mobilisateur, méthodologies agiles et vision data-driven pour orchestrer efficacement 
                la transformation digitale dans divers environnements.
              </p>
              <p className="text-lg mb-8">
                Spécialisé dans les technologies SaaS, l'IA, la GED et l'OCR, je pilote des projets stratégiques 
                de bout en bout, du cadrage à l'implémentation, en assurant une conduite du changement optimale.
              </p>
            </div>
          </div>
        </section>
        
        {/* CALL TO ACTION SECTION (ACTION) */}
        <section className="py-16 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-unbounded font-bold mb-8">Prêt à collaborer sur vos défis digitaux?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Discutons de vos enjeux et voyons ensemble comment je peux contribuer à votre succès.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`${langPrefix}/realisations`} className="btn-primary">
                Voir mes réalisations
              </Link>
              <Link href="/cv-moamen-elmasry.pdf" className="btn-outline" target="_blank" rel="noopener noreferrer">
                Télécharger mon CV
              </Link>
              <Link href={`${langPrefix}/contact`} className="btn-secondary">
                Me contacter
              </Link>
            </div>
          </div>
        </section>
        
        {/* SECTIONS GRID - Visual gateway to different sections */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href={`${langPrefix}/a-propos`}
                className="card bg-white p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-unbounded text-xl font-bold mb-2">À Propos</h3>
                <p className="text-text-secondary mb-4">
                  Découvrez mon parcours, mes valeurs et ma vision professionnelle.
                </p>
                <div className="text-primary font-medium inline-flex items-center">
                  En savoir plus
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
              
              <Link 
                href={`${langPrefix}/realisations`}
                className="card bg-white p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="font-unbounded text-xl font-bold mb-2">Réalisations</h3>
                <p className="text-text-secondary mb-4">
                  Consultez mes projets clés et leurs résultats concrets.
                </p>
                <div className="text-primary font-medium inline-flex items-center">
                  Voir les projets
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
              
              <Link 
                href={`${langPrefix}/contact`}
                className="card bg-white p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-unbounded text-xl font-bold mb-2">Contact</h3>
                <p className="text-text-secondary mb-4">
                  Discutons de vos besoins en gestion de projets ou product ownership.
                </p>
                <div className="text-primary font-medium inline-flex items-center">
                  Me contacter
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LangProvider>
  );
} 