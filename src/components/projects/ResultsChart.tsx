'use client';

import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: string;
  description: string;
}

interface ResultsChartProps {
  metrics: Metric[];
}

const ResultsChart = ({ metrics }: ResultsChartProps) => {
  // Fonction pour extraire la valeur numérique des métriques
  const extractNumericValue = (value: string) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center">Indicateurs clés</h3>
      
      {metrics.map((metric, index) => {
        // Calculer le pourcentage pour les barres de progression
        const numericValue = extractNumericValue(metric.value);
        const progressValue = metric.value.includes('%') 
          ? numericValue 
          : Math.min(100, numericValue * 2); // Si ce n'est pas un pourcentage, on multiplie par 2 pour un meilleur affichage
          
        return (
          <div key={index} className="mb-6 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{metric.label}</p>
              <p className="font-bold text-primary">{metric.value}</p>
            </div>
            
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${progressValue}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
            
            <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsChart; 