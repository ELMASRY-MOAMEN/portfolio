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
        className="w-6 h-10 border-2 border-indigo-300/60 rounded-full flex justify-center pt-2 backdrop-blur-sm"
        animate={{ y: [0, 3, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "loop" 
        }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div 
          className="w-2 h-2 bg-indigo-300 rounded-full"
          animate={{ 
            y: [0, 12, 0],
            opacity: [1, 0.5, 1] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop" 
          }}
        />
      </motion.div>
    </motion.div>
  );
} 