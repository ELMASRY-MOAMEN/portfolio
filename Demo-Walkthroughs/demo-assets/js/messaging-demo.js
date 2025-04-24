/**
 * YVEA Messaging System Demo
 * 
 * This script simulates the messaging functionality for the YVEA portfolio demo.
 * It creates an interactive messaging interface with simulated real-time interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize messaging demo when content is loaded
  initMessagingDemo();
});

/**
 * Initialize the messaging demo interface
 */
function initMessagingDemo() {
  // Get the demo container
  const container = document.querySelector('.messaging-demo-container');
  
  if (!container) {
    console.error('Messaging demo container not found');
    return;
  }
  
  // Set up the demo HTML structure
  container.innerHTML = `
    <div class="messaging-demo">
      <div class="messaging-header">
        <div class="messaging-title">
          <h2>Messagerie YVEA</h2>
          <p>Système de communication sécurisé</p>
        </div>
        <div class="messaging-actions">
          <button class="messaging-action-btn primary">Nouveau message</button>
          <button class="messaging-action-btn">Paramètres</button>
        </div>
      </div>
      
      <div class="messaging-body">
        <div class="messaging-sidebar">
          <div class="search-bar">
            <input type="text" placeholder="Rechercher une conversation..." class="search-input">
            <button class="search-btn"><i class="search-icon">🔍</i></button>
          </div>
          
          <div class="conversations-container">
            <h3>Conversations</h3>
            <div class="conversations-list">
              <!-- Conversations will be loaded here -->
            </div>
          </div>
          
          <div class="filters">
            <h3>Filtres</h3>
            <div class="filter-options">
              <label class="filter-option">
                <input type="checkbox" checked> Non lus
              </label>
              <label class="filter-option">
                <input type="checkbox" checked> Messages importants
              </label>
              <label class="filter-option">
                <input type="checkbox" checked> Avec documents
              </label>
            </div>
          </div>
        </div>
        
        <div class="messaging-main">
          <div class="conversation-container">
            <div class="conversation-header">
              <div class="conversation-info">
                <h3 class="conversation-name">Chargement...</h3>
                <span class="conversation-participants">...</span>
              </div>
              <div class="conversation-tools">
                <button class="tool-btn attach-btn" title="Joindre un fichier">📎</button>
                <button class="tool-btn options-btn" title="Options">⋯</button>
              </div>
            </div>
            
            <div class="messages-container">
              <!-- Messages will be loaded here -->
              <div class="messages-placeholder">Sélectionnez une conversation pour afficher les messages</div>
            </div>
            
            <div class="message-composer">
              <textarea class="message-input" placeholder="Rédigez votre message..."></textarea>
              <div class="composer-actions">
                <button class="composer-btn emoji-btn" title="Ajouter un emoji">😊</button>
                <button class="composer-btn attach-file-btn" title="Joindre un fichier">📎</button>
                <button class="composer-btn send-btn" title="Envoyer" disabled>📤</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="details-sidebar">
          <div class="details-header">
            <h3>Détails de la conversation</h3>
            <button class="close-details-btn">×</button>
          </div>
          
          <div class="participant-details">
            <h4>Participants</h4>
            <div class="participants-list">
              <!-- Participants will be loaded here -->
            </div>
          </div>
          
          <div class="shared-files">
            <h4>Documents partagés</h4>
            <div class="files-list">
              <!-- Shared files will be loaded here -->
            </div>
          </div>
          
          <div class="conversation-settings">
            <h4>Paramètres</h4>
            <div class="settings-options">
              <label class="setting-option">
                <input type="checkbox" checked> Notifications
              </label>
              <label class="setting-option">
                <input type="checkbox" checked> Marquer comme important
              </label>
              <label class="setting-option">
                <input type="checkbox"> Archiver
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Initialize the demo data and interactions
  loadMessagingData()
    .then(data => {
      setupConversationsList(data.conversations);
      setupMessageInput();
      setupEventListeners();
    })
    .catch(error => {
      console.error('Error loading messaging data:', error);
      showErrorMessage('Impossible de charger les données de messagerie');
    });
}

/**
 * Load the messaging demo data
 * @returns {Promise} Promise resolving to the messaging data
 */
async function loadMessagingData() {
  try {
    // Simulating loading delay for more realistic experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mocked data for demo purposes
    return {
      conversations: [
        {
          id: 'conv-1',
          name: 'Support YVEA',
          participants: ['Support Technique', 'Vous'],
          lastMessage: {
            sender: 'Support Technique',
            text: 'Votre demande a été traitée. Voici les documents demandés.',
            timestamp: '2024-04-20T09:35:00Z',
            hasAttachments: true,
            isRead: false
          },
          messages: [
            {
              sender: 'Support Technique',
              text: 'Bonjour, comment puis-je vous aider ?',
              timestamp: '2024-04-20T09:15:00Z',
              isRead: true
            },
            {
              sender: 'Vous',
              text: 'Bonjour, je cherche des informations sur les certificats d\'importation.',
              timestamp: '2024-04-20T09:20:00Z',
              isRead: true
            },
            {
              sender: 'Support Technique',
              text: 'Bien sûr, je peux vous aider. Pouvez-vous préciser quelles informations vous recherchez ?',
              timestamp: '2024-04-20T09:25:00Z',
              isRead: true
            },
            {
              sender: 'Vous',
              text: 'J\'aimerais obtenir des exemples de documents requis pour une demande de certificat d\'importation de produits alimentaires.',
              timestamp: '2024-04-20T09:30:00Z',
              isRead: true
            },
            {
              sender: 'Support Technique',
              text: 'Votre demande a été traitée. Voici les documents demandés.',
              timestamp: '2024-04-20T09:35:00Z',
              hasAttachments: true,
              attachments: [
                {
                  name: 'Exemple_Certificat_Importation.pdf',
                  type: 'pdf',
                  size: '1.2 MB'
                },
                {
                  name: 'Liste_Documents_Requis.docx',
                  type: 'docx',
                  size: '680 KB'
                }
              ],
              isRead: false
            }
          ]
        },
        {
          id: 'conv-2',
          name: 'Service des certificats',
          participants: ['Agent certificats', 'Superviseur', 'Vous'],
          lastMessage: {
            sender: 'Agent certificats',
            text: 'Votre certificat a été validé et est disponible au téléchargement.',
            timestamp: '2024-04-19T16:45:00Z',
            hasAttachments: false,
            isRead: true
          },
          messages: [
            {
              sender: 'Agent certificats',
              text: 'Bonjour, nous avons reçu votre demande de certificat d\'importation référence CI-2024-0458.',
              timestamp: '2024-04-19T14:30:00Z',
              isRead: true
            },
            {
              sender: 'Vous',
              text: 'Merci pour votre retour rapide. Quel est le délai habituel de traitement ?',
              timestamp: '2024-04-19T15:15:00Z',
              isRead: true
            },
            {
              sender: 'Agent certificats',
              text: 'Le délai standard est de 48h, mais nous traitons actuellement les demandes plus rapidement. La vôtre est en cours de validation.',
              timestamp: '2024-04-19T15:30:00Z',
              isRead: true
            },
            {
              sender: 'Superviseur',
              text: 'J\'ai accéléré la validation de votre dossier compte tenu de l\'urgence mentionnée.',
              timestamp: '2024-04-19T16:20:00Z',
              isRead: true
            },
            {
              sender: 'Agent certificats',
              text: 'Votre certificat a été validé et est disponible au téléchargement.',
              timestamp: '2024-04-19T16:45:00Z',
              isRead: true
            }
          ]
        },
        {
          id: 'conv-3',
          name: 'Service comptabilité',
          participants: ['Comptable', 'Vous'],
          lastMessage: {
            sender: 'Comptable',
            text: 'Nous avons bien reçu votre paiement pour les frais de dossier.',
            timestamp: '2024-04-18T11:20:00Z',
            hasAttachments: false,
            isRead: true
          },
          messages: [
            {
              sender: 'Comptable',
              text: 'Bonjour, nous avons constaté que votre paiement pour les frais de dossier est en attente.',
              timestamp: '2024-04-18T10:30:00Z',
              isRead: true
            },
            {
              sender: 'Vous',
              text: 'Bonjour, le paiement a été effectué hier. Je vous transmets la confirmation de transaction.',
              timestamp: '2024-04-18T10:45:00Z',
              hasAttachments: true,
              attachments: [
                {
                  name: 'Confirmation_Paiement.pdf',
                  type: 'pdf',
                  size: '450 KB'
                }
              ],
              isRead: true
            },
            {
              sender: 'Comptable',
              text: 'Nous avons bien reçu votre paiement pour les frais de dossier.',
              timestamp: '2024-04-18T11:20:00Z',
              isRead: true
            }
          ]
        },
        {
          id: 'conv-4',
          name: 'Douanes Gabonaises',
          participants: ['Agent douanes', 'Vous'],
          lastMessage: {
            sender: 'Agent douanes',
            text: 'Votre dossier est complet, vous recevrez une notification lors du passage en douane.',
            timestamp: '2024-04-17T14:15:00Z',
            hasAttachments: false,
            isRead: true
          },
          unreadCount: 0,
          messages: []
        },
        {
          id: 'conv-5',
          name: 'Transporteur maritime',
          participants: ['Agent logistique', 'Vous'],
          lastMessage: {
            sender: 'Agent logistique',
            text: 'Votre conteneur est arrivé au port. Veuillez préparer les documents pour le dédouanement.',
            timestamp: '2024-04-16T09:30:00Z',
            hasAttachments: false,
            isRead: false
          },
          unreadCount: 3,
          messages: []
        }
      ],
      
      sharedFiles: [
        {
          name: 'Certificat_Origine.pdf',
          type: 'pdf',
          size: '1.5 MB',
          uploadedBy: 'Vous',
          timestamp: '2024-04-19T10:15:00Z'
        },
        {
          name: 'Facture_Commerciale.pdf',
          type: 'pdf',
          size: '820 KB',
          uploadedBy: 'Vous',
          timestamp: '2024-04-19T10:18:00Z'
        },
        {
          name: 'LTA_Maritime.pdf',
          type: 'pdf',
          size: '950 KB',
          uploadedBy: 'Agent logistique',
          timestamp: '2024-04-16T09:25:00Z'
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching messaging data:', error);
    throw error;
  }
}

/**
 * Set up the conversations list in the sidebar
 * @param {Array} conversations - Array of conversation objects
 */
function setupConversationsList(conversations) {
  const conversationsList = document.querySelector('.conversations-list');
  
  if (!conversationsList) {
    console.error('Conversations list container not found');
    return;
  }
  
  // Clear existing conversations
  conversationsList.innerHTML = '';
  
  // Add each conversation to the list
  conversations.forEach(conversation => {
    const hasUnread = conversation.lastMessage && !conversation.lastMessage.isRead;
    
    const conversationItem = document.createElement('div');
    conversationItem.classList.add('conversation-item');
    if (hasUnread) {
      conversationItem.classList.add('unread');
    }
    conversationItem.dataset.conversationId = conversation.id;
    
    const lastMessageTime = conversation.lastMessage ? 
      formatTimeAgo(new Date(conversation.lastMessage.timestamp)) : '';
    
    conversationItem.innerHTML = `
      <div class="conversation-header">
        <div class="conversation-title">${conversation.name}</div>
        <div class="conversation-time">${lastMessageTime}</div>
      </div>
      <div class="conversation-preview">
        ${conversation.lastMessage ? 
          (conversation.lastMessage.sender !== 'Vous' ? 
            `${conversation.lastMessage.sender}: ` : '') + 
            conversation.lastMessage.text.substring(0, 50) + 
            (conversation.lastMessage.text.length > 50 ? '...' : '') +
            (conversation.lastMessage.hasAttachments ? ' 📎' : '')
          : 'Aucun message'
        }
      </div>
      ${hasUnread ? 
        `<div class="unread-badge">${conversation.unreadCount || 1}</div>` : ''}
    `;
    
    // Add click event to load the conversation
    conversationItem.addEventListener('click', () => {
      selectConversation(conversation);
      
      // Remove unread class when the conversation is opened
      conversationItem.classList.remove('unread');
      if (conversationItem.querySelector('.unread-badge')) {
        conversationItem.querySelector('.unread-badge').remove();
      }
    });
    
    conversationsList.appendChild(conversationItem);
  });
  
  // Select the first conversation by default
  if (conversations.length > 0) {
    selectConversation(conversations[0]);
    
    const firstConversationItem = conversationsList.querySelector('.conversation-item');
    if (firstConversationItem) {
      firstConversationItem.classList.add('active');
    }
  }
}

/**
 * Select and display a conversation
 * @param {Object} conversation - The conversation to display
 */
function selectConversation(conversation) {
  // Update conversation items active state
  const conversationItems = document.querySelectorAll('.conversation-item');
  conversationItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.conversationId === conversation.id) {
      item.classList.add('active');
    }
  });
  
  // Update conversation header
  const conversationName = document.querySelector('.conversation-name');
  const conversationParticipants = document.querySelector('.conversation-participants');
  
  if (conversationName) {
    conversationName.textContent = conversation.name;
  }
  
  if (conversationParticipants) {
    conversationParticipants.textContent = 
      conversation.participants.filter(p => p !== 'Vous').join(', ');
  }
  
  // Load and display messages
  displayMessages(conversation.messages || []);
  
  // Update participants list in details sidebar
  updateParticipantsList(conversation.participants);
  
  // Update shared files in details sidebar
  updateSharedFilesList(conversation);
}

/**
 * Display messages in the messages container
 * @param {Array} messages - Array of message objects
 */
function displayMessages(messages) {
  const messagesContainer = document.querySelector('.messages-container');
  const placeholderEl = document.querySelector('.messages-placeholder');
  
  if (!messagesContainer) {
    console.error('Messages container not found');
    return;
  }
  
  // Clear existing messages (except placeholder)
  const existingMessages = messagesContainer.querySelectorAll('.message-bubble');
  existingMessages.forEach(message => message.remove());
  
  if (messages.length === 0) {
    if (placeholderEl) {
      placeholderEl.style.display = 'flex';
    }
    return;
  }
  
  // Hide placeholder if there are messages
  if (placeholderEl) {
    placeholderEl.style.display = 'none';
  }
  
  // Add each message to the container
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-bubble');
    messageElement.classList.add(message.sender === 'Vous' ? 'sent' : 'received');
    
    let messageContent = `
      <div class="message-content">${message.text}</div>
      <div class="message-time">${formatMessageTime(new Date(message.timestamp))}</div>
    `;
    
    // Add attachments if present
    if (message.hasAttachments && message.attachments) {
      const attachmentsHtml = message.attachments.map(attachment => `
        <div class="message-attachment">
          <div class="message-attachment-icon">${getFileIcon(attachment.type)}</div>
          <div class="message-attachment-name">${attachment.name}</div>
          <div class="message-attachment-size">${attachment.size}</div>
        </div>
      `).join('');
      
      messageContent += `<div class="message-attachments">${attachmentsHtml}</div>`;
    }
    
    // Add read status for sent messages
    if (message.sender === 'Vous') {
      messageContent += `
        <div class="message-status ${message.isRead ? 'read' : ''}">
          ${message.isRead ? 'Lu' : 'Envoyé'}
        </div>
      `;
    }
    
    messageElement.innerHTML = messageContent;
    messagesContainer.appendChild(messageElement);
  });
  
  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Update the participants list in the details sidebar
 * @param {Array} participants - Array of participant names
 */
function updateParticipantsList(participants) {
  const participantsList = document.querySelector('.participants-list');
  
  if (!participantsList) {
    console.error('Participants list container not found');
    return;
  }
  
  // Clear existing participants
  participantsList.innerHTML = '';
  
  // Add each participant to the list
  participants.forEach(participant => {
    const participantElement = document.createElement('div');
    participantElement.classList.add('participant-item');
    
    // Add "you" label for the current user
    const isCurrentUser = participant === 'Vous';
    
    participantElement.innerHTML = `
      <div class="participant-avatar">
        ${participant.substring(0, 1).toUpperCase()}
      </div>
      <div class="participant-info">
        <div class="participant-name">${participant}</div>
        ${isCurrentUser ? '<div class="participant-label">Vous</div>' : ''}
      </div>
    `;
    
    participantsList.appendChild(participantElement);
  });
}

/**
 * Update the shared files list in the details sidebar
 * @param {Object} conversation - The current conversation
 */
function updateSharedFilesList(conversation) {
  const filesList = document.querySelector('.files-list');
  
  if (!filesList) {
    console.error('Files list container not found');
    return;
  }
  
  // Clear existing files
  filesList.innerHTML = '';
  
  // Collect all attachments from messages
  const attachments = [];
  
  if (conversation.messages) {
    conversation.messages.forEach(message => {
      if (message.hasAttachments && message.attachments) {
        message.attachments.forEach(attachment => {
          attachments.push({
            ...attachment,
            uploadedBy: message.sender,
            timestamp: message.timestamp
          });
        });
      }
    });
  }
  
  if (attachments.length === 0) {
    filesList.innerHTML = '<div class="no-files">Aucun fichier partagé</div>';
    return;
  }
  
  // Add each attachment to the list
  attachments.forEach(attachment => {
    const fileElement = document.createElement('div');
    fileElement.classList.add('shared-file');
    
    fileElement.innerHTML = `
      <div class="file-icon">${getFileIcon(attachment.type)}</div>
      <div class="file-info">
        <div class="file-name">${attachment.name}</div>
        <div class="file-meta">
          <span class="file-size">${attachment.size}</span>
          <span class="file-uploader">De: ${attachment.uploadedBy}</span>
          <span class="file-date">${formatDate(new Date(attachment.timestamp))}</span>
        </div>
      </div>
      <div class="file-actions">
        <button class="file-action-btn download-btn" title="Télécharger">⬇️</button>
      </div>
    `;
    
    filesList.appendChild(fileElement);
  });
}

/**
 * Set up the message input and sending functionality
 */
function setupMessageInput() {
  const messageInput = document.querySelector('.message-input');
  const sendButton = document.querySelector('.send-btn');
  
  if (!messageInput || !sendButton) {
    console.error('Message input elements not found');
    return;
  }
  
  // Enable/disable send button based on input content
  messageInput.addEventListener('input', () => {
    sendButton.disabled = messageInput.value.trim() === '';
  });
  
  // Handle send button click
  sendButton.addEventListener('click', () => {
    sendMessage();
  });
  
  // Handle Enter key to send message
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
}

/**
 * Send a new message
 */
function sendMessage() {
  const messageInput = document.querySelector('.message-input');
  const sendButton = document.querySelector('.send-btn');
  const messagesContainer = document.querySelector('.messages-container');
  const activeConversation = document.querySelector('.conversation-item.active');
  
  if (!messageInput || !messagesContainer || !activeConversation) {
    console.error('Required elements not found');
    return;
  }
  
  const messageText = messageInput.value.trim();
  
  if (messageText === '') {
    return;
  }
  
  // Create and add the new message
  const messageElement = document.createElement('div');
  messageElement.classList.add('message-bubble', 'sent');
  
  const timestamp = new Date();
  
  messageElement.innerHTML = `
    <div class="message-content">${messageText}</div>
    <div class="message-time">${formatMessageTime(timestamp)}</div>
    <div class="message-status">Envoyé</div>
  `;
  
  messagesContainer.appendChild(messageElement);
  
  // Clear input and disable send button
  messageInput.value = '';
  sendButton.disabled = true;
  
  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate reply after a delay
  setTimeout(() => {
    simulateTypingIndicator(true);
    
    setTimeout(() => {
      simulateTypingIndicator(false);
      simulateReply();
    }, 2500);
  }, 1000);
  
  // Update the conversation preview in the list
  updateConversationPreview(activeConversation.dataset.conversationId, {
    sender: 'Vous',
    text: messageText,
    timestamp: timestamp.toISOString(),
    isRead: false
  });
}

/**
 * Simulate a typing indicator
 * @param {boolean} isTyping - Whether to show or hide the typing indicator
 */
function simulateTypingIndicator(isTyping) {
  const messagesContainer = document.querySelector('.messages-container');
  
  if (!messagesContainer) {
    return;
  }
  
  // Remove existing typing indicator
  const existingIndicator = messagesContainer.querySelector('.typing-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }
  
  if (!isTyping) {
    return;
  }
  
  // Create and add typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  
  typingIndicator.innerHTML = `
    <div class="typing-dots">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  
  messagesContainer.appendChild(typingIndicator);
  
  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Simulate a reply message
 */
function simulateReply() {
  const messagesContainer = document.querySelector('.messages-container');
  const activeConversation = document.querySelector('.conversation-item.active');
  
  if (!messagesContainer || !activeConversation) {
    return;
  }
  
  // Get active conversation name
  const conversationName = document.querySelector('.conversation-name').textContent;
  
  // Create reply based on conversation type
  let replyText = 'Merci pour votre message. Nous allons traiter votre demande.';
  
  if (conversationName.includes('Support')) {
    replyText = 'Merci pour votre message. Un conseiller va étudier votre demande et vous répondre dans les meilleurs délais.';
  } else if (conversationName.includes('certificat')) {
    replyText = 'Votre demande concernant le certificat a bien été prise en compte. Nous vous tiendrons informé de son avancement.';
  } else if (conversationName.includes('comptabilité')) {
    replyText = 'Merci pour votre message. Le service comptabilité traitera votre demande sous 24h ouvrées.';
  } else if (conversationName.includes('Douanes')) {
    replyText = 'Votre message a été transmis à l\'agent en charge de votre dossier. Vous recevrez une réponse détaillée prochainement.';
  }
  
  // Create and add the reply message
  const messageElement = document.createElement('div');
  messageElement.classList.add('message-bubble', 'received');
  
  const timestamp = new Date();
  
  messageElement.innerHTML = `
    <div class="message-content">${replyText}</div>
    <div class="message-time">${formatMessageTime(timestamp)}</div>
  `;
  
  messagesContainer.appendChild(messageElement);
  
  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Update the conversation preview in the list
  updateConversationPreview(activeConversation.dataset.conversationId, {
    sender: conversationName,
    text: replyText,
    timestamp: timestamp.toISOString(),
    isRead: true
  });
}

/**
 * Update the conversation preview in the sidebar
 * @param {string} conversationId - ID of the conversation to update
 * @param {Object} lastMessage - The last message object
 */
function updateConversationPreview(conversationId, lastMessage) {
  const conversationItem = document.querySelector(`.conversation-item[data-conversation-id="${conversationId}"]`);
  
  if (!conversationItem) {
    return;
  }
  
  const previewElement = conversationItem.querySelector('.conversation-preview');
  const timeElement = conversationItem.querySelector('.conversation-time');
  
  if (previewElement) {
    previewElement.textContent = (lastMessage.sender !== 'Vous' ? 
      `${lastMessage.sender}: ` : '') + 
      lastMessage.text.substring(0, 50) + 
      (lastMessage.text.length > 50 ? '...' : '') +
      (lastMessage.hasAttachments ? ' 📎' : '');
  }
  
  if (timeElement) {
    timeElement.textContent = formatTimeAgo(new Date(lastMessage.timestamp));
  }
  
  // Move the updated conversation to the top of the list
  const conversationsList = document.querySelector('.conversations-list');
  if (conversationsList && conversationItem) {
    conversationsList.prepend(conversationItem);
  }
}

/**
 * Set up event listeners for various UI elements
 */
function setupEventListeners() {
  // Attachment button functionality
  const attachBtns = document.querySelectorAll('.attach-btn, .attach-file-btn');
  attachBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Fonctionnalité d\'attachement de fichier simulée dans cette démo.');
    });
  });
  
  // Emoji button functionality
  const emojiBtn = document.querySelector('.emoji-btn');
  if (emojiBtn) {
    emojiBtn.addEventListener('click', () => {
      const messageInput = document.querySelector('.message-input');
      if (messageInput) {
        messageInput.value += ' 😊';
        messageInput.dispatchEvent(new Event('input'));
        messageInput.focus();
      }
    });
  }
  
  // Details sidebar toggle
  const optionsBtn = document.querySelector('.options-btn');
  const closeDetailsBtn = document.querySelector('.close-details-btn');
  const detailsSidebar = document.querySelector('.details-sidebar');
  
  if (optionsBtn && detailsSidebar) {
    optionsBtn.addEventListener('click', () => {
      detailsSidebar.classList.toggle('open');
    });
  }
  
  if (closeDetailsBtn && detailsSidebar) {
    closeDetailsBtn.addEventListener('click', () => {
      detailsSidebar.classList.remove('open');
    });
  }
  
  // New message button functionality
  const newMessageBtn = document.querySelector('.messaging-action-btn.primary');
  if (newMessageBtn) {
    newMessageBtn.addEventListener('click', () => {
      alert('Fonctionnalité de création de nouveau message simulée dans cette démo.');
    });
  }
  
  // Search functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const searchText = event.target.value.toLowerCase();
      const conversationItems = document.querySelectorAll('.conversation-item');
      
      conversationItems.forEach(item => {
        const conversationTitle = item.querySelector('.conversation-title').textContent.toLowerCase();
        const conversationPreview = item.querySelector('.conversation-preview').textContent.toLowerCase();
        
        if (conversationTitle.includes(searchText) || conversationPreview.includes(searchText)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/**
 * Show an error message in the container
 * @param {string} message - The error message to display
 */
function showErrorMessage(message) {
  const container = document.querySelector('.messaging-demo-container');
  
  if (!container) {
    console.error('Container not found for error message');
    return;
  }
  
  container.innerHTML = `
    <div class="error-message">
      <div class="error-icon">⚠️</div>
      <div class="error-text">${message}</div>
      <button class="error-retry-btn">Réessayer</button>
    </div>
  `;
  
  // Add retry button functionality
  const retryBtn = container.querySelector('.error-retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      initMessagingDemo();
    });
  }
}

/**
 * Format a date to a relative time string (e.g., "2 hours ago")
 * @param {Date} date - The date to format
 * @returns {string} Formatted relative time
 */
function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  
  if (diffSec < 60) {
    return 'à l\'instant';
  } else if (diffMin < 60) {
    return `il y a ${diffMin} min`;
  } else if (diffHour < 24) {
    return `il y a ${diffHour}h`;
  } else if (diffDay === 1) {
    return 'hier';
  } else if (diffDay < 7) {
    return `il y a ${diffDay}j`;
  } else {
    return formatDate(date);
  }
}

/**
 * Format a date for message timestamps
 * @param {Date} date - The date to format
 * @returns {string} Formatted time string
 */
function formatMessageTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Format a date to a standard date string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Get an icon for a file type
 * @param {string} fileType - The file type
 * @returns {string} HTML icon representation
 */
function getFileIcon(fileType) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return '📄';
    case 'docx':
    case 'doc':
      return '📝';
    case 'xlsx':
    case 'xls':
      return '📊';
    case 'pptx':
    case 'ppt':
      return '📋';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return '🖼️';
    case 'zip':
    case 'rar':
      return '🗜️';
    default:
      return '📁';
  }
} 