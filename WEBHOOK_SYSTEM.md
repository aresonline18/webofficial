# 🔗 Webhook Resource Management System

## Overview
Your Shadow Pages website now has a fully automated webhook system that can receive resource data and instantly add new free resources to your site. This works within Replit and provides a complete API-driven solution.

## 🚀 How It Works

### Webhook Endpoint
**URL**: `https://[your-replit-url]/api/webhook/add-resource`
**Method**: POST
**Content-Type**: application/json

### Required Data Format
Send a JSON payload with these fields:

```json
{
  "headline": "Your Resource Title (required)",
  "image_url": "https://example.com/image.jpg (required)",
  "description": "Resource description with key benefits (required)", 
  "link": "https://destination-url.com (required)",
  "button_text": "Call to action (optional)",
  "resource_type": "case-study|video|guide|tool (optional)",
  "priority": "high|normal (optional)"
}
```

### Automatic Processing
The system automatically:
1. **Validates** all incoming data
2. **Generates** unique resource IDs
3. **Determines** button colors (red for videos/high priority, blue for others)
4. **Creates** appropriate alt text
5. **Saves** to PostgreSQL database
6. **Updates** website instantly

## 📋 Webhook Examples

### Case Study Resource
```bash
curl -X POST https://your-replit-url/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "CASE STUDY: $3.2M in 14 months",
    "image_url": "https://example.com/case-study.jpg",
    "description": "How I built a <strong class=\"font-bold text-[var(--shadow-navy)]\">$3.2M business</strong> from scratch",
    "link": "https://example.com/case-study",
    "resource_type": "case-study"
  }'
```

### Video Training Resource
```bash
curl -X POST https://your-replit-url/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Get 1000 Leads in 30 Days",
    "image_url": "https://example.com/video-thumb.jpg", 
    "description": "Watch me <strong class=\"font-bold text-[var(--shadow-navy)]\">generate 1000+ leads</strong> using this proven system",
    "link": "https://youtube.com/watch?v=example",
    "resource_type": "video",
    "priority": "high"
  }'
```

### Guide Resource
```bash
curl -X POST https://your-replit-url/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Complete Lead Generation Guide",
    "image_url": "https://example.com/guide.jpg",
    "description": "Step-by-step guide to <strong class=\"font-bold text-[var(--shadow-navy)]\">master lead generation</strong>",
    "link": "https://example.com/guide-download",
    "resource_type": "guide"
  }'
```

## 🎛️ Management API Endpoints

### Get Active Resources
```
GET /api/resources
```
Returns all active resources displayed on the website.

### Get All Resources (Admin)
```
GET /api/admin/resources  
```
Returns all resources including inactive ones.

### Toggle Resource Status
```
PATCH /api/resources/{resourceId}/toggle
```
Activate/deactivate a resource without deleting it.

### Delete Resource
```
DELETE /api/resources/{resourceId}
```
Permanently removes a resource.

## 🔧 Integration Options

### 1. Direct Webhook Integration
Use tools like:
- **Zapier**: Connect forms, CMS, or other apps
- **Make.com**: Automate workflows
- **n8n**: Self-hosted automation
- **Custom scripts**: Python, Node.js, etc.

### 2. Manual API Testing
Use tools like:
- **Postman**: Visual API testing
- **Curl**: Command line testing
- **Thunder Client**: VS Code extension
- **Replit's built-in HTTP client**

### 3. Form Integration
Connect HTML forms directly to the webhook endpoint.

## 📊 Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Resource added successfully",
  "resource": {
    "id": 123,
    "resourceId": "case-study-3-2m-1234567890",
    "title": "CASE STUDY: $3.2M in 14 months",
    "imageUrl": "https://example.com/image.jpg",
    "isActive": true,
    "createdAt": "2025-01-20T14:15:22Z"
  },
  "webhook_url": "https://your-replit-url/api/webhook/add-resource"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Failed to add resource",
  "error": [
    {
      "code": "too_small",
      "path": ["headline"],
      "message": "String must contain at least 1 character(s)"
    }
  ]
}
```

## 🛡️ Data Validation

### Automatic Validation
- **Headlines**: 1-100 characters
- **Images**: Must be valid URLs
- **Descriptions**: 1-500 characters  
- **Links**: Must be valid URLs
- **Button text**: Max 50 characters
- **Resource type**: Must be case-study, video, guide, or tool
- **Priority**: Must be high or normal

### Data Processing
- **Resource IDs**: Auto-generated from headlines + timestamp
- **Button colors**: Auto-assigned (red for videos/high priority)
- **Button text**: Auto-generated if not provided
- **Alt text**: Auto-generated from headlines
- **Timestamps**: Auto-added for tracking

## 🔄 Fallback System

The website includes a robust fallback system:
1. **Primary**: Database-driven resources (webhook additions)
2. **Fallback**: Static resources file (manual additions)
3. **Loading**: Skeleton animations during API calls

This ensures the website always displays resources, even if the database is unavailable.

## 📈 Workflow Integration Examples

### Airtable → Webhook
1. Create Airtable base with resource fields
2. Use Airtable automation to trigger webhook on new records
3. Resources automatically appear on website

### Google Sheets → Webhook  
1. Set up Google Sheets with resource data
2. Use Google Apps Script or Zapier integration
3. New rows trigger webhook calls

### CMS → Webhook
1. Use any headless CMS (Strapi, Contentful, etc.)
2. Configure webhook on content publish
3. Resources sync automatically

## 🧪 Testing Your Webhook

### 1. Basic Test (Replace with your Replit URL)
```bash
curl -X POST https://your-replit-url/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Test Resource",
    "image_url": "https://via.placeholder.com/400x400",
    "description": "This is a test resource with <strong class=\"font-bold text-[var(--shadow-navy)]\">bold text</strong>",
    "link": "https://example.com"
  }'
```

### 2. Check if it worked
Visit your website - the new resource should appear at the top of the list.

### 3. View all resources
```bash
curl https://your-replit-url/api/resources
```

## 🚀 Your Replit Setup

### Database: ✅ Configured
- PostgreSQL database created
- Schema pushed with `resources` table
- Environment variables configured

### API Endpoints: ✅ Ready
- `/api/webhook/add-resource` - Add new resources
- `/api/resources` - Get active resources
- `/api/admin/resources` - Get all resources
- `/api/resources/:id/toggle` - Toggle status
- `/api/resources/:id` - Delete resource

### Frontend: ✅ Updated
- React Query integration for live data
- Fallback to static resources
- Loading states and error handling
- Automatic updates when resources change

## 🎯 Next Steps

1. **Get your Replit URL** - Use it as your webhook endpoint
2. **Test the webhook** - Send a test request
3. **Set up automation** - Connect your preferred tools
4. **Monitor resources** - Use admin endpoints to manage content

Your webhook system is ready to receive resource data and automatically update your Shadow Pages website!