# Resource Management System

## Overview
This website now includes a centralized resource management system that makes it easy to add, edit, and manage free resources without touching multiple files.

## How to Add New Resources

### Quick Method
1. Open `client/src/data/resources.ts`
2. Add a new resource object to the `resources` array:

```typescript
{
  id: "unique-resource-id",
  imageUrl: "https://your-image-url.com/image.jpg",
  imageAlt: "Descriptive alt text",
  title: "Your Resource Title",
  description: "Resource description with <strong>bold text</strong> if needed",
  buttonText: "Click here",
  buttonUrl: "https://your-link.com",
  buttonColor: "blue", // or "red"
  isActive: true
}
```

### Resource Properties

- **id**: Unique identifier (use kebab-case)
- **imageUrl**: Direct link to the resource thumbnail
- **imageAlt**: Alt text for accessibility
- **title**: Resource headline
- **description**: HTML description (can include `<strong>` tags)
- **buttonText**: Text on the call-to-action button
- **buttonUrl**: Where the button links to
- **buttonColor**: Either "red" or "blue"
- **isActive**: Set to `true` to show, `false` to hide

## Managing Resources

### Show/Hide Resources
Change `isActive: true` to `isActive: false` to temporarily hide a resource without deleting it.

### Reorder Resources
Resources appear in the order they're listed in the array. Simply move items up or down in the list.

### Button Colors
- **Red**: Use for primary actions (YouTube, main content)
- **Blue**: Use for secondary actions (case studies, tools, etc.)

## Current Branding

### Navigation
- **Logo**: "Shadow Pages" text logo in white
- **Background**: Dark navy blue (`--shadow-navy`)
- **Text**: White with gray hover states

### Resources Section
- **Background**: Light gray (matches original insider.group design)
- **Cards**: White backgrounds with rounded corners
- **Layout**: Responsive design matching insider.group/learn

## Adding Resources Programmatically

If you need to add resources via code:

```typescript
import { addResource } from '@/data/resources';

const newResource = addResource({
  imageUrl: "https://example.com/image.jpg",
  imageAlt: "Example resource",
  title: "New Resource",
  description: "Description here",
  buttonText: "Learn More",
  buttonUrl: "https://example.com",
  buttonColor: "blue",
  isActive: true
});
```

## System Benefits

1. **Centralized Management**: All resources in one file
2. **Easy Updates**: Change one place, updates everywhere
3. **Consistent Styling**: Automatic styling based on color choices
4. **Future-Proof**: Easy to extend with new properties
5. **Type Safety**: TypeScript ensures all properties are correct

## Future Enhancements

- Admin panel for non-technical users
- Automatic image optimization
- A/B testing for different resource orders
- Analytics tracking for resource clicks
- Bulk import/export functionality