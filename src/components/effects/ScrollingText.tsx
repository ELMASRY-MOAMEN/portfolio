'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

interface ScrollingTextProps {
  text: string;
  repeat?: number;
  direction?: 'ltr' | 'rtl';
  className?: string;
  textClassName?: string;
  speed?: number;
  mode?: 'static' | 'carousel';
}

export default function ScrollingText({
  text,
  repeat = 10,
  direction = 'ltr',
  className = '',
  textClassName = '',
  speed = 1,
  mode = 'static'
}: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate repeated text with separators
  const repeatedText = Array(repeat).fill(text).join(' • ');

  if (mode === 'static') {
    return (
      <div 
        ref={containerRef}
        className={`w-full overflow-hidden py-5 bg-white ${className}`}
      >
        <div className="container-custom">
          <div className="text-center">
            <h2 className={`text-gray-800 text-3xl md:text-4xl font-unbounded font-bold ${textClassName}`}>
              {text}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  
  // Carousel mode
  return (
    <div 
      ref={containerRef}
      className={`w-full overflow-hidden py-6 bg-primary/5 ${className}`}
    >
      <div className="relative whitespace-nowrap">
        <motion.div
          className="inline-block"
          animate={{
            x: direction === 'ltr' ? [0, -2000] : [-2000, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30 / speed,
              ease: "linear",
            }
          }}
        >
          <h2 className={`text-primary text-2xl md:text-3xl font-unbounded font-medium ${textClassName}`}>
            {repeatedText}
          </h2>
        </motion.div>
      </div>
    </div>
  );
} 