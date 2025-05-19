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
      context: "Difficultés internes critiques pour former rapidement les équipes aux procédures export EMEA, entraînant une perte de compétitivité opérationnelle.",
      role: "Mon rôle de Product Manager : Pilotage produit complet : cadrage fonctionnel détaillé, coordination Agile de l'équipe technique, définition des cas d'usage IA, management rigoureux des tests utilisateurs auprès de 50 utilisateurs pilotes.",
      results: [
        "Temps nécessaire aux formations réduit de 70 %",
        "Adoption immédiate avec satisfaction utilisateur très élevée (95 %)",
        "Optimisation des processus internes grâce à l'IA conversationnelle"
      ],
      lessons: "Apprentissages Produit : Importance cruciale de l'expérience utilisateur intuitive pour faciliter l'adoption d'un produit IA complexe. La gestion agile des retours utilisateurs est un levier clé de réussite.",
      skills: {
        soft: ["Leadership produit", "Innovation stratégique", "Adaptabilité agile", "Écoute utilisateur"],
        hard: ["GPT-4 Fine-tuning", "Azure OpenAI services", "Prompt engineering avancé", "Méthodologie Scrum"]
      }
    },
    en: {
      context: "Critical internal difficulties in rapidly training teams on EMEA export procedures, resulting in a loss of operational competitiveness.",
      role: "My Product Manager role: Complete product management: detailed functional framing, Agile coordination of the technical team, AI use case definition, rigorous management of user testing with 50 pilot users.",
      results: [
        "Time required for training reduced by 70%",
        "Immediate adoption with very high user satisfaction (95%)",
        "Optimization of internal processes through conversational AI"
      ],
      lessons: "Product Learnings: Critical importance of intuitive user experience to facilitate the adoption of a complex AI product. Agile management of user feedback is a key success lever.",
      skills: {
        soft: ["Product leadership", "Strategic innovation", "Agile adaptability", "User listening"],
        hard: ["GPT-4 Fine-tuning", "Azure OpenAI services", "Advanced prompt engineering", "Scrum methodology"]
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
  const locale = params.lang;
  const langPrefix = `/${locale}`;
  
  // Get translations directly based on language parameter
  const t = translations[locale];
  
  // Content based on language
  const pageContent = {
    fr: {
      heroTitle: "Ingénieur IA en formation",
      heroRole: "Formation Bac+5 IA | Spécialisation ML/DL & NLP | Background Product",
      heroSubtitle: [
        "Développement ML/DL avec Python, PyTorch et scikit-learn",
        "Implémentation de solutions NLP et Computer Vision",
        "Déploiement de modèles IA en production (MLOps)",
        "Vision produit & technique : 9 ans d'expérience"
      ],
      heroDescription: "En formation d'Ingénieur IA pour combiner expertise technique et vision produit. Actuellement en développement actif sur des projets ML/DL, avec un focus sur le NLP et le Computer Vision. Rythme d'alternance optimisé (4j entreprise/1j formation) et aide financière (6000€).",
      ctaBookMeeting: "Réserver un échange",
      ctaContact: "Me contacter",
      ctaDownloadCV: "Télécharger mon CV",
      profileAlt: "Moamen Elmasry - En reconversion IA Engineer avec expérience en Product Management",
      profileBadges: {
        certifications: "En formation AI Engineer Bac+5",
        experience: "9 ans d'expérience produit",
        projects: "Aide alternance 6000€"
      },
      stats: [
        { 
          value: "5+", 
          label: "Projets ML/DL",
          icon: <MdDeveloperMode className="w-6 h-6" />
        },
        { 
          value: "3", 
          label: "Modèles en prod",
          icon: <FaRobot className="w-6 h-6" />
        },
        { 
          value: "CI/CD", 
          label: "Pipeline MLOps",
          icon: <FaTools className="w-6 h-6" />
        },
        { 
          value: "4j/1j", 
          label: "Disponibilité",
          icon: <FaBusinessTime className="w-6 h-6" />
        }
      ],
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
      stats: [
        { 
          value: "5+", 
          label: "ML/DL Projects",
          icon: <MdDeveloperMode className="w-6 h-6" />
        },
        { 
          value: "3", 
          label: "Models in prod",
          icon: <FaRobot className="w-6 h-6" />
        },
        { 
          value: "CI/CD", 
          label: "MLOps Pipeline",
          icon: <FaTools className="w-6 h-6" />
        },
        { 
          value: "4d/1d", 
          label: "Availability",
          icon: <FaBusinessTime className="w-6 h-6" />
        }
      ],
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
                
                <AnimatedButton 
                  href="/CV_Moamen_Elmasry.pdf"
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
      
      {/* SECTION: Ma reconversion vers l'IA */}
      <AnimatedSection 
        className="py-12 bg-primary-light/80"
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
            {locale === 'fr' ? 'Ma reconversion vers l\'IA' : 'My path to AI Engineering'}
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
                  ? "Durant mes 9 années en tant que Product Manager, j'ai identifié un pattern récurrent : les projets IA les plus réussis sont ceux où la communication entre équipes business et techniques est fluide."
                  : "During my 9 years as a Product Manager, I identified a recurring pattern: the most successful AI projects are those where communication between business and technical teams is seamless."}
              </p>
              
              <p className="text-lg mb-4">
                {locale === 'fr' 
                  ? "J'ai piloté plusieurs initiatives d'IA générative et automatisation qui ont transformé des processus métier, et j'ai développé une passion pour l'aspect technique de ces solutions."
                  : "I've led several generative AI and automation initiatives that transformed business processes, and I've developed a passion for the technical aspect of these solutions."}
              </p>
              
              <p className="text-lg mb-4 font-semibold">
                {locale === 'fr' 
                  ? "Aujourd'hui, je souhaite me placer au cœur de cette transformation en développant l'expertise technique qui complète ma vision produit."
                  : "Today, I want to position myself at the heart of this transformation by developing the technical expertise that complements my product vision."}
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
                {locale === 'fr' ? 'Ce que j\'apporte à votre équipe IA' : 'What I bring to your AI team'}
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{locale === 'fr' 
                    ? "Une vision centrée sur l'impact business et le ROI des solutions IA"
                    : "A vision centered on business impact and ROI of AI solutions"}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{locale === 'fr' 
                    ? "Une capacité à traduire les besoins business en spécifications techniques"
                    : "An ability to translate business needs into technical specifications"}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{locale === 'fr' 
                    ? "L'expérience de la conduite du changement et de l'adoption utilisateur"
                    : "Experience in change management and user adoption"}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{locale === 'fr' 
                    ? "Une motivation exceptionnelle à apprendre et maîtriser les technologies IA"
                    : "Exceptional motivation to learn and master AI technologies"}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* SECTION: Mon rythme d'alternance */}
      <AnimatedSection 
        className="py-10 bg-gradient-to-r from-primary/5 to-white"
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
                className="text-3xl font-unbounded font-bold mb-6"
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
                <h3 className="text-lg font-bold text-primary mb-4">
                  {locale === 'fr' ? 'Mon projet en 4 points clés :' : 'My project in 4 key points:'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      {locale === 'fr' ? 'Formation complète IA' : 'Comprehensive AI training'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "Python, LangChain, RAG, MLOps, BentoML - Diplôme Bac+5" 
                        : "Python, LangChain, RAG, MLOps, BentoML - Master's degree"}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      {locale === 'fr' ? 'Double compétence unique' : 'Unique dual competency'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "9 ans d'expérience produit + compétences techniques IA" 
                        : "9 years of product experience + AI technical skills"}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      {locale === 'fr' ? 'Rythme optimal' : 'Optimal schedule'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "4 jours en entreprise, 1 jour en formation + aide de 6000€" 
                        : "4 days in company, 1 day in training + €6000 aid"}
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 hover:shadow-md transition-all">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      {locale === 'fr' ? 'Disponibilité immédiate' : 'Immediate availability'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {locale === 'fr' 
                        ? "Prêt à intégrer vos équipes et apporter une valeur ajoutée dès le premier mois" 
                        : "Ready to join your teams and add value from the first month"}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-lg mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {locale === 'fr' 
                  ? "J'excelle à traduire les enjeux métier en fonctionnalités à fort impact, en maîtrisant les cycles Agile, le pilotage data-driven et la gestion d'équipes internationales."
                  : "I excel at translating business challenges into high-impact features, mastering Agile cycles, data-driven management, and international team leadership."}
              </motion.p>
              
              <motion.p 
                className="text-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {locale === 'fr' 
                  ? "Ma vision : concevoir des produits intelligents, scalables et responsables qui réinventent l'expérience utilisateur et cimentent une croissance durable."
                  : "My vision: designing intelligent, scalable, and responsible products that reinvent the user experience and cement sustainable growth."}
              </motion.p>
              
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
        data-section-id="projets"
      >
        <div id="projets" className="container-custom">
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
                  ? "Création d'un produit IA basé sur GPT-4 (Azure), réduisant de 70 % les temps de formation export et adopté par 50 utilisateurs pilotes grâce à une UX optimisée."
                  : "Creation of a GPT-4 (Azure) based AI product, reducing export training times by 70% and adopted by 50 pilot users thanks to optimized UX.",
                dominante: locale === 'fr' ? "Product Management & IA" : "Product Management & AI",
                icon: <FaRobot />
              },
              {
                id: "SAMSUNG",
                title: locale === 'fr' ? "Samsung JO2024 – Experience Manager" : "Samsung OG2024 – Experience Manager",
                img: "/images/Samsung.jpg",
                tags: ["UX/CX", "Operations", "Product Testing", "Leadership"],
                description: locale === 'fr' 
                  ? "Management terrain et optimisation continue du parcours utilisateur, assurant une expérience fluide à 17K visiteurs quotidiens, avec un taux de satisfaction client à 90 %."
                  : "Field management and continuous optimization of the user journey, ensuring a smooth experience for 17K daily visitors, with a 90% customer satisfaction rate.",
                dominante: locale === 'fr' ? "Product Experience & Leadership" : "Product Experience & Leadership",
                icon: <FaUsers />
              },
              {
                id: "SGS",
                title: locale === 'fr' ? "SGS – Digitalisation workflow B2B" : "SGS – B2B Workflow Digitization",
                img: "/images/SGS.jpg",
                tags: ["Digital Transformation", "OCR", "Product ROI", "Automation"],
                description: locale === 'fr' 
                  ? "Gestion produit d'une automatisation OCR avancée réduisant de 40 % les délais opérationnels et augmentant de 20 % le CA d'un portefeuille stratégique de 2M€."
                  : "Product management of advanced OCR automation reducing operational delays by 40% and increasing revenue by 20% on a strategic €2M portfolio.",
                dominante: locale === 'fr' ? "Product Management & Transformation" : "Product Management & Transformation",
                icon: <FaDatabase />
              },
              {
                id: "XEROX",
                title: locale === 'fr' ? "Xerox – Déploiement solutions hybrides" : "Xerox – Hybrid Solutions Deployment",
                img: "/images/XEROX.jpg",
                tags: ["Product-Sales Cycle", "Technical Roadmap", "Customer Feedback"],
                description: locale === 'fr' 
                  ? "Structuration stratégique produit/commerciale d'offres hardware/SaaS sur 200 clients multisites, améliorant de 45 % l'efficacité des déploiements."
                  : "Strategic product/commercial structuring of hardware/SaaS offerings for 200 multi-site clients, improving deployment efficiency by 45%.",
                dominante: locale === 'fr' ? "Product Strategy & Commercial" : "Product Strategy & Commercial",
                icon: <FaTools />
              },
              {
                id: "FRANCIS",
                title: locale === 'fr' ? "Francis Lefebvre – Digitalisation des ventes B2B" : "Francis Lefebvre – B2B Sales Digitalization",
                img: "/images/FRANCIS.jpg",
                tags: ["Product Development", "Market Testing", "B2B Strategy"],
                description: locale === 'fr' 
                  ? "Conception stratégique produit de nouvelles offres digitales B2B, améliorant considérablement la conversion client grâce à une approche de prospection intensive personnalisée."
                  : "Strategic product design of new B2B digital offerings, significantly improving customer conversion through an intensive personalized prospecting approach.",
                dominante: locale === 'fr' ? "Product Development & Business" : "Product Development & Business",
                icon: <FaBusinessTime />
              },
              {
                id: "DA",
                title: locale === 'fr' ? "DA Int. – Expansion produit Europe" : "DA Int. – Product Expansion Europe",
                img: "/images/DA.jpg",
                tags: ["Product Strategy", "Market Entry", "International"],
                description: locale === 'fr' 
                  ? "Pilotage stratégique de l'entrée produit sur le marché européen pour une entreprise chinoise, atteignant une croissance CA de 120 % en 18 mois."
                  : "Strategic management of product entry into the European market for a Chinese company, achieving 120% revenue growth in 18 months.",
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
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
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
                    ? "Vision claire et mobilisatrice qui inspire les équipes pluridisciplinaires à atteindre des objectifs ambitieux et créer un impact mesurable."
                    : "Clear and mobilizing vision that inspires multidisciplinary teams to achieve ambitious goals and create measurable impact."}
                </p>
              </motion.div>
              
              {/* Communication Card */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Communication stratégique' : 'Strategic Communication'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Communication percutante adaptée aux différentes parties prenantes, facilitant l'alignement et l'adhésion à tous les niveaux organisationnels."
                    : "Impactful communication adapted to different stakeholders, facilitating alignment and buy-in at all organizational levels."}
                </p>
              </motion.div>
              
              {/* Adaptabilité Card */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Adaptabilité agile' : 'Agile Adaptability'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Flexibilité et résilience face aux environnements complexes et changeants, permettant de transformer les obstacles en opportunités d'innovation."
                    : "Flexibility and resilience in complex and changing environments, allowing obstacles to be transformed into innovation opportunities."}
                </p>
              </motion.div>
              
              {/* Gestion de crise Card */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Gestion de crise' : 'Crisis Management'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Capacité à prendre des décisions critiques sous pression, à mobiliser les ressources nécessaires et à maintenir la cohésion d'équipe face à l'adversité."
                    : "Ability to make critical decisions under pressure, mobilize necessary resources, and maintain team cohesion in the face of adversity."}
                </p>
              </motion.div>
              
              {/* Innovation Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Leadership produit' : 'Product Leadership'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Capacité à définir une vision produit ambitieuse, à prioriser stratégiquement les fonctionnalités et à conduire des équipes vers l'excellence."
                    : "Ability to define an ambitious product vision, strategically prioritize features and lead teams toward excellence."}
                </p>
              </motion.div>
              
              {/* Négociation Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Intelligence émotionnelle' : 'Emotional Intelligence'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Forte empathie et compréhension des dynamiques interpersonnelles, permettant de créer des environnements où chacun peut s'épanouir et exceller."
                    : "Strong empathy and understanding of interpersonal dynamics, creating environments where everyone can thrive and excel."}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Product Management' : 'Product Management'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Expertise approfondie en définition de roadmap, priorisation stratégique (RICE, ICE) et développement itératif basé sur les retours utilisateurs."
                    : "Deep expertise in roadmap definition, strategic prioritization (RICE, ICE) and iterative development based on user feedback."}
                </p>
              </motion.div>
              
              {/* SaaS & AI Card */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'IA & Technologies émergentes' : 'AI & Emerging Technologies'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Intégration d'IA générative (GPT-4) et technologies prédictives dans les produits, avec une compréhension avancée des possibilités et limitations."
                    : "Integration of generative AI (GPT-4) and predictive technologies in products, with advanced understanding of possibilities and limitations."}
                </p>
              </motion.div>
              
              {/* Cloud Infrastructure Card */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Design thinking & UX' : 'Design Thinking & UX'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Conception centrée utilisateur combinant recherche terrain, prototypage rapide et tests d'usabilité pour des solutions à forte valeur ajoutée."
                    : "User-centered design combining field research, rapid prototyping and usability testing for high value-added solutions."}
                </p>
              </motion.div>
              
              {/* DevOps Card */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Growth & Acquisition' : 'Growth & Acquisition'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Élaboration de stratégies d'acquisition et de rétention, optimisation des tunnels de conversion et analyse des métriques d'engagement."
                    : "Development of acquisition and retention strategies, optimization of conversion funnels and analysis of engagement metrics."}
                </p>
              </motion.div>
              
              {/* Data Analysis Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Pilotage Data-Driven' : 'Data-Driven Management'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Exploitation de données analytiques pour guider les décisions produit, identifier les opportunités d'amélioration et mesurer l'impact des initiatives."
                    : "Leveraging analytical data to guide product decisions, identify improvement opportunities and measure the impact of initiatives."}
                </p>
              </motion.div>
              
              {/* Project Management Tools Card */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Méthodologies Agiles' : 'Agile Methodologies'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Maîtrise approfondie de Scrum, Kanban, SAFe et OKRs, permettant de délivrer efficacement des produits complexes dans des environnements changeants."
                    : "In-depth mastery of Scrum, Kanban, SAFe and OKRs, enabling efficient delivery of complex products in changing environments."}
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
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <MdDeveloperMode className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'Python & Data Science' : 'Python & Data Science'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "Pandas, NumPy, Scikit-Learn, PostgreSQL pour la préparation et l'analyse de données à grande échelle"
                    : "Pandas, NumPy, Scikit-Learn, PostgreSQL for large-scale data preparation and analysis"}
                </p>
              </motion.div>
              
              {/* LLMs & RAG */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <FaRobot className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'LLMs & RAG' : 'LLMs & RAG'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "LangChain, Mistral AI, Retrieval Augmented Generation pour créer des agents IA contextuels et efficaces"
                    : "LangChain, Mistral AI, Retrieval Augmented Generation to create contextual and efficient AI agents"}
                </p>
              </motion.div>
              
              {/* MLOps */}
              <motion.div 
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow" 
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <FaTools className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {locale === 'fr' ? 'MLOps & Déploiement' : 'MLOps & Deployment'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'fr' 
                    ? "BentoML, Docker, automatisation des workflows et monitoring de modèles en production"
                    : "BentoML, Docker, workflow automation and monitoring of models in production"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </AnimatedSection>
      
      {/* SECTION: L'IA en action */}
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
            {locale === 'fr' ? 'L\'IA en action : Un cas concret' : 'AI in action: A concrete case'}
          </motion.h2>
          
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {locale === 'fr' ? 'Le problème business' : 'The business problem'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'fr' 
                    ? "Délais d'exportation trop longs (72h) et erreurs fréquentes (30%) dans les certifications export, impactant directement le CA et la satisfaction client."
                    : "Export delays too long (72h) and frequent errors (30%) in export certifications, directly impacting revenue and customer satisfaction."}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {locale === 'fr' ? 'La solution IA' : 'The AI solution'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'fr' 
                    ? "Système d'extraction OCR couplé à un modèle LLM fine-tuné pour analyser, classifier et valider automatiquement les documents complexes d'exportation."
                    : "OCR extraction system coupled with a fine-tuned LLM model to automatically analyze, classify and validate complex export documents."}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {locale === 'fr' ? 'Impact mesurable' : 'Measurable impact'}
                </h3>
                <p className="text-gray-700">
                  {locale === 'fr' 
                    ? "Réduction de 80% des délais et 95% des erreurs, générant 200K€ d'économies annuelles et augmentant significativement la satisfaction client."
                    : "80% reduction in delays and 95% in errors, generating €200K in annual savings and significantly increasing customer satisfaction."}
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
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
                {locale === 'fr' ? 'Explorer ce projet en détail' : 'Explore this project in detail'}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* CALL TO ACTION SECTION (Updated with warmer tone) */}
      <AnimatedSection 
        className="py-20 bg-gradient-to-b from-white to-primary/5"
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
            className="text-xl mb-10 max-w-3xl mx-auto"
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