import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourceCard from "@/components/ResourceCard";
import { useQuery } from "@tanstack/react-query";
import { type Resource } from "@shared/schema";

export default function FreeResources() {
  // Get resources from database API - exactly like home page
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
    refetchInterval: 10000, // Refetch every 10 seconds to ensure fresh data
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --background: rgb(20, 35, 60) !important;
          }
          html, body {
            background: rgb(20, 35, 60) !important;
            background-image: radial-gradient(circle at 50% 50%, rgba(56, 93, 198, 0.15) 0%, transparent 70%) !important;
            background-attachment: fixed !important;
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `
      }} />
      <div className="min-h-screen">
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
              (resources as Resource[]).map((resource: Resource) => (
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