/**
 * Certificate Workflow Tour Configuration
 * 
 * This file initializes and configures the Shepherd.js tour for the certificate workflow.
 * It imports the base configuration and steps definitions and sets up event handlers.
 */

import { initShepherdTour } from '../../shared/js/shepherd-base.js';
import certificateSteps from './steps.js';

/**
 * Initialize the certificate workflow tour
 * @param {Object} options - Configuration options
 * @returns {Object} The configured Shepherd.js tour instance
 */
export function initCertificateTour(options = {}) {
  const defaultOptions = {
    tourName: 'certificate-workflow-tour',
    steps: certificateSteps,
    exitOnEsc: true,
    keyboardNavigation: true
  };

  // Merge provided options with defaults
  const tourOptions = { ...defaultOptions, ...options };
  
  // Initialize the tour with base configuration
  const tour = initShepherdTour(tourOptions);
  
  // Add custom event handlers specific to certificate workflow
  tour.on('show', (evt) => {
    const { step } = evt;
    console.log(`Showing step: ${step.id}`);
    
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
    console.log('Certificate workflow tour completed');
    // Potential analytics tracking or user feedback collection
  });
  
  tour.on('cancel', () => {
    console.log('Certificate workflow tour cancelled');
    // Cleanup any tour-specific UI elements
  });

  return tour;
}

// If this script is executed directly (not imported), start the tour
if (typeof document !== 'undefined' && document.querySelector('.start-certificate-tour')) {
  document.querySelector('.start-certificate-tour').addEventListener('click', () => {
    const tour = initCertificateTour();
    tour.start();
  });
} 