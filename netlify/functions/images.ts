import { Handler } from '@netlify/functions';
import { verifyToken } from './utils/auth';
import { getImages, getImageById, addImage, updateImage, deleteImage } from './utils/database';
import { v4 as uuidv4 } from 'uuid';
import type { ImageMetadata } from '../../src/types/admin';

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
 * Fonction API pour la gestion des images
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

  // Extraire l'ID de l'image de l'URL s'il est présent
  const path = event.path;
  let imageId = null;
  
  if (path.startsWith('/.netlify/functions/images/')) {
    imageId = path.split('/').pop();
  }

  try {
    // GET: Récupérer toutes les images
    if (event.httpMethod === 'GET' && !imageId) {
      const images = await getImages();
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Cache-Control': 'public, max-age=300' // Cache de 5 minutes
        },
        body: JSON.stringify(images)
      };
    }
    
    // GET: Récupérer une image spécifique
    if (event.httpMethod === 'GET' && imageId) {
      const image = await getImageById(imageId);
      
      if (!image) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Image not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Cache-Control': 'public, max-age=300'
        },
        body: JSON.stringify(image)
      };
    }
    
    // POST: Ajouter une nouvelle image
    if (event.httpMethod === 'POST') {
      const imageData = JSON.parse(event.body || '{}');
      
      // Validation des données
      if (!imageData.path || !imageData.alt) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing required fields' })
        };
      }
      
      const now = new Date().toISOString();
      
      const newImage: ImageMetadata = {
        id: uuidv4(),
        path: imageData.path,
        filename: imageData.filename || imageData.path.split('/').pop() || '',
        alt: imageData.alt,
        category: imageData.category || 'uncategorized',
        size: imageData.size || 0,
        dimensions: imageData.dimensions || undefined,
        uploadedAt: now,
        lastModified: now,
        tags: imageData.tags || []
      };
      
      const savedImage = await addImage(newImage);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(savedImage)
      };
    }
    
    // PUT: Mettre à jour une image
    if (event.httpMethod === 'PUT' && imageId) {
      const updates = JSON.parse(event.body || '{}');
      const updatedImage = await updateImage(imageId, updates);
      
      if (!updatedImage) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Image not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(updatedImage)
      };
    }
    
    // DELETE: Supprimer une image
    if (event.httpMethod === 'DELETE' && imageId) {
      const deleted = await deleteImage(imageId);
      
      if (!deleted) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Image not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Image deleted successfully' })
      };
    }
    
    // Méthode non autorisée
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in images API:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
}; 