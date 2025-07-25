# 🔗 Webhook Instructions for Shadow Pages

## Webhook Endpoint
**URL**: `http://localhost:5000/api/webhook/add-resource` (Replace with your Replit URL when deployed)
**Method**: POST
**Content-Type**: application/json

## Required JSON Format
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

## How to Send Webhooks

### Method 1: Using curl (Terminal/Command Line)
```bash
curl -X POST http://localhost:5000/api/webhook/add-resource \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "CASE STUDY: $3.2M in 14 months",
    "image_url": "https://example.com/case-study.jpg",
    "description": "How I built a <strong class=\"font-bold text-[var(--shadow-navy)]\">$3.2M business</strong> from scratch",
    "link": "https://example.com/case-study",
    "resource_type": "case-study"
  }'
```

### Method 2: Using Postman
1. Set method to POST
2. URL: `http://localhost:5000/api/webhook/add-resource`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "headline": "Your Resource Title",
  "image_url": "https://your-image-url.com/image.jpg",
  "description": "Your resource description",
  "link": "https://your-link.com",
  "resource_type": "guide"
}
```

### Method 3: Using JavaScript/Node.js
```javascript
const response = await fetch('http://localhost:5000/api/webhook/add-resource', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    headline: 'Your Resource Title',
    image_url: 'https://your-image-url.com/image.jpg',
    description: 'Your resource description',
    link: 'https://your-link.com',
    resource_type: 'guide'
  })
});

const result = await response.json();
console.log(result);
```

### Method 4: Using Python
```python
import requests

data = {
    "headline": "Your Resource Title",
    "image_url": "https://your-image-url.com/image.jpg",
    "description": "Your resource description",
    "link": "https://your-link.com",
    "resource_type": "guide"
}

response = requests.post(
    'http://localhost:5000/api/webhook/add-resource',
    json=data,
    headers={'Content-Type': 'application/json'}
)

print(response.json())
```

## Resource Types and Button Colors
- **case-study**: Blue button, "See case study" text
- **video**: Red button (high priority), "Watch now" text  
- **guide**: Blue button, "Get free guide" text
- **tool**: Blue button, "Use tool" text
- **high priority**: Red button regardless of type

## What Happens When You Send a Webhook
1. **Validation**: System checks all required fields
2. **ID Generation**: Creates unique resource ID from headline
3. **Button Setup**: Determines button color and text based on type
4. **Database Save**: Stores resource in PostgreSQL database
5. **Website Update**: Website refreshes within 10 seconds to show new resource

## Success Response
```json
{
  "success": true,
  "message": "Resource added successfully",
  "resource": {
    "id": 5,
    "resourceId": "your-resource-title-1234567890",
    "imageUrl": "https://your-image-url.com/image.jpg",
    "title": "Your Resource Title",
    "description": "Your resource description",
    "buttonText": "Get free guide",
    "buttonUrl": "https://your-link.com",
    "buttonColor": "blue",
    "isActive": true,
    "createdAt": "2025-01-20T07:30:00.000Z",
    "updatedAt": "2025-01-20T07:30:00.000Z"
  },
  "webhook_url": "http://localhost:5000/api/webhook/add-resource"
}
```

## Error Response
```json
{
  "success": false,
  "message": "Failed to add resource",
  "error": "Validation error details"
}
```

## Resource Management
- **View All**: GET `/api/resources` - Shows active resources
- **Admin View**: GET `/api/admin/resources` - Shows all resources
- **Delete**: DELETE `/api/resources/:resourceId` - Removes resource
- **Toggle Status**: PATCH `/api/resources/:resourceId/toggle` - Activates/deactivates resource

## Real-Time Synchronization
- Website automatically refreshes every 10 seconds
- New resources appear within 10 seconds of webhook submission
- Deleted resources disappear within 10 seconds
- No manual refresh needed - fully automated sync