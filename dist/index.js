var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  fullResourceContentSchema: () => fullResourceContentSchema,
  insertResourceSchema: () => insertResourceSchema,
  insertResourceTemplateSchema: () => insertResourceTemplateSchema,
  insertUserSchema: () => insertUserSchema,
  resourceTemplates: () => resourceTemplates,
  resources: () => resources,
  users: () => users,
  webhookResourceSchema: () => webhookResourceSchema
});
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  resourceId: text("resource_id").notNull().unique(),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  buttonText: text("button_text").notNull(),
  buttonUrl: text("button_url").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  templateId: text("template_id"),
  // Links to Resource in resource_templates table
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var resourceTemplates = pgTable("resource_templates", {
  id: serial("id").primaryKey(),
  resourceId: text("resource_id").notNull().unique(),
  headline: text("headline").notNull(),
  subheadline: text("subheadline").notNull(),
  body: text("body").notNull(),
  // JSON string containing template data
  template: text("template").notNull().default("simple"),
  // Template type
  slug: text("slug").notNull().unique(),
  // URL slug for the template page
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  featuredImage: text("featured_image"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertResourceTemplateSchema = createInsertSchema(resourceTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var webhookResourceSchema = z.object({
  headline: z.string().min(1).max(100),
  image_url: z.string().url(),
  description: z.string().min(1).max(500),
  link: z.string().url(),
  button_text: z.string().min(1).max(50).optional(),
  resource_type: z.enum(["case-study", "video", "guide", "tool"]).optional(),
  priority: z.enum(["high", "normal"]).optional()
});
var fullResourceContentSchema = z.object({
  headline: z.string().min(1).max(200),
  subheadline: z.string().min(1).max(300),
  body: z.array(z.object({
    type: z.enum(["heading", "paragraph", "image", "list", "quote", "cta"]),
    content: z.string(),
    props: z.record(z.any()).optional()
    // Additional properties like image alt, list items, etc.
  })),
  template: z.enum(["default", "case-study", "guide", "video-transcript"]).default("default"),
  slug: z.string().min(1).max(100),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  featuredImage: z.string().url().optional()
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Resource management methods
  async getAllResources() {
    return await db.select().from(resources).orderBy(resources.id);
  }
  async getActiveResources() {
    return await db.select().from(resources).where(eq(resources.isActive, true)).orderBy(resources.id);
  }
  async getActiveResourcesWithTemplateData() {
    const activeResources = await db.select().from(resources).where(eq(resources.isActive, true)).orderBy(resources.id);
    const resourcesWithTemplateData = await Promise.all(
      activeResources.map(async (resource) => {
        if (resource.templateId) {
          const [template] = await db.select().from(resourceTemplates).where(eq(resourceTemplates.slug, resource.templateId));
          if (template) {
            return {
              ...resource,
              title: template.headline,
              // Use template headline as card title
              description: template.subheadline,
              // Use template subheadline as card description
              imageUrl: template.featuredImage || resource.imageUrl
              // Use template featured image if available
            };
          }
        }
        return resource;
      })
    );
    return resourcesWithTemplateData;
  }
  async getResourceById(resourceId) {
    const [resource] = await db.select().from(resources).where(eq(resources.resourceId, resourceId));
    return resource || void 0;
  }
  async createResource(resource) {
    const [newResource] = await db.insert(resources).values({
      ...resource,
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return newResource;
  }
  async updateResource(resourceId, updates) {
    const [updated] = await db.update(resources).set({
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(resources.resourceId, resourceId)).returning();
    return updated || void 0;
  }
  async toggleResourceStatus(resourceId) {
    const resource = await this.getResourceById(resourceId);
    if (!resource) return false;
    const [updated] = await db.update(resources).set({
      isActive: !resource.isActive,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(resources.resourceId, resourceId)).returning();
    return updated?.isActive || false;
  }
  async deleteResource(resourceId) {
    const result = await db.delete(resources).where(eq(resources.resourceId, resourceId));
    return (result.rowCount || 0) > 0;
  }
  // Resource management methods (full template content)
  async getAllResourceTemplates() {
    return await db.select().from(resourceTemplates).orderBy(desc(resourceTemplates.createdAt));
  }
  async getPublishedResourceTemplates() {
    return await db.select().from(resourceTemplates).where(eq(resourceTemplates.isPublished, true)).orderBy(desc(resourceTemplates.createdAt));
  }
  async getResourceTemplateById(resourceId) {
    const [resource] = await db.select().from(resourceTemplates).where(eq(resourceTemplates.resourceId, resourceId));
    return resource || void 0;
  }
  async getResourceTemplateBySlug(slug) {
    const [resource] = await db.select().from(resourceTemplates).where(eq(resourceTemplates.slug, slug));
    return resource || void 0;
  }
  async createResourceTemplate(resource) {
    const [newResource] = await db.insert(resourceTemplates).values({
      ...resource,
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    const existingNavigator = await db.select().from(resources).where(eq(resources.templateId, newResource.resourceId));
    if (existingNavigator.length === 0) {
      await this.autoCreateResourceNavigator(newResource);
    } else {
      console.log(`Navigator card already exists for template: ${newResource.resourceId}`);
    }
    return newResource;
  }
  // Auto-generate Resource Navigator from Resource template
  async autoCreateResourceNavigator(template) {
    let previewText = template.subheadline;
    try {
      const bodyData = JSON.parse(template.body);
      if (bodyData.sections && bodyData.sections.length > 0) {
        const firstSection = bodyData.sections[0];
        if (firstSection.content) {
          previewText = firstSection.content.substring(0, 120) + "...";
        }
      }
    } catch (e) {
      previewText = template.subheadline;
    }
    const navigatorCard = {
      resourceId: `nav-${template.resourceId}`,
      // Prefix to distinguish navigator cards
      imageUrl: template.featuredImage || "/api/placeholder-image.jpg",
      // Use featured image or placeholder
      title: template.headline,
      description: previewText,
      buttonText: "Learn More",
      buttonUrl: `/free-resources/${template.slug}`,
      // Link to full Resource
      templateId: template.resourceId,
      // Link back to the Resource
      isActive: template.isPublished
    };
    const [card] = await db.insert(resources).values({
      ...navigatorCard,
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    return card;
  }
  async updateResourceTemplate(resourceId, updates) {
    const [updated] = await db.update(resourceTemplates).set({
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(resourceTemplates.resourceId, resourceId)).returning();
    return updated || void 0;
  }
  async toggleResourceTemplateStatus(resourceId) {
    const resource = await this.getResourceTemplateById(resourceId);
    if (!resource) return false;
    const [updated] = await db.update(resourceTemplates).set({
      isPublished: !resource.isPublished,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(resourceTemplates.resourceId, resourceId)).returning();
    await this.syncResourceNavigatorStatus(resourceId, updated?.isPublished || false);
    return updated?.isPublished || false;
  }
  // Keep Resource Navigator in sync with Resource status
  async syncResourceNavigatorStatus(templateResourceId, isPublished) {
    await db.update(resources).set({
      isActive: isPublished,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(resources.templateId, templateResourceId));
  }
  async deleteResourceTemplate(resourceId) {
    const result = await db.delete(resourceTemplates).where(eq(resourceTemplates.resourceId, resourceId));
    return (result.rowCount || 0) > 0;
  }
  // Connected operation: Create Resource and automatically generate Resource Navigator card
  async createResourceTemplateWithCard(templateData, cardData) {
    const template = await this.createResourceTemplate(templateData);
    const cardWithLink = {
      ...cardData,
      templateId: template.resourceId,
      buttonUrl: `/resource/${template.slug}`
      // Link to the template page
    };
    const card = await this.createResource(cardWithLink);
    return { template, card };
  }
};
var storage = new DatabaseStorage();

// server/uploads.ts
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import https from "https";
import http from "http";
var uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
var storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});
var upload = multer({
  storage: storage2,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
});
async function downloadAndHostImage(imageUrl) {
  return new Promise((resolve, reject) => {
    if (!imageUrl || !imageUrl.startsWith("http")) {
      reject(new Error("Invalid image URL"));
      return;
    }
    const protocol = imageUrl.startsWith("https") ? https : http;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = ".jpg";
    const urlParts = imageUrl.split("?")[0].split("/");
    const lastPart = urlParts[urlParts.length - 1];
    if (lastPart.includes(".")) {
      const possibleExt = "." + lastPart.split(".").pop()?.toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(possibleExt)) {
        ext = possibleExt;
      }
    }
    const filename = `webhook-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadsDir, filename);
    const file = fs.createWriteStream(filePath);
    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          console.log(`Following redirect to: ${redirectUrl}`);
          file.close();
          fs.unlink(filePath, () => {
          });
          downloadAndHostImage(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {
        });
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(`/uploads/${filename}`);
      });
      file.on("error", (err) => {
        fs.unlink(filePath, () => {
        });
        reject(err);
      });
    }).on("error", (err) => {
      file.close();
      fs.unlink(filePath, () => {
      });
      reject(err);
    });
  });
}
function setupImageUpload(app2) {
  app2.use("/uploads", express.static(uploadsDir));
  app2.post("/api/upload/image", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      res.json({
        success: true,
        imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });
  app2.delete("/api/upload/image/:filename", (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ success: true, message: "Image deleted successfully" });
      } else {
        res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error("Image deletion error:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });
}

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  setupImageUpload(app2);
  app2.post("/api/webhook/airtable-resource", async (req, res) => {
    try {
      console.log("Received Airtable webhook:", req.body);
      const webhookData = webhookResourceSchema.parse(req.body);
      const resourceId = webhookData.headline.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").substring(0, 50);
      let hostedImageUrl;
      try {
        console.log(`Downloading image from Airtable: ${webhookData.image_url}`);
        hostedImageUrl = await downloadAndHostImage(webhookData.image_url);
        console.log(`Image downloaded and hosted: ${hostedImageUrl}`);
      } catch (error) {
        console.error("Failed to download image from Airtable:", error);
        return res.status(400).json({
          success: false,
          error: "Failed to download and host image from Airtable",
          details: error instanceof Error ? error.message : "Unknown error"
        });
      }
      const resourceData = {
        resourceId: `${resourceId}-${Date.now()}`,
        imageUrl: hostedImageUrl,
        // Now hosted locally on shadowpages.io/uploads/
        title: webhookData.headline,
        description: webhookData.description,
        buttonText: webhookData.button_text || generateButtonText(webhookData.resource_type),
        buttonUrl: webhookData.link,
        isActive: true
      };
      const newResource = await storage.createResource(resourceData);
      console.log("Resource created successfully:", newResource.resourceId);
      res.json({
        success: true,
        message: "Resource added successfully with hosted image",
        resource: newResource,
        hostedImageUrl
      });
    } catch (error) {
      console.error("Airtable webhook error:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Invalid webhook data"
      });
    }
  });
  app2.post("/api/webhook/add-resource", async (req, res) => {
    try {
      const webhookData = webhookResourceSchema.parse(req.body);
      const resourceId = webhookData.headline.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").substring(0, 50);
      let buttonColor = "blue";
      if (webhookData.resource_type === "video" || webhookData.priority === "high") {
        buttonColor = "red";
      }
      let hostedImageUrl;
      try {
        hostedImageUrl = await downloadAndHostImage(webhookData.image_url);
        console.log(`Image downloaded and hosted: ${hostedImageUrl}`);
      } catch (error) {
        console.error("Failed to download image:", error);
        throw new Error("Failed to download and host image");
      }
      const resourceData = {
        resourceId: `${resourceId}-${Date.now()}`,
        imageUrl: hostedImageUrl,
        // Use the locally hosted image URL
        title: webhookData.headline,
        description: webhookData.description,
        buttonText: webhookData.button_text || generateButtonText(webhookData.resource_type),
        buttonUrl: webhookData.link,
        isActive: true
      };
      const newResource = await storage.createResource(resourceData);
      res.json({
        success: true,
        message: "Resource added successfully",
        resource: newResource,
        webhook_url: `${req.protocol}://${req.get("host")}/api/webhook/add-resource`
      });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).json({
        success: false,
        message: "Failed to add resource",
        error: error instanceof z2.ZodError ? error.errors : "Invalid data"
      });
    }
  });
  app2.get("/api/resources", async (req, res) => {
    try {
      const resources2 = await storage.getActiveResourcesWithTemplateData();
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.json(resources2);
    } catch (error) {
      console.error("Error fetching resources from database:", error);
      res.status(500).json({ error: "Database connection failed" });
    }
  });
  app2.get("/api/admin/resources", async (req, res) => {
    try {
      const resources2 = await storage.getAllResources();
      res.json(resources2);
    } catch (error) {
      console.error("Error fetching all resources:", error);
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });
  app2.patch("/api/resources/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const isActive = await storage.toggleResourceStatus(id);
      res.json({ success: true, isActive });
    } catch (error) {
      console.error("Error toggling resource:", error);
      res.status(500).json({ error: "Failed to toggle resource" });
    }
  });
  app2.delete("/api/resources/:id", async (req, res) => {
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
  app2.get("/api/resource-templates", async (req, res) => {
    try {
      const resourceTemplates2 = await storage.getPublishedResourceTemplates();
      res.json(resourceTemplates2);
    } catch (error) {
      console.error("Error fetching resource templates:", error);
      res.status(500).json({ error: "Failed to fetch resource templates" });
    }
  });
  app2.get("/api/resource-templates/slug/:slug", async (req, res) => {
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
  app2.get("/api/admin/resource-templates", async (req, res) => {
    try {
      const resourceTemplates2 = await storage.getAllResourceTemplates();
      res.json(resourceTemplates2);
    } catch (error) {
      console.error("Error fetching all resource templates:", error);
      res.status(500).json({ error: "Failed to fetch resource templates" });
    }
  });
  app2.post("/api/admin/resource-templates", async (req, res) => {
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
  app2.post("/api/admin/resource-templates-with-card", async (req, res) => {
    try {
      const { templateData, cardData } = req.body;
      const result = await storage.createResourceTemplateWithCard(templateData, cardData);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating resource template with card:", error);
      res.status(500).json({ error: "Failed to create resource template with card" });
    }
  });
  app2.put("/api/admin/resource-templates/:id", async (req, res) => {
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
  app2.patch("/api/admin/resource-templates/:id/toggle", async (req, res) => {
    try {
      const { id } = req.params;
      const isPublished = await storage.toggleResourceTemplateStatus(id);
      res.json({ success: true, isPublished });
    } catch (error) {
      console.error("Error toggling resource template status:", error);
      res.status(500).json({ error: "Failed to toggle resource template status" });
    }
  });
  app2.delete("/api/admin/resource-templates/:id", async (req, res) => {
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
  app2.post("/api/webhook/post-conversion", async (req, res) => {
    try {
      const { session_id, resource, timestamp: timestamp2, action } = req.body;
      console.log(`[POST-CONVERSION WEBHOOK] ${session_id} read "${resource}" at ${new Date(timestamp2).toISOString()}`);
      res.status(200).json({ success: true, message: "Post-conversion tracking recorded" });
    } catch (error) {
      console.error("Post-conversion webhook error:", error);
      res.status(500).json({ error: "Failed to process post-conversion webhook" });
    }
  });
  app2.post("/api/webhook/conversion-status", async (req, res) => {
    try {
      const { session_id, email, status } = req.body;
      console.log(`[CONVERSION CONFIRMED] Session ${session_id} converted with email: ${email}`);
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
  const httpServer = createServer(app2);
  return httpServer;
}
function generateButtonText(resourceType) {
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

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
