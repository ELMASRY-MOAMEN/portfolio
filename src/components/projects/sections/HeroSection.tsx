import { motion } from 'framer-motion';
import { HiCode, HiLightBulb } from 'react-icons/hi';
import AnimatedButton from '@/components/ui/animated-button';
import DigitalGlobe from '../DigitalGlobe';

interface HeroSectionProps {
  content: any;
  locale: string;
}

const HeroSection = ({ content, locale }: HeroSectionProps) => {
  return (
    <section id="hero-section" className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-white">
      <div className="container-custom max-w-6xl relative">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1">
            <motion.h1
              className="text-4xl md:text-5xl font-unbounded font-bold mb-8 leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {content.heroTitle}
            </motion.h1>
            
            <motion.p
              className="text-sm text-primary font-bold uppercase tracking-wide mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              {locale === 'fr' 
                ? "Alternance ingénieur IA recherchée (BAC+5)"
                : "AI apprenticeship sought (BAC+5)"
              }
            </motion.p>
            
            <motion.p 
              className="text-xl font-semibold text-primary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {content.heroSubtitle}
            </motion.p>

            <motion.p 
              className="text-lg text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.intro}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedButton 
                href="https://calendly.com/elmasrymoamen/30min" 
                target="_blank"
                variant="primary"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              >
                {locale === 'fr' ? 'Échanger sur ce projet' : 'Discuss this project'}
              </AnimatedButton>
              
              <AnimatedButton 
                href="https://github.com/ELMASRY-MOAMEN/YVEA/blob/main/README.md" 
                target="_blank"
                variant="outline"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                }
              >
                {locale === 'fr' ? 'Voir mon GitHub' : 'View my GitHub'}
              </AnimatedButton>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex-1 order-1 md:order-2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-96 w-full">
              <DigitalGlobe />
              
              <motion.div 
                className="absolute top-16 left-4 bg-white/90 backdrop-blur rounded-xl shadow-lg px-6 py-4 z-20 border border-primary/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <HiCode className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500">Stack</div>
                    <div className="font-bold">NestJS + React + OCR + IA</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-16 right-4 bg-white/90 backdrop-blur rounded-xl shadow-lg px-6 py-4 z-20 border border-primary/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <HiLightBulb className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500">Agent IA</div>
                    <div className="font-bold">GPT-4o mini + Azure OpenAI</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 