'use client';

import { motion } from 'framer-motion';

interface SkillsGridProps {
  softSkills: string[];
  hardSkills: string[];
  locale: string;
}

const SkillsGrid = ({ softSkills, hardSkills, locale }: SkillsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Soft Skills */}
      <div>
        <motion.div 
          className="mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">
            {locale === 'fr' ? 'Compétences relationnelles' : 'Soft Skills'}
          </h3>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          {softSkills.map((skill, index) => (
            <motion.div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-primary"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p>{skill}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Hard Skills */}
      <div>
        <motion.div 
          className="mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">
            {locale === 'fr' ? 'Compétences techniques' : 'Hard Skills'}
          </h3>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          {hardSkills.map((skill, index) => (
            <motion.div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p>{skill}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsGrid; 