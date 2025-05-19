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
      context: "Les formations aux procédures export EMEA étaient chronophages et peu scalables, freinant la montée en compétence des équipes internes et partenaires.",
      role: "Conception, prototypage et déploiement d'un assistant IA privé basé sur GPT-3.5 Turbo (Azure), visant à répondre automatiquement aux questions fréquentes via ingestion de documentation métier.",
      results: [
        "Réduction de 70 % du temps moyen de formation constaté sur les cas testés",
        "Adoption rapide par 50 utilisateurs pilotes avec retour qualitatif très positif",
        "Réponses générées fiables, cohérentes et non hallucinées sur l'ensemble du périmètre documenté"
      ],
      lessons: "L'ingestion sémantique avec un chunking large améliore la robustesse des réponses. L'expérience utilisateur est essentielle, même sur un outil interne. Le prototypage rapide permet d'itérer et tester sans sur-investir trop tôt.",
      skills: {
        soft: ["Conception produit centrée utilisateur", "Test & validation fonctionnelle", "Documentation technique", "Support utilisateur"],
        hard: ["Azure AI Services (OpenAI, Blob Storage, App Service)", "GPT-3.5 Turbo + RAG sémantique", "Prompt engineering & tuning des paramètres (Top-P, temp…)", "Déploiement prototypal (App Service)"]
      }
    },
    en: {
      context: "EMEA export procedure training was time-consuming and poorly scalable, hindering skill development for internal teams and partners.",
      role: "Design, prototyping and deployment of a private AI assistant based on GPT-3.5 Turbo (Azure), aimed at automatically answering frequently asked questions through business documentation ingestion.",
      results: [
        "70% reduction in average training time observed on tested cases",
        "Rapid adoption by 50 pilot users with very positive qualitative feedback",
        "Reliable, consistent, and non-hallucinated generated responses across the entire documented scope"
      ],
      lessons: "Semantic ingestion with large chunking improves response robustness. User experience is essential, even for internal tools. Rapid prototyping allows iteration and testing without over-investing too early.",
      skills: {
        soft: ["User-centered product design", "Functional testing & validation", "Technical documentation", "User support"],
        hard: ["Azure AI Services (OpenAI, Blob Storage, App Service)", "GPT-3.5 Turbo + semantic RAG", "Prompt engineering & parameter tuning (Top-P, temp...)", "Prototype deployment (App Service)"]
      }
    }
  },
  "SAMSUNG": {
    fr: {
      context: "Nécessité d'offrir une expérience utilisateur irréprochable face à l'afflux exceptionnel lors des JO2024.",
      role: "Mon rôle (gestion produit/terrain) : Responsable opérationnel de la « roadmap » visiteur : analyse et optimisation des parcours utilisateurs, coordination terrain des équipes, amélioration continue basée sur des retours utilisateurs quotidiens.",
      results: [
        "Fluidité totale du parcours pour 17K visiteurs/jour",
        "Taux de satisfaction client mesuré à 90 %",
        "Zéro incident majeur malgré un contexte opérationnel complexe"
      ],
      lessons: "Apprentissages Produit & Opérations : L'approche « test and learn » et la gestion proactive des retours terrain ont été essentielles à l'expérience produit réussie. Importance du leadership agile pour gérer efficacement les imprévus opérationnels.",
      skills: {
        soft: ["Vision stratégique", "Communication multi-niveau", "Persuasion commerciale", "Intelligence de marché"],
        hard: ["Analytics avancés", "A/B testing", "Planification GTM", "Optimisation conversion"]
      }
    },
    en: {
      context: "Need to provide an impeccable user experience in the face of exceptional attendance during the 2024 Olympics.",
      role: "My role (product/field management): Operational manager of the visitor 'roadmap': analysis and optimization of user journeys, field coordination of teams, continuous improvement based on daily user feedback.",
      results: [
        "Total fluidity of the journey for 17K visitors/day",
        "Customer satisfaction rate measured at 90%",
        "Zero major incidents despite a complex operational context"
      ],
      lessons: "Product & Operations Learnings: The 'test and learn' approach and proactive management of field feedback were essential to the successful product experience. Importance of agile leadership to effectively manage operational contingencies.",
      skills: {
        soft: ["Strategic vision", "Multi-level communication", "Commercial persuasion", "Market intelligence"],
        hard: ["Advanced analytics", "A/B testing", "GTM planning", "Conversion optimization"]
      }
    }
  },
  "SGS": {
    fr: {
      context: "Processus administratifs manuels et inefficaces affectant négativement les performances commerciales et la satisfaction client.",
      role: "Mon rôle de Product Manager : Pilotage complet produit : priorisation des besoins métier, définition technique des fonctionnalités OCR et automatisation, collaboration étroite avec équipes techniques/agiles et équipes commerciales.",
      results: [
        "Réduction de 40 % des délais opérationnels export",
        "Augmentation du CA stratégique de 20 % sur portefeuille B2B (2M€)",
        "Satisfaction client portée à 95 % sur 150 comptes majeurs"
      ],
      lessons: "Apprentissages Produit : La collaboration étroite entre équipes commerciales et techniques est fondamentale pour garantir la pertinence du produit digital et son succès auprès des utilisateurs finaux.",
      skills: {
        soft: ["Gestion du changement", "Négociation", "Facilitation", "Empathie utilisateur"],
        hard: ["Product Discovery", "User stories mapping", "Process optimization", "Méthodologie SAFe"]
      }
    },
    en: {
      context: "Manual and inefficient administrative processes negatively affecting commercial performance and customer satisfaction.",
      role: "My Product Manager role: Complete product management: business needs prioritization, technical definition of OCR features and automation, close collaboration with technical/agile teams and commercial teams.",
      results: [
        "40% reduction in export operational delays",
        "20% increase in strategic revenue on B2B portfolio (€2M)",
        "Customer satisfaction raised to 95% on 150 major accounts"
      ],
      lessons: "Product Learnings: Close collaboration between commercial and technical teams is fundamental to ensuring the relevance of the digital product and its success with end users.",
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
  const [selectedSkillTab, setSelectedSkillTab] = useState('hard');
  const [selectedDetailProject, setSelectedDetailProject] = useState<string | null>(null);
  const [selectedProjectTab, setSelectedProjectTab] = useState('tech'); // Nouvel état pour les onglets de projet
  const locale = params.lang;
  const langPrefix = `/${locale}`;
  
  // Get translations directly based on language parameter
  const t = translations[locale];
  
  // Content based on language
  const pageContent = {
    fr: {
      heroTitle: "Ingénieur IA en alternance",
      heroRole: "Formation Bac+5 IA | Spécialisation ML/DL & NLP | Background Product",
      heroSubtitle: [
        "Développement ML/DL avec Python, PyTorch et scikit-learn",
        "Implémentation de solutions NLP et Computer Vision",
        "Déploiement de modèles IA en production (MLOps)",
        "Vision produit & technique : 9 ans d'expérience"
      ],
      heroDescription: "Passionné par l'IA appliquée après 9 ans en tech et produit B2B, dont 3 ans comme fondateur d'un SaaS IA (API GPT-4, OCR, Scoring IA). Je développe des projets concrets mêlant ML/DL, RAG et APIs. Disponible en alternance 4j/1j avec aide financière (6000€).",
      ctaBookMeeting: "Réserver un échange",
      ctaContact: "Me contacter",
      ctaDownloadCV: "Télécharger mon CV",
      profileAlt: "Moamen Elmasry - En reconversion IA Engineer avec expérience en Product Management",
      profileBadges: {
        certifications: "En formation AI Engineer Bac+5",
        experience: "9 ans d'expérience produit",
        projects: "Aide alternance 6000€"
      },
      approachTitle: "De Product Manager à Ingénieur IA : une transition stratégique",
      approachDescription1: "J'ai toujours privilégié l'humain et la collaboration comme moteurs de réussite. Ma méthode repose sur une communication transparente, un esprit d'équipe solidement ancré et un leadership bienveillant. En prenant le temps de comprendre les enjeux et la culture de chaque organisation, je facilite l'adhésion et le partage de responsabilités. Ce souci du relationnel me permet de fédérer les équipes, d'anticiper les résistances au changement et de créer un climat propice à l'innovation.",
      approachDescription2: "Sur le terrain, j'ai développé une passion pour l'aspect technique des solutions IA et automatisation. C'est pourquoi je me forme désormais aux technologies Python, LangChain, RAG et MistralAI pour apporter à vos équipes une double compétence unique: vision produit/business et expertise technique IA.",
      ctaSectionTitle: "Recruter un alternant Ingénieur IA dès maintenant",
      ctaSectionDescription: "J'apporte 9 ans d'expérience produit & marché à votre équipe IA, avec une formation technique de pointe et un rythme d'alternance optimisé (4j/1j). L'aide à l'apprentissage de 6000€ réduit significativement votre investissement.",
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
          description: "Échangeons sur vos opportunités en IA et transformation digitale.",
          cta: "Me contacter",
          link: "/fr/contact"
        }
      ],
      scrollingText: "Résultats"
    },
    en: {
      heroTitle: "AI Engineer in Training",
      heroRole: "Master's in AI | ML/DL & NLP Specialization | Product Background",
      heroSubtitle: [
        "ML/DL Development with Python, PyTorch and scikit-learn",
        "NLP and Computer Vision Implementation",
        "AI Models Deployment in Production (MLOps)",
        "Product & Technical Vision: 9 years of experience"
      ],
      heroDescription: "Training as an AI Engineer to combine technical expertise and product vision. Currently actively developing ML/DL projects, focusing on NLP and Computer Vision. Optimized apprenticeship schedule (4d company/1d training) and financial aid (€6000).",
      ctaBookMeeting: "Book a meeting",
      ctaContact: "Contact me",
      ctaDownloadCV: "Download my CV",
      profileAlt: "Moamen Elmasry - Transitioning to AI Engineer with Product Management experience",
      profileBadges: {
        certifications: "AI Engineer Master's program",
        experience: "9 years of product experience",
        projects: "Apprenticeship aid €6000"
      },
      approachTitle: "From Product Manager to AI Engineer: a strategic transition",
      approachDescription1: "I've always prioritized human connection and collaboration as drivers of success. My method is based on transparent communication, a solidly anchored team spirit, and caring leadership. By taking the time to understand the challenges and culture of each organization, I facilitate buy-in and shared responsibility. This focus on relationships allows me to unite teams, anticipate resistance to change, and create an environment conducive to innovation.",
      approachDescription2: "In the field, I developed a passion for the technical aspect of AI solutions and automation. That's why I'm now training in Python, LangChain, RAG, and MistralAI technologies to bring your teams a unique dual competency: product/business vision and AI technical expertise.",
      ctaSectionTitle: "Hire an AI Engineer apprentice now",
      ctaSectionDescription: "I bring 9 years of product & market experience to your AI team, with cutting-edge technical training and an optimized apprenticeship schedule (4d/1d). The €6,000 apprenticeship aid significantly reduces your investment.",
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
          description: "Let's discuss your opportunities in AI and digital transformation.",
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
      
      {/* Indicateur de disponibilité immédiate */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div 
          className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="text-white">
            <p className="font-medium text-white">
              {locale === 'fr' ? 'Disponible immédiatement' : 'Available immediately'}
            </p>
            <p className="text-sm opacity-90 text-white">
              {locale === 'fr' ? 'Pour une alternance en IA Engineering' : 'For an AI Engineering apprenticeship'}
            </p>
          </div>
          <a 
            href="https://calendly.com/elmasrymoamen/30min" 
            className="ml-2 bg-white text-primary px-3 py-1 rounded text-sm font-medium hover:bg-opacity-90 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {locale === 'fr' ? 'Échanger' : 'Let\'s talk'}
          </a>
        </motion.div>
      </div>
      
      {/* HERO SECTION (ATTENTION) */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-32 bg-primary-light/80 relative overflow-hidden">
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
                
                <AnimatedButton 
                  href="/cv/CV_Moamen_Elmasry_Ingenieur_IA.pdf"
                  variant="outline"
                  size="lg"
                  target="_blank" 
                  rel="noopener noreferrer"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                >
                  {content.ctaDownloadCV}
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
      
      {/* SECTION: Ma reconversion vers l'IA */}
      <AnimatedSection 
        className="py-24 bg-primary-light/80"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'fr' ? 'Ma spécialisation vers l\'IA' : 'My path to AI Engineering'}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg mb-4">
                {locale === 'fr' 
                  ? "En tant que fondateur et Product Owner d'un SaaS combinant GPT-4, OCR et scoring IA, j'ai conçu une solution visant à automatiser les procédures export pour les équipes terrain. Ce projet, validé par une multinationale, a cristallisé mon intérêt pour les technologies IA."
                  : "As the founder and Product Owner of a SaaS combining GPT-4, OCR, and AI scoring, I designed a solution to automate export procedures for field teams. This project, validated by a multinational company, crystallized my interest in AI technologies."}
              </p>
              
              <p className="text-lg mb-4">
                {locale === 'fr' 
                  ? "J'y ai découvert une appétence concrète pour l'implémentation : intégration d'APIs, structuration de prototypes, prompt engineering. Aujourd'hui, je poursuis une spécialisation technique à travers une formation d'ingénieur IA pour compléter ma vision produit et contribuer de façon opérationnelle à des projets ML/NLP."
                  : "I discovered a concrete appetite for implementation: API integration, prototype structuring, prompt engineering. Today, I'm pursuing a technical specialization through AI engineering training to complement my product vision and contribute operationally to ML/NLP projects."}
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary">
                {locale === 'fr' ? 'Ce que j\'apporte :' : 'What I bring to your AI team'}
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-xl mr-2">🧩</span>
                  <span>{locale === 'fr' 
                    ? "Une expérience produit solide, orientée IA et automatisation (GPT-4, OCR, scoring)"
                    : "Solid product experience, focused on AI and automation (GPT-4, OCR, scoring)"}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2">💡</span>
                  <span>{locale === 'fr' 
                    ? "Une culture technique active : APIs, prototypage rapide, compréhension des stacks IA"
                    : "Active technical culture: APIs, rapid prototyping, understanding of AI stacks"}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2">🤝</span>
                  <span>{locale === 'fr' 
                    ? "Une double compétence business-technique, précieuse pour les projets IA appliqués"
                    : "A dual business-technical competency, valuable for applied AI projects"}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2">🎯</span>
                  <span>{locale === 'fr' 
                    ? "Une vraie rigueur d'apprentissage et une motivation à contribuer dès le premier mois"
                    : "Real learning rigor and motivation to contribute from the first month"}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* SECTION: Mon rythme d'alternance */}
      <AnimatedSection 
        className="py-24 bg-gradient-to-r from-primary/5 to-white"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'fr' ? 'Mon rythme d\'alternance' : 'My apprenticeship schedule'}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">4 jours</h3>
              <p className="text-gray-600">
                {locale === 'fr' ? 'En entreprise (lundi à jeudi)' : 'In company (Monday to Thursday)'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">1 jour</h3>
              <p className="text-gray-600">
                {locale === 'fr' ? 'En formation (vendredi)' : 'In training (Friday)'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">6000€</h3>
              <p className="text-gray-600">
                {locale === 'fr' ? 'Aide à l\'apprentissage' : 'Apprenticeship aid'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-primary">12 mois</h3>
              <p className="text-gray-600">
                {locale === 'fr' ? 'Durée de la formation' : 'Training duration'}
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* MINI SECTION: À PROPOS (using AIDA) */}
      <AnimatedSection 
        className="py-24 bg-white"
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
                className="text-3xl font-unbounded font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {locale === 'fr' ? 'Fusion de l\'expertise produit et des compétences d\'ingénierie IA' : 'Merging Product Expertise with AI Engineering Skills'}
              </motion.h2>
              
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800 flex items-center">
                      <span className="text-xl mr-2">🧠</span>
                      {locale === 'fr' ? 'Formation Bac+5 en ingénierie IA' : 'AI Engineering Master\'s Program'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "Python, RAG, LangChain, MLOps, BentoML" 
                        : "Python, RAG, LangChain, MLOps, BentoML"}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800 flex items-center">
                      <span className="text-xl mr-2">🔁</span>
                      {locale === 'fr' ? 'Double compétence produit-tech' : 'Dual Product-Tech Skills'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "9 ans d'expérience + compétences IA opérationnelles" 
                        : "9 years of experience + operational AI skills"}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800 flex items-center">
                      <span className="text-xl mr-2">📆</span>
                      {locale === 'fr' ? 'Rythme optimal' : 'Optimal Schedule'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "4 jours entreprise / 1 jour école + aide de 6000€" 
                        : "4 days company / 1 day school + €6000 aid"}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800 flex items-center">
                      <span className="text-xl mr-2">⚡</span>
                      {locale === 'fr' ? 'Disponibilité immédiate' : 'Immediate Availability'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "Opérationnel dès le premier mois" 
                        : "Operational from the first month"}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="max-w-prose space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-lg text-gray-700">
                  {locale === 'fr' 
                    ? "En tant que fondateur et Product Owner, j'ai appris à transformer des besoins métier complexes en solutions concrètes et scalables. Cette expérience m'a forgé une méthode : agilité produit, prototypage rapide, écoute utilisateur, et pilotage par la donnée."
                    : "As a founder and Product Owner, I've learned to transform complex business needs into concrete, scalable solutions. This experience has forged my method: product agility, rapid prototyping, user listening, and data-driven management."}
                </p>
                
                <p className="text-lg text-gray-700">
                  {locale === 'fr' 
                    ? "Aujourd'hui, je me spécialise en ingénierie IA pour allier rigueur technique et vision produit. Mon objectif : concevoir des systèmes IA utiles, compréhensibles et responsables, avec un impact mesurable sur les utilisateurs."
                    : "Today, I'm specializing in AI engineering to combine technical rigor and product vision. My goal: designing useful, understandable, and responsible AI systems with measurable impact on users."}
                </p>
              </motion.div>
              
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
        className="py-24 bg-gray-50"
        direction="up"
        withGrain={true}
        data-section-id="projets"
      >
        <div id="projets" className="container-custom">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'fr' ? 'Mes Projets' : 'My Projects'}
          </motion.h2>
          
          <motion.p 
            className="text-lg mb-16 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {locale === 'fr' 
              ? "Une sélection de projets illustrant à la fois mes compétences techniques en IA et mes expériences produit sur des missions à fort impact."
              : "A curated selection of projects highlighting both my technical skills in AI and my product leadership across high-impact missions."}
          </motion.p>
          
          {/* Tabs Navigation */}
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div 
              className="flex justify-center border-b border-gray-200 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors flex items-center gap-2 ${selectedProjectTab === 'tech' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setSelectedProjectTab('tech')}
              >
                <span>🧠</span>
                {locale === 'fr' ? 'Projets Techs' : 'Tech Projects'}
              </button>
              <button 
                className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors flex items-center gap-2 ${selectedProjectTab === 'business' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setSelectedProjectTab('business')}
              >
                <span>💼</span>
                {locale === 'fr' ? 'Projets Business' : 'Business Projects'}
              </button>
            </motion.div>
          </div>
          
          {(() => {
            // Nouvelle structure enrichie des projets
            const projects = [
              {
                id: "YVEA",
                title: locale === 'fr' ? "YVEA – Plateforme OCR & IA pour la certification export" : "YVEA – OCR & AI Platform for Export Certification",
                img: "/images/YVEA.jpg",
                tags: ["NestJS", "React", "OCR intelligent", "Azure OpenAI", "Docker", "MinIO", "PostgreSQL"],
                description: locale === 'fr' 
                  ? "Refonte complète d'une plateforme SaaS modulaire en autonomie complète, guidée par IA générative (ChatGPT, Claude). Architecture front/back réassemblée, ajout d'un moteur OCR (Tesseract) et d'un assistant IA contextuel via Azure OpenAI."
                  : "Complete redesign of a modular SaaS platform with full autonomy, guided by generative AI (ChatGPT, Claude). Reassembled front/back architecture, addition of an OCR engine (Tesseract) and a contextual AI assistant via Azure OpenAI.",
                dominante: locale === 'fr' ? "Fullstack, Cloud & IA augmentée" : "Fullstack, Cloud & Augmented AI",
                isMainProject: true,
                type: "tech"
              },
              {
                id: "MAY",
                title: locale === 'fr' ? "MAY – Assistant IA B2B" : "MAY – B2B AI Assistant",
                img: "/images/MAY.jpg",
                tags: ["GPT-3.5 Turbo", "RAG sémantique", "Azure Foundry", "Prototypage IA"],
                description: locale === 'fr' 
                  ? "Création d'un assistant IA basé sur GPT-3.5 Turbo (Azure), déployé avec RAG sémantique. Réduction de 70 % des temps de formation export. Adopté par 50 utilisateurs pilotes."
                  : "Creation of a GPT-3.5 Turbo (Azure) based AI assistant, deployed with semantic RAG. 70% reduction in export training time. Adopted by 50 pilot users.",
                dominante: locale === 'fr' ? "IA Générative & Prototypage" : "Generative AI & Prototyping",
                icon: <FaRobot />,
                type: "tech"
              },
              {
                id: "SAMSUNG",
                title: locale === 'fr' ? "Samsung JO2024 – Management de l'expérience visiteur" : "Samsung OG2024 – Visitor Experience Management",
                img: "/images/Samsung.jpg",
                tags: ["UX/CX", "Operations", "Product Testing", "Leadership"],
                description: locale === 'fr' 
                  ? "Responsable de l'expérience utilisateur terrain pendant les JO, avec amélioration continue du parcours visiteur (17K visiteurs/jour) et pilotage d'indicateurs de satisfaction (>90 %)."
                  : "Responsible for on-site user experience during the Olympics, with continuous improvement of the visitor journey (17K visitors/day) and management of satisfaction indicators (>90%).",
                dominante: locale === 'fr' ? "Product Experience & Leadership" : "Product Experience & Leadership",
                icon: <FaUsers />,
                type: "business"
              },
              {
                id: "SGS",
                title: locale === 'fr' ? "SGS – Digitalisation workflow B2B" : "SGS – B2B Workflow Digitization",
                img: "/images/SGS.jpg",
                tags: ["Digital Transformation", "OCR", "Product ROI", "Automation"],
                description: locale === 'fr' 
                  ? "Pilotage produit d'une automatisation OCR (avec équipes techniques), réduisant les délais opérationnels de 40 % et générant +20 % de CA sur un portefeuille stratégique de 2M€."
                  : "Product management of OCR automation (with technical teams), reducing operational delays by 40% and generating +20% revenue on a strategic €2M portfolio.",
                dominante: locale === 'fr' ? "Product Management & Transformation" : "Product Management & Transformation",
                icon: <FaDatabase />,
                type: "business"
              },
              {
                id: "XEROX",
                title: locale === 'fr' ? "Xerox – Déploiement solutions hybrides" : "Xerox – Hybrid Solutions Deployment",
                img: "/images/XEROX.jpg",
                tags: ["Product-Sales Cycle", "Technical Roadmap", "Customer Feedback"],
                description: locale === 'fr' 
                  ? "Structuration produit et coordination commerciale d'offres hybrides (hardware + SaaS) auprès de 200 clients multisites, avec +45 % d'efficacité de déploiement."
                  : "Product structuring and commercial coordination of hybrid offerings (hardware + SaaS) for 200 multi-site clients, with +45% deployment efficiency.",
                dominante: locale === 'fr' ? "Product Strategy & Commercial" : "Product Strategy & Commercial",
                icon: <FaTools />,
                type: "business"
              },
              {
                id: "FRANCIS",
                title: locale === 'fr' ? "Francis Lefebvre – Digitalisation des ventes B2B" : "Francis Lefebvre – B2B Sales Digitalization",
                img: "/images/FRANCIS.jpg",
                tags: ["Product Development", "Market Testing", "B2B Strategy"],
                description: locale === 'fr' 
                  ? "Création d'offres digitales B2B adaptées au marché, avec itération rapide via retours commerciaux, entraînant une forte amélioration de la conversion client."
                  : "Creation of market-adapted B2B digital offerings, with rapid iteration through commercial feedback, leading to significant improvement in customer conversion.",
                dominante: locale === 'fr' ? "Product Development & Business" : "Product Development & Business",
                icon: <FaBusinessTime />,
                type: "business"
              },
              {
                id: "DA",
                title: locale === 'fr' ? "DA Int. – Expansion produit Europe" : "DA Int. – Product Expansion Europe",
                img: "/images/DA.jpg",
                tags: ["Product Strategy", "Market Entry", "International"],
                description: locale === 'fr' 
                  ? "Pilotage de l'entrée produit sur le marché européen (positionnement, adaptation offre, go-to-market), générant +120 % de CA en 18 mois."
                  : "Management of product entry into the European market (positioning, offer adaptation, go-to-market), generating +120% revenue in 18 months.",
                dominante: locale === 'fr' ? "Product Strategy & International" : "Product Strategy & International",
                icon: <FaBusinessTime />,
                type: "business"
              }
            ];

            // Filtrer les projets par type
            const techProjects = projects.filter(project => project.type === "tech");
            const businessProjects = projects.filter(project => project.type === "business");

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

            // Fonction pour rendre une grille de projets
            const renderProjectsGrid = (projectsList: typeof projects) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsList.map((project) => (
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
                    
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="font-unbounded font-bold text-xl mb-4 text-gray-900 leading-tight">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="text-xs px-2.5 py-1 bg-primary/5 text-primary/90 rounded-full border border-primary/10 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="mt-auto pt-4">
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
            );

            return (
              <>
                {/* Contenu basé sur l'onglet sélectionné */}
                <motion.div
                  key={selectedProjectTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {selectedProjectTab === 'tech' && (
                    <div>
                      <motion.p 
                        className="text-lg mb-10 text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {locale === 'fr' 
                          ? "Les projets où j'ai directement contribué à la conception ou au prototypage technique de solutions IA. Stack : GPT-4, LangChain, OCR, REST API…"
                          : "Projects where I directly contributed to the technical design or prototyping of AI solutions. Stack: GPT-4, LangChain, OCR, REST API…"}
                      </motion.p>
                      
                      {renderProjectsGrid(techProjects)}
                    </div>
                  )}
                  
                  {selectedProjectTab === 'business' && (
                    <div>
                      <motion.p 
                        className="text-lg mb-10 text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {locale === 'fr' 
                          ? "Des missions à fort enjeu produit, automatisation ou go-to-market. J'y ai dirigé des projets complexes, avec une forte composante UX ou data-driven."
                          : "High-impact product, automation, and go-to-market missions. I led complex initiatives with strong UX or data-driven focus."}
                      </motion.p>
                      
                      {renderProjectsGrid(businessProjects)}
                    </div>
                  )}
                </motion.div>
                
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
          
          <div className="mt-24 text-center">
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
        className="py-24 bg-white"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom">
          <motion.h2 
            className="text-3xl font-unbounded font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'fr' ? 'Mes Compétences' : 'My Skills'}
          </motion.h2>
          
          {/* Tabs Navigation */}
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div 
              className="flex justify-center border-b border-gray-200 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${selectedSkillTab === 'hard' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setSelectedSkillTab('hard')}
              >
                {locale === 'fr' ? 'Hard Skills' : 'Hard Skills'}
              </button>
              <button 
                className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${selectedSkillTab === 'soft' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setSelectedSkillTab('soft')}
              >
                {locale === 'fr' ? 'Soft Skills' : 'Soft Skills'}
              </button>
              <button 
                className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors ${selectedSkillTab === 'ai' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setSelectedSkillTab('ai')}
              >
                {locale === 'fr' ? 'IA & Data (en formation)' : 'AI & Data (in training)'}
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
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Leadership inspirant' : 'Inspiring Leadership'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Capacité à porter une vision claire dans des contextes d'innovation et à entraîner les équipes autour d'objectifs ambitieux. Leadership reconnu dans des contextes à fort enjeu, y compris en solo sur des projets complexes."
                    : "Ability to carry a clear vision in innovation contexts and lead teams around ambitious goals. Recognized leadership in high-stakes contexts, including solo on complex projects."}
                </p>
              </motion.div>
              
              {/* Communication Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Communication stratégique' : 'Strategic Communication'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Pédagogie et clarté dans l'expression, adaptée aux interlocuteurs techniques ou non-tech. Capacité à vulgariser l'IA et structurer les décisions collectives."
                    : "Pedagogy and clarity in expression, adapted to technical or non-tech interlocutors. Ability to popularize AI and structure collective decisions."}
                </p>
              </motion.div>
              
              {/* Adaptabilité Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Adaptabilité agile' : 'Agile Adaptability'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Réactivité face aux contextes changeants, apprentissage autonome rapide (notamment IA). Capacité à pivoter efficacement et à convertir les contraintes en solutions viables."
                    : "Responsiveness to changing contexts, fast autonomous learning (especially AI). Ability to pivot effectively and convert constraints into viable solutions."}
                </p>
              </motion.div>
              
              {/* Gestion de crise Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Gestion de crise' : 'Crisis Management'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Expérience de la prise de décision dans des moments de flou ou d'urgence projet (ex : refonte complète sous délai court avec validation externe). Maintien du cap et des priorités sous pression."
                    : "Experience in decision-making during moments of uncertainty or project urgency (e.g.: complete overhaul under short deadline with external validation). Maintaining course and priorities under pressure."}
                </p>
              </motion.div>
              
              {/* Innovation Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Leadership produit' : 'Product Leadership'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Approche orientée impact : définition de MVP stratégiques, priorisation fondée sur la valeur, et sens du timing marché. Fortes affinités UX / utilisateurs finaux."
                    : "Impact-oriented approach: definition of strategic MVPs, value-based prioritization, and market timing sense. Strong UX / end-user affinities."}
                </p>
              </motion.div>
              
              {/* Négociation Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Intelligence émotionnelle' : 'Emotional Intelligence'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Écoute active, compréhension fine des dynamiques d'équipe. Capacité à embarquer sans imposer, à rassurer dans les zones grises, et à travailler en collaboration étroite avec des profils techniques ou business."
                    : "Active listening, fine understanding of team dynamics. Ability to engage without imposing, reassure in grey areas, and work closely with technical or business profiles."}
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
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Product Management' : 'Product Management'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "5+ ans d'expérience en gestion de produit numérique : discovery, roadmapping, cadrage fonctionnel, itération Lean. Méthodologies : OKRs, RICE, JTBD."
                    : "5+ years of digital product management experience: discovery, roadmapping, functional framing, Lean iteration. Methodologies: OKRs, RICE, JTBD."}
                </p>
              </motion.div>
              
              {/* SaaS & AI Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'IA & Technologies émergentes' : 'AI & Emerging Technologies'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Intégration concrète d'IA générative dans des produits (GPT-4, RAG, fine-tuning, OCR, vectorisation). Savoir-faire terrain sur la faisabilité, les limites et la mise en production."
                    : "Concrete integration of generative AI in products (GPT-4, RAG, fine-tuning, OCR, vectorization). Field expertise on feasibility, limitations, and production deployment."}
                </p>
              </motion.div>
              
              {/* Cloud Infrastructure Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Design thinking & UX' : 'Design Thinking & UX'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Pratique du design centré utilisateur, prototypage rapide (Figma, Notion, Whimsical), tests utilisateurs. Attention portée à la valeur perçue."
                    : "User-centered design practice, rapid prototyping (Figma, Notion, Whimsical), user testing. Focus on perceived value."}
                </p>
              </motion.div>
              
              {/* DevOps Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Growth & Acquisition' : 'Growth & Acquisition'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Pilotage de stratégies d'activation et conversion dans des environnements SaaS. Suivi des KPIs, cohérence entre produit et cycle de vente."
                    : "Management of activation and conversion strategies in SaaS environments. KPI tracking, consistency between product and sales cycle."}
                </p>
              </motion.div>
              
              {/* Data Analysis Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Pilotage Data-Driven' : 'Data-Driven Management'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Usage de la donnée pour guider les décisions produit et IA : SQL, tableurs avancés, analyse exploratoire, dashboards de pilotage et mesure d'impact."
                    : "Using data to guide product and AI decisions: SQL, advanced spreadsheets, exploratory analysis, management dashboards and impact measurement."}
                </p>
              </motion.div>
              
              {/* Project Management Tools Card */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Méthodologies Agiles' : 'Agile Methodologies'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Scrum, Kanban, Scrumban – dans des contextes à forte incertitude. Capacité à cadrer sans sur-processer. Animation d'équipes pluridisciplinaires en autonomie."
                    : "Scrum, Kanban, Scrumban - in high uncertainty contexts. Ability to frame without over-processing. Independent facilitation of multidisciplinary teams."}
                </p>
              </motion.div>
            </motion.div>
          )}
          
          {/* AI & Data Skills Content */}
          {selectedSkillTab === 'ai' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Python & Data */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <MdDeveloperMode className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'Python & Data Engineering' : 'Python & Data Engineering'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Bases solides en Python appliqué à l'IA (pandas, SQLAlchemy, scikit-learn, PostgreSQL). Création de pipelines de données automatisés, nettoyage, structuration, intégration dans backend."
                    : "Solid foundations in Python applied to AI (pandas, SQLAlchemy, scikit-learn, PostgreSQL). Creation of automated data pipelines, cleaning, structuring, integration into backend."}
                </p>
              </motion.div>
              
              {/* LLMs & RAG */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <FaRobot className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'NLP & LLMs' : 'NLP & LLMs'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Prompt engineering avancé (GPT-4, Claude), RAG, fine-tuning (via Azure), function calling, design d'agents IA spécialisés. Conception de systèmes IA interagissant avec le back et la base de données."
                    : "Advanced prompt engineering (GPT-4, Claude), RAG, fine-tuning (via Azure), function calling, specialized AI agent design. Design of AI systems interacting with the backend and database."}
                </p>
              </motion.div>
              
              {/* MLOps */}
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow" 
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <FaTools className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-4">
                  {locale === 'fr' ? 'APIs & Automatisation' : 'APIs & Automation'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Conception d'API REST, intégration d'OCR (Tesseract.js), orchestrations avec Bull.js, CI/CD, Docker, déploiement sur Azure. Utilisation d'IA comme copilote technique (Cursor, Claude Code)."
                    : "REST API design, OCR integration (Tesseract.js), orchestrations with Bull.js, CI/CD, Docker, deployment on Azure. Using AI as a technical copilot (Cursor, Claude Code)."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </AnimatedSection>

      {/* CALL TO ACTION SECTION */}
      <AnimatedSection 
        className="py-24 bg-gradient-to-b from-white to-primary/5"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom text-center relative">
          {/* Éléments décoratifs subtils */}
          <div className="absolute top-0 right-10 w-24 h-24 rounded-full bg-primary/5 blur-xl"></div>
          <div className="absolute bottom-0 left-10 w-32 h-32 rounded-full bg-primary/5 blur-xl"></div>
          
          <motion.h2 
            className="text-4xl font-unbounded font-bold mb-8 gradient-text"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'fr' 
              ? 'Recruter un alternant AI Engineer dès maintenant' 
              : 'Hire an AI Engineer apprentice now'}
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {locale === 'fr'
              ? "J'apporte 9 ans d'expérience produit & marché à votre équipe IA, avec une formation technique de pointe et un rythme d'alternance optimisé (4j/1j). L'aide à l'apprentissage de 6000€ réduit significativement votre investissement."
              : "I bring 9 years of product & market experience to your AI team, with cutting-edge technical training and an optimized apprenticeship schedule (4d/1d). The €6,000 apprenticeship aid significantly reduces your investment."}
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center gap-6"
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
            
            <AnimatedButton 
              href={`${langPrefix}/contact`}
              variant="outline"
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