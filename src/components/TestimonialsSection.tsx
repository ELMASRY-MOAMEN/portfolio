'use client';

import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import OptimizedImage from './OptimizedImage';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'testimonial1',
    name: 'Jean Dupont',
    role: 'CTO',
    company: 'TechInnovate',
    content: 'Moamen a transformé notre vision en une solution concrète, en gérant efficacement tous les aspects du projet. Sa capacité à comprendre nos besoins métier tout en apportant une expertise technique a été déterminante dans le succès de notre produit.',
    image: '/images/testimonials/testimonial1.jpg'
  },
  {
    id: 'testimonial2',
    name: 'Sophie Martin',
    role: 'Directrice Marketing',
    company: 'GlobalBrand',
    content: 'La collaboration avec Moamen a été un véritable atout pour notre entreprise. Sa rigueur méthodologique et sa vision stratégique nous ont permis de réduire nos délais de mise sur le marché de 15 à 3 jours, un gain considérable pour notre activité.',
    image: '/images/testimonials/testimonial2.jpg'
  },
  {
    id: 'testimonial3',
    name: 'Thomas Leroy',
    role: 'CEO',
    company: 'InnoStart',
    content: 'Grâce à l\'expertise de Moamen, nous avons pu sécuriser une levée de fonds significative. Son approche méthodique, sa capacité à fédérer les équipes et à livrer dans les délais ont été des facteurs clés de notre succès.',
    image: '/images/testimonials/testimonial3.jpg'
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section
      id="temoignages"
      ref={sectionRef}
      className="section-padding bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 
            id="testimonials-heading"
            className={`inline-block relative ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            Ce que disent mes clients
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-primary rounded-full"></span>
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto text-text-secondary ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            La satisfaction des clients et des équipes est au cœur de ma démarche.
            Découvrez ce que pensent ceux avec qui j'ai eu le plaisir de collaborer.
          </p>
        </div>

        {/* Témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`card p-6 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  {/* Image du témoin */}
                  <div className="w-full h-full bg-primary-light flex items-center justify-center text-primary">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary" itemProp="author">{testimonial.name}</h3>
                  <p className="text-sm text-text-secondary" itemProp="jobTitle">
                    {testimonial.role}, <span itemProp="publisher">{testimonial.company}</span>
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="w-8 h-8 text-primary opacity-50" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-text-secondary mb-6" itemProp="reviewBody">
                {testimonial.content}
              </p>
              <div className="flex justify-end">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <meta itemProp="datePublished" content="2023-01-01" />
            </div>
          ))}
        </div>

        {/* Clients */}
        <div className={`mt-20 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
          <h3 className="text-xl font-bold text-center mb-10">Ils m'ont fait confiance</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo Client 1</div>
            <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo Client 2</div>
            <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo Client 3</div>
            <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo Client 4</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 