'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface EnhancedSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  bgClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  decorativeElements?: boolean;
  gradientBg?: boolean;
  delay?: number;
}

export default function EnhancedSection({
  children,
  title,
  subtitle,
  className = '',
  contentClassName = '',
  bgClassName = '',
  titleClassName = 'text-3xl font-bold mb-2',
  subtitleClassName = 'text-lg text-gray-600 dark:text-gray-300 mb-8',
  decorativeElements = false,
  gradientBg = false,
  delay = 0
}: EnhancedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <section ref={ref} className={`relative py-16 md:py-24 overflow-hidden ${bgClassName} ${className}`}>
      {/* Optional decorative background elements */}
      {decorativeElements && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3" />
        </>
      )}
      
      {/* Optional gradient background */}
      {gradientBg && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10" />
      )}
      
      <div className={`container mx-auto px-4 md:px-6 relative z-10 ${contentClassName}`}>
        {(title || subtitle) && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: delay }}
          >
            {title && <h2 className={titleClassName}>{title}</h2>}
            {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
} 