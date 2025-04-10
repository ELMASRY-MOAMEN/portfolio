# Portfolio Personnel Optimisé SEO

Un portfolio personnel moderne et élégant pour mettre en avant l'expertise en gestion de projets et product ownership, avec une optimisation SEO complète.

## Technologies utilisées

- **Next.js**: Framework React pour le rendu côté serveur et les performances optimales
- **TypeScript**: Pour un code typé et robuste
- **Tailwind CSS**: Pour une interface utilisateur réactive et moderne
- **ESLint**: Pour assurer la qualité du code

## Caractéristiques SEO

- **Méta-tags optimisés**: Toutes les pages disposent de balises title et description uniques
- **Données structurées JSON-LD**: Implémentation de Schema.org pour une meilleure compréhension par les moteurs de recherche
- **Sitemap XML dynamique**: Généré automatiquement pour indexer toutes les pages
- **Robots.txt**: Configuration pour guider les crawlers
- **Balises sémantiques HTML5**: Architecture respectant les standards du web pour une meilleure accessibilité
- **Images optimisées**: Attributs alt, dimensions et préchargement définis
- **Performance optimisée**: Animations légères et chargements optimisés

## Palette de couleurs

- Couleur primaire: `#0052FF`
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
  │    │    ├── page.tsx  (Page d'accueil)
  │    │    ├── layout.tsx (Layout principal avec méta-données SEO)
  │    │    └── sitemap.ts (Générateur de sitemap dynamique)
  │    ├── components/    (Composants réutilisables optimisés SEO)
  │    │    ├── Header.tsx
  │    │    ├── Footer.tsx
  │    │    ├── HeroSection.tsx
  │    │    ├── AboutSection.tsx
  │    │    └── ProjectsSection.tsx
  │    └── styles/        (Fichiers CSS globaux)
  ├── public/             (Assets et images)
  │    ├── images/        (Images optimisées pour le web)
  │    └── robots.txt     (Configuration pour les crawlers)
  ├── package.json        (Dépendances)
  ├── tsconfig.json       (Configuration TypeScript)
  ├── tailwind.config.js  (Configuration Tailwind)
  ├── postcss.config.js   (Configuration PostCSS)
  ├── next.config.js      (Configuration Next.js pour export statique)
  ├── netlify.toml        (Configuration de déploiement Netlify)
  └── README.md           (Documentation)
```

## Optimisation SEO des pages

Chaque page inclut:
- Balises title et description personnalisées
- Balises Open Graph pour le partage sur les réseaux sociaux
- Balises Twitter Card pour le partage sur Twitter
- URLs canoniques pour éviter le contenu dupliqué
- Balisage Schema.org approprié

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

Le code est optimisé pour être compatible avec une large gamme de navigateurs, en évitant des fonctionnalités ES6+ problématiques comme l'utilisation du spread operator avec les objets Set.

## Accessibilité et performance

- Design respectant les contrastes de couleurs recommandés pour l'accessibilité WCAG
- Animations légères pour une expérience fluide sans impact sur la performance
- Architecture modulaire pour une maintenance facile
- Responsive design pour tous les appareils
