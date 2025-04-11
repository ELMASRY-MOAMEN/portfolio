'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  threshold?: number;
  bgClassName?: string;
  withGrain?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
  threshold = 0.1,
  bgClassName = '',
  withGrain = false
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Get initial and animate values based on direction
  const getVariants = () => {
    let initial = {};
    
    switch (direction) {
      case 'up':
        initial = { opacity: 0, y: 50 };
        break;
      case 'down':
        initial = { opacity: 0, y: -50 };
        break;
      case 'left':
        initial = { opacity: 0, x: 50 };
        break;
      case 'right':
        initial = { opacity: 0, x: -50 };
        break;
      case 'none':
        initial = { opacity: 0 };
        break;
      default:
        initial = { opacity: 0, y: 50 };
    }
    
    return {
      initial,
      animate: { 
        opacity: 1, 
        y: 0, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut"
        }
      }
    };
  };
  
  const { initial, animate } = getVariants();

  return (
    <motion.section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={initial}
      animate={isInView ? animate : initial}
    >
      {/* Optional background with noise grain texture */}
      {bgClassName && (
        <div className={`absolute inset-0 -z-10 ${bgClassName}`}></div>
      )}
      
      {withGrain && (
        <div className="absolute inset-0 -z-10 grain-bg pointer-events-none"></div>
      )}
      
      {children}
    </motion.section>
  );
} 