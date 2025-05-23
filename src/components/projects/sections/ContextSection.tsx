import { motion } from 'framer-motion';
import AnimatedSection from '@/components/layout/AnimatedSection';

interface ContextSectionProps {
  content: any;
}

const ContextSection = ({ content }: ContextSectionProps) => {
  return (
    <AnimatedSection 
      className="py-24 bg-gray-50"
      direction="up"
      withGrain={false}
    >
      <div id="context-section" className="container-custom max-w-6xl">
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
      </div>
    </AnimatedSection>
  );
};

export default ContextSection; 