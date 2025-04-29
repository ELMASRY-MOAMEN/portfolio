'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/layout/AnimatedSection';
import AnimatedButton from '@/components/ui/animated-button';
import Image from 'next/image';
import { HiDocumentText, HiCurrencyDollar, HiOfficeBuilding, HiCode, HiRefresh, HiGlobeAlt, HiLightBulb, HiChartBar } from 'react-icons/hi';
import DigitalGlobe from './DigitalGlobe';
import ParticleFlowAnimation from './ParticleFlowAnimation';
import AdvancedDataMesh from './AdvancedDataMesh';
import MetricBadge from '../ui/MetricBadge';
import ScrollIndicator from '../ui/ScrollIndicator';
import clsx from 'clsx';
import { Button } from '../ui/button';

// EnhancedTimeline component for project phases
const EnhancedTimeline = ({ phases }: { phases: any[] }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { locale } = useTranslation();

  return (
    <div className="mt-8">
      {/* Timeline horizontal (toujours visible) */}
      <div className="relative mb-10">
        {/* Ligne de temps */}
        <div className="absolute h-1 bg-primary/20 top-6 left-0 right-0 z-0"></div>
        
        {/* Timeline nodes */}
        <div className="flex justify-between relative z-10">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className={`cursor-pointer transition-all duration-300 flex flex-col items-center`}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-primary text-white scale-110' 
                    : 'bg-white border-2 border-primary/40 text-primary hover:border-primary'
                }`}
              >
                {phase.icon}
              </div>
              <span className="text-xs font-semibold mt-2 bg-gray-100 px-2 py-1 rounded">
                {phase.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu collapsed pour chaque étape */}
      <div className="grid grid-cols-1 gap-6 my-8">
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
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">{phase.icon}</span>
                    {locale === 'fr' ? `Étape ${index + 1}: ` : `Phase ${index + 1}: `}{phase.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">
                    {locale === 'fr' ? 'Période: ' : 'Period: '}{phase.year}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {phase.tags?.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
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
                  className={`px-3 py-1 text-sm rounded-lg transition-colors flex items-center ${
                    activeStep === index 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {activeStep === index ? (
                    <>{locale === 'fr' ? 'Réduire' : 'Collapse'} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                  ) : (
                    <>{locale === 'fr' ? 'En savoir plus' : 'Learn more'} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                  )}
                </button>
              </div>
              
              {/* Expanded view */}
              {activeStep === index && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-4 border-t border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Objectif:' : 'Objective:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.objective}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Démarche:' : 'Approach:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.approach}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Moyens:' : 'Resources:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.resources}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Impact:' : 'Impact:'}</h4>
                      <div className="bg-primary/10 p-3 rounded-lg">
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

