'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className="w-6 h-10 border-2 border-indigo-300/50 rounded-full flex justify-center pt-2"
        animate={{ y: [0, 5, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatType: "loop" 
        }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-indigo-300 rounded-full"
          animate={{ 
            y: [0, 12, 0],
            opacity: [1, 0.3, 1] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "loop" 
          }}
        />
      </motion.div>
      
      <motion.div
        className="mt-2 flex space-x-1"
        animate={{ 
          y: [0, 3, 0] 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatType: "loop",
          delay: 0.5
        }}
      >
        <div className="w-1 h-1 bg-indigo-300/70 rounded-full" />
        <div className="w-1 h-1 bg-indigo-300/70 rounded-full" />
        <div className="w-1 h-1 bg-indigo-300/70 rounded-full" />
      </motion.div>
    </motion.div>
  );
} 