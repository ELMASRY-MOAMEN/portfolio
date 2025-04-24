'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import AnimatedSection from '@/components/layout/AnimatedSection';
import AnimatedButton from '@/components/ui/animated-button';
import Image from 'next/image';
import { HiDocumentText, HiCurrencyDollar, HiOfficeBuilding, HiCode, HiRefresh, HiGlobeAlt, HiLightBulb, HiChartBar } from 'react-icons/hi';
import DigitalGlobe from './DigitalGlobe';
import ParticleFlowAnimation from './ParticleFlowAnimation';
import AdvancedDataMesh from './AdvancedDataMesh';
import MetricBadge from '../ui/MetricBadge';
import ScrollIndicator from '../ui/ScrollIndicator';

// Types pour les modales des fonctionnalités
type ModalType = 'certificats' | 'ocr' | 'assistant' | 'messaging' | null;

// Composant Modal réutilisable
const FeatureModal = ({
  isOpen,
  onClose,
  title,
  children,
  themeColor = 'indigo'
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  themeColor?: 'indigo' | 'blue' | 'purple' | 'green';
}) => {
  // Map des classes de couleur selon le thème
  const colorClasses = {
    indigo: 'bg-indigo-600 text-white border-indigo-700',
    blue: 'bg-blue-600 text-white border-blue-700',
    purple: 'bg-purple-600 text-white border-purple-700',
    green: 'bg-green-600 text-white border-green-700'
  };

  // Fermeture de la modale sur Escape
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Animation avec Framer Motion
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-11/12 max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modale header avec titre et bouton de fermeture */}
        <div className={`p-4 flex items-center justify-between ${colorClasses[themeColor]}`}>
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Contenu de la modale avec scrolling interne */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </motion.div>
      
      {/* Overlay cliquable pour fermer la modale */}
      <div 
        className="absolute inset-0 z-[-1]" 
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
};

// EnhancedTimeline component for project phases
const EnhancedTimeline = ({ phases }: { phases: any[] }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { locale } = useTranslation();

  return (
    <div className="mt-8">
      {/* Timeline horizontal (toujours visible) */}
      <div className="relative mb-10">
        {/* Ligne de temps */}
        <div className="absolute h-1 bg-primary/20 top-6 left-0 right-0 z-0"></div>
        
        {/* Timeline nodes */}
        <div className="flex justify-between relative z-10">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className={`cursor-pointer transition-all duration-300 flex flex-col items-center`}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-primary text-white scale-110' 
                    : 'bg-white border-2 border-primary/40 text-primary hover:border-primary'
                }`}
              >
                {phase.icon}
              </div>
              <span className="text-xs font-semibold mt-2 bg-gray-100 px-2 py-1 rounded">
                {phase.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu collapsed pour chaque étape */}
      <div className="grid grid-cols-1 gap-6 my-8">
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
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">{phase.icon}</span>
                    {locale === 'fr' ? `Étape ${index + 1}: ` : `Phase ${index + 1}: `}{phase.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">
                    {locale === 'fr' ? 'Période: ' : 'Period: '}{phase.year}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {phase.tags?.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
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
                  className={`px-3 py-1 text-sm rounded-lg transition-colors flex items-center ${
                    activeStep === index 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-600 hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {activeStep === index ? (
                    <>{locale === 'fr' ? 'Réduire' : 'Collapse'} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
                  ) : (
                    <>{locale === 'fr' ? 'En savoir plus' : 'Learn more'} <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
                  )}
                </button>
              </div>
              
              {/* Expanded view */}
              {activeStep === index && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-4 border-t border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Objectif:' : 'Objective:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.objective}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Démarche:' : 'Approach:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.approach}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Moyens:' : 'Resources:'}</h4>
                      <p className="text-gray-700 mb-4">{phase.resources}</p>
                      
                      <h4 className="font-bold text-gray-800 mb-2">{locale === 'fr' ? 'Impact:' : 'Impact:'}</h4>
                      <div className="bg-primary/10 p-3 rounded-lg">
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

// Hook personnalisé pour initialiser le walkthrough Certificats
function useWalkthroughCertificats() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Importer les styles côté client
    const shepherdCss = document.createElement('link');
    shepherdCss.rel = 'stylesheet';
    shepherdCss.href = '/walkthroughs/css/shepherd-styles.css';
    document.head.appendChild(shepherdCss);
    const workflowCss = document.createElement('link');
    workflowCss.rel = 'stylesheet';
    workflowCss.href = '/walkthroughs/css/workflow-styles.css';
    document.head.appendChild(workflowCss);

    // Lazy load Shepherd.js et le walkthrough
    let cleanup = () => {};
    import('shepherd.js').then(() => {
      import('@/walkthroughs/shared/shepherd-base.js').then((shepherdBase) => {
        import('@/walkthroughs/workflow-certificats/js/workflow-tour.js').then((workflowTour) => {
          // Initialiser le walkthrough Certificats
          const { setupCertificatsTourTrigger } = workflowTour;
          setupCertificatsTourTrigger('tour-certificats-trigger');
        });
      });
    }).catch(() => {
      // Gestion d'erreur si Shepherd.js ne se charge pas
      // eslint-disable-next-line no-console
      console.error('Shepherd.js ou le walkthrough Certificats n\'ont pas pu être chargés.');
    });
    return cleanup;
  }, []);
}

// Hook personnalisé pour initialiser le walkthrough OCR
function useWalkthroughOcr() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Importer les styles côté client
    const shepherdCss = document.createElement('link');
    shepherdCss.rel = 'stylesheet';
    shepherdCss.href = '/walkthroughs/css/shepherd-styles.css';
    document.head.appendChild(shepherdCss);
    const ocrCss = document.createElement('link');
    ocrCss.rel = 'stylesheet';
    ocrCss.href = '/walkthroughs/css/ocr-styles.css';
    document.head.appendChild(ocrCss);

    // Lazy load Shepherd.js et le walkthrough
    let cleanup = () => {};
    import('shepherd.js').then(() => {
      import('@/walkthroughs/shared/shepherd-base.js').then((shepherdBase) => {
        import('@/walkthroughs/ocr-extraction/js/ocr-tour.js').then((ocrTour) => {
          // Initialiser le walkthrough OCR
          const { setupOcrTourTrigger } = ocrTour;
          setupOcrTourTrigger('tour-ocr-trigger');
        });
      });
    }).catch(() => {
      // Gestion d'erreur si Shepherd.js ne se charge pas
      console.error('Shepherd.js ou le walkthrough OCR n\'ont pas pu être chargés.');
    });
    return cleanup;
  }, []);
}

// Hook personnalisé pour initialiser le walkthrough Assistant
function useWalkthroughAssistant() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Importer les styles côté client
    const shepherdCss = document.createElement('link');
    shepherdCss.rel = 'stylesheet';
    shepherdCss.href = '/walkthroughs/css/shepherd-styles.css';
    document.head.appendChild(shepherdCss);
    const assistantCss = document.createElement('link');
    assistantCss.rel = 'stylesheet';
    assistantCss.href = '/walkthroughs/css/assistant-styles.css';
    document.head.appendChild(assistantCss);

    // Lazy load Shepherd.js et le walkthrough
    let cleanup = () => {};
    import('shepherd.js').then(() => {
      import('@/walkthroughs/shared/shepherd-base.js').then((shepherdBase) => {
        import('@/walkthroughs/assistant-ia/js/assistant-tour.js').then((assistantTour) => {
          // Initialiser le walkthrough Assistant
          const { setupAssistantTourTrigger } = assistantTour;
          setupAssistantTourTrigger('tour-assistant-trigger');
        });
      });
    }).catch(() => {
      // Gestion d'erreur si Shepherd.js ne se charge pas
      console.error('Shepherd.js ou le walkthrough Assistant n\'ont pas pu être chargés.');
    });
    return cleanup;
  }, []);
}

// Hook personnalisé pour initialiser le walkthrough Messaging
function useWalkthroughMessaging() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Importer les styles côté client
    const shepherdCss = document.createElement('link');
    shepherdCss.rel = 'stylesheet';
    shepherdCss.href = '/walkthroughs/css/shepherd-styles.css';
    document.head.appendChild(shepherdCss);
    const messagingCss = document.createElement('link');
    messagingCss.rel = 'stylesheet';
    messagingCss.href = '/walkthroughs/css/messaging-styles.css';
    document.head.appendChild(messagingCss);

    // Lazy load Shepherd.js et le walkthrough
    let cleanup = () => {};
    import('shepherd.js').then(() => {
      import('@/walkthroughs/shared/shepherd-base.js').then((shepherdBase) => {
        import('@/walkthroughs/messaging/js/messaging-tour.js').then((messagingTour) => {
          // Initialiser le walkthrough Messaging
          const { setupMessagingTourTrigger } = messagingTour;
          setupMessagingTourTrigger('tour-messaging-trigger');
        });
      });
    }).catch(() => {
      // Gestion d'erreur si Shepherd.js ne se charge pas
      console.error('Shepherd.js ou le walkthrough Messaging n\'ont pas pu être chargés.');
    });
    return cleanup;
  }, []);
}

const CertificatsModalContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="certificats-content">
      <div className="certificats-header text-2xl font-bold mb-4">Workflow de Certificats</div>
      
      <div className="mb-6 flex flex-col gap-4">
        <div className="new-certificate-button bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Création de nouveaux certificats</h3>
          <p>Initiez la création d'un nouveau certificat d'exportation en quelques clics.</p>
        </div>
        
        <div className="certificate-type-selector bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Sélection du type de certificat</h3>
          <div className="flex flex-wrap gap-3 mb-2">
            <span className="px-3 py-2 bg-white rounded-md shadow-sm">Certificat d'origine</span>
            <span className="px-3 py-2 bg-white rounded-md shadow-sm">Certificat sanitaire</span>
            <span className="px-3 py-2 bg-white rounded-md shadow-sm">Certificat de conformité</span>
          </div>
        </div>
        
        <div className="certificate-base-info bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Informations de base</h3>
          <p>Renseignez le pays de destination, l'acheteur et les informations d'expédition.</p>
        </div>
        
        <div className="products-section bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Gestion des produits</h3>
          <p>Ajoutez les produits concernés par l'exportation avec les détails requis.</p>
        </div>
        
        <div className="document-upload-zone bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Documents justificatifs</h3>
          <p>Téléchargez les documents requis pour appuyer votre demande de certification.</p>
        </div>
        
        <div className="validation-panel bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Validation automatique</h3>
          <p>Vérification automatique de la conformité de votre demande avant soumission.</p>
        </div>
        
        <div className="submission-controls bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Soumission</h3>
          <p>Envoyez votre demande de certificat aux autorités compétentes.</p>
        </div>
        
        <div className="certificate-status-tracker bg-indigo-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Suivi en temps réel</h3>
          <p>Suivez l'avancement de votre demande à chaque étape du processus.</p>
        </div>
      </div>
      
      <div className="certificats-footer text-center text-gray-500 mt-4">
        <p>Le workflow de certification d'YVEA automatise et simplifie le processus complexe d'obtention des documents export.</p>
        <button 
          id="tour-certificats-trigger"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Démarrer la visite guidée
        </button>
      </div>
    </div>
  );
};

const OcrModalContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="ocr-content">
      <div className="ocr-header text-2xl font-bold mb-4">OCR et Extraction Intelligente</div>
      
      <div className="mb-6 flex flex-col gap-4">
        <div className="document-uploader bg-blue-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Téléchargement de documents</h3>
          <p>Déposez vos documents commerciaux pour analyse et extraction automatique.</p>
        </div>
        
        <div className="ocr-progress bg-blue-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Traitement OCR</h3>
          <p>Visualisez la progression en temps réel de l'analyse de vos documents.</p>
        </div>
        
        <div className="extraction-preview bg-blue-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Aperçu des données extraites</h3>
          <p>Consultez les données extraites de vos documents avec mise en évidence.</p>
        </div>
        
        <div className="correction-interface bg-blue-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Interface de correction</h3>
          <p>Corrigez facilement les erreurs potentielles d'extraction avec des suggestions IA.</p>
        </div>
        
        <div className="data-validation bg-blue-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Validation des données</h3>
          <p>Vérifiez et validez l'ensemble des données avant utilisation.</p>
        </div>
        
        <div className="export-options bg-blue-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Options d'export</h3>
          <p>Choisissez comment vous souhaitez exploiter les données extraites.</p>
        </div>
        
        <div className="export-formats bg-blue-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Formats disponibles</h3>
          <div className="flex gap-3">
            <span className="px-3 py-2 bg-white rounded-md shadow-sm">Excel</span>
            <span className="px-3 py-2 bg-white rounded-md shadow-sm">CSV</span>
            <span className="px-3 py-2 bg-white rounded-md shadow-sm">JSON</span>
          </div>
        </div>
      </div>
      
      <div className="ocr-footer text-center text-gray-500 mt-4">
        <p>Le système OCR d'YVEA réduit de 80% le temps de traitement des documents d'exportation.</p>
        <button 
          id="tour-ocr-trigger"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Démarrer la visite guidée
        </button>
      </div>
    </div>
  );
};

const AssistantModalContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="assistant-content">
      <div className="assistant-icon text-2xl font-bold mb-4">Assistant Virtuel IA</div>
      
      <div className="mb-6 flex flex-col gap-4">
        <div className="assistant-trigger bg-purple-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Accès à l'assistant</h3>
          <p>Votre assistant export est accessible à tout moment pendant votre navigation.</p>
        </div>
        
        <div className="chatbox-container bg-purple-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Interface de dialogue</h3>
          <p>Posez vos questions en langage naturel et obtenez des réponses précises.</p>
        </div>
        
        <div className="assistant-capabilities bg-purple-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Capacités intelligentes</h3>
          <p>L'assistant répond à vos questions sur la réglementation export et vous guide dans vos démarches.</p>
        </div>
        
        <div className="document-analysis-section bg-purple-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Analyse de documents</h3>
          <p>Partagez vos documents avec l'assistant pour une analyse approfondie et des conseils personnalisés.</p>
        </div>
        
        <div className="context-indicator bg-purple-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Sensibilité au contexte</h3>
          <p>L'assistant s'adapte à votre profil, vos produits et vos marchés cibles.</p>
        </div>
        
        <div className="command-helper bg-purple-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Commandes spéciales</h3>
          <p>Utilisez des commandes dédiées pour des fonctionnalités avancées.</p>
        </div>
        
        <div className="feedback-controls bg-purple-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Feedback et amélioration</h3>
          <p>Aidez-nous à améliorer l'assistant en notant la pertinence des réponses.</p>
        </div>
      </div>
      
      <div className="assistant-footer text-center text-gray-500 mt-4">
        <p>L'Assistant IA d'YVEA réduit de 85% les demandes de support de premier niveau.</p>
        <button 
          id="tour-assistant-trigger"
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
        >
          Démarrer la visite guidée
        </button>
      </div>
    </div>
  );
};

const MessagingModalContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="messaging-content">
      <div className="messaging-header text-2xl font-bold mb-4">Messagerie Collaborative</div>
      
      <div className="mb-6 flex flex-col gap-4">
        <div className="conversation-list bg-green-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Centre de messagerie</h3>
          <p>Accédez à toutes vos conversations avec les partenaires et organismes de certification.</p>
        </div>
        
        <div className="message-status-indicators bg-green-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Indicateurs en temps réel</h3>
          <p>Suivez l'état de vos messages (envoyé, reçu, lu) en temps réel.</p>
        </div>
        
        <div className="attachment-zone bg-green-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Partage de fichiers</h3>
          <p>Échangez facilement des documents et pièces jointes avec vos interlocuteurs.</p>
        </div>
        
        <div className="contextual-references bg-green-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Références contextuelles</h3>
          <p>Intégrez des références aux certificats et documents directement dans vos messages.</p>
        </div>
        
        <div className="security-badge bg-green-100 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Sécurité des échanges</h3>
          <p>Profitez d'un système de messagerie sécurisé avec chiffrement de bout en bout.</p>
        </div>
      </div>
      
      <div className="messaging-footer text-center text-gray-500 mt-4">
        <p>La messagerie collaborative d'YVEA accélère les échanges et réduit les délais de validation de 60%.</p>
        <button 
          id="tour-messaging-trigger"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Démarrer la visite guidée
        </button>
      </div>
    </div>
  );
};

