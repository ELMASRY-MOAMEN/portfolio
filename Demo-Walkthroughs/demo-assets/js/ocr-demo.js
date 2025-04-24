/**
 * OCR Demo - Interactions simulées
 * Script pour la maquette OCR et extraction intelligente
 */

// État initial de la démo
let demoState = {
  documentLoaded: false,
  processingStarted: false,
  processingComplete: false,
  currentStep: 'upload', // upload, ocr_analysis, data_extraction, data_validation, export
  progressPercentage: 0,
  selectedDocument: null,
  exportFormat: 'excel',
  highlightedField: null,
  correctedFields: []
};

// Constantes
const PROCESSING_DURATION = 5000; // 5 secondes pour la démo
const HIGHLIGHT_DURATION = 1500; // 1.5 secondes pour le highlight

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  loadOcrDemo();
});

/**
 * Initialise la démo OCR
 */
function loadOcrDemo() {
  // Charger les données
  fetch('../demo-assets/data/ocr-documents.json')
    .then(response => response.json())
    .then(data => {
      window.ocrDemoData = data;
      setupOcrUI();
      setupEventListeners();
    })
    .catch(error => {
      console.error('Erreur lors du chargement des données OCR:', error);
      // Fallback en cas d'erreur
      document.querySelector('.document-uploader').innerHTML = 
        '<div class="error-message">Erreur de chargement des données</div>';
    });
}

/**
 * Configure l'interface utilisateur OCR
 */
