/**
 * certificat-demo.js
 * Script gérant les interactions avec le workflow des certificats pour la démo
 */

let certificatData = {
  templates: [],
  certificats: [],
  etapes: [],
  statuts: []
};

/**
 * Initialise l'interface du workflow des certificats avec les données de démonstration
 */
async function initializeCertificatWorkflow() {
  try {
    // Chargement des données de démonstration
    await fetchCertificatData();
    
    // Initialisation de l'interface
    initializeInterface();
    
    // Affichage initial des certificats
    displayCertificats();
    
    // Affichage des modèles disponibles
    displayTemplates();
    
    // Initialisation du formulaire de création
    initializeCreationForm();
  } catch (error) {
    console.error("Erreur lors de l'initialisation du workflow des certificats:", error);
    displayErrorMessage("Impossible de charger les données du workflow des certificats.");
  }
}

/**
 * Récupère les données des certificats depuis le fichier JSON
 */
async function fetchCertificatData() {
  try {
    const response = await fetch('../demo-assets/data/certificat-workflow.json');
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    certificatData = await response.json();
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    throw error;
  }
}

/**
 * Initialise l'interface utilisateur pour le workflow des certificats
 */
function initializeInterface() {
  // Gestionnaire pour les onglets
  const tabs = document.querySelectorAll('.certificat-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (event) => {
      // Supprimer la classe active de tous les onglets
      tabs.forEach(t => t.classList.remove('active'));
      
      // Ajouter la classe active à l'onglet cliqué
      event.currentTarget.classList.add('active');
      
      // Afficher le contenu correspondant
      const tabContent = event.currentTarget.dataset.content;
      showTabContent(tabContent);
    });
  });
  
  // Gestionnaire pour le bouton de création de certificat
  const createButton = document.getElementById('create-certificat-btn');
  if (createButton) {
    createButton.addEventListener('click', () => {
      showTabContent('create-certificat');
    });
  }
  
  // Gestionnaire pour les boutons d'action sur les certificats
  document.addEventListener('click', (event) => {
    // Gérer les actions de validation
    if (event.target.classList.contains('validate-btn')) {
      const certificatId = event.target.closest('.certificat-card').dataset.id;
      validateCertificat(certificatId);
    }
    
    // Gérer les actions de refus
    if (event.target.classList.contains('reject-btn')) {
      const certificatId = event.target.closest('.certificat-card').dataset.id;
      rejectCertificat(certificatId);
    }
    
    // Gérer les actions de visualisation
    if (event.target.classList.contains('view-btn') || event.target.closest('.view-btn')) {
      const certificatId = event.target.closest('.certificat-card').dataset.id;
      viewCertificat(certificatId);
    }
  });
  
  // Initialiser le formulaire de soumission
  const submitFormButton = document.getElementById('submit-certificat-form');
  if (submitFormButton) {
    submitFormButton.addEventListener('click', (event) => {
      event.preventDefault();
      submitCertificatForm();
    });
  }
}

/**
 * Affiche le contenu correspondant à l'onglet sélectionné
 */
function showTabContent(contentId) {
  // Masquer tous les contenus
  const allContents = document.querySelectorAll('.certificat-content');
  allContents.forEach(content => {
    content.style.display = 'none';
  });
  
  // Afficher le contenu sélectionné
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = 'block';
  }
}

/**
 * Affiche la liste des certificats
 */
