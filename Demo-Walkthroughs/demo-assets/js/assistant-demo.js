/**
 * YVEA - Script pour la démo interactive de l'Assistant IA
 * 
 * Ce script simule le fonctionnement de l'assistant IA de YVEA
 * en affichant des conversations prédéfinies et en permettant
 * des interactions basiques pour la démonstration.
 */

// Configuration et état de l'assistant
const assistantConfig = {
  typingDelay: 1500,     // Temps en ms avant que l'assistant commence à "taper"
  responseDelay: 3000,   // Temps en ms pour simuler la génération de réponse
  dateFormat: { 
    hour: '2-digit', 
    minute: '2-digit'
  }
};

// État de l'application
let appState = {
  conversations: [],        // Données des conversations
  currentContext: null,     // Contexte actuel (certificats, réglementations, etc.)
  recentDocuments: [],      // Documents récemment analysés
  suggestions: [],          // Suggestions de questions
  isTyping: false,          // L'assistant est-il en train de "taper" ?
  loadingData: true,        // Données en cours de chargement
  selectedCapability: null  // Capacité sélectionnée
};

// Sélecteurs DOM
const DOM = {
  container: '.assistant-demo-container',
  chatMessages: '.chat-messages',
  typingIndicator: '.typing-indicator',
  chatInput: '.chat-input',
  sendButton: '.input-action-btn.send',
  suggestionChips: '.suggestion-chips',
  capabilityItems: '.capability-item',
  loadingScreen: '.assistant-loading'
};

/**
 * Initialisation du module
 */
function initAssistantDemo() {
  // Charger les données de démonstration
  loadDemoData()
    .then(data => {
      appState.conversations = data.conversations || [];
      appState.suggestions = data.suggestions || [];
      appState.contexts = data.contexts || [];
      appState.capabilities = data.capabilities || [];
      appState.commands = data.commands || [];
      appState.stats = data.stats || {};
      appState.loadingData = false;
      
      // Initialiser l'interface
      renderCapabilities();
      renderCommands();
      setDefaultContext();
      renderSuggestions();
      renderStats();
      
      // Afficher un message d'accueil
      setTimeout(() => {
        addAssistantMessage(getWelcomeMessage());
      }, 1000);
    })
    .catch(error => {
      console.error('Erreur lors du chargement des données:', error);
      document.querySelector(DOM.chatMessages).innerHTML = `
        <div class="error-message">
          <p>Une erreur est survenue lors du chargement des données de démonstration.</p>
          <p>Erreur: ${error.message}</p>
        </div>
      `;
    });

  // Gestionnaires d'événements
  document.querySelector(DOM.chatInput).addEventListener('keydown', handleInputKeydown);
  document.querySelector(DOM.sendButton).addEventListener('click', handleSendMessage);
  document.querySelector(DOM.container).addEventListener('click', handleContainerClick);
  
  // Auto-redimensionnement de la zone de texte
  const textarea = document.querySelector(DOM.chatInput);
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
  });
}

/**
 * Charge les données de démonstration depuis un fichier JSON
 */
async function loadDemoData() {
  try {
    const response = await fetch('demo-assets/data/assistant-conversations.json');
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    throw error;
  }
}

/**
 * Définit le contexte par défaut pour l'assistant
 */
function setDefaultContext() {
  if (appState.contexts && appState.contexts.length > 0) {
    appState.currentContext = appState.contexts[0];
  }
}

/**
 * Affiche les capacités de l'assistant dans la barre latérale
 */
function renderCapabilities() {
  if (!appState.capabilities) return;
  
  const container = document.querySelector('.capability-list');
  if (!container) return;
  
  let html = '';
  
  appState.capabilities.forEach(capability => {
    html += `
      <li class="capability-item" data-capability="${capability.id}">
        <span class="capability-icon"><i class="${capability.icon}"></i></span>
        <span class="capability-name">${capability.name}</span>
      </li>
    `;
  });
  
  container.innerHTML = html;
  
  // Sélectionner la première capacité par défaut
  if (appState.capabilities.length > 0) {
    const firstCapability = appState.capabilities[0];
    appState.selectedCapability = firstCapability.id;
    document.querySelector(`[data-capability="${firstCapability.id}"]`).classList.add('active');
  }
}

/**
 * Affiche les commandes disponibles dans la barre latérale
 */
function renderCommands() {
  if (!appState.commands) return;
  
  const container = document.querySelector('.command-list');
  if (!container) return;
  
  let html = '';
  
  appState.commands.forEach(command => {
    html += `
      <li class="command-item">
        <span class="command-text">${command.text}</span>
        <span class="command-desc">${command.description}</span>
      </li>
    `;
  });
  
  container.innerHTML = html;
}

/**
 * Affiche les statistiques de l'assistant
 */
