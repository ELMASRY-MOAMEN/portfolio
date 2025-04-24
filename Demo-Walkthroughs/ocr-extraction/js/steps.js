/**
 * Définition des étapes du walkthrough OCR et extraction intelligente
 * Chaque étape contient le titre, la description, l'élément attaché et les options de positionnement
 */

const ocrSteps = [
  {
    id: 'ocr-intro',
    title: 'OCR et Extraction Intelligente',
    text: `<p>Découvrez comment YVEA utilise l'OCR (Reconnaissance Optique de Caractères) et l'IA pour extraire automatiquement les données de vos documents.</p>
          <p>Cette visite guidée vous présentera le processus complet, de l'upload des documents à l'extraction et validation des données.</p>`,
    attachTo: {
      element: '.document-upload-zone',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.cancel();
        },
        secondary: true,
        text: 'Quitter'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight',
    scrollTo: true
  },
  {
    id: 'document-upload',
    title: 'Upload de Documents',
    text: `<p>La première étape consiste à télécharger vos documents via cette zone.</p>
          <p>YVEA accepte plusieurs formats :</p>
          <ul>
            <li>Images (JPG, PNG)</li>
            <li>Documents PDF</li>
            <li>Documents scannés</li>
          </ul>
          <p>Vous pouvez également prendre une photo directement depuis votre appareil mobile.</p>`,
    attachTo: {
      element: '.document-uploader',
      on: 'bottom-start'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'preprocessing',
    title: 'Prétraitement des Images',
    text: `<p>Avant d'extraire le texte, YVEA prétraite automatiquement vos documents :</p>
          <ul>
            <li>Correction de l'orientation</li>
            <li>Amélioration du contraste</li>
            <li>Suppression du bruit</li>
            <li>Détection des zones de texte</li>
          </ul>
          <p>Ces étapes assurent une meilleure précision de reconnaissance.</p>`,
    attachTo: {
      element: '.document-preview',
      on: 'right'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'text-recognition',
    title: 'Reconnaissance de Texte',
    text: `<p>YVEA utilise une combinaison de technologies OCR pour extraire le texte des documents :</p>
          <ul>
            <li>Tesseract OCR pour la reconnaissance de base</li>
            <li>Algorithmes spécialisés pour les caractères manuscrits</li>
            <li>IA avancée pour les cas complexes</li>
          </ul>
          <p>Le système détecte automatiquement la langue du document.</p>`,
    attachTo: {
      element: '.ocr-progress',
      on: 'top'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'document-classification',
    title: 'Classification des Documents',
    text: `<p>Une fois le texte extrait, YVEA identifie automatiquement le type de document :</p>
          <ul>
            <li>Factures</li>
            <li>Bons de commande</li>
            <li>Certificats</li>
            <li>Formulaires administratifs</li>
            <li>Et bien d'autres...</li>
          </ul>
          <p>Cette classification permet d'appliquer les règles d'extraction spécifiques à chaque type de document.</p>`,
    attachTo: {
      element: '.document-type-indicator',
      on: 'left'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'data-extraction',
    title: 'Extraction des Données',
    text: `<p>En fonction du type de document identifié, YVEA extrait les informations pertinentes :</p>
          <ul>
            <li>Données d'en-tête (dates, références)</li>
            <li>Informations des parties (client, fournisseur)</li>
            <li>Détails des produits/services</li>
            <li>Montants et calculs</li>
          </ul>
          <p>L'IA comprend la structure du document et la signification des données extraites.</p>`,
    attachTo: {
      element: '.extracted-data-panel',
      on: 'right'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'human-validation',
    title: 'Validation Humaine',
    text: `<p>Après l'extraction automatique, vous pouvez vérifier et corriger les données :</p>
          <ul>
            <li>Les champs en jaune indiquent une faible confiance et nécessitent votre attention</li>
            <li>Vous pouvez modifier directement les champs incorrects</li>
            <li>Le système apprend de vos corrections pour s'améliorer</li>
          </ul>
          <p>Cette étape garantit l'exactitude des données avant leur intégration.</p>`,
    attachTo: {
      element: '.validation-interface',
      on: 'left'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'data-integration',
    title: 'Intégration des Données',
    text: `<p>Une fois validées, les données sont automatiquement intégrées dans les workflows business appropriés :</p>
          <ul>
            <li>Création d'entrées dans le système comptable</li>
            <li>Mise à jour des stocks</li>
            <li>Génération de rapports</li>
            <li>Alimentation des tableaux de bord</li>
          </ul>
          <p>L'intégration est transparente et réduit considérablement le travail manuel.</p>`,
    attachTo: {
      element: '.workflow-integration',
      on: 'bottom'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'continuous-improvement',
    title: 'Amélioration Continue',
    text: `<p>Le système OCR de YVEA s'améliore continuellement :</p>
          <ul>
            <li>Apprentissage à partir des corrections utilisateur</li>
            <li>Adaptation aux nouveaux types de documents</li>
            <li>Mise à jour des modèles d'IA</li>
            <li>Analyse des performances et ajustements</li>
          </ul>
          <p>Plus vous utilisez le système, plus il devient précis et efficace.</p>`,
    attachTo: {
      element: '.ai-analytics',
      on: 'top'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.next();
        },
        text: 'Suivant'
      }
    ],
    classes: 'yvea-shepherd-step-highlight',
    highlightClass: 'yvea-shepherd-highlight'
  },
  {
    id: 'ocr-conclusion',
    title: 'Conclusion',
    text: `<p>Félicitations ! Vous avez terminé la visite guidée du système OCR et d'extraction intelligente de YVEA.</p>
          <p>Les avantages clés sont :</p>
          <ul>
            <li>Réduction drastique de la saisie manuelle</li>
            <li>Diminution des erreurs humaines</li>
            <li>Accélération des processus de traitement</li>
            <li>Meilleure organisation des documents</li>
            <li>Analyse avancée des données extraites</li>
          </ul>
          <p>Pour plus d'informations, consultez notre documentation technique ou contactez notre équipe support.</p>`,
    attachTo: {
      element: '.document-processing-section',
      on: 'center'
    },
    buttons: [
      {
        action: function() {
          return this.back();
        },
        secondary: true,
        text: 'Précédent'
      },
      {
        action: function() {
          return this.complete();
        },
        text: 'Terminer'
      }
    ],
    classes: 'yvea-shepherd-step-highlight yvea-shepherd-conclusion',
    highlightClass: 'yvea-shepherd-highlight'
  }
];

export default ocrSteps; 