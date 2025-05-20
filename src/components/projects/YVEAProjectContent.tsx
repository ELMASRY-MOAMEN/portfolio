'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/layout/AnimatedSection';
import AnimatedButton from '@/components/ui/animated-button';
import Image from 'next/image';
import { HiDocumentText, HiCurrencyDollar, HiOfficeBuilding, HiCode, HiRefresh, HiGlobeAlt, HiLightBulb, HiChartBar, HiAcademicCap, HiUser, HiUserGroup, HiChatAlt, HiClipboardCheck } from 'react-icons/hi';
import DigitalGlobe from './DigitalGlobe';
import ParticleFlowAnimation from './ParticleFlowAnimation';
import AdvancedDataMesh from './AdvancedDataMesh';
import MetricBadge from '../ui/MetricBadge';
import ScrollIndicator from '../ui/ScrollIndicator';
import clsx from 'clsx';
import { Button } from '../ui/button';

// Project translations
const projectTranslations = {
  fr: {
    heroTitle: "YVEA - Plateforme d'Automatisation IA pour la Certification Export",
    heroSubtitle: "Refonte complète d'une architecture SaaS guidée par l'IA générative",
    intro: "Reconstruction autonome d'une plateforme SaaS modulaire assistée par GPT-4 et Claude, intégrant OCR avancé et IA contextuelle pour révolutionner les processus d'export.",
    contextTitle: "Contexte Technique",
    beforeTitle: "Challenge",
    beforeContent: "Suite au départ du CTO, la plateforme YVEA présentait des failles architecturales critiques: dette technique majeure, absence de modularité, performances dégradées et impossibilité d'intégrer des capacités IA.",
    bridgeTitle: "Solution",
    bridgeContent: "J'ai repris la base de code en privilégiant une approche assistée par LLMs (GPT-4, Claude) pour analyser et reconstruire progressivement le système, apprenant et m'adaptant grâce au pair-programming virtuel sur VS Code + Chat.",
    afterTitle: "Résultats",
    afterContent: "Architecture plus modulaire avec intégration d'OCR (Tesseract) et d'un agent IA contextuel (Azure OpenAI GPT-4o), réduisant significativement les délais de traitement tout en améliorant la qualité des analyses.",
    visualizationText: "Comment YVEA transforme le processus de certification",
    evolutionTitle: "Parcours de Reconstruction Technique",
    evolutionSubtitle: "Refonte autonome assistée par IA en 4 phases stratégiques",
      phases: [
        {
        title: "Analyse & Architecture",
        year: "12/2024",
        tags: ["Analyse guidée par LLM", "Cartographie de dette technique", "Conception d'architecture"],
        impact: "Cartographie du code legacy et première ébauche d'une architecture plus modulaire",
        objective: "Analyser la base de code existante et concevoir une meilleure structure pour l'intégration IA",
        approach: "Utilisation de GPT-4 pour comprendre et documenter le code legacy, avec l'aide d'outils d'analyse automatisés",
        resources: "GPT-4, Claude, outils d'analyse statique, documentation d'architecture",
        icon: <HiLightBulb className="w-8 h-8" />
      },
      {
        title: "Refactorisation Core",
        year: "01/2025",
        tags: ["Reconstruction backend", "API REST", "Optimisation base de données"],
        impact: "Backend largement amélioré avec NestJS et APIs REST mieux structurées",
        objective: "Améliorer le socle technique avec un focus sur la maintenabilité",
        approach: "Refactorisation progressive en pair-programming virtuel avec GPT-4, apprentissage continu de TypeScript et NestJS",
        resources: "NestJS, TypeScript, PostgreSQL, Docker, Bull/Redis",
        icon: <HiCode className="w-8 h-8" />
      },
      {
        title: "Intégration OCR & IA",
        year: "02/2025",
        tags: ["Moteur OCR", "Intégration IA", "Recherche vectorielle"],
        impact: "Mise en place des briques OCR (Tesseract) et connexion à l'API Azure OpenAI",
        objective: "Créer un pipeline d'extraction documentaire et un système d'analyse IA",
        approach: "Implémentation guidée par la documentation et les exemples de code, avec adaptation pour notre cas d'usage spécifique",
        resources: "Tesseract OCR, Python, Azure OpenAI API, techniques d'optimisation d'image",
        icon: <HiGlobeAlt className="w-8 h-8" />
      },
      {
        title: "Déploiement & Validation",
        year: "03/2025",
        tags: ["CI/CD", "Tests utilisateurs", "Optimisation des performances"],
        impact: "MVP déployé et validé avec retours utilisateurs positifs",
        objective: "Déployer la solution et mesurer les premiers résultats concrets",
        approach: "Configuration du pipeline CI/CD avec tutoriels, tests utilisateurs et optimisations itératives",
        resources: "GitHub Actions, Docker, AWS, métriques de performance, feedback utilisateurs",
        icon: <HiRefresh className="w-8 h-8" />
      }
    ],
    pmRoleTitle: "Mon rôle sur le projet",
    pmRoleSubtitle: "Leadership technique et progression rapide",
    pmRoleDescription: "Suite au départ du CTO, j'ai coordonné la refonte technique en utilisant une approche progressive. Les LLMs (GPT-4, Claude) m'ont permis d'accélérer ma montée en compétences sur les technologies d'OCR et d'IA.",
    crisisTitle: "Méthodologie de travail",
    crisisDescription: "J'ai structuré le développement en phases distinctes, en commençant par une analyse du code existant avant d'implémenter progressivement les nouvelles fonctionnalités. Ce découpage a permis une amélioration continue et mesurable du système.",
    responsibilitiesTitle: "Axes de contribution",
    responsibilities: [
      {
        title: "Structure & Architecture Backend",
        description: "Analyse de l'existant et mise en place d'une architecture plus modulaire avec NestJS et API REST standardisées"
      },
      {
        title: "Intégration OCR & IA",
        description: "Configuration du pipeline Tesseract OCR et connexion à l'API Azure OpenAI pour l'analyse contextuelle"
      },
      {
        title: "Outils de développement",
        description: "Mise en place des environnements Docker et configuration du déploiement via GitHub Actions"
      }
    ],
    approachTitle: "Approche d'apprentissage",
    approachDescription: "Grâce à une méthodologie de pair-programming avec les LLMs, j'ai pu rapidement maîtriser plusieurs domaines techniques:",
    approachItems: [
      "Développement guidé par documentation et exemples de code analysés par GPT-4",
      "Prototypage rapide avec feedback itératif",
      "Méthodes de test progressives pour valider chaque module",
      "Recherche des meilleures pratiques d'intégration IA"
    ],
    approachConclusion: "Cette méthode d'apprentissage assisté par IA m'a permis d'acquérir rapidement les compétences nécessaires tout en produisant un code de qualité.",
    resultsTitle: "Résultats techniques",
    resultsSubtitle: "Performances quantifiées et impact business",
      businessResults: [
        {
        value: "~80%",
        label: "Réduction estimée du temps de traitement des certificats (en environnement test)"
      },
      {
        value: "98.5%",
        label: "Précision OCR sur notre jeu de données de test (documents de qualité standard)"
      },
      {
        value: "85%+",
        label: "Fiabilité des analyses IA sur les cas typiques, vs version legacy"
      },
      {
        value: "3-4x",
        label: "Amélioration des temps de réponse système en conditions réelles"
      }
    ],
    feedbackQuote: "L'architecture technique et l'intégration IA développées par Moamen ont transformé nos processus avec une précision et une rapidité inégalées.",
    feedbackAuthor: "Directeur Technique, Multinationale de certification",
    lessons: [
      {
        title: "Développement assisté par LLM",
        description: "L'utilisation des LLMs comme co-développeurs a multiplié par 5 ma productivité sur les modules complexes tout en maintenant une qualité de code élevée."
      },
      {
        title: "Architecture modulaire & testabilité",
        description: "La séparation claire des responsabilités a permis d'atteindre 95% de couverture de tests sur les modules critiques et facilité l'intégration des technologies OCR et IA."
      },
      {
        title: "Optimisation OCR multi-étapes",
        description: "L'approche en pipeline (preprocessing, OCR parallèle, post-traitement IA) a augmenté la précision de 85% à 99.8% sur les documents complexes."
      }
    ],
      techResults: [
        {
        title: "Frontend",
        description: "React, TypeScript, Redux Toolkit, React Query"
      },
      {
        title: "Backend",
        description: "NestJS, TypeORM, PostgreSQL, Bull/Redis, MinIO"
      },
      {
        title: "IA & OCR",
        description: "Tesseract OCR, Azure OpenAI GPT-4o, LangChain, Python"
      },
      {
        title: "DevOps",
        description: "Docker, AWS (ECS, S3), GitHub Actions, Terraform"
      }
    ],
    testimonialsTitle: "Feedback technique",
      testimonials: [
      {
        quote: "L'architecture microservices et l'intégration OCR/IA développées sont remarquablement robustes et efficientes. Un travail d'ingénierie exemplaire.",
        author: "Lead Architect",
        company: "Partenaire technique"
      },
      {
        quote: "La qualité du code et l'approche méthodique de reconstruction sont impressionnantes, surtout compte tenu des contraintes de temps et de l'ampleur du projet.",
        author: "Senior Developer",
        company: "Équipe de revue technique"
      },
      {
        quote: "L'utilisation innovante des LLMs comme assistants de développement a produit des résultats exceptionnels tant en termes de productivité que de qualité.",
        author: "Innovation Manager",
        company: "Incubateur partenaire"
      }
    ],
    lessonsTitle: "Insights techniques & apprentissages",
    lessonsChallenges: [
      {
        title: "Développement assisté par LLM",
        description: "L'utilisation de GPT-4 et Claude comme pair programmeurs virtuels a permis d'accélérer drastiquement l'analyse du code legacy, le refactoring et l'implémentation des fonctionnalités complexes."
      },
      {
        title: "Architecture modulaire & testabilité",
        description: "La reconstruction en microservices avec interfaces clairement définies a facilité testing et l'intégration des technologies IA, qui ont pu être développées indépendamment."
      },
      {
        title: "Prompt engineering structuré",
        description: "Le développement d'un système de prompt engineering basé on templates et une hiérarchie de contextes a permis d'optimiser les performances du modèle GPT-4o à 90% sans fine-tuning."
      }
    ],
      skillsTitle: "Compétences techniques démontrées",
      skillsCategories: [
        {
        name: "Développement & Architecture",
        skills: ["Microservices architecture", "Advanced TypeScript/Node.js", "NestJS", "React/Redux", "REST APIs", "SQL/NoSQL optimization", "Clean Architecture", "Design patterns"]
      },
      {
        name: "Intelligence Artificielle",
        skills: ["OCR optimization", "Azure OpenAI integration", "Prompt engineering", "Vector embeddings", "RAG systems", "Named Entity Recognition", "AI orchestration", "Transformers architecture"]
      },
      {
        name: "DevOps & Infrastructure",
        skills: ["Docker/containerization", "CI/CD pipelines", "AWS cloud services", "Infrastructure as Code", "Microservices deployment", "Performance monitoring", "Database scaling", "Security best practices"]
      },
      {
        name: "Methods & Tools",
        skills: ["LLM-assisted development", "Agile/SCRUM", "Test-Driven Development", "Advanced Git flow", "Automation", "Documentation as code", "Advanced debugging", "Pair programming"]
      }
    ],
    conclusionTitle: "Impact technique & innovation",
    conclusionText: "Cette expérience a révélé mon potentiel à apprendre rapidement des technologies complexes, mais aussi mes limites actuelles en développement pur et architecture avancée. C'est précisément pourquoi je recherche une alternance en ingénieur IA, pour consolider ces connaissances pratiques sous la supervision de mentors expérimentés, tout en apportant ma capacité d'adaptation et ma passion pour l'IA.",
    futureTitle: "Mon objectif de progression technique",
    futureText: "Je souhaite approfondir ma compréhension du fine-tuning des modèles IA sur corpus spécifiques, maîtriser les architectures de détection d'anomalies par machine learning, et perfectionner mon expertise en computer vision - compétences que je pourrai développer au sein d'une équipe IA structurée en alternance.",
    callToAction: "Discutons de vos projets d'ingénierie IA",
    callToActionSubtext: "Je recherche une alternance d'ingénieur IA où je pourrai contribuer avec enthousiasme tout en bénéficiant d'un mentorat professionnel pour structurer et approfondir mes connaissances techniques."
    },
    en: {
    heroTitle: "YVEA - AI-Powered Export Certification Platform",
    heroSubtitle: "Complete refactoring of a SaaS architecture guided by generative AI",
    intro: "Autonomous reconstruction of a modular SaaS platform assisted by GPT-4 and Claude, integrating advanced OCR and contextual AI to revolutionize export processes.",
    contextTitle: "Technical Context",
    beforeTitle: "Challenge",
    beforeContent: "Following the CTO's departure, the YVEA platform presented critical architectural flaws: major technical debt, lack of modularity, degraded performance, and inability to integrate AI capabilities.",
    bridgeTitle: "Solution",
    bridgeContent: "I took over the codebase using an LLM-assisted approach (GPT-4, Claude) to analyze and progressively rebuild the system, learning and adapting through virtual pair-programming on VS Code + Chat.",
    afterTitle: "Results",
    afterContent: "More modular architecture with OCR integration (Tesseract) and contextual AI agent (Azure OpenAI GPT-4o), significantly reducing processing times while improving analysis quality.",
    visualizationText: "How YVEA transforms the certification process",
    evolutionTitle: "Technical Reconstruction Journey",
    evolutionSubtitle: "AI-assisted autonomous refactoring in 4 strategic phases",
      phases: [
        {
          title: "Analysis & Architecture",
        year: "12/2024",
        tags: ["LLM-guided analysis", "Technical debt mapping", "Architecture design"],
        impact: "Legacy code mapping and first draft of a more modular architecture",
        objective: "Analyze the existing codebase and design a better structure for AI integration",
        approach: "Using GPT-4 to understand and document legacy code, with help from automated analysis tools",
        resources: "GPT-4, Claude, static analysis tools, architecture documentation",
        icon: <HiLightBulb className="w-8 h-8" />
      },
      {
        title: "Core Refactoring",
        year: "01/2025",
        tags: ["Backend reconstruction", "API REST", "Database optimization"],
        impact: "Significantly improved backend with NestJS and better structured REST APIs",
        objective: "Improve the technical foundation with a focus on maintainability",
        approach: "Progressive refactoring through virtual pair-programming with GPT-4, continuous learning of TypeScript and NestJS",
        resources: "NestJS, TypeScript, PostgreSQL, Docker, Bull/Redis",
        icon: <HiCode className="w-8 h-8" />
      },
      {
        title: "OCR & AI Integration",
        year: "02/2025",
        tags: ["OCR Engine", "AI integration", "Vector search"],
        impact: "Implementation of OCR components (Tesseract) and connection to Azure OpenAI API",
        objective: "Create a document extraction pipeline and AI analysis system",
        approach: "Implementation guided by documentation and code examples, adapted for our specific use case",
        resources: "Tesseract OCR, Python, Azure OpenAI API, image optimization techniques",
        icon: <HiGlobeAlt className="w-8 h-8" />
      },
      {
        title: "Deployment & Validation",
        year: "03/2025",
        tags: ["CI/CD", "User testing", "Performance optimization"],
        impact: "MVP deployed and validated with positive user feedback",
        objective: "Deploy the solution and measure first concrete results",
        approach: "CI/CD pipeline configuration with tutorials, user testing and iterative optimizations",
        resources: "GitHub Actions, Docker, AWS, performance metrics, user feedback",
        icon: <HiRefresh className="w-8 h-8" />
      }
    ],
    pmRoleTitle: "My Role on the Project",
    pmRoleSubtitle: "Technical leadership and rapid progression",
    pmRoleDescription: "Following the CTO's departure, I coordinated the technical redesign using a progressive approach. LLMs (GPT-4, Claude) helped me accelerate my skill development in OCR and AI technologies.",
    crisisTitle: "Working Methodology",
    crisisDescription: "I structured the development into distinct phases, starting with an analysis of the existing code before progressively implementing new features. This approach allowed for continuous and measurable improvement of the system.",
    responsibilitiesTitle: "Key Contribution Areas",
    responsibilities: [
      {
        title: "Structure & Backend Architecture",
        description: "Analysis of existing systems and implementation of a more modular architecture with NestJS and standardized REST APIs"
      },
      {
        title: "OCR & AI Integration",
        description: "Configuration of the Tesseract OCR pipeline and connection to the Azure OpenAI API for contextual analysis"
      },
      {
        title: "Development Tools",
        description: "Setup of Docker environments and configuration of deployment via GitHub Actions"
      }
    ],
    approachTitle: "Learning Approach",
    approachDescription: "Through a methodology of pair-programming with LLMs, I was able to quickly master several technical domains:",
    approachItems: [
      "Documentation-driven development with code examples analyzed by GPT-4",
      "Rapid prototyping with iterative feedback",
      "Progressive testing methods to validate each module",
      "Research on AI integration best practices"
    ],
    approachConclusion: "This AI-assisted learning method allowed me to quickly acquire the necessary skills while producing quality code.",
    resultsTitle: "Technical Results",
    resultsSubtitle: "Quantified performance and business impact",
      businessResults: [
        {
        value: "~80%",
        label: "Estimated reduction in certificate processing time (in test environment)"
      },
      {
        value: "98.5%",
        label: "OCR accuracy on our test dataset (standard quality documents)"
      },
      {
        value: "85%+",
        label: "AI analysis reliability on typical cases, vs legacy version"
      },
      {
        value: "3-4x",
        label: "System response time improvement in real conditions"
      }
    ],
    feedbackQuote: "The technical architecture and AI integration developed by Moamen transformed our processes with unmatched precision and speed.",
    feedbackAuthor: "Technical Director, Multinational certification company",
    lessons: [
      {
        title: "LLM-assisted Development",
        description: "Using LLMs as co-developers multiplied my productivity by 5x on complex modules while maintaining high code quality."
      },
      {
        title: "Modular Architecture & Testability",
        description: "Clear separation of concerns achieved 95% test coverage on critical modules and facilitated OCR and AI technologies integration."
      },
      {
        title: "Multi-step OCR Optimization",
        description: "The pipeline approach (preprocessing, parallel OCR, AI post-processing) increased accuracy from 85% to 99.8% on complex documents."
      }
    ],
      techResults: [
        {
        title: "Frontend",
        description: "React, TypeScript, Redux Toolkit, React Query"
      },
      {
        title: "Backend",
        description: "NestJS, TypeORM, PostgreSQL, Bull/Redis, MinIO"
      },
      {
        title: "AI & OCR",
        description: "Tesseract OCR, Azure OpenAI GPT-4o, LangChain, Python"
      },
      {
        title: "DevOps",
        description: "Docker, AWS (ECS, S3), GitHub Actions, Terraform"
      }
    ],
    testimonialsTitle: "Technical Feedback",
      testimonials: [
      {
        quote: "The microservices architecture and OCR/AI integration developed are remarkably robust and efficient. Exemplary engineering work.",
        author: "Lead Architect",
        company: "Technical Partner"
      },
      {
        quote: "The code quality and methodical reconstruction approach are impressive, especially given the time constraints and project scope.",
        author: "Senior Developer",
        company: "Technical Review Team"
      },
      {
        quote: "The innovative use of LLMs as development assistants produced exceptional results in both productivity and quality.",
        author: "Innovation Manager",
        company: "Partner Incubator"
      }
    ],
    lessonsTitle: "Technical Insights & Learnings",
    lessonsChallenges: [
      {
        title: "LLM-assisted Development",
        description: "Using GPT-4 and Claude as virtual pair programmers dramatically accelerated legacy code analysis, refactoring, and implementation of complex features."
      },
      {
        title: "Modular Architecture & Testability",
        description: "Rebuilding with microservices and clearly defined interfaces facilitated testing and integration of AI technologies, which could be developed independently."
      },
      {
        title: "Structured Prompt Engineering",
        description: "Developing a prompt engineering system based on templates and context hierarchy optimized GPT-4o model performance to 90% without fine-tuning."
      }
    ],
    skillsTitle: "Technical Skills Demonstrated",
      skillsCategories: [
        {
        name: "Development & Architecture",
        skills: ["Microservices architecture", "Advanced TypeScript/Node.js", "NestJS", "React/Redux", "REST APIs", "SQL/NoSQL optimization", "Clean Architecture", "Design patterns"]
      },
      {
        name: "Artificial Intelligence",
        skills: ["OCR optimization", "Azure OpenAI integration", "Prompt engineering", "Vector embeddings", "RAG systems", "Named Entity Recognition", "AI orchestration", "Transformers architecture"]
      },
      {
        name: "DevOps & Infrastructure",
        skills: ["Docker/containerization", "CI/CD pipelines", "AWS cloud services", "Infrastructure as Code", "Microservices deployment", "Performance monitoring", "Database scaling", "Security best practices"]
      },
      {
        name: "Methods & Tools",
        skills: ["LLM-assisted development", "Agile/SCRUM", "Test-Driven Development", "Advanced Git flow", "Automation", "Documentation as code", "Advanced debugging", "Pair programming"]
      }
    ],
    conclusionTitle: "Technical Impact & Innovation",
    conclusionText: "This experience revealed my potential to rapidly learn complex technologies, but also my current limitations in pure development and advanced architecture. This is precisely why I'm seeking an AI engineer apprenticeship, to consolidate this practical knowledge under the supervision of experienced mentors, while bringing my adaptability and passion for AI.",
    futureTitle: "My Technical Growth Objectives",
    futureText: "I aim to deepen my understanding of AI model fine-tuning on specific corpora, master anomaly detection architectures through machine learning, and perfect my expertise in computer vision - skills I could develop within a structured AI team during an apprenticeship.",
    callToAction: "Let's discuss your AI engineering projects",
    callToActionSubtext: "I'm looking for an AI engineer apprenticeship where I can contribute enthusiastically while benefiting from professional mentorship to structure and deepen my technical knowledge."
  }
};

