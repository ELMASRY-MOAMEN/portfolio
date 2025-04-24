/**
 * AI Assistant Walkthrough Steps Definition
 * 
 * This file defines all steps for the AI assistant feature tour.
 * Each step includes title, text, element attachment, buttons and styling.
 */

const assistantSteps = [
  {
    id: 'assistant-intro',
    title: 'Assistant IA - Introduction',
    text: "L'assistant virtuel intelligent (IA) d'YVEA vous aide à naviguer dans l'application et à accomplir vos tâches quotidiennes plus efficacement. Il combine une interface conversationnelle avec des capacités d'analyse avancées pour vous offrir une assistance personnalisée.",
    attachTo: {
      element: '.assistant-panel',
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
    id: 'assistant-activation',
    title: 'Activation de l\'Assistant',
    text: "Pour activer l'assistant, cliquez sur l'icône en forme de robot dans le coin inférieur droit de votre écran. L'assistant est disponible sur toutes les pages de l'application.",
    attachTo: {
      element: '.assistant-icon',
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
    id: 'assistant-conversation',
    title: 'Interface de Conversation',
    text: "L'interface de conversation vous permet d'interagir avec l'assistant en langage naturel. Posez vos questions, demandez de l'aide ou donnez des instructions spécifiques. L'assistant comprend le contexte de votre conversation et maintient ce contexte au fil du temps.",
    attachTo: {
      element: '.conversation-panel',
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
    id: 'assistant-capabilities',
    title: 'Capacités de l\'Assistant',
    text: "L'assistant peut vous aider de multiples façons : rechercher des informations, générer des rapports, analyser des documents, programmer des rendez-vous, envoyer des notifications et bien plus encore. Il s'intègre avec toutes les fonctionnalités d'YVEA pour maximiser votre productivité.",
    attachTo: {
      element: '.capabilities-section',
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
    id: 'assistant-commands',
    title: 'Commandes Rapides',
    text: "Utilisez des commandes rapides pour des actions fréquentes. Par exemple, tapez '/recherche' suivi d'un terme pour lancer une recherche, ou '/aide' pour voir la liste des commandes disponibles. Ces raccourcis vous font gagner du temps pour les opérations courantes.",
    attachTo: {
      element: '.quick-commands',
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
    id: 'assistant-history',
    title: 'Historique des Conversations',
    text: "Votre historique de conversation est sauvegardé, ce qui vous permet de retrouver facilement vos échanges précédents. L'assistant utilise cet historique pour vous offrir une expérience plus personnalisée et s'améliorer continuellement.",
    attachTo: {
      element: '.history-section',
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
    id: 'assistant-conclusion',
    title: 'Votre Assistant Personnel',
    text: "L'assistant IA d'YVEA est conçu pour s'adapter à vos besoins spécifiques. Plus vous l'utilisez, plus il devient efficace pour vous aider. N'hésitez pas à lui donner des retours pour améliorer son service. Commencez dès maintenant à explorer ses capacités !",
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

export default assistantSteps; 