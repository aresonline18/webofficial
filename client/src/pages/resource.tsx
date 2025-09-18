import React from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import StickyCTA from "@/components/sticky-cta";
import { SimpleTemplateRenderer } from "@/components/SimpleTemplateRenderer";
import ResourceApplyNowButton from "@/components/ResourceApplyNowButton";
import RelatedResources from "@/components/related-resources";
import { staticResourceTemplates } from "@/data/resources";

// Import specific resource templates
import ShadowPagesPlaybook from "./templates/shadow-pages-playbook";
import ShadowPagesPlaybookFemale from "./templates/shadow-pages-playbook-female";

// Template component mapping
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType> = {
  'shadow-pages-playbook': ShadowPagesPlaybook,
  'shadow-pages-playbook-female': ShadowPagesPlaybookFemale,
};

interface ResourceTemplate {
  id: number;
  resourceId: string;
  headline: string;
  subheadline: string;
  body: string;
  template: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ResourcePage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: dbResource, isLoading, isError } = useQuery<ResourceTemplate>({
    queryKey: ['/api/resource-templates', slug],
    queryFn: async () => {
      const response = await fetch(`/api/resource-templates/slug/${slug}`);
      if (!response.ok) {
        throw new Error('Resource template not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  // Use database resource if available, otherwise fall back to static resource
  const staticResource = slug ? staticResourceTemplates[`${slug}-complete-guide`] : null;
  const resource = dbResource || (staticResource ? {
    id: 1,
    resourceId: staticResource.id,
    headline: staticResource.headline,
    subheadline: staticResource.subheadline,
    body: JSON.stringify({
      authorName: staticResource.authorName,
      authorTitle: staticResource.authorTitle,
      logoUrl: staticResource.logoUrl,
      bodyContent: staticResource.bodyContent,
      ctaText: staticResource.ctaText
    }),
    template: 'guide',
    slug: slug || '',
    metaTitle: `${staticResource.headline} - Complete Guide`,
    metaDescription: staticResource.subheadline,
    featuredImage: '/uploads/book_1753355066598.png',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } : null);

  // Set document title for SEO - MUST be called before any conditional returns
  React.useEffect(() => {
    if (resource) {
      document.title = resource.metaTitle || resource.headline;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', resource.metaDescription || resource.subheadline);
      }
    }
  }, [resource]);

  if (isLoading && !staticResource) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-narrow py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-narrow py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
            <p className="text-gray-600">The requested resource could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!resource.isPublished) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-narrow py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource Unavailable</h1>
            <p className="text-gray-600">This resource is not currently published.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check for UTM parameter to determine which template to use for shadow-pages-playbook
  const getTemplateSlug = (resourceSlug: string): string => {
    if (resourceSlug === 'shadow-pages-playbook') {
      const urlParams = new URLSearchParams(window.location.search);
      const utmCampaign = urlParams.get('utm_campaign');
      if (utmCampaign === 'playbook-f') {
        return 'shadow-pages-playbook-female';
      }
    }
    return resourceSlug;
  };

  // Get the template component
  const templateSlug = getTemplateSlug(resource.slug);
  const TemplateComponent = TEMPLATE_COMPONENTS[templateSlug];
  
  if (!TemplateComponent) {
    // Fallback to SimpleTemplateRenderer for resources without specific templates
    let templateData;
    try {
      templateData = JSON.parse(resource.body);
    } catch (error) {
      // If body is not valid JSON, create a simple template structure
      templateData = {
        headline: resource.headline,
        subheadline: resource.subheadline,
        authorName: "Eric Cole",
        authorTitle: "Entrepreneur & Social Media Mastermind",
        logoUrl: "https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png",
        bodyContent: resource.body
      };
    }

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <StickyCTA />
        
        <SimpleTemplateRenderer template={templateData} />
        
        {/* Apply Now Button with Resource-Specific Tracking */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <ResourceApplyNowButton 
                resourceName={resource.headline}
                className="w-full px-8 py-6 text-white rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(to bottom, #385DC6, #2C4A9E)'
                }}
              >
                <span className="text-2xl mb-1" style={{ fontWeight: 900, fontSize: 'calc(1.5rem + 2px)' }}>Click Here To Book Your 1/1 Call With My Team</span>
                <span className="text-sm font-normal opacity-90">And see if you qualify to work with us</span>
              </ResourceApplyNowButton>
            </div>
            
            <p className="text-gray-800 mb-8 text-center">
              Or message me @erichustls on Instagram with "Book a call"<br />
              <span className="text-sm text-gray-600">(no spam please, only if you're serious)</span>
            </p>
          </div>
        </div>

        <RelatedResources currentResourceSlug={resource.slug} />
      </div>
    );
  }

  return <TemplateComponent />;
}