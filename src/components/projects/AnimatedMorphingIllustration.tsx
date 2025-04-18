'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedMorphingIllustration: React.FC = () => {
  // Pour suivre l'état d'animation
  const [currentState, setCurrentState] = React.useState<'paper' | 'digital'>('paper');
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Définition des chemins SVG pour les deux états
  const paperDocPathVariants = {
    paper: "M10,10 L190,10 L190,290 L10,290 Z",
    digital: "M10,30 L190,30 L190,270 L10,270 Z"
  };

  const paperLinesPathVariants = {
    paper: [
      "M30,50 L170,50",
      "M30,90 L170,90",
      "M30,130 L170,130",
      "M30,170 L170,170",
      "M30,210 L170,210",
      "M30,250 L120,250"
    ],
    digital: [
      "M25,60 L115,60", 
      "M135,60 L175,60",
      "M25,100 L175,100",
      "M25,140 L70,140 L70,200 L175,200",
      "M25,240 L175,240",
      "M80,140 L175,140"
    ]
  };

  // Définition des variantes pour l'interface digitale
  const digitalInterfaceVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 2.5,
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };

  // Effet pour déclencher le morphing à intervalles réguliers
  useEffect(() => {
    const startMorphingAnimation = () => {
      animationRef.current = setInterval(() => {
        setCurrentState(prev => prev === 'paper' ? 'digital' : 'paper');
      }, 5000); // Alterne toutes les 5 secondes
    };

    startMorphingAnimation();

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Conteneur principal pour le morphing */}
      <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
        {/* Première couche: Document papier qui se transforme */}
        <svg viewBox="0 0 200 300" className="absolute inset-0 w-full h-full">
          {/* Fond du document */}
          <motion.path
            d={paperDocPathVariants.paper}
            fill="#f5f5f5"
            stroke="#ccc"
            strokeWidth="2"
            initial={false}
            animate={{ d: paperDocPathVariants[currentState] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Lignes du document qui se transforment */}
          {paperLinesPathVariants.paper.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke="#aaa"
              strokeWidth="2"
              initial={false}
              animate={{ d: paperLinesPathVariants[currentState][index] }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.1 }}
            />
          ))}
        </svg>

        {/* Deuxième couche: Interface numérique qui apparaît */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          variants={digitalInterfaceVariants}
          initial="hidden"
          animate={currentState === 'digital' ? "visible" : "hidden"}
        >
          {/* Éléments d'interface numérique */}
          <div className="relative w-3/4 h-3/4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
            {/* Barre de navigation */}
            <div className="h-8 bg-slate-800 flex items-center px-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            {/* Interface principale */}
            <div className="p-4">
              {/* En-tête */}
              <div className="mb-4">
                <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/20 rounded w-1/2"></div>
              </div>
              
              {/* Panneau principal */}
              <div className="bg-white/10 rounded-lg p-3 mb-3">
                <div className="flex justify-between mb-2">
                  <div className="h-3 bg-white/20 rounded w-1/3"></div>
                  <div className="h-3 bg-white/20 rounded w-1/4"></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 bg-white/10 rounded"></div>
                  <div className="h-12 bg-white/10 rounded"></div>
                  <div className="h-12 bg-white/10 rounded"></div>
                  <div className="h-12 bg-white/10 rounded"></div>
                </div>
              </div>
              
              {/* Graphiques */}
              <div className="flex space-x-2">
                <div className="h-16 w-1/2 bg-white/10 rounded-lg"></div>
                <div className="h-16 w-1/2 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lumière brillante qui apparaît pendant la transition */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 mix-blend-overlay"
          animate={{ 
            opacity: currentState === 'digital' ? [0, 0.7, 0] : 0,
            backgroundImage: [
              'linear-gradient(to right, rgba(59, 130, 246, 0), rgba(168, 85, 247, 0))',
              'linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))',
              'linear-gradient(to right, rgba(59, 130, 246, 0), rgba(168, 85, 247, 0))'
            ]
          }}
          transition={{ 
            duration: 1.5, 
            times: [0, 0.5, 1],
            ease: "easeInOut" 
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedMorphingIllustration; 