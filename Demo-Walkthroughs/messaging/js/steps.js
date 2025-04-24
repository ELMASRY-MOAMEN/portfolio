/**
 * Messaging Walkthrough Steps Definition
 * 
 * This file defines all steps for the messaging feature tour.
 * Each step includes title, text, element attachment, buttons and styling.
 */

const messagingSteps = [
  {
    id: 'messaging-intro',
    title: 'Système de Messagerie - Introduction',
    text: "Le système de messagerie d'YVEA vous permet de communiquer efficacement avec tous les acteurs impliqués dans vos dossiers d'importation. Il centralise les échanges et garde une trace complète de toutes vos communications.",
    attachTo: {
      element: '.messaging-panel',
      on: 'right'
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
    id: 'messaging-interface',
    title: 'Interface de Messagerie',
    text: "L'interface de messagerie est divisée en trois zones principales : la liste des conversations à gauche, le fil de discussion au centre, et les détails du contact à droite. Cette organisation vous permet de gérer efficacement plusieurs conversations simultanément.",
    attachTo: {
      element: '.messaging-interface',
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
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  },
  {
    id: 'messaging-conversations',
    title: 'Liste des Conversations',
    text: "La liste des conversations affiche tous vos échanges en cours, triés par date de dernière activité. Les conversations non lues sont mises en évidence, et vous pouvez utiliser la barre de recherche pour retrouver rapidement un échange spécifique.",
    attachTo: {
      element: '.conversation-list',
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
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  },
  {
    id: 'messaging-thread',
    title: 'Fil de Discussion',
    text: "Le fil de discussion présente l'historique complet des messages échangés dans la conversation sélectionnée. Vous pouvez voir clairement qui a envoyé chaque message et à quel moment. La zone de saisie en bas vous permet de rédiger et d'envoyer vos messages.",
    attachTo: {
      element: '.message-thread',
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
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  },
  {
    id: 'messaging-attachments',
    title: 'Pièces Jointes',
    text: "Vous pouvez facilement joindre des documents à vos messages en cliquant sur l'icône de trombone. Les pièces jointes peuvent être des fichiers de votre ordinateur ou des documents déjà présents dans votre dossier YVEA. Tous les formats de fichiers courants sont pris en charge.",
    attachTo: {
      element: '.attachment-button',
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
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  },
  {
    id: 'messaging-notifications',
    title: 'Notifications',
    text: "YVEA vous notifie des nouveaux messages par différents canaux : notifications dans l'application, alertes par email, et badges de notification. Vous pouvez personnaliser vos préférences de notification dans les paramètres de votre compte.",
    attachTo: {
      element: '.notification-settings',
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
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  },
  {
    id: 'messaging-new-conversation',
    title: 'Créer une Nouvelle Conversation',
    text: "Pour démarrer une nouvelle conversation, cliquez sur le bouton '+' dans la liste des conversations. Vous pourrez ensuite sélectionner un ou plusieurs destinataires parmi vos contacts ou rechercher de nouveaux interlocuteurs dans le répertoire YVEA.",
    attachTo: {
      element: '.new-conversation-button',
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
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  },
  {
    id: 'messaging-conclusion',
    title: 'Communication Centralisée',
    text: "Le système de messagerie d'YVEA assure que toutes vos communications liées aux importations sont sécurisées, traçables et facilement accessibles. N'hésitez pas à l'utiliser pour toutes vos interactions avec les partenaires, les autorités et l'équipe YVEA.",
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
    ],
    classes: 'custom-class-name-1 custom-class-name-2'
  }
];

export default messagingSteps; 