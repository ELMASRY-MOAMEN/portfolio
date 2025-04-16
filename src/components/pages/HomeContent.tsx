'use client';

import { Lang } from '@/app/[lang]/params';
import translations from '@/data/translations.json';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticlesBackground from '@/components/effects/ParticlesBackground';
import TypeWriter from '@/components/effects/TypeWriter';
import AnimatedButton from '@/components/ui/animated-button';
import AnimatedProfile from '@/components/profile/AnimatedProfile';
import AnimatedStatsCard from '@/components/stats/AnimatedStatsCard';
import AnimatedSection from '@/components/layout/AnimatedSection';
import ScrollingText from '@/components/effects/ScrollingText';
import Image from 'next/image';
import { MdDeveloperMode } from "react-icons/md";
import { FaRobot, FaUsers } from "react-icons/fa";
import ProjectModal, { ProjectDetail } from '@/components/ui/ProjectModal';
import { FaBusinessTime, FaDatabase, FaTools } from 'react-icons/fa';

interface HomeContentProps {
  params: {
    lang: Lang;
  };
}

// Structure pour les détails des projets
const projectDetails: Record<string, {fr: ProjectDetail, en: ProjectDetail}> = {
  "MAY": {
    fr: {
      context: "Face à un manque critique d'expertise interne sur les procédures administratives export vers l'Afrique et le Moyen-Orient (EMEA), les entreprises partenaires avaient besoin d'un outil efficace pour accélérer la formation et le partage des connaissances réglementaires.",
      role: "Créateur et chef de projet, j'ai piloté le développement d'une IA générative (GPT-4 sur Azure). J'ai assuré le cadrage fonctionnel, la gestion technique et les tests utilisateurs approfondis auprès de 50 collaborateurs, en vue de maximiser la pertinence et la facilité d'utilisation de la solution.",
      results: [
        "Réduction de 70 % du temps nécessaire à la formation initiale sur les procédures export",
        "Adoption immédiate par 50 utilisateurs test, avec un taux de satisfaction utilisateur très élevé",
        "Standardisation des connaissances métier et simplification des processus internes"
      ],
      lessons: "Importance critique d'une UX intuitive pour l'adoption d'outils complexes. La combinaison IA / génération contextuelle permet une appropriation rapide des procédures complexes par les équipes opérationnelles.",
      skills: {
        soft: ["Innovation stratégique", "Adaptabilité agile", "Écoute utilisateur"],
        hard: ["GPT-4 Fine-tuning", "Azure OpenAI services", "Prompt engineering avancé"]
      }
    },
    en: {
      context: "Faced with a critical lack of internal expertise on export administrative procedures to Africa and the Middle East (EMEA), partner companies needed an effective tool to accelerate training and sharing of regulatory knowledge.",
      role: "As creator and project manager, I led the development of a generative AI (GPT-4 on Azure). I handled functional framing, technical management, and thorough user testing with 50 employees, to maximize the relevance and ease of use of the solution.",
      results: [
        "70% reduction in the time required for initial training on export procedures",
        "Immediate adoption by 50 test users, with a very high user satisfaction rate",
        "Standardization of business knowledge and simplification of internal processes"
      ],
      lessons: "Critical importance of intuitive UX for the adoption of complex tools. The combination of AI / contextual generation enables rapid appropriation of complex procedures by operational teams.",
      skills: {
        soft: ["Strategic innovation", "Agile adaptability", "User listening"],
        hard: ["GPT-4 Fine-tuning", "Azure OpenAI services", "Advanced prompt engineering"]
      }
    }
  },
  "SAMSUNG": {
    fr: {
      context: "Samsung avait besoin d'assurer une expérience exceptionnelle pour un flux massif de visiteurs internationaux lors des Jeux Olympiques Paris 2024.",
      role: "Responsable opérationnel, j'ai piloté l'organisation et la logistique du pop-up store, coordonné une équipe terrain de 50 collaborateurs, et optimisé chaque aspect du parcours visiteur pour gérer efficacement des pics quotidiens d'affluence.",
      results: [
        "Expérience fluide garantie pour 17 000 visiteurs par jour",
        "Taux de satisfaction client mesuré à 90 %",
        "Exécution sans faille sous contrainte opérationnelle majeure (JO 2024)"
      ],
      lessons: "Importance d'une communication proactive et d'une coordination sans faille en gestion de crise. Valeur de l'adaptabilité et du leadership terrain pour maintenir une haute qualité de service malgré l'affluence.",
      skills: {
        soft: ["Leadership terrain", "Gestion de crise", "Communication efficace"],
        hard: ["Coordination événementielle", "Gestion des flux visiteurs", "Logistique opérationnelle complexe"]
      }
    },
    en: {
      context: "Samsung needed to ensure an exceptional experience for a massive flow of international visitors during the Paris 2024 Olympic Games.",
      role: "As operations manager, I directed the organization and logistics of the pop-up store, coordinated a field team of 50 staff members, and optimized every aspect of the visitor journey to efficiently manage daily peaks in attendance.",
      results: [
        "Smooth experience guaranteed for 17,000 visitors per day",
        "Customer satisfaction rate measured at 90%",
        "Flawless execution under major operational constraints (2024 Olympics)"
      ],
      lessons: "Importance of proactive communication and seamless coordination in crisis management. Value of adaptability and field leadership to maintain high service quality despite high attendance.",
      skills: {
        soft: ["Field leadership", "Crisis management", "Effective communication"],
        hard: ["Event coordination", "Visitor flow management", "Complex operational logistics"]
      }
    }
  },
  "SGS": {
    fr: {
      context: "SGS faisait face à des processus administratifs manuels lourds, impactant négativement les délais de traitement export et la satisfaction client sur un portefeuille stratégique de 2M€.",
      role: "Chef de projet transverse, j'ai piloté l'intégration de workflows OCR complexes, assuré la coordination entre les équipes techniques et métier, tout en conduisant une stratégie commerciale proactive pour maximiser l'adoption client.",
      results: [
        "Réduction des délais opérationnels de 40 %",
        "Hausse du CA du portefeuille stratégique (+20 %)",
        "Taux de satisfaction client porté à 95 % sur 150 comptes majeurs"
      ],
      lessons: "L'importance d'une collaboration étroite entre équipes business et techniques pour la réussite des projets digitaux. Efficacité d'une approche combinant automatisation technique et suivi commercial personnalisé.",
      skills: {
        soft: ["Collaboration transverse", "Pilotage stratégique", "Communication proactive"],
        hard: ["OCR avancé (Tesseract, automatisation)", "Salesforce (gestion pipeline commercial)", "Analyse des besoins clients"]
      }
    },
    en: {
      context: "SGS was facing heavy manual administrative processes, negatively impacting export processing times and customer satisfaction on a strategic portfolio of €2M.",
      role: "As a cross-functional project manager, I led the integration of complex OCR workflows, ensured coordination between technical and business teams, while conducting a proactive commercial strategy to maximize customer adoption.",
      results: [
        "40% reduction in operational processing times",
        "Increase in strategic portfolio revenue (+20%)",
        "Customer satisfaction rate raised to 95% across 150 major accounts"
      ],
      lessons: "The importance of close collaboration between business and technical teams for the success of digital projects. Effectiveness of an approach combining technical automation and personalized commercial follow-up.",
      skills: {
        soft: ["Cross-functional collaboration", "Strategic management", "Proactive communication"],
        hard: ["Advanced OCR (Tesseract, automation)", "Salesforce (commercial pipeline management)", "Client needs analysis"]
      }
    }
  },
  "XEROX": {
    fr: {
      context: "Xerox souhaitait améliorer sa pénétration marché sur un parc multisite fragmenté de 200 clients, avec des offres technologiques combinées hardware/SaaS dans un secteur IT très concurrentiel.",
      role: "Responsable du développement commercial, j'ai mis en place une stratégie commerciale from scratch, géré intégralement 5 cycles de vente complexes, et assuré la coordination avec les équipes techniques pour garantir une implémentation optimale.",
      results: [
        "Augmentation de 45 % de l'efficacité opérationnelle des déploiements",
        "Renforcement significatif de la notoriété de Xerox auprès des décideurs IT",
        "Structuration d'un process commercial et technique durable"
      ],
      lessons: "L'importance d'une approche consultative et orientée solution dans la vente complexe. Nécessité de synchroniser étroitement les équipes commerciales et techniques pour maximiser l'efficacité des déploiements digitaux.",
      skills: {
        soft: ["Vente consultative", "Négociation complexe", "Coordination inter-équipes"],
        hard: ["Gestion pipeline Salesforce", "Implémentation GED & Cloud Azure", "Intégration technique hybride (hardware & software)"]
      }
    },
    en: {
      context: "Xerox wanted to improve its market penetration across a fragmented multi-site park of 200 clients, with combined hardware/SaaS technology offerings in a highly competitive IT sector.",
      role: "As commercial development manager, I implemented a from-scratch commercial strategy, fully managed 5 complex sales cycles, and ensured coordination with technical teams to guarantee optimal implementation.",
      results: [
        "45% increase in operational efficiency of deployments",
        "Significant strengthening of Xerox's reputation among IT decision-makers",
        "Structuring of a sustainable commercial and technical process"
      ],
      lessons: "The importance of a consultative and solution-oriented approach in complex sales. Need to closely synchronize sales and technical teams to maximize the effectiveness of digital deployments.",
      skills: {
        soft: ["Consultative selling", "Complex negotiation", "Inter-team coordination"],
        hard: ["Salesforce pipeline management", "ECM & Azure Cloud implementation", "Hybrid technical integration (hardware & software)"]
      }
    }
  },
  "FRANCIS": {
    fr: {
      context: "Francis Lefebvre cherchait à dynamiser son portefeuille clients B2B et augmenter ses parts de marché sur un segment très concurrentiel et peu actif.",
      role: "Chargé de développement commercial, j'ai mené une prospection intensive (jusqu'à 150 appels/jour), mis en place des stratégies de cross-selling, négocié des solutions sur-mesure et accompagné les clients dans l'adoption de nouvelles offres.",
      results: [
        "Développement significatif du portefeuille clients et augmentation du taux de conversion",
        "Renforcement des liens commerciaux et fidélisation dans un secteur difficile"
      ],
      lessons: "Importance d'une prospection ciblée et de stratégies commerciales personnalisées pour optimiser la conversion client. Valeur d'une écoute active pour répondre précisément aux enjeux métier des clients.",
      skills: {
        soft: ["Négociation efficace", "Écoute active", "Orientation client"],
        hard: ["CRM avancé (Salesforce)", "Techniques de prospection intensive", "Approche commerciale sectorielle"]
      }
    },
    en: {
      context: "Francis Lefebvre was looking to energize its B2B client portfolio and increase market share in a highly competitive and relatively inactive segment.",
      role: "As a commercial development manager, I conducted intensive prospecting (up to 150 calls/day), implemented cross-selling strategies, negotiated tailored solutions, and supported clients in adopting new offerings.",
      results: [
        "Significant development of the client portfolio and increase in conversion rate",
        "Strengthened commercial relationships and loyalty in a challenging sector"
      ],
      lessons: "Importance of targeted prospecting and personalized commercial strategies to optimize customer conversion. Value of active listening to respond precisely to clients' business challenges.",
      skills: {
        soft: ["Effective negotiation", "Active listening", "Customer orientation"],
        hard: ["Advanced CRM (Salesforce)", "Intensive prospecting techniques", "Sectoral commercial approach"]
      }
    }
  },
  "DA": {
    fr: {
      context: "DA Int. accompagnait Technlink, une entreprise chinoise en produits industriels, désireuse de pénétrer le marché européen avec une offre B2B innovante, mais sans base de clientèle locale initiale.",
      role: "Responsable développement marché Europe, j'ai structuré une stratégie de pénétration complète, prospecté activement distributeurs et clients potentiels européens, et assuré l'adaptation technique et commerciale aux normes locales.",
      results: [
        "Obtention des premiers contrats européens en 6 mois",
        "Croissance de 120 % du chiffre d'affaires en 18 mois",
        "Établissement d'un réseau européen de distributeurs qualifiés"
      ],
      lessons: "Crucialité de l'adaptation interculturelle pour réussir un développement international. Importance d'une stratégie commerciale clairement structurée et d'une gestion précise des spécifications techniques locales.",
      skills: {
        soft: ["Adaptabilité interculturelle", "Développement stratégique", "Gestion relations internationales"],
        hard: ["Élaboration roadmap commerciale", "Conformité technique B2B", "Gestion des distributeurs européens"]
      }
    },
    en: {
      context: "DA Int. was supporting Technlink, a Chinese industrial products company, seeking to enter the European market with an innovative B2B offering, but without an initial local customer base.",
      role: "As European market development manager, I structured a comprehensive penetration strategy, actively prospected European distributors and potential customers, and ensured technical and commercial adaptation to local standards.",
      results: [
        "Securing first European contracts within 6 months",
        "120% growth in revenue over 18 months",
        "Establishment of a European network of qualified distributors"
      ],
      lessons: "Crucial importance of intercultural adaptation for successful international development. Importance of a clearly structured commercial strategy and precise management of local technical specifications.",
      skills: {
        soft: ["Intercultural adaptability", "Strategic development", "International relationship management"],
        hard: ["Commercial roadmap development", "B2B technical compliance", "European distributor management"]
      }
    }
  }
};

