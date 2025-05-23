import { motion } from 'framer-motion';

interface Metric {
  value: string;
  label: string;
  emoji: string;
  color: string;
}

interface ExecutiveMetricsProps {
  highlights: Metric[];
}

const ExecutiveMetrics = ({ highlights }: ExecutiveMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {highlights.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`bg-white p-6 rounded-xl shadow-md border border-gray-100/80 hover:shadow-lg transition-all ${metric.color}`}
        >
          <div className="text-4xl mb-2">{metric.emoji}</div>
          <div className="text-2xl font-bold mb-2">{metric.value}</div>
          <div className="text-gray-600">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExecutiveMetrics; 