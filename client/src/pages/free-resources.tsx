import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourceCard from "@/components/ResourceCard";
import SEOHead from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { type Resource } from "@shared/schema";

export default function FreeResources() {
  // Get resources from database API
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  return (
    <>
      <SEOHead 
        title="Shadow Pages Free Resources - Start, Run and Profit from Shadow Pages"
        description="Free materials to help you start, run and profit from Shadow Pages"
        keywords="shadow pages, free resources, social media marketing, instagram business, faceless marketing, digital marketing resources, Shadow Pages Playbook"
        ogTitle="Shadow Pages Free Resources"
        ogDescription="Free materials to help you start, run and profit from Shadow Pages"
        canonical={`${window.location.origin}/free-resources`}
        contentType="webpage"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Shadow Pages Free Resources",
          "description": "Free materials to help you start, run and profit from Shadow Pages",
          "url": `${window.location.origin}/free-resources`,
          "mainEntity": {
            "@type": "ItemList",
            "name": "Shadow Pages Free Resources",
            "description": "Comprehensive collection of free resources for Shadow Pages business",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Guide",
                  "name": "Shadow Pages Playbook",
                  "description": "Complete guide to start, run and profit from Shadow Pages",
                  "url": `${window.location.origin}/free-resources/shadow-pages-playbook`,
                  "about": [
                    "Shadow Pages strategy",
                    "Instagram business growth",
                    "Faceless marketing techniques",
                    "Social media monetization",
                    "Digital marketing automation"
                  ]
                }
              }
            ]
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Free Resources",
                "item": `${window.location.origin}/free-resources`
              }
            ]
          }
        }}
      />
      <div className="min-h-screen shadow-navy-bg">
        <Header />
        
        {/* Main Content - exactly like home page */}
        <main className="max-w-site mx-auto px-4 md:px-6">
          {/* Hero Section - Gray background, NOT a white card */}
          <HeroSection />
          
          {/* Resource Cards Section - exactly like home page */}
          <section id="free-resources" className="py-6 md:py-8 space-y-6 md:space-y-8">
            {isLoading ? (
              <div className="text-center py-8">Loading resources...</div>
            ) : (
              resources.map((resource: Resource) => (
                <ResourceCard
                  key={resource.id}
                  imageUrl={resource.imageUrl}
                  imageAlt={resource.title}
                  title={resource.title}
                  description={resource.description}
                  buttonText={resource.buttonText}
                  buttonUrl={resource.buttonUrl}
                  buttonColor="blue"
                  resourceId={resource.resourceId}
                />
              ))
            )}
          </section>
        </main>
      </div>
    </>
  );
}