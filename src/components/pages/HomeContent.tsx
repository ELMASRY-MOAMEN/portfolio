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
import Image from 'next/image';

interface HomeContentProps {
  params: {
    lang: Lang;
  };
}

export default function HomeContent({ params }: HomeContentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState("YVEA");
  const [selectedSkillTab, setSelectedSkillTab] = useState('soft');
  const locale = params.lang;
  const langPrefix = `/${locale}`;
  
  // Get translations directly based on language parameter
  const t = translations[locale];
  
  // Content based on language
  const pageContent = {
    fr: {
      heroTitle: "Bienvenue sur mon site web",
      heroRole: "Project Manager & Product Owner en transformation digitale",
      heroSubtitle: ["Transformer des idées ambitieuses en solutions digitales", "Piloter des projets innovants", "Optimiser les processus digitaux", "Garantir un ROI mesurable"],
      heroDescription: "Fort de 9 ans d'expérience en transformation digitale et développement commercial B2B, je m'engage dans la réussite de projets à fort enjeu stratégique. Ancien entrepreneur ayant conçu et développé une plateforme SaaS innovante vendue à une multinationale, j'allie vision stratégique et exécution opérationnelle pour transformer chaque défi en opportunité concrète.",
      jobStatus: "En recherche active d'un poste en CDI ou CDD",
      ctaProjects: "Voir mes projets",
      ctaBookMeeting: "Réserver un échange",
      ctaContact: "Me contacter",
      profileAlt: "Moamen Elmasry - Project Manager spécialisé en transformation digitale",
      profileBadges: {
        certifications: "Expert Certifié Google PMP",
        experience: "9 ans d'excellence",
        projects: "60% croissance"
      },
      stats: [
        { value: "80%", label: "Réduction des délais de projets" },
        { value: "+200K€", label: "Financements obtenus" },
        { value: "50+", label: "Collaborateurs managés" },
        { value: "20+", label: "Pays - Déploiements internationaux" }
      ],
      approachTitle: "Mon expertise à votre service",
      approachDescription1: "J'ai toujours privilégié l'humain et la collaboration comme moteurs de réussite. Ma méthode repose sur une communication transparente, un esprit d'équipe solidement ancré et un leadership bienveillant. En prenant le temps de comprendre les enjeux et la culture de chaque organisation, je facilite l'adhésion et le partage de responsabilités. Ce souci du relationnel me permet de fédérer les équipes, d'anticiper les résistances au changement et de créer un climat propice à l'innovation.",
      approachDescription2: "Sur le terrain, je déploie des méthodologies Agiles (Scrum, Kanban) et des outils techniques éprouvés (CI/CD, Docker, automatisation IA, OCR) pour garantir une exécution solide et mesurable. Qu'il s'agisse de concevoir une architecture SaaS, d'implémenter des workflows OCR complexes ou de piloter des sprints, j'aime être au contact du concret et apporter des solutions tangibles. Cette vision 'hands-on' me permet de cerner rapidement les priorités, d'optimiser les performances opérationnelles et de livrer chaque projet avec rigueur et efficacité.",
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
          title: "Projets",
          description: "Consultez mes projets clés et leurs résultats quantifiables.",
          cta: "Voir les projets",
          link: "/fr/projets"
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
      heroTitle: "Welcome to my website",
      heroRole: "Project Manager & Product Owner in digital transformation",
      heroSubtitle: ["Transforming ambitious ideas into digital solutions", "Leading innovative projects", "Optimizing digital processes", "Ensuring measurable ROI"],
      heroDescription: "With 9 years of experience in digital transformation and B2B business development, I'm committed to the success of high-stakes strategic projects. Former entrepreneur who designed and developed an innovative SaaS platform sold to a multinational, I combine strategic vision and operational execution to transform every challenge into a concrete opportunity.",
      jobStatus: "Actively seeking a permanent or fixed-term position",
      ctaProjects: "View my projects",
      ctaBookMeeting: "Book a meeting",
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
        { value: "20+", label: "Countries - International deployments" }
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
          link: "/en/about"
        },
        {
          title: "Projects",
          description: "Check out my key projects and their quantifiable results.",
          cta: "View projects",
          link: "/en/projects"
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
                className="font-unbounded text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-text-primary"
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
                  href="#projets"
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
                  href={`${langPrefix}/contact`}
                  variant="outline"
                  size="lg"
                  ariaLabel={content.ctaBookMeeting}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  {locale === 'fr' ? 'Réserver un échange' : 'Book a meeting'}
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
        mode="static"
      />
      
      {/* KEY INDICATORS SECTION (INTEREST) */}
      <AnimatedSection 
        className="py-10 bg-white"
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
      
      {/* Scrolling text in opposite direction */}
      <ScrollingText 
        text={locale === 'fr' ? "Vente B2B tech • Pilotage stratégique • Digitalisation des processus • Conduite du changement" : "B2B tech sales • Strategic management • Process digitalization • Change management"}
        direction="ltr"
        mode="carousel"
        speed={0.8}
      />
      
      {/* MINI SECTION: À PROPOS (using AIDA) */}
      <AnimatedSection 
        className="py-16 bg-white"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <motion.span
                className="inline-block px-3 py-1 bg-primary/10 text-primary font-medium rounded-full mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                {locale === 'fr' ? 'Qui suis-je?' : 'Who am I?'}
              </motion.span>
              
              <motion.h2 
                className="text-3xl font-unbounded font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {locale === 'fr' ? 'Allier leadership humain, vision business et innovation technologique' : 'A hybrid profile between business and tech'}
              </motion.h2>
              
              <motion.p 
                className="text-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {locale === 'fr' 
                  ? "Passionné par l'impact concret du digital, je transforme les défis complexes en opportunités grâce à une vision stratégique et à un leadership humain. Fort de 9 ans d'expérience dans des environnements B2B exigeants, j'ai débuté en développant des compétences commerciales solides avant d'acquérir une expertise technique poussée – expérience qui m'a conduit à orchestrer d'importantes transformations digitales. Mon parcours m'a appris que la réussite d'un projet repose sur la capacité à fédérer des équipes autour d'une vision commune et à mettre la technologie au service du business."
                  : "Beyond the numbers, I am driven by the concrete impact of digital solutions. My journey in B2B environments has taught me that true success lies in the ability to unite teams around a shared vision. Today, I wish to put my 9 years of expertise to work for an ambitious organization where innovation and leadership combine to transform challenges into opportunities."}
              </motion.p>
              
              {locale === 'fr' && (
                <motion.p 
                  className="text-lg mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  En fondant YVEA, j'ai combiné innovation et exécution opérationnelle pour lancer une plateforme SaaS dédiée à la certification export, soutenue par une IA générative (MAY) qui redéfinit la formation aux procédures internationales. Aujourd'hui, je souhaite intégrer une organisation ambitieuse où mes compétences en développement commercial et en transformation digitale se conjuguent pour générer un impact durable, en alignant la stratégie, la technologie et l'humain.
                </motion.p>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedButton 
                  href={`${langPrefix}/contact`}
                  variant="outline"
                  size="lg"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  {locale === 'fr' ? 'Réserver un échange' : 'Book a meeting'}
                </AnimatedButton>
              </motion.div>
            </div>
            
            <div className="order-1 md:order-2">
              <motion.div
                className="rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <Image 
                  src="/images/about-preview.jpg" 
                  alt={locale === 'fr' ? "Parcours professionnel" : "Professional journey"} 
                  className="w-full h-auto object-cover"
                  width={600}
                  height={400}
                  priority={false}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* PROJETS SECTION */}
      <AnimatedSection 
        className="py-16 bg-gray-50"
        direction="up"
        withGrain={true}
        data-id="projets"
      >
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'fr' ? 'Mes Projets' : 'My Projects'}
          </motion.h2>
          
          <motion.p 
            className="text-lg mb-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {locale === 'fr' 
              ? "Découvrez comment mes expériences se traduisent en projets concrets. Cette section présente, sous forme de carte interactive, les différentes initiatives majeures de mon parcours."
              : "Discover how my experiences translate into concrete projects. This section presents, in an interactive card format, the major initiatives from my career."}
          </motion.p>
          
          {(() => {
            const projects = [
              {
                id: "YVEA",
                title: "YVEA – SaaS export IA",
                img: "/placeholder.jpg",
                tags: ["SaaS", "IA", "Export"],
                description: locale === 'fr' 
                  ? "Face à la complexité des certifications export vers l'Afrique et le Moyen-Orient, j'ai développé une plateforme SaaS IA fluidifiant les procédures, réduisant de 80 % les délais et générant 200K€ de financements."
                  : "Faced with the complexity of export certifications to Africa and the Middle East, I developed an AI SaaS platform streamlining procedures, reducing delays by 80% and generating €200K in funding."
              },
              {
                id: "MAY",
                title: "MAY – Formateur export IA",
                img: "/placeholder.jpg",
                tags: ["GPT-4", "Azure", "Formation"],
                description: locale === 'fr' 
                  ? "Constatant le manque d'expertise sur l'export EMEA, j'ai lancé MAY, une IA générative (GPT-4) testée par 50 utilisateurs, accélérant l'apprentissage et simplifiant les formalités administratives."
                  : "Noticing the lack of expertise in EMEA exports, I launched MAY, a generative AI (GPT-4) tested by 50 users, accelerating learning and simplifying administrative formalities."
              },
              {
                id: "SAMSUNG",
                title: "Samsung – Événementiel retail",
                img: "/placeholder.jpg",
                tags: ["Événementiel", "Retail", "Coordination"],
                description: locale === 'fr' 
                  ? "Face à l'afflux massif de visiteurs lors des JO 2024, j'ai supervisé un pop-up store Samsung avec 50+ collaborateurs, fluidifiant l'expérience de 17 000 visiteurs/jour dans un environnement à haute contrainte."
                  : "Facing a massive influx of visitors during the 2024 Olympics, I supervised a Samsung pop-up store with 50+ employees, streamlining the experience of 17,000 visitors/day in a high-constraint environment."
              },
              {
                id: "SGS",
                title: "SGS – Transformation OCR",
                img: "/placeholder.jpg",
                tags: ["OCR", "Digitalisation", "Business-Tech"],
                description: locale === 'fr' 
                  ? "Confronté à la lourdeur des process administratifs, j'ai implanté des workflows OCR complexes chez SGS, réduisant de 60 % les délais et générant +20 % de croissance sur un portefeuille de 2M€."
                  : "Faced with cumbersome administrative processes, I implemented complex OCR workflows at SGS, reducing delays by 60% and generating +20% growth on a €2M portfolio."
              },
              {
                id: "XEROX",
                title: "Xerox – Solutions digitales",
                img: "/placeholder.jpg",
                tags: ["B2B", "Digitalisation", "Pilotage"],
                description: locale === 'fr' 
                  ? "Voyant la fragmentation des projets B2B, j'ai coordonné plusieurs déploiements digitaux sur 200 sites, améliorant nettement l'efficacité opérationnelle et la performance globale."
                  : "Seeing the fragmentation of B2B projects, I coordinated multiple digital deployments across 200 sites, significantly improving operational efficiency and overall performance."
              },
              {
                id: "FRANCIS",
                title: "Francis Lefebvre – Solutions juridiques",
                img: "/placeholder.jpg",
                tags: ["Juridique", "Transformation", "Formation"],
                description: locale === 'fr' 
                  ? "Face à la modernisation croissante des directions juridiques, j'ai conduit le déploiement de solutions digitales et formé les équipes, accélérant ainsi la transformation et l'efficience de leurs processus."
                  : "Facing the increasing modernization of legal departments, I led the deployment of digital solutions and trained teams, accelerating the transformation and efficiency of their processes."
              },
              {
                id: "DA",
                title: "DA Int. – Expansion internationale",
                img: "/placeholder.jpg",
                tags: ["Stratégie", "Roadmap", "B2B"],
                description: locale === 'fr' 
                  ? "Confronté au besoin d'ouvrir le marché européen pour Technlink (Chine), j'ai élaboré un business plan B2B et géré les chiffrages techniques, assurant la réussite d'une expansion multiculturelle."
                  : "Facing the need to open the European market for Technlink (China), I developed a B2B business plan and managed technical estimates, ensuring the success of a multicultural expansion."
              }
            ];
            
            // Obtenir le projet sélectionné
            const currentProject = projects.find(p => p.id === selectedProject) || projects[0];
            
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Menu latéral à gauche */}
                <div className="lg:col-span-4">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-medium mb-4 text-primary">
                      {locale === 'fr' ? 'Naviguer par projet' : 'Navigate by project'}
                    </h3>
                    <ul className="space-y-2">
                      {projects.map((project, index) => (
                        <li key={index}>
                          <button 
                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                              selectedProject === project.id 
                                ? 'bg-primary/10 text-primary font-medium' 
                                : 'hover:bg-primary/5 text-gray-700'
                            }`}
                            onClick={() => setSelectedProject(project.id)}
                          >
                            <div className="font-medium">{project.title}</div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Carte du projet sélectionné à droite */}
                <div className="lg:col-span-8">
                  <motion.div
                    key={currentProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full"
                  >
                    <div className="aspect-video relative bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3">
                        {currentProject.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentProject.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6">
                        {currentProject.description}
                      </p>
                      <AnimatedButton 
                        href={`${langPrefix}/projets/${currentProject.id.toLowerCase()}`}
                        variant="primary"
                        size="md"
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        }
                      >
                        {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                      </AnimatedButton>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })()}
          
          <div className="mt-12 text-center">
            <AnimatedButton 
              href={`${langPrefix}/contact`}
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              {locale === 'fr' ? 'Réserver un échange' : 'Book a meeting'}
            </AnimatedButton>
          </div>
        </div>
      </AnimatedSection>
      
      {/* COMPETENCES SECTION */}
      <AnimatedSection 
        className="py-16 bg-white"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'fr' ? 'Mes Compétences' : 'My Skills'}
          </motion.h2>
          
          {/* Tabs Navigation */}
          <div className="max-w-3xl mx-auto mb-10">
            <motion.div 
              className="flex justify-center border-b border-gray-200 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${selectedSkillTab === 'soft' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setSelectedSkillTab('soft')}
              >
                {locale === 'fr' ? 'Soft Skills' : 'Soft Skills'}
              </button>
              <button 
                className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${selectedSkillTab === 'hard' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setSelectedSkillTab('hard')}
              >
                {locale === 'fr' ? 'Hard Skills' : 'Hard Skills'}
              </button>
            </motion.div>
          </div>
          
          {/* Soft Skills Content */}
          {selectedSkillTab === 'soft' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Leadership Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Leadership inspirant' : 'Inspiring Leadership'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Fédération des équipes multiculturelles autour d'une vision commune, favorisant l'innovation et la performance collective."
                    : "Uniting multicultural teams around a shared vision, fostering innovation and collective performance."}
                </p>
              </motion.div>
              
              {/* Communication Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Communication efficace' : 'Effective Communication'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Transmission claire des objectifs, enjeux et feedbacks, facilitant l'adhésion et évitant les malentendus organisationnels."
                    : "Clear transmission of objectives, stakes and feedback, facilitating buy-in and avoiding organizational misunderstandings."}
                </p>
              </motion.div>
              
              {/* Adaptabilité Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Adaptabilité agile' : 'Agile Adaptability'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Capacité à pivoter rapidement face aux imprévus, transformant les contraintes en opportunités d'innovation et d'optimisation."
                    : "Ability to pivot quickly in the face of unforeseen events, transforming constraints into opportunities for innovation and optimization."}
                </p>
              </motion.div>
              
              {/* Gestion de crise Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Gestion de crise' : 'Crisis Management'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Maintien du calme et prise de décision éclairée sous pression, assurant la continuité des opérations même en environnement incertain."
                    : "Maintaining calm and making informed decisions under pressure, ensuring continuity of operations even in uncertain environments."}
                </p>
              </motion.div>
              
              {/* Innovation Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Innovation stratégique' : 'Strategic Innovation'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Identification précoce des tendances émergentes et capacité à réinventer les processus pour maintenir un avantage compétitif durable."
                    : "Early identification of emerging trends and ability to reinvent processes to maintain a sustainable competitive advantage."}
                </p>
              </motion.div>
              
              {/* Négociation Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Négociation & médiation' : 'Negotiation & Mediation'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Recherche d'accords gagnant-gagnant et résolution des conflits d'équipe, favorisant un environnement de travail harmonieux et productif."
                    : "Seeking win-win agreements and resolving team conflicts, promoting a harmonious and productive work environment."}
                </p>
              </motion.div>
            </motion.div>
          )}
          
          {/* Hard Skills Content */}
          {selectedSkillTab === 'hard' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Agile Methodologies Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Méthodologies Agiles' : 'Agile Methodologies'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Maîtrise de Scrum, Kanban et SAFe, permettant d'optimiser la planification et d'accélérer l'exécution des projets jusqu'à 80%."
                    : "Mastery of Scrum, Kanban and SAFe, optimizing planning and accelerating project execution by up to 80%."}
                </p>
              </motion.div>
              
              {/* SaaS & AI Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Développement SaaS & IA' : 'SaaS & AI Development'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Conception et déploiement de plateformes SaaS avec intégration IA (GPT-4, OCR), augmentant l'efficacité des processus de 60%."
                    : "Design and deployment of SaaS platforms with AI integration (GPT-4, OCR), increasing process efficiency by 60%."}
                </p>
              </motion.div>
              
              {/* Cloud Infrastructure Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Infrastructure Cloud' : 'Cloud Infrastructure'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Mise en œuvre d'architectures cloud scalables (AWS, Azure), garantissant une disponibilité élevée et réduisant les coûts d'exploitation."
                    : "Implementation of scalable cloud architectures (AWS, Azure), ensuring high availability and reducing operating costs."}
                </p>
              </motion.div>
              
              {/* DevOps Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'DevOps & CI/CD' : 'DevOps & CI/CD'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Automatisation des pipelines de déploiement (Docker, Kubernetes), accélérant les cycles de livraison de 70% tout en maintenant la qualité."
                    : "Automation of deployment pipelines (Docker, Kubernetes), accelerating delivery cycles by 70% while maintaining quality."}
                </p>
              </motion.div>
              
              {/* Data Analysis Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Analyse de données' : 'Data Analysis'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Génération d'insights opérationnels à partir de données complexes, facilitant la prise de décision stratégique et l'optimisation des KPIs."
                    : "Generating operational insights from complex data, facilitating strategic decision-making and KPI optimization."}
                </p>
              </motion.div>
              
              {/* Project Management Tools Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Outils de gestion de projet' : 'Project Management Tools'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Pilotage efficace via JIRA, Asana, MS Project, garantissant la visibilité, coordination et suivi précis des équipes distribuées."
                    : "Effective management through JIRA, Asana, MS Project, ensuring visibility, coordination and precise tracking of distributed teams."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </AnimatedSection>
      
      {/* CALL TO ACTION SECTION (Updated with warmer tone) */}
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
            {locale === 'fr' 
              ? 'Prenons un café virtuel' 
              : 'Let\'s have a virtual coffee'}
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {locale === 'fr'
              ? "Discutons de vos défis digitaux et explorons ensemble comment transformer vos idées en succès concrets. Prenons un café virtuel pour échanger !"
              : "Let's discuss your digital challenges and explore together how to transform your ideas into concrete success. Let's have a virtual coffee to exchange!"}
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedButton 
              href={`${langPrefix}/contact`}
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            >
              {locale === 'fr' ? 'Me contacter' : 'Contact me'}
            </AnimatedButton>
          </motion.div>
        </div>
      </AnimatedSection>
    </main>
  );
} 