function setupOcrUI() {
  // Transformer le conteneur OCR simple en version améliorée
  const ocrPanel = document.querySelector('.demo-panel:has(.ocr-header)');
  if (!ocrPanel) return;
  
  ocrPanel.classList.add('ocr-panel');
  
  // Créer la structure HTML améliorée
  ocrPanel.innerHTML = `
    <div class="panel-header">
      <h3>OCR et Extraction Intelligente</h3>
      <button id="tour-ocr-trigger" class="tour-trigger">Démarrer la visite</button>
    </div>
    <div class="panel-content">
      <div class="ocr-container">
        <div class="ocr-header">
          <div class="title">OCR et Extraction de Documents</div>
          <div class="actions">
            <select class="document-type-selector">
              <option value="">Tous les types</option>
              ${window.ocrDemoData.documentTypes.map(type => 
                `<option value="${type.id}">${type.name}</option>`).join('')}
            </select>
          </div>
        </div>
        
        <div class="document-uploader">
          <div class="uploader-icon">📄</div>
          <div class="uploader-text">Déposez votre document ici</div>
          <div class="uploader-subtext">Format PDF, PNG ou JPG - 10MB max</div>
          <button class="uploader-button">Parcourir les fichiers</button>
        </div>
        
        <div class="ocr-progress" style="display: none;">
          <div class="progress-title">
            <span class="spinner"></span>
            <span class="processing-text">Traitement en cours...</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: 0%"></div>
          </div>
          <div class="progress-status">
            <span class="current-step">Initialisation...</span>
            <span class="percentage">0%</span>
          </div>
          <div class="progress-steps">
            ${window.ocrDemoData.processingSteps.map(step => 
              `<div class="progress-step" data-step="${step.id}">
                <div class="step-icon">${step.position}</div>
                <div class="step-label">${step.name}</div>
              </div>`).join('')}
          </div>
        </div>
        
        <div class="extraction-preview" style="display: none;">
          <div class="document-view">
            <img class="document-image" src="" alt="Aperçu du document" />
          </div>
          <div class="extracted-data">
            <div class="extraction-header">
              <h4>Données extraites</h4>
              <div class="confidence-score">
                <span class="score-label">Score de confiance:</span>
                <span class="score-value">--</span>
              </div>
            </div>
            <div class="data-fields"></div>
          </div>
        </div>
        
        <div class="correction-interface" style="display: none;">
          <div class="correction-title">Vérification et correction</div>
          <div class="correction-form"></div>
        </div>
        
        <div class="export-options" style="display: none;">
          <div class="export-title">Exportation des données</div>
          <div class="export-formats">
            ${window.ocrDemoData.exportFormats.map(format => 
              `<div class="export-format${format.isDefault ? ' selected' : ''}" data-format="${format.id}">
                <div class="format-icon">${format.icon}</div>
                <div class="format-name">${format.name}</div>
              </div>`).join('')}
          </div>
          <div class="export-actions">
            <button class="footer-button secondary">Annuler</button>
            <button class="footer-button primary">Exporter</button>
          </div>
        </div>
        
        <div class="ocr-footer">
          <div class="processed-info">0 documents traités aujourd'hui</div>
          <div class="footer-actions">
            <button class="footer-button secondary" id="ocr-cancel-btn" style="display: none;">Annuler</button>
            <button class="footer-button primary" id="ocr-action-btn">Importer un document</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Mettre à jour les infos statistiques
  const stats = window.ocrDemoData.statistics;
  document.querySelector('.processed-info').textContent = 
    `${stats.documentsProcessed} documents traités - Précision moyenne: ${stats.averageAccuracy * 100}%`;
}

/**
 * Configure les écouteurs d'événements
 */
function setupEventListeners() {
  // Zone d'upload
  const uploader = document.querySelector('.document-uploader');
  if (uploader) {
    uploader.addEventListener('click', simulateFileSelection);
    uploader.addEventListener('dragover', handleDragOver);
    uploader.addEventListener('dragleave', handleDragLeave);
    uploader.addEventListener('drop', handleDrop);
  }
  
  // Bouton d'action principal
  const actionButton = document.getElementById('ocr-action-btn');
  if (actionButton) {
    actionButton.addEventListener('click', handleMainAction);
  }
  
  // Bouton d'annulation
  const cancelButton = document.getElementById('ocr-cancel-btn');
  if (cancelButton) {
    cancelButton.addEventListener('click', cancelProcessing);
  }
  
  // Formats d'export
  const exportFormats = document.querySelectorAll('.export-format');
  exportFormats.forEach(format => {
    format.addEventListener('click', () => {
      exportFormats.forEach(f => f.classList.remove('selected'));
      format.classList.add('selected');
      demoState.exportFormat = format.dataset.format;
    });
  });
  
  // Action d'export
  const exportButton = document.querySelector('.export-actions .primary');
  if (exportButton) {
    exportButton.addEventListener('click', simulateExport);
  }
}

/**
 * Simule la sélection d'un fichier
 */
function simulateFileSelection() {
  if (demoState.processingStarted) return;
  
  // Sélectionner un document aléatoire de la liste
  const randomIndex = Math.floor(Math.random() * window.ocrDemoData.documents.length);
  const selectedDoc = window.ocrDemoData.documents[randomIndex];
  demoState.selectedDocument = selectedDoc;
  
  // Afficher le document sélectionné
  document.querySelector('.uploader-text').textContent = selectedDoc.name;
  document.querySelector('.uploader-subtext').textContent = 
    `${selectedDoc.type} - ${selectedDoc.size}`;
  document.querySelector('.uploader-button').textContent = "Changer de fichier";
  
  // Mettre à jour l'état
  demoState.documentLoaded = true;
  document.getElementById('ocr-action-btn').textContent = "Lancer l'extraction";
}

/**
 * Gère l'action principale en fonction de l'état
 */
function handleMainAction() {
  if (!demoState.documentLoaded) {
    simulateFileSelection();
  } else if (!demoState.processingStarted) {
    startProcessing();
  } else if (demoState.processingComplete) {
    resetDemo();
  }
}

/**
 * Démarre le traitement OCR
 */
function startProcessing() {
  demoState.processingStarted = true;
  demoState.currentStep = 'ocr_analysis';
  
  // Mettre à jour l'UI
  document.querySelector('.document-uploader').style.display = 'none';
  document.querySelector('.ocr-progress').style.display = 'block';
  document.getElementById('ocr-cancel-btn').style.display = 'inline-block';
  document.getElementById('ocr-action-btn').style.display = 'none';
  
  // Simulation de progression
  let progress = 0;
  const totalSteps = window.ocrDemoData.processingSteps.length;
  const stepIncrement = 100 / totalSteps;
  let currentStepIndex = 0;
  
  const progressInterval = setInterval(() => {
    progress += 2;
    demoState.progressPercentage = progress;
    
    // Mettre à jour la barre de progression
    document.querySelector('.progress-bar').style.width = `${progress}%`;
    document.querySelector('.percentage').textContent = `${progress}%`;
    
    // Mettre à jour les étapes
    if (progress >= (currentStepIndex + 1) * stepIncrement) {
      currentStepIndex++;
      if (currentStepIndex < totalSteps) {
        const step = window.ocrDemoData.processingSteps[currentStepIndex];
        demoState.currentStep = step.id;
        updateProgressSteps(step.id);
        document.querySelector('.current-step').textContent = step.name;
      }
    }
    
    // Fin du traitement
    if (progress >= 100) {
      clearInterval(progressInterval);
      completeProcessing();
    }
  }, PROCESSING_DURATION / 50);
}

/**
 * Met à jour l'affichage des étapes de progression
 */
function updateProgressSteps(currentStepId) {
  const steps = document.querySelectorAll('.progress-step');
  let reachedCurrent = false;
  
  steps.forEach(step => {
    if (reachedCurrent) {
      step.classList.remove('active', 'completed');
    } else if (step.dataset.step === currentStepId) {
      step.classList.add('active');
      step.classList.remove('completed');
      reachedCurrent = true;
    } else {
      step.classList.add('completed');
      step.classList.remove('active');
    }
  });
}

/**
 * Termine le traitement et affiche les résultats
 */
function completeProcessing() {
  demoState.processingComplete = true;
  
  // Mettre à jour l'UI
  setTimeout(() => {
    document.querySelector('.ocr-progress').style.display = 'none';
    document.querySelector('.extraction-preview').style.display = 'flex';
    document.querySelector('.correction-interface').style.display = 'block';
    document.querySelector('.export-options').style.display = 'block';
    document.getElementById('ocr-cancel-btn').style.display = 'none';
    document.getElementById('ocr-action-btn').style.display = 'inline-block';
    document.getElementById('ocr-action-btn').textContent = "Nouveau document";
    
    displayExtractionResults();
  }, 500);
}

/**
 * Affiche les résultats de l'extraction
 */
function displayExtractionResults() {
  const doc = demoState.selectedDocument;
  
  // Vérifier si le document est valide
  if (!doc || !doc.extractedData) {
    // Afficher un document par défaut si celui sélectionné n'a pas de données
    const processedDocs = window.ocrDemoData.documents.filter(d => d.status === 'processed');
    if (processedDocs.length > 0) {
      demoState.selectedDocument = processedDocs[0];
      displayExtractionResults();
      return;
    } else {
      console.error("Aucun document traité disponible pour l'affichage");
      return;
    }
  }
  
  // Afficher l'image du document
  const docImage = document.querySelector('.document-image');
  docImage.src = doc.thumbnail || '../img/default-document.png';
  
  // Afficher le score de confiance
  document.querySelector('.score-value').textContent = `${Math.round(doc.confidenceScore * 100)}%`;
  
  // Afficher les données extraites
  const dataFieldsContainer = document.querySelector('.data-fields');
  dataFieldsContainer.innerHTML = '';
  
  Object.entries(doc.extractedData).forEach(([key, value]) => {
    const field = document.createElement('div');
    field.className = 'data-field';
    field.dataset.field = key;
    field.innerHTML = `
      <div class="field-label">${formatFieldLabel(key)}</div>
      <div class="field-value" data-field="${key}">${value}</div>
    `;
    dataFieldsContainer.appendChild(field);
    
    // Ajouter l'événement de survol pour highlight
    field.addEventListener('mouseenter', () => highlightField(key));
    field.addEventListener('mouseleave', () => removeHighlight());
  });
  
  // Créer le formulaire de correction
  createCorrectionForm(doc);
  
  // Simuler un highlight après un court délai
  setTimeout(() => {
    if (doc.correctionNeeded && doc.correctionNeeded.length > 0) {
      highlightField(doc.correctionNeeded[0], 3000);
    }
  }, 1000);
}

/**
 * Crée le formulaire de correction
 */
function createCorrectionForm(doc) {
  const formContainer = document.querySelector('.correction-form');
  formContainer.innerHTML = '';
  
  Object.entries(doc.extractedData).forEach(([key, value]) => {
    const needsCorrection = doc.correctionNeeded && doc.correctionNeeded.includes(key);
    
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'form-field';
    fieldDiv.innerHTML = `
      <label class="form-label" for="field-${key}">${formatFieldLabel(key)}</label>
      <input type="text" id="field-${key}" class="form-input${needsCorrection ? ' error' : ''}" 
        value="${value}" data-field="${key}">
    `;
    formContainer.appendChild(fieldDiv);
    
    // Ajouter l'événement de modification
    const input = fieldDiv.querySelector(`#field-${key}`);
    input.addEventListener('input', (e) => {
      const fieldName = e.target.dataset.field;
      const value = e.target.value;
      
      // Mettre à jour l'affichage des données extraites
      document.querySelector(`.field-value[data-field="${fieldName}"]`).textContent = value;
      
      // Marquer comme corrigé
      if (!demoState.correctedFields.includes(fieldName)) {
        demoState.correctedFields.push(fieldName);
      }
      
      e.target.classList.remove('error');
      e.target.classList.add('corrected');
    });
  });
}

