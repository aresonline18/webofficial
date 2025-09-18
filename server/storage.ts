import { users, resources, resourceTemplates, type User, type InsertUser, type Resource, type InsertResource, type ResourceTemplate, type InsertResourceTemplate } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Overarching Resource management methods (display cards)
  getAllResources(): Promise<Resource[]>;
  getActiveResources(): Promise<Resource[]>;
  getActiveResourcesWithTemplateData(): Promise<Resource[]>;
  getResourceById(id: string): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: string, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  toggleResourceStatus(id: string): Promise<boolean>;
  deleteResource(id: string): Promise<boolean>;

  // Resource management methods (complete template content)
  getAllResourceTemplates(): Promise<ResourceTemplate[]>;
  getPublishedResourceTemplates(): Promise<ResourceTemplate[]>;
  getResourceTemplateById(id: string): Promise<ResourceTemplate | undefined>;
  getResourceTemplateBySlug(slug: string): Promise<ResourceTemplate | undefined>;
  createResourceTemplate(resource: InsertResourceTemplate): Promise<ResourceTemplate>;
  updateResourceTemplate(id: string, resource: Partial<InsertResourceTemplate>): Promise<ResourceTemplate | undefined>;
  toggleResourceTemplateStatus(id: string): Promise<boolean>;
  deleteResourceTemplate(id: string): Promise<boolean>;

  // Connected operations
  createResourceTemplateWithCard(templateData: InsertResourceTemplate, cardData: InsertResource): Promise<{ template: ResourceTemplate; card: Resource }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Resource management methods
  async getAllResources(): Promise<Resource[]> {
    // Admin panel should show resources in same order as frontend (display order)
    return await db.select().from(resources).orderBy(resources.id);
  }

  async getActiveResources(): Promise<Resource[]> {
    // Order by id ASC to show resources in the intended display order (first added = first shown)
    return await db.select().from(resources).where(eq(resources.isActive, true)).orderBy(resources.id);
  }

  async getActiveResourcesWithTemplateData(): Promise<Resource[]> {
    // Get active resources and sync data from their linked templates
    const activeResources = await db.select().from(resources).where(eq(resources.isActive, true)).orderBy(resources.id);
    
    // For each resource, if it has a template_id, pull the headline, subheadline, and featured image from the template
    const resourcesWithTemplateData = await Promise.all(
      activeResources.map(async (resource) => {
        if (resource.templateId) {
          // Get the linked template data
          const [template] = await db.select().from(resourceTemplates).where(eq(resourceTemplates.slug, resource.templateId));
          
          if (template) {
            // Override resource card data with template data for single source of truth
            return {
              ...resource,
              title: template.headline, // Use template headline as card title
              description: template.subheadline, // Use template subheadline as card description
              imageUrl: template.featuredImage || resource.imageUrl, // Use template featured image if available
            };
          }
        }
        // Return original resource if no template linked
        return resource;
      })
    );
    
    return resourcesWithTemplateData;
  }

  async getResourceById(resourceId: string): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.resourceId, resourceId));
    return resource || undefined;
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [newResource] = await db
      .insert(resources)
      .values({
        ...resource,
        updatedAt: new Date(),
      })
      .returning();
    return newResource;
  }

  async updateResource(resourceId: string, updates: Partial<InsertResource>): Promise<Resource | undefined> {
    const [updated] = await db
      .update(resources)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(resources.resourceId, resourceId))
      .returning();
    return updated || undefined;
  }

  async toggleResourceStatus(resourceId: string): Promise<boolean> {
    const resource = await this.getResourceById(resourceId);
    if (!resource) return false;
    
    const [updated] = await db
      .update(resources)
      .set({
        isActive: !resource.isActive,
        updatedAt: new Date(),
      })
      .where(eq(resources.resourceId, resourceId))
      .returning();
    
    return updated?.isActive || false;
  }

  async deleteResource(resourceId: string): Promise<boolean> {
    const result = await db
      .delete(resources)
      .where(eq(resources.resourceId, resourceId));
    return (result.rowCount || 0) > 0;
  }

  // Resource management methods (full template content)
  async getAllResourceTemplates(): Promise<ResourceTemplate[]> {
    return await db.select().from(resourceTemplates).orderBy(desc(resourceTemplates.createdAt));
  }

  async getPublishedResourceTemplates(): Promise<ResourceTemplate[]> {
    return await db.select().from(resourceTemplates).where(eq(resourceTemplates.isPublished, true)).orderBy(desc(resourceTemplates.createdAt));
  }

  async getResourceTemplateById(resourceId: string): Promise<ResourceTemplate | undefined> {
    const [resource] = await db.select().from(resourceTemplates).where(eq(resourceTemplates.resourceId, resourceId));
    return resource || undefined;
  }

  async getResourceTemplateBySlug(slug: string): Promise<ResourceTemplate | undefined> {
    const [resource] = await db.select().from(resourceTemplates).where(eq(resourceTemplates.slug, slug));
    return resource || undefined;
  }

  async createResourceTemplate(resource: InsertResourceTemplate): Promise<ResourceTemplate> {
    // Create the Resource (full template content)
    const [newResource] = await db
      .insert(resourceTemplates)
      .values({
        ...resource,
        updatedAt: new Date(),
      })
      .returning();

    // Check if a resource navigator card already exists for this resource
    const existingNavigator = await db
      .select()
      .from(resources)
      .where(eq(resources.templateId, newResource.resourceId));
    
    // Only create navigator card if one doesn't already exist
    if (existingNavigator.length === 0) {
      await this.autoCreateResourceNavigator(newResource);
    } else {
      console.log(`Navigator card already exists for template: ${newResource.resourceId}`);
    }
    
    return newResource;
  }

  // Auto-generate Resource Navigator from Resource template
  private async autoCreateResourceNavigator(template: ResourceTemplate): Promise<Resource> {
    // Parse template body to extract preview content
    let previewText = template.subheadline;
    try {
      const bodyData = JSON.parse(template.body);
      if (bodyData.sections && bodyData.sections.length > 0) {
        // Use first section content as preview
        const firstSection = bodyData.sections[0];
        if (firstSection.content) {
          previewText = firstSection.content.substring(0, 120) + "...";
        }
      }
    } catch (e) {
      // Fallback to subheadline if body parsing fails
      previewText = template.subheadline;
    }

    // Auto-generate Resource Navigator card
    const navigatorCard = {
      resourceId: `nav-${template.resourceId}`, // Prefix to distinguish navigator cards
      imageUrl: template.featuredImage || "/api/placeholder-image.jpg", // Use featured image or placeholder
      title: template.headline,
      description: previewText,
      buttonText: "Learn More",
      buttonUrl: `/free-resources/${template.slug}`, // Link to full Resource
      templateId: template.resourceId, // Link back to the Resource
      isActive: template.isPublished,
    };

    const [card] = await db
      .insert(resources)
      .values({
        ...navigatorCard,
        updatedAt: new Date(),
      })
      .returning();
    
    return card;
  }

  async updateResourceTemplate(resourceId: string, updates: Partial<InsertResourceTemplate>): Promise<ResourceTemplate | undefined> {
    const [updated] = await db
      .update(resourceTemplates)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(resourceTemplates.resourceId, resourceId))
      .returning();
    return updated || undefined;
  }

  async toggleResourceTemplateStatus(resourceId: string): Promise<boolean> {
    const resource = await this.getResourceTemplateById(resourceId);
    if (!resource) return false;
    
    const [updated] = await db
      .update(resourceTemplates)
      .set({
        isPublished: !resource.isPublished,
        updatedAt: new Date(),
      })
      .where(eq(resourceTemplates.resourceId, resourceId))
      .returning();
    
    // Auto-sync the Resource Navigator status
    await this.syncResourceNavigatorStatus(resourceId, updated?.isPublished || false);
    
    return updated?.isPublished || false;
  }

  // Keep Resource Navigator in sync with Resource status
  private async syncResourceNavigatorStatus(templateResourceId: string, isPublished: boolean): Promise<void> {
    await db
      .update(resources)
      .set({
        isActive: isPublished,
        updatedAt: new Date(),
      })
      .where(eq(resources.templateId, templateResourceId));
  }

  async deleteResourceTemplate(resourceId: string): Promise<boolean> {
    const result = await db
      .delete(resourceTemplates)
      .where(eq(resourceTemplates.resourceId, resourceId));
    return (result.rowCount || 0) > 0;
  }

  // Connected operation: Create Resource and automatically generate Resource Navigator card
  async createResourceTemplateWithCard(templateData: InsertResourceTemplate, cardData: InsertResource): Promise<{ template: ResourceTemplate; card: Resource }> {
    // Create the resource template first
    const template = await this.createResourceTemplate(templateData);
    
    // Create the display card with link to the template
    const cardWithLink = {
      ...cardData,
      templateId: template.resourceId,
      buttonUrl: `/resource/${template.slug}`, // Link to the template page
    };
    
    const card = await this.createResource(cardWithLink);
    
    return { template, card };
  }
}

export const storage = new DatabaseStorage();
