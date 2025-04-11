/**
 * Types pour les composants de la page d'accueil (Hero Section)
 */

export interface HeroStatistic {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export interface HeroLinkProps {
  href: string;
  label: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface GatewayCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: string;
}

export interface HeroProps {
  languagePrefix: string;
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    description: string;
    tagline: string;
    badges: {
      certified: string;
      experience: string;
      countries: string;
    };
    cta: {
      aboutMe: string;
      viewProjects: string;
      downloadCV: string;
    };
    sections: {
      about: {
        title: string;
        description: string;
        linkText: string;
      };
      projects: {
        title: string;
        description: string;
        linkText: string;
      };
      contact: {
        title: string;
        description: string;
        linkText: string;
      };
    };
  };
} 