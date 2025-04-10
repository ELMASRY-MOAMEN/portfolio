/**
 * Génère un schéma JSON-LD pour une personne (Schema.org)
 * @param {Object} personData - Données de la personne
 * @returns {Object} - Schéma JSON-LD
 */
export const generatePersonSchema = (personData: {
  name: string;
  jobTitle: string;
  url: string;
  image: string;
  company?: string;
  socialLinks?: string[];
  description?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personData.name,
    url: personData.url,
    image: personData.image,
    jobTitle: personData.jobTitle,
    worksFor: personData.company ? {
      '@type': 'Organization',
      name: personData.company
    } : undefined,
    sameAs: personData.socialLinks || [],
    description: personData.description || ''
  };
};

/**
 * Génère les métadonnées Open Graph pour une page
 * @param {Object} pageData - Données de la page
 * @returns {Object} - Métadonnées Open Graph
 */
export const generateOpenGraph = (pageData: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}) => {
  return {
    title: pageData.title,
    description: pageData.description,
    url: pageData.url,
    images: pageData.imageUrl ? [
      {
        url: pageData.imageUrl,
        width: 1200,
        height: 630,
        alt: pageData.title
      }
    ] : []
  };
}; 