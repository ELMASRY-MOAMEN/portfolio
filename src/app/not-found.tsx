import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page non trouvée | 404',
  description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-9xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
          <p className="text-text-secondary mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="btn-primary block w-full"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/projets"
              className="btn-secondary block w-full"
            >
              Voir mes projets
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 