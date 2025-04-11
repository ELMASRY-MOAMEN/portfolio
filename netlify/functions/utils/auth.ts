import * as jwt from 'jsonwebtoken';
import type { AdminUser, JWTPayload } from '../../../src/types/admin';

// Configuration des utilisateurs (à remplacer par un système de gestion des utilisateurs plus robuste)
const ADMIN_USERS = {
  admin: {
    username: 'admin',
    role: 'admin' as const
  }
};

/**
 * Génère un token JWT pour un utilisateur authentifié
 */
export const generateToken = (user: AdminUser): string => {
  const payload: JWTPayload = {
    sub: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 24 heures
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret-key');
};

/**
 * Vérifie la validité d'un token JWT
 */
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key') as JWTPayload;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

/**
 * Authentifie un utilisateur avec ses identifiants
 */
export const authenticateUser = (username: string, password: string): AdminUser | null => {
  // Simple vérification pour le développement
  // Dans un environnement de production, utiliser un système d'authentification sécurisé
  if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
    return ADMIN_USERS[username];
  }
  
  return null;
}; 