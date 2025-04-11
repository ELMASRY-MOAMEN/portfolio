'use client';

import { createContext, ReactNode } from 'react';
import { Lang } from '@/app/[lang]/params';

// Create a context for the current language
export const LangContext = createContext<Lang>('fr');

// Provider component for language context
export default function LangProvider({ 
  children, 
  lang 
}: { 
  children: ReactNode;
  lang: Lang;
}) {
  return (
    <LangContext.Provider value={lang}>
      {children}
    </LangContext.Provider>
  );
} 