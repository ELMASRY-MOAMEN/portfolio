'use client';

import Link from 'next/link';
import { HeroLinkProps } from '@/types/hero';

/**
 * Composant pour les liens d'action (CTA) dans la hero section
 */
export default function HeroLink({
  href,
  label,
  ariaLabel,
  icon,
  variant = 'primary'
}: HeroLinkProps) {
  // Déterminer la classe CSS basée sur la variante
  const getButtonClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      default:
        return 'btn-primary';
    }
  };

  // Déterminer si c'est un lien externe (commence par http ou contient ://)
  const isExternalLink = href.startsWith('http') || href.includes('://');

  if (isExternalLink) {
    return (
      <a
        href={href}
        className={getButtonClass()}
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        aria-label={ariaLabel || label}
      >
        {label}
        {icon && <span className="ml-2">{icon}</span>}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={getButtonClass()}
      role="button"
      aria-label={ariaLabel || label}
    >
      {label}
      {icon && <span className="ml-2">{icon}</span>}
    </Link>
  );
} 