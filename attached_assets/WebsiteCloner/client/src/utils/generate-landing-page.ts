import { SimpleTemplateInput, parseBodyContent } from '../../../shared/simple-template';

/**
 * Generate a complete landing page from simple inputs
 * Image grid automatically adapts: 1 image = 1 column, 2 = 2 columns, 3+ = up to 4 columns
 * Body content can include inline images using markdown syntax: ![alt](url "caption")
 * This is the main function you'd use to create new landing pages
 */
export function generateLandingPage(
  headline: string,
  bodyContent: string,
  authorName: string = 'Expert Author',
  authorTitle: string = 'Industry Professional',
  subheadline?: string,
  ctaText: string = 'Get Started Today',
  lifestyleImages?: { src: string; alt: string; caption: string }[],
  logoUrl?: string
): SimpleTemplateInput {
  
  return {
    headline,
    subheadline,
    authorName,
    authorTitle,
    ctaText,
    bodyContent,
    lifestyleImages,
    logoUrl
  };
}

/**
 * Example of how to use the template system:
 * 
 * const newLandingPage = generateLandingPage(
 *   "How I Built a Million Dollar Business",
 *   `
 *   ## My Journey Started Simple
 *   
 *   I began with just an idea and determination.
 *   
 *   * Started with $500 in savings
 *   * Worked 80 hours per week
 *   * Failed 3 times before succeeding
 *   
 *   *The key was never giving up.*
 *   
 *   ![Success Chart](https://example.com/chart.jpg "Revenue Growth")
 *   
 *   # The Three Pillars of Success
 *   
 *   **Focus** is everything. Without it, you're just busy.
 *   `,
 *   "John Smith",
 *   "Serial Entrepreneur & Business Coach"
 * );
 * 
 * Then render it with: <SimpleTemplateRenderer template={newLandingPage} />
 */

/**
 * Quick validation function to check if content is properly formatted
 */
export function validateContent(bodyContent: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for basic content structure
  if (!bodyContent.trim()) {
    errors.push('Body content cannot be empty');
  }
  
  // Check for image syntax issues
  const imageMatches = bodyContent.match(/!\[([^\]]*)\]\(([^")]+)(?:\s+"([^"]+)")?\)/g);
  if (imageMatches) {
    imageMatches.forEach((match, index) => {
      if (!match.includes('http')) {
        errors.push(`Image ${index + 1}: URL should start with http/https`);
      }
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Helper function to format content with common patterns
 */
export function formatContent(rawContent: string): string {
  return rawContent
    // Ensure proper spacing around headlines
    .replace(/^(#{1,4})\s*/gm, '$1 ')
    // Ensure proper bullet point format
    .replace(/^[\*\-]\s*/gm, '▶︎ ')
    // Ensure bold text uses ** format
    .replace(/\b([A-Z][A-Z\s]+[A-Z])\b/g, '**$1**')
    // Clean up multiple line breaks
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}