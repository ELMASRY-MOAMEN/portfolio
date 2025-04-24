# Walkthrough Workflow de Certificats

Ce dossier contient les fichiers nécessaires pour le walkthrough de la fonctionnalité de création et validation de certificats de YVEA.

## Description fonctionnelle

Le walkthrough du workflow de certificats guide l'utilisateur à travers le processus complet de création, soumission et suivi des certificats :

1. **Création d'un certificat** - Comment initier une nouvelle demande de certificat
2. **Sélection du type** - Choix du type de certificat adapté aux besoins
3. **Saisie des informations** - Renseignement des données de base du certificat
4. **Ajout de produits** - Ajout et configuration des produits concernés
5. **Documents justificatifs** - Téléchargement des pièces justificatives requises
6. **Validation préliminaire** - Vérification automatique de la conformité
7. **Soumission** - Finalisation et envoi de la demande de certificat
8. **Suivi de statut** - Visualisation et gestion du cycle de vie du certificat

## Structure du dossier

```
workflow-certificats/
├── js/
│   ├── steps.js              # Définition des étapes du walkthrough
│   └── workflow-tour.js      # Configuration et initialisation du tour
└── README.md                 # Ce fichier
```

## Valeur technique

Ce walkthrough met en évidence plusieurs aspects techniques clés :

- **Validation dynamique des formulaires** - Vérification en temps réel des données
- **Moteur de règles métier** - Application des contraintes réglementaires spécifiques
- **Gestion d'états complexes** - Suivi des différentes étapes d'approbation
- **Signature électronique** - Intégration de solutions de signature électronique sécurisée
- **Génération de documents PDF** - Création automatique de certificats conformes

## Valeur business

Le walkthrough démontre les avantages business suivants :

- **Réduction de 65% du temps de traitement** des demandes de certificats
- **Diminution de 80% des rejets** grâce à la validation préliminaire
- **Vision centralisée** de tous les certificats et leur statut
- **Conformité accrue** avec les exigences réglementaires
- **Traçabilité complète** de l'historique des certificats pour les audits

## Sélecteurs CSS utilisés

Pour fonctionner correctement, ce walkthrough requiert les sélecteurs suivants dans le DOM :

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

## Utilisation

Pour intégrer ce walkthrough dans une page :

```javascript
import { initCertificatsTour, setupCertificatsTourTrigger } from '../Walkthrough';

// Option 1: Configurer un déclencheur sur un élément existant
setupCertificatsTourTrigger('mon-bouton-aide-certificats');

// Option 2: Démarrer le tour programmatiquement
const tour = initCertificatsTour();
tour.start();
```

## Personnalisation

Pour modifier les étapes du tour, éditez le fichier `js/steps.js`. Chaque étape est un objet avec les propriétés suivantes :

- `id` - Identifiant unique de l'étape
- `title` - Titre affiché en haut de l'étape
- `text` - Contenu HTML explicatif
- `attachTo` - Élément auquel l'étape est attachée et position
- `buttons` - Actions disponibles pour l'utilisateur
- `classes` - Classes CSS appliquées à l'étape

## Tests et validation

Lors des tests, assurez-vous que :

1. Tous les éléments ciblés sont présents dans le DOM
2. Les étapes s'affichent correctement sur différentes tailles d'écran
3. La navigation fonctionne (suivant, précédent, quitter)
4. Le tour reste cohérent à travers les différentes étapes du workflow (création, édition, soumission) 