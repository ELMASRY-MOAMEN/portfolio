'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnimatedProfileProps {
  src: string;
  alt: string;
  badges?: {
    certifications?: string;
    experience?: string;
    projects?: string;
    countries?: string;
  };
  locale: string;
}

export default function AnimatedProfile({
  src,
  alt,
  badges,
  locale
}: AnimatedProfileProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading delay for animation effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animate the container and badges with framer-motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        when: "beforeChildren", 
        staggerChildren: 0.2 
      } 
    }
  };
  
  const badgeVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 10 
      }
    }
  };
  
  return (
    <motion.div 
      className="relative w-80 h-80 md:w-96 md:h-96"
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {/* Decorative background effects */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-2xl"></div>
      <motion.div 
        className="absolute -inset-4 bg-[conic-gradient(var(--tw-gradient-stops))] from-primary via-primary-light to-primary rounded-full opacity-20"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      ></motion.div>
      
      {/* Profile image container */}
      <motion.div 
        className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-2xl"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image 
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 20rem, 24rem"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-700"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Subtle overlay on hover */}
        <motion.div 
          className="absolute inset-0 bg-primary/10 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Certification badge */}
      {badges?.certifications && (
        <motion.div 
          variants={badgeVariants}
          className="absolute top-0 -right-8 z-10"
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="glassmorphism flex items-center gap-2 p-3 rounded-xl shadow-lg border border-gray-200 bg-black/20">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <svg className="w-6 h-6 svg-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-white font-medium filter drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{locale === 'fr' ? 'Certifié' : 'Certified'}</div>
              <div className="font-bold text-white filter drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{badges.certifications}</div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Experience badge */}
      {badges?.experience && (
        <motion.div 
          variants={badgeVariants}
          className="absolute bottom-10 -left-8 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 4,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="glassmorphism flex items-center gap-2 p-3 rounded-xl shadow-lg border border-gray-200 bg-black/20">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <svg className="w-6 h-6 svg-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-white font-medium filter drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{locale === 'fr' ? 'Expérience' : 'Experience'}</div>
              <div className="font-bold text-white filter drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{badges.experience}</div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Projects badge - conditionally rendered */}
      {badges?.projects && (
        <motion.div 
          variants={badgeVariants}
          className="absolute top-1/3 -left-12 z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="glassmorphism flex items-center gap-2 p-3 rounded-xl shadow-lg border border-gray-200 bg-black/20">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <svg className="w-6 h-6 svg-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-white font-medium filter drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{locale === 'fr' ? 'Impact Business' : 'Business Impact'}</div>
              <div className="font-bold text-white filter drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{badges.projects}</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 