import { useUrlTracking } from "@/hooks/use-url-tracking";
import { useUrlParams } from '@/hooks/useUrlParams';

interface ResourceApplyNowButtonProps {
  resourceName: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  utmTerm?: string;
}

export default function ResourceApplyNowButton({ 
  resourceName, 
  className, 
  children, 
  style,
  onClick,
  utmTerm 
}: ResourceApplyNowButtonProps) {
  const { getParam } = useUrlParams();
  const utmMedium = getParam('utm_medium') || 'EricHustls';
  
  const handleClick = () => {
    // Create resource-specific UTM campaign from resource name
    const resourceSlug = resourceName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    // Build URL with UTM parameters, including utm_term if provided
    let url = `https://calendly.com/shadow-pages/booking-a?utm_source=free-resource&utm_campaign=${resourceSlug}&utm_medium=${encodeURIComponent(utmMedium)}`;
    if (utmTerm) {
      url += `&utm_term=${encodeURIComponent(utmTerm)}`;
    }
    
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
      style={style}
    >
      {children || 'Apply Now'}
    </button>
  );
}