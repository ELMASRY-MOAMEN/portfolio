import { Handler } from '@netlify/functions';
import { authenticateUser, generateToken } from './utils/auth';

/**
 * Fonction d'authentification pour l'interface d'administration
 */
export const handler: Handler = async (event, context) => {
  // Vérifier la méthode
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  // Configurer les headers CORS pour le développement
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    // Extraire les identifiants de la requête
    const { username, password } = JSON.parse(event.body || '{}');
    
    if (!username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Username and password are required' })
      };
    }
    
    // Authentifier l'utilisateur
    const user = authenticateUser(username, password);
    
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: 'Invalid credentials' })
      };
    }
    
    // Générer un token JWT
    const token = generateToken(user);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Authentication successful',
        token,
        user: {
          username: user.username,
          role: user.role
        }
      })
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
}; 