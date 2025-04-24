/**
 * Tour interactif pour l'OCR et l'extraction intelligente de documents
 */

import { initializeShepherd } from '../../shared/shepherd-base.js';
import ocrExtractionSteps from './steps.js';

/**
 * Initialise le tour guidé pour l'OCR et l'extraction de documents
 * @returns {Object} L'instance Shepherd du tour
 */
function initOcrExtractionTour() {
  // Configurer les options spécifiques à ce tour
  const tourOptions = {
    defaultStepOptions: {
      classes: 'yvea-shepherd-theme',
      scrollTo: true,
      cancelIcon: {
        enabled: true
      }
    },
    useModalOverlay: true,
    exitOnEsc: true
  };

  // Initialiser le tour avec les étapes définies
  const tour = initializeShepherd(ocrExtractionSteps, tourOptions);
  
  // Ajouter des événements personnalisés si nécessaire
  tour.on('complete', () => {
    console.log('Tour OCR et extraction de documents terminé');
    // Actions de suivi ou analytiques peuvent être ajoutées ici
  });

  tour.on('cancel', () => {
    console.log('Tour OCR et extraction de documents annulé');
    // Nettoyage ou actions spécifiques en cas d'annulation
  });

  return tour;
}

// Fonction pour démarrer le tour
function startOcrExtractionTour() {
  const tour = initOcrExtractionTour();
  tour.start();
  return tour;
}

// Exposer les fonctions pour une utilisation externe
export { initOcrExtractionTour, startOcrExtractionTour }; 