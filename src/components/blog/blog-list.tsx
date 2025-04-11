'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchBlogPosts } from '@/utils/api-client';
import { ImageManager } from '@/components/ui/image-manager';
import type { BlogPost } from '@/types/admin';

interface BlogListProps {
  category?: string;
  tag?: string;
  limit?: number;
}

/**
 * Composant pour afficher une liste d'articles de blog
 */
export function BlogList({ category, tag, limit }: BlogListProps) {
  const params = useParams();
  const locale = params.lang as string || 'fr';
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let allPosts = await fetchBlogPosts();
        
        // Filter published posts only
        allPosts = allPosts.filter(post => post.published);
        
        // Filter by category if provided
        if (category) {
          allPosts = allPosts.filter(post => 
            post.categories.some(cat => 
              cat.toLowerCase() === category.toLowerCase()
            )
          );
        }
        
        // Filter by tag if provided
        if (tag) {
          allPosts = allPosts.filter(post => 
            post.tags.some(t => 
              t.toLowerCase() === tag.toLowerCase()
            )
          );
        }
        
        // Sort by publish date (newest first)
        allPosts.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        
        // Apply limit if provided
        if (limit) {
          allPosts = allPosts.slice(0, limit);
        }
        
        setPosts(allPosts);
      } catch (error) {
        setError('Erreur lors du chargement des articles');
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, [category, tag, limit, locale]);
  
  if (isLoading) {
    // Skeleton loader
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card overflow-hidden bg-white animate-pulse">
            <div className="h-48 w-full bg-gray-200"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 w-full bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-red-600 mb-2">{error}</p>
        <p className="text-text-secondary">
          {locale === 'fr' 
            ? 'Veuillez réessayer ultérieurement.' 
            : 'Please try again later.'}
        </p>
      </div>
    );
  }

  // Si aucun article n'est trouvé, afficher un message
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-semibold mb-2">
          {locale === 'fr' 
            ? 'Aucun article disponible pour le moment.' 
            : 'No articles available at the moment.'}
        </p>
        <p className="text-text-secondary">
          {locale === 'fr' 
            ? 'Revenez bientôt pour découvrir de nouveaux contenus.' 
            : 'Check back soon for new content.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="card overflow-hidden bg-white hover:shadow-lg transition-shadow">
          <div className="relative h-48 w-full">
            <ImageManager
              src={post.coverImage}
              alt={post.title[locale] || post.title.fr}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-primary text-sm font-medium">
                {post.categories[0] || (locale === 'fr' ? 'Article' : 'Article')}
              </span>
              <span className="text-text-secondary text-sm">
                {new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <h2 className="font-unbounded text-xl font-bold mb-3 line-clamp-2">
              {post.title[locale] || post.title.fr}
            </h2>
            <p className="text-text-secondary mb-4 line-clamp-3">
              {post.description[locale] || post.description.fr}
            </p>
            <Link 
              href={`/${locale}/blog/${post.slug[locale] || post.slug.fr}`}
              className="text-primary font-medium hover:underline inline-flex items-center"
            >
              {locale === 'fr' ? 'Lire l\'article' : 'Read article'}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
} 