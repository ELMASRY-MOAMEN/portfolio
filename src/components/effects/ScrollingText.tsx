'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollingTextProps {
  text: string;
  repeat?: number;
  direction?: 'ltr' | 'rtl';
  className?: string;
  textClassName?: string;
  speed?: number;
}

export default function ScrollingText({
  text,
  repeat = 10,
  direction = 'ltr',
  className = '',
  textClassName = '',
  speed = 1
}: ScrollingTextProps) {
  const containerRef = useRef(null);
  
  // Create an array of repeated text
  const repeatedText = Array(repeat).fill(text).join(' • ');
  
  // Animation properties based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Transform the X position based on scroll progress
  const baseVelocity = direction === 'ltr' ? -5 * speed : 5 * speed;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${baseVelocity * 100}%`]
  );

  return (
    <div 
      ref={containerRef}
      className={`w-full overflow-hidden py-4 ${className}`}
    >
      <motion.div
        className="whitespace-nowrap flex items-center"
        style={{ x }}
      >
        <span className={`text-primary-dark text-opacity-10 text-6xl font-unbounded font-bold ${textClassName}`}>
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
} 