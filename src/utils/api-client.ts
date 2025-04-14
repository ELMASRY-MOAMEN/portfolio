/**
 * Utilitaires pour les appels API
 */
import type { ImageMetadata, BlogPost } from '@/types/admin';

// Cache pour les images
let imageCache: ImageMetadata[] | null = null;
let imageCacheExpiry = 0;

// Cache pour les articles de blog
let blogCache: BlogPost[] | null = null;
let blogCacheExpiry = 0;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

/**
 * Récupère les images depuis l'API avec mise en cache
 */
export async function fetchImages(): Promise<ImageMetadata[]> {
  const now = Date.now();
  
  // Utiliser le cache s'il est valide
  if (imageCache && now < imageCacheExpiry) {
    return imageCache;
  }
  
  try {
    const response = await fetch('/api/images');
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    
    const data = await response.json();
    imageCache = data;
    imageCacheExpiry = now + CACHE_DURATION;
    
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return imageCache || [];
  }
}

/**
 * Récupère une image spécifique par son ID
 */
export async function fetchImageById(id: string): Promise<ImageMetadata | null> {
  try {
    // Tenter d'abord de récupérer depuis le cache
    if (imageCache) {
      const cachedImage = imageCache.find(img => img.id === id);
      if (cachedImage) return cachedImage;
    }
    
    const response = await fetch(`/api/images/${id}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching image with ID ${id}:`, error);
    return null;
  }
}

/**
 * Récupère les articles de blog depuis l'API avec mise en cache
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const now = Date.now();
  
  // Utiliser le cache s'il est valide
  if (blogCache && now < blogCacheExpiry) {
    return blogCache;
  }
  
  try {
    const response = await fetch('/api/blog');
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    const data = await response.json();
    blogCache = data;
    blogCacheExpiry = now + CACHE_DURATION;
    
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return blogCache || [];
  }
}

/**
 * Récupère un article spécifique par son ID
 */
export async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    // Tenter d'abord de récupérer depuis le cache
    if (blogCache) {
      const cachedPost = blogCache.find(post => post.id === id);
      if (cachedPost) return cachedPost;
    }
    
    const response = await fetch(`/api/blog/${id}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    return null;
  }
}

/**
 * Trouve un article de blog par son slug
 */
export async function findBlogPostBySlug(slug: string, locale: string = 'fr'): Promise<BlogPost | null> {
  try {
    const posts = await fetchBlogPosts();
    
    return posts.find(post => 
      post.slug[locale as keyof typeof post.slug] === slug || 
      post.slug.fr === slug || 
      post.slug.en === slug
    ) || null;
  } catch (error) {
    console.error(`Error finding blog post with slug ${slug}:`, error);
    return null;
  }
} 