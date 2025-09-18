# Airtable → Website Image Hosting Integration

## Overview

This system automatically downloads images from Airtable and hosts them directly on your website at `shadowpages.io/uploads/`. When you send a webhook from Airtable, the system will:

1. **Download** the image from the Airtable URL
2. **Host** it locally on your website with a unique filename
3. **Save** the resource to your database with the local image URL
4. **Display** it on your website instantly

## Webhook Endpoint

**URL for Airtable webhook:** `https://your-replit-app.replit.app/api/webhook/airtable-resource`

*Replace `your-replit-app` with your actual Replit project name*

## Airtable Data Format

Send this JSON structure from Airtable via webhook:

```json
{
  "headline": "CASE STUDY: $2M in 6 months",
  "image_url": "https://airtable.com/your-image-url.jpg",
  "description": "How I achieved <strong>amazing results</strong> using this system",
  "link": "https://your-resource-link.com",
  "button_text": "Get free access",
  "resource_type": "case-study",
  "priority": "high"
}
```

## Image Processing

- **Source**: Images from Airtable (any format: JPG, PNG, GIF, WebP)
- **Destination**: `shadowpages.io/uploads/webhook-{timestamp}-{random}.{ext}`
- **Filename**: Automatically generated with unique timestamp
- **Size limit**: No limit (downloads from Airtable)
- **Error handling**: Returns detailed error if image download fails

## Database Schema

After processing, your resource will have this structure:

```json
{
  "resourceId": "case-study-2m-6-months-1234567890",
  "imageUrl": "/uploads/webhook-1234567890-987654321.jpg", // Hosted locally
  "title": "CASE STUDY: $2M in 6 months",
  "description": "How I achieved <strong>amazing results</strong> using this system",
  "buttonText": "Get free access",
  "buttonUrl": "https://your-resource-link.com",
  "isActive": true
}
```

## Automation Flow

1. **Airtable**: Create/update record with image attachment
2. **Make.com/Zapier**: Trigger webhook to your website
3. **Your Website**: Download image from Airtable URL
4. **Your Website**: Host image locally at `/uploads/`
5. **Your Website**: Save resource with local image URL
6. **Website Display**: Show resource card with hosted image
7. **Real-time Update**: Website refreshes every 10 seconds

## Benefits

✅ **Fast Loading**: Images served from your domain, not Airtable
✅ **No Dependencies**: Your website works even if Airtable is down
✅ **SEO Friendly**: Images have proper URLs on your domain
✅ **Bandwidth Control**: You control image delivery
✅ **Backup**: Images stored permanently on your server

## Testing

Use the webhook URL in your Make.com/Zapier automation or test directly:

```bash
curl -X POST https://your-domain.replit.app/api/webhook/airtable-resource \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Test Resource",
    "image_url": "https://example.com/test-image.jpg",
    "description": "Test description",
    "link": "https://test.com",
    "button_text": "Test Button",
    "resource_type": "guide",
    "priority": "normal"
  }'
```

## Response Format

**Success:**
```json
{
  "success": true,
  "message": "Resource added successfully with hosted image",
  "resource": {...},
  "hostedImageUrl": "/uploads/webhook-1234567890-987654321.jpg"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Failed to download and host image from Airtable",
  "details": "HTTP 404: Image not found"
}
```