'use client';

import { useLoadAnimation } from '@/hooks/useLoadAnimation';
import { HeroStatistic } from '@/types/hero';

interface HeroStatisticsProps {
  statistics: HeroStatistic[];
}

/**
 * Composant pour afficher les statistiques/indicateurs clés de la hero section
 */
export default function HeroStatistics({ statistics }: HeroStatisticsProps) {
  const isLoaded = useLoadAnimation({ delay: 300 });

  return (
    <div className={`flex flex-wrap gap-6 mb-10 animate-fade-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '700ms' }}>
      {statistics.map((stat, index) => (
        <div key={index} className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
            {stat.icon}
          </div>
          <div>
            <span className="text-text-primary font-medium block">{stat.value}</span>
            <span className="text-text-secondary text-sm">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 