'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/layout/AnimatedSection';
import AnimatedButton from '@/components/ui/animated-button';
import Image from 'next/image';
import { HiDocumentText, HiCurrencyDollar, HiOfficeBuilding, HiCode, HiRefresh, HiGlobeAlt, HiLightBulb, HiChartBar, HiAcademicCap, HiUser, HiUserGroup, HiChatAlt, HiClipboardCheck, HiServer, HiDatabase } from 'react-icons/hi';
import DigitalGlobe from './DigitalGlobe';
import ParticleFlowAnimation from './ParticleFlowAnimation';
import AdvancedDataMesh from './AdvancedDataMesh';
import MetricBadge from '../ui/MetricBadge';
import ScrollIndicator from '../ui/ScrollIndicator';
import clsx from 'clsx';
import { Button } from '../ui/button';
import ExecutiveMetrics from '../ui/ExecutiveMetrics';
import StackTechnologique from '../ui/StackTechnologique';
import HeroSection from './sections/HeroSection';
import ContextSection from './sections/ContextSection';
import ArchitectureFlowDiagram from './sections/ArchitectureFlowDiagram';

// GAFAM Design System
const DESIGN_SYSTEM = {
  // Typography Scale - Mobile First Responsive
  typography: {
    h1: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight',
    h2: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight',
    h3: 'text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight',
    h4: 'text-lg sm:text-xl lg:text-2xl font-semibold leading-tight',
    h5: 'text-base sm:text-lg lg:text-xl font-semibold leading-tight',
    body: 'text-sm sm:text-base lg:text-lg leading-relaxed',
    caption: 'text-xs sm:text-sm lg:text-base leading-relaxed',
    lead: 'text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed',
  },
  
  // Spacing Scale - Base 8px, Mobile First
  spacing: {
    section: 'py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24',
    sectionLarge: 'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32',
    container: 'px-4 sm:px-6 lg:px-8',
    card: 'p-4 sm:p-6 lg:p-8',
    cardSmall: 'p-3 sm:p-4 lg:p-6',
    gap: 'gap-4 sm:gap-6 lg:gap-8',
    gapLarge: 'gap-6 sm:gap-8 lg:gap-12',
    margin: 'mb-4 sm:mb-6 lg:mb-8',
    marginLarge: 'mb-6 sm:mb-8 lg:mb-12',
    marginXL: 'mb-8 sm:mb-12 lg:mb-16',
  },
  
  // Responsive Grid System
  grid: {
    cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    split: 'grid grid-cols-1 lg:grid-cols-2',
    metrics: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
    timeline: 'grid grid-cols-1',
  },
  
  // Container System
  container: {
    default: 'max-w-7xl mx-auto',
    content: 'max-w-6xl mx-auto',
    text: 'max-w-4xl mx-auto',
    narrow: 'max-w-3xl mx-auto',
  },
  
  // Component Variants
  card: {
    default: 'bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200',
    elevated: 'bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200',
    featured: 'bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300',
  },
} as const;

