/**
 * Tour guidé interactif pour la fonctionnalité OCR et Extraction Intelligente
 */

import Shepherd from 'shepherd.js';
import ocrSteps from './steps.js';
import { initShepherdBase, registerTourCompletion } from '../../shared/shepherd-base.js';

/**
 * Initialise le tour guidé OCR
 * @returns {Object} Instance du tour Shepherd
 */
export function initOcrTour() {
  // Initialisation de base avec les configurations communes
  const baseConfig = initShepherdBase({
    tourName: 'ocr-extraction',
    buttonTexts: {
      nextText: 'Suivant',
      prevText: 'Précédent',
      finishText: 'Terminer'
    }
  });
  
  // Création du tour avec configuration personnalisée
  const tour = new Shepherd.Tour({
    ...baseConfig,
    defaultStepOptions: {
      ...baseConfig.defaultStepOptions,
      classes: 'yvea-shepherd-step ocr-step'
    }
  });
  
  // Ajout des étapes du walkthrough OCR
  ocrSteps.forEach(step => tour.addStep(step));
  
  // Quand le tour est terminé, enregistrer la complétion
  tour.on('complete', () => {
    registerTourCompletion('ocr-extraction');
    document.body.classList.remove('yvea-tour-active');
  });
  
  // Quand le tour est annulé, nettoyer les classes
  tour.on('cancel', () => {
    document.body.classList.remove('yvea-tour-active');
  });
  
  return tour;
}

/**
 * Configure un déclencheur pour le tour OCR
 * @param {string} triggerId - ID de l'élément déclencheur
 */
export function setupOcrTourTrigger(triggerId) {
  if (typeof window === 'undefined') return;
  
  const triggerElement = document.getElementById(triggerId);
  if (triggerElement) {
    triggerElement.addEventListener('click', () => {
      const tour = initOcrTour();
      tour.start();
    });
  }
}

export default {
  initOcrTour,
  setupOcrTourTrigger
}; 