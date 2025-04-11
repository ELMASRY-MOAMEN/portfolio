'use client';

import Link from 'next/link';
import { GatewayCardProps } from '@/types/hero';

/**
 * Composant pour les cartes de la grille de gateway
 */
export default function GatewayCard({
  icon,
  title,
  description,
  href,
  linkText
}: GatewayCardProps) {
  return (
    <Link 
      href={href}
      className="card bg-white p-6 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-unbounded text-xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-text-secondary mb-4">
        {description}
      </p>
      <div className="text-primary font-medium inline-flex items-center">
        {linkText}
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  );
} 