/**
 * Met en évidence un champ dans la visualisation du document
 */
function highlightField(fieldName, duration = HIGHLIGHT_DURATION) {
  // Trouver les régions OCR du champ
  const doc = demoState.selectedDocument;
  const fieldValue = document.querySelector(`.field-value[data-field="${fieldName}"]`);
  
  if (fieldValue) {
    // Highlight dans les données extraites
    removeHighlight();
    fieldValue.classList.add('highlighted');
    demoState.highlightedField = fieldName;
    
    // Trouver la région OCR correspondante
    if (doc.ocrRegions) {
      const region = doc.ocrRegions.find(r => r.field === fieldName);
      if (region) {
        // Créer un highlight visuel sur l'image
        const docView = document.querySelector('.document-view');
        const highlight = document.createElement('div');
        highlight.className = 'ocr-region-highlight';
        highlight.style.position = 'absolute';
        highlight.style.left = `${region.bbox[0] / 6}px`;
        highlight.style.top = `${region.bbox[1] / 6}px`;
        highlight.style.width = `${(region.bbox[2] - region.bbox[0]) / 6}px`;
        highlight.style.height = `${(region.bbox[3] - region.bbox[1]) / 6}px`;
        highlight.style.border = '2px solid #0288D1';
        highlight.style.backgroundColor = 'rgba(2, 136, 209, 0.2)';
        highlight.style.zIndex = '10';
        docView.appendChild(highlight);
        
        // Supprimer le highlight après un certain temps
        if (duration) {
          setTimeout(() => {
            removeHighlight();
          }, duration);
        }
      }
    }
  }
}

