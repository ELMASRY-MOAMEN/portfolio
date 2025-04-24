# YVEA - Walkthroughs Interactifs

Ce dossier contient les démonstrations interactives (walkthroughs) des fonctionnalités principales du projet YVEA. Ces walkthroughs sont implémentés avec Shepherd.js pour permettre aux visiteurs du portfolio de découvrir et comprendre les aspects les plus innovants et impressionnants du projet sans avoir à explorer l'application complète.

## Objectif

Les walkthroughs servent à:
- Démontrer la sophistication technique du projet
- Communiquer la valeur business des fonctionnalités
- Offrir une expérience utilisateur optimale aux recruteurs et visiteurs
- Mettre en évidence les compétences en développement, architecture et UX

## Organisation du projet

Structure des dossiers :

```
Walkthrough/
├── README.md             # Documentation principale
├── SELECTORS.md          # Liste des sélecteurs CSS utilisés
├── index.js              # Point d'entrée pour initialiser les tours
├── demo.html             # Page de démonstration des walkthroughs
├── demo-assets/          # Ressources pour les maquettes améliorées
│   ├── css/              # Styles des maquettes
│   ├── js/               # Scripts d'interactions simulées
│   ├── img/              # Images et icônes
│   └── data/             # Données JSON de démonstration
├── shared/               # Ressources partagées
│   ├── css/              # Styles communs
│   └── js/               # Scripts partagés
├── assistant-ia/         # Walkthrough Assistant IA
│   ├── README.md         # Documentation spécifique
│   └── js/               # Scripts spécifiques
├── ocr-extraction/       # Walkthrough OCR et extraction
│   ├── README.md         # Documentation spécifique
│   └── js/               # Scripts spécifiques
├── messaging/            # Walkthrough Messagerie
│   ├── README.md         # Documentation spécifique
│   └── js/               # Scripts spécifiques
└── workflow-certificats/ # Walkthrough Workflow certificats
    ├── README.md         # Documentation spécifique
    └── js/               # Scripts spécifiques
```

## Fonctionnalités présentées

### 1. Assistant Virtuel IA
Interface conversationnelle intelligente utilisant les technologies d'IA pour assister les utilisateurs dans leurs démarches. Cette fonctionnalité démontre l'intégration d'Azure OpenAI avec une expérience utilisateur fluide et contextuelle.

### 2. OCR et Extraction Intelligente de Documents
Système d'analyse automatisée des documents commerciaux qui utilise la reconnaissance optique de caractères et des algorithmes d'extraction pour identifier et classer les informations clés.

### 3. Messagerie en Temps Réel avec Collaboration Documentaire
Système de communication instantanée permettant aux utilisateurs d'échanger avec les administrateurs et de collaborer sur des documents en temps réel, avec gestion d'état partagé.

### 4. Workflow de Création et Validation de Certificats
Processus complet de création, soumission et validation des certificats d'inspection et de conformité, intégrant gestion documentaire, validation multi-niveau et logique métier complexe.

## Implémentation avec Shepherd.js

