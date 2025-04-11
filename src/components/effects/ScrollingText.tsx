'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

interface ScrollingTextProps {
  text: string;
  repeat?: number;
  direction?: 'ltr' | 'rtl';
  className?: string;
  textClassName?: string;
  speed?: number;
}

export default function ScrollingText({
  text,
  repeat = 10,
  direction = 'ltr',
  className = '',
  textClassName = '',
  speed = 1
}: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate repeated text with separators
  const repeatedText = Array(repeat).fill(text).join(' • ');

  return (
    <div 
      ref={containerRef}
      className={`w-full overflow-hidden py-8 bg-white ${className}`}
    >
      <div className="container-custom">
        <div className="text-center">
          <h2 className={`text-gray-800 text-3xl md:text-4xl font-unbounded font-bold ${textClassName}`}>
            {text}
          </h2>
        </div>
      </div>
    </div>
  );
} 