export default function HomeContent({ params }: HomeContentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState("YVEA");
  const [selectedSkillTab, setSelectedSkillTab] = useState('soft');
  const [selectedDetailProject, setSelectedDetailProject] = useState<string | null>(null);
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
      heroDescription: "Fort de 9 ans d'expérience en transformation digitale et développement commercial B2B, je m'engage dans la réussite de projets à fort enjeu stratégique. Ancien fondateur ayant conçu et développé une plateforme SaaS innovante, j'allie vision stratégique et exécution opérationnelle pour transformer chaque défi en opportunité concrète.",
      jobStatus: "En recherche active d'un poste en CDI ou CDD",
      ctaProjects: "Voir mes projets",
      ctaBookMeeting: "Réserver un échange",
      ctaContact: "Me contacter",
      profileAlt: "Moamen Elmasry - Project Manager spécialisé en transformation digitale",
      profileBadges: {
        certifications: "Expert Certifié Google PMP",
        experience: "9 ans d'expertise",
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
      heroDescription: "With 9 years of experience in digital transformation and B2B business development, I'm committed to the success of high-stakes strategic projects. Former entrepreneur who designed and developed an innovative SaaS platform, I combine strategic vision and operational execution to transform every challenge into a concrete opportunity.",
      jobStatus: "Actively seeking a permanent or fixed-term position",
      ctaProjects: "View my projects",
      ctaBookMeeting: "Book a meeting",
      ctaContact: "Contact me",
      profileAlt: "Moamen Elmasry - Project Manager specialized in digital transformation",
      profileBadges: {
        certifications: "Google PMP Certified Expert",
        experience: "9 years of expertise",
        projects: "60% growth"
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
                  href="https://moamen.fr/fr/#projets:~:text=de%20mon%20parcours.-,Naviguer%20par%20projet,-YVEA%20%E2%80%93%20SaaS%20export"
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
                  href="https://calendly.com/elmasrymoamen/30min"
                  variant="primary"
                  size="lg"
                  target="_blank" 
                  rel="noopener noreferrer"
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
                {locale === 'fr' ? 'Allier leadership humain, vision business et innovation technologique' : 'Combining human leadership, business vision and technological innovation'}
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
                  : "Passionate about the concrete impact of digital, I transform complex challenges into opportunities thanks to a strategic vision and human leadership. With 9 years of experience in demanding B2B environments, I started by developing strong commercial skills before acquiring advanced technical expertise – an experience that led me to orchestrate major digital transformations. My journey has taught me that a project's success relies on the ability to unite teams around a shared vision and to put technology at the service of business."}
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
              
              {locale === 'en' && (
                <motion.p 
                  className="text-lg mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  By founding YVEA, I combined innovation and operational execution to launch a SaaS platform dedicated to export certification, supported by a generative AI (MAY) that redefines training for international procedures. Today, I wish to join an ambitious organization where my skills in business development and digital transformation combine to generate sustainable impact, by aligning strategy, technology and people.
                </motion.p>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedButton 
                  href="https://calendly.com/elmasrymoamen/30min"
                  variant="primary"
                  size="lg"
                  target="_blank" 
                  rel="noopener noreferrer"
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
            // Nouvelle structure enrichie des projets
            const projects = [
              {
                id: "YVEA",
                title: locale === 'fr' ? "YVEA – SaaS export IA" : "YVEA – AI Export SaaS",
                img: "/images/YVEA.jpg",
                tags: ["SaaS", "IA", "Export", "Agile", "AWS", "React"],
                description: locale === 'fr' 
                  ? "Fondateur d'une solution SaaS basée sur l'IA, simplifiant les processus de certification export vers l'Afrique et le Moyen-Orient, réduisant les délais opérationnels de 80 % et générant 200K€ de financements."
                  : "Founder of an AI-based SaaS solution, simplifying export certification processes to Africa and the Middle East, reducing operational delays by 80% and generating €200K in funding.",
                dominante: locale === 'fr' ? "Stratégie produit & Innovation technologique" : "Product Strategy & Technological Innovation",
                isMainProject: true
              },
              {
                id: "MAY",
                title: locale === 'fr' ? "MAY – Formateur export IA" : "MAY – AI Export trainer",
                img: "/images/MAY.jpg",
                tags: ["GPT-4", "Azure", "IA générative", "Formation", "RAG"],
                description: locale === 'fr' 
                  ? "Création et déploiement d'une IA conversationnelle basée sur GPT-4 (Azure), accélérant de 70 % la formation administrative export pour 50 utilisateurs pilotes, améliorant la performance opérationnelle et la gestion des connaissances métier."
                  : "Creation and deployment of a GPT-4-based conversational AI (Azure), accelerating export administrative training by 70% for 50 pilot users, improving operational performance and business knowledge management.",
                dominante: locale === 'fr' ? "Innovation technique & Gestion des connaissances" : "Technical Innovation & Knowledge Management",
                icon: <FaRobot />
              },
              {
                id: "SAMSUNG",
                title: locale === 'fr' ? "Samsung – Pop-up store JO2024" : "Samsung – Pop-up store JO2024",
                img: "/images/Samsung.jpg",
                tags: ["Management", "Retail", "Opérations", "Expérience client"],
                description: locale === 'fr' 
                  ? "Management opérationnel direct d'une équipe de 50 collaborateurs lors des JO Paris 2024, garantissant une expérience fluide à 17 000 visiteurs quotidiens, avec un taux de satisfaction client de 90 %."
                  : "Direct operational management of a team of 50 staff during Paris 2024 Olympics, ensuring a smooth experience for 17,000 daily visitors, with a 90% customer satisfaction rate.",
                dominante: locale === 'fr' ? "Leadership opérationnel & Excellence terrain" : "Operational Leadership & Field Excellence",
                icon: <FaUsers />
              },
              {
                id: "SGS",
                title: locale === 'fr' ? "SGS – Transformation digitale" : "SGS – Digital transformation",
                img: "/images/SGS.jpg",
                tags: ["OCR", "Automatisation", "Digitalisation", "Salesforce"],
                description: locale === 'fr' 
                  ? "Pilotage stratégique et technique d'une transformation digitale (OCR & automatisation) sur un portefeuille B2B de 2M€, réduisant les délais de traitement export de 40 % et accroissant la satisfaction client à 95 % sur 150 comptes clés."
                  : "Strategic and technical management of a digital transformation (OCR & automation) on a €2M B2B portfolio, reducing export processing times by 40% and increasing customer satisfaction to 95% across 150 key accounts.",
                dominante: locale === 'fr' ? "Pilotage stratégique & Transformation digitale" : "Strategic Management & Digital Transformation",
                icon: <FaDatabase />
              },
              {
                id: "XEROX",
                title: locale === 'fr' ? "Xerox – Solutions digitales" : "Xerox – Digital solutions",
                img: "/images/XEROX.jpg",
                tags: ["B2B", "Salesforce", "Digitalisation", "Vente consultative"],
                description: locale === 'fr' 
                  ? "Structuration d'une stratégie commerciale terrain hybride (hardware + SaaS), pilotage complet de 5 cycles de vente B2B complexes sur 200 sites, augmentant l'efficacité opérationnelle de 45 % et renforçant l'image marque auprès des décideurs IT."
                  : "Structuring of a hybrid field commercial strategy (hardware + SaaS), complete management of 5 complex B2B sales cycles across 200 sites, increasing operational efficiency by 45% and strengthening brand image among IT decision-makers.",
                dominante: locale === 'fr' ? "Développement commercial & Gestion de projets" : "Business Development & Project Management",
                icon: <FaTools />
              },
              {
                id: "FRANCIS",
                title: locale === 'fr' ? "Francis Lefebvre – Solutions juridiques" : "Francis Lefebvre – Legal solutions",
                img: "/images/FRANCIS.jpg",
                tags: ["Vente B2B", "Fidélisation client", "Cross-selling"],
                description: locale === 'fr' 
                  ? "Développement commercial d'offres digitales ciblées B2B (PME, DAF, RH), augmentant significativement la conversion client grâce à une approche de prospection intensive (150 appels/jour) et négociation sur-mesure, consolidant ainsi la fidélité client dans un marché concurrentiel."
                  : "Commercial development of targeted B2B digital offers (SMEs, CFOs, HR), significantly increasing customer conversion through an intensive prospecting approach (150 calls/day) and customized negotiation, thus consolidating customer loyalty in a competitive market.",
                dominante: locale === 'fr' ? "Vente stratégique & Relation client" : "Strategic Sales & Customer Relationship",
                icon: <FaUsers />
              },
              {
                id: "DA",
                title: locale === 'fr' ? "DA Int. – Expansion internationale" : "DA Int. – International expansion",
                img: "/images/DA.jpg",
                tags: ["Stratégie B2B", "Interculturel", "Roadmap stratégique"],
                description: locale === 'fr' 
                  ? "Structuration et exécution d'une stratégie d'entrée sur le marché européen pour un acteur industriel chinois, permettant la signature de premiers contrats B2B majeurs et générant une croissance de CA de 120 % en 18 mois grâce à une démarche interculturelle efficace."
                  : "Structuring and execution of a European market entry strategy for a Chinese industrial player, enabling the signing of first major B2B contracts and generating 120% revenue growth in 18 months through an effective intercultural approach.",
                dominante: locale === 'fr' ? "Développement stratégique & Adaptabilité" : "Strategic Development & Adaptability",
                icon: <FaBusinessTime />
              }
            ];

            // Déterminer si un modal doit être affiché
            const shouldShowModal = selectedDetailProject !== null && selectedDetailProject !== "YVEA";
            
            // Obtenir les détails du projet sélectionné
            const currentProjectDetails = selectedDetailProject && projectDetails[selectedDetailProject] 
              ? projectDetails[selectedDetailProject][locale === 'fr' ? 'fr' : 'en'] 
              : null;
              
            // Obtenir le titre du projet sélectionné pour le modal
            const currentProjectTitle = selectedDetailProject 
              ? projects.find(p => p.id === selectedDetailProject)?.title || ""
              : "";

            return (
              <>
                {/* Grille de projets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100/80 h-full flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="aspect-video relative bg-gray-100 overflow-hidden group">
                        {project.img ? (
                          <>
                            <Image
                              src={project.img}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70"></div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        {/* Badge catégorie - Now positioned at bottom left for better visibility */}
                        <div className="absolute bottom-3 right-3 bg-primary/90 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm shadow-md flex items-center gap-1.5">
                          {project.icon}
                          <span>{project.dominante}</span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="font-unbounded font-bold text-xl mb-3 text-gray-900 leading-tight">
                          {project.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs px-2.5 py-1 bg-primary/5 text-primary/90 rounded-full border border-primary/10 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-gray-700 mb-5 flex-grow leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="mt-auto pt-2">
                          {project.isMainProject ? (
                            // Bouton vers la page dédiée pour YVEA
                            <AnimatedButton 
                              href={`${langPrefix}/projets/yvea`}
                              variant="primary"
                              size="md"
                              icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              }
                            >
                              {locale === 'fr' ? 'Explorer le projet' : 'Explore project'}
                            </AnimatedButton>
                          ) : (
                            // Bouton pour ouvrir le modal pour les autres projets
                            <button 
                              onClick={() => setSelectedDetailProject(project.id)}
                              className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-primary/5 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 text-sm font-medium border border-primary/10 hover:border-primary group"
                            >
                              {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                              <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Modal pour les détails du projet */}
                {shouldShowModal && currentProjectDetails && (
                  <ProjectModal 
                    isOpen={shouldShowModal}
                    onClose={() => setSelectedDetailProject(null)}
                    title={currentProjectTitle}
                    detail={currentProjectDetails}
                    locale={locale}
                    projectId={selectedDetailProject}
                  />
                )}
              </>
            );
          })()}
          
          <div className="mt-12 text-center">
            <AnimatedButton 
              href="https://calendly.com/elmasrymoamen/30min"
              variant="primary"
              size="lg"
              target="_blank" 
              rel="noopener noreferrer"
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
              ? 'Discutons d\'un avenir commun' 
              : 'Let\'s discuss a shared future'}
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {locale === 'fr'
              ? "Si vous aussi vous êtes animé par un leadership humain, une vision orientée impact et l'ambition d'innover durablement, alors je serais honoré d'échanger pour explorer ensemble les prochaines étapes."
              : "If you are also driven by human leadership, an impact-oriented vision and the ambition to innovate sustainably, then I would be honored to exchange and explore the next steps together."}
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedButton 
              href="https://calendly.com/elmasrymoamen/30min"
              variant="primary"
              size="lg"
              target="_blank" 
              rel="noopener noreferrer"
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
      </AnimatedSection>
    </main>
  );
} 