import { Project } from '@/types/project';

/**
 * Données des projets
 * Centralisées pour faciliter la maintenance
 */
export const projects: Project[] = [
  {
    id: 'yvea',
    title: 'YVEA',
    subtitle: 'Plateforme d\'Intelligence Artificielle',
    description: 'Gestion de projet et product ownership pour une plateforme innovante d\'IA destinée à optimiser les processus métier.',
    imageUrl: '/images/projects/yvea.jpg',
    technologies: ['Product Ownership', 'Gestion Agile', 'UX/UI', 'Intelligence Artificielle'],
    category: 'Product Management',
    link: '/projets/yvea',
    date: 'Janvier 2023',
    client: 'Entreprise Tech'
  },
  {
    id: 'may',
    title: 'MAY',
    subtitle: 'Consultant Virtuel Export EMEA',
    description: 'Développement d\'un assistant virtuel pour faciliter l\'exportation sur les marchés EMEA, utilisant des technologies de pointe.',
    imageUrl: '/images/projects/may.jpg',
    technologies: ['Gestion de Projet', 'Internationalisation', 'NLP', 'Conseil Stratégique'],
    category: 'Transformation Digitale',
    link: '/projets/may',
    date: 'Mars 2022',
    client: 'Cabinet Conseil'
  },
  {
    id: 'sgs',
    title: 'SGS',
    subtitle: 'Refonte de Plateforme de Services',
    description: 'Pilotage de la refonte complète d\'une plateforme de services en ligne, avec focus sur l\'expérience utilisateur et la performance.',
    imageUrl: '/images/projects/sgs.jpg',
    technologies: ['Product Management', 'UX Design', 'Performance', 'API'],
    category: 'Refonte Web',
    link: '/projets/sgs',
    date: 'Septembre 2021',
    client: 'SGS'
  },
  {
    id: 'samsung',
    title: 'Samsung',
    subtitle: 'Optimisation de Parcours Client',
    description: 'Analyse et optimisation des parcours clients sur les plateformes digitales de Samsung, avec une approche data-driven.',
    imageUrl: '/images/projects/samsung.jpg',
    technologies: ['CX', 'Analyse de Données', 'A/B Testing', 'Optimisation de Conversion'],
    category: 'Expérience Client',
    link: '/projets/samsung',
    date: 'Mai 2021',
    client: 'Samsung'
  }
];

/**
 * Récupère un projet par son ID
 * @param id ID du projet
 * @returns Le projet correspondant ou undefined si non trouvé
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

/**
 * Récupère toutes les catégories uniques de projets
 * @returns Un tableau de catégories uniques
 */
export const getProjectCategories = (): string[] => {
  return Array.from(new Set(projects.map(project => project.category)));
};

/**
 * Filtre les projets par catégorie
 * @param category Catégorie à filtrer (ou 'all' pour tous)
 * @returns Projets filtrés
 */
export const filterProjectsByCategory = (category: string): Project[] => {
  return category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);
}; 