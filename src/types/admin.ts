/**
 * Types pour l'administration et la gestion des contenus dynamiques
 */

// Types pour le système d'authentification
export interface AdminUser {
  username: string;
  role: 'admin' | 'editor';
}

export interface JWTPayload {
  sub: string;
  role: string;
  exp: number;
}

// Types pour le système d'images
export interface ImageMetadata {
  id: string;
  path: string;
  filename: string;
  alt: {
    fr: string;
    en: string;
  };
  category: string;
  size?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedAt: string;
  lastModified: string;
  tags: string[];
}

// Types pour le blog
export interface BlogPost {
  id: string;
  slug: { fr: string; en: string };
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  content: { fr: string; en: string };
  coverImage: string;
  author: string;
  categories: string[];
  tags: string[];
  published: boolean;
  publishedAt: string;
  lastModified: string;
  seo?: {
    metaTitle: { fr: string; en: string };
    metaDescription: { fr: string; en: string };
    keywords: { fr: string[]; en: string[] };
    canonicalUrl?: string;
  };
}

// Structure complète du stockage de données
export interface AdminDatabase {
  images: ImageMetadata[];
  blogPosts: BlogPost[];
  categories: string[];
  tags: string[];
  imageCategories: string[];
} 