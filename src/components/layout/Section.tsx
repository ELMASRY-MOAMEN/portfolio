'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  bgClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function Section({
  children,
  title,
  subtitle,
  className = '',
  bgClassName = '',
  titleClassName = 'text-3xl font-bold mb-2',
  subtitleClassName = 'text-lg text-gray-600 dark:text-gray-300 mb-8'
}: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${bgClassName}`}>
      <div className={`container mx-auto px-4 md:px-6 ${className}`}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className={titleClassName}>{title}</h2>}
            {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
} 