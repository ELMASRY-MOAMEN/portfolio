import { Handler } from '@netlify/functions';
import { verifyToken } from './utils/auth';
import { getBlogPosts, getBlogPostById, addBlogPost, updateBlogPost, deleteBlogPost } from './utils/database';
import { v4 as uuidv4 } from 'uuid';
import type { BlogPost } from '../../src/types/admin';

// Headers CORS pour le développement
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

// Middleware de vérification d'authentification
const isAuthenticated = (event) => {
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
};

/**
 * Fonction API pour la gestion des articles de blog
 */
export const handler: Handler = async (event, context) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Vérification de l'authentification pour toutes les requêtes modifiant les données
  if (event.httpMethod !== 'GET') {
    const payload = isAuthenticated(event);
    if (!payload) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: 'Unauthorized' })
      };
    }
  }

  // Extraire l'ID de l'article de l'URL s'il est présent
  const path = event.path;
  let postId = null;
  
  if (path.startsWith('/.netlify/functions/blog/')) {
    postId = path.split('/').pop();
  }

  try {
    // GET: Récupérer tous les articles
    if (event.httpMethod === 'GET' && !postId) {
      const posts = await getBlogPosts();
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Cache-Control': 'public, max-age=300' // Cache de 5 minutes
        },
        body: JSON.stringify(posts)
      };
    }
    
    // GET: Récupérer un article spécifique
    if (event.httpMethod === 'GET' && postId) {
      const post = await getBlogPostById(postId);
      
      if (!post) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Blog post not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Cache-Control': 'public, max-age=300'
        },
        body: JSON.stringify(post)
      };
    }
    
    // POST: Ajouter un nouvel article
    if (event.httpMethod === 'POST') {
      const postData = JSON.parse(event.body || '{}');
      
      // Validation des données
      if (!postData.title || !postData.content) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing required fields' })
        };
      }
      
      const now = new Date().toISOString();
      
      // Générer des slugs à partir des titres
      const slugFr = postData.slug?.fr || generateSlug(postData.title.fr);
      const slugEn = postData.slug?.en || generateSlug(postData.title.en);
      
      const newPost: BlogPost = {
        id: uuidv4(),
        slug: { 
          fr: slugFr, 
          en: slugEn 
        },
        title: postData.title,
        description: postData.description || { fr: '', en: '' },
        content: postData.content,
        coverImage: postData.coverImage || '',
        author: postData.author || '',
        categories: postData.categories || [],
        tags: postData.tags || [],
        published: postData.published || false,
        publishedAt: postData.published ? now : '',
        lastModified: now,
        seo: postData.seo || {
          metaTitle: { fr: postData.title.fr, en: postData.title.en },
          metaDescription: { fr: '', en: '' },
          keywords: { fr: [], en: [] }
        }
      };
      
      const savedPost = await addBlogPost(newPost);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(savedPost)
      };
    }
    
    // PUT: Mettre à jour un article
    if (event.httpMethod === 'PUT' && postId) {
      const updates = JSON.parse(event.body || '{}');
      
      // Si le statut published passe à true, définir publishedAt
      if (updates.published === true) {
        const post = await getBlogPostById(postId);
        if (post && !post.publishedAt) {
          updates.publishedAt = new Date().toISOString();
        }
      }
      
      const updatedPost = await updateBlogPost(postId, updates);
      
      if (!updatedPost) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Blog post not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(updatedPost)
      };
    }
    
    // DELETE: Supprimer un article
    if (event.httpMethod === 'DELETE' && postId) {
      const deleted = await deleteBlogPost(postId);
      
      if (!deleted) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Blog post not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Blog post deleted successfully' })
      };
    }
    
    // Méthode non autorisée
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in blog API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

/**
 * Génère un slug à partir d'un titre
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/[\s_-]+/g, '-') // Remplacer les espaces et underscores par des tirets
    .replace(/^-+|-+$/g, ''); // Supprimer les tirets au début et à la fin
} 