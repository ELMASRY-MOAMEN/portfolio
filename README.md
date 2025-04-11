# Portfolio Personnel Haut de Gamme avec Animations Avancées

Un portfolio personnel moderne, élégant et interactif mettant en valeur l'expertise en gestion de projets et product ownership, avec animations premium et effets visuels sophistiqués.

## Technologies utilisées

- **Next.js**: Framework React pour le rendu côté serveur et les performances optimales
- **TypeScript**: Pour un code typé et robuste
- **Tailwind CSS**: Pour une interface utilisateur réactive et moderne
- **Framer Motion**: Pour des animations fluides et des interactions avancées
- **GSAP**: Pour des animations de défilement sophistiquées
- **ESLint**: Pour assurer la qualité du code
- **Internationalisation**: Support multilingue (français et anglais)

## Caractéristiques UI/UX Premium

- **Animations réactives**: Effets d'apparition, défilement, et micro-interactions
- **Fond particules animé**: Éléments visuels dynamiques en arrière-plan
- **Effet machine à écrire**: Animation de texte dynamique pour les titres
- **Cartes statistiques animées**: Avec compteurs numériques animés
- **Profil interactif**: Image de profil avec badges flottants et effets de survol
- **Effets neumorphiques**: Cartes avec reliefs subtils et ombres douces
- **Effet glassmorphisme**: Éléments translucides avec flou d'arrière-plan
- **Texte défilant**: Bandes de texte avec défilement horizontal au scroll
- **Bordures animées**: Transitions subtiles sur les liens et boutons
- **Texte en dégradé**: Titres avec dégradés de couleurs animés
- **Sections animées au défilement**: Apparition progressive des contenus

## Caractéristiques SEO

- **Méta-tags optimisés**: Toutes les pages disposent de balises title et description uniques
- **Données structurées JSON-LD**: Implémentation de Schema.org pour une meilleure compréhension par les moteurs de recherche
- **Sitemap XML dynamique**: Généré automatiquement pour indexer toutes les pages
- **Robots.txt**: Configuration pour guider les crawlers
- **Balises sémantiques HTML5**: Architecture respectant les standards du web pour une meilleure accessibilité
- **Images optimisées**: Attributs alt, dimensions et préchargement définis
- **Performance optimisée**: Animations légères et chargements optimisés
- **Routes localisées**: URLs optimisées pour chaque langue (/fr/, /en/)

## Architecture des animations

Le projet utilise une architecture modulaire pour les animations et effets:

- **Composants d'animation réutilisables**:
  - `ParticlesBackground`: Fond de particules animées et réactives
  - `TypeWriter`: Animation de machine à écrire pour texte dynamique
  - `AnimatedProfile`: Image de profil avec badges animés
  - `AnimatedStatsCard`: Cartes statistiques avec comptage animé
  - `AnimatedSection`: Sections avec apparition au défilement
  - `ScrollingText`: Texte défilant lors du scroll
  - `AnimatedButton`: Boutons avec effets de survol avancés

- **Styles d'animation**:
  - Animations CSS personnalisées (fade, float, slide, etc.)
  - Animation Tailwind intégrées
  - Effets visuels (neumorphisme, glassmorphisme, grain de texture)
  - Effets de texte (gradient, shadow, typing)

## Internationalisation (i18n)

Le site est entièrement disponible en français et en anglais avec:

- **Détection automatique de la langue** du navigateur
- **Sélecteur de langue** dans l'en-tête permettant de basculer entre les langues
- **URLs localisées** pour chaque contenu (/fr/projets, /en/projects, etc.)
- **Métadonnées SEO** adaptées à chaque langue
- **Structure modulaire** des fichiers de traduction pour faciliter la maintenance

Configuration :
- Langue par défaut : Français
- Langues supportées : Français, Anglais
- Fichiers de traduction : `/src/data/translations.json`

## Palette de couleurs

- Couleur primaire: `#0052FF`
- Couleur primaire sombre: `#0043cc`
- Couleur primaire light: `#EBF1FF`
- Texte principal: `#1E293B`
- Texte secondaire: `#64748B`
- Fond général: `#FFFFFF`

## Typographies

- Titres et éléments impactants: **Unbounded**
- Texte courant et CTA: **Bricolage Grotesque**

## Structure du projet

