import bookImage from "@assets/book (2)_1755008404700.png";
import { useEffect, useState } from "react";

export default function FreeResources() {
  const [isFemaleVersion, setIsFemaleVersion] = useState(false);

  useEffect(() => {
    // Check for UTM campaign parameter to determine version
    const urlParams = new URLSearchParams(window.location.search);
    const utmCampaign = urlParams.get('utm_campaign');
    
    // Show female version only if utm_campaign equals 'playbook-f'
    setIsFemaleVersion(utmCampaign === 'playbook-f');
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(20,35,60)] text-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 rounded-xl overflow-hidden">
            <img 
              src="/Untitled%20design%20(10)_1752994221787.png" 
              alt="Book Stack" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-black mb-6">Shadow Pages Playbook</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {isFemaleVersion ? (
              <>Free materials to help you <strong>build your empire and achieve financial independence</strong> through Shadow Pages</>
            ) : (
              <>Free materials to help you <strong>start, run and profit</strong> from Shadow Pages</>
            )}
          </p>
        </div>

        {/* Static Shadow Pages Playbook Resource Card */}
        <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto shadow-2xl">
          {/* Book Image */}
          <div className="flex-shrink-0">
            <img 
              src={bookImage}
              alt="Shadow Pages Playbook" 
              className="w-48 h-48 object-contain rounded-lg"
            />
          </div>
          
          {/* Content */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-[rgb(20,35,60)] mb-4">
              {isFemaleVersion ? 'Shadow Pages Queen Guide' : 'Shadow Pages Playbook'}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {isFemaleVersion ? (
                "Everything YOU need to know about creating your own successful Shadow Pages business and becoming financially independent as a boss babe entrepreneur..."
              ) : (
                "Everything YOU need to know about how Shadow Pages work and how you can generate cashflow from them..."
              )}
            </p>
            <a 
              href={isFemaleVersion ? "/free-resources/shadow-pages-playbook?utm_campaign=playbook-f" : "/free-resources/shadow-pages-playbook"}
              className="inline-block bg-gradient-to-b from-[rgb(56,93,198)] to-[rgb(44,74,158)] text-white px-8 py-4 rounded-full font-semibold text-lg hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              data-testid="button-learn-more"
            >
              {isFemaleVersion ? 'Get Your Guide' : 'Learn More'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}