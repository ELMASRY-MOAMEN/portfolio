import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moamen Elmasry | Expert en Gestion de Projets & Product Ownership',
  description: 'Expert en gestion de projets et product ownership avec plus de 9 ans d\'expérience, spécialisé dans la transformation digitale, l\'innovation et le déploiement de solutions SaaS & IA en environnement international.',
  keywords: ['moamen elmasry', 'gestion de projets', 'product ownership', 'transformation digitale', 'PMP', 'Prince2', 'produits digitaux', 'SaaS', 'IA', 'portfolio'],
  alternates: {
    canonical: 'https://moamen.fr/',
  },
};

export default function Home() {
  redirect('/fr');
} 