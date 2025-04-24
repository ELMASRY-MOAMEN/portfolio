# Sélecteurs CSS pour les Walkthroughs YVEA

Ce document détaille tous les sélecteurs CSS utilisés dans les walkthroughs YVEA. Pour que les visites guidées fonctionnent correctement, ces sélecteurs doivent correspondre aux éléments HTML dans l'application.

## Sélecteurs communs

Ces sélecteurs sont utilisés dans plusieurs walkthroughs :

| Sélecteur | Description | Utilisé dans |
|-----------|-------------|--------------|
| `.yvea-tour-active` | Classe ajoutée au body pendant qu'un tour est actif | Tous les tours |
| `.shepherd-element` | Élément principal de Shepherd.js | Tous les tours |

## Assistant IA

| Sélecteur | Description | Étape |
|-----------|-------------|-------|
| `.assistant-icon` | Icône d'accès à l'assistant | assistant-intro |
| `.assistant-trigger` | Bouton déclencheur de l'assistant | assistant-activation |
| `.chatbox-container` | Conteneur de l'interface de dialogue | assistant-dialogue |
| `.assistant-capabilities` | Zone présentant les capacités de l'assistant | assistant-capabilities |
| `.document-analysis-section` | Section d'analyse de documents | assistant-document-analysis |
| `.context-indicator` | Indicateur de contexte actuel | assistant-context-awareness |
| `.command-helper` | Aide pour les commandes spéciales | assistant-commands |
| `.feedback-controls` | Contrôles pour donner du feedback | assistant-feedback |
| `.assistant-footer` | Pied de l'interface assistant | assistant-conclusion |

## OCR et Extraction Intelligente

| Sélecteur | Description | Étape |
|-----------|-------------|-------|
| `.ocr-header` | En-tête de l'interface OCR | ocr-intro |
| `.document-uploader` | Zone de téléchargement de documents | document-upload |
| `.ocr-progress` | Indicateur de progression de l'OCR | ocr-processing |
| `.extraction-preview` | Aperçu des données extraites | data-preview |
| `.correction-interface` | Interface de correction des données | correction-tools |
| `.data-validation` | Zone de validation des données | data-validation |
| `.export-options` | Options d'export des données | export-options |
| `.export-formats` | Liste des formats d'export disponibles | export-formats |
| `.ocr-footer` | Pied de l'interface OCR | ocr-conclusion |

## Messagerie en Temps Réel

| Sélecteur | Description | Étape |
|-----------|-------------|-------|
| `.messaging-header` | En-tête de l'interface de messagerie | messaging-intro |
| `.conversation-list` | Liste des conversations | message-center |
| `.message-status-indicators` | Indicateurs de statut des messages | real-time-features |
| `.attachment-zone` | Zone de gestion des pièces jointes | file-sharing |
| `.contextual-references` | Références contextuelles dans les messages | contextual-integration |
| `.security-badge` | Badge de sécurité des messages | messaging-security |
| `.messaging-footer` | Pied de l'interface de messagerie | messaging-conclusion |

## Workflow de Certificats

| Sélecteur | Description | Étape |
|-----------|-------------|-------|
| `.certificats-header` | En-tête de l'interface de certificats | certificats-intro |
| `.new-certificate-button` | Bouton de création d'un nouveau certificat | nouveau-certificat |
| `.certificate-type-selector` | Sélecteur du type de certificat | type-certificat |
| `.certificate-base-info` | Informations de base du certificat | informations-base |
| `.products-section` | Section de gestion des produits | ajout-produits |
| `.document-upload-zone` | Zone de téléchargement des documents justificatifs | documents-requis |
| `.validation-panel` | Panneau de validation préliminaire | validation-automatique |
| `.submission-controls` | Contrôles de soumission du certificat | soumission |
| `.certificate-status-tracker` | Suivi du statut du certificat | suivi-statut |
| `.certificats-footer` | Pied de l'interface de certificats | certificats-conclusion |

## Conseils d'implémentation

Lors de l'intégration des walkthroughs dans l'application YVEA, suivez ces bonnes pratiques :

1. **Classes dédiées** : Si possible, ajoutez des classes spécifiques dédiées aux walkthroughs (préfixées par `yvea-` ou `tour-`) aux éléments HTML cibles.

2. **Robustesse** : Assurez-vous que les sélecteurs existent dans le DOM avant le démarrage du tour. Les fonctions d'initialisation des tours incluent une gestion des erreurs pour les cas où les éléments cibles n'existent pas.

3. **Vérification des éléments** : Avant le lancement d'un tour, vérifiez que la page contient bien les éléments nécessaires :

```javascript
// Exemple de vérification avant lancement d'un tour
function canLaunchOcrTour() {
  const requiredSelectors = [
    '.ocr-header', 
    '.document-uploader',
    '.ocr-progress'
  ];
  
  return requiredSelectors.every(selector => document.querySelector(selector) !== null);
}
```

4. **Flexibilité** : Si la structure HTML change, vous pouvez adapter les sélecteurs dans les fichiers `steps.js` de chaque walkthrough sans modifier le reste du code.

5. **Alternatives** : En cas de changement majeur dans l'interface, prévoyez des sélecteurs alternatifs :

```javascript
// Exemple dans un fichier steps.js
{
  attachTo: {
    element: document.querySelector('.new-selector') || document.querySelector('.old-selector') || '.fallback-selector',
    on: 'bottom'
  }
}
```

Ces sélecteurs sont essentiels pour le bon fonctionnement des walkthroughs. Assurez-vous qu'ils sont correctement implémentés dans les vues correspondantes de l'application. 