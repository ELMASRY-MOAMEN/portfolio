/**
 * AI Assistant Tour Configuration
 * 
 * This file initializes and configures the Shepherd.js tour for the AI assistant feature.
 * It imports the base configuration and steps definitions and sets up event handlers.
 */

import { initShepherdTour } from '../../shared/js/shepherd-base.js';
import assistantSteps from './steps.js';

/**
 * Initialize the AI assistant tour
 * @param {Object} options - Configuration options
 * @returns {Object} The configured Shepherd.js tour instance
 */
export function initAssistantTour(options = {}) {
  const defaultOptions = {
    tourName: 'assistant-tour',
    steps: assistantSteps,
    exitOnEsc: true,
    keyboardNavigation: true
  };

  // Merge provided options with defaults
  const tourOptions = { ...defaultOptions, ...options };
  
  // Initialize the tour with base configuration
  const tour = initShepherdTour(tourOptions);
  
  // Add custom event handlers specific to AI assistant
  tour.on('show', (evt) => {
    const { step } = evt;
    console.log(`Showing AI assistant step: ${step.id}`);
    
    // Highlight the current element
    if (step.attachTo && step.attachTo.element) {
      const element = document.querySelector(step.attachTo.element);
      if (element) {
        element.classList.add('shepherd-highlight');
      }
    }
  });
  
  tour.on('hide', (evt) => {
    const { step } = evt;
    
    // Remove highlight from previous element
    if (step.attachTo && step.attachTo.element) {
      const element = document.querySelector(step.attachTo.element);
      if (element) {
        element.classList.remove('shepherd-highlight');
      }
    }
  });
  
  tour.on('complete', () => {
    console.log('AI assistant tour completed');
    // Potential analytics tracking or user feedback collection
  });
  
  tour.on('cancel', () => {
    console.log('AI assistant tour cancelled');
    // Cleanup any tour-specific UI elements
  });

  return tour;
}

// If this script is executed directly (not imported), start the tour
if (typeof document !== 'undefined' && document.querySelector('.start-assistant-tour')) {
  document.querySelector('.start-assistant-tour').addEventListener('click', () => {
    const tour = initAssistantTour();
    tour.start();
  });
}

/**
 * Lance le tour de l'assistant IA à partir d'un bouton ou lien sur la page
 * @param {string} triggerId - ID de l'élément déclencheur
 * @param {Object} options - Options de configuration du tour
 */
export function setupAssistantTourTrigger(triggerId, options = {}) {
  const trigger = document.getElementById(triggerId);
  
  if (!trigger) {
    console.warn(`Élément déclencheur avec l'ID "${triggerId}" non trouvé pour le tour de l'assistant IA.`);
    return;
  }
  
  let tour = null;
  
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Initialise le tour s'il n'existe pas encore
    if (!tour) {
      tour = initAssistantTour(options);
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
  initAssistantTour,
  setupAssistantTourTrigger
}; 