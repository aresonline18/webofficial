# Shadow Pages Template Integration Guide

This guide explains how to integrate the Shadow Pages landing page template system into your own project.

## Option 1: Copy Files (Recommended)

### Required Files

1. **Template Types** (`shared/simple-template.ts`)
   - Contains TypeScript interfaces for SimpleTemplate and ContentBlock
   - Defines the structure for headlines, content, and images

2. **Template Renderer** (`client/src/components/simple-template-renderer.tsx`)
   - React component that renders the complete landing page
   - Handles responsive layout and content parsing
   - Includes mobile-first design and proper typography

3. **CSS Styles** (sections from `client/src/index.css`)
   - `.headline-primary` and `.headline-secondary` - Typography styles
   - `.mobile-section` responsive rules - Mobile/desktop layout behavior
   - `.author-mobile` - Author line styling
   - `.grid-mobile` and `.images-section` - Image grid layout
   - Container styles (`.container-narrow`, `.container-wide`)

### Integration Steps

1. **Install Dependencies**
   ```bash
   npm install react @types/react
   # If using Tailwind CSS (recommended)
   npm install tailwindcss
   ```

2. **Copy Template Files**
   ```
   your-project/
   ├── types/
   │   └── simple-template.ts          # Copy from shared/
   ├── components/
   │   └── simple-template-renderer.tsx # Copy from client/src/components/
   └── styles/
       └── template.css                # Copy relevant sections from index.css
   ```

3. **Update Imports**
   - Adjust import paths in `simple-template-renderer.tsx`
   - Import the CSS file in your main application

4. **Basic Usage**
   ```typescript
   import { SimpleTemplateRenderer } from './components/simple-template-renderer';
   import { SimpleTemplate } from './types/simple-template';

   const template: SimpleTemplate = {
     headline: "Your Headline Here",
     subheadline: "Your subheadline with **bold text**",
     authorName: "Your Name",
     authorTitle: "Your Title",
     logoUrl: "https://your-logo-url.com/logo.png",
     content: [
       { type: 'paragraph', content: 'Your content here...' },
       { type: 'image', content: { src: 'image-url', alt: 'description', caption: 'caption' } }
     ]
   };

   function YourPage() {
     return <SimpleTemplateRenderer template={template} />;
   }
   ```

### Content Block Types

The template supports these content types:

```typescript
// Text content
{ type: 'paragraph', content: 'Regular paragraph text' }
{ type: 'heading', content: 'Section heading' }

// Lists
{ type: 'list', content: ['Item 1', 'Item 2', 'Item 3'] }

// Images
{ 
  type: 'image', 
  content: { 
    src: 'https://image-url.com/image.jpg', 
    alt: 'Alt text', 
    caption: 'Image caption' 
  } 
}

// Image grids (multiple images)
{
  type: 'images',
  content: [
    { src: 'url1', alt: 'alt1', caption: 'caption1' },
    { src: 'url2', alt: 'alt2', caption: 'caption2' }
  ]
}

// Stats/metrics
{ type: 'stats', content: '$7.18M Revenue Generated' }

// Quotes
{ type: 'quote', content: 'Inspirational quote text' }
```

## Option 2: NPM Package (Future)

We can create an NPM package for easier integration:

```bash
npm install @shadowpages/landing-template
```

```typescript
import { ShadowPagesTemplate } from '@shadowpages/landing-template';
import '@shadowpages/landing-template/dist/styles.css';
```

## Option 3: API-Based Template Generation

For dynamic template generation, copy the backend utilities:

1. **Content Parser** (`client/src/utils/generate-landing-page.ts`)
   - Converts plain text input into structured content blocks
   - Supports markdown-style formatting

2. **Template Generator Functions**
   - `parseContentBlocks()` - Converts text to content blocks
   - `createSimpleTemplate()` - Creates template from input

### Example API Usage

```typescript
import { parseContentBlocks, createSimpleTemplate } from './utils/template-generator';

const userInput = `
# Section Heading
This is a paragraph with some content.

![Image](https://example.com/image.jpg "Image caption")

- List item 1
- List item 2
- List item 3

> This is a quote

**$1M** in revenue
`;

const template = createSimpleTemplate({
  headline: "Dynamic Headline",
  subheadline: "Generated subheadline",
  authorName: "Generated Author",
  authorTitle: "Generated Title",
  content: userInput
});
```

## Customization

### Design System

The template uses these design tokens:

```css
/* Typography */
--headline-primary: 43px, Inter, font-weight: 900
--headline-secondary: 1.425em, Inter, font-weight: 400
--body-text: 15px, line-height: 1.6

/* Layout */
--container-narrow: max-width: 600px
--container-wide: max-width: 1140px

/* Responsive Breakpoints */
--mobile: max-width: 767px
--desktop: min-width: 768px
```

### Mobile-First Responsive Behavior

- **Mobile**: All text centered, author left-aligned and smaller
- **Desktop**: Headlines and author centered, body text left-aligned
- **Images**: 1 column mobile, up to 4 columns desktop
- **Grid**: Automatic column calculation based on image count

### Color Scheme

The template uses a neutral color palette:
- Headlines: Black (#000000)
- Subheadlines: Dark gray (#333333)
- Body text: Medium gray (#666666)
- Links: Blue (#3b82f6)

## Framework Compatibility

- **React**: Full compatibility (original implementation)
- **Vue.js**: Component needs conversion to Vue syntax
- **Angular**: Component needs conversion to Angular syntax
- **Plain HTML/CSS**: Extract HTML structure and CSS only

## Dependencies

**Required:**
- React 18+
- TypeScript (optional but recommended)

**Optional:**
- Tailwind CSS (for utility classes)
- Styled-components (for CSS-in-JS)
- Framer Motion (for animations)

## Support

For questions or issues with integration:
1. Check this integration guide
2. Review the original implementation in this project
3. Test with the example template provided

## License

The template system is designed for reuse. Attribution to Shadow Pages is appreciated but not required.