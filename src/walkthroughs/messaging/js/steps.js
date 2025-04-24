/**
 * Définition des étapes du walkthrough Messagerie Collaborative
 */

const messagingSteps = [
  {
    id: 'messaging-intro',
    title: 'Messagerie Collaborative',
    text: `
      <p>Bienvenue dans le walkthrough de la <strong>Messagerie Collaborative</strong> d'YVEA.</p>
      <p>Cette visite guidée vous présente comment la messagerie en temps réel facilite les échanges entre tous les acteurs de vos projets d'exportation.</p>
    `,
    attachTo: {
      element: '.messaging-header',
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
    id: 'message-center',
    title: 'Centre de messagerie',
    text: `
      <p>Le centre de messagerie centralise toutes vos conversations avec les partenaires et organismes de certification.</p>
      <p>L'interface vous permet de suivre facilement les échanges liés à chaque dossier d'exportation.</p>
    `,
    attachTo: {
      element: '.conversation-list',
      on: 'right'
    }
  },
  {
    id: 'real-time-features',
    title: 'Fonctionnalités temps réel',
    text: `
      <p>Suivez l'état de vos messages (envoyé, reçu, lu) en temps réel.</p>
      <p>Les indicateurs visuels vous permettent de savoir instantanément où en sont vos communications.</p>
    `,
    attachTo: {
      element: '.message-status-indicators',
      on: 'bottom'
    }
  },
  {
    id: 'file-sharing',
    title: 'Partage de fichiers',
    text: `
      <p>Échangez facilement des documents et pièces jointes avec vos interlocuteurs.</p>
      <p>Le système prend en charge tous les formats courants et conserve un historique des versions.</p>
    `,
    attachTo: {
      element: '.attachment-zone',
      on: 'left'
    }
  },
  {
    id: 'contextual-integration',
    title: 'Références contextuelles',
    text: `
      <p>Intégrez des références aux certificats et documents directement dans vos messages.</p>
      <p>Ces références dynamiques permettent à vos interlocuteurs d'accéder directement au document concerné.</p>
    `,
    attachTo: {
      element: '.contextual-references',
      on: 'top'
    }
  },
  {
    id: 'messaging-security',
    title: 'Sécurité des échanges',
    text: `
      <p>La messagerie YVEA intègre un chiffrement de bout en bout pour garantir la confidentialité de vos communications.</p>
      <p>Le badge de sécurité indique le niveau de protection de chaque conversation.</p>
    `,
    attachTo: {
      element: '.security-badge',
      on: 'right'
    }
  },
  {
    id: 'messaging-conclusion',
    title: 'Messagerie Collaborative - Résumé',
    text: `
      <p>La messagerie collaborative d'YVEA accélère les échanges et réduit les délais de validation de <strong>60%</strong>.</p>
      <p>Elle offre :</p>
      <ul>
        <li>Une communication centralisée et organisée par projet</li>
        <li>Des échanges sécurisés avec tous les acteurs</li>
        <li>Un historique complet et auditable des communications</li>
        <li>Une intégration native avec les autres modules d'YVEA</li>
      </ul>
    `,
    attachTo: {
      element: '.messaging-footer',
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

export default messagingSteps; 