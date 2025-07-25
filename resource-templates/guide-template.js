// Guide/Training Resource Template
// Copy and modify this template for new guide resources

const guideTemplate = {
  id: "[topic]-guide", // e.g., "lead-generation-guide"
  imageUrl: "https://your-image-url.com/guide.jpg", // Square image preferred
  imageAlt: "[Topic] Guide Cover", // Descriptive alt text
  title: "Complete Guide to [Topic]", // e.g., "Complete Guide to Lead Generation"
  description: "Step-by-step guide to <strong class=\"font-bold text-[var(--shadow-navy)]\">achieve [specific outcome]</strong>", // Highlight key benefit
  buttonText: "Get free guide", // Action-oriented text
  buttonUrl: "https://your-guide-link.com", // Destination URL
  buttonColor: "blue", // Blue for guides
  isActive: true
};

// Example filled template:
const exampleGuide = {
  id: "scaling-business-guide",
  imageUrl: "https://images.example.com/scaling-guide.webp",
  imageAlt: "Business Scaling Guide Cover",
  title: "Complete Guide to Scaling Your Business",
  description: "Step-by-step blueprint to <strong class=\"font-bold text-[var(--shadow-navy)]\">scale from $100k to $1M+</strong> in revenue",
  buttonText: "Get free guide",
  buttonUrl: "https://coda.io/@yourname/scaling-guide",
  buttonColor: "blue",
  isActive: true
};