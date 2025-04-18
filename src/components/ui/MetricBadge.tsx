'use client';

import { motion } from 'framer-motion';

interface MetricBadgeProps {
  value: string;
  label: string;
  color?: 'indigo' | 'violet' | 'blue' | 'emerald';
}

export default function MetricBadge({ 
  value, 
  label, 
  color = 'indigo' 
}: MetricBadgeProps) {
  // Color styles based on the color prop
  const colorStyles = {
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-300',
      glow: 'from-indigo-500/30 to-transparent',
      value: 'text-indigo-400'
    },
    violet: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      text: 'text-violet-300',
      glow: 'from-violet-500/30 to-transparent',
      value: 'text-violet-400'
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-300',
      glow: 'from-blue-500/30 to-transparent',
      value: 'text-blue-400'
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-300',
      glow: 'from-emerald-500/30 to-transparent',
      value: 'text-emerald-400'
    }
  };
  
  const styles = colorStyles[color];
  
  return (
    <motion.div 
      className={`relative p-4 rounded-lg backdrop-blur-lg ${styles.bg} border ${styles.border} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Glow effect */}
      <div 
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-radial ${styles.glow} opacity-80 rounded-full blur-xl -translate-y-1/2 translate-x-1/4`}
      />
      
      <div className="relative z-10 text-center">
        <div className={`text-3xl font-bold ${styles.value} mb-1`}>{value}</div>
        <div className={`text-xs ${styles.text} font-medium tracking-wide`}>{label}</div>
      </div>
    </motion.div>
  );
} 