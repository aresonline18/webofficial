import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupImageUpload, downloadAndHostImage } from "./uploads";
import { webhookResourceSchema, type WebhookResourceData, type InsertResource } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup image upload functionality
  setupImageUpload(app);

  // Webhook endpoint for Airtable integration (downloads and hosts images)
  app.post("/api/webhook/airtable-resource", async (req, res) => {
    try {
      console.log('Received Airtable webhook:', req.body);
      
      // Validate incoming webhook data
      const webhookData: WebhookResourceData = webhookResourceSchema.parse(req.body);
      
      // Generate resource ID from headline
      const resourceId = webhookData.headline
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .substring(0, 50); // Limit length
      
      // Download and host the image locally from Airtable
      let hostedImageUrl: string;
      try {
        console.log(`Downloading image from Airtable: ${webhookData.image_url}`);
        hostedImageUrl = await downloadAndHostImage(webhookData.image_url);
        console.log(`Image downloaded and hosted: ${hostedImageUrl}`);
      } catch (error) {
        console.error('Failed to download image from Airtable:', error);
        return res.status(400).json({ 
          success: false, 
          error: 'Failed to download and host image from Airtable',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      // Create resource object with locally hosted image
      const resourceData: InsertResource = {
        resourceId: `${resourceId}-${Date.now()}`,
        imageUrl: hostedImageUrl, // Now hosted locally on shadowpages.io/uploads/
        title: webhookData.headline,
        description: webhookData.description,
        buttonText: webhookData.button_text || generateButtonText(webhookData.resource_type),
        buttonUrl: webhookData.link,
        isActive: true,
      };

      // Save to database
      const newResource = await storage.createResource(resourceData);
      
      console.log('Resource created successfully:', newResource.resourceId);
      
      res.json({
        success: true,
        message: "Resource added successfully with hosted image",
        resource: newResource,
        hostedImageUrl: hostedImageUrl
      });
    } catch (error) {
      console.error('Airtable webhook error:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Invalid webhook data"
      });
    }
  });

  // Original webhook endpoint for direct resource addition (no image download)
  app.post("/api/webhook/add-resource", async (req, res) => {
    try {
      // Validate incoming webhook data
      const webhookData: WebhookResourceData = webhookResourceSchema.parse(req.body);
      
      // Generate resource ID from headline
      const resourceId = webhookData.headline
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .substring(0, 50); // Limit length
      
      // Determine button color based on resource type and priority
      let buttonColor: "red" | "blue" = "blue";
      if (webhookData.resource_type === "video" || webhookData.priority === "high") {
        buttonColor = "red";
      }
      
      // Download and host the image locally
      let hostedImageUrl: string;
      try {
        hostedImageUrl = await downloadAndHostImage(webhookData.image_url);
        console.log(`Image downloaded and hosted: ${hostedImageUrl}`);
      } catch (error) {
        console.error('Failed to download image:', error);
        throw new Error('Failed to download and host image');
      }

      // Create resource object (simplified schema)
      const resourceData: InsertResource = {
        resourceId: `${resourceId}-${Date.now()}`,
        imageUrl: hostedImageUrl, // Use the locally hosted image URL
        title: webhookData.headline,
        description: webhookData.description,
        buttonText: webhookData.button_text || generateButtonText(webhookData.resource_type),
        buttonUrl: webhookData.link,
        isActive: true,
      };
      
      // Save to database
      const newResource = await storage.createResource(resourceData);
      
      res.json({
        success: true,
        message: "Resource added successfully",
        resource: newResource,
        webhook_url: `${req.protocol}://${req.get('host')}/api/webhook/add-resource`
      });
      
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to add resource",
        error: error instanceof z.ZodError ? error.errors : "Invalid data"
      });
    }
  });

  // Get all active resources API endpoint - WITH TEMPLATE DATA SYNC
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getActiveResourcesWithTemplateData();
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources from database:", error);
      res.status(500).json({ error: "Database connection failed" });
    }
  });

  // Get all resources (including inactive) for admin
  app.get("/api/admin/resources", async (req, res) => {
    try {
      const resources = await storage.getAllResources();
      res.json(resources);
    } catch (error) {
      console.error("Error fetching all resources:", error);
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  // Toggle resource status
  app.patch("/api/resources/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const isActive = await storage.toggleResourceStatus(id);
      res.json({ success: true, isActive });
    } catch (error) {
      console.error("Error toggling resource:", error);
      res.status(500).json({ error: "Failed to toggle resource" });
    }
  });

  // Delete resource
  app.delete("/api/resources/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteResource(id);
      if (deleted) {
        res.json({ success: true, message: "Resource deleted" });
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      res.status(500).json({ error: "Failed to delete resource" });
    }
  });

  // Resource Template endpoints
  app.get("/api/resource-templates", async (req, res) => {
    try {
      const resourceTemplates = await storage.getPublishedResourceTemplates();
      res.json(resourceTemplates);
    } catch (error) {
      console.error("Error fetching resource templates:", error);
      res.status(500).json({ error: "Failed to fetch resource templates" });
    }
  });

  app.get("/api/resource-templates/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const resourceTemplate = await storage.getResourceTemplateBySlug(slug);
      if (!resourceTemplate) {
        return res.status(404).json({ error: "Resource template not found" });
      }
      res.json(resourceTemplate);
    } catch (error) {
      console.error("Error fetching resource template:", error);
      res.status(500).json({ error: "Failed to fetch resource template" });
    }
  });

  // Admin endpoints for resource templates
  app.get("/api/admin/resource-templates", async (req, res) => {
    try {
      const resourceTemplates = await storage.getAllResourceTemplates();
      res.json(resourceTemplates);
    } catch (error) {
      console.error("Error fetching all resource templates:", error);
      res.status(500).json({ error: "Failed to fetch resource templates" });
    }
  });

  app.post("/api/admin/resource-templates", async (req, res) => {
    try {
      const resourceTemplate = await storage.createResourceTemplate(req.body);
      res.status(201).json({ 
        resourceTemplate, 
        message: "Resource created with automatic Resource Navigator card" 
      });
    } catch (error) {
      console.error("Error creating resource template:", error);
      res.status(500).json({ error: "Failed to create resource template" });
    }
  });

  // Connected operation: Create resource template with display card
  app.post("/api/admin/resource-templates-with-card", async (req, res) => {
    try {
      const { templateData, cardData } = req.body;
      const result = await storage.createResourceTemplateWithCard(templateData, cardData);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating resource template with card:", error);
      res.status(500).json({ error: "Failed to create resource template with card" });
    }
  });

  app.put("/api/admin/resource-templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateResourceTemplate(id, req.body);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Resource template not found" });
      }
    } catch (error) {
      console.error("Error updating resource template:", error);
      res.status(500).json({ error: "Failed to update resource template" });
    }
  });

  app.patch("/api/admin/resource-templates/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const isPublished = await storage.toggleResourceTemplateStatus(id);
      res.json({ success: true, isPublished });
    } catch (error) {
      console.error("Error toggling resource template status:", error);
      res.status(500).json({ error: "Failed to toggle resource template status" });
    }
  });

  app.delete("/api/admin/resource-templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteResourceTemplate(id);
      if (deleted) {
        res.json({ success: true, message: "Resource template deleted" });
      } else {
        res.status(404).json({ error: "Resource template not found" });
      }
    } catch (error) {
      console.error("Error deleting resource template:", error);
      res.status(500).json({ error: "Failed to delete resource template" });
    }
  });

  // Webhook endpoint for post-conversion tracking
  app.post("/api/webhook/post-conversion", async (req, res) => {
    try {
      const { session_id, resource, timestamp, action } = req.body;
      
      console.log(`[POST-CONVERSION WEBHOOK] ${session_id} read "${resource}" at ${new Date(timestamp).toISOString()}`);
      
      // Here you would typically send this data to Make.com
      // For now, we'll just log it and return success
      
      // In production, this would be:
      // await sendToMakeWebhook({
      //   session_id,
      //   resource,
      //   timestamp,
      //   action,
      //   event_type: 'post_conversion_resource_read'
      // });
      
      res.status(200).json({ success: true, message: "Post-conversion tracking recorded" });
    } catch (error) {
      console.error("Post-conversion webhook error:", error);
      res.status(500).json({ error: "Failed to process post-conversion webhook" });
    }
  });

  // Webhook endpoint for Make.com to confirm conversions
  app.post("/api/webhook/conversion-status", async (req, res) => {
    try {
      const { session_id, email, status } = req.body;
      
      console.log(`[CONVERSION CONFIRMED] Session ${session_id} converted with email: ${email}`);
      
      // Store conversion status (in production, you'd use a database)
      // For now, this endpoint just confirms receipt
      
      res.status(200).json({ 
        success: true, 
        message: "Conversion status updated",
        session_id 
      });
    } catch (error) {
      console.error("Conversion status webhook error:", error);
      res.status(500).json({ error: "Failed to update conversion status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate button text based on resource type
function generateButtonText(resourceType?: string): string {
  switch (resourceType) {
    case "case-study":
      return "See case study";
    case "video":
      return "Watch now";
    case "guide":
      return "Get free guide";
    case "tool":
      return "Use tool";
    default:
      return "Get access";
  }
}
