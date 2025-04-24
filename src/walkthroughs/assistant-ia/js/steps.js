/**
 * Définition des étapes du walkthrough Assistant Virtuel IA
 */

const assistantSteps = [
  {
    id: 'assistant-intro',
    title: 'Assistant Virtuel IA',
    text: `
      <p>Bienvenue dans le walkthrough de <strong>l'Assistant Virtuel IA</strong> d'YVEA.</p>
      <p>Cette visite guidée vous présente comment l'assistant intelligent facilite vos démarches d'exportation.</p>
    `,
    attachTo: {
      element: '.assistant-icon',
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
    id: 'assistant-activation',
    title: 'Accès à l\'assistant',
    text: `
      <p>L'assistant est accessible à tout moment depuis n'importe quelle page de l'application.</p>
      <p>Cliquez sur cette icône pour activer l'interface conversationnelle.</p>
    `,
    attachTo: {
      element: '.assistant-trigger',
      on: 'bottom'
    }
  },
  {
    id: 'assistant-dialogue',
    title: 'Interface de dialogue',
    text: `
      <p>Posez vos questions en langage naturel et obtenez des réponses précises et contextuelles.</p>
      <p>L'assistant comprend des requêtes complexes et peut répondre à des questions sur la réglementation, les procédures, etc.</p>
    `,
    attachTo: {
      element: '.chatbox-container',
      on: 'right'
    }
  },
  {
    id: 'assistant-capabilities',
    title: 'Capacités intelligentes',
    text: `
      <p>L'assistant est basé sur Azure OpenAI et GPT-4 avec des fonctionnalités avancées :</p>
      <ul>
        <li>Recherche documentaire dans la base de connaissances</li>
        <li>Recommandations personnalisées</li>
        <li>Aide à la prise de décision</li>
        <li>Génération de contenus pour vos documents d'export</li>
      </ul>
    `,
    attachTo: {
      element: '.assistant-capabilities',
      on: 'top'
    }
  },
  {
    id: 'assistant-document-analysis',
    title: 'Analyse de documents',
    text: `
      <p>Partagez vos documents avec l'assistant pour une analyse approfondie.</p>
      <p>L'IA peut extraire des informations clés, identifier des problèmes potentiels et suggérer des améliorations.</p>
    `,
    attachTo: {
      element: '.document-analysis-section',
      on: 'bottom'
    }
  },
  {
    id: 'assistant-context-awareness',
    title: 'Sensibilité au contexte',
    text: `
      <p>L'assistant comprend votre contexte actuel et adapte ses réponses en conséquence.</p>
      <p>Par exemple, si vous travaillez sur un certificat pour le Japon, l'assistant privilégiera les informations pertinentes pour ce marché.</p>
    `,
    attachTo: {
      element: '.context-indicator',
      on: 'left'
    }
  },
  {
    id: 'assistant-commands',
    title: 'Commandes spéciales',
    text: `
      <p>Utilisez des commandes spéciales pour des fonctionnalités avancées :</p>
      <ul>
        <li><code>/recherche [terme]</code> : recherche spécifique dans la base de connaissances</li>
        <li><code>/historique</code> : afficher l'historique de vos conversations</li>
        <li><code>/export PDF</code> : exporter la conversation en PDF</li>
        <li><code>/reset</code> : démarrer une nouvelle conversation</li>
      </ul>
    `,
    attachTo: {
      element: '.command-helper',
      on: 'top'
    }
  },
  {
    id: 'assistant-feedback',
    title: 'Amélioration continue',
    text: `
      <p>Après chaque interaction, vous pouvez évaluer la pertinence des réponses.</p>
      <p>Ce feedback permet d'améliorer continuellement la précision et la pertinence de l'assistant.</p>
    `,
    attachTo: {
      element: '.feedback-controls',
      on: 'right'
    }
  },
  {
    id: 'assistant-conclusion',
    title: 'Assistant IA - Résumé',
    text: `
      <p>L'Assistant IA d'YVEA réduit de <strong>85%</strong> les demandes de support de premier niveau.</p>
      <p>Il offre :</p>
      <ul>
        <li>Une disponibilité 24/7 pour l'assistance</li>
        <li>Des réponses basées sur des sources vérifiées</li>
        <li>Une adaptation continue à vos besoins spécifiques</li>
        <li>Une interface conversationnelle intuitive</li>
      </ul>
    `,
    attachTo: {
      element: '.assistant-footer',
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

export default assistantSteps; 