/**
 * Supprime tous les highlights
 */
function removeHighlight() {
  // Supprimer les highlights des données
  document.querySelectorAll('.field-value.highlighted').forEach(el => {
    el.classList.remove('highlighted');
  });
  
  // Supprimer les highlights visuels
  document.querySelectorAll('.ocr-region-highlight').forEach(el => {
    el.remove();
  });
  
  demoState.highlightedField = null;
}

/**
 * Simule l'exportation des données
 */
function simulateExport() {
  const format = demoState.exportFormat;
  const formatInfo = window.ocrDemoData.exportFormats.find(f => f.id === format);
  
  // Créer une notification temporaire
  const notification = document.createElement('div');
  notification.className = 'export-notification';
  notification.style.position = 'absolute';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '15px';
  notification.style.backgroundColor = 'var(--yvea-success)';
  notification.style.color = 'white';
  notification.style.borderRadius = 'var(--yvea-border-radius)';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  notification.style.zIndex = '1000';
  notification.style.opacity = '0';
  notification.style.transition = 'opacity 0.3s ease-in-out';
  
  notification.innerHTML = `
    <div style="font-weight: 600; margin-bottom: 5px;">Exportation réussie</div>
    <div>Les données ont été exportées au format ${formatInfo.name} (${formatInfo.extension})</div>
  `;
  
  document.body.appendChild(notification);
  
  // Afficher et masquer la notification
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 100);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/**
 * Annule le traitement en cours
 */
function cancelProcessing() {
  // Réinitialiser l'état
  demoState.processingStarted = false;
  demoState.processingComplete = false;
  
  // Mettre à jour l'UI
  document.querySelector('.document-uploader').style.display = 'flex';
  document.querySelector('.ocr-progress').style.display = 'none';
  document.getElementById('ocr-cancel-btn').style.display = 'none';
  document.getElementById('ocr-action-btn').style.display = 'inline-block';
  document.getElementById('ocr-action-btn').textContent = "Lancer l'extraction";
}

/**
 * Réinitialise complètement la démo
 */
function resetDemo() {
  // Réinitialiser l'état
  demoState = {
    documentLoaded: false,
    processingStarted: false,
    processingComplete: false,
    currentStep: 'upload',
    progressPercentage: 0,
    selectedDocument: null,
    exportFormat: 'excel',
    highlightedField: null,
    correctedFields: []
  };
  
  // Réinitialiser l'UI
  document.querySelector('.document-uploader').style.display = 'flex';
  document.querySelector('.uploader-text').textContent = "Déposez votre document ici";
  document.querySelector('.uploader-subtext').textContent = "Format PDF, PNG ou JPG - 10MB max";
  document.querySelector('.uploader-button').textContent = "Parcourir les fichiers";
  
  document.querySelector('.ocr-progress').style.display = 'none';
  document.querySelector('.extraction-preview').style.display = 'none';
  document.querySelector('.correction-interface').style.display = 'none';
  document.querySelector('.export-options').style.display = 'none';
  
  document.getElementById('ocr-cancel-btn').style.display = 'none';
  document.getElementById('ocr-action-btn').textContent = "Importer un document";
  document.querySelector('.progress-bar').style.width = '0%';
  
  // Réinitialiser les étapes
  updateProgressSteps('upload');
}

// Fonctions utilitaires
function formatFieldLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1') // Ajouter un espace avant chaque majuscule
    .replace(/^./, str => str.toUpperCase()) // Première lettre en majuscule
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Ajouter un espace entre minuscule et majuscule
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2'); // Ajouter un espace entre lettre et chiffre
}

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.document-uploader').classList.add('drag-over');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.document-uploader').classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  document.querySelector('.document-uploader').classList.remove('drag-over');
  simulateFileSelection();
} 