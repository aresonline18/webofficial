import { useEffect } from 'react';
import { queryClient } from '@/lib/queryClient';

export function useWebSocket() {
  useEffect(() => {
    // Only connect in browser environment
    if (typeof window === 'undefined') return;
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.hostname}:5001`;
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('[WebSocket] Connected for real-time resource updates');
    };
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('[WebSocket] Resource update received:', message);
        
        // Invalidate and refetch resources when any change occurs
        queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
        queryClient.invalidateQueries({ queryKey: ['/api/admin/resources'] });
        
      } catch (error) {
        console.error('[WebSocket] Error parsing message:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('[WebSocket] Disconnected');
    };
    
    ws.onerror = (error) => {
      console.error('[WebSocket] Connection error:', error);
    };
    
    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);
}