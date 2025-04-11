import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'À Propos',
  description: 'Découvrez mon parcours, mes compétences et ma vision en tant qu\'expert en gestion de projets et product ownership.',
  keywords: ['à propos', 'parcours', 'compétences', 'vision', 'expérience'],
  alternates: {
    canonical: 'https://moamen.fr/a-propos',
  },
};

export default function AboutPage() {
  redirect('/fr/a-propos');
} 