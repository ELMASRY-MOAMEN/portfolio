'use client';

import { motion } from 'framer-motion';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline = ({ milestones }: TimelineProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Ligne de temps verticale */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 z-0" style={{ top: 0, bottom: 0 }} />
      
      {/* Milestones */}
      <div className="relative">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className={`mb-16 flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Année (sur mobile: en haut, sur desktop: selon alternance) */}
            <div className="mb-4 md:mb-0 md:w-1/3 text-center">
              <div className="inline-block bg-primary text-white font-bold py-2 px-5 rounded-full text-lg shadow-md">
                {milestone.year}
              </div>
            </div>
            
            {/* Point de la timeline (visible seulement sur desktop) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full z-10 shadow-md" />
            
            {/* Contenu */}
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/2 relative">
              <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
              <p className="text-gray-700">{milestone.description}</p>
              
              {/* Flèche pointant vers le point de timeline (visible seulement sur desktop) */}
              <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 z-0">
                {index % 2 === 0 ? (
                  <div className="absolute right-0 translate-x-1/2" />
                ) : (
                  <div className="absolute left-0 -translate-x-1/2" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 