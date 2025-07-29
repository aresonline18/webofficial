import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourceCard from "@/components/ResourceCard";
import SEOHead from "@/components/SEOHead";
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
    <>
      <SEOHead 
        title="Shadow Pages Free Resources - Start, Run and Profit from Shadow Pages"
        description="Free materials to help you start, run and profit from Shadow Pages"
        keywords="shadow pages, free resources, social media marketing, instagram business, faceless marketing, digital marketing resources"
        ogTitle="Shadow Pages Free Resources"
        ogDescription="Free materials to help you start, run and profit from Shadow Pages"
        canonical={`${window.location.origin}/free-resources`}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --background: rgb(20, 35, 60) !important;
          }
          html, body {
            background: rgb(20, 35, 60) !important;
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .shadow-navy-bg {
            background: rgb(20, 35, 60) !important;
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