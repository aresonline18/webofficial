// Tool/Calculator Resource Template
// Copy and modify this template for new tool/calculator resources

const toolTemplate = {
  id: "[tool-name]-calculator", // e.g., "roi-calculator"
  imageUrl: "https://your-image-url.com/tool.jpg", // Square tool interface image
  imageAlt: "[Tool Name] Interface Screenshot", // Descriptive alt text
  title: "Free [Tool Name] Calculator", // e.g., "Free ROI Calculator"
  description: "Calculate your <strong class=\"font-bold text-[var(--shadow-navy)]\">potential [outcome]</strong> in seconds", // Highlight what it calculates
  buttonText: "Use calculator", // Action-oriented text
  buttonUrl: "https://your-tool-link.com", // Tool URL
  buttonColor: "blue", // Blue for tools
  isActive: true
};

// Example filled template:
const exampleTool = {
  id: "lead-value-calculator",
  imageUrl: "https://images.example.com/lead-calc.webp",
  imageAlt: "Lead Value Calculator Interface",
  title: "Free Lead Value Calculator",
  description: "Calculate your <strong class=\"font-bold text-[var(--shadow-navy)]\">true lead value and ROI</strong> in under 60 seconds",
  buttonText: "Use calculator",
  buttonUrl: "https://calculator.example.com/lead-value",
  buttonColor: "blue",
  isActive: true
};