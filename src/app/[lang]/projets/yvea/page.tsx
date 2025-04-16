'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/effects/AnimatedSection';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Timeline from '@/components/projects/Timeline';
import SkillsGrid from '@/components/projects/SkillsGrid';
import ResultsChart from '@/components/projects/ResultsChart';
import Image from 'next/image';

export default function YVEAProjectPage() {
  const { t, locale } = useTranslation();
  const langPrefix = `/${locale}`;
  
  // État pour suivre si la page est entièrement chargée
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Contenus traduits
  const content = {
    fr: {
      hero: {
        title: "YVEA – SaaS export IA",
        subtitle: "Transformation numérique du processus de certification pour l'export international",
        cta: "Réserver un échange"
      },
      context: {
        title: "Contexte du Projet",
        description: "Dans un monde où l'export est devenu critique, les entreprises font face à des défis complexes liés à la certification et à la conformité documentaire. Les processus traditionnels, souvent manuels et lents, représentent un frein majeur à l'efficacité commerciale et à la compétitivité internationale.",
        challenge: "Les entreprises perdaient jusqu'à 45% de leur temps sur des tâches administratives liées à l'export, avec un taux d'erreur documentaire de 23%.",
        opportunity: "La digitalisation complète du processus représentait une opportunité de réduction des délais de 70% et d'élimination des erreurs documentaires grâce à l'IA."
      },
      evolution: {
        title: "Évolution du Projet",
        milestones: [
          {
            year: "2018",
            title: "Lancement initial",
            description: "Étude de marché et conceptualisation de la solution SaaS"
          },
          {
            year: "2019",
            title: "MVP & tests utilisateurs",
            description: "Développement du prototype et premiers tests avec des utilisateurs pilotes"
          },
          {
            year: "2020",
            title: "Intégration IA",
            description: "Implémentation des algorithmes d'IA pour l'automatisation documentaire"
          },
          {
            year: "2021",
            title: "Expansion internationale",
            description: "Adaptation de la plateforme aux réglementations de 12 pays supplémentaires"
          }
        ]
      },
      role: {
        title: "Mon Rôle & Approche",
        description: "En tant que fondateur et chef de produit, j'ai piloté l'ensemble du développement de YVEA, de la conception à la mise sur le marché. J'ai adopté une approche agile centrée utilisateur, avec des cycles d'itération courts et une collaboration étroite avec les clients pilotes.",
        responsibilities: [
          "Direction de la stratégie produit et de la vision technologique",
          "Management d'une équipe multidisciplinaire de 8 personnes",
          "Levée de fonds et relations avec les investisseurs",
          "Développement des partenariats stratégiques avec les organismes de certification"
        ],
        approach: "Méthodologie agile (Scrum), approche lean startup, feedback continu des utilisateurs"
      },
      results: {
        title: "Résultats Clés & Impact",
        metrics: [
          {
            label: "Réduction des délais",
            value: "70%",
            description: "Accélération du processus de certification export"
          },
          {
            label: "Utilisation IA",
            value: "85%",
            description: "Taux d'automatisation des processus documentaires"
          },
          {
            label: "Clients",
            value: "+40",
            description: "Entreprises adoptant la plateforme en deux ans"
          },
          {
            label: "Levée de fonds",
            value: "1.2M€",
            description: "Financement obtenu pour le développement"
          }
        ],
        testimonial: {
          quote: "YVEA a transformé notre processus d'export, nous faisant gagner un temps précieux et éliminant les erreurs documentaires qui nous coûtaient des opportunités commerciales.",
          author: "Directeur Export, entreprise cliente"
        }
      },
      lessons: {
        title: "Leçons Apprises",
        points: [
          "L'importance cruciale des tests utilisateurs précoces et fréquents",
          "Le défi de l'intégration de l'IA dans des processus métier traditionnels",
          "La nécessité d'une approche progressive du changement pour les entreprises établies",
          "L'équilibre entre innovation technologique et simplicité d'utilisation"
        ]
      },
      skills: {
        title: "Compétences Mobilisées",
        soft: [
          "Leadership entrepreneurial",
          "Vision stratégique",
          "Communication client",
          "Gestion d'équipe",
          "Négociation",
          "Résilience"
        ],
        hard: [
          "Développement SaaS",
          "Intégration IA",
          "UX/UI Design",
          "Gestion de Produit",
          "DevOps",
          "Automatisation"
        ]
      },
      conclusion: {
        title: "Conclusion",
        summary: "YVEA illustre comment la technologie peut transformer un secteur traditionnel en créant de la valeur significative pour toutes les parties prenantes. Cette solution SaaS propulsée par l'IA continue d'évoluer pour répondre aux besoins changeants du commerce international.",
        cta: "Discutons de votre projet de transformation digitale"
      }
    },
    en: {
      hero: {
        title: "YVEA – AI Export SaaS",
        subtitle: "Digital transformation of certification processes for international export",
        cta: "Book a meeting"
      },
      context: {
        title: "Project Context",
        description: "In a world where export has become critical, companies face complex challenges related to certification and document compliance. Traditional processes, often manual and slow, represent a major obstacle to business efficiency and international competitiveness.",
        challenge: "Companies were losing up to 45% of their time on administrative export tasks, with a document error rate of 23%.",
        opportunity: "Complete digitalization of the process represented an opportunity to reduce delays by 70% and eliminate document errors through AI."
      },
      evolution: {
        title: "Project Evolution",
        milestones: [
          {
            year: "2018",
            title: "Initial Launch",
            description: "Market research and SaaS solution conceptualization"
          },
          {
            year: "2019",
            title: "MVP & User Testing",
            description: "Prototype development and first tests with pilot users"
          },
          {
            year: "2020",
            title: "AI Integration",
            description: "Implementation of AI algorithms for document automation"
          },
          {
            year: "2021",
            title: "International Expansion",
            description: "Platform adaptation to regulations in 12 additional countries"
          }
        ]
      },
      role: {
        title: "My Role & Approach",
        description: "As founder and product manager, I led the entire development of YVEA, from conception to market launch. I adopted a user-centered agile approach, with short iteration cycles and close collaboration with pilot customers.",
        responsibilities: [
          "Product strategy and technological vision leadership",
          "Management of a multidisciplinary team of 8 people",
          "Fundraising and investor relations",
          "Development of strategic partnerships with certification bodies"
        ],
        approach: "Agile methodology (Scrum), lean startup approach, continuous user feedback"
      },
      results: {
        title: "Key Results & Impact",
        metrics: [
          {
            label: "Time Reduction",
            value: "70%",
            description: "Acceleration of the export certification process"
          },
          {
            label: "AI Utilization",
            value: "85%",
            description: "Document process automation rate"
          },
          {
            label: "Clients",
            value: "+40",
            description: "Companies adopting the platform in two years"
          },
          {
            label: "Fundraising",
            value: "€1.2M",
            description: "Funding secured for development"
          }
        ],
        testimonial: {
          quote: "YVEA has transformed our export process, saving us valuable time and eliminating document errors that were costing us business opportunities.",
          author: "Export Director, client company"
        }
      },
      lessons: {
        title: "Lessons Learned",
        points: [
          "The crucial importance of early and frequent user testing",
          "The challenge of integrating AI into traditional business processes",
          "The need for a gradual approach to change for established companies",
          "The balance between technological innovation and ease of use"
        ]
      },
      skills: {
        title: "Skills Utilized",
        soft: [
          "Entrepreneurial Leadership",
          "Strategic Vision",
          "Client Communication",
          "Team Management",
          "Negotiation",
          "Resilience"
        ],
        hard: [
          "SaaS Development",
          "AI Integration",
          "UX/UI Design",
          "Product Management",
          "DevOps",
          "Automation"
        ]
      },
      conclusion: {
        title: "Conclusion",
        summary: "YVEA illustrates how technology can transform a traditional sector by creating significant value for all stakeholders. This AI-powered SaaS solution continues to evolve to meet the changing needs of international trade.",
        cta: "Let's discuss your digital transformation project"
      }
    }
  };
  
  // Contenu selon la langue
  const pageContent = locale === 'fr' ? content.fr : content.en;
  
  return (
    <main className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-[80vh] flex items-center">
        {/* Image/vidéo de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/MAY.jpg" 
            alt={pageContent.hero.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {pageContent.hero.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {pageContent.hero.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
              {pageContent.hero.cta}
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
      
      {/* Section Contexte du Projet */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-unbounded font-bold mb-10 text-center">
            {pageContent.context.title}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                {pageContent.context.description}
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-primary">
                <h3 className="font-bold mb-2 text-gray-800">{locale === 'fr' ? 'Le défi' : 'The Challenge'}</h3>
                <p>{pageContent.context.challenge}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="font-bold mb-2 text-gray-800">{locale === 'fr' ? 'L\'opportunité' : 'The Opportunity'}</h3>
                <p>{pageContent.context.opportunity}</p>
              </div>
            </div>
            
            <div className="relative h-80 md:h-96 bg-white p-4 rounded-lg shadow-lg">
              {/* Placeholder pour un schéma/graphique */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500 text-center px-4">
                  {locale === 'fr' 
                    ? "Schéma comparatif : Processus traditionnel vs. Solution YVEA" 
                    : "Comparison diagram: Traditional process vs. YVEA Solution"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Section Évolution du Projet */}
      <AnimatedSection className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-unbounded font-bold mb-10 text-center">
            {pageContent.evolution.title}
          </h2>
          
          <Timeline milestones={pageContent.evolution.milestones} />
        </div>
      </AnimatedSection>
      
      {/* Section Mon Rôle / Mon Approche */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-unbounded font-bold mb-10 text-center">
            {pageContent.role.title}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg mb-6">
                {pageContent.role.description}
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="font-bold mb-4 text-gray-800">{locale === 'fr' ? 'Responsabilités principales' : 'Key Responsibilities'}</h3>
                <ul className="space-y-2">
                  {pageContent.role.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold mb-4 text-gray-800">{locale === 'fr' ? 'Approche méthodologique' : 'Methodological Approach'}</h3>
                <p>{pageContent.role.approach}</p>
              </div>
            </div>
            
            <div className="relative h-80 md:h-96 bg-white p-4 rounded-lg shadow-lg">
              {/* Placeholder pour un schéma de roadmap */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500 text-center px-4">
                  {locale === 'fr' 
                    ? "Roadmap produit et organisation de l'équipe" 
                    : "Product roadmap and team organization"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Section Résultats Clés & Impact */}
      <AnimatedSection className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-unbounded font-bold mb-10 text-center">
            {pageContent.results.title}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ResultsChart metrics={pageContent.results.metrics} />
              
              {/* Témoignage */}
              <div className="mt-8 bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <blockquote className="text-lg italic mb-4">
                  "{pageContent.results.testimonial.quote}"
                </blockquote>
                <p className="font-medium text-gray-700">— {pageContent.results.testimonial.author}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {pageContent.results.metrics.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-lg font-medium mb-2">{metric.label}</div>
                  <p className="text-gray-600 text-sm">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Section Leçons Apprises */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-unbounded font-bold mb-10 text-center">
            {pageContent.lessons.title}
          </h2>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <ul className="space-y-6">
              {pageContent.lessons.points.map((point, index) => (
                <li key={index} className="flex">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0 mt-1">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Section Compétences Mobilisées */}
      <AnimatedSection className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-unbounded font-bold mb-10 text-center">
            {pageContent.skills.title}
          </h2>
          
          <SkillsGrid 
            softSkills={pageContent.skills.soft} 
            hardSkills={pageContent.skills.hard} 
            locale={locale}
          />
        </div>
      </AnimatedSection>
      
      {/* Conclusion & Appel à l'Action */}
      <AnimatedSection className="py-20 bg-primary-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-unbounded font-bold mb-6">
            {pageContent.conclusion.title}
          </h2>
          
          <p className="text-lg max-w-3xl mx-auto mb-10">
            {pageContent.conclusion.summary}
          </p>
          
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
            {pageContent.conclusion.cta}
          </AnimatedButton>
        </div>
      </AnimatedSection>
    </main>
  );
} 