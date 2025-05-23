import React, { useState } from 'react';
import { HiCode, HiDatabase, HiLightBulb, HiServer, HiUser, HiInformationCircle, HiX } from 'react-icons/hi';

// Design System simplifié
const DESIGN_TOKENS = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  colors: {
    primary: '#3b82f6',
    success: '#10b981', 
    warning: '#f59e0b',
    purple: '#8b5cf6',
    gray: '#6b7280',
    indigo: '#6366f1',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
} as const;

// Types
interface ServiceNodeProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  tags: string[];
  variant: 'primary' | 'success' | 'warning' | 'purple';
  info?: string;
  className?: string;
}

interface TooltipProps {
  content: string;
  isVisible: boolean;
  onClose: () => void;
}

// Composant Tooltip
const Tooltip: React.FC<TooltipProps> = ({ content, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-sm max-w-xs -top-20 left-1/2 transform -translate-x-1/2"
      role="tooltip"
      aria-live="polite"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-gray-800">Information</span>
        <button
          onClick={onClose}
          aria-label="Fermer l'info-bulle"
          className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
        >
          <HiX className="w-4 h-4" />
        </button>
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
      
      {/* Arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
    </div>
  );
};

// Composant Service Node
const ServiceNode: React.FC<ServiceNodeProps> = ({ 
  icon, 
  title, 
  description, 
  tags, 
  variant, 
  info,
  className = "" 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const variantStyles = {
    primary: 'bg-blue-50 border-blue-300 text-blue-700',
    success: 'bg-green-50 border-green-300 text-green-700', 
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-700',
    purple: 'bg-purple-50 border-purple-300 text-purple-700',
  };

  return (
    <div 
      className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${variantStyles[variant]} ${className}`}
      style={{ minHeight: '140px' }}
      role="article"
      aria-label={`${title}: ${description}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 shadow-sm mr-3">
            {React.cloneElement(icon, { className: "w-6 h-6", 'aria-hidden': true })}
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">{title}</h3>
          </div>
        </div>
        
        {info && (
          <div className="relative">
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              aria-label={`Plus d'informations sur ${title}`}
              aria-expanded={showTooltip}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
            >
              <HiInformationCircle className="w-5 h-5" aria-hidden="true" />
            </button>
            
            <Tooltip
              content={info}
              isVisible={showTooltip}
              onClose={() => setShowTooltip(false)}
            />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm opacity-90 mb-3 leading-relaxed">{description}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full bg-white/80 text-xs font-medium text-gray-700 border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Composant Arrow SVG
const Arrow: React.FC<{ 
  direction?: 'down' | 'up'; 
  color?: string; 
  label?: string;
  animated?: boolean;
  className?: string;
}> = ({ 
  direction = 'down', 
  color = DESIGN_TOKENS.colors.primary, 
  label,
  animated = false,
  className = ""
}) => {
  const isDown = direction === 'down';
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {label && (
        <span 
          className="text-sm font-medium mb-2 px-2 py-1 rounded-full bg-white/80 border border-gray-200"
          style={{ color }}
        >
          {label}
        </span>
      )}
      
      <svg 
        width="24" 
        height="32" 
        viewBox="0 0 24 32" 
        className={animated ? 'animate-pulse' : ''}
        aria-hidden="true"
      >
        <line 
          x1="12" 
          y1={isDown ? "4" : "28"} 
          x2="12" 
          y2={isDown ? "28" : "4"} 
          stroke={color} 
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon 
          points={isDown ? "12,28 8,24 16,24" : "12,4 8,8 16,8"} 
          fill={color}
        />
      </svg>
    </div>
  );
};

// Composant Horizontal Arrows pour les services
const HorizontalFlow: React.FC<{ 
  leftLabel?: string; 
  rightLabel?: string; 
  color?: string;
}> = ({ 
  leftLabel, 
  rightLabel, 
  color = DESIGN_TOKENS.colors.success 
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 my-4">
      {leftLabel && (
        <span className="text-sm font-medium text-gray-600">{leftLabel}</span>
      )}
      
      <svg width="120" height="24" viewBox="0 0 120 24" aria-hidden="true">
        <line x1="8" y1="12" x2="112" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <polygon points="112,12 108,8 108,16" fill={color}/>
        <polygon points="8,12 12,8 12,16" fill={color}/>
      </svg>
      
      {rightLabel && (
        <span className="text-sm font-medium text-gray-600">{rightLabel}</span>
      )}
    </div>
  );
};

// Légende
const Legend: React.FC = () => {
  const legendItems = [
    { label: 'Requête', color: DESIGN_TOKENS.colors.primary, description: 'Flux utilisateur' },
    { label: 'Services', color: DESIGN_TOKENS.colors.success, description: 'Traitement' },
    { label: 'Réponse', color: DESIGN_TOKENS.colors.gray, description: 'Retour données' },
    { label: 'UI Update', color: DESIGN_TOKENS.colors.indigo, description: 'Mise à jour' },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-3 text-center">Légende des flux</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="h-3 w-6 rounded-full mr-2 flex-shrink-0"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <div>
              <span className="text-gray-700 font-medium text-sm">{item.label}</span>
              <p className="text-gray-500 text-xs">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Principal
export default function ArchitectureFlowDiagram(): JSX.Element {
  return (
    <div className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 rounded-xl border border-gray-200 p-6 overflow-hidden">
      
      {/* Header */}
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Architecture & Flux de Données YVEA
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
          Diagramme simplifié illustrant l'architecture technique et les flux de données.
          Cliquez sur <HiInformationCircle className="inline w-4 h-4" aria-hidden="true" /> pour plus de détails.
        </p>
      </header>

      {/* Architecture Diagram */}
      <div 
        className="max-w-4xl mx-auto"
        role="img"
        aria-label="Diagramme d'architecture du système YVEA"
      >
        
        {/* Client Layer */}
        <div className="flex justify-center mb-6">
          <ServiceNode
            icon={<HiUser />}
            title="Client Web"
            description="Interface utilisateur moderne"
            tags={['React', 'Next.js', 'TypeScript']}
            variant="primary"
            info="Point d'entrée de l'application. Interface utilisateur responsive qui gère les interactions et initie les requêtes vers le backend."
            className="w-full max-w-sm"
          />
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-6">
          <Arrow 
            direction="down" 
            color={DESIGN_TOKENS.colors.primary} 
            label="1. Requête HTTP"
            animated={true}
          />
        </div>

        {/* Frontend Layer */}
        <div className="flex justify-center mb-6">
          <ServiceNode
            icon={<HiCode />}
            title="Serveur Frontend"
            description="Rendu côté serveur et optimisations"
            tags={['Next.js', 'SSR', 'SEO']}
            variant="success"
            info="Serveur de rendu côté serveur (SSR) qui optimise les performances, le SEO et fait le lien avec les APIs backend."
            className="w-full max-w-sm"
          />
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-6">
          <Arrow 
            direction="down" 
            color={DESIGN_TOKENS.colors.primary} 
            label="2. Appel API"
            animated={true}
          />
        </div>

        {/* Backend Layer */}
        <div className="flex justify-center mb-6">
          <ServiceNode
            icon={<HiServer />}
            title="API Backend"
            description="Logique métier et orchestration"
            tags={['NestJS', 'REST', 'GraphQL']}
            variant="success"
            info="Couche de logique métier qui centralise et orchestre tous les flux de données entre les différents services."
            className="w-full max-w-sm"
          />
        </div>

        {/* Service calls indication */}
        <div className="flex justify-center mb-4">
          <Arrow 
            direction="down" 
            color={DESIGN_TOKENS.colors.success} 
            label="3. Appels Services"
            animated={true}
          />
        </div>

        {/* Services Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ServiceNode
            icon={<HiDatabase />}
            title="PostgreSQL"
            description="Base de données relationnelle"
            tags={['SQL', 'TypeORM', 'ACID']}
            variant="purple"
            info="Base de données relationnelle principale qui assure la persistance des données avec intégrité référentielle."
          />
          
          <ServiceNode
            icon={<HiDatabase />}
            title="Redis Cache"
            description="Cache haute performance"
            tags={['Cache', 'Bull Queue', 'Session']}
            variant="warning"
            info="Système de cache en mémoire ultra-rapide qui améliore les performances et gère les files d'attente."
          />
          
          <ServiceNode
            icon={<HiLightBulb />}
            title="Services IA"
            description="Intelligence artificielle"
            tags={['OpenAI', 'Azure', 'OCR']}
            variant="warning"
            info="Services d'intelligence artificielle incluant les LLMs, OCR, et algorithmes de machine learning."
          />
        </div>

        {/* Bidirectional flow indication */}
        <HorizontalFlow 
          leftLabel="4. Résultats" 
          rightLabel="5. Agrégation"
          color={DESIGN_TOKENS.colors.gray}
        />

        {/* Return Flow */}
        <div className="flex justify-center mb-6 mt-8">
          <Arrow 
            direction="up" 
            color={DESIGN_TOKENS.colors.indigo} 
            label="6. Réponse UI"
          />
        </div>

      </div>

      {/* Legend */}
      <div className="mt-8">
        <Legend />
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg">
        <h3 className="font-bold text-indigo-800 mb-2 text-center text-lg">
          Résumé du Flux Architectural
        </h3>
        <p className="text-gray-700 text-center leading-relaxed text-sm max-w-3xl mx-auto">
          L'architecture suit un flux bidirectionnel optimisé : les requêtes utilisateur descendent 
          à travers les couches, les services spécialisés traitent les données en parallèle, 
          puis les réponses enrichies remontent vers l'interface pour une expérience fluide.
        </p>
      </div>
      
    </div>
  );
}
