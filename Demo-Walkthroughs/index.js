/**
 * Point d'entrée pour les walkthroughs YVEA avec Shepherd.js
 * Exporte tous les tours guidés disponibles et des utilitaires pour les gérer
 */

// Importation des configurations de base pour Shepherd
import { 
  initShepherdBase, 
  registerTourCompletion, 
  isTourCompleted, 
  resetTourCompletion, 
  createTourManager 
} from './shared/js/shepherd-base.js';

// Importation des tours disponibles
import { initOcrTour, setupOcrTourTrigger } from './ocr-extraction/js/ocr-tour.js';
import { initMessagingTour, setupMessagingTourTrigger } from './messaging/js/messaging-tour.js';
import { initAssistantTour, setupAssistantTourTrigger } from './assistant-ia/js/assistant-tour.js';
import { initCertificatsTour, setupCertificatsTourTrigger } from './workflow-certificats/js/workflow-tour.js';

// Création d'un gestionnaire de tours
const tourManager = createTourManager({
  'ocr-extraction': initOcrTour,
  'messaging': initMessagingTour,
  'assistant-ia': initAssistantTour,
  'certificats': initCertificatsTour
});

/**
 * Initialise tous les tours guidés avec leurs déclencheurs
 * @param {Object} options - Options de configuration 
 */
export function initializeAllTours(options = {}) {
  const {
    ocrTriggerId = 'tour-ocr-trigger',
    messagingTriggerId = 'tour-messaging-trigger',
    assistantTriggerId = 'tour-assistant-trigger',
    certificatsTriggerId = 'tour-certificats-trigger',
    autoStart = null // 'ocr-extraction', 'messaging', 'assistant-ia', 'certificats' ou null
  } = options;
  
  // Initialisation des déclencheurs
  setupOcrTourTrigger(ocrTriggerId);
  setupMessagingTourTrigger(messagingTriggerId);
  setupAssistantTourTrigger(assistantTriggerId);
  setupCertificatsTourTrigger(certificatsTriggerId);
  
  // Démarrage automatique d'un tour si spécifié
  if (autoStart && !isTourCompleted(autoStart)) {
    setTimeout(() => {
      tourManager.startTour(autoStart);
    }, 1000);
  }
  
  // Ajout d'un contrôleur global pour le débogage
  if (typeof window !== 'undefined') {
    window.YVEA = window.YVEA || {};
    window.YVEA.tours = tourManager;
  }
  
  return tourManager;
}

// Exportation des tours et utilitaires individuels
export {
  initOcrTour,
  setupOcrTourTrigger,
  initMessagingTour,
  setupMessagingTourTrigger,
  initAssistantTour,
  setupAssistantTourTrigger,
  initCertificatsTour,
  setupCertificatsTourTrigger,
  initShepherdBase,
  registerTourCompletion,
  isTourCompleted,
  resetTourCompletion,
  tourManager
};

// Exportation par défaut
export default {
  initializeAllTours,
  tourManager
}; 