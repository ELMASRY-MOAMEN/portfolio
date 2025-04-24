/**
 * Configuration de base pour les visites guidées avec Shepherd.js
 * Centralise la configuration commune à tous les walkthroughs de YVEA
 */

/**
 * Initialise la configuration de base pour Shepherd.js
 * @param {Object} options - Options de configuration
 * @param {string} options.tourName - Nom du tour (pour le tracking et l'identification)
 * @param {Object} options.buttonTexts - Textes personnalisés pour les boutons
 * @param {string} options.buttonTexts.nextText - Texte pour le bouton Suivant
 * @param {string} options.buttonTexts.prevText - Texte pour le bouton Précédent
 * @param {string} options.buttonTexts.finishText - Texte pour le bouton Terminer
 * @returns {Object} Configuration de base pour Shepherd
 */
export function initShepherdBase(options = {}) {
  const {
    tourName = 'yvea-tour',
    buttonTexts = {
      nextText: 'Suivant',
      prevText: 'Précédent',
      finishText: 'Terminer'
    }
  } = options;

  // Vérifier si Shepherd.js est disponible
  if (typeof window !== 'undefined' && !window.Shepherd) {
    console.warn('Shepherd.js n\'est pas chargé. Vérifiez que la bibliothèque est importée.');
  }

  // Configuration de base pour tous les tours
  return {
    defaultStepOptions: {
      classes: 'yvea-shepherd-step',
      scrollTo: true,
      cancelIcon: {
        enabled: true
      },
      buttons: [
        {
          text: buttonTexts.prevText,
          action: function() {
            return this.back();
          },
          classes: 'yvea-shepherd-button-secondary',
          secondary: true
        },
        {
          text: buttonTexts.nextText,
          action: function() {
            return this.next();
          },
          classes: 'yvea-shepherd-button-primary'
        }
      ],
      when: {
        show: function() {
          document.body.classList.add('yvea-tour-active');
          
          // Émettre un événement pour le suivi analytique
          const event = new CustomEvent('yvea:tour:step:show', {
            detail: {
              tourName: tourName,
              stepId: this.id
            }
          });
          document.dispatchEvent(event);
          
          // Ajouter l'indicateur de progression
          updateProgressIndicator(this);
        },
        hide: function() {
          // Émettre un événement pour le suivi analytique
          const event = new CustomEvent('yvea:tour:step:hide', {
            detail: {
              tourName: tourName,
              stepId: this.id
            }
          });
          document.dispatchEvent(event);
        }
      }
    },
    tourName: tourName,
    useModalOverlay: true,
    exitOnEsc: true,
    keyboardNavigation: true
  };
}

/**
 * Met à jour l'indicateur de progression pour l'étape actuelle
 * @param {Object} step - L'étape actuelle du tour
 */
function updateProgressIndicator(step) {
  // Trouver l'élément Shepherd
  const shepherdElement = document.querySelector('.shepherd-element');
  if (!shepherdElement) return;
  
  // Récupérer les informations de progression
  const tour = step.tour;
  const currentStepIndex = tour.steps.indexOf(step);
  const totalSteps = tour.steps.length;
  
  // Créer ou mettre à jour l'indicateur de progression
  let progressIndicator = document.querySelector('.yvea-progress-indicator');
  
  if (!progressIndicator) {
    // Créer l'indicateur s'il n'existe pas
    progressIndicator = document.createElement('div');
    progressIndicator.className = 'yvea-progress-indicator';
    
    // Ajouter les éléments internes
    const progressText = document.createElement('span');
    progressText.className = 'yvea-progress-text';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'yvea-progress-bar-container';
    
    const progressBarInner = document.createElement('div');
    progressBarInner.className = 'yvea-progress-bar-inner';
    
    progressBar.appendChild(progressBarInner);
    progressIndicator.appendChild(progressText);
    progressIndicator.appendChild(progressBar);
    
    // Ajouter au DOM
    const shepherdContent = shepherdElement.querySelector('.shepherd-content');
    if (shepherdContent) {
      const shepherdFooter = shepherdContent.querySelector('.shepherd-footer');
      shepherdContent.insertBefore(progressIndicator, shepherdFooter);
    }
  }
  
  // Mettre à jour le texte de progression
  const progressText = progressIndicator.querySelector('.yvea-progress-text');
  if (progressText) {
    progressText.textContent = `Étape ${currentStepIndex + 1} sur ${totalSteps}`;
  }
  
  // Mettre à jour la barre de progression
  const progressBarInner = progressIndicator.querySelector('.yvea-progress-bar-inner');
  if (progressBarInner) {
    const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
    progressBarInner.style.width = `${progressPercentage}%`;
  }
}

