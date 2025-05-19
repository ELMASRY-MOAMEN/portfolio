import AnimatedProfile from './AnimatedProfile';
import AnimatedButton from '@/components/ui/animated-button';
import { motion } from 'framer-motion';

interface ProfileSectionProps {
  content: {
    heroTitle: string;
    heroRole: string;
    heroSubtitle: string[];
    heroDescription: string;
    jobStatus: string;
    ctaDownload: string;
    ctaContact: string;
    profileAlt: string;
    profileBadges: {
      certifications: string;
      experience: string;
      projects: string;
    }
  };
  langPrefix: string;
  locale: string;
  isLoaded: boolean;
}

export default function ProfileSection({ content, langPrefix, locale, isLoaded }: ProfileSectionProps) {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.1 + 0.3,
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    })
  };

  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* TEXT CONTENT - LEFT SIDE */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <motion.h1 
              className="font-unbounded text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-text-primary"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={1}
              variants={fadeInUp}
            >
              <span className="gradient-text">{content.heroTitle}</span>
            </motion.h1>
            
            {/* Statut de recherche d'emploi */}
            <motion.div
              className="mb-4"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={1.5}
              variants={fadeInUp}
            >
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium inline-block">
                {content.jobStatus}
              </span>
            </motion.div>
            
            <motion.div
              className="text-2xl mb-4 text-text-secondary"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={2}
              variants={fadeInUp}
            >
              <span>{content.heroRole}</span>
            </motion.div>

            <motion.div 
              className="text-xl md:text-2xl mb-6 text-text-primary/80"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={3}
              variants={fadeInUp}
            >
              <div className="mb-4 relative pl-5 border-l-4 border-primary">
                {content.heroSubtitle.map((subtitle, index) => (
                  <div key={index} className="mb-1 last:mb-0">
                    {subtitle}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.p 
              className="text-lg mb-8 text-text-secondary leading-relaxed"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={4}
              variants={fadeInUp}
            >
              {content.heroDescription}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              custom={5}
              variants={fadeInUp}
            >
              <AnimatedButton 
                href={`/cv/CV_Moamen_Elmasry_Ingenieur_IA.pdf`}
                variant="primary"
                size="lg"
                isExternal
              >
                {content.ctaDownload}
              </AnimatedButton>
              
              <AnimatedButton 
                href={`${langPrefix}/contact`}
                variant="outline"
                size="lg"
              >
                {content.ctaContact}
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
        
        {/* PROFILE IMAGE - RIGHT SIDE */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              scale: isLoaded ? 1 : 0.9 
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedProfile 
              src="/images/profile.jpg"
              alt={content.profileAlt}
              badges={content.profileBadges}
              locale={locale}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 