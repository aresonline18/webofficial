# Landing Page Template System

This system allows you to generate landing pages identical to the Eric Cole example by providing just a **headline** and **body content**.

## How It Works

The template system automatically:
- ✅ Applies consistent Shadow Pages styling and responsive design
- ✅ Centers text on mobile, left-aligns on desktop  
- ✅ Handles image layouts with proper captions
- ✅ Formats headlines, lists, quotes, and stats consistently
- ✅ Maintains the same author attribution format
- ✅ Includes mobile-only logo positioning

## Usage

### Basic Template Generation

```typescript
import { generateLandingPage } from './utils/generate-landing-page';
import { SimpleTemplateRenderer } from './components/simple-template-renderer';

const newPage = generateLandingPage(
  "Your Headline Here",
  "Your body content here...",
  "Author Name",
  "Author Title"
);

// Render it:
<SimpleTemplateRenderer template={newPage} />
```

### Body Content Formatting

The body content supports simple markdown-style formatting:

```
# Main Headlines (H1)
## Section Headlines (H2)  
### Sub Headlines (H3)
#### Small Headlines (H4)

Regular paragraph text with **bold words**.

*Italic emphasized text for quotes or special notes.*

▶︎ Bullet point lists
▶︎ Another bullet point
▶︎ Third bullet point

![Image Alt Text](https://image-url.com/image.jpg "Optional Caption")

$52.2k|avg monthly revenue,$18.5 months|retention,133,000+|leads generated

> This creates a quote block
```

### Full Example

```typescript
const businessTemplate = generateLandingPage(
  "How I Built a 7-Figure Agency",
  `
  ## The Journey Started Simple
  
  I began with just determination and a laptop.
  
  ![Dashboard Screenshot](https://example.com/dashboard.jpg "My Revenue Dashboard")
  
  $100k|first year revenue,$500k|second year revenue,$1.2M|third year revenue
  
  *The key breakthrough came when I stopped trying to do everything myself.*
  
  ## My Background
  
  ▶︎ Started freelancing at 19
  ▶︎ Built first team at 22  
  ▶︎ Scaled to **7-figures** by 25
  ▶︎ Now help others replicate my success
  
  # The Three Pillars That Changed Everything
  
  **Focus** beats talent every single time.
  
  The biggest mistake I see entrepreneurs make is trying to serve everyone. 
  
  When I niched down to **SaaS companies** only, everything changed.
  `,
  "Sarah Johnson",
  "Agency Owner & Business Consultant",
  "See how I went from freelancer to 7-figure agency owner in 3 years",
  "Book Strategy Call with Sarah"
);
```

## Template Features

### Automatic Responsive Design
- Mobile: Centered text, larger logo, single-column images
- Desktop: Left-aligned text, no logo, two-column image grid

### Content Block Types
- **Headlines**: Automatic hierarchy styling (H1-H4)
- **Paragraphs**: Regular text with bold/italic support
- **Images**: Auto-sized with captions and shadows
- **Lists**: Bullet points with consistent arrow styling  
- **Stats**: Automatic grid layout with blue accent colors
- **Quotes**: Left-border styling with italic text

### Branding Elements
- Shadow Pages logo (mobile only)
- Consistent color scheme (blue accents, gray text)
- Professional typography (Inter font family)
- Lifestyle image grid with captions and disclaimer

## Integration

To use this in your application:

1. Import the generator function
2. Create your template data
3. Pass it to SimpleTemplateRenderer
4. The component handles all styling automatically

The system is designed for maximum simplicity - you just provide content, and it generates a professional, responsive landing page that matches the Eric Cole example exactly.