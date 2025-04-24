/**
 * Messaging System Guided Tour
 * 
 * This file manages the initialization and control of the Shepherd.js tour
 * for the messaging system. It uses the steps defined in steps.js
 * and provides functions for starting and controlling the tour.
 */

// Import shared tour configuration and steps
import { 
  createShepherdTour,
  addStepsToTour,
  setupProgressTracking,
  initShepherdTour
} from '../../shared/js/shepherd-base.js';
import messagingSteps from './steps.js';

/**
 * Starts the messaging system guided tour
 * @param {Object} options - Optional configuration for the tour
 */
function startMessagingTour(options = {}) {
  // Configure the tour with default options that can be overridden
  const tourOptions = {
    tourName: 'Messaging Tour',
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
  addStepsToTour(tour, messagingSteps);
  
  // Setup progress tracking
  setupProgressTracking(tour, messagingSteps.length);
  
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
    console.log('Messaging system tour started');
    showNotification('Tour de la messagerie démarré', 'info');
    
    // Create progress indicator if it doesn't exist
    if (!document.querySelector('.yvea-progress-indicator')) {
      const progressIndicator = document.createElement('div');
      progressIndicator.className = 'yvea-progress-indicator';
      progressIndicator.innerHTML = `
        <div class="yvea-progress-text">Étape <span class="yvea-current-step">1</span> sur <span class="yvea-total-steps">${messagingSteps.length}</span></div>
        <div class="yvea-progress-bar-container">
          <div class="yvea-progress-bar-inner" style="width: ${(1 / messagingSteps.length) * 100}%"></div>
        </div>
      `;
      document.body.appendChild(progressIndicator);
    }
  });

  // When tour completes
  tour.on('complete', () => {
    console.log('Messaging system tour completed');
    showNotification('Tour de la messagerie terminé avec succès !', 'success');
    
    // Remove progress indicator
    const progressIndicator = document.querySelector('.yvea-progress-indicator');
    if (progressIndicator) {
      progressIndicator.remove();
    }
  });

  // When tour is cancelled
  tour.on('cancel', () => {
    console.log('Messaging system tour cancelled');
    showNotification('Tour de la messagerie annulé', 'info');
    
    // Remove progress indicator
    const progressIndicator = document.querySelector('.yvea-progress-indicator');
    if (progressIndicator) {
      progressIndicator.remove();
    }
  });

  // When step changes
  tour.on('show', ({ tour }) => {
    const currentStepNumber = tour.steps.indexOf(tour.currentStep) + 1;
    const totalSteps = messagingSteps.length;
    
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

/**
 * Initialize the messaging tour
 * @param {Object} options - Configuration options
 * @returns {Object} The configured Shepherd.js tour instance
 */
export function initMessagingTour(options = {}) {
  const defaultOptions = {
    tourName: 'messaging-tour',
    steps: messagingSteps,
    exitOnEsc: true,
    keyboardNavigation: true
  };

  // Merge provided options with defaults
  const tourOptions = { ...defaultOptions, ...options };
  
  // Initialize the tour with base configuration
  const tour = initShepherdTour(tourOptions);
  
  // Add custom event handlers specific to messaging
  tour.on('show', (evt) => {
    const { step } = evt;
    console.log(`Showing messaging step: ${step.id}`);
    
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
    console.log('Messaging tour completed');
    // Potential analytics tracking or user feedback collection
  });
  
  tour.on('cancel', () => {
    console.log('Messaging tour cancelled');
    // Cleanup any tour-specific UI elements
  });

  return tour;
}

// If this script is executed directly (not imported), start the tour
if (typeof document !== 'undefined' && document.querySelector('.start-messaging-tour')) {
  document.querySelector('.start-messaging-tour').addEventListener('click', () => {
    const tour = initMessagingTour();
    tour.start();
  });
}

// Export the function to start the tour
export { startMessagingTour };

// Make it available globally for easy access
if (typeof window !== 'undefined') {
  window.startMessagingTour = startMessagingTour;
} 