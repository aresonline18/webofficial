import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';

interface Resource {
  id: number;
  resourceId: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
}

interface RelatedResourcesProps {
  currentResourceId?: number;
  currentResourceSlug?: string;
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange';
  title?: string;
}

const colorSchemes = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    titleColor: 'text-blue-900',
    buttonBg: 'bg-blue-600 hover:bg-blue-700',
    buttonText: 'text-white',
    cardHover: 'hover:border-blue-300'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200', 
    titleColor: 'text-green-900',
    buttonBg: 'bg-green-600 hover:bg-green-700',
    buttonText: 'text-white',
    cardHover: 'hover:border-green-300'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    titleColor: 'text-purple-900', 
    buttonBg: 'bg-purple-600 hover:bg-purple-700',
    buttonText: 'text-white',
    cardHover: 'hover:border-purple-300'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    titleColor: 'text-orange-900',
    buttonBg: 'bg-orange-600 hover:bg-orange-700', 
    buttonText: 'text-white',
    cardHover: 'hover:border-orange-300'
  }
};

export default function RelatedResources({ 
  currentResourceId, 
  currentResourceSlug,
  colorScheme = 'blue',
  title = "Read More Free Resources↓"
}: RelatedResourcesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
    enabled: mounted
  });

  if (!mounted || isLoading) {
    return (
      <div className="bg-white pt-5 md:pt-11 pb-16">
        <div className="max-w-site mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="space-y-6 md:space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm h-64">
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter out current resource - never show the same resource as a recommendation
  const otherResources = resources
    .filter(resource => {
      if (!resource.isActive) return false;
      
      // Method 1: Exclude by resource ID (legacy support)
      if (currentResourceId && resource.id === currentResourceId) return false;
      
      // Method 2: Exclude by slug matching (primary method) 
      if (currentResourceSlug) {
        // Extract slug from buttonUrl (e.g., "/free-resources/shadow-pages-playbook" -> "shadow-pages-playbook")
        const resourceSlug = resource.buttonUrl.split('/').pop();
        if (resourceSlug === currentResourceSlug) return false;
      }
      
      // Method 3: Additional safety check - ensure Shadow Pages Playbook never shows itself
      if (currentResourceSlug === 'shadow-pages-playbook' && resource.resourceId.includes('shadow-pages-playbook')) {
        return false;
      }
      
      return true;
    })
    .slice(0, 6);

  // Don't show the section if no other resources are available
  if (otherResources.length === 0) {
    return null;
  }

  return (
    <div className="bg-white pt-5 md:pt-11 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[44px] font-black text-black mb-4">
              More Free Resources ↓
            </h2>
            <p className="text-black text-lg max-w-3xl mx-auto -mt-[7px]">
              Read more about how <strong>Shadow Pages</strong> work and how to profit from them...
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {otherResources.map((resource) => (
              <div key={resource.id} className="rounded-2xl p-6 md:p-8 shadow-sm border-2" style={{backgroundColor: 'rgb(20, 35, 60)', borderColor: 'rgb(20, 35, 60)'}}>
                <div className="flex flex-col md:flex-row items-center md:items-center gap-5">
                  <div className="w-full md:w-52 flex-shrink-0 flex justify-center md:justify-start">
                    <img 
                      src={resource.imageUrl}
                      alt={resource.title}
                      className="w-40 h-40 md:w-44 md:h-44 object-contain rounded-xl bg-gray-50 p-2"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left md:ml-[-5px]">
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                      {resource.title}
                    </h2>
                    <div 
                      className="text-lg text-white mb-5"
                      dangerouslySetInnerHTML={{ __html: resource.description }}
                    />
                    <a 
                      href={`/free-resources/${resource.resourceId}`}
                      className="inline-block bg-gradient-to-b from-[rgb(56,93,198)] to-[rgb(44,74,158)] hover:from-[rgb(46,83,188)] hover:to-[rgb(34,64,148)] text-white px-6 py-[11px] rounded-[20px] font-semibold transition-colors"
                    >
                      {resource.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <button
          onClick={() => window.location.href = '/free-resources'}
          className="inline-flex items-center px-6 py-3 border-2 border-[var(--shadow-navy)] text-[var(--shadow-navy)] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          View All Free Resources
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}