```
Portfolio/
  ├── src/
  │    ├── app/           (Pages de l'application avec le routage Next.js)
  │    │    ├── page.tsx  (Redirection vers la langue par défaut)
  │    │    ├── [lang]/   (Pages spécifiques à chaque langue)
  │    │    │    ├── page.tsx  (Page d'accueil - structure serveur)
  │    │    │    ├── layout.tsx (Layout spécifique à chaque langue)
  │    │    │    ├── params.ts  (Configuration des langues)
  │    │    │    └── a-propos/  (Pages de contenu localisées)
  │    │    └── sitemap.ts (Générateur de sitemap dynamique)
  │    ├── components/    (Composants réutilisables)
  │    │    ├── Header.tsx
  │    │    ├── Footer.tsx
  │    │    ├── LanguageSwitcher.tsx (Sélecteur de langue)
  │    │    ├── effects/   (Composants d'effets visuels)
  │    │    │    ├── ParticlesBackground.tsx
  │    │    │    ├── ScrollingText.tsx
  │    │    │    └── TypeWriter.tsx
  │    │    ├── layout/    (Composants de mise en page)
  │    │    │    └── AnimatedSection.tsx
  │    │    ├── pages/     (Composants spécifiques aux pages)
  │    │    │    └── HomeContent.tsx (Contenu client-side de la homepage)
  │    │    ├── profile/   (Composants pour la section profil)
  │    │    │    └── AnimatedProfile.tsx
  │    │    ├── stats/     (Composants pour les statistiques)
  │    │    │    └── AnimatedStatsCard.tsx
  │    │    ├── ui/        (Composants d'interface réutilisables)
  │    │    │    └── animated-button.tsx
  │    │    ├── hero/      (Composants modulaires pour la section héro)
  │    │    │    ├── GatewayCard.tsx
  │    │    │    ├── GatewayGrid.tsx
  │    │    │    ├── HeroCTA.tsx
  │    │    │    ├── HeroHeader.tsx
  │    │    │    ├── HeroLink.tsx
  │    │    │    ├── HeroSection.tsx
  │    │    │    ├── HeroStatistics.tsx
  │    │    │    ├── ProfileImage.tsx
  │    │    │    └── index.ts
  │    │    ├── data/
  │    │    │    └── translations.json (Fichier de traductions)
  │    │    ├── hooks/
  │    │    │    ├── useTranslation.ts (Hook personnalisé pour les traductions)
  │    │    │    ├── useTypingEffect.ts (Effet de frappe pour les textes)
  │    │    │    └── useLoadAnimation.ts (Animation au chargement des éléments)
  │    │    ├── types/
  │    │    │    └── hero.ts   (Types TypeScript pour les composants héro)
  │    │    ├── utils/
  │    │    │    └── cn.ts     (Utilitaire pour la fusion de classes Tailwind)
  │    │    ├── middleware.ts  (Middleware pour la redirection linguistique)
  │    │    └── styles/        (Fichiers CSS globaux)
  │    │         ├── globals.css (Styles globaux et base Tailwind)
  │    │         └── animations.css (Styles d'animation spécifiques)
  │    ├── public/             (Assets et images)
  │    │    ├── images/        (Images optimisées pour le web)
  │    │    └── robots.txt     (Configuration pour les crawlers)
  │    ├── package.json        (Dépendances)
  │    ├── tsconfig.json       (Configuration TypeScript)
  │    ├── tailwind.config.js  (Configuration Tailwind avec animations)
  │    ├── postcss.config.js   (Configuration PostCSS)
  │    ├── next.config.js      (Configuration Next.js pour export statique)
  │    ├── next-i18next.config.js (Configuration i18n)
  │    ├── netlify.toml        (Configuration de déploiement Netlify)
  │    └── README.md           (Documentation)
```

## Architecture Client-Server

Pour optimiser les performances et la compatibilité SEO, le projet implémente une séparation efficace entre:

- **Composants serveur**: Pour le SEO et le rendu initial (Page principale)
- **Composants client**: Pour les animations et interactions avancées (HomeContent)

Cette architecture permet de bénéficier des avantages du rendu côté serveur pour le référencement tout en offrant une expérience utilisateur interactive et animée.

## Optimisation SEO des pages

