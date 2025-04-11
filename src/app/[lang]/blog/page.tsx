import { Metadata } from 'next';
import { Lang, langs } from '../params';
import translations from '@/data/translations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export async function generateMetadata({ params }: { params: { lang: Lang } }): Promise<Metadata> {
  const t = translations[params.lang].meta;
  
  return {
    title: `${t.title} | Blog`,
    description: `${params.lang === 'fr' ? 'Articles et réflexions sur la transformation digitale, la gestion de projets et le product ownership.' : 'Articles and insights on digital transformation, project management and product ownership.'}`,
    keywords: [...t.keywords, 'blog', 'articles', 'digital transformation', 'project management insights'],
    alternates: {
      canonical: params.lang === 'fr' ? 'https://moamen.fr/blog' : 'https://moamen.fr/en/blog',
      languages: {
        'fr': 'https://moamen.fr/blog',
        'en': 'https://moamen.fr/en/blog',
      },
    },
  };
}

export async function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

// Articles fictifs pour la démonstration
const blogPosts = {
  fr: [
    {
      id: 'transformation-digitale-cles-succes',
      title: 'Les 5 clés d\'une transformation digitale réussie',
      excerpt: 'Découvrez les facteurs critiques pour réussir votre transformation digitale et éviter les pièges courants qui peuvent compromettre vos initiatives.',
      date: '12 avril 2023',
      category: 'Transformation Digitale',
      image: '/images/blog/digital-transformation.jpg'
    },
    {
      id: 'methodologies-agiles-comparees',
      title: 'Scrum vs SAFe vs Kanban : Quelle méthodologie Agile choisir ?',
      excerpt: 'Une analyse comparative des principales méthodologies Agiles pour vous aider à déterminer laquelle convient le mieux à votre contexte organisationnel.',
      date: '28 février 2023',
      category: 'Méthodologies Agiles',
      image: '/images/blog/agile-methods.jpg'
    },
    {
      id: 'product-ownership-evolutions',
      title: 'L\'évolution du rôle de Product Owner dans les organisations modernes',
      excerpt: 'Comment le rôle de Product Owner s\'est transformé ces dernières années et quelles compétences sont désormais essentielles pour exceller dans cette fonction.',
      date: '10 janvier 2023',
      category: 'Product Ownership',
      image: '/images/blog/product-ownership.jpg'
    }
  ],
  en: [
    {
      id: 'digital-transformation-success-keys',
      title: 'The 5 Keys to Successful Digital Transformation',
      excerpt: 'Discover the critical factors for successful digital transformation and avoid common pitfalls that can compromise your initiatives.',
      date: 'April 12, 2023',
      category: 'Digital Transformation',
      image: '/images/blog/digital-transformation.jpg'
    },
    {
      id: 'agile-methodologies-compared',
      title: 'Scrum vs SAFe vs Kanban: Which Agile Methodology to Choose?',
      excerpt: 'A comparative analysis of the main Agile methodologies to help you determine which one best suits your organizational context.',
      date: 'February 28, 2023',
      category: 'Agile Methodologies',
      image: '/images/blog/agile-methods.jpg'
    },
    {
      id: 'product-ownership-evolution',
      title: 'The Evolution of the Product Owner Role in Modern Organizations',
      excerpt: 'How the Product Owner role has transformed in recent years and what skills are now essential to excel in this position.',
      date: 'January 10, 2023',
      category: 'Product Ownership',
      image: '/images/blog/product-ownership.jpg'
    }
  ]
};

export default function BlogPage({ params }: { params: { lang: Lang } }) {
  const posts = params.lang === 'fr' ? blogPosts.fr : blogPosts.en;
  
  return (
    <>
      <Header />
      <main id="content" className="flex flex-col pt-24">
        <div className="container-custom py-12">
          <h1 className="font-unbounded text-4xl md:text-5xl font-bold mb-6 text-center">
            Blog
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto text-center mb-12">
            {params.lang === 'fr' 
              ? 'Réflexions, analyses et insights sur la transformation digitale, la gestion de projets et le product ownership.'
              : 'Thoughts, analyses and insights on digital transformation, project management and product ownership.'}
          </p>
          
          {/* Liste des articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <article key={post.id} className="card overflow-hidden bg-white hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-primary text-sm font-medium">{post.category}</span>
                    <span className="text-text-secondary text-sm">{post.date}</span>
                  </div>
                  <h2 className="font-unbounded text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                  <p className="text-text-secondary mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link 
                    href={`/${params.lang}/blog/${post.id}`}
                    className="text-primary font-medium hover:underline inline-flex items-center"
                  >
                    {params.lang === 'fr' ? 'Lire l\'article' : 'Read article'}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {/* Catégories */}
          <div className="mb-12">
            <h2 className="font-unbounded text-2xl font-bold mb-4 text-center">
              {params.lang === 'fr' ? 'Catégories' : 'Categories'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Transformation Digitale', 'Méthodologies Agiles', 'Product Ownership', 'Innovation', 'Leadership'].map((category) => (
                <Link 
                  key={category}
                  href={`/${params.lang}/blog/categorie/${category.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-2 bg-primary-light text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-primary-light p-8 rounded-xl text-center">
            <h2 className="font-unbounded text-2xl font-bold mb-3 text-text-primary">
              {params.lang === 'fr' ? 'Vous avez un sujet à proposer ?' : 'Do you have a topic to suggest?'}
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              {params.lang === 'fr' 
                ? 'Je suis ouvert aux suggestions de sujets à traiter dans de prochains articles. N\'hésitez pas à me contacter pour partager vos idées.'
                : 'I am open to topic suggestions for future articles. Feel free to contact me to share your ideas.'}
            </p>
            <Link 
              href={`/${params.lang}/contact`}
              className="btn-primary"
            >
              {params.lang === 'fr' ? 'Me contacter' : 'Contact me'}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 