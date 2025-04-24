/**
 * Certificate Workflow Walkthrough Steps
 * 
 * This file defines the steps for the Shepherd.js guided tour of the certificate workflow.
 * Each step includes an element to attach to, buttons, text content and positioning.
 */

const certificateSteps = [
  {
    id: 'certificate-intro',
    title: 'Workflow des certificats',
    text: `Bienvenue dans la visite guidée du workflow des certificats YVEA. 
           Ce processus vous permet de créer, soumettre, suivre et gérer les certificats 
           nécessaires à vos opérations d'importation et d'exportation.`,
    attachTo: {
      element: '.certificate-dashboard',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Quitter',
        action: function() {
          return this.cancel();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  },
  {
    id: 'certificate-types',
    title: 'Types de certificats',
    text: `YVEA prend en charge divers types de certificats réglementaires :
           certificats d'origine, certificats sanitaires, certificats de conformité, 
           et autres documents douaniers adaptés à votre secteur d'activité.`,
    attachTo: {
      element: '.certificate-type-selector',
      on: 'right'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'certificate-creation',
    title: 'Création d\'un certificat',
    text: `Pour créer un nouveau certificat, sélectionnez le type souhaité et complétez 
           le formulaire avec les informations requises. Le système vous guidera à travers 
           les champs obligatoires en fonction du type de certificat choisi.`,
    attachTo: {
      element: '.certificate-creation-form',
      on: 'left'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'document-upload',
    title: 'Téléchargement des pièces justificatives',
    text: `Chaque certificat nécessite des documents justificatifs spécifiques. 
           Téléchargez-les ici dans les formats acceptés (PDF, JPEG, PNG). 
           Notre système d'OCR pré-remplira automatiquement certains champs.`,
    attachTo: {
      element: '.supporting-docs-uploader',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'certificate-validation',
    title: 'Validation des données',
    text: `Avant soumission, le système vérifie la cohérence et la conformité des informations. 
           Les champs en erreur sont signalés en rouge avec des explications. 
           Corrigez-les pour pouvoir procéder à la soumission.`,
    attachTo: {
      element: '.validation-section',
      on: 'right'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'certificate-submission',
    title: 'Soumission du certificat',
    text: `Une fois toutes les informations validées, soumettez votre certificat 
           à l'autorité compétente en cliquant sur "Soumettre". Un récapitulatif 
           vous sera présenté avant la confirmation finale.`,
    attachTo: {
      element: '.submission-controls',
      on: 'top'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'certificate-tracking',
    title: 'Suivi des certificats',
    text: `Suivez l'état de vos certificats en temps réel dans cette interface. 
           Chaque statut (En attente, En cours d'évaluation, Approuvé, Refusé) est 
           associé à une couleur distinctive pour une visualisation rapide.`,
    attachTo: {
      element: '.certificate-status-tracker',
      on: 'left'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'certificate-amendments',
    title: 'Modifications et corrections',
    text: `Si un certificat est refusé ou nécessite des modifications, vous pouvez le 
           rectifier ici. Le système conserve l'historique des versions pour 
           un suivi transparent des changements.`,
    attachTo: {
      element: '.amendment-section',
      on: 'right'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'certificate-download',
    title: 'Téléchargement des certificats approuvés',
    text: `Les certificats approuvés peuvent être téléchargés en format PDF officiel, 
           comportant toutes les signatures numériques et éléments de sécurité nécessaires 
           pour garantir leur authenticité.`,
    attachTo: {
      element: '.download-section',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Suivant',
        action: function() {
          return this.next();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  },
  {
    id: 'certificate-conclusion',
    title: 'Gestion complète des certificats',
    text: `Félicitations ! Vous maîtrisez maintenant le workflow complet des certificats YVEA.
           Ce système intégré simplifie considérablement la gestion de vos documents 
           réglementaires et accélère vos opérations d'import/export tout en garantissant 
           la conformité avec les exigences légales.`,
    attachTo: {
      element: '.certificate-dashboard',
      on: 'top'
    },
    buttons: [
      {
        text: 'Précédent',
        action: function() {
          return this.back();
        },
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Terminer',
        action: function() {
          return this.complete();
        },
        classes: 'shepherd-button-primary'
      }
    ]
  }
];

export default certificateSteps; 