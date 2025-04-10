/**
 * Interface pour les projets du portfolio
 */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  link: string;
  date?: string; // Date optionnelle du projet
  client?: string; // Client optionnel
}

/**
 * Interface pour le filtrage des projets
 */
export interface ProjectFilters {
  category: string;
} 