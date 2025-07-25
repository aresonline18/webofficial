const { db } = require('./server/db');
const { resources, resourceTemplates } = require('./shared/schema');

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with Shadow Pages Playbook...');
    
    // Check if Shadow Pages Playbook already exists
    const existing = await db.select().from(resources).where(eq(resources.resourceId, 'shadow-pages-playbook-complete-guide'));
    
    if (existing.length > 0) {
      console.log('✅ Shadow Pages Playbook already exists in database');
      return;
    }
    
    // Insert Shadow Pages resource card
    const [resource] = await db.insert(resources).values({
      resourceId: 'shadow-pages-playbook-complete-guide',
      imageUrl: '/uploads/book_1753355066598.png',
      title: 'Shadow Pages Playbook',
      description: 'Everything YOU need to know about how Shadow Pages work and how you can generate cashflow from them...',
      buttonText: 'Learn More',
      buttonUrl: '/free-resources/shadow-pages-playbook',
      isActive: true,
      templateId: 'shadow-pages-playbook-complete-guide'
    }).returning();
    
    // Insert Shadow Pages template content
    await db.insert(resourceTemplates).values({
      resourceId: 'shadow-pages-playbook-complete-guide',
      headline: 'Shadow Pages Playbook',
      subheadline: 'Everything YOU need to know about how Shadow Pages work and how you can generate cashflow from them...',
      body: JSON.stringify({
        "authorName": "Eric",
        "authorTitle": "Shadow Pages Expert", 
        "ctaText": "Start Your Shadow Page",
        "bodyContent": "## The Golden Opportunity Creators Are Using to Earn Passively Online\n\nIn the last 5-10 years a new wave of millionaires hit… And it is not coming from traditional real estate, stocks or anything like that.\n\nSocial media has created millionaires out of the blue with the rise of platforms like Instagram, TikTok and YouTube — normal people could start uploading content, get viewers and get paid (e.g. MrBeast, Kylie Jenner etc.)\n\nAnd take advantage of the creator industry that Goldman Sachs expects to skyrocket to **half a trillion by 2027**.\n\nYet the problem was you had to show yourself, lose all your privacy and at the same time it took a lot of time to create content…\n\nBut now a new era has begun, where **faceless creators are taking over** — with Shadow Pages you do not have to show yourself, be an influencer or even create any of the videos yourself…\n\n## What Are Shadow Pages?\n\nThink of Shadow Pages as Instagram accounts that are all about a specific niche or topic, not a person. **The page itself is the brand**. You most likely follow a bunch of them.\n\nWe are talking about those popular accounts you see posting content on:\n▶︎ Motivation\n▶︎ Business \n▶︎ Gym life\n▶︎ Spirituality\n▶︎ Weird facts\n\nPages like @wealth, @mindset.therapy @pubity or @gymfailnation…\n\nThese pages grow by posting niche specific, high engagement content - all without showing the person behind it. Most of the content is either reposted, created with AI, or outsourced to cheap freelancers.\n\n## 5 Proven Ways Shadow Pages Make Money\n\n### 1. Ads & Promos (Shoutouts)\nOne of the simplest ways to start earning. Once your page has an engaged niche audience, businesses or brands will reach out & pay you to promote them. Even smaller pages can profit from this, and it is completely passive.\n\n### 2. Affiliate Marketing\nThis is one of the best ways how you can profit when starting out as you can promote a proven product that someone else created and earn up to **80% commissions** - without having to deal with customers support, inventory or even creating the product.\n\n### 3. Selling Your OWN Digital Products\nHigh-trust = high profits. Once your audience connects with your content, you can sell ebooks, templates, guides, or courses. **Margins are nearly 100%** since you create once and sell endlessly.\n\n### 4. Instagram Creator Fund & Bonuses\nInstagram now pays creators for views via bonuses and incentive programs. You do not need to sell anything - just post simple content and Instagram will pay you rewards.\n\n### 5. Brand Deals & Sponsorships\nAs your page grows, brands may offer long-term collabs and higher-paying deals. This can go far beyond shoutouts - custom content, partnerships, and **5 figure monthly deals** are possible.\n\n## Complete Automation System\n\nShadow Pages run without needing your face, voice, or daily involvement. That is what makes them scalable allowing you to manage multiple pages with minimal effort.\n\n**Content Creation:**\n▶︎ Use done-for-you Canva templates\n▶︎ A.I. generated scripts\n▶︎ Content calendars\n▶︎ No design skills required\n\n**Scheduling:**\n▶︎ Automatically post with Meta Business Suite\n\n**Engagement:**\n▶︎ Outsource DMs, comments, and interactions to ManyChat\n\n**Monetization:**\n▶︎ Register for affiliate products\n▶︎ Set up digital products that generate income 24/7\n\n## Step-by-Step Implementation Guide\n\n### Step 1: Pick a Niche\nChoose a niche you are passionate about - this makes it easier to stay consistent in the long run. Here are proven niches:\n▶︎ **Wealth**\n▶︎ **Health & Fitness**\n▶︎ **Relationships**\n▶︎ **Finance**\n▶︎ **Motivation**\n▶︎ **Travel**\n▶︎ **Business**\n▶︎ **Glowup**\n\n### Step 2: Research Competitors\n▶︎ Go to socialblade.com (free) and create an account\n▶︎ Search for the top 10 pages in your niche\n▶︎ Make a list of videos that went viral (at least 100K+ views)\n▶︎ Model what works\n\n### Step 3: Setup Your Page\n▶︎ Use Namelix (free) to generate a name & username\n▶︎ Use Canva (free) to create a simple logo\n▶︎ Use ChatGPT (free) to write your Shadow Page bio\n▶︎ Go to Instagram and create a new account\n\n### Step 4: Select a Digital Product to Sell\nBest part is you do not even have to create your own or worry about angry customers.\n▶︎ Go to CopeCart and make an account\n▶︎ In their marketplace, they have a list of performing products\n▶︎ Choose one product around your niche\n\n### Step 5: Content Creation\nHere is my simple process to create content (30-60 min):\n▶︎ Take the list of viral videos from your competitors\n▶︎ Re-create them using CapCut (free)\n▶︎ Or hire a video editor from Fiverr\n▶︎ Use FB Creator Studio (free) to schedule all the content\n▶︎ Set up ManyChat (free) to reply to comments & messages\n\n## Real Student Results\n\n**Dino** went from working a 9-5 at a restaurant to making **$36,000 per month**...\n\nNot too long ago he was working a 9-5 as restaurant manager, having no freedom and working long over hours. Then he started working with us and just a couple of months afterward he made over $36,000 in just one single month with his Shadow Page and gained over 500K followers.\n\n**Amelie** makes an extra **$3K-$5K a month** passively next to her corporate job…\n\nHaving one income stream is scary in today day and age. Since we started working together she was able to add an extra $3K-$5K/mo on autopilot with her Shadow Page.\n\n**Jeppe** quit his 9-5 job and his Shadow Page is making him **$10,588/mo**...\n\nHe went from working a 9-5 sales job to making $10,320 with his Shadow Page @wealthyparty and quitting his job after working with us for just 3 months.\n\n**Ethan** makes an extra **$15,000 per month** with his Shadow Page while at university...\n\nWhen we started working together Ethan was a normal university student who had no idea how to start, grow or make money with Shadow Pages. He wanted to add an extra stream of income, and now his Shadow Page is making him $15,000 per month on complete autopilot.\n\n## Frequently Asked Questions\n\n**Can anyone do this?**\nYes. You do not need tech skills, a following, or experience. If you can follow steps and put in consistent effort, you can build and grow a Shadow Page using proven systems.\n\n**Can I do this next to my job?**\nAbsolutely. Most people start while working full time. Once it is set up, the system can run in under 30 minutes a day or even less with automation.\n\n**How long to see results?**\nMost see income within 1-3 months. With consistent effort, **$3k-$10k/month is realistic by month six**.\n\n**Do I need experience?**\nNope. Beginners do well with the right system. No personal brand or design skills required.\n\n**How much time does it take?**\nStart with 1-2 hours/day. After automation, many manage their page in under 60 minutes a day.\n\n**Can I automate everything?**\nYes. You can automate content creation, scheduling, engagement, and even monetization systems using templates, AI, and a virtual assistant.\n\n**Do I need to show my face?**\nNo. Shadow Pages are fully faceless. You stay anonymous while building a profitable digital asset.\n\n**What if I am not creative?**\nYou get plug-and-play content templates, prompts, and scripts. No design background needed.\n\n**How do I scale past $1k/month?**\nYou stack income streams: digital products, affiliate links, multiple pages, or high-ticket offers. Most students scale with simple systems, not extra hours.",
        "logoUrl": "https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png"
      }),
      template: 'guide',
      slug: 'shadow-pages-playbook',
      metaTitle: 'Shadow Pages Playbook - Complete Guide to $5K-$10K Monthly Income',
      metaDescription: 'Learn how to build profitable faceless Instagram pages that generate $5K-$10K monthly. Complete step-by-step system with automation strategies and real case studies.',
      featuredImage: '/uploads/book_1753355066598.png',
      isPublished: true
    });
    
    console.log('✅ Shadow Pages Playbook seeded successfully');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };