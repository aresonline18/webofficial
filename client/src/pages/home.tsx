import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  return (
    <>
      <SEOHead 
        title="Shadow Pages - Generate Cash Flow from Faceless Instagram Brands"
        description="Learn how to create and profit from faceless Instagram brands using automated A.I. systems. Join thousands generating cash flow with Shadow Pages."
        keywords="shadow pages, faceless instagram, instagram marketing, social media automation, digital marketing, instagram business, faceless brands, automated income"
        ogTitle="Shadow Pages - Generate Cash Flow from Faceless Instagram Brands"
        ogDescription="Learn how to create and profit from faceless Instagram brands using automated A.I. systems. Join thousands generating cash flow with Shadow Pages."
        canonical={`${window.location.origin}/`}
        contentType="webpage"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Shadow Pages",
          "description": "Generate Cash Flow from Faceless Instagram Brands",
          "url": `${window.location.origin}/`,
          "logo": "https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png"
        }}
      />
      <div className="min-h-screen shadow-navy-bg">
        <Header />
        
        {/* Main Content */}
        <main className="max-w-site mx-auto px-4 md:px-6">
          {/* Hero Section - Gray background, NOT a white card */}
          <HeroSection />
        </main>
      </div>
    </>
  );
}