// Project translations
const projectTranslations = {
  fr: {
    heroTitle: "YVEA - Plateforme d'Automatisation IA pour la Certification Export",
    heroSubtitle: "",
    contextTitle: "Contexte Technique",
    beforeTitle: "Challenge",
    beforeContent: "Suite au départ du CTO, la plateforme YVEA présentait des failles architecturales critiques: dette technique majeure, absence de modularité, performances dégradées et impossibilité d'intégrer des capacités IA.",
    bridgeTitle: "Solution",
    bridgeContent: "J'ai repris la base de code en privilégiant une approche assistée par LLMs (GPT-4, Claude) pour analyser et reconstruire progressivement le système, apprenant et m'adaptant grâce au pair-programming virtuel sur VS Code + Chat.",
    afterTitle: "Résultats",
    afterContent: "Architecture plus modulaire avec intégration d'OCR (Tesseract) et d'un agent IA contextuel (Azure OpenAI GPT-4o), réduisant significativement les délais de traitement tout en améliorant la qualité des analyses.",
    visualizationText: "Comment YVEA transforme le processus de certification",
    
    // Nouvelle section architecture
    architectureTitle: "Architecture Système Avancée",
    architectureSubtitle: "Conception d'une infrastructure distribuée et résiliente",
    architectureDescription: "L'architecture technique de YVEA suit une approche microservices avec séparation claire des responsabilités, communications asynchrones et scalabilité horizontale.",
    architectureComponents: [
      {
        title: "Architecture Microservices",
        description: "Modules backend indépendants communiquant via API REST et WebSockets, permettant un développement et déploiement découplés.",
        icon: <HiServer className="w-6 h-6" />
      },
      {
        title: "Architecture Événementielle",
        description: "Communication asynchrone via Redis pour découpler les services et assurer la résilience du système en cas de défaillance partielle.",
        icon: <HiRefresh className="w-6 h-6" />
      },
      {
        title: "Pipeline IA & OCR",
        description: "Traitement multi-étapes avec preprocessing, OCR parallélisé et post-traitement IA pour une extraction de données optimale.",
        icon: <HiGlobeAlt className="w-6 h-6" />
      },
      {
        title: "Infrastructure Cloud",
        description: "Services containerisés sur AWS avec scaling automatique, stockage objet S3/MinIO et déploiement via CI/CD GitLab.",
        icon: <HiDatabase className="w-6 h-6" />
      }
    ],
    
    architectureDiagramTitle: "Flux de données & interactions systèmes",
    architecturePatterns: [
      {
        title: "Circuit Breaker",
        description: "Protection contre les défaillances de services externes avec retry et backoff exponentiel"
      },
      {
        title: "Repository Pattern",
        description: "Abstraction de la couche données avec TypeORM pour faciliter les tests et le changement de base de données"
      },
      {
        title: "Dependency Injection",
        description: "Services NestJS injectables et testables avec mock automatisé pour tests unitaires"
      },
      {
        title: "Event-Driven Architecture",
        description: "Communication asynchrone via événements pour minimiser le couplage entre services"
      }
    ],
    
    evolutionTitle: "Parcours de reconstruction et amélioration",
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
    pmRoleDescription: "",
    crisisTitle: "Méthodologie de travail",
    crisisDescription: "",
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
    approachTitle: "Méthodologie assistance LLMs",
    approachDescription: "J'ai utilisé GPT-o3 et la CLI Claude Code comme co-développeurs pour:",
    approachItems: [
      "Analyse du code legacy et identification de la dette technique",
      "Refactorisation du backend avec une architecture modulaire",
      "Intégration de composants IA comme OCR et RAG",
      "Mise en place de pipelines CI/CD et tests automatisés"
    ],
    approachConclusion: "Cette approche a multiplié ma productivité tout en renforçant mes compétences techniques en intégration IA.",
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
    feedbackQuote: "L'architecture technique et l'intégration IA développées par Moamen ont transformé notre vision de la certification grâce à une précision et une rapidité inégalées.",
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
    testimonialsTitle: "",
    testimonials: [],
    lessonsTitle: "",
    lessonsChallenges: [],
    skillsTitle: "Compétences techniques démontrées",
    skillsCategories: [
      {
        name: "Development & Architecture",
        description: "These tools enabled me to build a modular microservices architecture, implement clean code practices, and ensure high test coverage across the application.",
        skills: ["Microservices architecture", "Advanced TypeScript/Node.js", "NestJS", "React/Redux", "REST APIs", "SQL/NoSQL optimization", "Clean Architecture", "Design patterns"]
      },
      {
        name: "Artificial Intelligence",
        description: "I leveraged these technologies to create an intelligent document processing pipeline, combining OCR with contextual AI analysis for accurate data extraction.",
        skills: ["OCR optimization", "Azure OpenAI integration", "Prompt engineering", "Vector embeddings", "RAG systems", "Named Entity Recognition", "AI orchestration", "Transformers architecture"]
      },
      {
        name: "DevOps & Infrastructure",
        description: "These tools allowed me to containerize the application, manage continuous deployment (CI/CD), and monitor performance in production.",
        skills: ["Docker/containerization", "CI/CD pipelines", "AWS cloud services", "Infrastructure as Code", "Microservices deployment", "Performance monitoring", "Database scaling", "Security best practices"]
      },
      {
        name: "Methods & Tools",
        description: "I adopted these methodologies to maintain high code quality, ensure efficient collaboration, and deliver features iteratively.",
        skills: ["LLM-assisted development", "Agile/SCRUM", "Test-Driven Development", "Advanced Git flow", "Automation", "Documentation as code", "Advanced debugging", "Pair programming"]
      }
    ],
    conclusionTitle: "Impact technique & vision d'avenir",
    conclusionText: "Ce projet a mis en lumière ma capacité à assimiler rapidement des technologies avancées (OCR, IA, DevOps), tout en soulignant les domaines que je souhaite encore consolider — notamment l'architecture logicielle à grande échelle et les algorithmes IA complexes. C'est précisément dans cette optique que je recherche aujourd'hui une alternance en ingénierie IA : pour transformer ces acquis autodidactes en expertise solide, encadrée par des mentors expérimentés.",
    futureTitle: "Axes de progression ciblés",
    futureText: "Mon objectif est clair :\n\nApprofondir le fine-tuning de modèles IA sur des corpus spécifiques\n\nComprendre et implémenter des architectures de détection d'anomalies par machine learning\n\nRenforcer ma maîtrise en computer vision appliquée\n\nJe souhaite évoluer dans un environnement structuré où l'innovation est portée par la rigueur technique et l'intelligence collective.",
    callToAction: "Construisons ensemble vos solutions IA",
    callToActionSubtext: "Je recherche une alternance en ingénierie IA dans laquelle je pourrais contribuer activement aux projets, tout en bénéficiant d'un cadre de mentorat exigeant. Mon autonomie, ma curiosité et ma capacité d'apprentissage rapide seront des atouts au service de vos ambitions technologiques."
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
    
    // Nouvelle section architecture
    architectureTitle: "Advanced System Architecture",
    architectureSubtitle: "Design of a distributed and resilient infrastructure",
    architectureDescription: "YVEA's technical architecture follows a microservices approach with clear separation of concerns, asynchronous communications, and horizontal scalability.",
    architectureComponents: [
      {
        title: "Architecture Microservices",
        description: "Independent backend modules communicating via REST APIs and WebSockets, enabling decoupled development and deployment.",
        icon: <HiServer className="w-6 h-6" />
      },
      {
        title: "Architecture Événementielle",
        description: "Communication asynchrone via Redis for decoupling services and ensure system resilience in case of partial failure.",
        icon: <HiRefresh className="w-6 h-6" />
      },
      {
        title: "Pipeline IA & OCR",
        description: "Multi-step processing with preprocessing, OCR parallelized and AI post-processing for optimal data extraction.",
        icon: <HiGlobeAlt className="w-6 h-6" />
      },
      {
        title: "Infrastructure Cloud",
        description: "Containerized services on AWS with auto-scaling, S3/MinIO object storage, and deployment via CI/CD GitLab.",
        icon: <HiDatabase className="w-6 h-6" />
      }
    ],
    
    architectureDiagramTitle: "Data Flow & System Interactions",
    architecturePatterns: [
      {
        title: "Circuit Breaker",
        description: "Protection against external service failures with retry and exponential backoff"
      },
      {
        title: "Repository Pattern",
        description: "Data layer abstraction with TypeORM to facilitate testing and database changes"
      },
      {
        title: "Dependency Injection",
        description: "Injectable and testable NestJS services with automated mocking for unit tests"
      },
      {
        title: "Event-Driven Architecture",
        description: "Asynchronous communication through events to minimize coupling between services"
      }
    ],
    
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
    approachTitle: "Méthodologie assistée par IA",
    approachDescription: "J'ai utilisé GPT-4 et Claude comme co-développeurs pour:",
    approachItems: [
      "Analyser le code legacy et identifier la dette technique",
      "Refactoriser le backend avec une architecture modulaire",
      "Intégrer des composants IA comme OCR et RAG",
      "Mettre en place des pipelines CI/CD et des tests automatisés"
    ],
    approachConclusion: "Cette approche a multiplié ma productivité tout en renforçant mes compétences techniques en intégration IA.",
    resultsTitle: "Résultats techniques",
    resultsSubtitle: "Performance et impact commercial quantifiés",
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
        description: "These tools enabled me to build a modular microservices architecture, implement clean code practices, and ensure high test coverage across the application.",
        skills: ["Microservices architecture", "Advanced TypeScript/Node.js", "NestJS", "React/Redux", "REST APIs", "SQL/NoSQL optimization", "Clean Architecture", "Design patterns"]
      },
      {
        name: "Artificial Intelligence",
        description: "I leveraged these technologies to create an intelligent document processing pipeline, combining OCR with contextual AI analysis for accurate data extraction.",
        skills: ["OCR optimization", "Azure OpenAI integration", "Prompt engineering", "Vector embeddings", "RAG systems", "Named Entity Recognition", "AI orchestration", "Transformers architecture"]
      },
      {
        name: "DevOps & Infrastructure",
        description: "These tools allowed me to containerize the application, manage continuous deployment (CI/CD), and monitor performance in production.",
        skills: ["Docker/containerization", "CI/CD pipelines", "AWS cloud services", "Infrastructure as Code", "Microservices deployment", "Performance monitoring", "Database scaling", "Security best practices"]
      },
      {
        name: "Methods & Tools",
        description: "I adopted these methodologies to maintain high code quality, ensure efficient collaboration, and deliver features iteratively.",
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

// Enhanced Reusable Components with GAFAM Design System

const SimpleTabs = ({ items, className }: { items: any[], className?: string }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={clsx(
              'px-4 sm:px-6 py-3 text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200',
              activeTab === index
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={DESIGN_SYSTEM.spacing.card}>
        {items[activeTab]?.content}
      </div>
    </div>
  );
};

const SimpleAccordion = ({ items, className }: { items: any[], className?: string }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={clsx('space-y-4', className)}>
      {items.map((item, index) => (
        <div key={index} className={DESIGN_SYSTEM.card.default}>
          <button
            onClick={() => toggleItem(index)}
            className={clsx(
              'w-full text-left',
              DESIGN_SYSTEM.spacing.card,
              'flex justify-between items-center'
            )}
          >
            <span className={DESIGN_SYSTEM.typography.h5}>{item.title}</span>
            <span className="text-gray-400">
              {openItems.includes(index) ? '−' : '+'}
            </span>
          </button>
          {openItems.includes(index) && (
            <div className={clsx(DESIGN_SYSTEM.spacing.card, 'border-t border-gray-100')}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SimpleTabsWithItems = ({ items, className }: { items: string[], className?: string }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex flex-wrap gap-2 mb-6">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeTab === index
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatedButton
        href="https://calendly.com/elmasrymoamen/30min"
        target="_blank"
        variant="primary"
        size="sm"
        className="shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        <span className="hidden sm:inline">Réserver un échange</span>
        <span className="sm:hidden">Contact</span>
      </AnimatedButton>
    </div>
  );
};

const EnhancedTimeline = ({ phases }: { phases: any[] }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 sm:left-8"></div>
      
      <div className="space-y-12">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex items-start"
          >
            {/* Timeline dot */}
            <div className="absolute left-2 top-2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg sm:left-6 sm:w-6 sm:h-6"></div>
            
            {/* Content */}
            <div className="ml-12 sm:ml-20">
              <div className={DESIGN_SYSTEM.card.elevated}>
                <div className={DESIGN_SYSTEM.spacing.card}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className="bg-primary/10 rounded-full p-2 mr-3">
                        {phase.icon}
                      </div>
                      <div>
                        <h3 className={DESIGN_SYSTEM.typography.h4}>{phase.title}</h3>
                        <span className="text-sm text-gray-500 font-medium">{phase.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700 mb-4')}>
                    {phase.impact}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className={clsx(DESIGN_SYSTEM.typography.h5, 'text-gray-800 mb-2')}>
                        Objectif
                      </h4>
                      <p className={clsx(DESIGN_SYSTEM.typography.caption, 'text-gray-600')}>
                        {phase.objective}
                      </p>
                    </div>
                    <div>
                      <h4 className={clsx(DESIGN_SYSTEM.typography.h5, 'text-gray-800 mb-2')}>
                        Approche
                      </h4>
                      <p className={clsx(DESIGN_SYSTEM.typography.caption, 'text-gray-600')}>
                        {phase.approach}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {phase.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ArchitectureSection = ({ content }: { content: any }) => {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <ParticleFlowAnimation />
      </div>
      
      <div className={clsx(DESIGN_SYSTEM.container.content, DESIGN_SYSTEM.spacing.container, 'relative z-10')}>
        {/* Section Header */}
        <div className={clsx('text-center', DESIGN_SYSTEM.spacing.marginXL)}>
          <h2 className={clsx(DESIGN_SYSTEM.typography.h2, DESIGN_SYSTEM.spacing.margin)}>
            {content.architectureTitle}
          </h2>
          <p className={clsx(DESIGN_SYSTEM.typography.lead, 'text-gray-600', DESIGN_SYSTEM.container.narrow)}>
            {content.architectureSubtitle}
          </p>
        </div>
        
        {/* Architecture Description */}
        <div className={clsx(DESIGN_SYSTEM.card.featured, DESIGN_SYSTEM.spacing.marginXL)}>
          <div className={DESIGN_SYSTEM.spacing.card}>
            <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700', DESIGN_SYSTEM.spacing.marginLarge)}>
              {content.architectureDescription}
            </p>
            
            {/* Architecture Components Grid */}
            <div className={clsx(DESIGN_SYSTEM.grid.features, DESIGN_SYSTEM.spacing.gap)}>
              {content.architectureComponents.map((component: { title: string; description: string; icon: JSX.Element }, index: number) => (
                <div key={index} className={clsx(DESIGN_SYSTEM.card.default, 'flex items-start')}>
                  <div className={DESIGN_SYSTEM.spacing.cardSmall}>
                    <div className="flex items-start mb-4">
                      <div className="bg-primary/10 rounded-full p-3 mr-4 shrink-0">
                        {component.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={clsx(DESIGN_SYSTEM.typography.h5, 'text-gray-800 mb-3')}>
                          {component.title}
                        </h3>
                      </div>
                    </div>
                    <p className={clsx(DESIGN_SYSTEM.typography.caption, 'text-gray-600 ml-0')}>
                      {component.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Architecture Diagram */}
        <div className={DESIGN_SYSTEM.spacing.marginXL}>
          <h3 className={clsx(DESIGN_SYSTEM.typography.h3, 'text-center', DESIGN_SYSTEM.spacing.marginLarge)}>
            {content.architectureDiagramTitle}
          </h3>
          
          <div className={DESIGN_SYSTEM.card.featured}>
            <div className={DESIGN_SYSTEM.spacing.card}>
              {/* Diagram Introduction */}
              <div className={clsx('text-center', DESIGN_SYSTEM.spacing.marginLarge, DESIGN_SYSTEM.container.narrow)}>
                <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700')}>
                  L'architecture YVEA utilise une approche microservices découplée permettant une scalabilité horizontale 
                  et une résilience face aux défaillances partielles.
                </p>
              </div>

              {/* Architecture Flow Diagram */}
              <ArchitectureFlowDiagram />
            </div>
          </div>
          
          {/* Architecture Benefits */}
          <div className={clsx(DESIGN_SYSTEM.grid.split, DESIGN_SYSTEM.spacing.gap, 'mt-8')}>
            <div className={DESIGN_SYSTEM.card.default}>
              <div className={DESIGN_SYSTEM.spacing.cardSmall}>
                <h4 className={clsx(DESIGN_SYSTEM.typography.h5, 'text-gray-800 mb-4 flex items-center')}>
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Avantages architecturaux
                </h4>
                <ul className="space-y-3">
                  {[
                    { title: "Séparation des responsabilités", description: "permettant une maintenance facilitée" },
                    { title: "Scalabilité horizontale", description: "de chaque composant indépendamment" },
                    { title: "Haute disponibilité", description: "grâce à la redondance des services" }
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className={DESIGN_SYSTEM.typography.caption}>
                        <span className="font-medium">{benefit.title}</span> {benefit.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={DESIGN_SYSTEM.card.default}>
              <div className={DESIGN_SYSTEM.spacing.cardSmall}>
                <h4 className={clsx(DESIGN_SYSTEM.typography.h5, 'text-gray-800 mb-4 flex items-center')}>
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Patterns architecturaux
                </h4>
                <ul className="space-y-3">
                  {[
                    { title: "Circuit Breaker", description: "pour les services externes" },
                    { title: "Event-Driven Architecture", description: "avec Redis/Bull" },
                    { title: "Repository Pattern", description: "pour l'abstraction des données" }
                  ].map((pattern, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className={DESIGN_SYSTEM.typography.caption}>
                        <span className="font-medium">{pattern.title}</span> {pattern.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
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
      <HeroSection content={content} locale={locale} />
      
      {/* Context section */}
      <ContextSection content={content} />
      
      {/* Architecture Section - Enhanced with GAFAM Design System */}
      <AnimatedSection 
        className={clsx(DESIGN_SYSTEM.spacing.sectionLarge, 'bg-gradient-to-br from-blue-50 to-white')}
        direction="up"
        withGrain={true}
      >
        <ArchitectureSection content={content} />
      </AnimatedSection>
      
      {/* Evolution Section - Refactored with Design System */}
      <AnimatedSection 
        className={clsx(DESIGN_SYSTEM.spacing.sectionLarge, 'bg-white')}
        direction="up"
        withGrain={false}
      >
        <div id="evolution-section" className={clsx(DESIGN_SYSTEM.container.content, DESIGN_SYSTEM.spacing.container)}>
          <div className={clsx('text-center', DESIGN_SYSTEM.spacing.marginXL)}>
            <h2 className={clsx(DESIGN_SYSTEM.typography.h2, DESIGN_SYSTEM.spacing.margin)}>
              {content.evolutionTitle}
            </h2>
            <p className={clsx(DESIGN_SYSTEM.typography.lead, 'text-gray-600', DESIGN_SYSTEM.container.narrow)}>
              {content.evolutionSubtitle}
            </p>
          </div>
          
          <EnhancedTimeline phases={content.phases} />
        </div>
      </AnimatedSection>
      
      {/* Role Section - Refactored with Design System */}
      <AnimatedSection 
        className={clsx(DESIGN_SYSTEM.spacing.sectionLarge, 'bg-gradient-to-br from-primary/5 via-white to-primary/5')}
        direction="up"
        withGrain={true}
      >
        <div id="role-section" className={clsx(DESIGN_SYSTEM.container.content, DESIGN_SYSTEM.spacing.container)}>
          <div className={clsx('text-center', DESIGN_SYSTEM.spacing.marginXL)}>
            <h2 className={clsx(DESIGN_SYSTEM.typography.h2, DESIGN_SYSTEM.spacing.margin)}>
              {content.pmRoleTitle}
            </h2>
            <p className={clsx(DESIGN_SYSTEM.typography.lead, 'text-primary font-medium')}>
              {content.pmRoleSubtitle}
            </p>
          </div>
          
          <div className={clsx(DESIGN_SYSTEM.grid.split, DESIGN_SYSTEM.spacing.gapLarge)}>
            {/* Approach section */}
            <div className={DESIGN_SYSTEM.card.elevated}>
              <div className={DESIGN_SYSTEM.spacing.card}>
                <h3 className={clsx(DESIGN_SYSTEM.typography.h4, 'mb-4 flex items-center')}>
                  <HiAcademicCap className="w-6 h-6 text-primary mr-3" />
                  {content.approachTitle}
                </h3>
                <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700', DESIGN_SYSTEM.spacing.marginLarge)}>
                  {content.approachDescription}
                </p>
                
                <ul className={clsx('space-y-4', DESIGN_SYSTEM.spacing.marginLarge)}>
                  {content.approachItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary mr-4 shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700')}>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className={clsx(DESIGN_SYSTEM.card.default, DESIGN_SYSTEM.spacing.card)}>
                  <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700 font-medium')}>
                    {content.approachConclusion}
                  </p>
                </div>
              </div>
            </div>
          
            {/* Responsibilities */}
            <div className={DESIGN_SYSTEM.card.elevated}>
              <div className={DESIGN_SYSTEM.spacing.card}>
                <h3 className={clsx(DESIGN_SYSTEM.typography.h4, 'mb-6 flex items-center')}>
                  <HiUserGroup className="w-6 h-6 text-primary mr-3" />
                  {content.responsibilitiesTitle}
                </h3>
                
                <div className="space-y-6">
                  {content.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary mr-4 shrink-0">
                        {index === 0 && <HiCode className="w-5 h-5" />}
                        {index === 1 && <HiGlobeAlt className="w-5 h-5" />}
                        {index === 2 && <HiRefresh className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className={clsx(DESIGN_SYSTEM.typography.h5, 'text-gray-800 mb-1')}>
                          {responsibility.title}
                        </h4>
                        <p className={clsx(DESIGN_SYSTEM.typography.caption, 'text-gray-600')}>
                          {responsibility.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Results section - Enhanced with Design System */}
      <AnimatedSection 
        className={clsx(DESIGN_SYSTEM.spacing.sectionLarge, 'bg-primary/5')}
        direction="up"
        withGrain={false}
      >
        <div id="results-section" className={clsx(DESIGN_SYSTEM.container.content, DESIGN_SYSTEM.spacing.container)}>
          <div className={clsx('text-center', DESIGN_SYSTEM.spacing.marginXL)}>
            <h2 className={clsx(DESIGN_SYSTEM.typography.h2, DESIGN_SYSTEM.spacing.margin)}>
              {content.resultsTitle}
            </h2>
            <p className={clsx(DESIGN_SYSTEM.typography.lead, 'text-gray-600', DESIGN_SYSTEM.container.narrow)}>
              {content.resultsSubtitle}
            </p>
          </div>
          
          <div className={clsx(DESIGN_SYSTEM.grid.split, DESIGN_SYSTEM.spacing.gapLarge)}>
            <div>
              <h3 className={clsx(DESIGN_SYSTEM.typography.h4, 'mb-8 flex items-center')}>
                <HiChartBar className="w-6 h-6 text-primary mr-3" />
                {locale === 'fr' ? 'Résultats quantifiables' : 'Quantifiable Results'}
              </h3>
              
              <div className={clsx(DESIGN_SYSTEM.grid.metrics, DESIGN_SYSTEM.spacing.gap, 'mb-8')}>
                {content.businessResults.map((result, index) => (
                  <MetricBadge
                    key={index}
                    value={result.value}
                    label={result.label}
                  />
                ))}
              </div>
              
              {/* Feedback */}
              <div className={clsx(DESIGN_SYSTEM.card.featured, 'relative')}>
                <div className="absolute -top-4 -left-4 text-primary text-opacity-10 pointer-events-none" aria-hidden="true">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className={DESIGN_SYSTEM.spacing.card}>
                  <div className={clsx(DESIGN_SYSTEM.typography.body, 'italic text-gray-700 mb-6 relative z-10')}>
                    "{content.feedbackQuote}"
                  </div>
                  <div className="flex justify-end">
                    <div className="text-right">
                      <div className={clsx(DESIGN_SYSTEM.typography.caption, 'font-bold text-gray-900')}>
                        {content.feedbackAuthor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  
            <div>
              <h3 className={clsx(DESIGN_SYSTEM.typography.h4, 'mb-8 flex items-center')}>
                <HiCode className="w-6 h-6 text-primary mr-3" />
                {locale === 'fr' ? 'Stack technique' : 'Technical Stack'}
              </h3>
              
              <StackTechnologique 
                items={content.techResults}
                githubUrl="https://github.com/ELMASRY-MOAMEN/YVEA#stack-technique"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Conclusion Section - Enhanced with GAFAM Design System */}
      <AnimatedSection 
        className={clsx(DESIGN_SYSTEM.spacing.sectionLarge, 'bg-gradient-to-br from-slate-50 to-primary/5 relative overflow-hidden')}
        direction="up"
        withGrain={false}
      >
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <AdvancedDataMesh />
        </div>
      
        <div className={clsx(DESIGN_SYSTEM.container.content, DESIGN_SYSTEM.spacing.container, 'relative z-10')}>
          {/* Impact & Vision section */}
          <div className={DESIGN_SYSTEM.spacing.marginXL}>
            <div className={clsx('text-center', DESIGN_SYSTEM.spacing.marginLarge)}>
              <h2 className={clsx(DESIGN_SYSTEM.typography.h2, DESIGN_SYSTEM.spacing.margin)}>
                {content.conclusionTitle}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className={clsx(DESIGN_SYSTEM.card.featured, DESIGN_SYSTEM.container.text)}>
              <div className={clsx(DESIGN_SYSTEM.spacing.card, 'md:p-12')}>
                <div className={clsx(DESIGN_SYSTEM.grid.split, 'items-start', DESIGN_SYSTEM.spacing.gap)}>
                  <div className="bg-primary/10 rounded-full p-6 shrink-0">
                    <HiLightBulb className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700', DESIGN_SYSTEM.spacing.marginLarge)}>
                      {content.conclusionText}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['OCR', 'IA Générative', 'Cloud Architecture', 'DevOps'].map((tag) => (
                        <span key={tag} className="bg-primary/5 text-primary/90 px-4 py-2 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Growth Objectives */}
          <div className={DESIGN_SYSTEM.spacing.marginXL}>
            <div className={clsx('text-center', DESIGN_SYSTEM.spacing.marginLarge)}>
              <h2 className={clsx(DESIGN_SYSTEM.typography.h3, DESIGN_SYSTEM.spacing.margin)}>
                {content.futureTitle}
              </h2>
              <p className={clsx(DESIGN_SYSTEM.typography.lead, 'font-medium text-gray-600', DESIGN_SYSTEM.container.narrow)}>
                Mon objectif est clair :
              </p>
            </div>
            
            <div className={clsx(DESIGN_SYSTEM.grid.features, DESIGN_SYSTEM.spacing.gapLarge)}>
              {/* Card 1 */}
              <div className={clsx(DESIGN_SYSTEM.card.featured, 'flex flex-col')}>
                <div className={clsx(DESIGN_SYSTEM.spacing.card, 'flex flex-col h-full')}>
                  <div className="bg-blue-50 rounded-full p-5 w-16 h-16 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className={clsx(DESIGN_SYSTEM.typography.h4, 'text-gray-800 mb-4')}>
                    Fine-tuning de modèles IA
                  </h3>
                  <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-600 mb-6 flex-grow')}>
                    Approfondir le fine-tuning de modèles IA sur des corpus spécifiques pour des cas d'usage métier précis.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3 text-blue-700 text-sm font-medium">
                    <span>LLMs • GPT • RAG • Domain Adaptation</span>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className={clsx(DESIGN_SYSTEM.card.featured, 'flex flex-col')}>
                <div className={clsx(DESIGN_SYSTEM.spacing.card, 'flex flex-col h-full')}>
                  <div className="bg-purple-50 rounded-full p-5 w-16 h-16 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className={clsx(DESIGN_SYSTEM.typography.h4, 'text-gray-800 mb-4')}>
                    Détection d'anomalies
                  </h3>
                  <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-600 mb-6 flex-grow')}>
                    Comprendre et implémenter des architectures de détection d'anomalies par machine learning pour des systèmes critiques.
                  </p>
                  <div className="bg-purple-50 rounded-lg p-3 text-purple-700 text-sm font-medium">
                    <span>ML Avancé • Unsupervised Learning • Systèmes Distribués</span>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className={clsx(DESIGN_SYSTEM.card.featured, 'flex flex-col')}>
                <div className={clsx(DESIGN_SYSTEM.spacing.card, 'flex flex-col h-full')}>
                  <div className="bg-green-50 rounded-full p-5 w-16 h-16 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className={clsx(DESIGN_SYSTEM.typography.h4, 'text-gray-800 mb-4')}>
                    Computer Vision
                  </h3>
                  <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-600 mb-6 flex-grow')}>
                    Renforcer ma maîtrise en computer vision appliquée pour l'analyse d'images et la reconnaissance de patterns complexes.
                  </p>
                  <div className="bg-green-50 rounded-lg p-3 text-green-700 text-sm font-medium">
                    <span>Deep Learning • CNN • Transformers • Object Detection</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={clsx('text-center', 'mt-12')}>
              <div className={clsx(DESIGN_SYSTEM.card.default, DESIGN_SYSTEM.spacing.card, DESIGN_SYSTEM.container.narrow)}>
                <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-gray-700')}>
                  Je souhaite évoluer dans un environnement structuré où l'innovation est portée par la rigueur technique et l'intelligence collective.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action - CORRIGÉ: Spacing et contraste */}
          <div className={clsx(DESIGN_SYSTEM.card.featured, 'bg-gradient-to-r from-primary to-primary text-white text-center', DESIGN_SYSTEM.container.text, 'mb-0')}>
            <div className={clsx(DESIGN_SYSTEM.spacing.card, 'md:p-12')}>
              <h3 className={clsx(DESIGN_SYSTEM.typography.h3, 'font-bold mb-6')}>
                {content.callToAction}
              </h3>
              <p className={clsx(DESIGN_SYSTEM.typography.body, 'text-white/90 mb-10', DESIGN_SYSTEM.container.narrow)}>
                {content.callToActionSubtext}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* CORRIGÉ: Bouton principal avec contraste parfait */}
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
                  className="bg-white text-primary font-semibold hover:bg-gray-50 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold transition-all duration-300"
                >
                  {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default YVEAProjectContent;