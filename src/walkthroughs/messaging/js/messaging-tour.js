/**
 * Tour guidé interactif pour la fonctionnalité Messagerie Collaborative
 */

import Shepherd from 'shepherd.js';
import messagingSteps from './steps.js';
import { initShepherdBase, registerTourCompletion } from '../../shared/shepherd-base.js';

/**
 * Initialise le tour guidé Messagerie
 * @returns {Object} Instance du tour Shepherd
 */
export function initMessagingTour() {
  // Initialisation de base avec les configurations communes
  const baseConfig = initShepherdBase({
    tourName: 'messaging',
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
      classes: 'yvea-shepherd-step messaging-step'
    }
  });
  
  // Ajout des étapes du walkthrough Messagerie
  messagingSteps.forEach(step => tour.addStep(step));
  
  // Quand le tour est terminé, enregistrer la complétion
  tour.on('complete', () => {
    registerTourCompletion('messaging');
    document.body.classList.remove('yvea-tour-active');
  });
  
  // Quand le tour est annulé, nettoyer les classes
  tour.on('cancel', () => {
    document.body.classList.remove('yvea-tour-active');
  });
  
  return tour;
}

/**
 * Configure un déclencheur pour le tour Messagerie
 * @param {string} triggerId - ID de l'élément déclencheur
 */
export function setupMessagingTourTrigger(triggerId) {
  if (typeof window === 'undefined') return;
  
  const triggerElement = document.getElementById(triggerId);
  if (triggerElement) {
    triggerElement.addEventListener('click', () => {
      const tour = initMessagingTour();
      tour.start();
    });
  }
}

export default {
  initMessagingTour,
  setupMessagingTourTrigger
}; 