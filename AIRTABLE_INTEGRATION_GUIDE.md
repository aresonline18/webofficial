# 📋 Airtable Integration Guide - Resource Tracking

## Overview
This system tracks which resources users read and automatically passes that data to Typeform → Make.com → Airtable when they click "Apply Now".

## Data Flow
```
User clicks resource → URL tracking → Apply Now → Typeform → Make.com → Airtable
```

## URL Parameters Sent to Typeform

When users click "Apply Now", these parameters are automatically added to the Typeform URL:

### Core Parameters
```
resources_read = "CASE STUDY 267M 1 Client 19 months, Top 8 Online Businesses Ranked 2025"
conversion_trigger = "Top 8 Online Businesses Ranked 2025"  
engagement_level = "High"
resource_count = "3"
```

### Complete Example URL
```
https://shadowpages.typeform.com/dms-overall?utm_medium=sp&utm_campaign=free-resource&utm_source=www.shadowpages.io&resources_read=CASE%20STUDY%20267M%201%20Client%2019%20months%2C%20Top%208%20Online%20Businesses%20Ranked%202025&conversion_trigger=Top%208%20Online%20Businesses%20Ranked%202025&engagement_level=High&resource_count=3
```

## Airtable Field Setup

### Recommended Field Structure
```
Resources Read (Multiple Select):
- CASE STUDY 267M 1 Client 19 months
- Top 8 Online Businesses Ranked 2025  
- 718M With Under 7 Clients
- [Add more options as you create resources]

Conversion Trigger (Single Select):
- CASE STUDY 267M 1 Client 19 months
- Top 8 Online Businesses Ranked 2025
- 718M With Under 7 Clients
- Unknown

Engagement Level (Single Select):
- Low (1 resource)
- Medium (2 resources) 
- High (3+ resources)

Resource Count (Number):
- Numeric count of resources read
```

## Make.com Automation Setup

### Step 1: Typeform Webhook
Set up Typeform to send data to Make.com including the custom parameters:
- `resources_read` - All resources (comma-separated for Airtable multiple select)
- `conversion_trigger` - The last resource that led to conversion
- `engagement_level` - Low/Medium/High based on resource count
- `resource_count` - Number of resources read

### Step 2: Make.com Processing
```
1. Receive Typeform webhook
2. Parse `resources_read` parameter 
3. Split by comma to get individual resources
4. Map to Airtable multiple select field
5. Set conversion trigger as single select
6. Set engagement level and count
```

### Step 3: Airtable Integration
Map the parsed data to your Airtable fields:
```javascript
// Make.com mapping example
{
  "Resources Read": resources_read.split(", "), // Array for multiple select
  "Conversion Trigger": conversion_trigger,      // Single value
  "Engagement Level": engagement_level,          // Low/Medium/High  
  "Resource Count": parseInt(resource_count),    // Number
  "Lead Score": resource_count * 10              // Optional scoring
}
```

## Example User Journey

### User Actions
1. **Visits website** → `/?utm_source=linkedin`
2. **Clicks Case Study** → `/?read=case-study-267m&title=CASE STUDY 267M 1 Client 19 months&last=case-study-267m&convert_trigger=CASE STUDY 267M 1 Client 19 months`
3. **Clicks Business Guide** → `/?read=case-study-267m,top-8-online-businesses&title=CASE STUDY 267M 1 Client 19 months,Top 8 Online Businesses Ranked 2025&last=top-8-online-businesses&convert_trigger=Top 8 Online Businesses Ranked 2025`
4. **Clicks Apply Now** → Typeform opens with all tracking data

### Airtable Record Created
```
Name: John Smith
Email: john@example.com
Resources Read: ["CASE STUDY 267M 1 Client 19 months", "Top 8 Online Businesses Ranked 2025"]
Conversion Trigger: "Top 8 Online Businesses Ranked 2025"
Engagement Level: "Medium"  
Resource Count: 2
Lead Score: 20
Source: "linkedin"
Campaign: "free-resource"
```

## Benefits for Sales/Marketing

### Lead Qualification
- **High engagement** (3+ resources) = Hot leads
- **Medium engagement** (2 resources) = Warm leads  
- **Low engagement** (1 resource) = Cold leads

### Personalization
- Know exactly which resources interested them
- Reference specific case studies in sales calls
- Tailor follow-up based on content consumed

### Attribution
- See which resources drive the most conversions
- Identify the "conversion trigger" resource
- Optimize content strategy based on performance

### Sales Intelligence
```
"Hi John, I noticed you were particularly interested in our $2.67M case study and business rankings guide. Based on that, I think you'd be a great fit for..."
```

This system gives you complete visibility into the customer journey from content consumption to conversion, making your sales process much more targeted and effective.