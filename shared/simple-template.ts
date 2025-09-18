/**
 * Simple template system for generating landing pages
 * Input: headline + body content
 * Output: formatted landing page with consistent styling
 */

export interface SimpleTemplateInput {
  // Basic info
  headline: string;
  subheadline?: string;
  authorName: string;
  authorTitle: string;
  ctaText: string;
  
  // Content (can include markdown-style formatting)
  bodyContent: string;
  
  // Optional lifestyle images (1-4 images, grid adapts automatically)
  lifestyleImages?: {
    src: string;
    alt: string;
    caption: string;
  }[];
  
  // Optional logo
  logoUrl?: string;
}

export interface LandingPageImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ContentBlock {
  type: 'text' | 'headline' | 'image' | 'list' | 'quote' | 'stats' | 'background' | 'cta';
  content: string | string[] | LandingPageImage | any;
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'paragraph' | 'italic' | 'bold' | 'center' | 'left' | 'bullet' | 'numbered';
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

export interface LandingPageSection {
  id: string;
  title?: string;
  blocks: ContentBlock[];
  containerClass?: string;
}

export interface LandingPageTemplate {
  // Logo (mobile only)
  logo?: {
    src: string;
    alt: string;
    mobileOnly?: boolean;
  };
  
  // Hero Section
  headline: string;
  subheadline: string;
  authorName: string;
  authorTitle: string;
  ctaText: string;
  
  // Lifestyle Images (proof section)
  lifestyleImages: LandingPageImage[];
  
  // Proof disclaimer
  proofDisclaimer?: string;
  
  // Main content sections (flexible content blocks)
  sections: LandingPageSection[];
  
  // More Resources Articles
  moreResourcesArticles?: {
    id: string;
    title: string;
    image: string;
    alt: string;
  }[];
  
  // Styling theme
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
  };
}

export interface ParsedContent {
  type: 'headline' | 'paragraph' | 'image' | 'list' | 'quote' | 'stats';
  content: string | string[] | any;
  level?: number; // for headlines (1-4)
  style?: string; // italic, bold, etc.
}

/**
 * Parse body content and convert to structured elements
 */
export function parseBodyContent(bodyContent: string): ParsedContent[] {
  const lines = bodyContent.split('\n').filter(line => line.trim());
  const parsed: ParsedContent[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      parsed.push({
        type: 'list',
        content: currentList
      });
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Headlines
    if (trimmed.startsWith('#### ')) {
      flushList();
      parsed.push({ type: 'headline', content: trimmed.slice(5), level: 4 });
    } else if (trimmed.startsWith('### ')) {
      flushList();
      parsed.push({ type: 'headline', content: trimmed.slice(4), level: 3 });
    } else if (trimmed.startsWith('## ')) {
      flushList();
      parsed.push({ type: 'headline', content: trimmed.slice(3), level: 2 });
    } else if (trimmed.startsWith('# ')) {
      flushList();
      parsed.push({ type: 'headline', content: trimmed.slice(2), level: 1 });
    }
    
    // List items
    else if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('▶︎ ')) {
      currentList.push(trimmed.replace(/^[*\-▶︎]\s/, ''));
    }
    
    // Images
    else if (trimmed.startsWith('![')) {
      flushList();
      const match = trimmed.match(/!\[([^\]]*)\]\(([^")]+)(?:\s+"([^"]+)")?\)/);
      if (match) {
        const [, alt, src, caption] = match;
        parsed.push({
          type: 'image',
          content: { src, alt, caption }
        });
      }
    }
    
    // Quotes
    else if (trimmed.startsWith('> ')) {
      flushList();
      parsed.push({
        type: 'quote',
        content: trimmed.slice(2)
      });
    }
    
    // Italic text (emphasized)
    else if (trimmed.startsWith('*') && trimmed.endsWith('*') && trimmed.length > 2) {
      flushList();
      parsed.push({
        type: 'paragraph',
        content: trimmed.slice(1, -1),
        style: 'italic'
      });
    }
    
    // Stats (format: value|description,value|description)
    else if (trimmed.includes('|') && trimmed.split(',').every(part => part.includes('|'))) {
      flushList();
      const stats = trimmed.split(',').map(stat => {
        const [value, description] = stat.split('|');
        return { value: value.trim(), description: description.trim() };
      });
      parsed.push({
        type: 'stats',
        content: stats
      });
    }
    
    // Regular paragraph
    else if (trimmed) {
      flushList();
      parsed.push({
        type: 'paragraph',
        content: trimmed
      });
    }
  }

  flushList();
  return parsed;
}

/**
 * Example usage for Eric Cole template
 */
export const ericColeExample: SimpleTemplateInput = {
  headline: "How I Made $7.18M With Under 7 Clients",
  subheadline: "See how I get $30k to $150k per month from each client by selling leads. I started with $0 and run it almost alone. No office.",
  authorName: "Eric Cole",
  authorTitle: "Entrepreneur & Instagram Mastermind",
  ctaText: "Book Your 1:1 Call with Eric's Team",
  logoUrl: "https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png",
  
  lifestyleImages: [
    {
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Emirates First Class airplane interior",
      caption: "Emirates First Class"
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Dubai luxury apartment 5 star hotel night",
      caption: "Apartment in 5* hotel in Dubai"
    },
    {
      src: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Ferrari SF90 steering wheel interior",
      caption: "Ferrari SF90"
    },
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Modern penthouse Prague architecture",
      caption: "Penthouse in Prague"
    }
  ],
  
  bodyContent: `![Business dashboard results](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600 "Dashboard Screenshot")

$52.2k|avg monthly revenue per client,$18.5 months|average client retention,133,000+|leads generated

Over the past 2-3 years I've generated over 133,000 leads.

*My company received an acquisition offer, so I am thinking on what to do next if we move forward with that.*

*Secondly, this business literally changed my life from wanting to make $2k/m when I was at high school — to becoming a multi-millionaire before I turned 25.*

*If sharing this can do the same for a dozen other people, it's worth sharing.*

## My background

▶︎ Started first business as 16-17y.o
▶︎ Sold app at 19y.o  
▶︎ Studied Alternative Investments at Harvard Business School online
▶︎ Joined a $100m VC fund → where I invested in a couple of startups (valued at $1.1 billion)
▶︎ Started lead gen brands in financial services and legal at 20y.o - grew to multi-7 figures
▶︎ I run marketing newsletter just for fun: insider.marketing case studies

![Eric Cole](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300)

# 1) Find a large, nationwide and well-capitalized market

This is one of the most important decisions you can make when starting a business.

**The market is more important** than the product or service you sell.

To be able to generate tens of thousands of leads every year, you have to be in the market with that **scale & potential.**

Best markets have products/services that are applicable to almost every human being *(e.g. financial services, loans, home improvement, education, real estate, debt, health, and more)*

If you just capture 0.1% of one of these markets you will likely have a **$50M+** company.

Where most people fail with this, is they select local market, with clients that are not well capitalized & don't have operations for scale. *(e.g. typical SMMA niches 🫠)*`
};