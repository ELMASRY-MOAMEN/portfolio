'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { FiArrowRight, FiCheckCircle, FiAward, FiLayers, FiTarget } from 'react-icons/fi';

export interface ProjectDetail {
  context: string;
  role: string;
  results: string[];
  lessons: string;
  skills: {
    soft: string[];
    hard: string[];
  };
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  detail: ProjectDetail;
  locale: string;
  projectId?: string; // Add projectId prop to identify which project is being displayed
}

const ProjectModal = ({ isOpen, onClose, title, detail, locale, projectId = '' }: ProjectModalProps) => {
  const [activeSection, setActiveSection] = useState(1);
  const [imgSrc, setImgSrc] = useState('');
  const isMayProject = projectId === 'MAY';
  const youtubeVideoId = 'mYmYd-POLNU'; // YouTube video ID for MAY project
  
  // Determine the image source based on the title
  useEffect(() => {
    if (title.includes('MAY') || title.includes('AI Export')) {
      setImgSrc('/images/MAY.jpg');
    } else if (title.includes('Samsung')) {
      setImgSrc('/images/Samsung.jpg');
    } else if (title.includes('SGS')) {
      setImgSrc('/images/SGS.jpg');
    } else if (title.includes('Xerox')) {
      setImgSrc('/images/XEROX.jpg');
    } else if (title.includes('Francis')) {
      setImgSrc('/images/FRANCIS.jpg');
    } else if (title.includes('DA Int.')) {
      setImgSrc('/images/DA.jpg');
    } else {
      setImgSrc('/images/YVEA.jpg');
    }
  }, [title]);

  // Désactiver le défilement de la page lorsque le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermer le modal avec la touche Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Section indicator animations
  const sectionIndicator = {
    inactive: { 
      scale: 0.9, 
      opacity: 0.5, 
      backgroundColor: 'rgba(var(--primary-rgb), 0.05)'
    },
    active: { 
      scale: 1, 
      opacity: 1, 
      backgroundColor: 'rgba(var(--primary-rgb), 0.15)' 
    }
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Scroll to section
  const scrollToSection = (sectionNumber: number) => {
    setActiveSection(sectionNumber);
    const sectionElement = document.getElementById(`section-${sectionNumber}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scroll event to update active section
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const sections = isMayProject ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
    
    for (const section of sections) {
      const el = document.getElementById(`section-${section}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  // Render YouTube embed for MAY project
  const renderYouTubeEmbed = () => (
    <div>
      <div className="text-sm text-gray-500 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        {locale === 'fr' 
          ? "Si la vidéo ne se charge pas, veuillez vérifier que les cookies YouTube sont autorisés dans votre navigateur ou cliquez sur le lien direct pour voir la vidéo." 
          : "If the video doesn't load, please check that YouTube cookies are allowed in your browser or click the direct link to watch the video."}
        <a 
          href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline ml-1"
        >
          {locale === 'fr' ? "Voir sur YouTube" : "Watch on YouTube"}
        </a>
      </div>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe 
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&showinfo=0&autoplay=0`}
          title="MAY AI Presentation"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );

  // Render image header or YouTube embed based on project
  const renderHeaderMedia = () => {
    return (
      <div className="relative h-40 md:h-64 w-full">
        <Image 
          src={imgSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex flex-col justify-end">
          <div className="p-6 md:p-8 text-white">
            <motion.h2 
              className="text-2xl md:text-3xl font-unbounded font-bold" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h2>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:text-primary transition-colors shadow-md hover:shadow-lg"
          aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
        >
          <IoMdClose size={24} />
        </button>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop avec flou */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Contenu du modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6 md:p-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[90vh] pointer-events-auto flex flex-col"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero header with image or YouTube video */}
              {renderHeaderMedia()}
              
              {/* Navigation dots */}
              <div className="hidden md:flex justify-center gap-4 py-3 border-b bg-gray-50 sticky top-0 z-10">
                {(isMayProject ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5]).map(num => (
                  <motion.button
                    key={num}
                    className="flex flex-col items-center gap-1"
                    onClick={() => scrollToSection(num)}
                    variants={sectionIndicator}
                    initial="inactive"
                    animate={activeSection === num ? "active" : "inactive"}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-1.5 rounded-full bg-primary/60 transition-all" 
                      style={{ opacity: activeSection === num ? 1 : 0.2 }} 
                    />
                    <span className="text-xs font-medium text-gray-600">
                      {num === 1 && (locale === 'fr' ? 'Contexte' : 'Context')}
                      {num === 2 && (locale === 'fr' ? 'Rôle' : 'Role')}
                      {num === 3 && (locale === 'fr' ? 'Résultats' : 'Results')}
                      {num === 4 && (locale === 'fr' ? 'Leçons' : 'Lessons')}
                      {num === 5 && (locale === 'fr' ? 'Compétences' : 'Skills')}
                      {num === 6 && (locale === 'fr' ? 'Média' : 'Media')}
                    </span>
                  </motion.button>
                ))}
              </div>
              
              {/* Corps du modal avec défilement */}
              <div 
                className="p-4 sm:p-6 md:p-8 overflow-y-auto"
                style={{ maxHeight: 'calc(90vh - 64px - 40px)' }}
                onScroll={handleScroll}
              >
                {/* Display title for MAY project since it's not in the header image */}
                {isMayProject && (
                  <motion.h2 
                    className="text-2xl md:text-3xl font-unbounded font-bold mb-6 text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {title}
                  </motion.h2>
                )}
                
                <div className="max-w-4xl mx-auto space-y-16 py-4">
                  {/* Section Contexte */}
                  <motion.div 
                    id="section-1"
                    className="scroll-mt-20"
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                        <FiTarget size={24} />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {locale === 'fr' ? 'Contexte du projet' : 'Project Context'}
                      </h4>
                    </div>
                    <div className="pl-16">
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p>{detail.context}</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Section Rôle/Approche */}
                  <motion.div 
                    id="section-2"
                    className="scroll-mt-20"
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                        <FiLayers size={24} />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {locale === 'fr' ? 'Mon rôle / Mon approche' : 'My Role / Approach'}
                      </h4>
                    </div>
                    <div className="pl-16">
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p>{detail.role}</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Section Résultats */}
                  <motion.div 
                    id="section-3"
                    className="scroll-mt-20"
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                        <FiAward size={24} />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {locale === 'fr' ? 'Résultats clés' : 'Key Results'}
                      </h4>
                    </div>
                    <div className="pl-16">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {detail.results.map((result, index) => (
                          <motion.div 
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex gap-3">
                              <div className="text-primary shrink-0 mt-1">
                                <FiCheckCircle size={20} />
                              </div>
                              <p className="text-gray-800 font-medium">
                                {result}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Section Leçons */}
                  <motion.div 
                    id="section-4"
                    className="scroll-mt-20"
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                        <FiArrowRight size={24} />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {locale === 'fr' ? 'Leçons apprises' : 'Lessons Learned'}
                      </h4>
                    </div>
                    <div className="pl-16">
                      <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                        <div className="prose prose-lg max-w-none text-gray-700">
                          <p>{detail.lessons}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Section Compétences */}
                  <motion.div 
                    id="section-5"
                    className="scroll-mt-20"
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                          <line x1="3" y1="22" x2="21" y2="22"></line>
                        </svg>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {locale === 'fr' ? 'Compétences mobilisées' : 'Skills Utilized'}
                      </h4>
                    </div>
                    
                    <div className="pl-16">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Soft Skills */}
                        <motion.div 
                          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-6 py-4 border-b">
                            <h5 className="font-semibold text-primary">
                              {locale === 'fr' ? 'Compétences interpersonnelles' : 'Soft Skills'}
                            </h5>
                          </div>
                          <div className="p-5">
                            <div className="flex flex-wrap gap-2">
                              {detail.skills.soft.map((skill, index) => (
                                <motion.span 
                                  key={index} 
                                  className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full transition-all hover:shadow-md hover:bg-primary/15"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.1 + (index * 0.1) }}
                                  whileHover={{ y: -2 }}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Hard Skills */}
                        <motion.div 
                          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-6 py-4 border-b">
                            <h5 className="font-semibold text-primary">
                              {locale === 'fr' ? 'Compétences techniques' : 'Hard Skills'}
                            </h5>
                          </div>
                          <div className="p-5">
                            <div className="flex flex-wrap gap-2">
                              {detail.skills.hard.map((skill, index) => (
                                <motion.span 
                                  key={index} 
                                  className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full transition-all hover:shadow-md hover:bg-primary/15"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 + (index * 0.1) }}
                                  whileHover={{ y: -2 }}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Section Media (conditionally rendered for MAY project) */}
                  {isMayProject && (
                    <motion.div 
                      id="section-6"
                      className="scroll-mt-20"
                      variants={contentVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                          </svg>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                          {locale === 'fr' ? 'Présentation vidéo' : 'Video Presentation'}
                        </h4>
                      </div>
                      
                      <div className="pl-16">
                        <div className="mt-2 mb-6">
                          {renderYouTubeEmbed()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 