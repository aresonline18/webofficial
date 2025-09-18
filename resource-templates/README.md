# Resource Template System

## Overview
This folder contains ready-to-use templates for adding new free resources to the Shadow Pages website. Each template is pre-configured for common resource types.

## Template Files
- `case-study-template.js` - For case studies and success stories
- `guide-template.js` - For guides, ebooks, and educational content  
- `video-training-template.js` - For video content and training materials
- `tool-calculator-template.js` - For tools, calculators, and interactive resources

## How to Use Templates

### Method 1: Copy & Paste Template (Recommended)
1. Open the appropriate template file
2. Copy the example template object
3. Modify the placeholder values
4. Paste into `client/src/data/resources.ts`

### Method 2: Use Helper Functions
```typescript
import { createCaseStudyResource, createVideoTrainingResource, createGuideResource } from './resources.ts';

// Add a case study
const newCaseStudy = createCaseStudyResource({
  amount: "2.5M",
  timeframe: "8 months", 
  imageUrl: "https://example.com/image.jpg",
  strategies: "The proven system that generated",
  buttonUrl: "https://example.com/case-study"
});

// Add a video training
const newVideo = createVideoTrainingResource({
  topic: "Cold Email Mastery",
  outcome: "Get 50% Reply Rates",
  imageUrl: "https://example.com/thumb.jpg",
  process: "write high-converting cold emails",
  buttonUrl: "https://youtube.com/watch?v=example"
});

// Add a guide
const newGuide = createGuideResource({
  topic: "Lead Generation",
  outcome: "generate 1000+ leads monthly",
  imageUrl: "https://example.com/guide.jpg", 
  buttonUrl: "https://example.com/guide"
});

// Then add to resources array
resources.push(newCaseStudy, newVideo, newGuide);
```

## Template Placeholders

All templates use these common placeholders:
- `[amount]` → Dollar amounts (2.5M, 500K, 1M)
- `[timeframe]` → Time periods (6 months, 1 year, 30 days)
- `[topic]` → Subject matter (Lead Generation, Sales Funnels)
- `[outcome]` → Benefit/result (double revenue, get 1000 leads)
- `[process]` → What you demonstrate (cold email sequences, sales calls)

## Resource Types

### Case Study Resources
- **Use for**: Success stories, client results, revenue milestones
- **Button color**: Blue
- **Headline format**: "CASE STUDY: $[Amount] in [Time]"
- **Focus**: Specific results and outcomes

### Video Training Resources  
- **Use for**: YouTube videos, training content, demonstrations
- **Button color**: Red (high priority)
- **Headline format**: "[Outcome] in [Timeframe]"
- **Focus**: What viewer will learn/see

### Guide Resources
- **Use for**: PDFs, ebooks, step-by-step guides, checklists
- **Button color**: Blue  
- **Headline format**: "Complete Guide to [Topic]"
- **Focus**: Comprehensive learning resource

### Tool/Calculator Resources
- **Use for**: Interactive tools, calculators, assessments
- **Button color**: Blue
- **Headline format**: "Free [Tool Name] Calculator"
- **Focus**: Immediate utility and results

## Quality Guidelines

### Images
✅ Square aspect ratio (1:1)
✅ 400x400px minimum resolution
✅ Clear, readable text if any
✅ Professional appearance
✅ Consistent style across resources

### Headlines  
✅ Under 8 words
✅ Benefit-focused, not feature-focused
✅ Include specific numbers when possible
✅ Action-oriented language

### Descriptions
✅ 1-2 sentences maximum  
✅ Bold the key benefit using HTML strong tags
✅ Focus on the outcome, not the process
✅ Use specific, measurable language

### Button Text
✅ Action verbs (Get, See, Watch, Download)
✅ Under 4 words
✅ Clear value proposition
✅ Consistent with content type

## Testing Checklist
Before adding a new resource:
- [ ] Image loads correctly and looks good
- [ ] Link works and goes to correct destination
- [ ] Text is readable on both desktop and mobile
- [ ] Alt text is descriptive for accessibility
- [ ] Resource appears in correct position
- [ ] Button color matches content priority

## Examples of Good Resources

**Case Study:**
```
Title: "CASE STUDY: $2.67M. 1 Client. 19 months."
Description: "Strategies on acquiring, onboarding and retaining $1M+/year clients"
Button: "Open case study" (Blue)
```

**Video Training:**
```
Title: "Generate 11,000+ Qualified Leads Every Month"  
Description: "Getting as many leads and clients as you can possibly handle"
Button: "Watch training" (Red)
```

**Guide:**
```
Title: "Top 8 Online Businesses Ranked (2025)"
Description: "I've ranked the top online business models from best to worst"  
Button: "See ranking" (Blue)
```

This template system makes adding new resources as simple as filling in the blanks!