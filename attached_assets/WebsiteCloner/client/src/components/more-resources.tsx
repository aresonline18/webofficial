interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const templateArticles: Article[] = [
  {
    id: "1",
    title: "CASE STUDY: $2.67M. 1 Client. 19 months.",
    description: "Strategies on acquiring, onboarding and retaining **$1M+/year clients**",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Case study thumbnail"
  },
  {
    id: "2", 
    title: "Top 8 Online Businesses Ranked (2025)",
    description: "I've ranked the top online business models **from best to worst**",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Business ranking thumbnail"
  },
  {
    id: "3",
    title: "Generate 11,000+ Qualified Leads Every Month", 
    description: "Getting as many leads and clients **as you can possibly handle**",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Lead generation thumbnail"
  }
];

export default function MoreResources() {
  const handlePrevious = () => {
    // Navigate to previous articles
    console.log('Previous articles');
  };

  const handleNext = () => {
    // Navigate to next articles
    console.log('Next articles');
  };

  return (
    <div className="container-narrow py-12 more-resources-mobile">
      <h2 className="font-inter font-black text-3xl text-black mb-2 text-left">
        Want more resources?
      </h2>
      <p className="text-gray-600 mb-8 text-left">
        Check out our articles below.
      </p>
      
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-8">
        {templateArticles.map((article) => (
          <div key={article.id} className="flex flex-col article-item bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={article.image}
              alt={article.alt}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="font-inter font-black text-xl md:text-2xl text-black leading-tight mb-3">
                {article.title}
              </h3>
              <p 
                className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.description }}
              />
              <button 
                onClick={() => console.log(`Read article: ${article.title}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200"
              >
                Open case study
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={handlePrevious}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-200"
        >
          ← Previous
        </button>
        <button 
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
}