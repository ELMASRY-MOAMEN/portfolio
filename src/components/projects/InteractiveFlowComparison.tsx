'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';

const InteractiveFlowComparison = () => {
  const { locale } = useTranslation();
  const [activeFlow, setActiveFlow] = useState<'current' | 'new'>('current');

  return (
    <div className="my-12">
      <div className="mb-8 prose dark:prose-invert prose-lg max-w-none">
        <h2 className="text-3xl font-bold mb-4">
          {locale === 'fr' ? "Contexte du projet" : "Project Context"}
        </h2>
        
        <p>
          {locale === 'fr' 
            ? "Le processus traditionnel de certification VoC est actuellement freiné par une multitude de tâches manuelles : vérifications répétées, envois, relances et allers-retours incessants entre les équipes. Ce manque de coordination entraîne des délais de traitement de 2 à 5 jours, générant une frustration notable chez les clients et une perte d'efficacité interne."
            : "The traditional VoC certification process is currently hindered by a multitude of manual tasks: repeated verifications, submissions, follow-ups, and constant back-and-forth between teams. This lack of coordination leads to processing delays of 2 to 5 days, generating significant customer frustration and internal efficiency loss."}
        </p>
        
        <p>
          {locale === 'fr'
            ? "Sans automatisation, les dossiers – qu'ils soient simples ou complexes – subissent des retards majeurs et présentent des risques d'erreurs et d'incohérences dans les contrôles, ce qui affecte la qualité du service et les coûts opérationnels."
            : "Without automation, files – whether simple or complex – suffer major delays and present risks of errors and inconsistencies in controls, affecting service quality and operational costs."}
        </p>
        
        <p>
          {locale === 'fr'
            ? "YVEA répond à ce défi en automatisant de bout en bout l'ensemble du processus. Grâce à une plateforme intégrée qui combine l'OCR, la GED et l'IA, YVEA coordonne les vérifications, fournit des rétroactions immédiates en cas d'anomalie et structure automatiquement les pièces requises. Vous pouvez consulter deux schémas interactifs pour visualiser :"
            : "YVEA addresses this challenge by automating the entire process end-to-end. Through an integrated platform combining OCR, EDM, and AI, YVEA coordinates verifications, provides immediate feedback in case of anomalies, and automatically structures required documents. You can view two interactive diagrams to visualize:"}
        </p>
      </div>
      
      {/* Flow Comparison Tabs */}
      <div className="flex mb-4">
        <button
          className={`px-6 py-3 font-medium rounded-tl-lg rounded-tr-lg transition-colors ${
            activeFlow === 'current'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveFlow('current')}
        >
          {locale === 'fr' ? "Sans YVEA" : "Without YVEA"}
        </button>
        <button
          className={`px-6 py-3 font-medium rounded-tl-lg rounded-tr-lg transition-colors ${
            activeFlow === 'new'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setActiveFlow('new')}
        >
          {locale === 'fr' ? "Avec YVEA" : "With YVEA"}
        </button>
      </div>
      
      {/* Flow Diagram */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden p-4 bg-white dark:bg-gray-800">
        <motion.div
          key={activeFlow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full"
        >
          {activeFlow === 'current' ? (
            <div>
              <div className="mb-4 text-lg font-semibold text-red-600 dark:text-red-400">
                {locale === 'fr' 
                  ? "Sans YVEA : Un flux fragmenté et manuel, avec des délais lourds."
                  : "Without YVEA: A fragmented and manual flow, with heavy delays."}
              </div>
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/downloads/Current flow.png"
                  alt={locale === 'fr' ? "Flux de travail actuel sans YVEA" : "Current workflow without YVEA"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">
                {locale === 'fr'
                  ? "Avec YVEA : Un processus digitalisé et fluidifié, réduisant drastiquement les temps de traitement à quelques heures seulement."
                  : "With YVEA: A digitalized and streamlined process, drastically reducing processing times to just a few hours."}
              </div>
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/downloads/New flow.png"
                  alt={locale === 'fr' ? "Nouveau flux de travail avec YVEA" : "New workflow with YVEA"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="mt-6 prose dark:prose-invert max-w-none">
        <p>
          {locale === 'fr'
            ? "Cette transformation améliore la précision, accélère la certification et offre un avantage concurrentiel significatif, en réduisant non seulement les délais mais également les coûts opérationnels."
            : "This transformation improves accuracy, accelerates certification, and offers a significant competitive advantage by reducing not only delays but also operational costs."}
        </p>
      </div>
    </div>
  );
};

export default InteractiveFlowComparison; 