function displayCertificats() {
  const pendingContainer = document.getElementById('pending-certificats');
  const validatedContainer = document.getElementById('validated-certificats');
  const rejectedContainer = document.getElementById('rejected-certificats');
  
  if (!pendingContainer || !validatedContainer || !rejectedContainer) return;
  
  // Vider les conteneurs
  pendingContainer.innerHTML = '';
  validatedContainer.innerHTML = '';
  rejectedContainer.innerHTML = '';
  
  // Trier les certificats par date (plus récents en premier)
  const sortedCertificats = [...certificatData.certificats].sort((a, b) => {
    return new Date(b.dateCreation) - new Date(a.dateCreation);
  });
  
  // Afficher les certificats dans les conteneurs appropriés
  sortedCertificats.forEach(certificat => {
    const card = createCertificatCard(certificat);
    
    switch (certificat.statut) {
      case 'en_attente':
        pendingContainer.appendChild(card);
        break;
      case 'valide':
        validatedContainer.appendChild(card);
        break;
      case 'rejete':
        rejectedContainer.appendChild(card);
        break;
    }
  });
  
  // Afficher un message si aucun certificat dans une catégorie
  if (pendingContainer.children.length === 0) {
    pendingContainer.innerHTML = '<div class="empty-state">Aucun certificat en attente de validation</div>';
  }
  
  if (validatedContainer.children.length === 0) {
    validatedContainer.innerHTML = '<div class="empty-state">Aucun certificat validé</div>';
  }
  
  if (rejectedContainer.children.length === 0) {
    rejectedContainer.innerHTML = '<div class="empty-state">Aucun certificat rejeté</div>';
  }
  
  // Mettre à jour les compteurs
  updateCertificatCounts();
}

/**
 * Crée une carte pour afficher un certificat
 */
function createCertificatCard(certificat) {
  const card = document.createElement('div');
  card.className = 'certificat-card';
  card.dataset.id = certificat.id;
  
  // Trouver le modèle correspondant
  const template = certificatData.templates.find(t => t.id === certificat.templateId);
  const templateName = template ? template.nom : 'Modèle inconnu';
  
  // Déterminer les actions disponibles selon le statut
  let actionsHtml = '';
  
  if (certificat.statut === 'en_attente') {
    actionsHtml = `
      <button class="validate-btn" title="Valider"><i class="icon-check"></i></button>
      <button class="reject-btn" title="Rejeter"><i class="icon-close"></i></button>
    `;
  }
  
  // Mettre en forme la date
  const date = new Date(certificat.dateCreation);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  // Badge de statut
  let statusBadge = '';
  let statusClass = '';
  
  switch (certificat.statut) {
    case 'en_attente':
      statusBadge = '<span class="status-badge pending">En attente</span>';
      statusClass = 'pending';
      break;
    case 'valide':
      statusBadge = '<span class="status-badge validated">Validé</span>';
      statusClass = 'validated';
      break;
    case 'rejete':
      statusBadge = '<span class="status-badge rejected">Rejeté</span>';
      statusClass = 'rejected';
      break;
  }
  
  // HTML de la carte
  card.innerHTML = `
    <div class="certificat-header ${statusClass}">
      <h3 class="certificat-title">${certificat.titre}</h3>
      ${statusBadge}
    </div>
    <div class="certificat-content">
      <div class="certificat-info">
        <div class="info-row"><span class="info-label">Type:</span> ${templateName}</div>
        <div class="info-row"><span class="info-label">Demandeur:</span> ${certificat.demandeur}</div>
        <div class="info-row"><span class="info-label">Date:</span> ${formattedDate}</div>
        <div class="info-row"><span class="info-label">Référence:</span> ${certificat.reference}</div>
      </div>
      <div class="certificat-actions">
        <button class="view-btn" title="Voir le détail"><i class="icon-eye"></i></button>
        ${actionsHtml}
      </div>
    </div>
  `;
  
  return card;
}

/**
 * Met à jour les compteurs de certificats
 */