const YVEAProjectContent = () => {
  const { t, locale } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  
  // Toggle expand state for visualization container
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  useEffect(() => {
    const handleResize = () => {
      // Logic for responsive behavior
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Content based on locale
  const content = {
    fr: {
      heroTitle: "Automatisation IA de la certification export",
      heroSubtitle: "80% de gain opérationnel | SaaS B2B pour l'Afrique et le Moyen-Orient",
      intro: "Plateforme SaaS transformant les processus de certification export de 2-5 jours à 4-5 heures. Automatisation via OCR avancé et GPT-4 fine-tuné, réduisant les coûts opérationnels de 40%.",
      contextTitle: "Contexte du projet",
      beforeTitle: "AVANT",
      beforeContent: "Processus manuel: 2-5 jours de traitement, vérifications répétées, multiples allers-retours, frustration client, inefficacité interne.",
      bridgeTitle: "SOLUTION",
      bridgeContent: "Automatisation complète du processus via OCR, IA et workflow numérique, permettant vérifications instantanées et détection proactive des anomalies.",
      afterTitle: "RÉSULTATS",
      afterContent: "Précision améliorée à 90%, délais réduits de jours à heures, coûts opérationnels diminués de 40%, avantage concurrentiel significatif.",
      visualizationText: "Comparer: Sans vs Avec YVEA",
      evolutionTitle: "Évolution du projet",
      evolutionSubtitle: "SaaS IA pour la certification export: de l'idée au marché",
      phases: [
        {
          year: "2022",
          title: "Conceptualisation & Financement",
          description: "Validation de la viabilité économique et définition précise des besoins du marché de certification export.",
          impact: "Financement initial de 40K€ (BNP Paribas)",
          icon: <HiDocumentText size={20} />,
          tags: ["#BusinessModel", "#PitchDeck", "#Financement"],
          objective: "Valider le concept et sécuriser le financement initial.",
          approach: "Business Model Canvas, pitch deck et cahier des charges détaillé avec prévisions financières.",
          resources: "Collaboration avec experts sectoriels et financiers."
        },
        {
          year: "2022-Q2",
          title: "Prototypage & Incubation",
          description: "Création d'une maquette interactive pour démontrer la proposition de valeur.",
          impact: "Subvention d'innovation 30K€ et crédit AWS 15K$",
          icon: <HiCurrencyDollar size={20} />,
          tags: ["#Prototyping", "#UX/UI", "#Incubation"],
          objective: "Transformer le concept en prototype interactif.",
          approach: "Conception UX/UI Figma et présentation aux incubateurs.",
          resources: "Partenariat design et incubation Pepinière27."
        },
        {
          year: "2022-Q3/Q4",
          title: "MVP & Tests Utilisateurs",
          description: "Développement avec stack MERN et sprints SCRUM de 2 semaines.",
          impact: "MVP validé par les premiers utilisateurs",
          icon: <HiOfficeBuilding size={20} />,
          tags: ["#MVP", "#MERN", "#SCRUM"],
          objective: "Livrer une version fonctionnelle testable.",
          approach: "Sprints SCRUM et tests avec panel de 50 utilisateurs.",
          resources: "Équipe franco-pakistanaise, déploiement AWS."
        },
        {
          year: "2023-Q1/Q2",
          title: "Itération & Refactorisation",
          description: "Amélioration basée sur feedback utilisateurs et passage à TypeScript.",
          impact: "Stabilité et sécurité améliorées",
          icon: <HiCode size={20} />,
          tags: ["#Refactoring", "#TypeScript", "#UserFeedback"],
          objective: "Renforcer la robustesse et l'expérience utilisateur.",
          approach: "Refactorisation TypeScript et améliorations UX/UI.",
          resources: "Standups quotidiens, méthodologies Agile."
        },
        {
          year: "2023-Q3/Q4",
          title: "Industrialisation & V1",
          description: "Refonte architecture technique et intégration marketplace partenaires.",
          impact: "Solution scalable et opportunités internationales",
          icon: <HiRefresh size={20} />,
          tags: ["#Scaling", "#V1", "#Marketplace"],
          objective: "Scaling pour déploiement international.",
          approach: "Migration AWS, Terraform, sécurisation optimisée.",
          resources: "Équipe franco-argentine, méthodologie SCRUMBAN."
        },
        {
          year: "2024-2025",
          title: "Pivot Stratégique & V2",
          description: "Moteur de pré-vérification IA basé sur Azure OpenAI et GPT-4.",
          impact: "Temps d'analyse réduit à 5 minutes, qualité +90%",
          icon: <HiGlobeAlt size={20} />,
          tags: ["#IA", "#GPT4", "#StrategicPivot"],
          objective: "Automatiser l'analyse documentaire pour organismes de certification.",
          approach: "Détection intelligente de documents et analyse IA.",
          resources: "API backend et intégration Azure OpenAI."
        }
      ],
      // Mon rôle section
      pmRoleTitle: "Rôle: Digital Product Manager",
      pmRoleSubtitle: "Leadership produit avec méthodologies agiles",
      pmRoleDescription: "Pilotage produit de la vision à l'exécution: 3 équipes internationales (12 développeurs), budget 200K€, livraison dans les délais et objectifs dépassés.",
      
      responsibilitiesTitle: "Contributions clés",
      responsibilities: [
        {
          title: "Vision & Roadmap",
          description: "Définition stratégique et priorisation (OKRs, RICE)."
        },
        {
          title: "Gestion Agile",
          description: "SCRUM/SAFe avec équipes multiculturelles."
        },
        {
          title: "Stakeholders",
          description: "Comités de pilotage (BNP, BPI, Microsoft Startups)."
        },
        {
          title: "Performance",
          description: "KPIs et dashboards mesurant adoption/ROI."
        },
        {
          title: "UX & Tests",
          description: "50+ sessions utilisateurs et itérations."
        }
      ],
      
      crisisTitle: "Pivot stratégique",
      crisisDescription: "Suite au départ du CTO: réorganisation en 72h, reprioritisation du backlog et pivot vers un modèle B2B ciblant les organismes de certification.",
      
      approachTitle: "Méthodologie",
      approachDescription: "Approche hybride business/technique:",
      approachItems: [
        "Priorisation RICE & MoSCoW",
        "Design thinking UX",
        "CI/CD & Itérations rapides",
        "Data-driven decision making"
      ],
      approachConclusion: "Équilibre entre vision stratégique et exécution technique.",
      
      // Résultats section
      resultsTitle: "Impact Business",
      resultsSubtitle: "Résultats tangibles & ROI mesurable",
      resultsDescription: "YVEA a transformé les processus de certification export avec impacts quantifiés:",
      businessResults: [
        {
          metric: "80%",
          description: "Réduction du temps de traitement (2-5 jours → 4-5 heures)"
        },
        {
          metric: "40%",
          description: "Économies sur les coûts opérationnels"
        },
        {
          metric: "99%",
          description: "Précision des vérifications automatisées (OCR + IA)"
        },
        {
          metric: "3X",
          description: "Augmentation du volume de certificats traités quotidiennement"
        }
      ],
      
      techResults: [
        {
          title: "Architecture Cloud Native",
          description: "100% AWS (ECS, Lambda, S3), CI/CD automatisé"
        },
        {
          title: "IA & Machine Learning",
          description: "OCR + OpenAI GPT-4 pour prévalidation automatique"
        },
        {
          title: "Sécurité & Conformité",
          description: "ISO 27001, RGPD, 0 vulnérabilité critique"
        }
      ],
      
      feedbackTitle: "Retours clients",
      feedbackQuote: "YVEA a révolutionné notre département export en éliminant les erreurs et en accélérant les délais de 80%, nous permettant de doubler notre capacité sans personnel supplémentaire.",
      
      testimonialsTitle: "Avis utilisateurs",
      testimonials: [
        { name: "L. Ragaigne", role: "Export Sales Administrator, Danube International", text: "Une solution simple mais puissante pour les exportateurs. Merci YVEA !" },
        { name: "M. Djhanine", role: "Responsable Commerciale, Bureau Veritas", text: "Une plateforme intuitive et rapide. Je recommande !" },
        { name: "S. Dael", role: "Export Coordinator, MIDAS", text: "Pas de perte de temps sur le dossier d'inspection documentaire, YVEA se charge de tout !" },
        { name: "J-C Theureau", role: "KAM Program CoC, SGS", text: "Les réponses sont claires, fiables et permettent une réelle montée en compétences, même sur les sujets nichés de l'export." }
      ],
      
      // Leçons apprises section
      lessonsTitle: "Leçons Apprises",
      lessonsChallenges: [
        {
          title: "Recul stratégique",
          description: "Rétrospectives et ateliers de cadrage transformant les échecs en opportunités d'ajustement, maintenant la roadmap alignée aux enjeux métier."
        },
        {
          title: "Écoute active",
          description: "Cycles de feedback réguliers (interviews, tests, stand-ups) enrichissant la vision produit, anticipant les risques et renforçant l'adhésion collective."
        },
        {
          title: "Décloisonnement",
          description: "Workshops cross-fonctionnels (développeurs, designers, commerciaux, experts) accélérant les décisions et garantissant la cohérence fonctionnelle."
        },
        {
          title: "Culture collaborative",
          description: "Pairing, revues de code et \"brown-bag lunch\" renforçant les compétences collectives et créant un environnement fondé sur la confiance."
        },
        {
          title: "Mentorat ciblé",
          description: "Coaching de juniors via one-to-one, plans de formation et suivi OKRs, multipliant autonomie et implication des équipes."
        }
      ],
      
      // Compétences section
      skillsTitle: "Compétences mobilisées",
      skillsCategories: [
        {
          title: "🧭 Vision & Leadership",
          skills: [
            "Stratégie produit: Alignement roadmap/ROI selon méthodologie OKR",
            "Leadership multiculturel: Gestion d'équipes à distance France/Pakistan/Argentine",
            "Strategic thinking: Analyse de marchés et identification d'opportunités de disruption"
          ]
        },
        {
          title: "⚙️ Delivery & Process",
          skills: [
            "Méthodologies Agile: SCRUM, SCRUMBAN, RICE, MoSCoW",
            "Pilotage data-driven: Dashboards et KPIs pour le suivi en temps réel",
            "Gestion de crise: Résolution de blocages critiques, pivots stratégiques sous contrainte"
          ]
        },
        {
          title: "☁️ Expertise Technologique",
          skills: [
            "Architecture moderne: Stack MERN, AWS, Terraform",
            "IA avancée: Azure OpenAI, GPT-4 fine-tuning, OCR avec Tesseract",
            "DevOps: CI/CD, sécurité by design, infrastructure as code"
          ]
        }
      ],
      
      // Conclusion
      conclusionTitle: "Résultats d'impact business",
      conclusionText: "En tant que Digital Product Manager, j'ai dirigé cette transformation digitale qui a généré 80% de gain de temps opérationnel et 40% d'économies pour nos clients. Cette approche alliant expertise produit (RICE, MoSCoW, Agile) et vision technologique (AI, OCR, cloud-native) correspond précisément aux profils recherchés par les Big Four et les leaders technologiques.",
      futureTitle: "Ma vision produit future",
      futureText: "Ma vision produit intègre maintenant les technologies blockchain pour la traçabilité et les modèles IA génératifs pour l'auto-correction documentaire. Je recherche des environnements complexes où appliquer cette expertise pour transformer des défis business en opportunités digitales à fort impact métrique.",
      callToAction: "Discutons de votre prochain défi transformationnel",
      callToActionSubtext: "Je suis Digital Product Manager spécialisé en transformation digitale et intégration IA.",
      feedbackAuthor: "Directeur des Opérations, organisme de certification"
    },
    en: {
      heroTitle: "AI-Powered Export Certification Automation",
      heroSubtitle: "80% operational time savings through SaaS solution for Africa and Middle East",
      intro: "AI-driven SaaS solution transforming export certification processes, reducing processing times from 2-5 days to 4-5 hours through advanced OCR, intelligent EDM, and fine-tuned GPT-4 models.",
      contextTitle: "Project Context",
      beforeTitle: "BEFORE",
      beforeContent: "The traditional VoC certification process is currently hampered by multiple manual tasks: repeated verifications, submissions, follow-ups, and constant back-and-forth between teams. This lack of coordination leads to processing times of 2-5 days, generating notable frustration among clients and internal efficiency loss.",
      bridgeTitle: "BRIDGE",
      bridgeContent: "YVEA addresses this challenge by automating the entire process end-to-end. With an integrated platform combining OCR, EDM, and AI, YVEA coordinates verifications, provides immediate feedback in case of anomalies, and automatically structures required documents.",
      afterTitle: "AFTER",
      afterContent: "This transformation improves accuracy by 90%, accelerates certification (from days to hours), and offers a significant competitive advantage by reducing not only delays but also operational costs by 40%.",
      visualizationText: "Interactive visualization: Compare workflows [Without YVEA] vs [With YVEA]",
      evolutionTitle: "Project Evolution",
      evolutionSubtitle: "From conceptualization to industrialized AI SaaS solution in 6 key stages",
      phases: [
        {
          year: "2022",
          title: "Specifications & Funding Research",
          description: "Validation of the YVEA concept and demonstration of its economic viability by precisely defining the needs of the export certification market.",
          impact: "Validation of the project vision and securing initial funding of €40K from BNP Paribas",
          icon: <HiDocumentText size={20} />,
          tags: ["#BusinessModel", "#PitchDeck", "#Funding"],
          objective: "Validate the YVEA concept and demonstrate its economic viability by precisely defining the needs of the export certification market.",
          approach: "Creation of a Business Model Canvas, development of a comprehensive business plan, creation of a pitch deck and detailed specifications, including financial forecasts and ROI estimates.",
          resources: "Market information gathering, collaboration with sector and financial experts, and drafting of solid strategic documents to prepare a convincing case."
        },
        {
          year: "2022-Q2",
          title: "Prototyping & Incubation",
          description: "Design of an interactive mockup on Figma and revision of the pitch deck to clearly present the value proposition to partners and incubators.",
          impact: "Securing a €30K innovation grant via Paris Innovation Amorçage and a $15K AWS credit",
          icon: <HiCurrencyDollar size={20} />,
          tags: ["#Prototyping", "#UX/UI", "#Incubation"],
          objective: "Transform the idea into a visual and tangible concept to convince incubators and secure new funding.",
          approach: "Design of an interactive mockup on Figma and revision of the pitch deck to clearly present the value proposition to partners and incubators.",
          resources: "Collaboration with a Parisian design agency to create a modern and aesthetic interface, and participation in the Pepinière27 incubator to strengthen the project's credibility."
        },
        {
          year: "2022-Q3/Q4",
          title: "Initial MVP Development",
          description: "MVP development using the MERN stack with SCRUM organization in 2-week sprints, including pilot testing phases with a panel of 50 users.",
          impact: "Launch of a validated MVP, demonstrating technical feasibility and functional interest in the solution",
          icon: <HiOfficeBuilding size={20} />,
          tags: ["#MVP", "#MERN", "#SCRUM"],
          objective: "Rapidly develop a first functional version to test adoption by early users.",
          approach: "MVP development using the MERN stack with SCRUM organization in 2-week sprints, including pilot testing phases with a panel of 50 users.",
          resources: "Technical team formation with Franco-Pakistani developers (CTO and fullstack developer), JavaScript development and AWS deployment for rapid implementation."
        },
        {
          year: "2023-Q1/Q2",
          title: "Iterations & Refactoring",
          description: "Intensive feedback collection from users and certification bodies, followed by complete refactoring (JavaScript to TypeScript) and UX/UI improvements.",
          impact: "Significant improvement in stability, security and fluidity of the solution",
          icon: <HiCode size={20} />,
          tags: ["#Refactoring", "#TypeScript", "#UserFeedback"],
          objective: "Optimize the MVP by incorporating user feedback and strengthening its technical robustness to better meet market needs.",
          approach: "Intensive collection of feedback from users and certification bodies, followed by complete refactoring (JavaScript to TypeScript) and UX/UI improvements.",
          resources: "Implementation of daily standups, use of Agile methodologies (SCRUM, RICE, MoSCoW) for feature prioritization and close collaboration with stakeholders to refine the solution."
        },
        {
          year: "2023-Q3/Q4",
          title: "Industrialization & V1 Launch",
          description: "Additional fundraising (€50K obtained via BNP), complete technical architecture redesign and UI/UX improvement, including the integration of a partner services marketplace.",
          impact: "Successful launch of V1, with a stable and scalable solution opening new international opportunities",
          icon: <HiRefresh size={20} />,
          tags: ["#Scaling", "#V1", "#Marketplace"],
          objective: "Transform the prototype into an industrial product capable of supporting rapid growth and international expansion.",
          approach: "Additional fundraising (€50K obtained from BNP), complete technical architecture redesign (full migration to AWS, Terraform implementation, enhanced security, cache optimization) and UI/UX improvement, including partner services marketplace integration.",
          resources: "Collaboration with a team of Franco-Argentine developers, adoption of SCRUMBAN methodology for rigorous deliverable tracking and implementation of best deployment practices to ensure scalability and platform security."
        },
        {
          year: "2024-2025",
          title: "Strategic Pivot & V2 Launch",
          description: "Based on in-depth interviews with certification bodies, development of an automatic pre-verification engine with intelligent document type detection and AI analysis via fine-tuned GPT-4.",
          impact: "Drastic reduction in verification time (from several hours to less than 5 minutes) and document quality improvement",
          icon: <HiGlobeAlt size={20} />,
          tags: ["#AI", "#GPT4", "#StrategicPivot"],
          objective: "Address the critical needs of certification bodies by automating initial test report analysis while streamlining communication between users and administrators.",
          approach: "Based on in-depth interviews with certification bodies, development of an automatic pre-verification engine with components including document type detection, intelligent text extraction via Mammoth.js/PDFReader/Tesseract, and structured prompts to fine-tuned GPT-4.",
          resources: "Implementation of a backend API orchestrating all modules, use of Azure OpenAI technologies to ensure evaluation relevance, and development of an integrated chat system to improve reactivity and communication between admin and user."
        }
      ],
      // Roles section
      pmRoleTitle: "My Role as Digital Product Manager",
      pmRoleSubtitle: "Orchestrating digital transformation on an international scale with Agile/SAFe",
      pmRoleDescription: "As Digital PM & PO, I led YVEA from vision to execution by coordinating 3 international teams (12 developers), while managing a €200K budget and applying SCRUM, RICE and MoSCoW methodologies. My product expertise enabled delivering all 6 phases on time and within budget.",
      
      responsibilitiesTitle: "Key Responsibilities",
      responsibilities: [
        {
          title: "Product roadmap definition",
          description: "Development and prioritization of features through cross-functional workshops and OKRs."
        },
        {
          title: "Agile Leadership",
          description: "Management of SCRUM/SCRUMBAN teams (CTO, devs, UI/UX), sprint planning and daily stand-ups."
        },
        {
          title: "Stakeholder management",
          description: "Steering committee briefings (BNP, BPI, Microsoft for Startups, incubators)."
        },
        {
          title: "Performance monitoring",
          description: "Implementation of KPIs (timelines, adoption, satisfaction) and Power BI dashboards."
        },
        {
          title: "Quality & user testing",
          description: "Coordination of over 50 test sessions, feedback loops and corrective action plans."
        }
      ],
      
      crisisTitle: "Crisis Management: Successful Strategic Pivot",
      crisisDescription: "Faced with the unexpected departure of a CTO and a tight investment context, I reorganized the team within 72 hours, reprioritized the backlog and pivoted to a B2B model targeting certification bodies, thus saving the project and opening new business opportunities.",
      
      approachTitle: "Methodological Approach",
      approachDescription: "I combine a strategic product vision with pragmatic field management:",
      approachItems: [
        "Short feedback cycles (MoSCoW, RICE)",
        "UX-centered design thinking",
        "Robust technical iterations (TypeScript, CI/CD)",
        "Continuous alignment between business value and technical execution"
      ],
      approachConclusion: "This dual requirement ensures a balance between speed, quality and measurable business value.",
      
      // Results section
      resultsTitle: "Key Results & Impact",
      resultsCategories: [
        { title: "Operational", value: "80%", description: "Delay reduction", detail: "From 2-5 days to 4-5 hours thanks to AI automation" },
        { title: "Financial", value: "€200K", description: "Initial funding", detail: "BNP loan €40K, BPI grant €30K and AWS credit $15K" },
        { title: "Adoption", value: "100+", description: "Strategic accounts", detail: "Deployment to over 100 clients including 20% international" },
        { title: "Satisfaction", value: "95%", description: "Satisfaction rate", detail: "Measured among the first pilot users" }
      ],
      
      testimonialsTitle: "User Testimonials",
      testimonials: [
        { name: "L. Ragaigne", role: "Export Sales Administrator, Danube International", text: "A simple but powerful solution for exporters. Thank you YVEA!" },
        { name: "M. Djhanine", role: "Commercial Manager, Bureau Veritas", text: "An intuitive and fast platform. I recommend it!" },
        { name: "S. Dael", role: "Export Coordinator, MIDAS", text: "No time wasted on the documentary inspection file, YVEA takes care of everything!" },
        { name: "J-C Theureau", role: "KAM Program CoC, SGS", text: "The responses are clear, reliable and allow for real skills development, even on niche export topics." }
      ],
      
      // Lessons learned section
      lessonsTitle: "Lessons Learned",
      lessonsChallenges: [
        {
          title: "Strategic perspective",
          description: "Retrospectives and framing workshops transforming failures into adjustment opportunities, keeping the roadmap aligned with business challenges."
        },
        {
          title: "Active listening",
          description: "Regular feedback cycles (interviews, tests, stand-ups) enriching product vision, anticipating risks and strengthening collective buy-in."
        },
        {
          title: "Breaking silos",
          description: "Cross-functional workshops (developers, designers, sales, experts) accelerating decisions and ensuring functional coherence."
        },
        {
          title: "Collaborative culture",
          description: "Pairing, code reviews and brown-bag lunches strengthening collective skills and creating a trust-based environment."
        },
        {
          title: "Targeted mentoring",
          description: "Coaching juniors through one-on-ones, training plans and OKRs tracking, multiplying team autonomy and involvement."
        }
      ],
      
      // Skills section
      skillsTitle: "Skills Mobilized",
      skillsCategories: [
        {
          title: "🧭 Vision & Leadership",
          skills: [
            "Product strategy: Roadmap/ROI alignment according to OKR methodology",
            "Multicultural leadership: Remote team management France/Pakistan/Argentina",
            "Strategic thinking: Market analysis and identification of disruption opportunities"
          ]
        },
        {
          title: "⚙️ Delivery & Process",
          skills: [
            "Agile methodologies: SCRUM, SCRUMBAN, RICE, MoSCoW",
            "Data-driven management: Dashboards and KPIs for real-time monitoring",
            "Crisis management: Resolution of critical blockages, strategic pivots under constraint"
          ]
        },
        {
          title: "☁️ Technological Expertise",
          skills: [
            "Modern architecture: MERN stack, AWS, Terraform",
            "Advanced AI: Azure OpenAI, GPT-4 fine-tuning, OCR with Tesseract",
            "DevOps: CI/CD, security by design, infrastructure as code"
          ]
        }
      ],
      
      // Conclusion
      conclusionTitle: "Business Impact Results",
      conclusionText: "As Digital Product Manager, I led this digital transformation that generated 80% operational time savings and 40% cost reduction for our clients. This approach combining product expertise (RICE, MoSCoW, Agile) with technological vision (AI, OCR, cloud-native) precisely matches the profiles sought by the Big Four and technology leaders.",
      futureTitle: "My Future Product Vision",
      futureText: "My product vision now incorporates blockchain technologies for traceability and generative AI models for document self-correction. I am looking for complex environments where I can apply this expertise to transform business challenges into high-metric impact digital opportunities.",
      callToAction: "Let's discuss your next transformational challenge",
      callToActionSubtext: "I am a Digital Product Manager specialized in digital transformation and AI integration.",
      feedbackAuthor: "Directeur des Opérations, organisme de certification"
    }
  };
  
  const currentContent = content[locale as keyof typeof content];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[95vh] overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-blue-950">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>
        <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-[0.03] z-0 mix-blend-soft-light"></div>
        
        {/* Animated data mesh background */}
        <div className="absolute inset-0 z-0">
          <AdvancedDataMesh density={120} color="#6366f1" />
        </div>
        
        {/* Glowing orbs background effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 filter blur-[100px] z-0"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-violet-600/20 filter blur-[80px] z-0"></div>
        
        {/* Container principal */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
            
            {/* Content Column */}
            <motion.div 
              className="lg:col-span-6 xl:col-span-5 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge de catégorie */}
              <motion.div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-600/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-violet-300 text-sm font-medium">{locale === 'fr' ? "SaaS Enterprise" : "Enterprise SaaS"}</span>
                <span className="bg-indigo-400 h-1.5 w-1.5 rounded-full"></span>
                <span className="text-indigo-300 text-sm font-medium">{locale === 'fr' ? "IA & Certification" : "AI & Certification"}</span>
              </motion.div>
              
              {/* Titre avec hiérarchie visuelle */}
              <div className="space-y-2">
                <motion.h1
                  className="text-white font-extrabold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="block text-5xl md:text-7xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                    YVEA
                  </span>
                  <span className="block text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 max-w-md">
                    SaaS IA pour certification à l'export
                  </span>
                </motion.h1>
              </div>
              
              {/* Description avec animation */}
              <motion.p 
                className="text-lg text-indigo-200/90 max-w-xl leading-relaxed mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {locale === 'fr' 
                  ? "80% de réduction des délais de certification export grâce à l'IA, l'OCR et l'automatisation des processus"
                  : "80% reduction in export certification delays through AI, OCR and process automation"}
              </motion.p>
            </motion.div>
            
            {/* Visualisation interactive - colonne droite */}
            <motion.div
              className="lg:col-span-6 xl:col-span-7 relative h-[500px] hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative h-full w-full">
                {/* Effet de halo lumineux */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[90%] h-[90%]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-indigo-500/20 rounded-full blur-[50px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-violet-500/30 rounded-full blur-[30px]" />
                  </div>
                </div>
                
                {/* Globe digital avec animations améliorées */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-[90%] h-[90%]"
                    animate={{ 
                      rotateZ: [0, 5, 0, -5, 0],
                      scale: [1, 1.02, 1, 0.98, 1]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      repeatType: 'loop',
                      ease: 'easeInOut'
                    }}
                  >
                    <DigitalGlobe />
                  </motion.div>
                </div>
                
                {/* Points de données animés sur le globe */}
                {[
                  { top: '25%', left: '30%', size: 'w-4 h-4', delay: 0 },
                  { top: '60%', left: '70%', size: 'w-3 h-3', delay: 0.5 },
                  { top: '40%', left: '80%', size: 'w-2 h-2', delay: 1 },
                  { top: '70%', left: '40%', size: 'w-3 h-3', delay: 1.5 },
                  { top: '20%', left: '60%', size: 'w-2 h-2', delay: 2 }
                ].map((point, idx) => (
                  <motion.div 
                    key={idx}
                    className={`absolute ${point.size} rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50 z-20`}
                    style={{ top: point.top, left: point.left }}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(99, 102, 241, 0.7)',
                        '0 0 0 10px rgba(99, 102, 241, 0)',
                        '0 0 0 0 rgba(99, 102, 241, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: point.delay
                    }}
                  />
                ))}
                
                {/* Lignes de connexion */}
                {[
                  { x1: '30%', y1: '25%', x2: '70%', y2: '60%' },
                  { x1: '70%', y1: '60%', x2: '80%', y2: '40%' },
                  { x1: '30%', y1: '25%', x2: '60%', y2: '20%' },
                  { x1: '40%', y1: '70%', x2: '70%', y2: '60%' }
                ].map((line, idx) => (
                  <motion.div 
                    key={idx}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1 + idx * 0.3, duration: 0.5 }}
                  >
                    <svg className="absolute top-0 left-0 w-full h-full">
                      <motion.line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(99, 102, 241, 0.5)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 1 + idx * 0.3 
                        }}
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Indicateur de scroll */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pb-2">
            <ScrollIndicator />
          </div>
        </div>
      </div>
      
      {/* Project Context - Version GAFAM */}
      <div id="project-context" className="container mx-auto px-4 py-24">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-950 shadow-xl">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.02] z-0"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-indigo-100/20 to-transparent dark:from-indigo-900/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-100/20 to-transparent dark:from-blue-900/10 blur-[100px] rounded-full"></div>
            
            {/* Section Header */}
            <div className="relative z-10 p-8 md:p-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-20"
              >
                <span className="inline-block text-xs font-medium tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-4">
                  {locale === 'fr' ? "Transformation & Valeur Métier" : "Transformation & Business Value"}
                </span>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                  {currentContent.contextTitle}
                </h2>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
                  {locale === 'fr' 
                    ? "Une réinvention digitale complète du processus de certification"
                    : "A complete digital reinvention of the certification process"}
                </p>
              </motion.div>
              
              {/* Process Transformation Cards */}
              <div className="max-w-6xl mx-auto relative">
                {/* Connected line between cards */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-300 via-indigo-400 to-emerald-300 dark:from-red-700 dark:via-indigo-600 dark:to-emerald-500 transform -translate-y-1/2 z-0 hidden md:block"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                  {/* BEFORE card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-white dark:from-red-950/20 dark:to-gray-900 opacity-70"></div>
                      
                      {/* Top accent bar */}
                      <div className="h-1.5 w-full bg-red-500 dark:bg-red-600"></div>
                      
                      <div className="relative p-8 flex flex-col h-full">
                        <div className="flex items-center mb-6">
                          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </span>
                          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                            {currentContent.beforeTitle}
                          </h3>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-8">
                          {currentContent.beforeContent}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-end gap-1.5">
                            <span className="text-3xl font-bold text-red-600 dark:text-red-400">2-5</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">{locale === 'fr' ? "jours" : "days"}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {locale === 'fr' ? "Temps de traitement moyen" : "Average processing time"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* BRIDGE card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="group md:mt-10"
                  >
                    <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900 opacity-70"></div>
                      
                      {/* Top accent bar */}
                      <div className="h-1.5 w-full bg-indigo-500 dark:bg-indigo-600"></div>
                      
                      <div className="relative p-8 flex flex-col h-full">
                        <div className="flex items-center mb-6">
                          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                          </span>
                          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                            {currentContent.bridgeTitle}
                          </h3>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-8">
                          {currentContent.bridgeContent}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex flex-wrap gap-2">
                            {['OCR', 'GED', 'IA', 'Automation'].map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* AFTER card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-900 opacity-70"></div>
                      
                      {/* Top accent bar */}
                      <div className="h-1.5 w-full bg-emerald-500 dark:bg-emerald-600"></div>
                      
                      <div className="relative p-8 flex flex-col h-full">
                        <div className="flex items-center mb-6">
                          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mr-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                          </span>
                          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                            {currentContent.afterTitle}
                          </h3>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-8">
                          {currentContent.afterContent}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-end gap-1.5">
                            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">4-5</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">{locale === 'fr' ? "heures" : "hours"}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {locale === 'fr' ? "Temps de traitement moyen" : "Average processing time"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Interactive visualization - Redesigned */}
              <motion.div 
                className="mt-24 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center justify-center mb-12">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </span>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    {currentContent.visualizationText}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl text-center">
                    {locale === 'fr' 
                      ? "Explorez la transformation du processus de certification et découvrez comment YVEA réduit drastiquement les délais tout en améliorant la précision."
                      : "Explore the certification process transformation and discover how YVEA drastically reduces processing time while improving accuracy."}
                  </p>
                </div>
                
                {/* Tabs for before/after selection - Elegant design */}
                <div className="mb-10 flex justify-center">
                  <div className="inline-flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <button
                   
                      className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTab === 0 
                          ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                      onClick={() => setSelectedTab(0)}
                    >
                      {locale === 'fr' ? "Sans YVEA" : "Without YVEA"}
                    </button
                  >
                    <button 
                      className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTab === 1 
                          ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                      onClick={() => setSelectedTab(1)}
                    >
                      {locale === 'fr' ? "Avec YVEA" : "With YVEA"}
                    </button>
                  </div>
                </div>
                
                {/* Clickable image container - Redesigned */}
                <div className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden select-none border border-gray-200 dark:border-gray-800 shadow-sm"
                    style={{ height: isExpanded ? '80vh' : '300px', transition: 'height 0.3s ease-in-out' }}
                >
                  {/* Before image */}
                  {selectedTab === 0 && (
                    <div className="relative h-full w-full cursor-pointer" onClick={toggleExpand}>
                      <Image 
                        src="/downloads/Current flow.png" 
                        alt="Current certification process flow" 
                        fill 
                        className={`object-contain ${isExpanded ? 'object-scale-down' : 'object-cover object-center'}`}
                      />
                      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 px-3 py-1 rounded-md text-sm font-medium shadow-sm border border-gray-100 dark:border-gray-700">
                        {locale === 'fr' ? "Sans YVEA" : "Without YVEA"}
                      </div>
                      
                      {/* Expand/collapse indicator */}
                      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                        {isExpanded ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 15l7-7 7 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* After image */}
                  {selectedTab === 1 && (
                    <div className="relative h-full w-full cursor-pointer" onClick={toggleExpand}>
                      <Image 
                        src="/downloads/New flow.png" 
                        alt="New certification process with YVEA" 
                        fill 
                        className={`object-contain ${isExpanded ? 'object-scale-down' : 'object-cover object-center'}`}
                      />
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-md text-sm font-medium shadow-sm border border-gray-100 dark:border-gray-700">
                        {locale === 'fr' ? "Avec YVEA" : "With YVEA"}
                      </div>
                      
                      {/* Expand/collapse indicator */}
                      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                        {isExpanded ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 15l7-7 7 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Hint text */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-xs font-medium shadow-sm border border-gray-100 dark:border-gray-700 z-30 pointer-events-none">
                    {locale === 'fr' ? "Cliquez pour agrandir l'image" : "Click to expand image"}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Key metrics */}
            <div className="relative z-10 bg-gradient-to-b from-blue-950/0 to-blue-950/80 p-8 md:p-6">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">90%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Amélioration de la précision" : "Accuracy improvement"}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">40%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Coûts opérationnels réduits" : "Reduced operational costs"}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">95%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Réduction des erreurs" : "Error reduction"}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">85%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Efficacité des processus" : "Process efficiency"}</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Project Evolution Timeline */}
      <div id="project-evolution" className="container mx-auto px-4 py-8">
        <AnimatedSection className="mb-16">
          <div id="project-evolution" className="bg-white rounded-xl shadow-lg p-8 overflow-hidden">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                {currentContent.evolutionTitle}
              </h2>
              <p className="text-lg text-gray-600">{currentContent.evolutionSubtitle}</p>
            </div>
            
            <EnhancedTimeline phases={currentContent.phases} />
          </div>
        </AnimatedSection>
        
        {/* Fonctionnalités clés d'YVEA Section */}
        <AnimatedSection className="mb-16">
          <div id="key-features" className="bg-white rounded-xl shadow-lg p-8 overflow-hidden">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Fonctionnalités clés d'YVEA
              </h2>
              <p className="text-lg text-gray-600">Découvrez les technologies innovantes d'YVEA à travers des démonstrations interactives</p>
            </div>
            
            {/* Features Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* OCR Card */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">OCR et Extraction</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Computer Vision</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">ML</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Extraction</span>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm">Extraction automatique de données structurées depuis vos documents commerciaux.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Découvrir cette fonctionnalité
                  </button>
                </div>
              </motion.div>
              
              {/* AI Assistant Card */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Assistant IA</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">NLP</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">LLM</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">RAG</span>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm">Expert virtuel pour répondre à toutes vos questions sur la réglementation export.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
                    Découvrir cette fonctionnalité
                  </button>
                </div>
              </motion.div>
              
              {/* Messagerie Card */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2 * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Messagerie Collaborative</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">WebSockets</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Temps réel</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Collaboration</span>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm">Système de communication instantanée avec collaboration documentaire et gestion d'état partagé.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                    Découvrir cette fonctionnalité
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* My Role as PM/PO */}
        <AnimatedSection className="mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-10 -translate-y-20 z-0"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-x-10 translate-y-20 z-0"></div>
            
            {/* Header section */}
            <div className="relative z-10 mb-10 border-b border-gray-200 dark:border-gray-700 pb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    {locale === 'fr' ? "Digital Product Manager" : "Digital Product Manager"}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentContent.pmRoleTitle}
                  </h2>
                  <p className="text-primary font-semibold">
                    {currentContent.pmRoleSubtitle}
                  </p>
                </div>
                
                <div className="bg-primary/10 dark:bg-primary/20 px-5 py-3 rounded-lg text-center">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">3</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Équipes</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Devs</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">200K€</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Budget</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main role description */}
            <div className="relative z-10 mb-10">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {locale === 'fr' 
                 ? "En tant que Digital Product Manager, j'ai piloté YVEA de la vision à l'exécution : coordination de 3 équipes internationales (12 développeurs), gestion d'un budget de 200K€, et application des méthodologies SCRUM/SAFe, RICE et MoSCoW. Résultat : livraison des 6 phases dans les délais et un gain de 80% sur les temps opérationnels."
                 : "As Digital Product Manager, I led YVEA from vision to execution: coordinating 3 international teams (12 developers), managing a €200K budget, and applying SCRUM/SAFe, RICE and MoSCoW methodologies. Result: delivery of all 6 phases on time with 80% operational time savings."}
              </p>
            </div>
            
            {/* Key responsibilities section */}
            <div className="relative z-10 mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Responsabilités clés & réalisations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Roadmap & croissance */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Roadmap & croissance</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Défini la feuille de route produit (OKRs) et piloté l'acquisition de 0 à 100+ clients B2B (20% à l'international).
                  </p>
                </div>
                
                {/* Agilité & pilotage */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Agilité & pilotage</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Animé des équipes SCRUM/SCRUMBAN multiculturelles (FR/PK/AR) et orchestré les comités de pilotage (BNP, BPI, Microsoft for Startups).
                  </p>
                </div>
                
                {/* Données & qualité */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Données & qualité</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Mis en place des dashboards Power BI, conduit 50+ sessions de tests utilisateurs et réduit les délais de 80% et les coûts de 40%.
                  </p>
                </div>
                
                {/* Gestion de crise */}
                <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-xl shadow-sm border border-primary/30 dark:border-primary/40">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Gestion de crise</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Réorganisé l'équipe en 72h après le départ du CTO, opéré un pivot vers le B2B et sauvé le projet.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Technical expertise section */}
            <div className="relative z-10 mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Expertise technique & méthodologique
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Architecture & DevOps */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="text-xl font-bold text-primary mr-2">🧭</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Architecture & DevOps</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Conception d'une stack MERN cloud-native (AWS, Terraform), CI/CD et sécurité by design.
                  </p>
                </div>
                
                {/* IA & automatisation */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="text-xl font-bold text-primary mr-2">⚙️</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">IA & automatisation</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Implémentation d'OCR/Tesseract et fine-tuning GPT-4 via Azure OpenAI pour l'extraction documentaire.
                  </p>
                </div>
                
                {/* Process & pilotage */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="text-xl font-bold text-primary mr-2">☁️</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Process & pilotage data-driven</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Leadership agile (SCRUM, RICE, MoSCoW, Design Thinking) et suivi via KPIs/rapports.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Lessons learned section */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Leçons apprises
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Recul stratégique</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Transformer les échecs en opportunités d'ajustement via rétrospectives régulières.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Écoute active</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Cycles de feedback enrichissant la vision produit et anticipant les risques.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Décloisonnement</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Workshops cross-fonctionnels accélérant les décisions et garantissant la cohérence.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Culture collaborative</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Pairing et revues de code renforçant les compétences collectives.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Mentorat ciblé</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Coaching de juniors via one-to-one et OKRs personnalisés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Results & Impact Section */}
        <AnimatedSection className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {currentContent.resultsTitle}
              </h2>
              <p className="text-lg text-gray-600">{locale === 'fr' ? "Des indicateurs clairs qui illustrent la valeur créée par YVEA" : "Clear indicators showing the value created by YVEA"}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray th-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                  Opérationnel
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">80%</div>
                <div className="font-medium text-gray-800 mb-1">Gain de temps opérationnel</div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray th-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                  Économique
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">40%</div>
                <div className="font-medium text-gray-800 mb-1">Réduction des coûts</div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray th-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2 * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                  Adoption
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">100+</div>
                <div className="font-medium text-gray-800 mb-1">Comptes stratégiques</div>
                <div className="text-sm text-gray-600">20% à l'international</div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray th-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 3 * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                  Satisfaction
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">95%</div>
                <div className="font-medium text-gray-800 mb-1">Taux de satisfaction</div>
              </motion.div>
            </div>
            
            {/* Testimonials */}
            <h3 className="text-xl font-bold mb-6 text-gray-800">{currentContent.testimonialsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0 * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="text-lg font-bold">L</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-400 mb-1">★★★★★</div>
                    <p className="italic text-gray-700 mb-2 leading-relaxed">"Une solution simple mais puissante pour les exportateurs. Merci YVEA !"</p>
                    <div className="text-sm font-bold text-gray-800">L. Ragaigne – Danube International</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="text-lg font-bold">M</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-400 mb-1">★★★★★</div>
                    <p className="italic text-gray-700 mb-2 leading-relaxed">"Une plateforme intuitive et rapide. Je recommande !"</p>
                    <div className="text-sm font-bold text-gray-800">M. Djhanine – Bureau Veritas</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2 * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="text-lg font-bold">S</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-400 mb-1">★★★★★</div>
                    <p className="italic text-gray-700 mb-2 leading-relaxed">"Pas de perte de temps sur le dossier d'inspection documentaire, YVEA se charge de tout !"</p>
                    <div className="text-sm font-bold text-gray-800">S. Dael – MIDAS</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 3 * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="text-lg font-bold">J</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-400 mb-1">★★★★★</div>
                    <p className="italic text-gray-700 mb-2 leading-relaxed">"Les réponses sont claires, fiables et permettent une réelle montée en compétences, même sur les sujets nichés de l'export."</p>
                    <div className="text-sm font-bold text-gray-800">J-C Theureau – SGS</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Conclusion Section */}
        <AnimatedSection className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Call to action section */}
            <div className="bg-gray-900 rounded-xl p-6 text-center shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-4">{currentContent.callToAction}</h2>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">{currentContent.callToActionSubtext}</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <AnimatedButton 
                  href="https://calendly.com/elmasrymoamen/30min"
                  variant="primary"
                  size="lg"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {locale === 'fr' ? "Réserver un échange" : "Book a meeting"}
                </AnimatedButton>
                
                <AnimatedButton 
                  href="mailto:contact@moamenelmasry.com"
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  {locale === 'fr' ? "Email direct" : "Direct email"}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default YVEAProjectContent;