function renderStats() {
  if (!appState.stats) return;
  
  const totalInteractions = document.querySelector('.stat-interactions');
  const answeredQuestions = document.querySelector('.stat-questions');
  const documentsAnalyzed = document.querySelector('.stat-documents');
  const responseTime = document.querySelector('.stat-time');
  
  if (totalInteractions) totalInteractions.textContent = appState.stats.totalInteractions || 0;
  if (answeredQuestions) answeredQuestions.textContent = appState.stats.questionsAnswered || 0;
  if (documentsAnalyzed) documentsAnalyzed.textContent = appState.stats.documentsAnalyzed || 0;
  if (responseTime) responseTime.textContent = appState.stats.averageResponseTime || '1.2s';
}

/**
 * Affiche des suggestions de questions
 */
function renderSuggestions() {
  if (!appState.suggestions) return;
  
  const container = document.querySelector(DOM.suggestionChips);
  if (!container) return;
  
  let html = '';
  const currentContextSuggestions = appState.suggestions.filter(
    suggestion => !suggestion.context || suggestion.context === appState.currentContext
  );
  
  // Prendre 3 suggestions aléatoires
  const randomSuggestions = getRandomItems(currentContextSuggestions, 3);
  
  randomSuggestions.forEach(suggestion => {
    html += `
      <div class="suggestion-chip" data-text="${suggestion.text}">
        ${suggestion.text}
      </div>
    `;
  });
  
  container.innerHTML = html;
}

/**
 * Sélectionne des éléments aléatoires d'un tableau
 */
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Retourne un message d'accueil en fonction du contexte actuel
 */
function getWelcomeMessage() {
  const hour = new Date().getHours();
  let greeting = '';
  
  if (hour < 12) {
    greeting = 'Bonjour';
  } else if (hour < 18) {
    greeting = 'Bon après-midi';
  } else {
    greeting = 'Bonsoir';
  }
  
  return `${greeting} ! Je suis l'assistant IA de YVEA. Comment puis-je vous aider aujourd'hui ?`;
}

/**
 * Gère l'envoi d'un message par l'utilisateur
 */
function handleSendMessage() {
  const inputElement = document.querySelector(DOM.chatInput);
  const message = inputElement.value.trim();
  
  if (message === '') return;
  
  // Ajouter le message de l'utilisateur
  addUserMessage(message);
  
  // Réinitialiser l'input
  inputElement.value = '';
  inputElement.style.height = 'auto';
  
  // Trouver une réponse appropriée
  const response = findAppropriateResponse(message);
  
  // Simuler la réponse de l'assistant
  simulateAssistantTyping();
  
  setTimeout(() => {
    setTypingStatus(false);
    addAssistantMessage(response);
    
    // Afficher de nouvelles suggestions après la réponse
    renderSuggestions();
  }, assistantConfig.responseDelay);
}

/**
 * Gère les événements de clic sur le conteneur
 */
function handleContainerClick(event) {
  // Gérer les clics sur les suggestions
  if (event.target.classList.contains('suggestion-chip')) {
    const text = event.target.getAttribute('data-text');
    if (text) {
      document.querySelector(DOM.chatInput).value = text;
      handleSendMessage();
    }
  }
  
  // Gérer les clics sur les capacités
  if (event.target.closest('.capability-item')) {
    const capabilityItem = event.target.closest('.capability-item');
    const capabilityId = capabilityItem.getAttribute('data-capability');
    
    // Désélectionner tous les éléments
    document.querySelectorAll('.capability-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Sélectionner l'élément cliqué
    capabilityItem.classList.add('active');
    
    // Mettre à jour l'état
    appState.selectedCapability = capabilityId;
    
    // Trouver le contexte associé à cette capacité
    const capability = appState.capabilities.find(c => c.id === capabilityId);
    if (capability && capability.context) {
      appState.currentContext = capability.context;
      
      // Afficher un message d'information sur le changement de contexte
      addAssistantMessage(`Je suis maintenant en mode "${capability.name}". Comment puis-je vous aider ?`);
      
      // Mettre à jour les suggestions
      renderSuggestions();
    }
  }
  
  // Gérer les clics sur les boutons de feedback
  if (event.target.closest('.feedback-btn')) {
    const feedbackBtn = event.target.closest('.feedback-btn');
    const isLike = feedbackBtn.classList.contains('like');
    
    // Réinitialiser tous les boutons de feedback dans ce message
    const message = feedbackBtn.closest('.message');
    message.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.classList.remove('liked', 'disliked');
    });
    
    // Activer le bouton cliqué
    if (isLike) {
      feedbackBtn.classList.add('liked');
      addAssistantMessage("Merci pour votre retour positif ! Cela m'aide à m'améliorer.");
    } else {
      feedbackBtn.classList.add('disliked');
      addAssistantMessage("Je vous remercie pour votre retour. Je vais m'efforcer de mieux répondre à vos attentes.");
    }
  }
}

/**
 * Gère les événements du clavier dans la zone de saisie
 */
function handleInputKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSendMessage();
  }
}

/**
 * Trouve une réponse appropriée à une question de l'utilisateur
 */