function updateCertificatCounts() {
  // Compter les certificats par statut
  const pendingCount = certificatData.certificats.filter(c => c.statut === 'en_attente').length;
  const validatedCount = certificatData.certificats.filter(c => c.statut === 'valide').length;
  const rejectedCount = certificatData.certificats.filter(c => c.statut === 'rejete').length;
  
  // Mettre à jour les compteurs dans l'interface
  const pendingBadge = document.querySelector('.certificat-tab[data-content="pending-certificats"] .count-badge');
  const validatedBadge = document.querySelector('.certificat-tab[data-content="validated-certificats"] .count-badge');
  const rejectedBadge = document.querySelector('.certificat-tab[data-content="rejected-certificats"] .count-badge');
  
  if (pendingBadge) pendingBadge.textContent = pendingCount;
  if (validatedBadge) validatedBadge.textContent = validatedCount;
  if (rejectedBadge) rejectedBadge.textContent = rejectedCount;
}

/**
 * Affiche les modèles de certificats disponibles
 */
function displayTemplates() {
  const templatesContainer = document.getElementById('certificat-templates');
  if (!templatesContainer) return;
  
  // Vider le conteneur
  templatesContainer.innerHTML = '';
  
  // Afficher chaque modèle
  certificatData.templates.forEach(template => {
    const templateCard = document.createElement('div');
    templateCard.className = 'template-card';
    templateCard.dataset.id = template.id;
    
    templateCard.innerHTML = `
      <div class="template-header">
        <h3 class="template-title">${template.nom}</h3>
      </div>
      <div class="template-content">
        <p class="template-description">${template.description}</p>
        <div class="template-fields">
          <strong>Champs requis:</strong>
          <ul>
            ${template.champs.map(champ => `<li>${champ.label}</li>`).join('')}
          </ul>
        </div>
        <button class="select-template-btn" data-id="${template.id}">Utiliser ce modèle</button>
      </div>
    `;
    
    templatesContainer.appendChild(templateCard);
  });
  
  // Ajouter les gestionnaires d'événements pour les boutons de sélection
  document.querySelectorAll('.select-template-btn').forEach(button => {
    button.addEventListener('click', () => {
      const templateId = button.dataset.id;
      selectTemplate(templateId);
    });
  });
}

/**
 * Sélectionne un modèle pour créer un nouveau certificat
 */
function selectTemplate(templateId) {
  // Rechercher le modèle sélectionné
  const selectedTemplate = certificatData.templates.find(t => t.id === templateId);
  if (!selectedTemplate) return;
  
  // Afficher le formulaire de création
  showTabContent('create-certificat-form');
  
  // Mettre à jour le titre du formulaire
  const formTitle = document.getElementById('form-title');
  if (formTitle) {
    formTitle.textContent = `Nouveau certificat - ${selectedTemplate.nom}`;
  }
  
  // Générer les champs du formulaire
  generateFormFields(selectedTemplate);
  
  // Stocker l'ID du modèle dans un champ caché
  const templateIdField = document.getElementById('template-id');
  if (templateIdField) {
    templateIdField.value = templateId;
  }
}

/**
 * Génère les champs du formulaire en fonction du modèle sélectionné
 */
