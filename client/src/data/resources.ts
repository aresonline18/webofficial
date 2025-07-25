// ⚠️  DEPRECATED - STATIC RESOURCES FILE
// The website now uses direct database connection via /api/resources
// This file is kept for reference only and should not be used by components

// Database is the single source of truth - see shared/schema.ts for current structure
// All resources are managed through the admin panel and webhook integrations

// LEGACY - NO LONGER USED - ALL RESOURCES REMOVED EXCEPT SHADOW PAGES PLAYBOOK
const legacyResources: any[] = [];

// Active resources for the main free resources tab
export const getActiveResources = () => {
  return legacyResources.filter(resource => resource.isActive);
};

// Helper function to add a new resource
export const addResource = (resource: Omit<any, 'id'>): any => {
  const newResource: any = {
    id: `resource-${Date.now()}`,
    ...resource
  };
  legacyResources.push(newResource);
  return newResource;
};

// Helper function to toggle resource active status
export const toggleResourceStatus = (id: string): boolean => {
  const resource = legacyResources.find(r => r.id === id);
  if (resource) {
    resource.isActive = !resource.isActive;
    return resource.isActive;
  }
  return false;
};

// Quick add templates for common resource types
export const createCaseStudyResource = (params: {
  amount: string;
  timeframe: string;
  imageUrl: string;
  strategies?: string;
  buttonUrl: string;
}): any => ({
  id: `case-study-${params.amount.toLowerCase()}-${params.timeframe.toLowerCase()}`,
  imageUrl: params.imageUrl,
  imageAlt: `Case Study: ${params.amount} Results`,
  title: `CASE STUDY: $${params.amount} in ${params.timeframe}`,
  description: `${params.strategies || 'Exact strategies that generated'} <strong class="font-bold text-[var(--shadow-navy)]">$${params.amount} in ${params.timeframe}</strong>`,
  buttonText: "See case study",
  buttonUrl: params.buttonUrl,
  buttonColor: "blue",
  isActive: true
});

export const createVideoTrainingResource = (params: {
  topic: string;
  outcome: string;
  imageUrl: string;
  process: string;
  buttonUrl: string;
}): any => ({
  id: `${params.topic.toLowerCase().replace(/\s+/g, '-')}-training`,
  imageUrl: params.imageUrl,
  imageAlt: `${params.topic} Video Training Thumbnail`,
  title: params.outcome,
  description: `Watch me <strong class="font-bold text-[var(--shadow-navy)]">demonstrate ${params.process}</strong> step-by-step`,
  buttonText: "Watch training",
  buttonUrl: params.buttonUrl,
  buttonColor: "red",
  isActive: true
});

export const createGuideResource = (params: {
  topic: string;
  outcome: string;
  imageUrl: string;
  buttonUrl: string;
}): any => ({
  id: `${params.topic.toLowerCase().replace(/\s+/g, '-')}-guide`,
  imageUrl: params.imageUrl,
  imageAlt: `${params.topic} Guide Cover`,
  title: `Complete Guide to ${params.topic}`,
  description: `Step-by-step guide to <strong class="font-bold text-[var(--shadow-navy)]">${params.outcome}</strong>`,
  buttonText: "Get free guide",
  buttonUrl: params.buttonUrl,
  buttonColor: "blue",
  isActive: true
});