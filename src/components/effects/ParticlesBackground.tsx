'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

export default function ParticlesBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Generate particles
    const generateParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 30), 40); // Max 40 particles
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          color: i % 3 === 0 ? '#0052FF' : (i % 3 === 1 ? '#EBF1FF' : '#B2C5FF'),
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      
      setParticles(newParticles);
    };

    // Handle resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      generateParticles();
    };

    // Initial generation
    generateParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            x: [
              0,
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
              0,
            ],
            y: [
              0,
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
              0,
            ],
            opacity: [
              particle.opacity,
              particle.opacity + 0.2,
              particle.opacity,
              particle.opacity - 0.1,
              particle.opacity,
            ],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
} 