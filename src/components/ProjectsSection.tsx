'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import OptimizedImage from './OptimizedImage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Project } from '@/types/project';
import { projects, getProjectCategories, filterProjectsByCategory } from '@/data/projects';
import { useTranslation } from '@/hooks/useTranslation';

const ProjectsSection = () => {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const { t, locale } = useTranslation();

  // Préfixe de langue pour les URLs
  const langPrefix = `/${locale}`;

  // Filtrer les projets par catégorie en utilisant la fonction utilitaire
  const filteredProjects = filterProjectsByCategory(filter);

  // Générer la liste des catégories uniques
  const uniqueCategories = getProjectCategories();
  const categories = ['all'].concat(uniqueCategories);

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="section-padding bg-primary-light"
      aria-labelledby="projects-heading"
    >
      <div className="container-custom">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 
            id="projects-heading"
            className={`inline-block relative ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            {t.projects.title}
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto text-text-secondary ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            {t.projects.description}
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className={`flex flex-wrap justify-center gap-4 mb-10 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-secondary hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? t.projects.allProjectsFilter : category}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`card bg-white overflow-hidden transition-all ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <div className="relative h-60">
                <OptimizedImage
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  itemProp="image"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-light text-primary">
                    {project.category}
                  </span>
                  {project.client && (
                    <span className="ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary">
                      {project.client}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-unbounded font-bold mb-2 text-text-primary" itemProp="name">
                  {project.title}
                </h3>
                
                <p className="text-lg font-medium text-primary mb-3" itemProp="alternativeHeadline">
                  {project.subtitle}
                </p>
                
                <p className="text-text-secondary mb-4" itemProp="description">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs font-bricolage px-2 py-1 rounded bg-gray-100 text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`${langPrefix}${project.link}`}
                  className="btn-primary text-sm"
                  itemProp="url"
                >
                  {t.projects.viewProject}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                {/* Données structurées SEO (invisibles) */}
                <meta itemProp="author" content="Moamen Elmasry" />
                <meta itemProp="datePublished" content={project.date || '2023-01-01'} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Bouton voir tous les projets */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
          <Link href={`${langPrefix}/projets`} className="btn-secondary">
            {t.projects.allProjects}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 