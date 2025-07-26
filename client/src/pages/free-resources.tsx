import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourceCard from "@/components/ResourceCard";
import { useQuery } from "@tanstack/react-query";
import { type Resource } from "@shared/schema";
import { staticResources } from "@/data/resources";

export default function FreeResources() {
  // Get resources from database API with static fallback
  const { data: dbResources, isLoading, error } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
    refetchInterval: 10000, // Refetch every 10 seconds to ensure fresh data
  });

  // Use database resources if available, otherwise fall back to static resources
  const resources = dbResources?.length ? dbResources : staticResources;

  return (
    <div className="min-h-screen shadow-navy-bg">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-site mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Resource Cards Section */}
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
  );
}