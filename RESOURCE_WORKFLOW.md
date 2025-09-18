# Resource Management Workflow

## Quick Add Resource Template

To add a new free resource to the Shadow Pages website, follow these steps:

### Step 1: Prepare Your Content
Before adding a resource, gather:
- **Image**: Square/quadratic format (recommended 400x400px or higher)
- **Headline**: Clear, benefit-driven title
- **Description**: 1-2 sentences with key benefit in **bold**
- **Link**: Destination URL
- **Button Text**: Action-oriented text (e.g., "Get Access", "Download Now")

### Step 2: Add Resource to Database
Open `client/src/data/resources.ts` and add your resource to the `resources` array:

```typescript
{
  id: "your-resource-slug",
  imageUrl: "https://your-image-url.com/image.jpg",
  imageAlt: "Descriptive alt text for accessibility",
  title: "Your Resource Headline",
  description: "Brief description with <strong class=\"font-bold text-[var(--shadow-navy)]\">key benefit highlighted</strong>",
  buttonText: "Call to action",
  buttonUrl: "https://destination-link.com",
  buttonColor: "blue", // or "red" for high-priority resources
  isActive: true
}
```

### Step 3: Resource Properties Guide

#### ID Guidelines
- Use kebab-case (lowercase with hyphens)
- Make it descriptive and unique
- Examples: `"lead-gen-guide"`, `"case-study-2m"`, `"free-templates"`

#### Image Guidelines
- **Format**: PNG or JPG with transparent/white background
- **Size**: Square aspect ratio (1:1)
- **Quality**: High resolution (400x400px minimum)
- **Content**: Should clearly represent the resource

#### Title Guidelines
- **Length**: 3-8 words ideal
- **Style**: Benefits-focused, not feature-focused
- **Examples**: 
  - Good: "$2.67M Case Study" 
  - Bad: "Business Case Study Document"

#### Description Guidelines
- **Length**: 1-2 sentences maximum
- **Format**: HTML with bold highlights using `<strong class="font-bold text-[var(--shadow-navy)]">text</strong>`
- **Focus**: Highlight the main benefit or outcome
- **Examples**:
  - `"See how I get <strong class=\"font-bold text-[var(--shadow-navy)]\">$30k to $150k per month</strong> from each client"`
  - `"Generate <strong class=\"font-bold text-[var(--shadow-navy)]\">11,000+ qualified leads</strong> every month"`

#### Button Guidelines
- **Red Buttons**: Use for high-priority or main content (YouTube videos, primary resources)
- **Blue Buttons**: Use for secondary content (case studies, tools, assessments)
- **Text Examples**: 
  - "Get instant access"
  - "Download now"
  - "See case study"
  - "Try it free"

### Step 4: Testing Your Resource
1. Save the `resources.ts` file
2. The website automatically updates
3. Check both desktop and mobile layouts
4. Verify the link works correctly
5. Test image loading and alt text

## Resource Templates

### Template 1: Case Study Resource
```typescript
{
  id: "case-study-[amount]",
  imageUrl: "https://your-image-url.com/case-study.jpg",
  imageAlt: "Case Study Results Screenshot",
  title: "CASE STUDY: $[Amount] in [Timeframe]",
  description: "Learn the exact strategies that generated <strong class=\"font-bold text-[var(--shadow-navy)]\">$[amount] in [timeframe]</strong>",
  buttonText: "See case study",
  buttonUrl: "https://your-case-study-link.com",
  buttonColor: "blue",
  isActive: true
}
```

### Template 2: Guide/Training Resource
```typescript
{
  id: "[topic]-guide",
  imageUrl: "https://your-image-url.com/guide.jpg",
  imageAlt: "[Topic] Training Guide",
  title: "Complete Guide to [Topic]",
  description: "Step-by-step guide to <strong class=\"font-bold text-[var(--shadow-navy)]\">achieve [specific outcome]</strong>",
  buttonText: "Get free guide",
  buttonUrl: "https://your-guide-link.com",
  buttonColor: "blue",
  isActive: true
}
```

### Template 3: Tool/Calculator Resource
```typescript
{
  id: "[tool-name]-calculator",
  imageUrl: "https://your-image-url.com/calculator.jpg",
  imageAlt: "[Tool Name] Calculator Interface",
  title: "Free [Tool Name] Calculator",
  description: "Calculate your <strong class=\"font-bold text-[var(--shadow-navy)]\">potential [outcome]</strong> in seconds",
  buttonText: "Use calculator",
  buttonUrl: "https://your-tool-link.com",
  buttonColor: "blue",
  isActive: true
}
```

### Template 4: Video Training Resource
```typescript
{
  id: "[topic]-training",
  imageUrl: "https://your-image-url.com/video-thumbnail.jpg",
  imageAlt: "[Topic] Video Training Thumbnail",
  title: "[Outcome] in [Timeframe]",
  description: "Watch me <strong class=\"font-bold text-[var(--shadow-navy)]\">demonstrate [specific process]</strong> step-by-step",
  buttonText: "Watch training",
  buttonUrl: "https://your-video-link.com",
  buttonColor: "red", // Red for video content
  isActive: true
}
```

## Resource Management Operations

### Hide a Resource (Temporarily)
Change `isActive: true` to `isActive: false`

### Reorder Resources
Move items up or down in the `resources` array

### Update Resource Content
Simply edit any property and save the file

### Delete a Resource
Remove the entire resource object from the array

## Best Practices

### Content Strategy
1. **Lead with Benefits**: Focus on outcomes, not features
2. **Use Social Proof**: Include numbers, amounts, timeframes
3. **Create Urgency**: Use action-oriented language
4. **Test Headlines**: A/B test different titles for performance

### Visual Design
1. **Consistent Imagery**: Use similar style/color scheme across resources
2. **High Quality**: Always use crisp, professional images
3. **Square Format**: Maintain 1:1 aspect ratio for consistency
4. **Brand Colors**: Use Shadow Pages color scheme

### Technical Considerations
1. **Image Optimization**: Compress images for fast loading
2. **Accessibility**: Always include descriptive alt text
3. **Link Testing**: Verify all URLs work correctly
4. **Mobile First**: Test on mobile devices

## Workflow Summary

1. ✅ **Prepare**: Gather image, headline, description, link
2. ✅ **Add**: Insert resource object in `resources.ts`
3. ✅ **Test**: Verify display and functionality
4. ✅ **Monitor**: Track performance and engagement

This workflow makes adding new resources as simple as filling out a template and saving a single file!