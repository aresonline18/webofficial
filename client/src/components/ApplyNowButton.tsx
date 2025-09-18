import { useUrlTracking } from "@/hooks/use-url-tracking";

interface ApplyNowButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function ApplyNowButton({ className, onClick }: ApplyNowButtonProps) {
  const { getTrackedResources } = useUrlTracking();
  
  const handleClick = () => {
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';
    
    // Get the last read resource for UTM campaign
    const trackedResources = getTrackedResources();
    const lastResource = trackedResources.length > 0 ? trackedResources[trackedResources.length - 1] : (isHomePage ? 'no-resource-read' : 'general');
    
    // Create UTM campaign from last read resource
    const resourceSlug = lastResource === 'no-resource-read' ? 'no-resource-read' : lastResource
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    // Build URL with appropriate UTM source
    const utmSource = isHomePage ? 'home-page' : 'free-resource';
    const url = `https://shadowpages.typeform.com/dms-overall?utm_source=${utmSource}&utm_campaign=${resourceSlug}&utm_medium=EricHustls`;
    
    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Call optional onClick callback
    if (onClick) {
      onClick();
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      Apply Now
    </button>
  );
}