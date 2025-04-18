'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export interface ProjectPhase {
  title: string;
  content: string;
  impact: string;
  year?: string;
  icon?: React.ReactNode;
}

interface EnhancedTimelineProps {
  phases: ProjectPhase[];
}

const EnhancedTimeline = ({ phases }: EnhancedTimelineProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Ligne de temps verticale */}
      <div 
        className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 z-0" 
        style={{ top: 0, bottom: 0, height: '100%' }} 
      />
      
      {/* Phases */}
      <div className="relative">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            className="mb-20 last:mb-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <div className={`flex flex-col lg:flex-row items-center lg:items-start ${
              index % 2 === 0 ? '' : 'lg:flex-row-reverse'
            }`}>
              {/* Contenu principal */}
              <div className="lg:w-[45%] mb-6 lg:mb-0">
                <motion.div 
                  className="bg-white rounded-xl shadow-md overflow-hidden h-full transition-all duration-300"
                  initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                  animate={{ 
                    boxShadow: activeIndex === index 
                      ? "0 10px 25px -5px rgba(0, 82, 255, 0.1), 0 10px 10px -5px rgba(0, 82, 255, 0.04)" 
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 82, 255, 0.1), 0 10px 10px -5px rgba(0, 82, 255, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Titre avec gradient */}
                  <div className="bg-gradient-to-r from-primary to-primary/70 px-6 py-4 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{phase.title}</h3>
                      {phase.year && (
                        <div className="text-sm bg-white/20 px-2 py-1 rounded-full text-white">{phase.year}</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-6">
                    <h4 className="font-medium text-gray-700 mb-2">Contenu</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">{phase.content}</p>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Impact</h4>
                      <p className="text-gray-600 italic leading-relaxed">{phase.impact}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Point central avec icône */}
              <div className="lg:w-[10%] flex justify-center relative">
                <div className="h-full">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center text-white shadow-lg relative z-10"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: activeIndex === index ? 1.1 : 1,
                      boxShadow: activeIndex === index 
                        ? "0 0 0 4px rgba(0, 82, 255, 0.2)" 
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 0 4px rgba(0, 82, 255, 0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {phase.icon || (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </motion.div>
                </div>
                
                {/* Lignes horizontales reliant les points à la timeline */}
                <motion.div 
                  className="hidden lg:block absolute top-6 h-0.5 bg-gradient-to-r from-primary/20 to-primary/20 z-0" 
                  style={{ 
                    width: '100%',
                    left: index % 2 === 0 ? '50%' : '0',
                    right: index % 2 === 0 ? '0' : '50%'
                  }}
                  initial={{ opacity: 0.5, width: '50%' }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0.5,
                    width: activeIndex === index ? '70%' : '50%'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Espace pour les éléments alternés */}
              <div className="lg:w-[45%] hidden lg:block" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedTimeline; 