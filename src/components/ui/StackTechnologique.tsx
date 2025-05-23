import { Button } from './button';
import { HiCode } from 'react-icons/hi';

interface TechStack {
  title: string;
  description: string;
}

interface StackTechnologiqueProps {
  items: TechStack[];
  githubUrl?: string;
  className?: string;
}

const StackTechnologique = ({ items, githubUrl, className }: StackTechnologiqueProps) => {
  return (
    <div className={className}>
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100/80">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <HiCode className="w-6 h-6 text-primary mr-3" />
            Stack Technique
          </h3>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary text-primary hover:bg-primary/10 h-9 px-3 transition-colors"
            >
              Voir sur GitHub
            </a>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackTechnologique; 