function generateFormFields(template) {
  const formFieldsContainer = document.getElementById('certificat-form-fields');
  if (!formFieldsContainer) return;
  
  // Vider le conteneur
  formFieldsContainer.innerHTML = '';
  
  // Générer les champs
  template.champs.forEach(champ => {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-field';
    
    let fieldHtml = '';
    
    switch (champ.type) {
      case 'text':
        fieldHtml = `
          <label for="${champ.id}">${champ.label}${champ.obligatoire ? ' *' : ''}</label>
          <input type="text" id="${champ.id}" name="${champ.id}" ${champ.obligatoire ? 'required' : ''}>
        `;
        break;
      case 'date':
        fieldHtml = `
          <label for="${champ.id}">${champ.label}${champ.obligatoire ? ' *' : ''}</label>
          <input type="date" id="${champ.id}" name="${champ.id}" ${champ.obligatoire ? 'required' : ''}>
        `;
        break;
      case 'select':
        fieldHtml = `
          <label for="${champ.id}">${champ.label}${champ.obligatoire ? ' *' : ''}</label>
          <select id="${champ.id}" name="${champ.id}" ${champ.obligatoire ? 'required' : ''}>
            <option value="">Sélectionnez une option</option>
            ${champ.options?.map(option => `<option value="${option.value}">${option.label}</option>`).join('') || ''}
          </select>
        `;
        break;
      case 'textarea':
        fieldHtml = `
          <label for="${champ.id}">${champ.label}${champ.obligatoire ? ' *' : ''}</label>
          <textarea id="${champ.id}" name="${champ.id}" rows="4" ${champ.obligatoire ? 'required' : ''}></textarea>
        `;
        break;
      case 'file':
        fieldHtml = `
          <label for="${champ.id}">${champ.label}${champ.obligatoire ? ' *' : ''}</label>
          <div class="file-upload">
            <input type="file" id="${champ.id}" name="${champ.id}" ${champ.obligatoire ? 'required' : ''}>
            <button type="button" class="file-upload-btn">Sélectionner un fichier</button>
            <span class="file-name">Aucun fichier sélectionné</span>
          </div>
        `;
        break;
    }
    
    fieldContainer.innerHTML = fieldHtml;
    formFieldsContainer.appendChild(fieldContainer);
  });
  
  // Ajouter des gestionnaires pour les boutons de téléchargement de fichiers
  document.querySelectorAll('.file-upload-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const fileInput = event.target.closest('.file-upload').querySelector('input[type="file"]');
      fileInput.click();
    });
  });
  
  // Ajouter des gestionnaires pour les événements de changement de fichier
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', (event) => {
      const fileName = event.target.files.length > 0 ? event.target.files[0].name : 'Aucun fichier sélectionné';
      const fileNameSpan = event.target.closest('.file-upload').querySelector('.file-name');
      fileNameSpan.textContent = fileName;
    });
  });
}

/**
 * Initialise le formulaire de création de certificat
 */
function initializeCreationForm() {
  // Gestionnaire pour le bouton de retour
  const backButton = document.getElementById('back-to-templates');
  if (backButton) {
    backButton.addEventListener('click', () => {
      showTabContent('create-certificat');
    });
  }
  
  // Gestionnaire pour le bouton d'annulation
  const cancelButton = document.getElementById('cancel-certificat-form');
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      showTabContent('pending-certificats');
    });
  }
}

/**
 * Soumet le formulaire de création de certificat
 */
function submitCertificatForm() {
  // Récupérer l'ID du modèle
  const templateId = document.getElementById('template-id').value;
  
  // Vérifier si le formulaire est valide
  const form = document.getElementById('certificat-form');
  if (!form.checkValidity()) {
    // Afficher les erreurs de validation
    form.reportValidity();
    return;
  }
  
  // Simuler la création d'un nouveau certificat
  const newCertificat = {
    id: `cert-${Date.now()}`,
    templateId: templateId,
    titre: document.getElementById('titre') ? document.getElementById('titre').value : 'Nouveau certificat',
    demandeur: document.getElementById('demandeur') ? document.getElementById('demandeur').value : 'Utilisateur actuel',
    dateCreation: new Date().toISOString(),
    reference: `REF-${Math.floor(Math.random() * 10000)}`,
    statut: 'en_attente',
    donnees: {}
  };
  
  // Récupérer les données du formulaire
  const template = certificatData.templates.find(t => t.id === templateId);
  if (template) {
    template.champs.forEach(champ => {
      const field = document.getElementById(champ.id);
      if (field) {
        if (champ.type === 'file') {
          // Pour les fichiers, stocker uniquement le nom
          newCertificat.donnees[champ.id] = field.files.length > 0 ? field.files[0].name : '';
        } else {
          newCertificat.donnees[champ.id] = field.value;
        }
      }
    });
  }
  
  // Ajouter le nouveau certificat aux données
  certificatData.certificats.push(newCertificat);
  
  // Mettre à jour l'affichage
  displayCertificats();
  
  // Afficher un message de succès
  displaySuccessMessage("Le certificat a été créé avec succès et est en attente de validation.");
  
  // Afficher l'onglet des certificats en attente
  showTabContent('pending-certificats');
  
  // Activer l'onglet correspondant
  document.querySelector('.certificat-tab[data-content="pending-certificats"]').classList.add('active');
  document.querySelectorAll('.certificat-tab:not([data-content="pending-certificats"])').forEach(tab => {
    tab.classList.remove('active');
  });
}