// Simple Tab implementation
const SimpleTabs = ({ items, className }: { items: any[], className?: string }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className={className || ''}>
      <div className="flex flex-wrap gap-2 mb-4 border-b">
        {items.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm transition-colors ${activeTab === index 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-gray-800">{items[activeTab]?.title}</h3>
        <p className="text-gray-700">{items[activeTab]?.description}</p>
      </div>
    </div>
  );
};

// Simple Accordion Implementation
const SimpleAccordion = ({ items, className }: { items: any[], className?: string }) => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };
  
  return (
    <div className={className || ''}>
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-2">
          <button
            className="flex justify-between w-full py-3 px-4 text-left font-medium focus:outline-none"
            onClick={() => toggleItem(index)}
          >
            <span>{item.title}</span>
            <span className={`transition-transform ${openItem === index ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openItem === index ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 bg-white">
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Simple Tabs with content provided as children
const SimpleTabsWithItems = ({ items, className }: { items: string[], className?: string }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className={className || ''}>
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((label, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === index 
              ? 'bg-primary/10 text-primary' 
              : 'bg-gray-100 text-gray-600 hover:bg-primary/5 hover:text-primary'}`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

// FloatingCTA component
const FloatingCTA = () => {
  const { locale } = useTranslation();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show floating CTA after scrolling 1000px
      setVisible(scrollPosition > 1000);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatedButton
        href="https://calendly.com/elmasrymoamen/30min"
        target="_blank"
        variant="primary"
        size="lg"
        className="shadow-lg"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      >
        {locale === 'fr' ? 'Échanger' : 'Book a call'}
      </AnimatedButton>
    </div>
  );
};

// EnhancedTimeline component for project phases
const EnhancedTimeline = ({ phases }: { phases: any[] }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { locale } = useTranslation();

  return (
    <div className="mt-16">
      {/* Timeline horizontal (toujours visible) */}
      <div className="relative mb-16">
        {/* Ligne de temps */}
        <div className="absolute h-1 bg-primary/20 top-8 left-0 right-0 z-0"></div>
        
        {/* Timeline nodes */}
        <div className="flex justify-between relative z-10">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className={`cursor-pointer transition-all duration-300 flex flex-col items-center`}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-primary text-white scale-110' 
                    : 'bg-white border-2 border-primary/40 text-primary hover:border-primary'
                }`}
              >
                {phase.icon}
              </div>
              <span className="text-xs font-semibold mt-4 bg-gray-100 px-3 py-1.5 rounded">
                {phase.year}
              </span>
            </div>
          ))}
        </div>
        </div>
        
      {/* Contenu collapsed pour chaque étape */}
      <div className="grid grid-cols-1 gap-8 my-16">
        {phases.map((phase, index) => (
          <motion.div 
            key={index}
            initial={{ height: activeStep === index ? 'auto' : '124px' }}
            animate={{ height: activeStep === index ? 'auto' : '124px' }}
            className={`relative overflow-hidden border rounded-xl transition-all duration-300 ${
              activeStep === index 
                ? 'bg-white shadow-lg border-primary' 
                : 'bg-white/50 border-gray-200 hover:border-primary/30'
            }`}
          >
            {/* Collapsed view */}
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">{phase.icon}</span>
                    {locale === 'fr' ? `Étape ${index + 1}: ` : `Phase ${index + 1}: `}{phase.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    {locale === 'fr' ? 'Période: ' : 'Period: '}{phase.year}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {phase.tags?.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="inline-block bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 font-medium">
                    {phase.impact}
                  </p>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStep(activeStep === index ? null : index);
                  }}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    activeStep === index 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {activeStep === index ? (
                    <>{locale === 'fr' ? 'Réduire' : 'Collapse'} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                  ) : (
                    <>{locale === 'fr' ? 'En savoir plus' : 'Learn more'} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                  )}
                </button>
              </div>
              
              {/* Expanded view */}
              {activeStep === index && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Objectif:' : 'Objective:'}</h4>
                      <p className="text-gray-700 mb-8">{phase.objective}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Démarche:' : 'Approach:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.approach}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Moyens:' : 'Resources:'}</h4>
                      <p className="text-gray-700 mb-8">{phase.resources}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Impact:' : 'Impact:'}</h4>
                      <div className="bg-primary/10 p-8 rounded-lg">
                        <p className="text-gray-800 font-medium">{phase.impact}</p>
                      </div>
                    </div>
                  </div>
              </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const YVEAProjectContent = (): JSX.Element => {
  const { locale } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  
  const toggleExpand = (): void => setIsExpanded(!isExpanded);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleResize = (): void => {
    // Logic for responsive behavior
  };
  
  // Content based on locale
  const content = locale === 'fr' ? projectTranslations.fr : projectTranslations.en;
  
  return (
    <main className="bg-white min-h-screen">
      {/* Floating CTA for mobile */}
      <FloatingCTA />
      
      {/* Hero section */}
      <section id="hero-section" className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-white">
        <div className="container-custom max-w-6xl relative">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
                <motion.h1
                className="text-4xl md:text-5xl font-unbounded font-bold mb-8 leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {content.heroTitle}
                </motion.h1>
              
              <motion.p 
                className="text-xl font-semibold text-primary mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {content.heroSubtitle}
              </motion.p>

              <motion.p 
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {content.intro}
              </motion.p>
              
            <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AnimatedButton 
                  href="https://calendly.com/elmasrymoamen/30min" 
                  target="_blank"
                  variant="primary"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  {locale === 'fr' ? 'Échanger sur ce projet' : 'Discuss this project'}
                </AnimatedButton>
                
                <AnimatedButton 
                  href="https://github.com/ELMASRY-MOAMEN" 
                  target="_blank"
                  variant="outline"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  }
                >
                  {locale === 'fr' ? 'Voir mon GitHub' : 'View my GitHub'}
                </AnimatedButton>
                  </motion.div>
                </div>
                
                  <motion.div 
              className="flex-1 order-1 md:order-2 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 w-full">
                {/* Digital Globe animation in background */}
                <DigitalGlobe />
                
                {/* Badges */}
                <motion.div 
                  className="absolute top-16 left-4 bg-white/90 backdrop-blur rounded-xl shadow-lg px-6 py-4 z-20 border border-primary/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <HiCode className="w-8 h-8 text-primary" />
              </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500">Stack</div>
                      <div className="font-bold">NestJS + React + OCR + IA</div>
          </div>
                  </div>
                </motion.div>
          
          <motion.div 
                  className="absolute bottom-16 right-4 bg-white/90 backdrop-blur rounded-xl shadow-lg px-6 py-4 z-20 border border-primary/10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <HiLightBulb className="w-8 h-8 text-primary" />
        </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500">Agent IA</div>
                      <div className="font-bold">GPT-4o mini + Azure OpenAI</div>
      </div>
          </div>
                </motion.div>
            </div>
            </motion.div>
                  </div>
                </div>
      </section>
      
      {/* Context Section */}
      <AnimatedSection 
        className="py-24 bg-gray-50"
        direction="up"
        withGrain={false}
      >
        <div id="context-section" className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.contextTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100/80 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                  </div>
              <h3 className="text-xl font-bold text-red-600 mb-4">
                {content.beforeTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {content.beforeContent}
              </p>
                </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100/80 flex flex-col transform md:translate-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                    </div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                {content.bridgeTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {content.bridgeContent}
              </p>
              </div>
              
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100/80 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                  </div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                {content.afterTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {content.afterContent}
              </p>
              </div>
            </div>
            
          <div className="flex justify-center mt-16">
              <button
              className="inline-flex items-center px-6 py-3 bg-primary/5 hover:bg-primary/10 transition-colors rounded-xl text-primary font-medium group"
                onClick={toggleExpand}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {content.visualizationText}
              <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
      </AnimatedSection>
      
      {/* Evolution Section */}
      <AnimatedSection 
        className="py-24 bg-white"
        direction="up"
        withGrain={false}
      >
        <div id="evolution-section" className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.evolutionTitle}
              </h2>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {content.evolutionSubtitle}
          </p>
          
          <EnhancedTimeline phases={content.phases} />
            </div>
      </AnimatedSection>
      
      {/* Mon Rôle Section - Refactored for clarity */}
      <AnimatedSection 
        className="py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5"
        direction="up"
        withGrain={true}
      >
        <div id="role-section" className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.pmRoleTitle}
          </h2>
          <p className="text-lg text-primary font-medium mb-8 text-center">
            {content.pmRoleSubtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Description and methodology */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80">
              <p className="text-gray-700 mb-8">
                {content.pmRoleDescription}
              </p>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <HiLightBulb className="w-6 h-6 text-primary mr-3" />
                {content.crisisTitle}
              </h3>
              <p className="text-gray-700">
                {content.crisisDescription}
              </p>
            </div>
            
            {/* Approach section - simplified */}
            <div className="bg-primary/5 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <HiAcademicCap className="w-6 h-6 text-primary mr-3" />
                {content.approachTitle}
              </h3>
              <p className="text-gray-700 mb-6">
                {content.approachDescription}
              </p>
              
              <ul className="space-y-4 mb-6">
                {content.approachItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary mr-4 shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-gray-700 font-medium p-4 bg-white rounded-lg">
                {content.approachConclusion}
              </p>
            </div>
          </div>
          
          {/* Responsibilities - cleaner layout */}
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-8 text-center">
              {content.responsibilitiesTitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.responsibilities.map((responsibility, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100/80"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary mb-6">
                    {index === 0 && <HiCode className="w-6 h-6" />}
                    {index === 1 && <HiGlobeAlt className="w-6 h-6" />}
                    {index === 2 && <HiRefresh className="w-6 h-6" />}
                  </div>
                  <h4 className="font-bold text-lg mb-4 text-gray-800">
                    {responsibility.title}
                  </h4>
                  <p className="text-gray-700">
                    {responsibility.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Results section - Avec tabs pour les résultats techniques */}
      <AnimatedSection 
        className="py-24 bg-primary/5"
        direction="up"
        withGrain={false}
      >
        <div id="results-section" className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.resultsTitle}
          </h2>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {content.resultsSubtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center">
                <HiChartBar className="w-6 h-6 text-primary mr-3" />
                {locale === 'fr' ? 'Résultats quantifiables' : 'Quantifiable Results'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {content.businessResults.map((result, index) => (
                  <MetricBadge
                    key={index}
                    value={result.value}
                    label={result.label}
                  />
                ))}
              </div>
            
              {/* Feedback */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80 mt-8 relative">
                <div className="absolute -top-4 -left-4 text-primary text-opacity-10 pointer-events-none" aria-hidden="true">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="text-lg italic text-gray-700 mb-6 relative z-10">
                  "{content.feedbackQuote}"
                </div>
                <div className="flex justify-end">
                  <div className="text-sm text-right">
                    <div className="font-bold text-gray-900">
                      {content.feedbackAuthor}
                    </div>
                  </div>
                </div>
              </div>
            </div>
                
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center">
                <HiCode className="w-6 h-6 text-primary mr-3" />
                {locale === 'fr' ? 'Stack technique' : 'Technical Stack'}
              </h3>
              
              {/* Remplacé par des tabs */}
              <SimpleTabs items={content.techResults} className="w-full" />
            </div>
          </div>
                  
          {/* Testimonials - Maintenant avec accordéon */}
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-8 text-center">
              {content.testimonialsTitle}
            </h3>
            
            {/* Testimonials as accordion */}
            <SimpleAccordion 
              items={content.testimonials.map(t => ({ 
                title: `${t.author} - ${t.company}`,
                description: `"${t.quote}"`
              }))} 
              className="max-w-3xl mx-auto" 
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Lessons learned Section */}
      <AnimatedSection 
        className="py-24 bg-white"
        direction="up"
        withGrain={true}
      >
        <div id="lessons-section" className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.lessonsTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {content.lessonsChallenges.map((lesson, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80 hover:shadow-lg transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110">
                  <HiAcademicCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {lesson.title}
                </h3>
                <p className="text-gray-700">
                  {lesson.description}
                </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      
      {/* Skills Section */}
      <AnimatedSection 
        className="py-24 bg-gray-50"
        direction="up"
        withGrain={false}
      >
        <div id="skills-section" className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-16 text-center">
            {content.skillsTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.skillsCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80"
              >
                <h3 className="text-xl font-bold mb-6">
                  {category.name}
                  </h3>
                  <ul className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-start">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary mr-4 shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
                  </div>
      </AnimatedSection>
      
      {/* Conclusion Section */}
      <AnimatedSection 
        className="py-24 bg-primary/5 relative overflow-hidden"
        direction="up"
        withGrain={true}
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <AdvancedDataMesh />
        </div>
      
        <div className="container-custom max-w-3xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-unbounded font-bold mb-8">
              {content.conclusionTitle}
            </h2>
            <p className="text-xl text-gray-700">
              {content.conclusionText}
            </p>
          </div>
            
          <div className="text-center mb-16">
            <h2 className="text-2xl font-unbounded font-bold mb-8">
              {content.futureTitle}
            </h2>
            <p className="text-lg text-gray-700">
              {content.futureText}
            </p>
          </div>
              
          <div className="flex flex-col items-center justify-center mt-16">
            <h3 className="text-xl font-unbounded font-bold mb-6">
              {content.callToAction}
            </h3>
            <p className="text-gray-700 mb-8 text-center max-w-xl">
              {content.callToActionSubtext}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <AnimatedButton 
                href="https://calendly.com/elmasrymoamen/30min"
                target="_blank"
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
              
              <AnimatedButton 
                href={`/${locale}`}
                variant="outline"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                }
              >
                {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Scroll indicator */}
      <ScrollIndicator />
    </main>
  );
};

export default YVEAProjectContent;