export interface Resource {
  id: number;
  resourceId: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
  templateId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceTemplate {
  id: string;
  headline: string;
  subheadline: string;
  authorName: string;
  authorTitle: string;
  logoUrl: string;
  bodyContent: string;
  ctaText: string;
}

export const staticResources: Resource[] = [
  {
    id: 17,
    resourceId: "shadow-pages-playbook-complete-guide",
    imageUrl: "/shadow-pages-book-final.png",
    title: "Shadow Pages Playbook",
    description: "Everything YOU need to know about how Shadow Pages work and how you can generate cashflow from them...",
    buttonText: "Learn More",
    buttonUrl: "/free-resources/shadow-pages-playbook",
    isActive: true,
    templateId: "shadow-pages-playbook-complete-guide",
    createdAt: new Date('2025-01-21T05:37:10.167Z'),
    updatedAt: new Date('2025-01-24T11:11:01.809Z')
  }
];

export const staticResourceTemplates: Record<string, ResourceTemplate> = {
  "shadow-pages-playbook-complete-guide": {
    id: "shadow-pages-playbook-complete-guide",
    headline: "Shadow Pages Playbook",
    subheadline: "Everything YOU need to know about how Shadow Pages work and how you can generate cashflow from them...",
    authorName: "Eric",
    authorTitle: "Shadow Pages Expert",
    logoUrl: "https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png",
    ctaText: "Start Your Shadow Page",
    bodyContent: `## The Golden Opportunity Creators Are Using to Earn Passively Online

In the last 5-10 years a new wave of millionaires hit… And it is not coming from traditional real estate, stocks or anything like that.

Social media has created millionaires out of the blue with the rise of platforms like Instagram, TikTok and YouTube — normal people could start uploading content, get viewers and get paid (e.g. MrBeast, Kylie Jenner etc.)

And take advantage of the creator industry that Goldman Sachs expects to skyrocket to **half a trillion by 2027**.

Yet the problem was you had to show yourself, lose all your privacy and at the same time it took a lot of time to create content…

But now a new era has begun, where **faceless creators are taking over** — with Shadow Pages you do not have to show yourself, be an influencer or even create any of the videos yourself…

## What Are Shadow Pages?

Think of Shadow Pages as Instagram accounts that are all about a specific niche or topic, not a person. **The page itself is the brand**. You most likely follow a bunch of them.

We are talking about those popular accounts you see posting content on:
▶︎ Motivation
▶︎ Business 
▶︎ Gym life
▶︎ Spirituality
▶︎ Weird facts

Pages like @wealth, @mindset.therapy @pubity or @gymfailnation…

These pages grow by posting niche specific, high engagement content - all without showing the person behind it. Most of the content is either reposted, created with AI, or outsourced to cheap freelancers.

## 5 Proven Ways Shadow Pages Make Money

### 1. Ads & Promos (Shoutouts)
One of the simplest ways to start earning. Once your page has an engaged niche audience, businesses or brands will reach out & pay you to promote them. Even smaller pages can profit from this, and it is completely passive.

### 2. Affiliate Marketing
This is one of the best ways how you can profit when starting out as you can promote a proven product that someone else created and earn up to **80% commissions** - without having to deal with customers support, inventory or even creating the product.

### 3. Selling Your OWN Digital Products
High-trust = high profits. Once your audience connects with your content, you can sell ebooks, templates, guides, or courses. **Margins are nearly 100%** since you create once and sell endlessly.

### 4. Instagram Creator Fund & Bonuses
Instagram now pays creators for views via bonuses and incentive programs. You do not need to sell anything - just post simple content and Instagram will pay you rewards.

### 5. Brand Deals & Sponsorships
As your page grows, brands may offer long-term collabs and higher-paying deals. This can go far beyond shoutouts - custom content, partnerships, and **5 figure monthly deals** are possible.

## Complete Automation System

Shadow Pages run without needing your face, voice, or daily involvement. That is what makes them scalable allowing you to manage multiple pages with minimal effort.

**Content Creation:**
▶︎ Use done-for-you Canva templates
▶︎ A.I. generated scripts
▶︎ Content calendars
▶︎ No design skills required

**Scheduling:**
▶︎ Automatically post with Meta Business Suite

**Engagement:**
▶︎ Outsource DMs, comments, and interactions to ManyChat

**Monetization:**
▶︎ Register for affiliate products
▶︎ Set up digital products that generate income 24/7

## Step-by-Step Implementation Guide

### Step 1: Pick a Niche
Choose a niche you are passionate about - this makes it easier to stay consistent in the long run. Here are proven niches:
▶︎ **Wealth**
▶︎ **Health & Fitness**
▶︎ **Relationships**
▶︎ **Finance**
▶︎ **Motivation**
▶︎ **Travel**
▶︎ **Business**
▶︎ **Glowup**

### Step 2: Research Competitors
▶︎ Go to socialblade.com (free) and create an account
▶︎ Search for the top 10 pages in your niche
▶︎ Make a list of videos that went viral (at least 100K+ views)
▶︎ Model what works

### Step 3: Setup Your Page
▶︎ Use Namelix (free) to generate a name & username
▶︎ Use Canva (free) to create a simple logo
▶︎ Use ChatGPT (free) to write your Shadow Page bio
▶︎ Go to Instagram and create a new account

### Step 4: Select a Digital Product to Sell
Best part is you do not even have to create your own or worry about angry customers.
▶︎ Go to CopeCart and make an account
▶︎ In their marketplace, they have a list of performing products
▶︎ Choose one product around your niche

### Step 5: Content Creation
Here is my simple process to create content (30-60 min):
▶︎ Take the list of viral videos from your competitors
▶︎ Re-create them using CapCut (free)
▶︎ Or hire a video editor from Fiverr
▶︎ Use FB Creator Studio (free) to schedule all the content
▶︎ Set up ManyChat (free) to reply to comments & messages

## Real Student Results

**Dino** went from working a 9-5 at a restaurant to making **$36,000 per month**...

Not too long ago he was working a 9-5 as restaurant manager, having no freedom and working long over hours. Then he started working with us and just a couple of months afterward he made over $36,000 in just one single month with his Shadow Page and gained over 500K followers.

**Amelie** makes an extra **$3K-$5K a month** passively next to her corporate job…

Having one income stream is scary in today day and age. Since we started working together she was able to add an extra $3K-$5K/mo on autopilot with her Shadow Page.

**Jeppe** quit his 9-5 job and his Shadow Page is making him **$10,588/mo**...

He went from working a 9-5 sales job to making $10,320 with his Shadow Page @wealthyparty and quitting his job after working with us for just 3 months.

**Ethan** makes an extra **$15,000 per month** with his Shadow Page while at university...

When we started working together Ethan was a normal university student who had no idea how to start, grow or make money with Shadow Pages. He wanted to add an extra stream of income, and now his Shadow Page is making him $15,000 per month on complete autopilot.

## Frequently Asked Questions

**Can anyone do this?**
Yes. You do not need tech skills, a following, or experience. If you can follow steps and put in consistent effort, you can build and grow a Shadow Page using proven systems.

**Can I do this next to my job?**
Absolutely. Most people start while working full time. Once it is set up, the system can run in under 30 minutes a day or even less with automation.

**How long to see results?**
Most see income within 1-3 months. With consistent effort, **$3k-$10k/month is realistic by month six**.

**Do I need experience?**
Nope. Beginners do well with the right system. No personal brand or design skills required.

**How much time does it take?**
Start with 1-2 hours/day. After automation, many manage their page in under 60 minutes a day.

**Can I automate everything?**
Yes. You can automate content creation, scheduling, engagement, and even monetization systems using templates, AI, and a virtual assistant.

**Do I need to show my face?**
No. Shadow Pages are fully faceless. You stay anonymous while building a profitable digital asset.

**What if I am not creative?**
You get plug-and-play content templates, prompts, and scripts. No design background needed.

**How do I scale past $1k/month?**
You stack income streams: digital products, affiliate links, multiple pages, or high-ticket offers. Most students scale with simple systems, not extra hours.`
  }
};