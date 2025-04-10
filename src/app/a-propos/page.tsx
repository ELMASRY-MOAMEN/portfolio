import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';

export const metadata: Metadata = {
  title: 'À Propos',
  description: 'Découvrez mon parcours, mes compétences et ma vision en tant qu\'expert en gestion de projets et product ownership.',
  keywords: ['à propos', 'parcours', 'compétences', 'vision', 'expérience'],
  alternates: {
    canonical: 'https://moamen.fr/a-propos',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-24">
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h1 className="mb-8 text-center">À Propos de Moi</h1>
              
              <div className="flex flex-col md:flex-row gap-12 mb-16 items-center">
                <div className="md:w-1/3">
                  <div className="rounded-xl overflow-hidden w-64 h-64 mx-auto">
                    {/* Remplacer par votre photo */}
                    <OptimizedImage
                      src="/images/photo-profil.jpg" 
                      alt="Photo de profil"
                      width={256}
                      height={256}
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Moamen Elmasry</h2>
                  <p className="text-text-secondary mb-4">
                    Expert en gestion de projets et product ownership avec plus de X années d'expérience dans la 
                    transformation digitale et la livraison de produits innovants.
                  </p>
                  <p className="text-text-secondary">
                    Passionné par l'optimisation des processus métier et la création de valeur, 
                    j'accompagne les entreprises dans leur transition numérique et le développement 
                    de solutions centrées sur l'utilisateur.
                  </p>
                </div>
              </div>
              
              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Mon Parcours</h2>
                  <p className="text-text-secondary mb-4">
                    Mon expérience s'étend sur plusieurs secteurs d'activité, où j'ai pu développer 
                    une expertise solide en gestion de produits numériques et conduite du changement.
                  </p>
                  {/* Timeline ou liste d'expériences à ajouter ici */}
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">Mes Compétences</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-2">Gestion de Projet</h3>
                      <ul className="list-disc list-inside text-text-secondary space-y-1">
                        <li>Méthodologies Agiles (Scrum, Kanban)</li>
                        <li>Gestion de backlog</li>
                        <li>Planification et priorisation</li>
                        <li>Gestion des risques</li>
                      </ul>
                    </div>
                    
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-2">Product Ownership</h3>
                      <ul className="list-disc list-inside text-text-secondary space-y-1">
                        <li>Vision produit</li>
                        <li>User stories et critères d'acceptation</li>
                        <li>Analyse de données</li>
                        <li>Tests utilisateurs</li>
                      </ul>
                    </div>
                    
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-2">Transformation Digitale</h3>
                      <ul className="list-disc list-inside text-text-secondary space-y-1">
                        <li>Conduite du changement</li>
                        <li>Optimisation des processus</li>
                        <li>Architecture d'information</li>
                        <li>Expérience utilisateur</li>
                      </ul>
                    </div>
                    
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-2">Communication</h3>
                      <ul className="list-disc list-inside text-text-secondary space-y-1">
                        <li>Présentations stratégiques</li>
                        <li>Animation d'ateliers</li>
                        <li>Négociation</li>
                        <li>Documentation technique</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">Ma Vision</h2>
                  <p className="text-text-secondary mb-4">
                    Je crois fermement que la technologie doit servir l'humain et non l'inverse. 
                    Mon approche s'articule autour de trois piliers fondamentaux :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="card p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">Valeur</h3>
                      <p className="text-text-secondary">
                        Création de valeur tangible pour les utilisateurs et l'entreprise
                      </p>
                    </div>
                    <div className="card p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">Innovation</h3>
                      <p className="text-text-secondary">
                        Recherche constante de solutions innovantes et pragmatiques
                      </p>
                    </div>
                    <div className="card p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                      <p className="text-text-secondary">
                        Travail d'équipe et partage de connaissances
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 