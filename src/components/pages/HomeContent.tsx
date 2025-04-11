'use client';

import { Lang } from '@/app/[lang]/params';
import translations from '@/data/translations.json';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticlesBackground from '@/components/effects/ParticlesBackground';
import TypeWriter from '@/components/effects/TypeWriter';
import AnimatedButton from '@/components/ui/animated-button';
import AnimatedProfile from '@/components/profile/AnimatedProfile';
import AnimatedStatsCard from '@/components/stats/AnimatedStatsCard';
import AnimatedSection from '@/components/layout/AnimatedSection';
import ScrollingText from '@/components/effects/ScrollingText';

interface HomeContentProps {
  params: {
    lang: Lang;
  };
}

export default function HomeContent({ params }: HomeContentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = params.lang;
  const langPrefix = `/${locale}`;
  
  // Get translations directly based on language parameter
  const t = translations[locale];
  
  // Content based on language
  const pageContent = {
    fr: {
      heroTitle: "Moamen Elmasry",
      heroRole: "Project Manager",
      heroSubtitle: ["Transformer des idées ambitieuses en solutions digitales", "Piloter des projets innovants", "Optimiser les processus digitaux", "Garantir un ROI mesurable"],
      heroDescription: "Fort de 9 ans d'expérience en transformation digitale et développement commercial B2B, je recherche activement un poste en CDI ou CDD. Ex-entrepreneur ayant développé une plateforme SaaS (GED, IA, automatisation), j'allie vision stratégique et expertise technique pour générer un fort ROI.",
      jobStatus: "En recherche active d'un poste en CDI ou CDD",
      ctaProjects: "Voir mes réalisations",
      ctaDownload: "Télécharger mon CV",
      ctaContact: "Me contacter",
      profileAlt: "Moamen Elmasry - Project Manager spécialisé en transformation digitale",
      profileBadges: {
        certifications: "Expert Certifié PMP",
        experience: "9 ans d'excellence",
        projects: "20% croissance"
      },
      stats: [
        { value: "80%", label: "Réduction des délais de projets" },
        { value: "200K€", label: "Financements obtenus" },
        { value: "50+", label: "Collaborateurs managés" },
        { value: "20%", label: "Croissance du portefeuille" }
      ],
      approachTitle: "Mon expertise à votre service",
      approachDescription1: "Je convertis des défis complexes en résultats tangibles pour votre entreprise. Grâce à mon expérience éprouvée, j'ai réduit les délais de projets jusqu'à 80% et augmenté significativement le ROI des initiatives stratégiques. Mon leadership mobilisateur et ma maîtrise des méthodologies agiles garantissent des livraisons de qualité, dans les délais impartis.",
      approachDescription2: "Mon expertise technique (SaaS, IA, GED, OCR) combinée à mes compétences en gestion de changement me permettent d'assurer le succès de vos projets stratégiques, de la conception à l'implémentation. J'améliore les performances opérationnelles tout en accompagnant efficacement les équipes vers l'adoption des nouvelles solutions.",
      ctaSectionTitle: "Prêt à collaborer sur vos défis digitaux?",
      ctaSectionDescription: "Je souhaite mettre mon expérience au service de votre entreprise dans le cadre d'un CDI ou CDD. Discutons de vos projets stratégiques et de comment mon expertise peut contribuer à leur réussite.",
      sections: [
        {
          title: "À Propos",
          description: "Découvrez mon parcours, mes compétences et mon expertise en gestion de projets.",
          cta: "En savoir plus",
          link: "/fr/a-propos"
        },
        {
          title: "Réalisations",
          description: "Consultez mes projets clés et leurs résultats quantifiables.",
          cta: "Voir les projets",
          link: "/fr/realisations"
        },
        {
          title: "Contact",
          description: "Échangeons sur vos opportunités en gestion de projets et transformation digitale.",
          cta: "Me contacter",
          link: "/fr/contact"
        }
      ],
      scrollingText: "Résultats"
    },
    en: {
      heroTitle: "Moamen Elmasry",
      heroRole: "Project Manager",
      heroSubtitle: ["Transforming ambitious ideas into digital solutions", "Leading innovative projects", "Optimizing digital processes", "Ensuring measurable ROI"],
      heroDescription: "With 9 years of experience in digital transformation and B2B business development, I'm actively seeking a permanent or fixed-term position. Former entrepreneur who developed a SaaS platform (ECM, AI, automation), I combine strategic vision and technical expertise to generate strong ROI.",
      jobStatus: "Actively seeking a permanent or fixed-term position",
      ctaProjects: "View my projects",
      ctaDownload: "Download my CV",
      ctaContact: "Contact me",
      profileAlt: "Moamen Elmasry - Project Manager specialized in digital transformation",
      profileBadges: {
        certifications: "PMP Certified Expert",
        experience: "9 years of excellence",
        projects: "20% growth"
      },
      stats: [
        { value: "80%", label: "Reduction in project timelines" },
        { value: "200K€", label: "Funding secured" },
        { value: "50+", label: "Team members managed" },
        { value: "20%", label: "Portfolio growth" }
      ],
      approachTitle: "My expertise at your service",
      approachDescription1: "I convert complex challenges into tangible results for your business. Through my proven experience, I've reduced project timelines by up to 80% and significantly increased the ROI of strategic initiatives. My mobilizing leadership and mastery of agile methodologies ensure quality deliveries, on time.",
      approachDescription2: "My technical expertise (SaaS, AI, ECM, OCR) combined with my change management skills enable me to ensure the success of your strategic projects, from design to implementation. I improve operational performance while effectively guiding teams toward adopting new solutions.",
      ctaSectionTitle: "Ready to discuss your next digital project?",
      ctaSectionDescription: "I wish to put my experience at the service of your company through a permanent or fixed-term position. Let's discuss your strategic projects and how my expertise can contribute to their success.",
      sections: [
        {
          title: "About",
          description: "Discover my background, skills, and expertise in project management.",
          cta: "Learn more",
          link: "/en/a-propos"
        },
        {
          title: "Projects",
          description: "Check out my key projects and their quantifiable results.",
          cta: "View projects",
          link: "/en/realisations"
        },
        {
          title: "Contact",
          description: "Let's discuss your opportunities in project management and digital transformation.",
          cta: "Contact me",
          link: "/en/contact"
        }
      ],
      scrollingText: "Results"
    }
  };
  
  // Select content based on current language
  const content = locale === 'en' ? pageContent.en : pageContent.fr;
  
  // Set loaded state after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <main id="content" className="flex flex-col">
      {/* Particles background */}
      <ParticlesBackground />
      
      {/* HERO SECTION (ATTENTION) */}
      <section className="pt-36 pb-20 md:pt-48 md:pb-32 bg-primary-light/80 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary opacity-5 blur-2xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary opacity-5 blur-xl translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 grain-bg"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">
            {/* Main content */}
            <div className="order-2 md:order-1">
              <motion.div 
                className="mb-6"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                custom={0}
                variants={fadeInUp}
              >
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-bold rounded-full animate-pulse">
                  {content.heroRole}
                </span>
              </motion.div>
              
              <motion.h1 
                className="font-unbounded text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-text-primary"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                custom={1}
                variants={fadeInUp}
              >
                <span className="gradient-text">{content.heroTitle}</span>
              </motion.h1>
              
              {/* Statut de recherche d'emploi */}
              <motion.div
                className="mb-4"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                custom={1.5}
                variants={fadeInUp}
              >
                <span className="inline-block px-4 py-1 bg-green-500/20 text-green-700 font-bold rounded-full text-sm">
                  {content.jobStatus}
                </span>
              </motion.div>
              
              <motion.div
                className="font-bricolage text-xl md:text-2xl text-text-primary font-medium mb-6 h-12"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                custom={2}
                variants={fadeInUp}
              >
                <TypeWriter 
                  texts={content.heroSubtitle}
                  className="text-primary"
                />
              </motion.div>
              
              <motion.p 
                className="font-bricolage text-lg text-text-secondary mb-8 max-w-2xl"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                custom={3}
                variants={fadeInUp}
              >
                {content.heroDescription}
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 mb-10"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                custom={4}
                variants={fadeInUp}
              >
                <AnimatedButton 
                  href={`${langPrefix}/realisations`}
                  variant="primary"
                  size="lg"
                  ariaLabel={content.ctaProjects}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  }
                >
                  {content.ctaProjects}
                </AnimatedButton>
                
                <AnimatedButton 
                  href="/cv-moamen-elmasry.pdf"
                  variant="outline"
                  size="lg"
                  isExternal
                  ariaLabel={content.ctaDownload}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  }
                >
                  {content.ctaDownload}
                </AnimatedButton>
              </motion.div>
            </div>
            
            {/* Profile image with enhanced animations */}
            <div className="order-1 md:order-2 flex justify-center">
              <AnimatedProfile 
                src="/images/profile.jpg"
                alt={content.profileAlt}
                badges={content.profileBadges}
                locale={locale}
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>
      
      {/* Scrolling text section */}
      <ScrollingText 
        text={content.scrollingText}
        direction="rtl"
      />
      
      {/* KEY INDICATORS SECTION (INTEREST) */}
      <AnimatedSection 
        className="py-16 bg-white"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <AnimatedStatsCard
                key={index}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      {/* VALUE PROPOSITION SECTION (DESIRE) */}
      <AnimatedSection 
        className="py-16"
        bgClassName="bg-gradient-to-br from-primary-light to-primary-light/70"
        direction="up"
      >
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-8 text-center text-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {content.approachTitle}
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <motion.p 
              className="text-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.approachDescription1}
            </motion.p>
            
            <motion.p 
              className="text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content.approachDescription2}
            </motion.p>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Scrolling text in opposite direction */}
      <ScrollingText 
        text={locale === 'fr' ? "Vente B2B tech, pilotage stratégique, digitalisation des processus et conduite du changement" : "B2B tech sales, strategic management, process digitalization and change management"}
        direction="ltr"
      />
      
      {/* CALL TO ACTION SECTION (ACTION) */}
      <AnimatedSection 
        className="py-16 bg-white"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom text-center">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-8 gradient-text"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {content.ctaSectionTitle}
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.ctaSectionDescription}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedButton 
              href={`${langPrefix}/realisations`}
              variant="primary"
              size="lg"
            >
              {content.ctaProjects}
            </AnimatedButton>
            
            <AnimatedButton 
              href="/cv-moamen-elmasry.pdf"
              variant="outline"
              size="lg"
              isExternal
            >
              {content.ctaDownload}
            </AnimatedButton>
            
            <AnimatedButton 
              href={`${langPrefix}/contact`}
              variant="secondary"
              size="lg"
            >
              {content.ctaContact}
            </AnimatedButton>
          </motion.div>
        </div>
      </AnimatedSection>
      
      {/* SECTIONS GRID - Visual gateway to different sections */}
      <AnimatedSection 
        className="py-16 bg-gray-50"
        direction="up"
        delay={0.2}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.sections.map((section, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                <Link 
                  href={section.link}
                  className="card-hover glassmorphism block p-8 rounded-2xl h-full"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <svg className="w-6 h-6 svg-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        index === 0 ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" :
                        index === 1 ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" :
                        "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      } />
                    </svg>
                  </div>
                  <h3 className="font-unbounded text-xl font-bold mb-2">{section.title}</h3>
                  <p className="text-text-secondary mb-6">
                    {section.description}
                  </p>
                  <div className="text-primary font-medium inline-flex items-center animated-border">
                    {section.cta}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
} 