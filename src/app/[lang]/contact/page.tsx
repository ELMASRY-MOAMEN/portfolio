import { Metadata } from 'next';
import { Lang, langs } from '../params';
import translations from '@/data/translations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = translations[params.lang].meta;
  
  return {
    title: `${t.title} | ${params.lang === 'fr' ? 'Contact' : 'Contact'}`,
    description: `${params.lang === 'fr' ? 'Contactez Moamen Elmasry, expert en gestion de projets et product ownership, pour discuter de vos besoins ou opportunités de collaboration.' : 'Contact Moamen Elmasry, expert in project management and product ownership, to discuss your needs or collaboration opportunities.'}`,
    keywords: [...t.keywords, 'contact', 'collaboration', 'consultation', 'CV', 'resume'],
    alternates: {
      canonical: params.lang === 'fr' ? 'https://moamen.fr/contact' : 'https://moamen.fr/en/contact',
      languages: {
        'fr': 'https://moamen.fr/contact',
        'en': 'https://moamen.fr/en/contact',
      },
    },
  };
}

export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default function ContactPage({ params }: { params: { lang: Lang } }) {
  return (
    <>
      <Header />
      <main id="content" className="flex flex-col pt-24">
        <div className="container-custom py-12">
          <h1 className="font-unbounded text-4xl md:text-5xl font-bold mb-6 text-center">
            {params.lang === 'fr' ? 'Contact' : 'Contact'}
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto text-center mb-12">
            {params.lang === 'fr' 
              ? 'Vous avez un projet ou une opportunité à discuter ? N\'hésitez pas à me contacter pour échanger.'
              : 'Do you have a project or an opportunity to discuss? Don\'t hesitate to contact me to exchange ideas.'}
          </p>
        </div>
        
        {/* Section Contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
} 