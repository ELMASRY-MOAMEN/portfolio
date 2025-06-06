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
      context: "Difficultés internes critiques pour former rapidement les équipes aux procédures export EMEA, entraînant une perte de compétitivité opérationnelle et un besoin urgent de solution digitale innovante.",
      role: "Mon rôle de Digital Product Manager : Pilotage produit complet : cadrage fonctionnel détaillé, coordination Agile de l'équipe technique, définition stratégique des cas d'usage IA, management rigoureux des tests utilisateurs auprès de 50 utilisateurs pilotes.",
      results: [
        "Temps nécessaire aux formations réduit de 70%",
        "Adoption immédiate avec satisfaction utilisateur très élevée (95%)",
        "Optimisation des processus internes grâce à l'IA conversationnelle"
      ],
      lessons: "Apprentissages Produit : Importance cruciale de l'expérience utilisateur intuitive pour faciliter l'adoption d'un produit IA complexe. La gestion agile des retours utilisateurs et la vision produit claire sont des leviers clés de réussite.",
      skills: {
        soft: ["Leadership produit", "Innovation stratégique", "Adaptabilité agile", "Écoute utilisateur"],
        hard: ["GPT-4 Fine-tuning", "Azure OpenAI services", "Prompt engineering avancé", "Méthodologie Scrum"]
      }
    },
    en: {
      context: "Critical internal difficulties in rapidly training teams on EMEA export procedures, resulting in a loss of operational competitiveness and an urgent need for an innovative digital solution.",
      role: "My Digital Product Manager role: Complete product management: detailed functional framing, Agile coordination of the technical team, strategic definition of AI use cases, rigorous management of user testing with 50 pilot users.",
      results: [
        "Time required for training reduced by 70%",
        "Immediate adoption with very high user satisfaction (95%)",
        "Optimization of internal processes through conversational AI"
      ],
      lessons: "Product Learnings: Critical importance of intuitive user experience to facilitate the adoption of a complex AI product. Agile management of user feedback and clear product vision are key success levers.",
      skills: {
        soft: ["Product leadership", "Strategic innovation", "Agile adaptability", "User listening"],
        hard: ["GPT-4 Fine-tuning", "Azure OpenAI services", "Advanced prompt engineering", "Scrum methodology"]
      }
    }
  },
  "SAMSUNG": {
    fr: {
      context: "Lancement stratégique d'une nouvelle gamme de TV premium sur un marché français ultra-compétitif, avec des consommateurs exigeants et des défis d'adoption technologique.",
      role: "Mon rôle de Digital Product Manager : Orchestration complète du lancement produit : étude de marché approfondie, définition UX/UI des supports digitaux, pilotage des KPIs d'acquisition et formation présentielle de 200+ vendeurs nationaux.",
      results: [
        "Triple performance commerciale vs objectif initial (+300%)",
        "Taux de conversion digital inédit de 4,8% sur le site constructeur",
        "Retour sur investissement marketing x5 vs campagnes précédentes"
      ],
      lessons: "Apprentissages Produit : La valeur d'une vision produit holistique intégrant expertise marketing et technique. L'importance d'aligner parfaitement l'expérience digitale et physique pour maximiser l'impact commercial.",
      skills: {
        soft: ["Vision stratégique", "Communication multi-niveau", "Persuasion commerciale", "Intelligence de marché"],
        hard: ["Analytics avancés", "A/B testing", "Planification GTM", "Optimisation conversion"]
      }
    },
    en: {
      context: "Strategic launch of a new premium TV range in an ultra-competitive French market, with demanding consumers and technological adoption challenges.",
      role: "My Digital Product Manager role: Complete product launch orchestration: in-depth market research, UX/UI definition of digital supports, management of acquisition KPIs and face-to-face training of 200+ national salespeople.",
      results: [
        "Triple commercial performance vs initial target (+300%)",
        "Unprecedented digital conversion rate of 4.8% on the manufacturer's website",
        "Marketing ROI x5 vs previous campaigns"
      ],
      lessons: "Product Learnings: The value of a holistic product vision integrating marketing and technical expertise. The importance of perfectly aligning digital and physical experiences to maximize commercial impact.",
      skills: {
        soft: ["Strategic vision", "Multi-level communication", "Commercial persuasion", "Market intelligence"],
        hard: ["Advanced analytics", "A/B testing", "GTM planning", "Conversion optimization"]
      }
    }
  },
  "SGS": {
    fr: {
      context: "Organisation internationale avec un besoin urgent de digitaliser ses processus d'inspection technique pour renforcer sa compétitivité face aux nouvelles startups disruptant le marché.",
      role: "Mon rôle de Digital Product Manager : Pilotage complet du projet de transformation : cadrage des besoins utilisateurs, modélisation des nouveaux parcours digitaux, et coordination des développements techniques entre équipes internes et prestataires.",
      results: [
        "Réduction de 40% du temps de traitement des inspections",
        "Économies opérationnelles de 2M€ annuels",
        "Satisfaction utilisateur interne en hausse de 65%"
      ],
      lessons: "Apprentissages Produit : L'importance critique d'une approche centrée utilisateur pour surmonter les résistances au changement. Valeur ajoutée d'un product owner capable de traduire les besoins métier en solutions techniques viables.",
      skills: {
        soft: ["Gestion du changement", "Négociation", "Facilitation", "Empathie utilisateur"],
        hard: ["Product Discovery", "User stories mapping", "Process optimization", "Méthodologie SAFe"]
      }
    },
    en: {
      context: "International organization with an urgent need to digitize its technical inspection processes to strengthen its competitiveness against new startups disrupting the market.",
      role: "My Digital Product Manager role: Complete transformation project management: framing user needs, modeling new digital journeys, and coordinating technical developments between internal teams and service providers.",
      results: [
        "40% reduction in inspection processing time",
        "Operational savings of €2M annually",
        "65% increase in internal user satisfaction"
      ],
      lessons: "Product Learnings: The critical importance of a user-centered approach to overcome resistance to change. Added value of a product owner capable of translating business needs into viable technical solutions.",
      skills: {
        soft: ["Change management", "Negotiation", "Facilitation", "User empathy"],
        hard: ["Product Discovery", "User stories mapping", "Process optimization", "SAFe methodology"]
      }
    }
  },
  "XEROX": {
    fr: {
      context: "Nécessité stratégique d'améliorer la pénétration marché de solutions hybrides (hardware + SaaS) auprès de 200 clients fragmentés dans un secteur concurrentiel.",
      role: "Mon rôle de Product Manager Commercial : Définition et gestion intégrale du cycle produit-vente : analyse des besoins client, roadmap technique, coordination inter-équipes (vente, technique, implémentation), gestion proactive des retours clients pour améliorer les solutions.",
      results: [
        "Augmentation de 45 % de l'efficacité opérationnelle des déploiements",
        "Renforcement significatif de la notoriété produit auprès des décideurs IT",
        "Mise en place d'un process commercial/technique durable"
      ],
      lessons: "Apprentissages Produit & Commercial : L'approche consultative et produit est essentielle à la vente complexe. La synchronisation agile produit/vente permet une adoption rapide et durable par les clients.",
      skills: {
        soft: ["Vente consultative", "Négociation complexe", "Coordination inter-équipes"],
        hard: ["Gestion pipeline Salesforce", "Implémentation GED & Cloud Azure", "Intégration technique hybride (hardware & software)"]
      }
    },
    en: {
      context: "Strategic need to improve market penetration of hybrid solutions (hardware + SaaS) among 200 fragmented clients in a competitive sector.",
      role: "My Commercial Product Manager role: Definition and comprehensive management of the product-sales cycle: customer needs analysis, technical roadmap, inter-team coordination (sales, technical, implementation), proactive management of customer feedback to improve solutions.",
      results: [
        "45% increase in operational efficiency of deployments",
        "Significant strengthening of product awareness among IT decision-makers",
        "Implementation of a sustainable commercial/technical process"
      ],
      lessons: "Product & Commercial Learnings: The consultative and product approach is essential to complex sales. Agile product/sales synchronization enables rapid and sustainable customer adoption.",
      skills: {
        soft: ["Consultative selling", "Complex negotiation", "Inter-team coordination"],
        hard: ["Salesforce pipeline management", "ECM & Azure Cloud implementation", "Hybrid technical integration (hardware & software)"]
      }
    }
  },
  "FRANCIS": {
    fr: {
      context: "Besoin stratégique de dynamiser les ventes B2B via de nouvelles offres digitales dans un marché concurrentiel.",
      role: "Mon rôle de Product & Business Developer : Élaboration stratégique de nouvelles offres digitales adaptées, conception des argumentaires commerciaux, structuration des approches cross-selling, tests marché rapides pour valider le product-market fit.",
      results: [
        "Augmentation notable du taux de conversion grâce à la prospection intensive (150 appels/jour)",
        "Renforcement durable des relations client dans un secteur difficile"
      ],
      lessons: "Apprentissages Produit & Commercial : Importance du test rapide des hypothèses produit sur le terrain commercial pour affiner efficacement l'offre et maximiser les conversions.",
      skills: {
        soft: ["Négociation efficace", "Écoute active", "Orientation client"],
        hard: ["CRM avancé (Salesforce)", "Techniques de prospection intensive", "Approche commerciale sectorielle"]
      }
    },
    en: {
      context: "Strategic need to boost B2B sales through new digital offerings in a competitive market.",
      role: "My Product & Business Developer role: Strategic development of new tailored digital offerings, design of commercial arguments, structuring of cross-selling approaches, rapid market tests to validate product-market fit.",
      results: [
        "Significant increase in conversion rate through intensive prospecting (150 calls/day)",
        "Sustainable strengthening of customer relationships in a challenging sector"
      ],
      lessons: "Product & Commercial Learnings: Importance of rapid testing of product hypotheses in the commercial field to effectively refine the offering and maximize conversions.",
      skills: {
        soft: ["Effective negotiation", "Active listening", "Customer orientation"],
        hard: ["Advanced CRM (Salesforce)", "Intensive prospecting techniques", "Sectoral commercial approach"]
      }
    }
  },
  "DA": {
    fr: {
      context: "Défi d'implanter efficacement des produits industriels chinois sur le marché européen sans base client initiale.",
      role: "Mon rôle de Product & Market Manager : Définition précise du positionnement produit européen, création d'une roadmap commerciale/technique claire, prospection active et gestion agile de l'adaptation produit aux spécificités techniques et culturelles européennes.",
      results: [
        "Premiers contrats européens signés en 6 mois",
        "Croissance de 120 % du CA en 18 mois",
        "Réseau de distributeurs européens établi"
      ],
      lessons: "Apprentissages Produit & International : Une approche structurée et agile est indispensable pour réussir l'adaptation interculturelle d'un produit industriel dans un nouveau marché complexe.",
      skills: {
        soft: ["Adaptabilité interculturelle", "Développement stratégique", "Gestion relations internationales"],
        hard: ["Élaboration roadmap commerciale", "Conformité technique B2B", "Gestion des distributeurs européens"]
      }
    },
    en: {
      context: "Challenge of effectively implementing Chinese industrial products in the European market without an initial customer base.",
      role: "My Product & Market Manager role: Precise definition of European product positioning, creation of a clear commercial/technical roadmap, active prospecting and agile management of product adaptation to European technical and cultural specificities.",
      results: [
        "First European contracts signed within 6 months",
        "120% revenue growth in 18 months",
        "Established European distributor network"
      ],
      lessons: "Product & International Learnings: A structured and agile approach is essential for successful intercultural adaptation of an industrial product in a complex new market.",
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
      heroRole: "Digital Product Manager – Expert IA & Innovation",
      heroSubtitle: ["Développer des produits digitaux à forte valeur ajoutée", "Piloter l'innovation technologique stratégique", "Intégrer l'IA au cœur des modèles business", "Générer un impact opérationnel mesurable"],
      heroDescription: "Découvrez mes expériences où j'ai allié vision produit, agilité méthodologique et leadership collaboratif pour délivrer une valeur opérationnelle mesurable et pérenne.",
      ctaBookMeeting: "Réserver un échange",
      ctaContact: "Me contacter",
      profileAlt: "Moamen Elmasry - Digital Product Manager spécialisé en IA et Innovation",
      profileBadges: {
        certifications: "IBM AI Product Manager Certifié",
        experience: "9+ ans d'expérience",
        projects: "80% de gains d'efficacité"
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
      heroRole: "Digital Product Manager – AI & Innovation Expert",
      heroSubtitle: ["Develop high-value digital products", "Drive strategic technological innovation", "Integrate AI into business models", "Generate measurable operational impact"],
      heroDescription: "Discover my experiences where I've combined product vision, methodological agility, and collaborative leadership to deliver measurable and sustainable operational value.",
      ctaBookMeeting: "Book a meeting",
      ctaContact: "Contact me",
      profileAlt: "Moamen Elmasry - Digital Product Manager specialized in AI and Innovation",
      profileBadges: {
        certifications: "IBM AI Product Manager Certified",
        experience: "9+ years of experience",
        projects: "80% efficiency gains"
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
                title: locale === 'fr' ? "YVEA – SaaS export & IA" : "YVEA – AI Export SaaS",
                img: "/images/YVEA.jpg",
                tags: ["Product Strategy", "AI", "SaaS", "Agile", "AWS", "React"],
                description: locale === 'fr' 
                  ? "Product Manager et fondateur d'une solution SaaS pilotée par l'IA, transformant les processus de certification export avec une réduction de 80% des délais opérationnels et 200K€ de financements obtenus."
                  : "Product Manager and founder of an AI-driven SaaS solution, transforming export certification processes with 80% reduction in operational delays and €200K in funding secured.",
                dominante: locale === 'fr' ? "Stratégie produit & Innovation" : "Product Strategy & Innovation",
                isMainProject: true
              },
              {
                id: "MAY",
                title: locale === 'fr' ? "MAY – IA conversationnelle B2B" : "MAY – B2B Conversational AI",
                img: "/images/MAY.jpg",
                tags: ["Product Management", "GPT-4", "UX", "Azure OpenAI", "RAG"],
                description: locale === 'fr' 
                  ? "Gestion complète d'un produit IA basé sur GPT-4 : cadrage fonctionnel détaillé, coordination Agile et définition de cas d'usage IA, réduisant de 70% les temps de formation export."
                  : "Complete product management of a GPT-4 solution: detailed functional framing, Agile coordination and AI use case definition, reducing export training times by 70%.",
                dominante: locale === 'fr' ? "Product Management & IA" : "Product Management & AI",
                icon: <FaRobot />
              },
              {
                id: "SAMSUNG",
                title: locale === 'fr' ? "Samsung JO2024 – Experience Manager" : "Samsung OG2024 – Experience Manager",
                img: "/images/Samsung.jpg",
                tags: ["UX/CX", "Operations", "Product Testing", "Leadership"],
                description: locale === 'fr' 
                  ? "Product & Experience Manager : optimisation continue du parcours utilisateur, pilotage d'une équipe de 12 personnes pour délivrer une expérience fluide à 17K visiteurs quotidiens."
                  : "Product & Experience Manager: continuous optimization of the user journey, leading a team of 12 people to deliver a seamless experience to 17K daily visitors.",
                dominante: locale === 'fr' ? "Product Experience & Leadership" : "Product Experience & Leadership",
                icon: <FaUsers />
              },
              {
                id: "SGS",
                title: locale === 'fr' ? "SGS – Digitalisation workflow B2B" : "SGS – B2B Workflow Digitization",
                img: "/images/SGS.jpg",
                tags: ["Digital Transformation", "OCR", "Product ROI", "Automation"],
                description: locale === 'fr' 
                  ? "Product Manager : priorisation des besoins business, définition technique des fonctionnalités OCR et automatisation, générant 40% de réduction des délais et +20% de CA sur un portefeuille de 2M€."
                  : "Product Manager: business needs prioritization, technical definition of OCR features and automation, generating 40% reduction in delays and +20% revenue on a €2M portfolio.",
                dominante: locale === 'fr' ? "Product Management & Transformation" : "Product Management & Transformation",
                icon: <FaDatabase />
              },
              {
                id: "XEROX",
                title: locale === 'fr' ? "Xerox – Solutions produit hybrides" : "Xerox – Hybrid Product Solutions",
                img: "/images/XEROX.jpg",
                tags: ["Product-Sales Cycle", "Technical Roadmap", "Customer Feedback"],
                description: locale === 'fr' 
                  ? "Product Manager commercial : définition et gestion globale du cycle produit-vente, roadmap technique et coordination inter-équipes, améliorant de 45% l'efficacité des déploiements."
                  : "Commercial Product Manager: definition and comprehensive management of the product-sales cycle, technical roadmap and inter-team coordination, improving deployment efficiency by 45%.",
                dominante: locale === 'fr' ? "Product Strategy & Commercial" : "Product Strategy & Commercial",
                icon: <FaTools />
              },
              {
                id: "FRANCIS",
                title: locale === 'fr' ? "Francis Lefebvre – Produits B2B digitaux" : "Francis Lefebvre – Digital B2B Products",
                img: "/images/FRANCIS.jpg",
                tags: ["Product Development", "Market Testing", "B2B Strategy"],
                description: locale === 'fr' 
                  ? "Product & Business Developer : développement stratégique de nouvelles offres digitales B2B, conception d'argumentaires commerciaux et tests rapides marché pour valider le product-market fit."
                  : "Product & Business Developer: strategic development of new B2B digital offerings, design of commercial arguments and rapid market tests to validate product-market fit.",
                dominante: locale === 'fr' ? "Product Development & Business" : "Product Development & Business",
                icon: <FaBusinessTime />
              },
              {
                id: "DA",
                title: locale === 'fr' ? "DA Int. – Expansion produit Europe" : "DA Int. – Product Expansion Europe",
                img: "/images/DA.jpg",
                tags: ["Product Strategy", "Market Entry", "International"],
                description: locale === 'fr' 
                  ? "Product Manager stratégique : définition de la stratégie produit pour l'entrée sur le marché européen, pilotage des adaptations locales et coordination des équipes internationales, générant +120% de croissance en 18 mois."
                  : "Strategic Product Manager: definition of product strategy for European market entry, management of local adaptations and coordination of international teams, generating +120% growth in 18 months.",
                dominante: locale === 'fr' ? "Product Strategy & International" : "Product Strategy & International",
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