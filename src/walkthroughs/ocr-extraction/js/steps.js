/**
 * Définition des étapes du walkthrough OCR et Extraction Intelligente
 */

const ocrSteps = [
  {
    id: 'ocr-intro',
    title: 'OCR et Extraction Intelligente',
    text: `
      <p>Bienvenue dans le walkthrough de la fonctionnalité <strong>OCR et Extraction Intelligente</strong> d'YVEA.</p>
      <p>Cette visite guidée vous présente comment l'application permet d'extraire automatiquement des données structurées à partir de documents commerciaux.</p>
    `,
    attachTo: {
      element: '.ocr-header',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Fermer',
        action: function() {
          return this.cancel();
        },
        secondary: true
      },
      {
        text: 'Commencer',
        action: function() {
          return this.next();
        }
      }
    ],
    beforeShowPromise: function() {
      return new Promise(function(resolve) {
        setTimeout(resolve, 300);
      });
    }
  },
  {
    id: 'document-upload',
    title: 'Téléchargement de documents',
    text: `
      <p>Commencez par télécharger vos documents commerciaux (factures, bons de livraison, etc.) dans cette zone.</p>
      <p>Le système accepte les formats PDF, JPG, PNG et TIFF.</p>
    `,
    attachTo: {
      element: '.document-uploader',
      on: 'bottom'
    }
  },
  {
    id: 'ocr-processing',
    title: 'Traitement OCR en cours',
    text: `
      <p>Une fois le document téléchargé, le moteur OCR analyse automatiquement son contenu.</p>
      <p>La barre de progression vous indique l'avancement du traitement en temps réel.</p>
    `,
    attachTo: {
      element: '.ocr-progress',
      on: 'bottom'
    }
  },
  {
    id: 'data-preview',
    title: 'Aperçu des données extraites',
    text: `
      <p>Les données sont extraites et présentées de manière structurée.</p>
      <p>Les zones de texte reconnues sont mises en surbrillance sur le document d'origine pour vérification.</p>
    `,
    attachTo: {
      element: '.extraction-preview',
      on: 'right'
    }
  },
  {
    id: 'correction-tools',
    title: 'Interface de correction',
    text: `
      <p>Si des erreurs d'extraction sont détectées, cette interface permet de les corriger facilement.</p>
      <p>L'IA propose des suggestions pour accélérer ce processus.</p>
    `,
    attachTo: {
      element: '.correction-interface',
      on: 'left'
    }
  },
  {
    id: 'data-validation',
    title: 'Validation des données',
    text: `
      <p>Une fois les données vérifiées, vous pouvez les valider pour utilisation ultérieure.</p>
      <p>Des vérifications automatiques sont effectuées pour garantir la cohérence des informations.</p>
    `,
    attachTo: {
      element: '.data-validation',
      on: 'bottom'
    }
  },
  {
    id: 'export-options',
    title: 'Options d\'export',
    text: `
      <p>Les données extraites peuvent être exportées sous différents formats ou intégrées à d'autres modules d'YVEA.</p>
      <p>Choisissez l'option qui correspond à votre flux de travail.</p>
    `,
    attachTo: {
      element: '.export-options',
      on: 'top'
    }
  },
  {
    id: 'export-formats',
    title: 'Formats disponibles',
    text: `
      <p>Plusieurs formats d'export sont disponibles pour s'adapter à vos besoins :</p>
      <ul>
        <li>Excel : pour analyse et reporting</li>
        <li>CSV : pour l'import dans d'autres systèmes</li>
        <li>JSON : pour l'intégration via API</li>
      </ul>
    `,
    attachTo: {
      element: '.export-formats',
      on: 'top'
    }
  },
  {
    id: 'ocr-conclusion',
    title: 'Extraction Intelligente - Résumé',
    text: `
      <p>Le système OCR d'YVEA réduit de <strong>80%</strong> le temps de traitement des documents d'exportation.</p>
      <p>Grâce à cette fonctionnalité, vous pouvez :</p>
      <ul>
        <li>Éliminer la saisie manuelle de données</li>
        <li>Réduire les erreurs humaines</li>
        <li>Accélérer le processus de préparation des certificats</li>
        <li>Créer une base de données structurée à partir de vos documents papier</li>
      </ul>
    `,
    attachTo: {
      element: '.ocr-footer',
      on: 'top'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        secondary: true
      },
      {
        text: 'Terminer',
        action: function() {
          return this.complete();
        }
      }
    ]
  }
];

export default ocrSteps; 