const YVEAProjectContent = () => {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr');
  const { t, locale: currentLocale } = useTranslation();
  
  // État pour gérer les modales de fonctionnalités
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Fonction pour fermer la modale active
  const closeModal = () => setActiveModal(null);
  
  // Chargement des hooks de walkthroughs
  useWalkthroughCertificats();
  useWalkthroughOcr();
  useWalkthroughAssistant();
  useWalkthroughMessaging();
  
  const [isParticleVisible, setIsParticleVisible] = useState(true);
  const [visualizationTab, setVisualizationTab] = useState('before');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Désactiver les particules sur les appareils mobiles pour améliorer les performances
    const handleResize = () => {
      setIsParticleVisible(window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Content based on selected language
  const content = {
    fr: {
      heroTitle: "YVEA – Le portail vers la certification export simplifiée",
      heroSubtitle: "Automatisation intelligente des processus de certification pour l'export vers l'Afrique et le Moyen-Orient.",
      intro: "Découvrez la première plateforme qui automatise de bout en bout la certification des marchandises destinées à l'Afrique et au Moyen-Orient, transformant des processus manuels en une expérience digitale ultra-rapide et fiable grâce à l'OCR, la GED et l'IA.",
      contextTitle: "Contexte du projet",
      beforeTitle: "BEFORE",
      beforeContent: "Le processus traditionnel de certification VoC est actuellement freiné par une multitude de tâches manuelles: vérifications répétées, envois, relances et allers-retours incessants entre les équipes. Ce manque de coordination entraîne des délais de traitement de 2 à 5 jours, générant une frustration notable chez les clients et une perte d'efficacité interne.",
      bridgeTitle: "BRIDGE",
      bridgeContent: "YVEA répond à ce défi en automatisant de bout en bout l'ensemble du processus. Grâce à une plateforme intégrée qui combine l'OCR, la GED et l'IA, YVEA coordonne les vérifications, fournit des rétroactions immédiates en cas d'anomalie et structure automatiquement les pièces requises.",
      afterTitle: "AFTER",
      afterContent: "Cette transformation améliore la précision de 90%, accélère la certification (de jours à heures) et offre un avantage concurrentiel significatif, en réduisant non seulement les délais mais également les coûts opérationnels de 40%.",
      visualizationText: "Visualisation interactive: Comparez les flux de travail [Sans YVEA] vs [Avec YVEA]",
      evolutionTitle: "Évolution du projet",
      evolutionSubtitle: "De la conceptualisation à la solution SaaS IA industrialisée en 6 étapes clés",
      phases: [
        {
          year: "2022",
          title: "Cahier des Charges & Recherche de Financements",
          description: "Validation du concept de YVEA et démonstration de sa viabilité économique en définissant précisément les besoins du marché de la certification export.",
          impact: "Validation de la vision du projet et obtention d'un financement initial de 40K€ auprès de BNP Paribas",
          icon: <HiDocumentText size={20} />,
          tags: ["#BusinessModel", "#PitchDeck", "#Financement"],
          objective: "Valider le concept de YVEA et démontrer sa viabilité économique en définissant précisément les besoins du marché de la certification export.",
          approach: "Réalisation d'un Business Model Canvas, élaboration d'un business plan complet, création d'un pitch deck et constitution d'un cahier des charges détaillé, intégrant des prévisions financières et une estimation du retour sur investissement.",
          resources: "Collecte d'informations de marché, collaboration avec des experts sectoriels et financiers, et rédaction de documents stratégiques solides pour préparer un dossier convaincant."
        },
        {
          year: "2022-Q2",
          title: "Maquettage & Incubation",
          description: "Conception d'une maquette interactive sur Figma et révision du pitch deck afin de présenter clairement la proposition de valeur aux partenaires et incubateurs.",
          impact: "Obtention d'une subvention d'innovation de 30K€ via Paris Innovation Amorçage et d'un crédit AWS de 15K$",
          icon: <HiCurrencyDollar size={20} />,
          tags: ["#Prototyping", "#UX/UI", "#Incubation"],
          objective: "Transformer le concept en une maquette interactive qui puisse capter l'intérêt du marché et préparer la phase de développement.",
          approach: "Conception d'une maquette interactive sur Figma et révision du pitch deck afin de présenter clairement la proposition de valeur aux partenaires et incubateurs.",
          resources: "Collaboration avec un cabinet de design parisien pour créer une interface moderne et esthétique, et participation à l'incubateur Pepinière27 pour renforcer la crédibilité du projet."
        },
        {
          year: "2022-Q3/Q4",
          title: "Développement Initial du MVP",
          description: "Développement du MVP en utilisant la stack MERN avec une organisation SCRUM en sprints de 2 semaines, incluant des phases de tests pilotes auprès d'un panel de 50 utilisateurs.",
          impact: "Lancement d'un MVP validé, démontrant la faisabilité technique et l'intérêt fonctionnel de la solution",
          icon: <HiOfficeBuilding size={20} />,
          tags: ["#MVP", "#MERN", "#SCRUM"],
          objective: "Lancer une première version fonctionnelle de YVEA afin de tester la faisabilité technique et recueillir les premiers retours des utilisateurs.",
          approach: "Développement du MVP en utilisant la stack MERN avec une organisation SCRUM en sprints de 2 semaines, incluant des phases de tests pilotes auprès d'un panel de 50 utilisateurs.",
          resources: "Formation d'une équipe tech franco-pakistanaise (recrutement d'un associé CTO et d'un développeur alternant fullstack), développement initial en JavaScript et déploiement sur AWS pour garantir la rapidité de mise en œuvre."
        },
        {
          year: "2023-Q1/Q2",
          title: "Itérations & Refactorisation",
          description: "Recueil intensif de feedbacks auprès des utilisateurs et des organismes de certification, suivi d'une refactorisation complète (passage de JavaScript à TypeScript) et d'améliorations de l'UX/UI.",
          impact: "Amélioration significative de la stabilité, de la sécurité et de la fluidité de la solution",
          icon: <HiCode size={20} />,
          tags: ["#Refactoring", "#TypeScript", "#UserFeedback"],
          objective: "Optimiser le MVP en intégrant les retours des utilisateurs et en renforçant sa robustesse technique pour mieux répondre aux besoins du marché.",
          approach: "Recueil intensif de feedbacks auprès des utilisateurs et des organismes de certification, suivi d'une refactorisation complète (passage de JavaScript à TypeScript) et d'améliorations de l'UX/UI.",
          resources: "Mise en place de sessions quotidiennes de standups, utilisation de méthodologies Agile (SCRUM, RICE, MoSCoW) pour la priorisation des fonctionnalités et collaboration étroite avec les parties prenantes pour affiner la solution."
        },
        {
          year: "2023-Q3/Q4",
          title: "Industrialisation & Lancement de la V1",
          description: "Levée de fonds supplémentaire (50K€ obtenus via BNP), refonte complète de l'architecture technique et amélioration de l'UI/UX, incluant l'intégration d'une marketplace de services partenaires.",
          impact: "Lancement réussi de la V1, avec une solution stable et scalable ouvrant de nouvelles opportunités internationales",
          icon: <HiRefresh size={20} />,
          tags: ["#Scaling", "#V1", "#Marketplace"],
          objective: "Transformer le prototype en une solution industrialisée, prête pour un déploiement à grande échelle et capable de conquérir le marché international.",
          approach: "Levée de fonds supplémentaire (50K€ obtenus via BNP), refonte complète de l'architecture technique (migration complète vers AWS, mise en œuvre de Terraform, sécurisation renforcée, optimisation de la mise en cache) et amélioration de l'UI/UX, incluant l'intégration d'une marketplace de services partenaires.",
          resources: "Collaboration avec une équipe de développeurs franco-argentins, adoption d'une méthodologie SCRUMBAN pour un suivi rigoureux des livrables et mise en place des meilleures pratiques de déploiement pour garantir la scalabilité et la sécurité de la plateforme."
        },
        {
          year: "2024-2025",
          title: "Pivot Stratégique & Lancement de la V2",
          description: "Basée sur des interviews approfondies avec des organismes de certification, développement d'un moteur de pré-vérification automatique avec détection intelligente du type de document et analyse IA via GPT-4 fine-tuné.",
          impact: "Réduction drastique du temps de vérification (de plusieurs heures à moins de 5 minutes) et amélioration de la qualité documentaire",
          icon: <HiGlobeAlt size={20} />,
          tags: ["#IA", "#GPT4", "#StrategicPivot"],
          objective: "Répondre aux besoins critiques des organismes de certification en automatisant l'analyse initiale des rapports de test, tout en fluidifiant la communication entre utilisateurs et administrateurs grâce à un système de messagerie intégré.",
          approach: "Basée sur des interviews approfondies avec des organismes de certification, la démarche a consisté à développer un moteur de pré-vérification automatique. Ce moteur se décompose en plusieurs modules: détection du type de document, extraction intelligente de texte via Mammoth.js/PDFReader/Tesseract, et envoi de prompt structuré à GPT-4 fine-tuné.",
          resources: "Mise en place d'une API backend orchestrant l'ensemble des modules, utilisation des technologies Azure OpenAI pour garantir la pertinence des évaluations, et développement d'un système de chat intégré pour améliorer la réactivité et la communication entre l'admin et l'utilisateur."
        }
      ],
      // Mon rôle section
      pmRoleTitle: "Mon rôle de Project Manager & Product Owner",
      pmRoleSubtitle: "Orchestrer la transformation digitale à l'échelle internationale",
      pmRoleDescription: "Digital PM & PO pilotant YVEA de la vision à l'exécution : 3 équipes internationales (12 développeurs), budget 200K€, méthodologies Agile et SAFe. Livraison des 6 phases dans les délais et budget impartis.",
      
      responsibilitiesTitle: "Responsabilités principales",
      responsibilities: [
        {
          title: "Définition de la roadmap produit",
          description: "Priorisation stratégique via workshops cross-fonctionnels et OKRs."
        },
        {
          title: "Leadership Agile",
          description: "Animation SCRUM/SCRUMBAN avec CTO, devs et UI/UX."
        },
        {
          title: "Gestion des parties prenantes",
          description: "Comités de pilotage avec BNP, BPI, Microsoft for Startups."
        },
        {
          title: "Suivi de la performance",
          description: "KPIs et dashboards Power BI mesurant adoption et satisfaction."
        },
        {
          title: "Qualité & tests utilisateurs",
          description: "50+ sessions de tests utilisateurs avec boucles de rétroaction."
        }
      ],
      
      crisisTitle: "Gestion de crise: Pivot stratégique réussi",
      crisisDescription: "Face au départ inattendu d'un CTO et à un contexte d'investissement tendu, j'ai réorganisé l'équipe en 72h, reprioritisé le backlog et pivoté vers un modèle B2B ciblant les organismes de certification, sauvant ainsi le projet et ouvrant de nouvelles opportunités commerciales.",
      
      approachTitle: "Approche méthodologique",
      approachDescription: "Vision produit stratégique + management terrain pragmatique :",
      approachItems: [
        "Cycles courts (MoSCoW, RICE)",
        "Design thinking UX",
        "Itérations techniques (TypeScript, CI/CD)",
        "Alignement business/technique"
      ],
      approachConclusion: "Cette double exigence garantit un équilibre entre rapidité, qualité et valeur métier mesurable.",
      
      // Résultats section
      resultsTitle: "Résultats clés & Impact",
      resultsCategories: [
        { title: "Opérationnel", value: "80%", description: "Réduction des délais", detail: "De 2-5 jours à 4-5 heures grâce à l'automatisation IA" },
        { title: "Financier", value: "200 K€", description: "Financements initiaux", detail: "Prêt BNP 40K€, subvention BPI 30K€ et crédit AWS 15K$" },
        { title: "Adoption", value: "100+", description: "Comptes stratégiques", detail: "Déploiement sur plus de 100 clients dont 20% à l'international" },
        { title: "Satisfaction", value: "95%", description: "Taux de satisfaction", detail: "Mesuré auprès des premiers utilisateurs pilotes" }
      ],
      
      testimonialsTitle: "Avis utilisateurs",
      testimonials: [
        { name: "L. Ragaigne", role: "Export Sales Administrator, Danube International", text: "Une solution simple mais puissante pour les exportateurs. Merci YVEA !" },
        { name: "M. Djhanine", role: "Responsable Commerciale, Bureau Veritas", text: "Une plateforme intuitive et rapide. Je recommande !" },
        { name: "S. Dael", role: "Export Coordinator, MIDAS", text: "Pas de perte de temps sur le dossier d'inspection documentaire, YVEA se charge de tout !" },
        { name: "J-C Theureau", role: "KAM Program CoC, SGS", text: "Les réponses sont claires, fiables et permettent une réelle montée en compétences, même sur les sujets nichés de l'export." }
      ],
      
      // Leçons apprises section
      lessonsTitle: "Leçons Apprises",
      lessonsChallenges: [
        {
          title: "Recul stratégique",
          description: "Rétrospectives et ateliers de cadrage transformant les échecs en opportunités d'ajustement, maintenant la roadmap alignée aux enjeux métier."
        },
        {
          title: "Écoute active",
          description: "Cycles de feedback réguliers (interviews, tests, stand-ups) enrichissant la vision produit, anticipant les risques et renforçant l'adhésion collective."
        },
        {
          title: "Décloisonnement",
          description: "Workshops cross-fonctionnels (développeurs, designers, commerciaux, experts) accélérant les décisions et garantissant la cohérence fonctionnelle."
        },
        {
          title: "Culture collaborative",
          description: "Pairing, revues de code et \"brown-bag lunch\" renforçant les compétences collectives et créant un environnement fondé sur la confiance."
        },
        {
          title: "Mentorat ciblé",
          description: "Coaching de juniors via one-to-one, plans de formation et suivi OKRs, multipliant autonomie et implication des équipes."
        }
      ],
      
      // Compétences section
      skillsTitle: "Compétences mobilisées",
      skillsCategories: [
        {
          title: "🧭 Vision & Leadership",
          skills: [
            "Stratégie produit: Alignement roadmap/ROI selon méthodologie OKR",
            "Leadership multiculturel: Gestion d'équipes à distance France/Pakistan/Argentine",
            "Strategic thinking: Analyse de marchés et identification d'opportunités de disruption"
          ]
        },
        {
          title: "⚙️ Delivery & Process",
          skills: [
            "Méthodologies Agile: SCRUM, SCRUMBAN, RICE, MoSCoW",
            "Pilotage data-driven: Dashboards et KPIs pour le suivi en temps réel",
            "Gestion de crise: Résolution de blocages critiques, pivots stratégiques sous contrainte"
          ]
        },
        {
          title: "☁️ Expertise Technologique",
          skills: [
            "Architecture moderne: Stack MERN, AWS, Terraform",
            "IA avancée: Azure OpenAI, GPT-4 fine-tuning, OCR avec Tesseract",
            "DevOps: CI/CD, sécurité by design, infrastructure as code"
          ]
        }
      ],
      
      // Conclusion
      conclusionTitle: "Conclusion",
      conclusionText: "YVEA démontre ma capacité à diriger des transformations digitales complexes de A à Z, en combinant vision stratégique, excellence opérationnelle et leadership international. Cette approche full-stack du management de projet — alliant business acumen, compétences techniques et soft skills — correspond précisément aux profils recherchés par les Big Four, Google et les cabinets de recrutement d'élite.",
      futureTitle: "L'avenir de YVEA & mes prochains défis",
      futureText: "Dans sa prochaine itération, YVEA pourrait intégrer une blockchain pour la traçabilité des certifications et des modèles IA génératifs pour l'auto-correction documentaire. Je recherche désormais des environnements complexes où appliquer cette expertise pour transformer des défis business en opportunités digitales.",
      callToAction: "Discutons de votre prochain défi transformationnel",
      callToActionSubtext: "Je suis prêt à mettre cette double expertise business/tech au service de votre organisation."
    },
    en: {
      heroTitle: "YVEA – The portal to simplified export certification",
      heroSubtitle: "Intelligent automation of certification processes for exports to Africa and the Middle East.",
      intro: "Discover the first platform that fully automates the certification of goods destined for Africa and the Middle East, transforming manual processes into an ultra-fast and reliable digital experience using OCR, EDM and AI.",
      contextTitle: "Project Context",
      beforeTitle: "BEFORE",
      beforeContent: "The traditional VoC certification process is currently hampered by multiple manual tasks: repeated verifications, submissions, follow-ups, and constant back-and-forth between teams. This lack of coordination leads to processing times of 2-5 days, generating notable frustration among clients and internal efficiency loss.",
      bridgeTitle: "BRIDGE",
      bridgeContent: "YVEA addresses this challenge by automating the entire process end-to-end. With an integrated platform combining OCR, EDM, and AI, YVEA coordinates verifications, provides immediate feedback in case of anomalies, and automatically structures required documents.",
      afterTitle: "AFTER",
      afterContent: "This transformation improves accuracy by 90%, accelerates certification (from days to hours), and offers a significant competitive advantage by reducing not only delays but also operational costs by 40%.",
      visualizationText: "Interactive visualization: Compare workflows [Without YVEA] vs [With YVEA]",
      evolutionTitle: "Project Evolution",
      evolutionSubtitle: "From conceptualization to industrialized AI SaaS solution in 6 key stages",
      phases: [
        {
          year: "2022",
          title: "Specifications & Funding Research",
          description: "Validation of the YVEA concept and demonstration of its economic viability by precisely defining the needs of the export certification market.",
          impact: "Validation of the project vision and securing initial funding of €40K from BNP Paribas",
          icon: <HiDocumentText size={20} />,
          tags: ["#BusinessModel", "#PitchDeck", "#Funding"],
          objective: "Validate the YVEA concept and demonstrate its economic viability by precisely defining the needs of the export certification market.",
          approach: "Creation of a Business Model Canvas, development of a comprehensive business plan, creation of a pitch deck and detailed specifications, including financial forecasts and ROI estimates.",
          resources: "Market information gathering, collaboration with sector and financial experts, and drafting of solid strategic documents to prepare a convincing case."
        },
        {
          year: "2022-Q2",
          title: "Prototyping & Incubation",
          description: "Design of an interactive mockup on Figma and revision of the pitch deck to clearly present the value proposition to partners and incubators.",
          impact: "Securing a €30K innovation grant via Paris Innovation Amorçage and a $15K AWS credit",
          icon: <HiCurrencyDollar size={20} />,
          tags: ["#Prototyping", "#UX/UI", "#Incubation"],
          objective: "Transform the idea into a visual and tangible concept to convince incubators and secure new funding.",
          approach: "Design of an interactive mockup on Figma and revision of the pitch deck to clearly present the value proposition to partners and incubators.",
          resources: "Collaboration with a Parisian design agency to create a modern and aesthetic interface, and participation in the Pepinière27 incubator to strengthen the project's credibility."
        },
        {
          year: "2022-Q3/Q4",
          title: "Initial MVP Development",
          description: "MVP development using the MERN stack with SCRUM organization in 2-week sprints, including pilot testing phases with a panel of 50 users.",
          impact: "Launch of a validated MVP, demonstrating technical feasibility and functional interest in the solution",
          icon: <HiOfficeBuilding size={20} />,
          tags: ["#MVP", "#MERN", "#SCRUM"],
          objective: "Rapidly develop a first functional version to test adoption by early users.",
          approach: "MVP development using the MERN stack with SCRUM organization in 2-week sprints, including pilot testing phases with a panel of 50 users.",
          resources: "Technical team formation with Franco-Pakistani developers (CTO and fullstack developer), JavaScript development and AWS deployment for rapid implementation."
        },
        {
          year: "2023-Q1/Q2",
          title: "Iterations & Refactoring",
          description: "Intensive feedback collection from users and certification bodies, followed by complete refactoring (JavaScript to TypeScript) and UX/UI improvements.",
          impact: "Significant improvement in stability, security and fluidity of the solution",
          icon: <HiCode size={20} />,
          tags: ["#Refactoring", "#TypeScript", "#UserFeedback"],
          objective: "Optimize the MVP by incorporating user feedback and strengthening its technical robustness to better meet market needs.",
          approach: "Intensive collection of feedback from users and certification bodies, followed by complete refactoring (JavaScript to TypeScript) and UX/UI improvements.",
          resources: "Implementation of daily standups, use of Agile methodologies (SCRUM, RICE, MoSCoW) for feature prioritization and close collaboration with stakeholders to refine the solution."
        },
        {
          year: "2023-Q3/Q4",
          title: "Industrialization & V1 Launch",
          description: "Additional fundraising (€50K obtained via BNP), complete technical architecture redesign and UI/UX improvement, including the integration of a partner services marketplace.",
          impact: "Successful launch of V1, with a stable and scalable solution opening new international opportunities",
          icon: <HiRefresh size={20} />,
          tags: ["#Scaling", "#V1", "#Marketplace"],
          objective: "Transform the prototype into an industrial product capable of supporting rapid growth and international expansion.",
          approach: "Additional fundraising (€50K obtained from BNP), complete technical architecture redesign (full migration to AWS, Terraform implementation, enhanced security, cache optimization) and UI/UX improvement, including partner services marketplace integration.",
          resources: "Collaboration with a team of Franco-Argentine developers, adoption of SCRUMBAN methodology for rigorous deliverable tracking and implementation of best deployment practices to ensure scalability and platform security."
        },
        {
          year: "2024-2025",
          title: "Strategic Pivot & V2 Launch",
          description: "Based on in-depth interviews with certification bodies, development of an automatic pre-verification engine with intelligent document type detection and AI analysis via fine-tuned GPT-4.",
          impact: "Drastic reduction in verification time (from several hours to less than 5 minutes) and document quality improvement",
          icon: <HiGlobeAlt size={20} />,
          tags: ["#AI", "#GPT4", "#StrategicPivot"],
          objective: "Address the critical needs of certification bodies by automating initial test report analysis while streamlining communication between users and administrators.",
          approach: "Based on in-depth interviews with certification bodies, development of an automatic pre-verification engine with components including document type detection, intelligent text extraction via Mammoth.js/PDFReader/Tesseract, and structured prompts to fine-tuned GPT-4.",
          resources: "Implementation of a backend API orchestrating all modules, use of Azure OpenAI technologies to ensure evaluation relevance, and development of an integrated chat system to improve reactivity and communication between admin and user."
        }
      ],
      // Roles section
      pmRoleTitle: "My Role as Project Manager & Product Owner",
      pmRoleSubtitle: "Orchestrating digital transformation on an international scale",
      pmRoleDescription: "As Digital PM & PO, I led YVEA from vision to execution by coordinating 3 international teams (12 developers), while managing a €200K budget and applying Agile and SAFe methodologies. My multidimensional expertise allowed delivering all 6 phases of the project on time and within budget.",
      
      responsibilitiesTitle: "Key Responsibilities",
      responsibilities: [
        {
          title: "Product roadmap definition",
          description: "Development and prioritization of features through cross-functional workshops and OKRs."
        },
        {
          title: "Agile Leadership",
          description: "Management of SCRUM/SCRUMBAN teams (CTO, devs, UI/UX), sprint planning and daily stand-ups."
        },
        {
          title: "Stakeholder management",
          description: "Steering committee briefings (BNP, BPI, Microsoft for Startups, incubators)."
        },
        {
          title: "Performance monitoring",
          description: "Implementation of KPIs (timelines, adoption, satisfaction) and Power BI dashboards."
        },
        {
          title: "Quality & user testing",
          description: "Coordination of over 50 test sessions, feedback loops and corrective action plans."
        }
      ],
      
      crisisTitle: "Crisis Management: Successful Strategic Pivot",
      crisisDescription: "Faced with the unexpected departure of a CTO and a tight investment context, I reorganized the team within 72 hours, reprioritized the backlog and pivoted to a B2B model targeting certification bodies, thus saving the project and opening new business opportunities.",
      
      approachTitle: "Methodological Approach",
      approachDescription: "I combine a strategic product vision with pragmatic field management:",
      approachItems: [
        "Short feedback cycles (MoSCoW, RICE)",
        "UX-centered design thinking",
        "Robust technical iterations (TypeScript, CI/CD)",
        "Continuous alignment between business value and technical execution"
      ],
      approachConclusion: "This dual requirement ensures a balance between speed, quality and measurable business value.",
      
      // Results section
      resultsTitle: "Key Results & Impact",
      resultsCategories: [
        { title: "Operational", value: "80%", description: "Delay reduction", detail: "From 2-5 days to 4-5 hours thanks to AI automation" },
        { title: "Financial", value: "€200K", description: "Initial funding", detail: "BNP loan €40K, BPI grant €30K and AWS credit $15K" },
        { title: "Adoption", value: "100+", description: "Strategic accounts", detail: "Deployment to over 100 clients including 20% international" },
        { title: "Satisfaction", value: "95%", description: "Satisfaction rate", detail: "Measured among the first pilot users" }
      ],
      
      testimonialsTitle: "User Testimonials",
      testimonials: [
        { name: "L. Ragaigne", role: "Export Sales Administrator, Danube International", text: "A simple but powerful solution for exporters. Thank you YVEA!" },
        { name: "M. Djhanine", role: "Commercial Manager, Bureau Veritas", text: "An intuitive and fast platform. I recommend it!" },
        { name: "S. Dael", role: "Export Coordinator, MIDAS", text: "No time wasted on the documentary inspection file, YVEA takes care of everything!" },
        { name: "J-C Theureau", role: "KAM Program CoC, SGS", text: "The responses are clear, reliable and allow for real skills development, even on niche export topics." }
      ],
      
      // Lessons learned section
      lessonsTitle: "Lessons Learned",
      lessonsChallenges: [
        {
          title: "Strategic perspective",
          description: "Retrospectives and framing workshops transforming failures into adjustment opportunities, keeping the roadmap aligned with business challenges."
        },
        {
          title: "Active listening",
          description: "Regular feedback cycles (interviews, tests, stand-ups) enriching product vision, anticipating risks and strengthening collective buy-in."
        },
        {
          title: "Breaking silos",
          description: "Cross-functional workshops (developers, designers, sales, experts) accelerating decisions and ensuring functional coherence."
        },
        {
          title: "Collaborative culture",
          description: "Pairing, code reviews and brown-bag lunches strengthening collective skills and creating a trust-based environment."
        },
        {
          title: "Targeted mentoring",
          description: "Coaching juniors through one-on-ones, training plans and OKRs tracking, multiplying team autonomy and involvement."
        }
      ],
      
      // Skills section
      skillsTitle: "Skills Mobilized",
      skillsCategories: [
        {
          title: "🧭 Vision & Leadership",
          skills: [
            "Product strategy: Roadmap/ROI alignment according to OKR methodology",
            "Multicultural leadership: Remote team management France/Pakistan/Argentina",
            "Strategic thinking: Market analysis and identification of disruption opportunities"
          ]
        },
        {
          title: "⚙️ Delivery & Process",
          skills: [
            "Agile methodologies: SCRUM, SCRUMBAN, RICE, MoSCoW",
            "Data-driven management: Dashboards and KPIs for real-time monitoring",
            "Crisis management: Resolution of critical blockages, strategic pivots under constraint"
          ]
        },
        {
          title: "☁️ Technological Expertise",
          skills: [
            "Modern architecture: MERN stack, AWS, Terraform",
            "Advanced AI: Azure OpenAI, GPT-4 fine-tuning, OCR with Tesseract",
            "DevOps: CI/CD, security by design, infrastructure as code"
          ]
        }
      ],
      
      // Conclusion
      conclusionTitle: "Conclusion",
      conclusionText: "YVEA demonstrates my ability to lead complex digital transformations from A to Z, combining strategic vision, operational excellence and international leadership. This full-stack approach to project management — combining business acumen, technical skills and soft skills — precisely matches the profiles sought by the Big Four, Google and elite recruitment firms.",
      futureTitle: "The future of YVEA & my next challenges",
      futureText: "In its next iteration, YVEA could integrate blockchain for certification traceability and generative AI models for document self-correction. I am now looking for complex environments where I can apply this expertise to transform business challenges into digital opportunities.",
      callToAction: "Let's discuss your next transformational challenge",
      callToActionSubtext: "I am ready to put this dual business/tech expertise at the service of your organization."
    }
  };
  
  const currentContent = content[locale as keyof typeof content];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[95vh] overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-blue-950">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>
        <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-[0.03] z-0 mix-blend-soft-light"></div>
        
        {/* Animated data mesh background */}
        <div className="absolute inset-0 z-0">
          <AdvancedDataMesh density={120} color="#6366f1" />
        </div>
        
        {/* Glowing orbs background effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 filter blur-[100px] z-0"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-violet-600/20 filter blur-[80px] z-0"></div>
        
        {/* Container principal */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
            
            {/* Content Column */}
            <motion.div 
              className="lg:col-span-6 xl:col-span-5 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge de catégorie */}
              <motion.div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-600/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-violet-300 text-sm font-medium">{locale === 'fr' ? "SaaS Enterprise" : "Enterprise SaaS"}</span>
                <span className="bg-indigo-400 h-1.5 w-1.5 rounded-full"></span>
                <span className="text-indigo-300 text-sm font-medium">{locale === 'fr' ? "IA & Certification" : "AI & Certification"}</span>
              </motion.div>
              
              {/* Titre avec hiérarchie visuelle */}
              <div className="space-y-2">
                <motion.h1
                  className="text-white font-extrabold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="block text-5xl md:text-7xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                    YVEA
                  </span>
                  <span className="block text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 max-w-md">
                    SaaS IA pour certification à l'export
                  </span>
                </motion.h1>
              </div>
              
              {/* Description avec animation */}
              <motion.p 
                className="text-lg text-indigo-200/90 max-w-xl leading-relaxed mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Simplifier la certification export vers l'Afrique et le Moyen-Orient de 80% grâce à IA, OCR et GED
              </motion.p>
            </motion.div>
            
            {/* Visualisation interactive - colonne droite */}
            <motion.div
              className="lg:col-span-6 xl:col-span-7 relative h-[500px] hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative h-full w-full">
                {/* Effet de halo lumineux */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[90%] h-[90%]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-indigo-500/20 rounded-full blur-[50px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-violet-500/30 rounded-full blur-[30px]" />
                  </div>
                </div>
                
                {/* Globe digital avec animations améliorées */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-[90%] h-[90%]"
                    animate={{ 
                      rotateZ: [0, 5, 0, -5, 0],
                      scale: [1, 1.02, 1, 0.98, 1]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      repeatType: 'loop',
                      ease: 'easeInOut'
                    }}
                  >
                    <DigitalGlobe />
                  </motion.div>
                </div>
                
                {/* Points de données animés sur le globe */}
                {[
                  { top: '25%', left: '30%', size: 'w-4 h-4', delay: 0 },
                  { top: '60%', left: '70%', size: 'w-3 h-3', delay: 0.5 },
                  { top: '40%', left: '80%', size: 'w-2 h-2', delay: 1 },
                  { top: '70%', left: '40%', size: 'w-3 h-3', delay: 1.5 },
                  { top: '20%', left: '60%', size: 'w-2 h-2', delay: 2 }
                ].map((point, idx) => (
                  <motion.div 
                    key={idx}
                    className={`absolute ${point.size} rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50 z-20`}
                    style={{ top: point.top, left: point.left }}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(99, 102, 241, 0.7)',
                        '0 0 0 10px rgba(99, 102, 241, 0)',
                        '0 0 0 0 rgba(99, 102, 241, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: point.delay
                    }}
                  />
                ))}
                
                {/* Lignes de connexion */}
                {[
                  { x1: '30%', y1: '25%', x2: '70%', y2: '60%' },
                  { x1: '70%', y1: '60%', x2: '80%', y2: '40%' },
                  { x1: '30%', y1: '25%', x2: '60%', y2: '20%' },
                  { x1: '40%', y1: '70%', x2: '70%', y2: '60%' }
                ].map((line, idx) => (
                  <motion.div 
                    key={idx}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1 + idx * 0.3, duration: 0.5 }}
                  >
                    <svg className="absolute top-0 left-0 w-full h-full">
                      <motion.line
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(99, 102, 241, 0.5)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 1 + idx * 0.3 
                        }}
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Indicateur de scroll */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 pb-2">
            <ScrollIndicator />
          </div>
        </div>
      </div>
      
      {/* Project Context - Version GAFAM */}
      <div id="project-context" className="container mx-auto px-4 py-24">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 to-blue-950/90 shadow-2xl">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-indigo-500/10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/10 blur-[60px] rounded-full"></div>
            
            {/* Header */}
            <div className="relative z-10 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-16"
              >
                <div className="inline-flex items-center justify-center space-x-2 bg-indigo-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-indigo-500/30 mb-6">
                  <span className="text-indigo-200 text-sm font-medium">{locale === 'fr' ? "Transformation" : "Transformation"}</span>
                  <span className="bg-indigo-400 h-1 w-1 rounded-full"></span>
                  <span className="text-indigo-200 text-sm font-medium">{locale === 'fr' ? "Valeur Métier" : "Business Value"}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {currentContent.contextTitle}
                </h2>
                
                <p className="text-xl text-indigo-200/90 max-w-3xl mx-auto">
                  {locale === 'fr' 
                    ? "Une réinvention digitale complète du processus de certification"
                    : "A complete digital reinvention of the certification process"}
                </p>
              </motion.div>
              
              {/* Flow comparison slider */}
              <div className="max-w-5xl mx-auto backdrop-blur-sm bg-indigo-900/20 rounded-xl border border-indigo-500/30 overflow-hidden p-6 md:p-10">
                {/* Process transformation details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                  {/* BEFORE section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full blur-xl -z-10"></div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-red-950/40 to-red-900/30 border border-red-500/20 h-full backdrop-blur-sm flex flex-col">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      
                      <h4 className="text-xl font-bold text-red-300 mb-3">{currentContent.beforeTitle}</h4>
                      
                      <p className="text-indigo-100/80 mb-4 leading-relaxed flex-grow">
                        Certification VoC traditionnelle : processus manuel ralenti par des vérifications multiples et des allers-retours constants. Résultat : coordination défaillante et délais étendus générant frustration client et inefficacité opérationnelle.
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-red-500/20 h-24 flex flex-col justify-end">
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-red-300">2-5</div>
                          <div className="ml-2 text-indigo-200/70">{locale === 'fr' ? "jours" : "days"}</div>
                        </div>
                        <div className="text-sm text-indigo-300/50">
                          {locale === 'fr' ? "Temps de traitement moyen" : "Average processing time"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* BRIDGE section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl -z-10"></div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-950/40 to-indigo-900/30 border border-indigo-500/20 h-full backdrop-blur-sm flex flex-col">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                      </div>
                      
                      <h4 className="text-xl font-bold text-indigo-300 mb-3">{currentContent.bridgeTitle}</h4>
                      
                      <p className="text-indigo-100/80 mb-4 leading-relaxed flex-grow">
                        Solution YVEA : automatisation intégrale via plateforme combinant OCR, GED et IA. Coordination intelligente des vérifications avec feedback instantané et structuration automatique des documents.
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-indigo-500/20 h-24 flex flex-col justify-end">
                        <div className="flex flex-wrap gap-2">
                          {['OCR', 'GED', 'IA', 'Automation'].map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 bg-indigo-500/20 text-indigo-200 text-xs rounded-md border border-indigo-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* AFTER section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl -z-10"></div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-950/40 to-emerald-900/30 border border-emerald-500/20 h-full backdrop-blur-sm flex flex-col">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      
                      <h4 className="text-xl font-bold text-emerald-300 mb-3">{currentContent.afterTitle}</h4>
                      
                      <p className="text-indigo-100/80 mb-4 leading-relaxed flex-grow">
                        Résultats concrets : précision améliorée (+90%), certification ultra-rapide, avantage concurrentiel décisif avec réduction des coûts opérationnels de 40%.
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-emerald-500/20 h-24 flex flex-col justify-end">
                        <div className="flex items-center">
                          <div className="text-2xl font-bold text-emerald-300">4-5</div>
                          <div className="ml-2 text-indigo-200/70">{locale === 'fr' ? "heures" : "hours"}</div>
                        </div>
                        <div className="text-sm text-indigo-300/50">
                          {locale === 'fr' ? "Temps de traitement moyen" : "Average processing time"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Interactive visualization */}
                <motion.div 
                  className="mt-12 mb-2 relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </span>
                    {locale === 'fr' ? "Visualisation interactive: Comparez les flux de travail" : "Interactive visualization: Compare workflows"}
                  </h3>
                  
                  {/* Tabs for before/after selection */}
                  <div className="mb-6 flex justify-center">
                    <div className="bg-indigo-900/50 rounded-lg p-1 inline-flex">
                      <button 
                        className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                          visualizationTab === 'before' 
                            ? 'bg-red-500/90 text-white' 
                            : 'text-indigo-200 hover:bg-indigo-800/50'
                        }`}
                        onClick={() => setVisualizationTab('before')}
                      >
                        {locale === 'fr' ? "Sans YVEA" : "Without YVEA"}
                      </button>
                      <button 
                        className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                          visualizationTab === 'after' 
                            ? 'bg-emerald-500/90 text-white' 
                            : 'text-indigo-200 hover:bg-indigo-800/50'
                        }`}
                        onClick={() => setVisualizationTab('after')}
                      >
                        {locale === 'fr' ? "Avec YVEA" : "With YVEA"}
                      </button>
                    </div>
                  </div>
                  
                  {/* Clickable image container */}
                  <div className="relative bg-gradient-to-b from-black/50 to-indigo-950/50 rounded-lg overflow-hidden select-none mt-4" 
                       style={{ height: isExpanded ? '80vh' : '300px', transition: 'height 0.3s ease-in-out' }}
                  >
                    {/* Before image */}
                    {visualizationTab === 'before' && (
                      <div className="relative h-full w-full cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                        <Image 
                          src="/downloads/Current flow.png" 
                          alt="Current certification process flow" 
                          fill 
                          className={`object-contain ${isExpanded ? 'object-scale-down' : 'object-cover object-center'}`}
                        />
                        <div className="absolute top-4 left-4 bg-red-500/90 text-white px-3 py-1 rounded-md font-medium backdrop-blur-sm">
                          {locale === 'fr' ? "Sans YVEA" : "Without YVEA"}
                        </div>
                        
                        {/* Expand/collapse indicator */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm">
                          {isExpanded ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* After image */}
                    {visualizationTab === 'after' && (
                      <div className="relative h-full w-full cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                        <Image 
                          src="/downloads/New flow.png" 
                          alt="New certification process with YVEA" 
                          fill 
                          className={`object-contain ${isExpanded ? 'object-scale-down' : 'object-cover object-center'}`}
                        />
                        <div className="absolute top-4 right-4 bg-emerald-500/90 text-white px-3 py-1 rounded-md font-medium backdrop-blur-sm">
                          {locale === 'fr' ? "Avec YVEA" : "With YVEA"}
                        </div>
                        
                        {/* Expand/collapse indicator */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm">
                          {isExpanded ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Hint text */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm z-30 pointer-events-none">
                      {locale === 'fr' ? "Cliquez pour agrandir l'image" : "Click to expand image"}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="relative z-10 bg-gradient-to-b from-blue-950/0 to-blue-950/80 p-8 md:p-6">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">90%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Amélioration de la précision" : "Accuracy improvement"}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">40%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Coûts opérationnels réduits" : "Reduced operational costs"}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">95%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Réduction des erreurs" : "Error reduction"}</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">85%</div>
                    <div className="text-indigo-300 text-sm">{locale === 'fr' ? "Efficacité des processus" : "Process efficiency"}</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Project Evolution Timeline */}
      <div id="project-evolution" className="container mx-auto px-4 py-8">
        <AnimatedSection className="mb-16">
          <div id="project-evolution" className="bg-white rounded-xl shadow-lg p-8 overflow-hidden">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                {currentContent.evolutionTitle}
              </h2>
              <p className="text-lg text-gray-600">{currentContent.evolutionSubtitle}</p>
            </div>
            
            <EnhancedTimeline phases={currentContent.phases} />
          </div>
        </AnimatedSection>
        
        {/* Fonctionnalités clés d'YVEA Section */}
        <AnimatedSection className="mb-16">
          <div id="key-features" className="bg-white rounded-xl shadow-lg p-8 overflow-hidden">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Fonctionnalités clés d'YVEA
              </h2>
              <p className="text-lg text-gray-600">Découvrez les technologies innovantes d'YVEA à travers des démonstrations interactives</p>
            </div>
            
            {/* Features Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Workflow de Certificats Card */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveModal('certificats')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Workflow de Certificats</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">GED</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Automatisation</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Validation</span>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm">Processus complet de création et de validation des certificats d'inspection et de conformité pour l'export.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    Découvrir cette fonctionnalité
                  </button>
                </div>
              </motion.div>
              
              {/* OCR et Extraction Intelligente Card */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveModal('ocr')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">OCR et Extraction Intelligente</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">OCR</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">ML</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Tesseract</span>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm">Analyse automatisée des documents commerciaux avec reconnaissance optique et extraction structurée.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Découvrir cette fonctionnalité
                  </button>
                </div>
              </motion.div>
              
              {/* Assistant IA Card */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveModal('assistant')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2 * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Assistant IA</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Azure OpenAI</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">GPT-4</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">IA Conversationnelle</span>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm">Interface conversationnelle intelligente pour guider les utilisateurs dans leurs démarches d'export.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
                    Découvrir cette fonctionnalité
                  </button>
                </div>
              </motion.div>
              
              {/* Messagerie Card */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveModal('messaging')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 3 * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Messagerie Collaborative</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">WebSockets</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Temps réel</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Collaboration</span>
                </div>
                <p className="text-gray-600 text-center mb-4 text-sm">Système de communication instantanée avec collaboration documentaire et gestion d'état partagé.</p>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                    Découvrir cette fonctionnalité
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* My Role as PM/PO */}
        <AnimatedSection className="mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-10 -translate-y-20 z-0"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-x-10 translate-y-20 z-0"></div>
            
            {/* Header section */}
            <div className="relative z-10 mb-10 border-b border-gray-200 dark:border-gray-700 pb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    {locale === 'fr' ? "Fondateur & Product Manager" : "Founder & Product Manager"}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Mon rôle de Project Manager & Product Owner
                  </h2>
                  <p className="text-primary font-semibold">
                    Orchestrer la transformation digitale à l'échelle internationale
                  </p>
                </div>
                
                <div className="bg-primary/10 dark:bg-primary/20 px-5 py-3 rounded-lg text-center">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">3</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Équipes</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Devs</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">200K€</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Budget</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main role description */}
            <div className="relative z-10 mb-10">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                En tant que fondateur de YVEA, j'ai piloté le projet de sa conception à son exécution : coordination de 3 équipes internationales (12 développeurs), gestion d'un budget de 200K€, et application des méthodologies Agile/SAFe. Résultat : livraison des 6 phases dans les délais et le budget impartis.
              </p>
            </div>
            
            {/* Key responsibilities section */}
            <div className="relative z-10 mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Responsabilités clés & Réalisations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vision & Execution */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Vision & Exécution</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Définition de la roadmap produit et priorisation via OKRs</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Pilotage de la croissance : 0 à 100+ clients B2B (20% internationaux)</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Pivot stratégique réussi en 72h après départ du CTO</span>
                    </li>
                  </ul>
                </div>
                
                {/* Leadership & Methodology */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Leadership & Méthodologie</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Animation d'équipes SCRUM/SCRUMBAN multiculturelle (FR/PK/AR)</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Comités de pilotage avec BNP, BPI, Microsoft for Startups</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Vision produit + management terrain : MoSCoW, RICE, Design thinking</span>
                    </li>
                  </ul>
                </div>
                
                {/* Measurement & Quality */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Mesure & Qualité</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Dashboards Power BI mesurant adoption et satisfaction</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>50+ sessions de tests utilisateurs avec boucles de rétroaction</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Réduction des délais de 80% et coûts opérationnels de 40%</span>
                    </li>
                  </ul>
                </div>
                
                {/* Crisis Management */}
                <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-xl shadow-sm border border-primary/30 dark:border-primary/40">
                  <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-primary mr-2">📌</div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Gestion de crise</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Réorganisation en 72h suite au départ du CTO et pivot vers un modèle B2B ciblant les organismes de certification → Sauvetage du projet et nouvelles opportunités commerciales.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Technical expertise section */}
            <div className="relative z-10 mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Expertise technique & leadership
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Vision & Leadership */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="text-xl font-bold text-primary mr-2">🧭</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Vision & Leadership</h4>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Stratégie produit : Alignement roadmap/ROI via OKRs</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Leadership multiculturel : Équipes distribuées FR/PK/AR</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Strategic thinking : Identification d'opportunités de disruption</span>
                    </li>
                  </ul>
                </div>
                
                {/* Delivery & Process */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="text-xl font-bold text-primary mr-2">⚙️</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Delivery & Process</h4>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Méthodologies Agile : SCRUM/SCRUMBAN, RICE, MoSCoW</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Pilotage data-driven : KPIs et dashboards en temps réel</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Gestion de crise : Pivots stratégiques sous contrainte</span>
                    </li>
                  </ul>
                </div>
                
                {/* Technology Expertise */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="text-xl font-bold text-primary mr-2">☁️</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Expertise Technologique</h4>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Architecture moderne : Stack MERN, AWS, Terraform</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>IA avancée : Azure OpenAI, GPT-4 fine-tuning, OCR/Tesseract</span>
                    </li>
                    <li className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>DevOps : CI/CD, security by design, infrastructure as code</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Lessons learned section */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg className="w-6 h-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Leçons apprises
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Recul stratégique</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Transformer les échecs en opportunités d'ajustement via rétrospectives régulières.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Écoute active</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Cycles de feedback enrichissant la vision produit et anticipant les risques.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Décloisonnement</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Workshops cross-fonctionnels accélérant les décisions et garantissant la cohérence.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Culture collaborative</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Pairing et revues de code renforçant les compétences collectives.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-2">
                    <div className="text-primary mr-2">💡</div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Mentorat ciblé</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Coaching de juniors via one-to-one et OKRs personnalisés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Results & Impact Section */}
        <AnimatedSection className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2 text-gray-800">
                {currentContent.resultsTitle}
              </h2>
              <p className="text-lg text-gray-600">{locale === 'fr' ? "Des indicateurs quantifiables qui démontrent l'impact de YVEA" : "Quantifiable metrics demonstrating YVEA's impact"}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {currentContent.resultsCategories.map((result, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow border border-gray th-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                    {result.title}
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">{result.value}</div>
                  <div className="font-medium text-gray-800 mb-1">{result.description}</div>
                  <div className="text-sm text-gray-600">{result.detail}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Testimonials */}
            <h3 className="text-xl font-bold mb-6 text-gray-800">{currentContent.testimonialsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {currentContent.testimonials.map((testimonial, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow border border-gray-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-yellow-400 mb-1">★★★★★</div>
                      <p className="italic text-gray-700 mb-2 leading-relaxed">"{testimonial.text}"</p>
                      <div className="text-sm font-bold text-gray-800">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {/* Conclusion Section */}
        <AnimatedSection className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {currentContent.conclusionTitle}
            </h2>
            
            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700">
                {currentContent.conclusionText}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {locale === 'fr' 
                    ? "Pourquoi mon profil vous intéresse" 
                    : "Why my profile interests you"}
                </h3>
                <p className="text-gray-700">
                  {locale === 'fr'
                    ? "Je combine une expertise technique pointue avec une vision produit stratégique et un leadership éprouvé, exactement le profil hybride recherché pour piloter des transformations digitales à fort impact."
                    : "I combine deep technical expertise with strategic product vision and proven leadership, exactly the hybrid profile sought to drive high-impact digital transformations."}
                </p>
              </div>
            </div>
            
            {/* Call to action section */}
            <div className="bg-gray-900 rounded-xl p-6 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">{currentContent.callToAction}</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{currentContent.callToActionSubtext}</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <AnimatedButton 
                  href="https://calendly.com/elmasrymoamen/30min"
                  variant="primary"
                  size="lg"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {locale === 'fr' ? "Réserver un échange" : "Book a meeting"}
                </AnimatedButton>
                
                <AnimatedButton 
                  href="mailto:contact@moamenelmasry.com"
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  {locale === 'fr' ? "Email direct" : "Direct email"}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      {/* Section Workflow de Certificats - Walkthrough */}
      <section className="my-16" id="workflow-certificats-demo">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="certificats-header text-2xl md:text-3xl font-bold text-primary flex items-center">
              <svg className="w-7 h-7 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a2 2 0 100-4 2 2 0 000 4zm-2 0a2 2 0 100-4 2 2 0 000 4zm-2 0a2 2 0 100-4 2 2 0 000 4z" /></svg>
              Workflow de Certificats
            </h2>
            <button id="tour-certificats-trigger" className="btn-primary ml-4">Découvrir cette fonctionnalité</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="certificate-base-info bg-primary/5 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Informations de base</h3>
                <p className="text-sm text-gray-700">Numéro de certificat, date d'émission, client, etc.</p>
              </div>
              <div className="products-section bg-primary/5 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Produits concernés</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Produit A</li>
                  <li>Produit B</li>
                </ul>
              </div>
              <div className="document-upload-zone bg-primary/5 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Documents justificatifs</h3>
                <button className="btn-secondary">Télécharger un document</button>
              </div>
            </div>
            <div>
              <div className="certificate-type-selector bg-primary/5 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Type de certificat</h3>
                <select className="w-full border rounded p-2">
                  <option>Certificat d'Inspection</option>
                  <option>Certificat de Conformité</option>
                </select>
              </div>
              <div className="validation-panel bg-primary/5 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Validation automatique</h3>
                <p className="text-sm text-gray-700">Vérification des données et conformité réglementaire.</p>
              </div>
              <div className="submission-controls flex items-center gap-4 mb-4">
                <button className="btn-primary">Vérifier</button>
                <button className="btn-secondary">Soumettre</button>
              </div>
              <div className="certificate-status-tracker bg-primary/5 p-4 rounded mb-4">
                <h3 className="text-lg font-semibold mb-2">Suivi du statut</h3>
                <p className="text-sm text-gray-700">En attente &rarr; En cours &rarr; Validé</p>
              </div>
            </div>
          </div>
          <div className="certificats-footer mt-8 text-center text-primary font-semibold">
            <span>Workflow de certificats - YVEA</span>
          </div>
        </div>
      </section>
      
      {/* Modales des fonctionnalités */}
      <FeatureModal 
        isOpen={activeModal === 'certificats'} 
        onClose={closeModal}
        title="Workflow de Certificats"
        themeColor="indigo"
      >
        <CertificatsModalContent onClose={closeModal} />
      </FeatureModal>
      
      <FeatureModal 
        isOpen={activeModal === 'ocr'} 
        onClose={closeModal}
        title="OCR et Extraction Intelligente"
        themeColor="blue"
      >
        <OcrModalContent onClose={closeModal} />
      </FeatureModal>
      
      <FeatureModal 
        isOpen={activeModal === 'assistant'} 
        onClose={closeModal}
        title="Assistant Virtuel IA"
        themeColor="purple"
      >
        <AssistantModalContent onClose={closeModal} />
      </FeatureModal>
      
      <FeatureModal 
        isOpen={activeModal === 'messaging'} 
        onClose={closeModal}
        title="Messagerie Collaborative"
        themeColor="green"
      >
        <MessagingModalContent onClose={closeModal} />
      </FeatureModal>
    </div>
  );
};

export default YVEAProjectContent;