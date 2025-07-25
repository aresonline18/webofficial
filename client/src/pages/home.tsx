import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourceCard from "@/components/ResourceCard";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // Get resources from database API
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['/api/resources'],
  });

  return (
    <div className="min-h-screen shadow-navy-bg">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-site mx-auto px-4 md:px-6">
        {/* Hero Section - Gray background, NOT a white card */}
        <HeroSection />
        
        {/* Resource Cards Section */}
        <section id="free-resources" className="py-6 md:py-8 space-y-6 md:space-y-8">
          {isLoading ? (
            <div className="text-center py-8">Loading resources...</div>
          ) : (
            resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                imageUrl={resource.imageUrl}
                imageAlt={resource.imageAlt || resource.title}
                title={resource.title}
                description={resource.description}
                buttonText={resource.buttonText}
                buttonUrl={resource.buttonUrl}
                buttonColor={resource.buttonColor as "red" | "blue" || "blue"}
                resourceId={resource.resourceId}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
