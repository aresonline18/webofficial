import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import ImageUpload from "@/components/ImageUpload";

interface FullResource {
  id: number;
  resourceId: string;
  headline: string;
  subheadline: string;
  body: string;
  template: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContentBlock {
  type: "heading" | "paragraph" | "image" | "list" | "quote" | "cta";
  content: string;
  props?: Record<string, any>;
}

export default function FullResourceManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingResource, setEditingResource] = useState<FullResource | null>(null);
  const { toast } = useToast();

  const { data: fullResources, isLoading } = useQuery<FullResource[]>({
    queryKey: ["/api/admin/full-resources"],
  });

  const createMutation = useMutation({
    mutationFn: async (resourceData: any) => {
      const response = await fetch("/api/admin/full-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resourceData),
      });
      if (!response.ok) throw new Error("Failed to create resource");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/full-resources"] });
      toast({ title: "Success", description: "Full resource created successfully" });
      setIsCreating(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create full resource", variant: "destructive" });
    },
  });

  const createWithCardMutation = useMutation({
    mutationFn: async ({ fullResourceData, cardData }: any) => {
      const response = await fetch("/api/admin/full-resources-with-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullResourceData, cardData }),
      });
      if (!response.ok) throw new Error("Failed to create resource with card");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/full-resources"] });
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      toast({ title: "Success", description: "Full resource and display card created successfully" });
      setIsCreating(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create resource with card", variant: "destructive" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await fetch(`/api/admin/full-resources/${resourceId}/toggle`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to toggle resource status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/full-resources"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (resourceId: string) => {
      const response = await fetch(`/api/admin/full-resources/${resourceId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete resource");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/full-resources"] });
      toast({ title: "Success", description: "Full resource deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete full resource", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Full Resource Database</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Full Resource Database</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Full Resource
        </Button>
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        {fullResources?.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{resource.headline}</CardTitle>
                  <p className="text-sm text-muted-foreground">{resource.subheadline}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={resource.isPublished ? "default" : "secondary"}>
                      {resource.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{resource.template}</Badge>
                    <span className="text-xs text-muted-foreground">/{resource.slug}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`/resource/${resource.slug}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={resource.isPublished}
                    onCheckedChange={() => toggleMutation.mutate(resource.resourceId)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingResource(resource)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this resource?")) {
                        deleteMutation.mutate(resource.resourceId);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog would go here - simplified for now */}
      {isCreating && (
        <FullResourceForm
          onSubmit={(data, withCard) => {
            if (withCard) {
              createWithCardMutation.mutate(data);
            } else {
              createMutation.mutate(data.fullResourceData);
            }
          }}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Resource</h3>
            <p>Editing functionality would be implemented here for: {editingResource.headline}</p>
            <Button 
              className="mt-4" 
              onClick={() => setEditingResource(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FullResourceForm({ onSubmit, onCancel }: {
  onSubmit: (data: any, withCard: boolean) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    headline: "",
    subheadline: "",
    body: "[]", // JSON string for content blocks
    template: "default",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    featuredImage: "",
  });

  const [cardData, setCardData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    buttonText: "Read More",
  });

  const [createWithCard, setCreateWithCard] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const resourceId = `resource-${Date.now()}`;
    
    const fullResourceData = {
      ...formData,
      resourceId,
      isPublished: true,
    };

    if (createWithCard) {
      const cardResourceData = {
        ...cardData,
        resourceId: `card-${resourceId}`,
        isActive: true,
      };

      onSubmit({ fullResourceData, cardData: cardResourceData }, true);
    } else {
      onSubmit({ fullResourceData }, false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Create Full Resource</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
              <TabsTrigger value="display">Display Card</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="subheadline">Subheadline</Label>
                <Input
                  id="subheadline"
                  value={formData.subheadline}
                  onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="my-awesome-resource"
                  required
                />
              </div>

              <div>
                <Label htmlFor="template">Template</Label>
                <Select value={formData.template} onValueChange={(value) => setFormData({ ...formData, template: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="video-transcript">Video Transcript</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="body">Content (JSON Format)</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  rows={8}
                  placeholder='[{"type": "paragraph", "content": "Your content here..."}]'
                />
                <p className="text-xs text-muted-foreground mt-1">
                  JSON array of content blocks. Types: heading, paragraph, image, list, quote, cta
                </p>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  maxLength={60}
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  maxLength={160}
                  rows={3}
                />
              </div>

              <div>
                <ImageUpload
                  label="Featured Image"
                  value={formData.featuredImage}
                  onChange={(featuredImage) => setFormData({ ...formData, featuredImage })}
                />
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={createWithCard}
                  onCheckedChange={setCreateWithCard}
                />
                <Label>Also create display card for main page</Label>
              </div>

              {createWithCard && (
                <>
                  <div>
                    <Label htmlFor="cardTitle">Card Title</Label>
                    <Input
                      id="cardTitle"
                      value={cardData.title}
                      onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardDescription">Card Description</Label>
                    <Textarea
                      id="cardDescription"
                      value={cardData.description}
                      onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div>
                    <ImageUpload
                      label="Card Image"
                      value={cardData.imageUrl}
                      onChange={(imageUrl) => setCardData({ ...cardData, imageUrl })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={cardData.buttonText}
                      onChange={(e) => setCardData({ ...cardData, buttonText: e.target.value })}
                    />
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Resource
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}