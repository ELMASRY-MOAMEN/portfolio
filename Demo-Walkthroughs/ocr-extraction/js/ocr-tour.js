/**
 * Configuration et initialisation du walkthrough OCR et extraction intelligente
 * Ce fichier permet de lancer la visite guidée du processus OCR
 */

import Shepherd from 'shepherd.js';
import ocrSteps from './steps.js';
import { initShepherdBase, registerTourCompletion } from '../../shared/js/shepherd-base.js';

/**
 * Initialise le tour OCR et extraction intelligente
 * @param {Object} options - Options de configuration
 * @param {boolean} options.autoStart - Démarrer le tour automatiquement
 * @param {Function} options.onComplete - Callback à exécuter lorsque le tour est terminé
 * @param {Function} options.onCancel - Callback à exécuter lorsque le tour est annulé
 * @returns {Shepherd.Tour} Instance du tour
 */
export function initOcrTour(options = {}) {
  const { autoStart = false, onComplete, onCancel } = options;
  
  // Initialisation des éléments de base de Shepherd
  const baseConfig = initShepherdBase({
    tourName: 'ocr-extraction-tour',
    buttonTexts: {
      nextText: 'Suivant',
      prevText: 'Précédent',
      finishText: 'Terminer'
    }
  });
  
  // Création de l'instance du tour
  const tour = new Shepherd.Tour({
    ...baseConfig,
    defaultStepOptions: {
      ...baseConfig.defaultStepOptions,
      scrollTo: { behavior: 'smooth', block: 'center' }
    },
    useModalOverlay: true
  });
  
  // Ajout des étapes au tour
  ocrSteps.forEach(step => tour.addStep(step));
  
  // Événements du tour
  tour.on('complete', () => {
    // Enregistrement de la complétion du tour
    registerTourCompletion('ocr-extraction-tour');
    
    // Exécute le callback onComplete si fourni
    if (typeof onComplete === 'function') {
      onComplete();
    }
  });
  
  tour.on('cancel', () => {
    // Exécute le callback onCancel si fourni
    if (typeof onCancel === 'function') {
      onCancel();
    }
  });
  
  // Démarrage automatique si demandé
  if (autoStart) {
    // Petit délai pour s'assurer que la page est complètement chargée
    setTimeout(() => {
      tour.start();
    }, 500);
  }
  
  return tour;
}

/**
 * Lance le tour OCR à partir d'un bouton ou lien sur la page
 * @param {string} triggerId - ID de l'élément déclencheur
 * @param {Object} options - Options de configuration du tour
 */
export function setupOcrTourTrigger(triggerId, options = {}) {
  const trigger = document.getElementById(triggerId);
  
  if (!trigger) {
    console.warn(`Élément déclencheur avec l'ID "${triggerId}" non trouvé pour le tour OCR.`);
    return;
  }
  
  let tour = null;
  
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Initialise le tour s'il n'existe pas encore
    if (!tour) {
      tour = initOcrTour(options);
    }
    
    // Démarre le tour
    if (tour.isActive()) {
      tour.cancel();
    } else {
      tour.start();
    }
  });
}

// Exportation des fonctions pour utilisation externe
export default {
  initOcrTour,
  setupOcrTourTrigger
}; 