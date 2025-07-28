import { useUrlTracking } from "@/hooks/use-url-tracking";

interface ResourceApplyNowButtonProps {
  resourceName: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function ResourceApplyNowButton({ 
  resourceName, 
  className, 
  children, 
  style,
  onClick 
}: ResourceApplyNowButtonProps) {
  
  const handleClick = () => {
    // Create resource-specific UTM campaign from resource name
    const resourceSlug = resourceName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    // Build URL with only UTM parameters as specified
    const url = `https://shadowpages.typeform.com/dms-overall?utm_source=free-resource&utm_campaign=${resourceSlug}&utm_medium=EricHustls`;
    
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