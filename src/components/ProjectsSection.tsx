'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// Type pour les projets
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  link: string;
}

// Données des projets (à remplacer par vos propres projets)
const projects: Project[] = [
  {
    id: 'yvea',
    title: 'YVEA',
    subtitle: 'Plateforme d\'Intelligence Artificielle',
    description: 'Gestion de projet et product ownership pour une plateforme innovante d\'IA destinée à optimiser les processus métier.',
    imageUrl: '/images/projects/yvea.jpg', // À remplacer par les images de vos projets
    technologies: ['Product Ownership', 'Gestion Agile', 'UX/UI', 'Intelligence Artificielle'],
    category: 'Product Management',
    link: '/projets/yvea'
  },
  {
    id: 'may',
    title: 'MAY',
    subtitle: 'Consultant Virtuel Export EMEA',
    description: 'Développement d\'un assistant virtuel pour faciliter l\'exportation sur les marchés EMEA, utilisant des technologies de pointe.',
    imageUrl: '/images/projects/may.jpg',
    technologies: ['Gestion de Projet', 'Internationalisation', 'NLP', 'Conseil Stratégique'],
    category: 'Transformation Digitale',
    link: '/projets/may'
  },
  {
    id: 'sgs',
    title: 'SGS',
    subtitle: 'Refonte de Plateforme de Services',
    description: 'Pilotage de la refonte complète d\'une plateforme de services en ligne, avec focus sur l\'expérience utilisateur et la performance.',
    imageUrl: '/images/projects/sgs.jpg',
    technologies: ['Product Management', 'UX Design', 'Performance', 'API'],
    category: 'Refonte Web',
    link: '/projets/sgs'
  },
  {
    id: 'samsung',
    title: 'Samsung',
    subtitle: 'Optimisation de Parcours Client',
    description: 'Analyse et optimisation des parcours clients sur les plateformes digitales de Samsung, avec une approche data-driven.',
    imageUrl: '/images/projects/samsung.jpg',
    technologies: ['CX', 'Analyse de Données', 'A/B Testing', 'Optimisation de Conversion'],
    category: 'Expérience Client',
    link: '/projets/samsung'
  }
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Observer pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filtrer les projets par catégorie
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  // Générer la liste des catégories uniques - sans utiliser le spread operator avec Set
  const uniqueCategories = Array.from(new Set(projects.map(project => project.category)));
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
            Mes Projets
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto text-text-secondary ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            Découvrez une sélection de projets sur lesquels j'ai travaillé en tant que gestionnaire de projet 
            et product owner. Chaque projet illustre mon approche centrée sur les résultats et l'expérience utilisateur.
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
              {category === 'all' ? 'Tous les projets' : category}
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
                {/* Placeholder pour l'image du projet */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary-light text-primary">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Lorsque vous aurez des images */}
                {/* <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  itemProp="image"
                /> */}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-light text-primary">
                    {project.category}
                  </span>
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
                  href={project.link}
                  className="btn-primary text-sm"
                  itemProp="url"
                >
                  Voir le projet
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                {/* Données structurées SEO (invisibles) */}
                <meta itemProp="author" content="Votre Nom" />
                <meta itemProp="datePublished" content="2023-01-01" /> {/* À remplacer par la date réelle */}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bouton voir tous les projets */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
          <Link href="/projets" className="btn-secondary">
            Voir tous les projets
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