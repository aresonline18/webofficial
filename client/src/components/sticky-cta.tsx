import { useUrlParams } from '@/hooks/useUrlParams';

export default function StickyCTA() {
  const { hasParam, getParam } = useUrlParams();
  const showCTA = hasParam('utm_campaign');
  const utmMedium = getParam('utm_medium') || 'EricHustls';

  const handleCallBooking = () => {
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';
    
    if (isHomePage) {
      // Home page - use home-page UTM source with resource tracking
      const trackedResources = JSON.parse(localStorage.getItem('trackedResources') || '[]');
      const lastResource = trackedResources.length > 0 ? trackedResources[trackedResources.length - 1] : 'no-resource-read';
      
      const resourceSlug = lastResource === 'no-resource-read' ? 'no-resource-read' : lastResource
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      
      const url = `https://shadowpages.typeform.com/dms-overall?utm_source=home-page&utm_campaign=${resourceSlug}&utm_medium=${encodeURIComponent(utmMedium)}`;
      window.open(url, '_blank');
    } else {
      // Other pages - use existing free-resource UTM source
      const url = `https://shadowpages.typeform.com/dms-overall?utm_source=free-resource&utm_campaign=shadow-pages-playbook&utm_medium=${encodeURIComponent(utmMedium)}`;
      window.open(url, '_blank');
    }
  };

  // Hide CTA if no utm_campaign parameter
  if (!showCTA) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-5 md:right-5 md:left-auto sticky-cta-mobile">
      <button 
        onClick={handleCallBooking}
        className="text-white px-6 py-3 rounded-lg text-sm transition-colors duration-200 shadow-lg hover:shadow-xl w-full md:w-auto hover:opacity-90"
        style={{
          background: '#385dc6',
          fontWeight: 900
        }}
      >
        Book Your 1:1 Call
      </button>
    </div>
  );
}