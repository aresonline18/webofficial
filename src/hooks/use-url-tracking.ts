import { useLocation } from 'wouter';

export function useUrlTracking() {
  const [location, navigate] = useLocation();

  // Generate unique session identifier
  const generateSessionId = (): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    return `sp_${timestamp}_${randomString}`;
  };

  // Get or create session ID
  const getSessionId = (): string => {
    let sessionId = localStorage.getItem('sp_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('sp_session_id', sessionId);
      localStorage.setItem('sp_session_start', Date.now().toString());
    }
    return sessionId;
  };

  // Check if user is converted
  const isUserConverted = (): boolean => {
    return localStorage.getItem('sp_converted') === 'true';
  };

  // Mark user as converted
  const markUserAsConverted = (): void => {
    localStorage.setItem('sp_converted', 'true');
    localStorage.setItem('sp_converted_at', Date.now().toString());
  };

  // Create shorter identifiers for resources
  const createResourceId = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .substring(0, 30); // Limit length
  };

  // Create Airtable-friendly resource names (for multiple select)
  const createAirtableName = (title: string): string => {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, '') // Keep letters, numbers, spaces
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim()
      .substring(0, 50); // Airtable limit
  };

  // Send post-conversion webhook
  const sendPostConversionWebhook = async (data: {
    session_id: string;
    resource: string;
    timestamp: number;
    action: string;
  }): Promise<void> => {
    try {
      await fetch('/api/webhook/post-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Failed to send post-conversion webhook:', error);
    }
  };

  const trackResourceRead = async (resourceTitle: string): Promise<void> => {
    const sessionId = getSessionId();
    const timestamp = Date.now();
    const resourceId = createResourceId(resourceTitle);
    const airtableName = createAirtableName(resourceTitle);

    // Check if user is already converted
    if (isUserConverted()) {
      // Post-conversion tracking: Send immediate webhook
      await sendPostConversionWebhook({
        session_id: sessionId,
        resource: airtableName,
        timestamp,
        action: 'resource_read'
      });
      
      // Still update URL for visibility
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('post_conversion', 'true');
      urlParams.set('latest_read', resourceId);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
      
    } else {
      // Pre-conversion tracking: Store in URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const existingReads = urlParams.getAll('read');
      const existingTitles = urlParams.getAll('title');
      const existingTimestamps = urlParams.getAll('ts');
      
      // Add session ID to URL
      urlParams.set('sid', sessionId);
      
      // Add new resource if not already tracked
      if (!existingReads.includes(resourceId)) {
        urlParams.append('read', resourceId);
        urlParams.append('title', airtableName);
        urlParams.append('ts', timestamp.toString());
      }
      
      // Set the last clicked resource (conversion trigger)
      urlParams.set('last', resourceId);
      urlParams.set('convert_trigger', airtableName);
      
      // Update URL without page reload
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  };

  const getTrackedResources = (): string[] => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('read').filter(r => r.length > 0);
  };

  const getAirtableData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = getSessionId();
    const timestamps = urlParams.getAll('ts');
    
    return {
      sessionId,
      resourceIds: urlParams.getAll('read'),
      resourceTitles: urlParams.getAll('title'),
      resourceTimestamps: timestamps,
      lastResource: urlParams.get('last'),
      conversionTrigger: urlParams.get('convert_trigger'),
      resourceCount: urlParams.getAll('read').length,
      // For Airtable multiple select (comma-separated)
      allResourcesForAirtable: urlParams.getAll('title').join(', '),
      // For analytics
      engagementLevel: urlParams.getAll('read').length >= 3 ? 'High' : 
                      urlParams.getAll('read').length >= 2 ? 'Medium' : 'Low',
      isConverted: isUserConverted(),
      sessionStart: localStorage.getItem('sp_session_start'),
      convertedAt: localStorage.getItem('sp_converted_at')
    };
  };

  const enhanceApplyNowUrl = (baseUrl: string): string => {
    const sessionId = getSessionId();
    const data = getAirtableData();
    const url = new URL(baseUrl);
    
    // Add tracking data to Typeform URL
    url.searchParams.set('session_id', sessionId);
    url.searchParams.set('resources_read', data.allResourcesForAirtable);
    url.searchParams.set('conversion_trigger', data.conversionTrigger || 'Unknown');
    url.searchParams.set('resource_timestamps', data.resourceTimestamps.join(','));
    
    return url.toString();
  };

  // Handle conversion confirmation from Make.com
  const handleConversionConfirmation = (sessionId: string): void => {
    const currentSessionId = getSessionId();
    if (currentSessionId === sessionId) {
      markUserAsConverted();
    }
  };

  const clearTracking = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('read');
    urlParams.delete('title');
    urlParams.delete('ts');
    urlParams.delete('last');
    urlParams.delete('convert_trigger');
    urlParams.delete('sid');
    urlParams.delete('post_conversion');
    urlParams.delete('latest_read');
    
    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  };

  return {
    trackResourceRead,
    getTrackedResources,
    getAirtableData,
    enhanceApplyNowUrl,
    getSessionId,
    isUserConverted,
    markUserAsConverted,
    handleConversionConfirmation,
    clearTracking
  };
}