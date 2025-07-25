import { LandingPageTemplate, ContentBlock, LandingPageSection } from '../../../shared/landing-page-template';

/**
 * Helper functions for creating landing page templates
 */

// Create a text content block
export function createTextBlock(
  content: string, 
  style: 'paragraph' | 'italic' | 'bold' = 'paragraph',
  spacing: 'tight' | 'normal' | 'loose' = 'normal'
): ContentBlock {
  return {
    type: 'text',
    content,
    style,
    spacing
  };
}

// Create a headline content block
export function createHeadlineBlock(
  content: string,
  level: 'h1' | 'h2' | 'h3' | 'h4' = 'h2',
  spacing: 'tight' | 'normal' | 'loose' = 'normal'
): ContentBlock {
  return {
    type: 'headline',
    content,
    style: level,
    spacing
  };
}

// Create an image content block
export function createImageBlock(
  src: string,
  alt: string,
  caption?: string,
  style: 'center' | 'left' = 'center',
  spacing: 'tight' | 'normal' | 'loose' = 'normal'
): ContentBlock {
  return {
    type: 'image',
    content: { src, alt, caption },
    style,
    spacing
  };
}

// Create a list content block
export function createListBlock(
  items: string[],
  style: 'bullet' | 'numbered' = 'bullet',
  spacing: 'tight' | 'normal' | 'loose' = 'normal'
): ContentBlock {
  return {
    type: 'list',
    content: items,
    style,
    spacing
  };
}

// Create a stats content block
export function createStatsBlock(
  stats: { value: string; description: string }[],
  spacing: 'tight' | 'normal' | 'loose' = 'normal'
): ContentBlock {
  return {
    type: 'stats',
    content: stats,
    spacing
  };
}

// Create a quote content block
export function createQuoteBlock(
  content: string,
  spacing: 'tight' | 'normal' | 'loose' = 'normal'
): ContentBlock {
  return {
    type: 'quote',
    content,
    spacing
  };
}

// Create a section with multiple content blocks
export function createSection(
  id: string,
  blocks: ContentBlock[],
  title?: string,
  containerClass?: string
): LandingPageSection {
  return {
    id,
    title,
    blocks,
    containerClass
  };
}

/**
 * Parse raw content input and convert to structured content blocks
 * This function helps convert user input like:
 * "# Headline\nParagraph text\n* List item 1\n* List item 2"
 * Into structured ContentBlock arrays
 */
export function parseContentToBlocks(rawContent: string): ContentBlock[] {
  const lines = rawContent.split('\n').filter(line => line.trim());
  const blocks: ContentBlock[] = [];
  let currentListItems: string[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push(createListBlock(currentListItems));
      currentListItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Headlines
    if (trimmed.startsWith('# ')) {
      flushList();
      blocks.push(createHeadlineBlock(trimmed.slice(2), 'h1'));
    } else if (trimmed.startsWith('## ')) {
      flushList();
      blocks.push(createHeadlineBlock(trimmed.slice(3), 'h2'));
    } else if (trimmed.startsWith('### ')) {
      flushList();
      blocks.push(createHeadlineBlock(trimmed.slice(4), 'h3'));
    } else if (trimmed.startsWith('#### ')) {
      flushList();
      blocks.push(createHeadlineBlock(trimmed.slice(5), 'h4'));
    }
    
    // List items
    else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      currentListItems.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      currentListItems.push(trimmed.replace(/^\d+\.\s/, ''));
    }
    
    // Image syntax: ![alt](src "caption")
    else if (trimmed.startsWith('![')) {
      flushList();
      const match = trimmed.match(/!\[([^\]]*)\]\(([^")]+)(?:\s+"([^"]+)")?\)/);
      if (match) {
        const [, alt, src, caption] = match;
        blocks.push(createImageBlock(src, alt, caption));
      }
    }
    
    // Quote
    else if (trimmed.startsWith('> ')) {
      flushList();
      blocks.push(createQuoteBlock(trimmed.slice(2)));
    }
    
    // Italic text (emphasized)
    else if (trimmed.startsWith('*') && trimmed.endsWith('*') && trimmed.length > 2) {
      flushList();
      blocks.push(createTextBlock(trimmed.slice(1, -1), 'italic'));
    }
    
    // Regular paragraph
    else if (trimmed) {
      flushList();
      blocks.push(createTextBlock(trimmed));
    }
  }

  flushList();
  return blocks;
}

/**
 * Create a complete landing page template from simple inputs
 */
export function createTemplate(
  headline: string,
  subheadline: string,
  authorName: string,
  authorTitle: string,
  ctaText: string,
  rawContent: string,
  lifestyleImages: { src: string; alt: string; caption: string }[] = [],
  logo?: { src: string; alt: string; mobileOnly?: boolean }
): LandingPageTemplate {
  const contentBlocks = parseContentToBlocks(rawContent);
  
  return {
    logo,
    headline,
    subheadline,
    authorName,
    authorTitle,
    ctaText,
    lifestyleImages,
    sections: [
      {
        id: 'main-content',
        blocks: contentBlocks
      }
    ]
  };
}