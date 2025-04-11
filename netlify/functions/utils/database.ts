import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import type { AdminDatabase, ImageMetadata, BlogPost } from '../../../src/types/admin';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Chemin vers le fichier de base de données
const DB_PATH = path.join(__dirname, '../../data/db.json');

/**
 * Lit la base de données complète
 */
export async function readDatabase(): Promise<AdminDatabase> {
  try {
    const data = await readFile(DB_PATH, 'utf8');
    return JSON.parse(data) as AdminDatabase;
  } catch (error) {
    console.error('Error reading database:', error);
    // Retourner une base de données vide si le fichier n'existe pas encore
    return {
      images: [],
      blogPosts: [],
      categories: [],
      tags: [],
      imageCategories: []
    };
  }
}

/**
 * Écrit la base de données complète
 */
export async function writeDatabase(db: AdminDatabase): Promise<void> {
  try {
    await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to database:', error);
    throw new Error('Failed to update database');
  }
}

// Fonctions pour les images

/**
 * Récupère toutes les images
 */
export async function getImages(): Promise<ImageMetadata[]> {
  const db = await readDatabase();
  return db.images;
}

/**
 * Récupère une image par son ID
 */
export async function getImageById(id: string): Promise<ImageMetadata | null> {
  const db = await readDatabase();
  return db.images.find(img => img.id === id) || null;
}

/**
 * Ajoute une nouvelle image
 */
export async function addImage(image: ImageMetadata): Promise<ImageMetadata> {
  const db = await readDatabase();
  db.images.push(image);
  await writeDatabase(db);
  return image;
}

/**
 * Met à jour une image existante
 */
export async function updateImage(id: string, updates: Partial<ImageMetadata>): Promise<ImageMetadata | null> {
  const db = await readDatabase();
  const index = db.images.findIndex(img => img.id === id);
  
  if (index === -1) return null;
  
  db.images[index] = { ...db.images[index], ...updates, lastModified: new Date().toISOString() };
  await writeDatabase(db);
  return db.images[index];
}

/**
 * Supprime une image
 */
export async function deleteImage(id: string): Promise<boolean> {
  const db = await readDatabase();
  const initialLength = db.images.length;
  db.images = db.images.filter(img => img.id !== id);
  
  if (db.images.length === initialLength) return false;
  
  await writeDatabase(db);
  return true;
}

// Fonctions pour les articles de blog

/**
 * Récupère tous les articles de blog
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const db = await readDatabase();
  return db.blogPosts;
}

/**
 * Récupère un article par son ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const db = await readDatabase();
  return db.blogPosts.find(post => post.id === id) || null;
}

/**
 * Ajoute un nouvel article
 */
export async function addBlogPost(post: BlogPost): Promise<BlogPost> {
  const db = await readDatabase();
  db.blogPosts.push(post);
  await writeDatabase(db);
  return post;
}

/**
 * Met à jour un article existant
 */
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const db = await readDatabase();
  const index = db.blogPosts.findIndex(post => post.id === id);
  
  if (index === -1) return null;
  
  db.blogPosts[index] = { ...db.blogPosts[index], ...updates, lastModified: new Date().toISOString() };
  await writeDatabase(db);
  return db.blogPosts[index];
}

/**
 * Supprime un article
 */
export async function deleteBlogPost(id: string): Promise<boolean> {
  const db = await readDatabase();
  const initialLength = db.blogPosts.length;
  db.blogPosts = db.blogPosts.filter(post => post.id !== id);
  
  if (db.blogPosts.length === initialLength) return false;
  
  await writeDatabase(db);
  return true;
} 