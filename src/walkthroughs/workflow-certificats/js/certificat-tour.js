/**
 * Certificate Workflow Guided Tour
 * 
 * This file manages the initialization and control of the Shepherd.js tour
 * for the certificate workflow. It uses the steps defined in steps.js
 * and provides functions for starting and controlling the tour.
 */

// Import shared tour configuration and steps
import { 
  createShepherdTour,
  addStepsToTour,
  setupProgressTracking
} from '../../shared/js/shepherd-base.js';
import certificatSteps from './steps.js';

/**
 * Starts the certificate workflow guided tour
 * @param {Object} options - Optional configuration for the tour
 */
function startCertificatTour(options = {}) {
  // Configure the tour with default options that can be overridden
  const tourOptions = {
    tourName: 'Certificat Tour',
    defaultStepOptions: {
      scrollTo: true,
      cancelIcon: {
        enabled: true
      },
      popperOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 12]
            }
          }
        ]
      },
      ...options.defaultStepOptions
    },
    useModalOverlay: true,
    ...options
  };

  // Create the tour instance
  const tour = createShepherdTour(tourOptions);
  
  // Add all steps to the tour
  addStepsToTour(tour, certificatSteps);
  
  // Setup progress tracking
  setupProgressTracking(tour, certificatSteps.length);
  
  // Setup event handlers
  setupTourEvents(tour);
  
  // Start the tour
  tour.start();
  
  return tour;
}

/**
 * Setup event handlers for the tour
 * @param {Object} tour - The Shepherd tour instance
 */
function setupTourEvents(tour) {
  // When tour starts
  tour.on('start', () => {
    console.log('Certificate workflow tour started');
    showNotification('Tour des certificats démarré', 'info');
    
    // Create progress indicator if it doesn't exist
    if (!document.querySelector('.yvea-progress-indicator')) {
      const progressIndicator = document.createElement('div');
      progressIndicator.className = 'yvea-progress-indicator';
      progressIndicator.innerHTML = `
        <div class="yvea-progress-text">Étape <span class="yvea-current-step">1</span> sur <span class="yvea-total-steps">${certificatSteps.length}</span></div>
        <div class="yvea-progress-bar-container">
          <div class="yvea-progress-bar-inner" style="width: ${(1 / certificatSteps.length) * 100}%"></div>
        </div>
      `;
      document.body.appendChild(progressIndicator);
    }
  });

  // When tour completes
  tour.on('complete', () => {
    console.log('Certificate workflow tour completed');
    showNotification('Tour des certificats terminé avec succès !', 'success');
    
    // Remove progress indicator
    const progressIndicator = document.querySelector('.yvea-progress-indicator');
    if (progressIndicator) {
      progressIndicator.remove();
    }
  });

  // When tour is cancelled
  tour.on('cancel', () => {
    console.log('Certificate workflow tour cancelled');
    showNotification('Tour des certificats annulé', 'info');
    
    // Remove progress indicator
    const progressIndicator = document.querySelector('.yvea-progress-indicator');
    if (progressIndicator) {
      progressIndicator.remove();
    }
  });

  // When step changes
  tour.on('show', ({ tour }) => {
    const currentStepNumber = tour.steps.indexOf(tour.currentStep) + 1;
    const totalSteps = certificatSteps.length;
    
    // Update progress indicator
    const currentStepEl = document.querySelector('.yvea-current-step');
    const progressBarEl = document.querySelector('.yvea-progress-bar-inner');
    
    if (currentStepEl) {
      currentStepEl.textContent = currentStepNumber;
    }
    
    if (progressBarEl) {
      progressBarEl.style.width = `${(currentStepNumber / totalSteps) * 100}%`;
    }
    
    console.log(`Showing step ${currentStepNumber} of ${totalSteps}`);
  });
}

/**
 * Display a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (info, success, warning, error)
 */
function showNotification(message, type = 'info') {
  // Use the application's notification system if available
  if (window.YveaNotifications && typeof window.YveaNotifications.show === 'function') {
    window.YveaNotifications.show(message, type);
  } else {
    // Fallback to console
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}

// Export the function to start the tour
export { startCertificatTour };

// Make it available globally for easy access
if (typeof window !== 'undefined') {
  window.startCertificatTour = startCertificatTour;
} 