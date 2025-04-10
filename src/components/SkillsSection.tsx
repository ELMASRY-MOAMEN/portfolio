'use client';

import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const skills: Skill[] = [
  {
    id: 'skill1',
    title: 'Gestion de Projet',
    description: 'Méthodologies Agile (Scrum, Kanban), certifications PMP et Prince2, gestion de budgets et planification stratégique.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
  },
  {
    id: 'skill2',
    title: 'Product Ownership',
    description: 'Définition de vision produit, rédaction de user stories, priorisation de backlog et gestion de feuille de route.',
    icon: 'M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
  },
  {
    id: 'skill3',
    title: 'Leadership',
    description: 'Direction d\'équipes multidisciplinaires, gestion du changement et communication stratégique avec les parties prenantes.',
    icon: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'
  },
  {
    id: 'skill4',
    title: 'Expertise Technique',
    description: 'Architecture SaaS, intégration IA, OCR, systèmes de paiement et solutions cloud. Maîtrise des aspects techniques pour piloter efficacement les équipes de développement.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  }
];

interface Achievement {
  id: string;
  title: string;
  value: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    id: 'achievement1',
    title: 'Réduction des délais',
    value: '80%',
    description: 'Réduction du temps de mise sur le marché de 15 à 3 jours pour un client e-commerce majeur'
  },
  {
    id: 'achievement2',
    title: 'Satisfaction client',
    value: '95%',
    description: 'Taux de satisfaction client moyen sur l\'ensemble des projets livrés'
  },
  {
    id: 'achievement3',
    title: 'Financement',
    value: '2.5M€',
    description: 'Contribution à la sécurisation d\'une levée de fonds significative pour une startup'
  },
  {
    id: 'achievement4',
    title: 'Déploiement',
    value: '+20',
    description: 'Pays où j\'ai déployé des solutions à l\'international'
  }
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section
      id="competences"
      ref={sectionRef}
      className="section-padding bg-primary-light"
      aria-labelledby="skills-heading"
    >
      <div className="container-custom">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 
            id="skills-heading"
            className={`inline-block relative ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            Expertise & Résultats
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto text-text-secondary ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            Fort de plus de 9 ans d'expérience dans des environnements variés et exigeants, j'allie expertise technique 
            et compétences managériales pour transformer vos projets en succès.
          </p>
        </div>

        {/* Compétences clés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {skills.map((skill, index) => (
            <div 
              key={skill.id}
              className={`card p-6 flex ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="mr-4 mt-1 flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={skill.icon} />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{skill.title}</h3>
                <p className="text-text-secondary">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs clés de performance */}
        <div className={`px-4 py-10 bg-white rounded-xl shadow-sm ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <h3 className="text-2xl font-bold text-center mb-10">Résultats concrets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center">
                <div className="text-4xl font-unbounded font-bold text-primary mb-2">{achievement.value}</div>
                <h4 className="text-lg font-bold text-text-primary mb-2">{achievement.title}</h4>
                <p className="text-sm text-text-secondary">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proposition de valeur */}
        <div className={`mt-20 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
          <h3 className="text-2xl font-bold mb-6">Ma proposition de valeur</h3>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Je transforme des idées complexes en solutions concrètes, en alliant vision stratégique, 
            expertise technique et leadership, pour vous aider à atteindre vos objectifs d'affaires
            tout en optimisant votre ROI.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 