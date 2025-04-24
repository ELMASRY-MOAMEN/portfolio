/**
 * Tour guidé interactif pour la fonctionnalité Assistant Virtuel IA
 */

import Shepherd from 'shepherd.js';
import assistantSteps from './steps.js';
import { initShepherdBase, registerTourCompletion } from '../../shared/shepherd-base.js';

/**
 * Initialise le tour guidé Assistant IA
 * @returns {Object} Instance du tour Shepherd
 */
export function initAssistantTour() {
  // Initialisation de base avec les configurations communes
  const baseConfig = initShepherdBase({
    tourName: 'assistant-ia',
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
      classes: 'yvea-shepherd-step assistant-step'
    }
  });
  
  // Ajout des étapes du walkthrough Assistant
  assistantSteps.forEach(step => tour.addStep(step));
  
  // Quand le tour est terminé, enregistrer la complétion
  tour.on('complete', () => {
    registerTourCompletion('assistant-ia');
    document.body.classList.remove('yvea-tour-active');
  });
  
  // Quand le tour est annulé, nettoyer les classes
  tour.on('cancel', () => {
    document.body.classList.remove('yvea-tour-active');
  });
  
  return tour;
}

/**
 * Configure un déclencheur pour le tour Assistant
 * @param {string} triggerId - ID de l'élément déclencheur
 */
export function setupAssistantTourTrigger(triggerId) {
  if (typeof window === 'undefined') return;
  
  const triggerElement = document.getElementById(triggerId);
  if (triggerElement) {
    triggerElement.addEventListener('click', () => {
      const tour = initAssistantTour();
      tour.start();
    });
  }
}

export default {
  initAssistantTour,
  setupAssistantTourTrigger
}; 