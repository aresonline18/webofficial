// Case Study Resource Template
// Copy and modify this template for new case study resources

const caseStudyTemplate = {
  id: "case-study-[amount]-[timeframe]", // e.g., "case-study-2m-6months"
  imageUrl: "https://your-image-url.com/case-study.jpg", // Square image preferred
  imageAlt: "Case Study Results Screenshot", // Descriptive alt text
  title: "CASE STUDY: $[Amount] in [Timeframe]", // e.g., "CASE STUDY: $2.67M in 19 months"
  description: "Learn the exact strategies that generated <strong class=\"font-bold text-[var(--shadow-navy)]\">$[amount] in [timeframe]</strong>", // Highlight key benefit
  buttonText: "See case study", // Action-oriented text
  buttonUrl: "https://your-case-study-link.com", // Destination URL
  buttonColor: "blue", // Blue for case studies
  isActive: true
};

// Example filled template:
const exampleCaseStudy = {
  id: "case-study-5m-12months",
  imageUrl: "https://images.example.com/case-study-5m.webp",
  imageAlt: "5 Million Dollar Case Study Results",
  title: "CASE STUDY: $5M in 12 months",
  description: "The exact system that generated <strong class=\"font-bold text-[var(--shadow-navy)]\">$5M in recurring revenue</strong> in one year",
  buttonText: "See case study",
  buttonUrl: "https://coda.io/@yourname/case-study-5m",
  buttonColor: "blue",
  isActive: true
};