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

export const ericColeTemplate: LandingPageTemplate = {
  logo: {
    src: "https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png",
    alt: "Shadow Pages Logo",
    mobileOnly: true
  },
  
  headline: "How I Made $7.18M With Under 7 Clients",
  subheadline: "See how I get $30k to $150k per month from each client by selling leads. I started with $0 and run it almost alone. No office.",
  authorName: "Eric Cole",
  authorTitle: "Entrepreneur & Instagram Mastermind",
  ctaText: "Book 1:1 Call with Eric's Team",
  
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
  
  proofDisclaimer: "*I would prefer not to share these pictures (I don't even have an Instagram), but I feel it's needed as proof that I have something that worked for me, allowing me to do the things I want and like.",
  
  sections: [
    {
      id: "intro",
      blocks: [
        {
          type: "image",
          content: {
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
            alt: "Business dashboard results screenshot"
          },
          spacing: "normal"
        },
        {
          type: "stats",
          content: [
            { value: "$52.2k", description: "avg monthly revenue per client" },
            { value: "18.5 months", description: "average client retention" },
            { value: "133,000+", description: "leads generated" }
          ],
          spacing: "normal"
        }
      ]
    },
    {
      id: "story",
      blocks: [
        {
          type: "text",
          content: "Over the past 2-3 years I've generated over 133,000 leads.",
          style: "paragraph",
          spacing: "normal"
        },
        {
          type: "text",
          content: "My company received an acquisition offer, so I am thinking on what to do next if we move forward with that.",
          style: "italic",
          spacing: "normal"
        },
        {
          type: "text",
          content: "Secondly, this business literally changed my life from wanting to make $2k/m when I was at high school — to becoming a multi-millionaire before I turned 25.",
          style: "italic",
          spacing: "normal"
        }
      ]
    },
    {
      id: "background",
      title: "My background",
      blocks: [
        {
          type: "list",
          content: [
            "Started first business as 16-17y.o",
            "Sold app at 19y.o",
            "Studied Alternative Investments at Harvard Business School online",
            "Joined a $100m VC fund → where I invested in a couple of startups (valued at $1.1 billion)",
            "Started lead gen brands in financial services and legal at 20y.o - grew to multi-7 figures",
            "I run marketing newsletter just for fun: insider.marketing case studies"
          ],
          style: "bullet",
          spacing: "normal"
        },
        {
          type: "image",
          content: {
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
            alt: "Eric Cole"
          },
          style: "center",
          spacing: "normal"
        }
      ]
    }
  ],
  
  moreResourcesArticles: [
    {
      id: "article1",
      title: "How to Build a Lead Generation Empire",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Business growth analytics"
    },
    {
      id: "article2", 
      title: "Scaling to 7-Figures with Minimal Team",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Team collaboration"
    },
    {
      id: "article3",
      title: "Client Retention Strategies That Work",
      image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
      alt: "Customer retention"
    }
  ]
};