'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  isExternal?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animate?: boolean;
  ariaLabel?: string;
}

export default function AnimatedButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  isExternal = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  animate = true,
  ariaLabel,
}: AnimatedButtonProps) {
  // Base styles
  const baseClasses = "relative inline-flex items-center justify-center rounded-lg font-bricolage font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
  
  // Size classes
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };
  
  // Variant classes
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-primary-light text-primary hover:bg-primary hover:text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary-light",
  };
  
  // Full width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${widthClass}
    ${className}
  `;
  
  // Button content with icon
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
      
      {/* Hidden animated circle for hover effect */}
      {animate && variant === 'primary' && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <motion.span
            className="absolute inset-0 -z-10 bg-primary-dark rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
        </span>
      )}
    </>
  );
  
  // Render as Link if href is provided
  if (href) {
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
      
    return (
      <Link 
        href={href}
        className={buttonClasses}
        aria-label={ariaLabel}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button 
      type="button" 
      className={buttonClasses}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
} 