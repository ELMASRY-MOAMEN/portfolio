'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/layout/AnimatedSection';
import AnimatedButton from '@/components/ui/animated-button';
import Image from 'next/image';
import { HiDocumentText, HiCurrencyDollar, HiOfficeBuilding, HiCode, HiRefresh, HiGlobeAlt, HiLightBulb, HiChartBar, HiAcademicCap, HiUser, HiUserGroup, HiChatAlt, HiClipboardCheck } from 'react-icons/hi';
import DigitalGlobe from './DigitalGlobe';
import ParticleFlowAnimation from './ParticleFlowAnimation';
import AdvancedDataMesh from './AdvancedDataMesh';
import MetricBadge from '../ui/MetricBadge';
import ScrollIndicator from '../ui/ScrollIndicator';
import clsx from 'clsx';
import { Button } from '../ui/button';

// EnhancedTimeline component for project phases
const EnhancedTimeline = ({ phases }: { phases: any[] }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { locale } = useTranslation();

  return (
    <div className="mt-16">
      {/* Timeline horizontal (toujours visible) */}
      <div className="relative mb-16">
        {/* Ligne de temps */}
        <div className="absolute h-1 bg-primary/20 top-8 left-0 right-0 z-0"></div>
        
        {/* Timeline nodes */}
        <div className="flex justify-between relative z-10">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className={`cursor-pointer transition-all duration-300 flex flex-col items-center`}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-primary text-white scale-110' 
                    : 'bg-white border-2 border-primary/40 text-primary hover:border-primary'
                }`}
              >
                {phase.icon}
              </div>
              <span className="text-xs font-semibold mt-4 bg-gray-100 px-3 py-1.5 rounded">
                {phase.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu collapsed pour chaque étape */}
      <div className="grid grid-cols-1 gap-8 my-16">
        {phases.map((phase, index) => (
          <motion.div 
            key={index}
            initial={{ height: activeStep === index ? 'auto' : '124px' }}
            animate={{ height: activeStep === index ? 'auto' : '124px' }}
            className={`relative overflow-hidden border rounded-xl transition-all duration-300 ${
              activeStep === index 
                ? 'bg-white shadow-lg border-primary' 
                : 'bg-white/50 border-gray-200 hover:border-primary/30'
            }`}
          >
            {/* Collapsed view */}
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">{phase.icon}</span>
                    {locale === 'fr' ? `Étape ${index + 1}: ` : `Phase ${index + 1}: `}{phase.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-4">
                    {locale === 'fr' ? 'Période: ' : 'Period: '}{phase.year}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {phase.tags?.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="inline-block bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 font-medium">
                    {phase.impact}
                  </p>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStep(activeStep === index ? null : index);
                  }}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center ${
                    activeStep === index 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {activeStep === index ? (
                    <>{locale === 'fr' ? 'Réduire' : 'Collapse'} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                  ) : (
                    <>{locale === 'fr' ? 'En savoir plus' : 'Learn more'} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                  )}
                </button>
              </div>
              
              {/* Expanded view */}
              {activeStep === index && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Objectif:' : 'Objective:'}</h4>
                      <p className="text-gray-700 mb-8">{phase.objective}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Démarche:' : 'Approach:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.approach}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Moyens:' : 'Resources:'}</h4>
                      <p className="text-gray-700 mb-8">{phase.resources}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-4">{locale === 'fr' ? 'Impact:' : 'Impact:'}</h4>
                      <div className="bg-primary/10 p-8 rounded-lg">
                        <p className="text-gray-800 font-medium">{phase.impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const YVEAProjectContent = (): JSX.Element => {
  const { t, locale } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  
  const toggleExpand = (): void => setIsExpanded(!isExpanded);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleResize = (): void => {
    // Logic for responsive behavior
  };
  
  // Content based on locale
  const content = locale === 'fr' ? t.fr : t.en;
  
  return (
    <main className="bg-white min-h-screen">
      {/* Hero section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary/5 to-white">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  {locale === 'fr' ? 'Échanger sur ce projet' : 'Discuss this project'}
                </AnimatedButton>
                
                <AnimatedButton 
                  href="https://github.com/ELMASRY-MOAMEN" 
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
                {/* Digital Globe animation in background */}
                <DigitalGlobe />
                
                {/* Badges */}
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
      
      {/* Context Section */}
      <AnimatedSection 
        className="py-24 bg-gray-50"
        direction="up"
        withGrain={false}
      >
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.contextTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100/80 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-4">
                {content.beforeTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {content.beforeContent}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100/80 flex flex-col transform md:translate-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                {content.bridgeTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {content.bridgeContent}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100/80 flex flex-col">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-4">
                {content.afterTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {content.afterContent}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <button 
              className="inline-flex items-center px-6 py-3 bg-primary/5 hover:bg-primary/10 transition-colors rounded-xl text-primary font-medium group"
              onClick={toggleExpand}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {content.visualizationText}
              <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Evolution Section */}
      <AnimatedSection 
        className="py-24 bg-white"
        direction="up"
        withGrain={false}
      >
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.evolutionTitle}
          </h2>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {content.evolutionSubtitle}
          </p>
          
          <EnhancedTimeline phases={content.phases} />
        </div>
      </AnimatedSection>
      
      {/* Mon Rôle Section */}
      <AnimatedSection 
        className="py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-unbounded font-bold mb-8">
                {content.pmRoleTitle}
              </h2>
              <p className="text-lg text-primary font-medium mb-8">
                {content.pmRoleSubtitle}
              </p>
              <p className="text-gray-700 mb-8">
                {content.pmRoleDescription}
              </p>
              
              {/* Crisis Resolution */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80 mt-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <HiLightBulb className="w-6 h-6 text-primary mr-3" />
                  {content.crisisTitle}
                </h3>
                <p className="text-gray-700">
                  {content.crisisDescription}
                </p>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold mb-8">
                {content.responsibilitiesTitle}
              </h3>
              
              <div className="grid grid-cols-1 gap-8">
                {content.responsibilities.map((responsibility, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100/80"
                  >
                    <h4 className="font-bold text-lg mb-4 text-gray-800">
                      {responsibility.title}
                    </h4>
                    <p className="text-gray-700">
                      {responsibility.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Approach */}
              <div className="bg-primary/5 p-8 rounded-xl mt-8">
                <h3 className="text-xl font-bold mb-4">
                  {content.approachTitle}
                </h3>
                <p className="text-gray-700 mb-6">
                  {content.approachDescription}
                </p>
                <ul className="space-y-4">
                  {content.approachItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary mr-4 mt-0.5 shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-6 font-medium">
                  {content.approachConclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Results section */}
      <AnimatedSection 
        className="py-24 bg-primary/5"
        direction="up"
        withGrain={false}
      >
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.resultsTitle}
          </h2>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {content.resultsSubtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center">
                <HiChartBar className="w-6 h-6 text-primary mr-3" />
                {locale === 'fr' ? 'Résultats quantifiables' : 'Quantifiable Results'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {content.businessResults.map((result, index) => (
                  <MetricBadge
                    key={index}
                    metric={result.metric}
                    description={result.description}
                  />
                ))}
              </div>
              
              {/* Feedback */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80 mt-8 relative">
                <div className="absolute -top-4 -left-4 text-primary text-opacity-10 pointer-events-none">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="text-lg italic text-gray-700 mb-6 relative z-10">
                  "{content.feedbackQuote}"
                </div>
                <div className="flex justify-end">
                  <div className="text-sm text-right">
                    <div className="font-bold text-gray-900">
                      {content.feedbackAuthor}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center">
                <HiCode className="w-6 h-6 text-primary mr-3" />
                {locale === 'fr' ? 'Stack technique' : 'Technical Stack'}
              </h3>
              
              <div className="space-y-8">
                {content.techResults.map((tech, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80"
                  >
                    <h4 className="font-bold text-lg mb-4 text-gray-800">
                      {tech.title}
                    </h4>
                    <p className="text-gray-700">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-8 text-center">
              {content.testimonialsTitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80"
                >
                  <div className="text-gray-700 mb-6 relative">
                    <div className="absolute -top-2 -left-2 text-primary text-opacity-10 pointer-events-none">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="relative z-10">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Lessons learned Section */}
      <AnimatedSection 
        className="py-24 bg-white"
        direction="up"
        withGrain={true}
      >
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-8 text-center">
            {content.lessonsTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {content.lessonsChallenges.map((lesson, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80 hover:shadow-lg transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110">
                  <HiAcademicCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {lesson.title}
                </h3>
                <p className="text-gray-700">
                  {lesson.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      {/* Skills Section */}
      <AnimatedSection 
        className="py-24 bg-gray-50"
        direction="up"
        withGrain={false}
      >
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-unbounded font-bold mb-16 text-center">
            {content.skillsTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.skillsCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80"
              >
                <h3 className="text-xl font-bold mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-start">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary mr-4 shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      {/* Conclusion Section */}
      <AnimatedSection 
        className="py-24 bg-primary/5 relative overflow-hidden"
        direction="up"
        withGrain={true}
      >
        <div className="absolute inset-0 opacity-20">
          <AdvancedDataMesh />
        </div>
        
        <div className="container-custom max-w-3xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-unbounded font-bold mb-8">
              {content.conclusionTitle}
            </h2>
            <p className="text-xl text-gray-700">
              {content.conclusionText}
            </p>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-2xl font-unbounded font-bold mb-8">
              {content.futureTitle}
            </h2>
            <p className="text-lg text-gray-700">
              {content.futureText}
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center mt-16">
            <h3 className="text-xl font-unbounded font-bold mb-6">
              {content.callToAction}
            </h3>
            <p className="text-gray-700 mb-8 text-center max-w-xl">
              {content.callToActionSubtext}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <AnimatedButton 
                href="https://calendly.com/elmasrymoamen/30min" 
                target="_blank"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              >
                {locale === 'fr' ? 'Réserver un échange' : 'Book a meeting'}
              </AnimatedButton>
              
              <AnimatedButton 
                href={`/${locale}`}
                variant="outline"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                }
              >
                {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Scroll indicator */}
      <ScrollIndicator />
    </main>
  );
};

// Definition of Lesson type before the LessonsLearnedStepper component
interface Lesson {
  title: string;
  description: string;
}

// The LessonsLearnedStepper component - simplifié car il n'est plus utilisé dans la nouvelle structure
const LessonsLearnedStepper = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const { locale } = useTranslation();
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 text-center">
        Placeholder for lessons learned content
      </div>
    </div>
  );
};

export default YVEAProjectContent;