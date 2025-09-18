import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import FullResourceManager from "@/components/FullResourceManager";
import ImageUpload from "@/components/ImageUpload";
import { Resource } from "@shared/schema";

// Use exact database schema - no custom interface needed
type DatabaseResource = Resource;

export default function Admin() {
  const [activeTab, setActiveTab] = useState('cards');
  const [webhookData, setWebhookData] = useState({
    headline: "",
    image_url: "",
    description: "",
    link: "",
    button_text: "",
    resource_type: "guide",
    priority: "normal"
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Direct database connection for admin - all resources including inactive
  const { data: resources = [], isLoading } = useQuery<DatabaseResource[]>({
    queryKey: ['/api/admin/resources'],
    staleTime: 0, // Always fresh data
    refetchOnWindowFocus: true,
  });

  // Add resource mutation - direct to webhook endpoint
  const addResourceMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/webhook/airtable-resource', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/resources'] });
      queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
      toast({
        title: "Success",
        description: "Resource added successfully!",
      });
      setWebhookData({
        headline: "",
        image_url: "",
        description: "",
        link: "",
        button_text: "",
        resource_type: "guide",
        priority: "normal"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add resource",
        variant: "destructive",
      });
    }
  });

  // Toggle resource mutation - direct database update
  const toggleMutation = useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await apiRequest('PATCH', `/api/resources/${resourceId}/toggle`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/resources'] });
      queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
      toast({
        title: "Success",
        description: "Resource status updated!",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addResourceMutation.mutate(webhookData);
  };

  const webhookUrl = `${window.location.protocol}//${window.location.host}/api/webhook/add-resource`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Resource Admin Panel</h1>
        
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('cards')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cards'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resource Cards (Overarching Database)
              </button>
              <button
                onClick={() => setActiveTab('full')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'full'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Full Resources (Content Database)
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'full' && <FullResourceManager />}
        
        {activeTab === 'cards' && (
          <>
            {/* Webhook URL */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Webhook URL</h2>
          <div className="bg-gray-100 p-3 rounded font-mono text-sm break-all">
            {webhookUrl}
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-4 rounded-r-lg">
            <h3 className="font-semibold text-blue-800">🎯 Airtable Image Hosting</h3>
            <p className="text-blue-700 mt-1 text-sm">
              <strong>New endpoint:</strong> <code>/api/webhook/airtable-resource</code><br/>
              This endpoint automatically downloads images from Airtable and hosts them at <code>shadowpages.io/uploads/</code>
            </p>
          </div>
          <p className="text-gray-600 mt-2">
            Use this URL to automatically add resources via webhook calls.
          </p>
        </div>

        {/* Test Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Webhook</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Headline *</label>
                <input
                  type="text"
                  value={webhookData.headline}
                  onChange={(e) => setWebhookData({...webhookData, headline: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  placeholder="CASE STUDY: $2M in 6 months"
                  required
                />
              </div>
              
              <div>
                <ImageUpload
                  label="Resource Image"
                  value={webhookData.image_url}
                  onChange={(imageUrl) => setWebhookData({...webhookData, image_url: imageUrl})}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={webhookData.description}
                  onChange={(e) => setWebhookData({...webhookData, description: e.target.value})}
                  className="w-full p-3 border rounded-lg h-20"
                  placeholder="How I achieved <strong>amazing results</strong> using this system"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Destination Link *</label>
                <input
                  type="url"
                  value={webhookData.link}
                  onChange={(e) => setWebhookData({...webhookData, link: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://example.com/resource"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={webhookData.button_text}
                  onChange={(e) => setWebhookData({...webhookData, button_text: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Get free access"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Resource Type</label>
                <select
                  value={webhookData.resource_type}
                  onChange={(e) => setWebhookData({...webhookData, resource_type: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="guide">Guide</option>
                  <option value="case-study">Case Study</option>
                  <option value="video">Video</option>
                  <option value="tool">Tool</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={webhookData.priority}
                  onChange={(e) => setWebhookData({...webhookData, priority: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="normal">Normal (Blue Button)</option>
                  <option value="high">High (Red Button)</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={addResourceMutation.isPending}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {addResourceMutation.isPending ? "Adding..." : "Add Resource"}
            </button>
          </form>
        </div>

        {/* Resources List */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">All Resources ({resources.length})</h2>
          
          {isLoading ? (
            <div className="text-center py-8">Loading resources...</div>
          ) : (
            <div className="space-y-4">
              {resources.map((resource: DatabaseResource) => (
                <div
                  key={resource.id}
                  className={`p-4 border rounded-lg ${resource.isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mt-1" dangerouslySetInnerHTML={{ __html: resource.description }} />
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Button: {resource.buttonText}</span>
                        <span>Created: {new Date(resource.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${resource.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {resource.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => toggleMutation.mutate(resource.resourceId)}
                        disabled={toggleMutation.isPending}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 disabled:opacity-50"
                      >
                        Toggle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}