Chaque page inclut:
- Balises title et description personnalisées
- Balises Open Graph pour le partage sur les réseaux sociaux
- Balises Twitter Card pour le partage sur Twitter
- URLs canoniques pour éviter le contenu dupliqué
- Balisage Schema.org approprié
- Alternatives linguistiques avec balises hreflang

## Commandes disponibles

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement (port 4000)
npm run dev

# Construction pour la production
npm run build

# Démarrage du serveur de production
npm run start

# Linter
npm run lint

# Déploiement sur Netlify
netlify deploy --prod
```

## Configuration du déploiement

### Export statique avec Next.js

Le projet est configuré pour générer un site statique avec Next.js en utilisant le paramètre `output: 'export'` dans `next.config.js`.

### Déploiement sur Netlify

Ce projet est déployé sur Netlify avec les configurations suivantes :

- **Fichier `netlify.toml`** : Définit les paramètres de build et de déploiement
- **Dossier de publication** : `out` (généré par Next.js lors du build)
- **Commande de build** : `npm run build`
- **Redirections** : Configuration pour une SPA (Single Page Application)
- **Headers sécurisés** : X-Frame-Options, Content-Security-Policy, etc.

Pour déployer manuellement :
1. `npm run build` pour générer le dossier `out`
2. `netlify deploy --prod` pour déployer sur Netlify

### Compatibilité navigateurs

- Design responsive adapté à tous les appareils et tailles d'écran
- Tests de compatibilité cross-browser (Chrome, Firefox, Safari, Edge)
- Animations dégradables pour maintenir la fonctionnalité sur des navigateurs moins avancés

## Accessibilité et performance

- Animations optimisées avec techniques de debouncing et throttling
- Chargement progressif des composants avec lazy loading
- Optimisation des animations CSS avec will-change et hardware acceleration
- Séparation client/serveur pour optimiser le rendu initial
- Support ARIA pour les éléments interactifs
- Design respectant les contrastes WCAG

## Extension du support linguistique

Pour ajouter une nouvelle langue au site:

1. Ajouter le code de langue dans `src/app/[lang]/params.ts`
2. Ajouter les traductions dans `src/data/translations.json`
3. Mettre à jour la configuration dans `next-i18next.config.js`
4. Adapter les redirections dans `src/middleware.ts` si nécessaire

## CMS pour Gestion des Images et du Blog

Un système de gestion de contenu (CMS) a été partiellement implémenté pour permettre une mise à jour facile des images et du contenu blog.

### Fonctionnalités implémentées (60-70% complétées)

- **Backend API (Netlify Functions)**:
  - Système d'authentification avec JWT
  - Points d'accès API pour opérations CRUD d'images et d'articles de blog
  - Utilitaires de base de données basés sur JSON pour stockage de métadonnées
  - Configuration dans `netlify.toml` pour supporter les fonctions serverless

- **Composants Frontend**:
  - Composant `ImageManager` pour l'affichage d'images dynamiques
  - Intégration avec les composants existants comme `ProfileImage`
  - Gestion des erreurs et mise en cache d'images
  - Support multilingue intégré aux composants du CMS

### Fonctionnalités restantes à développer

- **Interface d'administration**:
  - UI complète pour l'authentification des administrateurs
  - Interface de gestion des images (téléchargement, modification, suppression)
  - Interface pour création/édition d'articles de blog
  - Tableau de bord avec statistiques

- **Gestion de fichiers**:
  - Téléchargement de fichiers pour les images
  - Optimisation et traitement d'images (redimensionnement, compression)
  - Système de stockage de fichiers intégré (peut utiliser Netlify Large Media)

- **Fonctionnalités blog avancées**:
  - Éditeur de texte riche pour les articles
  - Système de catégories et tags
  - Pagination et recherche
  - Prévisualisation des articles

### Architecture technique

Le CMS utilise une architecture serverless avec Netlify Functions pour les opérations backend. Les données sont stockées dans des fichiers JSON structurés. Le frontend est intégré nativement dans l'application Next.js existante.

Pour continuer le développement:
1. Les fichiers de fonction sont dans le dossier `/netlify/functions/`
2. Les composants frontend du CMS sont dans `/src/components/cms/`
3. Les types et interfaces sont définis dans `/src/types/cms.ts`
4. La configuration d'authentification est dans `/netlify/functions/auth.js`