/**
 * Valide un certificat
 */
function validateCertificat(certificatId) {
  // Rechercher le certificat
  const certificat = certificatData.certificats.find(c => c.id === certificatId);
  if (!certificat) return;
  
  // Mettre à jour le statut
  certificat.statut = 'valide';
  certificat.dateValidation = new Date().toISOString();
  certificat.validePar = 'Utilisateur actuel';
  
  // Mettre à jour l'affichage
  displayCertificats();
  
  // Afficher un message de succès
  displaySuccessMessage("Le certificat a été validé avec succès.");
}

/**
 * Rejette un certificat
 */
function rejectCertificat(certificatId) {
  // Afficher la boîte de dialogue de motif de rejet
  showRejectDialog(certificatId);
}

/**
 * Affiche la boîte de dialogue pour rejeter un certificat
 */
function showRejectDialog(certificatId) {
  // Créer la boîte de dialogue
  const dialog = document.createElement('div');
  dialog.className = 'modal reject-dialog';
  dialog.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Motif de rejet</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Veuillez indiquer le motif de rejet de ce certificat :</p>
        <textarea id="reject-reason" rows="4" placeholder="Saisissez le motif de rejet..."></textarea>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn">Annuler</button>
        <button class="confirm-reject-btn">Confirmer le rejet</button>
      </div>
    </div>
  `;
  
  // Ajouter la boîte de dialogue au document
  document.body.appendChild(dialog);
  
  // Afficher la boîte de dialogue
  setTimeout(() => {
    dialog.classList.add('show');
  }, 10);
  
  // Gestionnaire pour le bouton de fermeture
  dialog.querySelector('.close-modal').addEventListener('click', () => {
    closeRejectDialog(dialog);
  });
  
  // Gestionnaire pour le bouton d'annulation
  dialog.querySelector('.cancel-btn').addEventListener('click', () => {
    closeRejectDialog(dialog);
  });
  
  // Gestionnaire pour le bouton de confirmation
  dialog.querySelector('.confirm-reject-btn').addEventListener('click', () => {
    const reason = dialog.querySelector('#reject-reason').value.trim();
    if (reason === '') {
      alert('Veuillez saisir un motif de rejet.');
      return;
    }
    
    // Procéder au rejet
    confirmRejectCertificat(certificatId, reason);
    closeRejectDialog(dialog);
  });
}

/**
 * Ferme la boîte de dialogue de rejet
 */
function closeRejectDialog(dialog) {
  dialog.classList.remove('show');
  setTimeout(() => {
    dialog.remove();
  }, 300);
}

/**
 * Confirme le rejet d'un certificat avec un motif
 */
function confirmRejectCertificat(certificatId, reason) {
  // Rechercher le certificat
  const certificat = certificatData.certificats.find(c => c.id === certificatId);
  if (!certificat) return;
  
  // Mettre à jour le statut
  certificat.statut = 'rejete';
  certificat.dateRejet = new Date().toISOString();
  certificat.rejetePar = 'Utilisateur actuel';
  certificat.motifRejet = reason;
  
  // Mettre à jour l'affichage
  displayCertificats();
  
  // Afficher un message de succès
  displaySuccessMessage("Le certificat a été rejeté.");
}

/**
 * Affiche le détail d'un certificat
 */
function viewCertificat(certificatId) {
  // Rechercher le certificat
  const certificat = certificatData.certificats.find(c => c.id === certificatId);
  if (!certificat) return;
  
  // Rechercher le modèle correspondant
  const template = certificatData.templates.find(t => t.id === certificat.templateId);
  
  // Créer la boîte de dialogue
  const dialog = document.createElement('div');
  dialog.className = 'modal certificat-detail-dialog';
  
  // Déterminer les informations supplémentaires selon le statut
  let additionalInfo = '';
  
  if (certificat.statut === 'valide') {
    const validationDate = new Date(certificat.dateValidation);
    const formattedValidationDate = validationDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    additionalInfo = `
      <div class="info-section validation-info">
        <h4>Informations de validation</h4>
        <div class="info-row"><span class="info-label">Validé par:</span> ${certificat.validePar}</div>
        <div class="info-row"><span class="info-label">Date de validation:</span> ${formattedValidationDate}</div>
      </div>
    `;
  } else if (certificat.statut === 'rejete') {
    const rejectionDate = new Date(certificat.dateRejet);
    const formattedRejectionDate = rejectionDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    additionalInfo = `
      <div class="info-section rejection-info">
        <h4>Informations de rejet</h4>
        <div class="info-row"><span class="info-label">Rejeté par:</span> ${certificat.rejetePar}</div>
        <div class="info-row"><span class="info-label">Date de rejet:</span> ${formattedRejectionDate}</div>
        <div class="info-row"><span class="info-label">Motif:</span> ${certificat.motifRejet}</div>
      </div>
    `;
  }
  
  // Générer le HTML pour les données du certificat
  let dataHtml = '';
  
  if (certificat.donnees && template) {
    dataHtml = '<div class="certificat-data">';
    
    template.champs.forEach(champ => {
      const value = certificat.donnees[champ.id] || '-';
      let displayValue = value;
      
      // Formater l'affichage selon le type de champ
      if (champ.type === 'date' && value !== '-') {
        const date = new Date(value);
        displayValue = date.toLocaleDateString('fr-FR');
      } else if (champ.type === 'file' && value !== '-') {
        displayValue = `<a href="#" class="file-link">${value}</a>`;
      }
      
      dataHtml += `
        <div class="data-row">
          <span class="data-label">${champ.label}:</span>
          <span class="data-value">${displayValue}</span>
        </div>
      `;
    });
    
    dataHtml += '</div>';
  }
  
  // Déterminer le badge de statut
  let statusBadge = '';
  switch (certificat.statut) {
    case 'en_attente':
      statusBadge = '<span class="status-badge pending">En attente</span>';
      break;
    case 'valide':
      statusBadge = '<span class="status-badge validated">Validé</span>';
      break;
    case 'rejete':
      statusBadge = '<span class="status-badge rejected">Rejeté</span>';
      break;
  }
  
  // Créer la date formatée
  const creationDate = new Date(certificat.dateCreation);
  const formattedCreationDate = creationDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // HTML de la boîte de dialogue
  dialog.innerHTML = `
    <div class="modal-content certificat-detail">
      <div class="modal-header">
        <h3>${certificat.titre}</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="certificat-header-info">
          ${statusBadge}
          <span class="certificat-ref">Réf: ${certificat.reference}</span>
        </div>
        
        <div class="info-section basic-info">
          <h4>Informations générales</h4>
          <div class="info-row"><span class="info-label">Type:</span> ${template ? template.nom : 'Inconnu'}</div>
          <div class="info-row"><span class="info-label">Demandeur:</span> ${certificat.demandeur}</div>
          <div class="info-row"><span class="info-label">Date de création:</span> ${formattedCreationDate}</div>
        </div>
        
        ${additionalInfo}
        
        <div class="info-section certificat-data-section">
          <h4>Données du certificat</h4>
          ${dataHtml}
        </div>
      </div>
      <div class="modal-footer">
        <button class="close-detail-btn">Fermer</button>
        ${certificat.statut === 'en_attente' ? `
          <button class="reject-in-detail-btn">Rejeter</button>
          <button class="validate-in-detail-btn">Valider</button>
        ` : ''}
        ${certificat.statut === 'valide' ? `
          <button class="download-certificat-btn">Télécharger</button>
        ` : ''}
      </div>
    </div>
  `;
  
  // Ajouter la boîte de dialogue au document
  document.body.appendChild(dialog);
  
  // Afficher la boîte de dialogue
  setTimeout(() => {
    dialog.classList.add('show');
  }, 10);
  
  // Gestionnaire pour le bouton de fermeture
  dialog.querySelector('.close-modal').addEventListener('click', () => {
    closeDetailDialog(dialog);
  });
  
  // Gestionnaire pour le bouton de fermeture en bas
  dialog.querySelector('.close-detail-btn').addEventListener('click', () => {
    closeDetailDialog(dialog);
  });
  
  // Gestionnaires pour les boutons d'action (si présents)
  const validateBtn = dialog.querySelector('.validate-in-detail-btn');
  if (validateBtn) {
    validateBtn.addEventListener('click', () => {
      validateCertificat(certificatId);
      closeDetailDialog(dialog);
    });
  }
  
  const rejectBtn = dialog.querySelector('.reject-in-detail-btn');
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      closeDetailDialog(dialog);
      showRejectDialog(certificatId);
    });
  }
  
  const downloadBtn = dialog.querySelector('.download-certificat-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      simulateDownload(certificat);
    });
  }
}

/**
 * Ferme la boîte de dialogue de détail
 */
function closeDetailDialog(dialog) {
  dialog.classList.remove('show');
  setTimeout(() => {
    dialog.remove();
  }, 300);
}

/**
 * Simule le téléchargement d'un certificat
 */
function simulateDownload(certificat) {
  // Afficher un message indiquant que le téléchargement a commencé
  displayInfoMessage("Téléchargement du certificat en cours...");
  
  // Simuler un délai pour le téléchargement
  setTimeout(() => {
    displaySuccessMessage("Le certificat a été téléchargé avec succès.");
  }, 1500);
}

/**
 * Affiche un message de succès
 */
function displaySuccessMessage(message) {
  displayNotification(message, 'success');
}

/**
 * Affiche un message d'erreur
 */
function displayErrorMessage(message) {
  displayNotification(message, 'error');
}

/**
 * Affiche un message d'information
 */
function displayInfoMessage(message) {
  displayNotification(message, 'info');
}

/**
 * Affiche une notification
 */
function displayNotification(message, type) {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Icône selon le type
  let icon = '';
  switch (type) {
    case 'success':
      icon = '<i class="icon-check-circle"></i>';
      break;
    case 'error':
      icon = '<i class="icon-alert-circle"></i>';
      break;
    case 'info':
      icon = '<i class="icon-info"></i>';
      break;
  }
  
  // HTML de la notification
  notification.innerHTML = `
    <div class="notification-content">
      ${icon}
      <p>${message}</p>
    </div>
    <button class="close-notification">&times;</button>
  `;
  
  // Ajouter au conteneur de notifications ou au document
  const notificationsContainer = document.getElementById('notifications-container');
  if (notificationsContainer) {
    notificationsContainer.appendChild(notification);
  } else {
    // Créer un conteneur s'il n'existe pas
    const container = document.createElement('div');
    container.id = 'notifications-container';
    container.appendChild(notification);
    document.body.appendChild(container);
  }
  
  // Gestionnaire pour le bouton de fermeture
  notification.querySelector('.close-notification').addEventListener('click', () => {
    notification.classList.add('hiding');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });
  
  // Afficher la notification avec animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Masquer automatiquement après un délai
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add('hiding');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Initialiser le workflow des certificats au chargement du document
document.addEventListener('DOMContentLoaded', initializeCertificatWorkflow); 