function findAppropriateResponse(userMessage) {
  // Normaliser le message (minuscules, sans ponctuation)
  const normalizedMessage = userMessage.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  
  // Chercher une réponse dans les conversations prédéfinies
  for (const conversation of appState.conversations) {
    // Vérifier si cette conversation appartient au contexte actuel
    if (conversation.context && conversation.context !== appState.currentContext) {
      continue;
    }
    
    // Vérifier les mots clés
    const keywords = conversation.keywords || [];
    if (keywords.some(keyword => normalizedMessage.includes(keyword.toLowerCase()))) {
      return conversation.response;
    }
  }
  
  // Réponse par défaut si aucune correspondance
  return "Je vous prie de m'excuser, mais je ne suis pas en mesure de comprendre ou de répondre adéquatement à votre demande. Pourriez-vous reformuler votre question ou choisir l'une des suggestions ci-dessous ?";
}

/**
 * Ajoute un message de l'utilisateur à la conversation
 */
function addUserMessage(message) {
  const chatMessages = document.querySelector(DOM.chatMessages);
  const time = new Date().toLocaleTimeString('fr-FR', assistantConfig.dateFormat);
  
  const messageElement = document.createElement('div');
  messageElement.className = 'message user';
  messageElement.innerHTML = `
    <div class="message-avatar">U</div>
    <div class="message-container">
      <div class="message-content">${escapeHtml(message)}</div>
      <div class="message-time">${time}</div>
    </div>
  `;
  
  chatMessages.appendChild(messageElement);
  scrollToBottom();
}

/**
 * Ajoute un message de l'assistant à la conversation
 */
function addAssistantMessage(message) {
  const chatMessages = document.querySelector(DOM.chatMessages);
  const time = new Date().toLocaleTimeString('fr-FR', assistantConfig.dateFormat);
  
  const messageElement = document.createElement('div');
  messageElement.className = 'message assistant';
  
  // Formatage du message avec analyse des codes spéciaux
  let formattedMessage = message;
  
  // Détection de document (format spécial: {{DOCUMENT:id}})
  const documentMatch = message.match(/{{DOCUMENT:([^}]+)}}/);
  let documentHtml = '';
  
  if (documentMatch) {
    const documentId = documentMatch[1];
    formattedMessage = message.replace(documentMatch[0], '');
    
    // Simuler un document analysé
    documentHtml = createDocumentAnalysisHtml(documentId);
  }
  
  messageElement.innerHTML = `
    <div class="message-avatar">IA</div>
    <div class="message-container">
      <div class="message-content">${formattedMessage}</div>
      ${documentHtml}
      <div class="message-time">${time}</div>
      <div class="message-feedback">
        <button class="feedback-btn like">
          <i class="fas fa-thumbs-up"></i> Utile
        </button>
        <button class="feedback-btn dislike">
          <i class="fas fa-thumbs-down"></i> À améliorer
        </button>
      </div>
    </div>
  `;
  
  chatMessages.appendChild(messageElement);
  scrollToBottom();
}

/**
 * Crée le HTML pour l'analyse d'un document
 */
function createDocumentAnalysisHtml(documentId) {
  // En fonction du type de document, on pourrait générer différentes analyses
  // Pour la démo, on utilise un modèle simple
  
  return `
    <div class="document-analysis">
      <h4><i class="fas fa-file-invoice"></i> Analyse de document</h4>
      <div class="document-info">
        <div class="document-thumbnail">
          <img src="demo-assets/images/invoice-thumb.png" alt="Aperçu du document">
        </div>
        <div class="document-details">
          <div class="document-name">Facture-${documentId}.pdf</div>
          <div class="extracted-fields">
            <div class="field-item">
              <span class="field-label">Fournisseur</span>
              <span class="field-value">Electrify Gabon</span>
            </div>
            <div class="field-item">
              <span class="field-label">Numéro</span>
              <span class="field-value">INV-2023-${Math.floor(Math.random() * 10000)}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Date</span>
              <span class="field-value">${new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div class="field-item">
              <span class="field-label">Montant</span>
              <span class="field-value">${Math.floor(Math.random() * 1000) + 100} €</span>
            </div>
          </div>
        </div>
      </div>
      <div class="document-actions">
        <button class="document-action-btn secondary">Modifier les données</button>
        <button class="document-action-btn">Valider l'extraction</button>
      </div>
    </div>
  `;
}

/**
 * Simule l'indicateur de saisie de l'assistant
 */
function simulateAssistantTyping() {
  setTypingStatus(true);
}

/**
 * Définit l'état de saisie de l'assistant
 */
function setTypingStatus(isTyping) {
  const typingIndicator = document.querySelector(DOM.typingIndicator);
  appState.isTyping = isTyping;
  
  if (isTyping) {
    typingIndicator.classList.add('active');
  } else {
    typingIndicator.classList.remove('active');
  }
}

/**
 * Fait défiler la conversation vers le bas
 */
function scrollToBottom() {
  const chatMessages = document.querySelector(DOM.chatMessages);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Échappe les caractères HTML pour éviter les injections XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Initialiser lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', initAssistantDemo); 