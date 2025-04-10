import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.monportfolio.fr';
  
  // Liste des projets (à mettre à jour avec vos vrais projets)
  const projects = [
    { id: 'yvea', lastModified: new Date() },
    { id: 'may', lastModified: new Date() },
    { id: 'sgs', lastModified: new Date() },
    { id: 'samsung', lastModified: new Date() },
  ];

  // Pages principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projets`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Pages de projets
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projets/${project.id}`,
    lastModified: project.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...mainPages, ...projectPages];
} 