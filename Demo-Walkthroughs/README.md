# YVEA Walkthroughs - Guide d'intégration au portfolio

Ce dossier contient une version adaptée et autonome des walkthroughs interactifs du projet YVEA, prête à être intégrée dans le portfolio.

## Vue d'ensemble

Les walkthroughs sont des visites guidées interactives présentant 4 fonctionnalités principales d'YVEA :
- Assistant Virtuel IA
- OCR et Extraction Intelligente
- Messagerie en Temps Réel
- Workflow de Certificats

Chaque walkthrough est implémenté avec Shepherd.js et permet aux visiteurs de découvrir les fonctionnalités sans avoir accès à l'application complète.

---

## Analyse technique et stratégie d'intégration au portfolio

### Architecture du portfolio
- **Framework** : Next.js (React, TypeScript, app directory, SSR/SSG, routage dynamique multilingue)
- **Styles** : Tailwind CSS (avec utilitaires personnalisés, animations CSS)
- **Composants** : Architecture modulaire, composants réutilisables, hooks personnalisés
- **Gestion des assets** : Images via `/public` et `next/image`, polices Google Fonts, styles globaux dans `src/styles/globals.css`
- **Build** : Next.js (Webpack)
- **Aucun usage actuel de Shepherd.js, localStorage ou walkthroughs**

### Structure de la page projet YVEA
- Composant principal : `YVEAProjectContent`
- Sections : Hero, visualisation interactive, timeline, résultats, avis, leçons, compétences, conclusion
- Responsive design via Tailwind, images adaptatives, animations (framer-motion)
- Pas de gestion d'état globale conflictuelle

### Contraintes techniques identifiées
- Les sélecteurs requis par les walkthroughs ne sont pas présents nativement dans le DOM de la page YVEA
- Shepherd.js doit être importé dynamiquement côté client (pas de SSR)
- Attention aux collisions de styles entre Shepherd.js et Tailwind
- Tester l'accessibilité (focus, navigation clavier, ARIA)

### Cartographie des sélecteurs (extrait)

| Sélecteur Walkthrough | Présent dans YVEA ? | Action à prévoir |
|----------------------|---------------------|------------------|
| .ocr-header          | Non                 | À ajouter        |
| .document-uploader   | Non                 | À ajouter        |
| .ocr-progress        | Non                 | À ajouter        |
| .assistant-icon      | Non                 | À ajouter        |
| .chatbox-container   | Non                 | À ajouter        |
| .messaging-header    | Non                 | À ajouter        |
| .conversation-list   | Non                 | À ajouter        |
| .certificats-header  | Non                 | À ajouter        |
| ...                  | ...                 | ...              |

**Remarque** : Ajoutez les `<div className="ocr-header">...</div>` et autres éléments dans les sections appropriées du composant React. Adaptez les walkthroughs si certains éléments sont dynamiques.

### Stratégie d'intégration recommandée
- **Insertion** : Ajouter les éléments requis (divs, boutons) dans le composant `YVEAProjectContent` aux endroits stratégiques (OCR, assistant, messagerie, certificats)
- **Activation** : Ajouter un bouton de déclenchement pour chaque walkthrough (ex: "Découvrir l'OCR")
- **Chargement** : Importer Shepherd.js et les modules walkthroughs dynamiquement côté client (éviter le SSR)
- **Styles** : Importer les styles Shepherd.js et spécifiques dans le layout global ou localement dans la page YVEA
- **Sélecteurs** : Adapter les sélecteurs dans les fichiers `steps.js` si la structure HTML diffère
- **Accessibilité** : Vérifier le focus, l'ordre de tabulation, le contraste, et les ARIA labels

### Ordre de priorité pour l'intégration
1. OCR et Extraction Intelligente
2. Assistant Virtuel IA
3. Messagerie en Temps Réel
4. Workflow de Certificats

### Conseils spécifiques
- Ajoutez les classes requises dans le DOM React (voir tableau ci-dessus)
- Initialisez les walkthroughs uniquement côté client (`useEffect` ou import dynamique)
- Préfixez les classes Shepherd si besoin pour éviter les conflits Tailwind
- Testez l'accessibilité et la performance après intégration

---

## Guide d'intégration

### 1. Installation des dépendances

Inclure Shepherd.js dans votre portfolio :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css"/>
<script src="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/js/shepherd.min.js"></script>
```

### 2. Configuration des styles

Ajouter les styles nécessaires :

```html
<link rel="stylesheet" href="Demo-Walkthroughs/shared/css/shepherd-styles.css"/>
<link rel="stylesheet" href="Demo-Walkthroughs/demo-assets/css/demo-styles.css"/>
<link rel="stylesheet" href="Demo-Walkthroughs/demo-assets/css/ocr-styles.css"/>
```

### 3. Adaptation des sélecteurs CSS

Les walkthroughs utilisent des sélecteurs CSS spécifiques (voir `SELECTORS.md`).
**Adaptez ces sélecteurs** pour qu'ils correspondent à la structure HTML de votre portfolio. Par exemple :
- `.ocr-header`, `.document-uploader`, `.ocr-progress`, etc. pour le walkthrough OCR
- `.assistant-icon`, `.chatbox-container`, etc. pour l'assistant IA

Si la structure diffère, modifiez les sélecteurs dans les fichiers `steps.js` de chaque walkthrough.

### 4. Initialisation des walkthroughs

Exemple pour initialiser le walkthrough OCR :

```html
<!-- Bouton de déclenchement -->
<button id="tour-ocr-trigger">Démarrer la visite OCR</button>