/**
 * Enregistre la complétion d'un tour guidé
 * @param {string} tourName - Nom du tour complété
 * @param {Object} data - Données supplémentaires à enregistrer
 */
export function registerTourCompletion(tourName, data = {}) {
  // Enregistrer dans le localStorage
  const completedTours = JSON.parse(localStorage.getItem('yvea_completed_tours') || '{}');
  completedTours[tourName] = {
    completedAt: new Date().toISOString(),
    ...data
  };
  localStorage.setItem('yvea_completed_tours', JSON.stringify(completedTours));
  
  // Retirer la classe active du body
  document.body.classList.remove('yvea-tour-active');
  
  // Émettre un événement pour le suivi analytique
  const event = new CustomEvent('yvea:tour:complete', {
    detail: {
      tourName: tourName,
      ...data
    }
  });
  document.dispatchEvent(event);
  
  console.log(`Tour "${tourName}" complété et enregistré.`);
}

/**
 * Vérifie si un tour a déjà été complété
 * @param {string} tourName - Nom du tour à vérifier
 * @returns {boolean} True si le tour a été complété
 */
export function isTourCompleted(tourName) {
  const completedTours = JSON.parse(localStorage.getItem('yvea_completed_tours') || '{}');
  return !!completedTours[tourName];
}

/**
 * Réinitialise le statut d'un tour (marque comme non complété)
 * @param {string} tourName - Nom du tour à réinitialiser
 */
export function resetTourCompletion(tourName) {
  const completedTours = JSON.parse(localStorage.getItem('yvea_completed_tours') || '{}');
  if (completedTours[tourName]) {
    delete completedTours[tourName];
    localStorage.setItem('yvea_completed_tours', JSON.stringify(completedTours));
    console.log(`Tour "${tourName}" réinitialisé.`);
  }
}

/**
 * Crée un gestionnaire de tours interactifs pour permettre le lancement
 * des différents tours depuis une interface centralisée
 * @param {Object} tours - Objet contenant les tours disponibles avec leur fonction d'initialisation
 * @returns {Object} Gestionnaire de tours avec méthodes pour démarrer/arrêter les tours
 */
export function createTourManager(tours = {}) {
  let activeTour = null;
  
  return {
    /**
     * Démarre un tour spécifique
     * @param {string} tourId - Identifiant du tour à démarrer
     * @param {Object} options - Options à passer au tour
     * @returns {boolean} True si le tour a été démarré avec succès
     */
    startTour(tourId, options = {}) {
      // Arrêter tout tour actif
      if (activeTour) {
        activeTour.cancel();
        activeTour = null;
      }
      
      // Vérifier si le tour demandé existe
      if (!tours[tourId]) {
        console.error(`Tour "${tourId}" non trouvé dans les tours enregistrés.`);
        return false;
      }
      
      // Initialiser et démarrer le tour
      try {
        activeTour = tours[tourId]({
          ...options,
          autoStart: true
        });
        return true;
      } catch (error) {
        console.error(`Erreur lors du démarrage du tour "${tourId}":`, error);
        return false;
      }
    },
    
    /**
     * Arrête le tour actif
     */
    stopActiveTour() {
      if (activeTour) {
        activeTour.cancel();
        activeTour = null;
      }
    },
    
    /**
     * Vérifie si un tour est actuellement actif
     * @returns {boolean} True si un tour est actif
     */
    isActiveTour() {
      return activeTour !== null && activeTour.isActive();
    },
    
    /**
     * Retourne la liste des tours disponibles
     * @returns {string[]} Liste des identifiants de tours disponibles
     */
    getAvailableTours() {
      return Object.keys(tours);
    }
  };
}

export default {
  initShepherdBase,
  registerTourCompletion,
  isTourCompleted,
  resetTourCompletion,
  createTourManager
}; 