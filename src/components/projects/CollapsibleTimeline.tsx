'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

// Types pour les données des étapes
export interface TimelineStepTag {
  label: string;
}

export interface TimelineStep {
  title: string;
  icon: React.ReactNode;
  year: string;
  tags: string[];
  summary: string;
  details: {
    objective: string;
    approach: string;
    means: string;
    impact: string;
  };
}

interface CollapsibleTimelineProps {
  steps: TimelineStep[];
}

const CollapsibleTimeline: React.FC<CollapsibleTimelineProps> = ({ steps }) => {
  const { locale } = useTranslation();
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    if (expandedSteps.includes(index)) {
      setExpandedSteps(expandedSteps.filter(i => i !== index));
    } else {
      setExpandedSteps([...expandedSteps, index]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Ligne verticale centrale (visible uniquement sur desktop) */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 z-0" style={{ top: 0, bottom: 0, height: '100%' }} />
      
      {/* Étapes */}
      <div className="relative space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="relative"
          >
            {/* Version collapsée */}
            <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
              expandedSteps.includes(index) 
                ? 'mb-6 ring-2 ring-primary/20 shadow-lg shadow-primary/10' 
                : 'mb-0 hover:shadow-md'
            }`}>
              <div className="flex flex-col md:flex-row relative">
                {/* Indicateur du numéro d'étape (à l'angle supérieur droit) */}
                <div className="absolute top-0 right-0 bg-primary text-white w-10 h-10 flex items-center justify-center text-sm font-bold rounded-bl-lg z-10">
                  {index + 1}
                </div>
                
                {/* Icône et année (à gauche) */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 md:w-64 flex flex-col justify-center items-center md:items-start">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium mb-2">{step.year}</div>
                  <h3 className="text-xl font-bold text-center md:text-left">{step.title}</h3>
                </div>
                
                {/* Contenu principal (à droite) */}
                <div className="p-6 flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {step.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Résumé */}
                  <p className="text-gray-700 mb-4">{step.summary}</p>
                  
                  {/* Bouton Expand */}
                  <motion.button
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      expandedSteps.includes(index) 
                        ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => toggleStep(index)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {expandedSteps.includes(index) ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Collapse
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Expand
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Version expandée - avec un meilleur effet accordion */}
            <AnimatePresence>
              {expandedSteps.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.04, 0.62, 0.23, 0.98],
                    opacity: { duration: 0.3 },
                    height: { duration: 0.4 }
                  }}
                  className="bg-white/50 border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    {/* Section Objectif */}
                    <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </span>
                        {locale === 'fr' ? 'Objectif' : 'Objective'}
                      </h4>
                      <p className="text-gray-700">{step.details.objective}</p>
                    </div>
                    
                    {/* Section Démarche */}
                    <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </span>
                        {locale === 'fr' ? 'Démarche' : 'Approach'}
                      </h4>
                      <p className="text-gray-700">{step.details.approach}</p>
                    </div>
                    
                    {/* Section Moyens */}
                    <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </span>
                        {locale === 'fr' ? 'Moyens' : 'Resources'}
                      </h4>
                      <p className="text-gray-700">{step.details.means}</p>
                    </div>
                    
                    {/* Section Impact */}
                    <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </span>
                        Impact
                      </h4>
                      <p className="text-gray-700">{step.details.impact}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      {/* CTA à la fin de la timeline */}
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-block bg-white px-8 py-6 rounded-xl shadow-lg border border-primary/10">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            {locale === 'fr' 
              ? "Vous voulez en savoir plus ?" 
              : "Want to know more?"}
          </h3>
          <p className="text-gray-600 mb-5">
            {locale === 'fr' 
              ? "Découvrez plus en détail mon parcours entrepreunarial lors d'un échange." 
              : "Learn more about my entrepreneurial journey in a personal meeting."}
          </p>
          <Link 
            href="https://calendly.com/elmasrymoamen/30min" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {locale === 'fr' ? "Réserver un échange" : "Book a meeting"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CollapsibleTimeline; 