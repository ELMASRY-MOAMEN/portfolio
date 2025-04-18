'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/layout/AnimatedSection';
import AnimatedButton from '@/components/ui/animated-button';
import Image from 'next/image';
import { HiDocumentText, HiCurrencyDollar, HiOfficeBuilding, HiCode, HiRefresh, HiGlobeAlt } from 'react-icons/hi';
import DigitalGlobe from './DigitalGlobe';
import ParticleFlowAnimation from './ParticleFlowAnimation';

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
                      <p className="text-gray-700 mb-4">{phase.objective || phase.description}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Démarche:' : 'Approach:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.approach || (locale === 'fr' 
                         ? "Approche itérative centrée sur les besoins utilisateurs, avec des cycles de feedback réguliers."
                         : "Iterative approach centered on user needs, with regular feedback cycles.")}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Moyens:' : 'Resources:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.resources || (locale === 'fr'
                         ? "Ressources techniques et humaines dédiées, outils collaboratifs, et méthodologies agiles."
                         : "Dedicated technical and human resources, collaborative tools, and agile methodologies.")}</p>
                      
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
  const { locale } = useTranslation();
  
  // Content based on selected language
  const content = {
    fr: {
      heroTitle: "YVEA – Le SaaS qui révolutionne la certification export",
      heroSubtitle: "Transform | Automate | Scale: Réduction de 80% des délais de traitement documentaire grâce à l'IA avancée, pour une adoption par 100+ entreprises internationales.",
      intro: "Découvrez la première plateforme qui automatise de bout en bout la certification des marchandises destinées à l'Afrique et au Moyen-Orient, transformant des processus manuels en une expérience digitale ultra-rapide et fiable grâce à l'OCR, la GED et l'IA.",
      contextTitle: "Contexte du projet",
      beforeTitle: "BEFORE",
      beforeContent: "Le processus traditionnel de certification VoC est actuellement freiné par une multitude de tâches manuelles: vérifications répétées, envois, relances et allers-retours incessants entre les équipes. Ce manque de coordination entraîne des délais de traitement de 2 à 5 jours, générant une frustration notable chez les clients et une perte d'efficacité interne.",
      bridgeTitle: "BRIDGE",
      bridgeContent: "YVEA répond à ce défi en automatisant de bout en bout l'ensemble du processus. Grâce à une plateforme intégrée qui combine l'OCR, la GED et l'IA (similaire aux solutions d'entreprises comme Google Document AI), YVEA coordonne les vérifications, fournit des rétroactions immédiates en cas d'anomalie et structure automatiquement les pièces requises.",
      afterTitle: "AFTER",
      afterContent: "Cette transformation améliore la précision de 90%, accélère la certification (de jours à heures) et offre un avantage concurrentiel significatif, en réduisant non seulement les délais mais également les coûts opérationnels de 40%.",
      visualizationText: "Visualisation interactive: Comparez les flux de travail [Sans YVEA] vs [Avec YVEA]",
      evolutionTitle: "Évolution du projet",
      evolutionSubtitle: "De la conceptualisation à la solution SaaS IA industrialisée en 6 étapes clés",
      phases: [
        {
          year: "2022",
          title: "Cahier des Charges & Recherche de Financements",
          description: "Validation du concept de YVEA et démonstration de sa viabilité économique en définissant précisément les besoins du marché de la certification export.",
          impact: "Validation de la vision du projet et obtention d'un financement initial de 40K€ auprès de BNP Paribas",
          icon: <HiDocumentText size={20} />,
          tags: ["#BusinessModel", "#PitchDeck", "#Financement"],
          objective: "Valider le concept de YVEA et démontrer sa viabilité économique en définissant précisément les besoins du marché de la certification export.",
          approach: "Réalisation d'un Business Model Canvas, élaboration d'un business plan complet, création d'un pitch deck et constitution d'un cahier des charges détaillé, intégrant des prévisions financières et une estimation du retour sur investissement.",
          resources: "Collecte d'informations de marché, collaboration avec des experts sectoriels et financiers, et rédaction de documents stratégiques solides pour préparer un dossier convaincant."
        },
        {
          year: "2022-Q2",
          title: "Maquettage & Incubation",
          description: "Conception d'une maquette interactive sur Figma et révision du pitch deck afin de présenter clairement la proposition de valeur aux partenaires et incubateurs.",
          impact: "Obtention d'une subvention d'innovation de 30K€ via Paris Innovation Amorçage et d'un crédit AWS de 15K$",
          icon: <HiCurrencyDollar size={20} />,
          tags: ["#Prototyping", "#UX/UI", "#Incubation"],
          objective: "Transformer l'idée en concept visuel et tangible pour convaincre les incubateurs et obtenir de nouveaux financements.",
          approach: "Collaboration étroite avec designers UX/UI, réalisation d'un prototype interactif complet sur Figma, et présentations aux incubateurs parisiens.",
          resources: "Équipe design, outils de prototypage UX/UI, présentations pour incubateurs et investisseurs."
        },
        {
          year: "2022-Q3/Q4",
          title: "Développement Initial du MVP",
          description: "Développement du MVP en utilisant la stack MERN avec une organisation SCRUM en sprints de 2 semaines, incluant des phases de tests pilotes auprès d'un panel de 50 utilisateurs.",
          impact: "Lancement d'un MVP validé, démontrant la faisabilité technique et l'intérêt fonctionnel de la solution",
          icon: <HiOfficeBuilding size={20} />,
          tags: ["#MVP", "#MERN", "#SCRUM"],
          objective: "Développer rapidement une première version fonctionnelle pour tester l'adoption par les premiers utilisateurs.",
          approach: "Mise en place d'une organisation SCRUM avec sprints de 2 semaines, priorisation des fonctionnalités selon impact métier, et tests utilisateurs réguliers.",
          resources: "Équipe technique de 5 développeurs, stack MERN (MongoDB, Express, React, Node.js), méthodologie SCRUM, panel de testeurs."
        },
        {
          year: "2023-Q1/Q2",
          title: "Itérations & Refactorisation",
          description: "Recueil intensif de feedbacks auprès des utilisateurs et des organismes de certification, suivi d'une refactorisation complète (passage de JavaScript à TypeScript) et d'améliorations de l'UX/UI.",
          impact: "Amélioration significative de la stabilité, de la sécurité et de la fluidité de la solution",
          icon: <HiCode size={20} />,
          tags: ["#Refactoring", "#TypeScript", "#UserFeedback"],
          objective: "Stabiliser la plateforme et améliorer l'expérience utilisateur en se basant sur les retours clients.",
          approach: "Refactorisation technique complète avec migration vers TypeScript, mise en place de tests unitaires et d'intégration, et refonte de l'UX basée sur les données d'utilisation.",
          resources: "Équipe technique étendue, infrastructure de CI/CD, outils d'analytics pour mesurer l'utilisation et les points de friction."
        },
        {
          year: "2023-Q3/Q4",
          title: "Industrialisation & Lancement de la V1",
          description: "Levée de fonds supplémentaire (50K€ obtenus via BNP), refonte complète de l'architecture technique et amélioration de l'UI/UX, incluant l'intégration d'une marketplace de services partenaires.",
          impact: "Lancement réussi de la V1, avec une solution stable et scalable ouvrant de nouvelles opportunités internationales",
          icon: <HiRefresh size={20} />,
          tags: ["#Scaling", "#V1", "#Marketplace"],
          objective: "Transformer le MVP en produit industriel capable de supporter une croissance rapide et d'attirer des partenaires.",
          approach: "Réarchitecture technique pour assurer la scalabilité, optimisation des performances, renforcement de la sécurité, et développement d'interfaces partenaires.",
          resources: "Nouvelle levée de fonds, équipe technique internationale, infrastructure cloud avancée, et partenariats stratégiques."
        },
        {
          year: "2024-2025",
          title: "Pivot Stratégique & Lancement de la V2",
          description: "Basée sur des interviews approfondies avec des organismes de certification, développement d'un moteur de pré-vérification automatique avec détection intelligente du type de document et analyse IA via GPT-4 fine-tuné.",
          impact: "Réduction drastique du temps de vérification (de plusieurs heures à moins de 5 minutes) et amélioration de la qualité documentaire",
          icon: <HiGlobeAlt size={20} />,
          tags: ["#IA", "#GPT4", "#StrategicPivot"],
          objective: "Pivotement vers un modèle B2B ciblant les organismes de certification et intégration de l'IA avancée pour automatiser les tâches complexes.",
          approach: "Développement d'un modèle IA fine-tuné spécifiquement pour la certification documentaire, création d'APIs pour l'intégration avec les systèmes des organismes partenaires.",
          resources: "Partenariat avec Microsoft for Startups pour l'infrastructure Azure, équipe data science dédiée, corpus de documents d'entraînement pour l'IA."
        }
      ],
      // Lessons learned section
      lessonsTitle: "Leçons Apprises",
      lessonsDescription: "Les apprentissages clés qui ont façonné le succès du projet",
      challenges: [
        {
          title: "Prendre du recul stratégique",
          description: "Organiser régulièrement des rétrospectives et des ateliers de cadrage permet de transformer chaque échec ou dérive en opportunité d'ajustement, et de garantir que la roadmap reste alignée sur les enjeux métier."
        },
        {
          title: "Écoute active des utilisateurs et parties prenantes",
          description: "Instaurer des cycles de feedback fréquents (interviews, tests utilisateurs, stand-ups) enrichit la vision produit, anticipe les risques et favorise l'adhésion de chacun au projet."
        },
        {
          title: "Collaboration interfonctionnelle",
          description: "Briser les silos en animant des workshops réunissant développeurs, designers, commerciaux et experts certifiants a été décisif pour accélérer la prise de décision et garantir la cohérence fonctionnelle."
        },
        {
          title: "Culture d'entraide et de partage",
          description: "Mettre en place du pairing, des revues de code croisées et des sessions de \"brown-bag lunch\" a renforcé la montée en compétences de l'équipe et créé un esprit d'équipe fondé sur la confiance."
        },
        {
          title: "Mentorat et montée en compétence",
          description: "En tant que chef de projet, j'ai veillé à coacher mes juniors (alternants, stagiaires) via des one-to-one réguliers, des plans de formation ciblés et un suivi de leurs OKRs, ce qui a multiplié leur autonomie et leur implication."
        }
      ],
      keyLearnings: [
        {
          title: "Approche itérative",
          description: "L'importance du MVP et des cycles de feedback rapides avec les utilisateurs"
        },
        {
          title: "Valeur de l'expertise métier",
          description: "La combinaison de la connaissance technique et métier comme facteur clé de succès"
        },
        {
          title: "Équilibre vision/exécution",
          description: "Maintenir une vision claire tout en restant flexible dans l'exécution"
        },
        {
          title: "Priorisation stratégique",
          description: "Concentrer les ressources sur les fonctionnalités à plus fort impact"
        }
      ],
      pmRoleTitle: "Mon rôle de Project Manager & Product Owner",
      pmRoleSubtitle: "Orchestrer la transformation digitale à l'échelle internationale",
      pmRoleDescription: "En tant que Digital PM & PO, j'ai piloté YVEA de la vision à l'exécution en coordonnant 3 équipes internationales (12 développeurs), tout en gérant un budget de 200K€ et en appliquant les méthodologies Agile et SAFe. Mon expertise multidimensionnelle a permis de livrer les 6 phases du projet dans les délais et le budget impartis.",
      
      responsibilitiesTitle: "Responsabilités principales",
      responsibilities: [
        {
          title: "Définition de la roadmap produit",
          description: "Élaboration et priorisation des features via workshops cross-fonctionnels et OKRs."
        },
        {
          title: "Leadership Agile",
          description: "Animation d'équipes SCRUM/SCRUMBAN (CTO, devs, UI/UX), sprint planning et stand-ups quotidiens."
        },
        {
          title: "Gestion des parties prenantes",
          description: "Instruction des comités de pilotage (BNP, BPI, Microsoft for Startups, incubateurs)."
        },
        {
          title: "Suivi de la performance",
          description: "Mise en place de KPIs (timelines, adoption, satisfaction) et dashboards Power BI."
        },
        {
          title: "Qualité & tests utilisateurs",
          description: "Coordination de plus de 50 sessions de tests, feed-back loops et plans d'action correctifs."
        }
      ],
      
      crisisTitle: "Gestion de crise: Pivot stratégique réussi",
      crisisDescription: "Face au départ inattendu d'un CTO et à un contexte d'investissement tendu, j'ai réorganisé l'équipe en 72h, reprioritisé le backlog et pivoté vers un modèle B2B ciblant les organismes de certification, sauvant ainsi le projet et ouvrant de nouvelles opportunités commerciales.",
      
      approachTitle: "Approche méthodologique",
      approachDescription: "Je combine une vision produit stratégique avec un management terrain pragmatique:",
      approachItems: [
        "Cycles de feedback courts (MoSCoW, RICE)",
        "Design thinking centré UX",
        "Itérations techniques robustes (TypeScript, CI/CD)",
        "Alignement continu entre valeur business et exécution technique"
      ],
      approachConclusion: "Cette double exigence garantit un équilibre entre rapidité, qualité et valeur métier mesurable.",
      
      resultsTitle: "Résultats clés & Impact",
      resultsCategories: [
        { title: "Opérationnel", value: "80%", description: "Réduction des délais", detail: "De 2-5 jours à 4-5 heures grâce à l'automatisation IA" },
        { title: "Financier", value: "200 K€", description: "Financements initiaux", detail: "Prêt BNP 40K€, subvention BPI 30K€ et crédit AWS 15K$" },
        { title: "Adoption", value: "100+", description: "Comptes stratégiques", detail: "Déploiement sur plus de 100 clients dont 20% à l'international" },
        { title: "Satisfaction", value: "95%", description: "Taux de satisfaction", detail: "Mesuré auprès des premiers utilisateurs pilotes" }
      ],
      
      testimonialsTitle: "Avis utilisateurs",
      testimonials: [
        { name: "L. Ragaigne", role: "Export Sales Administrator, Danube International", text: "Une solution simple mais puissante pour les exportateurs. Merci YVEA !" },
        { name: "M. Djhanine", role: "Responsable Commerciale, Bureau Veritas", text: "Une plateforme intuitive et rapide. Je recommande !" },
        { name: "S. Dael", role: "Export Coordinator, MIDAS", text: "Pas de perte de temps sur le dossier d'inspection documentaire, YVEA se charge de tout !" },
        { name: "J-C Theureau", role: "KAM Program CoC, SGS", text: "Les réponses sont claires, fiables et permettent une réelle montée en compétences, même sur les sujets nichés de l'export." }
      ],
      
      skillsTitle: "Compétences mobilisées",
      skillsCategories: [
        {
          title: "🧭 Vision & Leadership",
          skills: [
            "Stratégie produit: Alignement roadmap/ROI selon méthodologie OKR (comme chez Google)",
            "Leadership multiculturel: Gestion d'équipes à distance France/Pakistan/Argentine",
            "Strategic thinking: Analyse de marchés et identification d'opportunités de disruption"
          ]
        },
        {
          title: "⚙️ Delivery & Process",
          skills: [
            "Certifications & frameworks: PRINCE2 Agile, SAFe, connaissance des méthodologies Six Sigma",
            "Pilotage data-driven: Dashboards Power BI, reporting automatisé et KPIs prédictifs",
            "Crisis management: Résolution de blocages critiques, pivots stratégiques sous contrainte"
          ]
        },
        {
          title: "☁️ Expertise Technologique",
          skills: [
            "Architecture moderne: Microservices, serverless, API-first design (comme chez AWS)",
            "IA avancée: RAG, fine-tuning GPT-4, vectorisation sémantique (Edge pour Data Governance)",
            "DevSecOps: Mise en place CI/CD, sécurité by design, IaC pour environnements multiples"
          ]
        }
      ],
      
      conclusionTitle: "Conclusion",
      conclusionText: "YVEA démontre ma capacité à diriger des transformations digitales complexes de A à Z, en combinant vision stratégique, excellence opérationnelle et leadership international. Cette approche full-stack du management de projet — alliant business acumen, compétences techniques et soft skills — correspond précisément aux profils recherchés par les Big Four, Google et les cabinets de recrutement d'élite.",
      futureTitle: "L'avenir de YVEA & mes prochains défis",
      futureText: "Dans sa prochaine itération, YVEA pourrait intégrer une blockchain pour la traçabilité des certifications et des modèles IA génératifs pour l'auto-correction documentaire. Je recherche désormais des environnements complexes où appliquer cette expertise pour transformer des défis business en opportunités digitales.",
      callToAction: "Discutons de votre prochain défi transformationnel",
      callToActionSubtext: "Je suis prêt à mettre cette double expertise business/tech au service de votre organisation."
    },
    en: {
      heroTitle: "YVEA – The SaaS Revolutionizing Export Certification",
      heroSubtitle: "Transform | Automate | Scale: 80% reduction in document processing time through advanced AI, adopted by 100+ international companies.",
      intro: "Discover the first platform that automates end-to-end certification of goods destined for Africa and the Middle East, transforming manual processes into an ultra-fast and reliable digital experience through OCR, EDM, and AI.",
      contextTitle: "Project Context",
      beforeTitle: "BEFORE",
      beforeContent: "The traditional VoC certification process is currently hampered by multiple manual tasks: repeated verifications, submissions, follow-ups, and constant back-and-forth between teams. This lack of coordination leads to processing times of 2-5 days, generating notable frustration among clients and internal efficiency loss.",
      bridgeTitle: "BRIDGE",
      bridgeContent: "YVEA addresses this challenge by automating the entire process end-to-end. With an integrated platform combining OCR, EDM, and AI (similar to enterprise solutions like Google Document AI), YVEA coordinates verifications, provides immediate feedback in case of anomalies, and automatically structures required documents.",
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
          approach: "Close collaboration with UX/UI designers, creation of a complete interactive prototype on Figma, and presentations to Parisian incubators.",
          resources: "Design team, UX/UI prototyping tools, presentations for incubators and investors."
        },
        {
          year: "2022-Q3/Q4",
          title: "Initial MVP Development",
          description: "MVP development using the MERN stack with SCRUM organization in 2-week sprints, including pilot testing phases with a panel of 50 users.",
          impact: "Launch of a validated MVP, demonstrating technical feasibility and functional interest in the solution",
          icon: <HiOfficeBuilding size={20} />,
          tags: ["#MVP", "#MERN", "#SCRUM"],
          objective: "Rapidly develop a first functional version to test adoption by early users.",
          approach: "Implementation of a SCRUM organization with 2-week sprints, prioritization of features according to business impact, and regular user testing.",
          resources: "Technical team of 5 developers, MERN stack (MongoDB, Express, React, Node.js), SCRUM methodology, panel of testers."
        },
        {
          year: "2023-Q1/Q2",
          title: "Iterations & Refactoring",
          description: "Intensive feedback collection from users and certification bodies, followed by complete refactoring (migration from JavaScript to TypeScript) and UX/UI improvements.",
          impact: "Significant improvement in stability, security and fluidity of the solution",
          icon: <HiCode size={20} />,
          tags: ["#Refactoring", "#TypeScript", "#UserFeedback"],
          objective: "Stabilize the platform and improve the user experience based on customer feedback.",
          approach: "Complete technical refactoring with migration to TypeScript, implementation of unit and integration tests, and UX redesign based on usage data.",
          resources: "Extended technical team, CI/CD infrastructure, analytics tools to measure usage and friction points."
        },
        {
          year: "2023-Q3/Q4",
          title: "Industrialization & V1 Launch",
          description: "Additional fundraising (€50K obtained via BNP), complete redesign of the technical architecture and improvement of the UI/UX, including the integration of a marketplace for partner services.",
          impact: "Successful launch of V1, with a stable and scalable solution opening new international opportunities",
          icon: <HiRefresh size={20} />,
          tags: ["#Scaling", "#V1", "#Marketplace"],
          objective: "Transform the MVP into an industrial product capable of supporting rapid growth and attracting partners.",
          approach: "Technical rearchitecture to ensure scalability, performance optimization, security enhancement, and development of partner interfaces.",
          resources: "New funding round, international technical team, advanced cloud infrastructure, and strategic partnerships."
        },
        {
          year: "2024-2025",
          title: "Strategic Pivot & V2 Launch",
          description: "Based on in-depth interviews with certification bodies, development of an automatic pre-verification engine with intelligent document type detection and AI analysis via fine-tuned GPT-4.",
          impact: "Drastic reduction in verification time (from several hours to less than 5 minutes) and improvement in document quality",
          icon: <HiGlobeAlt size={20} />,
          tags: ["#AI", "#GPT4", "#StrategicPivot"],
          objective: "Pivot towards a B2B model targeting certification bodies and integration of advanced AI to automate complex tasks.",
          approach: "Development of an AI model fine-tuned specifically for document certification, creation of APIs for integration with partner organizations' systems.",
          resources: "Partnership with Microsoft for Startups for Azure infrastructure, dedicated data science team, training document corpus for AI."
        }
      ],
      // Lessons learned section
      lessonsTitle: "Lessons Learned",
      lessonsDescription: "Key learnings that shaped the project's success",
      challenges: [
        {
          title: "Taking a strategic step back",
          description: "Regularly organizing retrospectives and framing workshops allows transforming each failure or drift into an opportunity for adjustment, and ensuring that the roadmap remains aligned with business challenges."
        },
        {
          title: "Active listening to users and stakeholders",
          description: "Establishing frequent feedback cycles (interviews, user tests, stand-ups) enriches the product vision, anticipates risks and promotes everyone's adherence to the project."
        },
        {
          title: "Cross-functional collaboration",
          description: "Breaking down silos by facilitating workshops bringing together developers, designers, sales representatives and certification experts was decisive for accelerating decision-making and ensuring functional coherence."
        },
        {
          title: "Culture of mutual assistance and sharing",
          description: "Implementing pairing, cross-code reviews and \"brown-bag lunch\" sessions strengthened the team's skill development and created a team spirit based on trust."
        },
        {
          title: "Mentoring and skill development",
          description: "As a project manager, I made sure to coach my juniors (work-study students, interns) via regular one-to-ones, targeted training plans and monitoring of their OKRs, which multiplied their autonomy and involvement."
        }
      ],
      keyLearnings: [
        {
          title: "Iterative approach",
          description: "The importance of MVP and rapid feedback cycles with users"
        },
        {
          title: "Value of domain expertise",
          description: "The combination of technical and business knowledge as a key success factor"
        },
        {
          title: "Balance vision/execution",
          description: "Maintaining a clear vision while remaining flexible in execution"
        },
        {
          title: "Strategic prioritization",
          description: "Focusing resources on features with the highest impact"
        }
      ],
      pmRoleTitle: "My Role as Project Manager & Product Owner",
      pmRoleSubtitle: "Orchestrating digital transformation on an international scale",
      pmRoleDescription: "As a Digital PM & PO, I led YVEA from vision to execution by coordinating 3 international teams (12 developers), while managing a budget of €200K and applying Agile and SAFe methodologies. My multidimensional expertise allowed delivering all 6 phases of the project on time and within budget.",
      
      responsibilitiesTitle: "Key Responsibilities",
      responsibilities: [
        {
          title: "Product roadmap definition",
          description: "Development and prioritization of features through cross-functional workshops and OKRs."
        },
        {
          title: "Agile Leadership",
          description: "Leading SCRUM/SCRUMBAN teams (CTO, devs, UI/UX), sprint planning and daily stand-ups."
        },
        {
          title: "Stakeholder management",
          description: "Steering committees briefing (BNP, BPI, Microsoft for Startups, incubators)."
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
      
      skillsTitle: "Skills Utilized",
      skillsCategories: [
        {
          title: "🧭 Vision & Leadership",
          skills: [
            "Product strategy: Roadmap/ROI alignment according to OKR methodology (as at Google)",
            "Multicultural leadership: Remote team management France/Pakistan/Argentina",
            "Strategic thinking: Market analysis and identification of disruption opportunities"
          ]
        },
        {
          title: "⚙️ Delivery & Process",
          skills: [
            "Certifications & frameworks: PRINCE2 Agile, SAFe, knowledge of Six Sigma methodologies",
            "Data-driven management: Power BI dashboards, automated reporting and predictive KPIs",
            "Crisis management: Resolution of critical blockages, strategic pivots under constraint"
          ]
        },
        {
          title: "☁️ Technological Expertise",
          skills: [
            "Modern architecture: Microservices, serverless, API-first design (as at AWS)",
            "Advanced AI: RAG, GPT-4 fine-tuning, semantic vectorization (Edge for Data Governance)",
            "DevSecOps: CI/CD implementation, security by design, IaC for multiple environments"
          ]
        }
      ],
      
      conclusionTitle: "Conclusion",
      conclusionText: "YVEA demonstrates my ability to lead complex digital transformations from A to Z, combining strategic vision, operational excellence and international leadership. This full-stack approach to project management — combining business acumen, technical skills and soft skills — precisely matches the profiles sought by the Big Four, Google and elite recruitment firms.",
      futureTitle: "The future of YVEA & my next challenges",
      futureText: "In its next iteration, YVEA could integrate blockchain for certification traceability and generative AI models for document self-correction. I am now looking for complex environments where I can apply this expertise to transform business challenges into digital opportunities.",
      callToAction: "Let's discuss your next transformational challenge",
      callToActionSubtext: "I am ready to put this dual business/tech expertise at the service of your organization."
    }
  };

  // Get content based on locale
  const currentContent = locale === 'fr' ? content.fr : content.en;

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Digital Globe and Particle Animation */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden min-h-[700px] flex items-center">
        {/* Particle Animation Background */}
        <div className="absolute inset-0 opacity-30">
          <ParticleFlowAnimation />
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary mb-6 backdrop-blur-sm">
                {locale === 'fr' ? "Étude de cas" : "Case Study"}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                {currentContent.heroTitle}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                {currentContent.heroSubtitle}
              </p>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                {currentContent.intro}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <AnimatedButton 
                  href="https://calendly.com/elmasrymoamen/30min"
                  variant="primary"
                  size="lg"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {locale === 'fr' ? "Réserver un échange" : "Book a meeting"}
                </AnimatedButton>
                
                <motion.div 
                  className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg text-white hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    const element = document.getElementById('project-context');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>
                    {locale === 'fr' ? "Découvrir le projet" : "Discover the project"}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-3xl font-bold text-primary mb-1">-80%</div>
                  <div className="text-sm text-gray-400">{locale === 'fr' ? "Temps de traitement" : "Processing time"}</div>
                </motion.div>
                
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-3xl font-bold text-emerald-500 mb-1">+35%</div>
                  <div className="text-sm text-gray-400">{locale === 'fr' ? "Exportations" : "Exports"}</div>
                </motion.div>
                
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-3xl font-bold text-violet-400 mb-1">8,500+</div>
                  <div className="text-sm text-gray-400">{locale === 'fr' ? "Utilisateurs" : "Users"}</div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Digital Globe Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative h-[500px] w-full">
                <DigitalGlobe />
                
                {/* Highlight points on globe */}
                <motion.div 
                  className="absolute top-[30%] left-[60%] w-4 h-4 rounded-full bg-primary"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(var(--primary-rgb), 0.7)',
                      '0 0 0 10px rgba(var(--primary-rgb), 0)',
                      '0 0 0 0 rgba(var(--primary-rgb), 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <motion.div 
                  className="absolute top-[60%] left-[40%] w-3 h-3 rounded-full bg-emerald-500"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(16, 185, 129, 0.7)',
                      '0 0 0 10px rgba(16, 185, 129, 0)',
                      '0 0 0 0 rgba(16, 185, 129, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                
                <motion.div 
                  className="absolute top-[45%] left-[30%] w-2 h-2 rounded-full bg-violet-400"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(167, 139, 250, 0.7)',
                      '0 0 0 10px rgba(167, 139, 250, 0)',
                      '0 0 0 0 rgba(167, 139, 250, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Project Overview */}
      <div id="project-context" className="container mx-auto px-4 py-16">
        <AnimatedSection className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent z-0"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl font-bold mb-6">
                {currentContent.contextTitle}
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-xl font-semibold text-red-700 mb-2">{currentContent.beforeTitle}</h3>
                  <p className="text-gray-700">{currentContent.beforeContent}</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{currentContent.bridgeTitle}</h3>
                  <p className="text-gray-700">{currentContent.bridgeContent}</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{currentContent.afterTitle}</h3>
                  <p className="text-gray-700">{currentContent.afterContent}</p>
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-primary font-medium">{currentContent.visualizationText}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                  <div className="text-3xl font-bold text-primary mb-2">-80%</div>
                  <p className="text-gray-700">
                    {locale === 'fr' ? "Réduction du temps de traitement" : "Processing time reduction"}
                  </p>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">+90%</div>
                  <p className="text-gray-700">
                    {locale === 'fr' ? "Précision améliorée" : "Improved accuracy"}
                  </p>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                  <div className="text-3xl font-bold text-violet-600 mb-2">-40%</div>
                  <p className="text-gray-700">
                    {locale === 'fr' ? "Coûts opérationnels" : "Operational costs"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Project Evolution Timeline */}
        <AnimatedSection className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <HiGlobeAlt className="mr-3 text-primary" size={28} />
              {currentContent.evolutionTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-8">{currentContent.evolutionSubtitle}</p>
            
            <EnhancedTimeline phases={currentContent.phases} />
          </div>
        </AnimatedSection>
        
        {/* My Role as PM/PO */}
        <AnimatedSection className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">{currentContent.pmRoleTitle}</h2>
            <p className="text-xl font-semibold text-primary mb-4">{currentContent.pmRoleSubtitle}</p>
            <p className="text-gray-700 mb-8">{currentContent.pmRoleDescription}</p>
            
            <h3 className="text-2xl font-bold mb-6">{currentContent.responsibilitiesTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {currentContent.responsibilities.map((resp, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white p-5 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="font-bold text-gray-800 mb-2">{resp.title}</h4>
                  <p className="text-gray-600">{resp.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mb-10">
              <h3 className="text-xl font-bold mb-3">{currentContent.crisisTitle}</h3>
              <p className="text-gray-700">{currentContent.crisisDescription}</p>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{currentContent.approachTitle}</h3>
            <p className="text-gray-700 mb-4">{currentContent.approachDescription}</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              {currentContent.approachItems.map((item, idx) => (
                <li key={idx} className="text-gray-700">{item}</li>
              ))}
            </ul>
            <p className="text-gray-700 italic mb-6">{currentContent.approachConclusion}</p>
          </div>
        </AnimatedSection>
        
        {/* Results & Impact */}
        <AnimatedSection className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{currentContent.resultsTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {currentContent.resultsCategories.map((result, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">{result.title}</div>
                  <div className="text-3xl font-bold text-primary mb-2">{result.value}</div>
                  <div className="font-medium text-gray-800 mb-1">{result.description}</div>
                  <div className="text-sm text-gray-600">{result.detail}</div>
                </motion.div>
              ))}
            </div>
            
            <h3 className="text-2xl font-bold mb-6 text-center">{currentContent.testimonialsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentContent.testimonials.map((testimonial, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-yellow-400 mb-1">★★★★★</div>
                      <p className="italic text-gray-700 mb-2">"{testimonial.text}"</p>
                      <div className="text-sm font-bold text-gray-800">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* Lessons Learned Section */}
        <AnimatedSection className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">{currentContent.lessonsTitle}</h2>
            <p className="text-lg text-center text-gray-700 mb-12">{currentContent.lessonsDescription}</p>
            
            <div className="space-y-6">
              {currentContent.challenges.map((challenge, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{challenge.title}</h4>
                  <p className="text-gray-700">{challenge.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* Skills Used */}
        <AnimatedSection className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 rounded-2xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">{currentContent.skillsTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentContent.skillsCategories.map((category, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIdx) => (
                      <li key={skillIdx} className="text-gray-300 text-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* Conclusion */}
        <AnimatedSection className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{currentContent.conclusionTitle}</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">{currentContent.conclusionText}</p>
            
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 mb-12">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{currentContent.futureTitle}</h3>
              <p className="text-gray-700 mb-8">{currentContent.futureText}</p>
              
              <h4 className="text-xl font-bold text-primary mb-2">{currentContent.callToAction}</h4>
              <p className="text-gray-600 italic">{currentContent.callToActionSubtext}</p>
            </div>
            
            <AnimatedButton 
              href="https://calendly.com/elmasrymoamen/30min"
              variant="primary"
              size="lg"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {locale === 'fr' ? "Réserver un échange" : "Book a meeting"}
            </AnimatedButton>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default YVEAProjectContent; 