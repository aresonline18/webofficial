// Video Training Resource Template
// Copy and modify this template for new video training resources

const videoTemplate = {
  id: "[topic]-training", // e.g., "sales-training"
  imageUrl: "https://your-image-url.com/video-thumb.jpg", // Square video thumbnail
  imageAlt: "[Topic] Video Training Thumbnail", // Descriptive alt text
  title: "[Outcome] in [Timeframe]", // e.g., "Double Your Sales in 30 Days"
  description: "Watch me <strong class=\"font-bold text-[var(--shadow-navy)]\">demonstrate [specific process]</strong> step-by-step", // Highlight what they'll see
  buttonText: "Watch training", // Action-oriented text
  buttonUrl: "https://your-video-link.com", // Video URL (YouTube, Vimeo, etc.)
  buttonColor: "red", // Red for video content (high priority)
  isActive: true
};

// Example filled template:
const exampleVideo = {
  id: "cold-email-training",
  imageUrl: "https://images.example.com/cold-email-thumb.webp",
  imageAlt: "Cold Email Mastery Training Thumbnail",
  title: "Get 50% Reply Rates with Cold Email",
  description: "Watch me <strong class=\"font-bold text-[var(--shadow-navy)]\">write and send cold emails</strong> that get responses",
  buttonText: "Watch training",
  buttonUrl: "https://youtube.com/watch?v=example",
  buttonColor: "red",
  isActive: true
};