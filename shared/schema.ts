import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Resource Navigator Database (display cards shown on homepage)
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  resourceId: text("resource_id").notNull().unique(),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  buttonText: text("button_text").notNull(),
  buttonUrl: text("button_url").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  templateId: text("template_id"), // Links to Resource in resource_templates table
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Resource Database (full template content storage)
export const resourceTemplates = pgTable("resource_templates", {
  id: serial("id").primaryKey(),
  resourceId: text("resource_id").notNull().unique(),
  headline: text("headline").notNull(),
  subheadline: text("subheadline").notNull(),
  body: text("body").notNull(), // JSON string containing template data
  template: text("template").notNull().default("simple"), // Template type
  slug: text("slug").notNull().unique(), // URL slug for the template page
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  featuredImage: text("featured_image"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResourceTemplateSchema = createInsertSchema(resourceTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const webhookResourceSchema = z.object({
  headline: z.string().min(1).max(100),
  image_url: z.string().url(),
  description: z.string().min(1).max(500),
  link: z.string().url(),
  button_text: z.string().min(1).max(50).optional(),
  resource_type: z.enum(["case-study", "video", "guide", "tool"]).optional(),
  priority: z.enum(["high", "normal"]).optional(),
});

// Full Resource Content Schema (rich content structure)
export const fullResourceContentSchema = z.object({
  headline: z.string().min(1).max(200),
  subheadline: z.string().min(1).max(300),
  body: z.array(z.object({
    type: z.enum(["heading", "paragraph", "image", "list", "quote", "cta"]),
    content: z.string(),
    props: z.record(z.any()).optional(), // Additional properties like image alt, list items, etc.
  })),
  template: z.enum(["default", "case-study", "guide", "video-transcript"]).default("default"),
  slug: z.string().min(1).max(100),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  featuredImage: z.string().url().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type ResourceTemplate = typeof resourceTemplates.$inferSelect;
export type InsertResourceTemplate = z.infer<typeof insertResourceTemplateSchema>;
export type WebhookResourceData = z.infer<typeof webhookResourceSchema>;
export type FullResourceContent = z.infer<typeof fullResourceContentSchema>;