Tous les walkthroughs sont implémentés en utilisant [Shepherd.js](https://shepherdjs.dev/), une bibliothèque légère et flexible pour créer des visites guidées interactives. Avantages de cette approche:

- **Intégration native**: Les guides s'intègrent directement dans l'interface utilisateur
- **Interaction en temps réel**: Les utilisateurs peuvent interagir avec l'application pendant la visite
- **Expérience progressive**: Découverte étape par étape des fonctionnalités
- **Personnalisation**: Adaptation visuelle et comportementale selon le contexte

Chaque walkthrough est configuré pour:
- Durer entre 2-4 minutes
- Permettre l'abandon à tout moment
- Offrir des informations contextuelles pertinentes
- S'adapter au niveau technique de l'utilisateur

## Comment utiliser les walkthroughs

Pour lancer un walkthrough:
1. Accédez à la page correspondante à la fonctionnalité
2. Cliquez sur le bouton "Découvrir cette fonctionnalité"
3. Suivez les instructions affichées à chaque étape
4. Naviguez entre les étapes avec les boutons "Précédent" et "Suivant"
5. Quittez à tout moment en cliquant sur "X"

## Technologies utilisées

- **Shepherd.js**: Bibliothèque principale pour les visites guidées
- **JavaScript (ES6+)**: Logique d'interaction et personnalisation
- **CSS3**: Styling et animations des popups et mises en évidence
- **Integration API**: Connexion avec le backend pour les données en temps réel

## Contact

Pour toute question concernant ces walkthroughs ou le projet YVEA, veuillez contacter [Votre Nom/Email].

## Utilisation

### Intégration dans l'application

Pour intégrer les tours guidés dans l'application, importez le module principal :

```javascript
import { initializeAllTours } from './Walkthrough';

// Initialiser tous les tours avec leurs déclencheurs par défaut
initializeAllTours();

// Ou avec des options personnalisées
initializeAllTours({
  ocrTriggerId: 'mon-bouton-ocr',
  messagingTriggerId: 'mon-bouton-messagerie',
  assistantTriggerId: 'mon-bouton-assistant',
  autoStart: 'ocr-extraction' // Démarrer automatiquement le tour OCR
});
```

### Démarrer un tour spécifique par programmation

```javascript
import { tourManager } from './Walkthrough';

// Démarrer un tour spécifique
tourManager.startTour('ocr-extraction');

// Arrêter le tour actif
tourManager.stopActiveTour();
```

### Utiliser un tour individuel

Si vous préférez n'utiliser qu'un seul tour, vous pouvez l'importer directement :

```javascript
import { initOcrTour, setupOcrTourTrigger } from './Walkthrough';

// Initialiser un tour sans le démarrer
const tour = initOcrTour();

// Configurer un déclencheur
setupOcrTourTrigger('mon-bouton-ocr');

// Démarrer le tour manuellement
tour.start();
```

## Personnalisation des tours

### Ajouter une nouvelle étape à un tour existant

Modifiez le fichier `steps.js` du tour concerné et ajoutez une nouvelle étape au tableau :

```javascript
// Exemple dans ocr-extraction/js/steps.js
const ocrSteps = [
  // Étapes existantes...
  
  // Nouvelle étape
  {
    id: 'nouvelle-etape',
    title: 'Titre de l\'étape',
    text: 'Description de l\'étape...',
    attachTo: {
      element: '.element-cible',
      on: 'bottom'
    },
    buttons: [
      // Configuration des boutons...
    ]
  }
];
```

### Créer un nouveau tour guidé

1. Créez un nouveau dossier pour votre tour (ex: `nouveau-tour/`)
2. Ajoutez les fichiers `js/steps.js` et `js/nouveau-tour.js`
3. Mettez à jour le fichier `index.js` principal pour exporter votre nouveau tour

## Gestion de l'état des tours

Les tours complétés sont enregistrés dans le localStorage pour éviter de les afficher plusieurs fois à l'utilisateur. Utilisez ces fonctions pour gérer cet état :

```javascript
import { isTourCompleted, resetTourCompletion } from './Walkthrough';

// Vérifier si un tour a été complété
if (isTourCompleted('ocr-extraction')) {
  console.log('L\'utilisateur a déjà vu le tour OCR');
}

// Réinitialiser un tour pour qu'il s'affiche à nouveau
resetTourCompletion('ocr-extraction');
```

## Personnalisation des styles

Les styles peuvent être personnalisés en modifiant le fichier `shared/css/shepherd-styles.css`. Assurez-vous d'importer ce fichier CSS dans votre application.

## Conseils de maintenance

1. Gardez les étapes concises et axées sur un seul concept à la fois
2. Utilisez des sélecteurs CSS robustes qui ne changeront pas souvent
3. Testez les tours après les mises à jour significatives de l'interface
4. Utilisez les classes CSS spécifiques (`yvea-step-intro`, `yvea-step-conclusion`) pour les étapes d'introduction et de conclusion

## Démonstration

Une page de démonstration (`demo.html`) est incluse pour permettre de tester tous les walkthroughs sans nécessiter l'application complète. Cette démo :

- Présente les quatre fonctionnalités principales de YVEA
- Inclut des maquettes visuellement attractives et interactives
- Utilise les mêmes sélecteurs CSS que ceux requis dans l'application réelle
- Simule les interactions utilisateur (glisser-déposer, progression, validation, etc.)
- Fonctionne sans backend grâce à des données prédéfinies
- Est responsive et adaptée aux différents appareils

Pour personnaliser les démonstrations :

1. Les styles sont définis dans `demo-assets/css/`
2. Les interactions sont gérées dans `demo-assets/js/`
3. Les données de démonstration sont dans `demo-assets/data/`
4. Les ressources visuelles sont stockées dans `demo-assets/img/`

Pour lancer la démo, ouvrez simplement le fichier `demo.html` dans un navigateur moderne. 