<!-- Import du module -->
<script type="module">
  import { initializeAllTours } from './index.js';
  document.addEventListener('DOMContentLoaded', () => {
    initializeAllTours({
      ocrTriggerId: 'tour-ocr-trigger'
    });
  });
</script>
```

Pour initialiser tous les tours, ajoutez les autres IDs de triggers :

```js
initializeAllTours({
  ocrTriggerId: 'tour-ocr-trigger',
  messagingTriggerId: 'tour-messaging-trigger',
  assistantTriggerId: 'tour-assistant-trigger',
  certificatsTriggerId: 'tour-certificats-trigger'
});
```

## Dépendances externes
- Shepherd.js v10.0.1 ([CDN](https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/))
- Aucune dépendance backend requise pour la démo

## Exemples d'utilisation des API principales

- Démarrer un tour par programmation :
```js
import { tourManager } from './index.js';
tourManager.startTour('ocr-extraction');
```
- Réinitialiser un tour :
```js
import { resetTourCompletion } from './index.js';
resetTourCompletion('ocr-extraction');
```

## Considérations de performance
- Les ressources sont chargées à la demande via les triggers
- Privilégier le lazy loading pour Shepherd.js et les assets si possible
- Nettoyer les ressources inutiles pour garder la structure légère

## Accessibilité
- Shepherd.js gère la navigation clavier et les ARIA labels de base
- Vérifiez le contraste et l'ordre de tabulation dans votre intégration
- Ajoutez des labels ARIA personnalisés si besoin

## Points d'attention techniques
- Vérifiez que tous les sélecteurs CSS existent dans votre DOM avant de lancer un tour
- Si localStorage est désactivé, la persistance de complétion ne fonctionnera pas
- En cas de modification majeure de l'UI, adaptez les fichiers `steps.js`
- Pour une intégration avancée, synchronisez l'état des tours avec votre routeur

## Critères d'acceptation
- La structure de démo est complète avec tous les fichiers nécessaires
- La documentation est claire, détaillée et couvre tous les aspects de l'intégration
- Les walkthroughs fonctionnent correctement dans la structure simplifiée
- Le fichier d'exemple d'intégration est fonctionnel et bien documenté

## Exemple minimal d'intégration (extrait de `integration-example.html`)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YVEA Walkthroughs - Exemple d'intégration minimal</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css"/>
  <link rel="stylesheet" href="shared/css/shepherd-styles.css"/>
  <link rel="stylesheet" href="demo-assets/css/demo-styles.css"/>
  <link rel="stylesheet" href="demo-assets/css/ocr-styles.css"/>
</head>
<body>
  <button id="tour-ocr-trigger">Démarrer la visite OCR</button>
  <div class="ocr-header">OCR et Extraction de Documents</div>
  <div class="document-uploader">Zone de dépôt de documents</div>
  <div class="ocr-progress">Progression du traitement OCR</div>
  <div class="extraction-preview">Aperçu des données extraites</div>
  <div class="correction-interface">Interface de correction</div>
  <div class="data-validation">Validation des données</div>
  <div class="export-options">Options d'export</div>
  <div class="export-formats">
    <span>Excel</span>
    <span>CSV</span>
    <span>JSON</span>
  </div>
  <div class="ocr-footer">OCR - Extraction intelligente</div>
  <script src="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/js/shepherd.min.js"></script>
  <script type="module">
    import { initializeAllTours } from './index.js';
    document.addEventListener('DOMContentLoaded', () => {
      initializeAllTours({
        ocrTriggerId: 'tour-ocr-trigger'
      });
    });
  </script>
</body>
</html> 
```

## Problèmes connus et solutions

### Chemins d'importation des fichiers JavaScript

Les walkthroughs utilisent des chemins d'importation relatifs pour charger leurs dépendances. Vérifiez attentivement les chemins dans les fichiers `workflow-tour.js` et autres fichiers similaires.

**Problème fréquent** : Chemin incorrect vers `shepherd-base.js`

- **Erreur** : `Module not found: Cannot find module "../../shared/js/shepherd-base.js"`
- **Solution** : Le chemin correct est `../../shared/shepherd-base.js` (sans le répertoire `js`)

Si vous rencontrez des erreurs similaires lors de la compilation, vérifiez la structure des répertoires et corrigez les chemins d'importation en conséquence.

```js
// INCORRECT
import { initShepherdBase } from '../../shared/js/shepherd-base.js';

// CORRECT 
import { initShepherdBase } from '../../shared/shepherd-base.js';
```

### Autres problèmes courants