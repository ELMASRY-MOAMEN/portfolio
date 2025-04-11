'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedStatsCardProps {
  value: string;
  label: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedStatsCard({
  value,
  label,
  duration = 0.5,
  delay = 0,
  className = "",
}: AnimatedStatsCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  // If it contains a number, prepare for counting animation
  const containsNumber = /\d/.test(value);
  const numericPart = containsNumber ? value.replace(/[^\d.]/g, '') : null;
  const unit = containsNumber ? value.replace(/[\d.]/g, '') : null;
  
  // If numeric value, get the count target
  const countTarget = numericPart ? parseFloat(numericPart) : 0;
  const [count, setCount] = useState(0);
  
  // Animate counter when in view
  useEffect(() => {
    if (isInView && !hasAnimated && containsNumber) {
      // Start at zero
      setCount(0);
      
      // Calculate increment per frame for smooth animation
      const framesPerSecond = 60;
      const totalFrames = duration * framesPerSecond;
      const increment = countTarget / totalFrames;
      
      // Animate the counter
      let currentCount = 0;
      let frameCount = 0;
      
      const interval = setInterval(() => {
        frameCount++;
        currentCount = Math.min(currentCount + increment, countTarget);
        setCount(currentCount);
        
        if (frameCount >= totalFrames) {
          clearInterval(interval);
          setCount(countTarget);
          setHasAnimated(true);
        }
      }, 1000 / framesPerSecond);
      
      return () => clearInterval(interval);
    }
  }, [isInView, hasAnimated, containsNumber, countTarget, duration]);

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`neumorphism p-6 rounded-xl text-center overflow-hidden relative ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background pattern - subtle and elegant */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 w-20 h-20 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-16 h-16 bg-primary rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Animated highlight on inView */}
      {isInView && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}
      
      {/* Value with animation */}
      <motion.div 
        className="text-4xl font-unbounded font-bold text-primary mb-2"
        animate={isInView ? { scale: [0.8, 1.1, 1] } : { scale: 0.8 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: delay + 0.2,
        }}
      >
        {containsNumber ? (
          <>
            {count.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            {unit}
          </>
        ) : (
          <span className="gradient-text">{value}</span>
        )}
      </motion.div>
      
      {/* Label with animation */}
      <motion.div 
        className="text-text-secondary"
        animate={isInView ? { opacity: [0, 1], y: [10, 0] } : { opacity: 0, y: 10 }}
        transition={{ 
          duration: 0.5, 
          delay: delay + 0.4
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
} 