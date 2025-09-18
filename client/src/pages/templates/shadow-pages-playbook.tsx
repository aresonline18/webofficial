import StickyCTA from '@/components/sticky-cta';
import RelatedResources from '@/components/related-resources';
import SEOHead from '@/components/SEOHead';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ResourceApplyNowButton from '@/components/ResourceApplyNowButton';
import { useUrlParams } from '@/hooks/useUrlParams';
// Import images exactly as in original WebsiteCloner
import forbesImage from '@assets/Untitled design (13)_1753161995020.png';
import daquanImage from '@assets/Untitled design (14)_1753162832761.png';
import goldmanImage from '@assets/Untitled design (15)_1753164576035.png';
import shadowPagesExamplesImage from '@assets/Untitled design (22)_1753167318922.png';
import instagramProfilesImage from '@assets/Untitled design (25)_1753178319307.png';
import shadowPagesLogo from '@assets/book_1753355066598-min_1753701793338.png';

export default function ShadowPagesPlaybook() {
  const { hasParam } = useUrlParams();
  const showCTAButtons = hasParam('utm_campaign');

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="Shadow Pages Playbook - Complete Guide to Start, Run and Profit from Shadow Pages"
        description="Complete step-by-step guide to start, run and profit from Shadow Pages. Learn Instagram business strategies, faceless marketing, and social media monetization."
        keywords="Shadow Pages Playbook, shadow pages guide, instagram business, faceless marketing, social media monetization, Shadow Pages strategy, instagram growth, digital marketing guide"
        ogTitle="Shadow Pages Playbook - Complete Guide"
        ogDescription="Complete step-by-step guide to start, run and profit from Shadow Pages. Learn Instagram business strategies, faceless marketing, and social media monetization."
        canonical={`${window.location.origin}/free-resources/shadow-pages-playbook`}
        contentType="faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebPage", "FAQPage", "Guide"],
          "name": "Shadow Pages Playbook - Complete Guide",
          "description": "Complete step-by-step guide to start, run and profit from Shadow Pages",
          "url": `${window.location.origin}/free-resources/shadow-pages-playbook`,
          "author": {
            "@type": "Person",
            "name": "Eric Cole",
            "description": "Entrepreneur & Social Media Mastermind"
          },
          "about": [
            "Shadow Pages strategy",
            "Instagram business growth", 
            "Faceless marketing techniques",
            "Social media monetization",
            "Digital marketing automation",
            "Instagram content strategy",
            "Social media business"
          ],
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can anyone do this?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. You don't need any prior experience to do this. No tech skills, no prior following or anything. If you can just follow some simple steps then starting and running a Shadow Page is simple if you have the right systems in place"
              }
            },
            {
              "@type": "Question", 
              "name": "How can I work with you?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We work closely with a select group of people to help them implement Shadow Pages and start generating real revenue. If you're serious about building a successful Shadow Pages business, click the apply button."
              }
            },
            {
              "@type": "Question",
              "name": "What's your guarantee?",
              "acceptedAnswer": {
                "@type": "Answer", 
                "text": "We're so confident in our system that we offer a full money-back guarantee. If you don't see results following our proven Shadow Pages framework, we'll refund every penny."
              }
            },
            {
              "@type": "Question",
              "name": "What kind of support will I get when working with you?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Like I've already mentioned our #1 priority is for our students to win that's why you'll have your own dedicated head coach and be able to ask questions anytime you'd like. Plus you'll have weekly 1-1 calls, where you can ask questions, fix any road blocks and be able to get to the next level."
              }
            },
            {
              "@type": "Question",
              "name": "How much time do I need to invest?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Shadow Pages are designed to be efficient. Once set up properly, you can manage multiple Shadow Pages with just 1-2 hours per day. The key is having the right systems and processes in place."
              }
            },
            {
              "@type": "Question",
              "name": "What makes Shadow Pages different from regular Instagram accounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Shadow Pages operate without showing your face or personal brand. They focus on specific niches and use proven content strategies to build engaged audiences that convert into customers."
              }
            }
          ],
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Shadow Pages Playbook", 
                "item": `${window.location.origin}/free-resources/shadow-pages-playbook`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Shadow Pages Playbook",
                "item": `${window.location.origin}/free-resources/shadow-pages-playbook`
              }
            ]
          },
          "teaches": [
            "How to start Shadow Pages business",
            "Instagram growth strategies",
            "Faceless marketing techniques", 
            "Social media monetization",
            "Content creation for Shadow Pages",
            "Audience building strategies",
            "Revenue generation methods"
          ]
        }}
      />
      <StickyCTA />
      {/* Hero Section */}
      <div className="py-8">
        {/* Logo Section - All Devices */}
        <div className="container mx-auto px-4 pt-1 pb-1 logo-section-mobile">
          <div className="text-center">
            <img 
              src="https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png"
              alt="The Shadow Pages Playbook"
              className="h-32 w-auto mx-auto mb-4"
            />
          </div>
        </div>

        {/* Headline and Author Info - Following exact style guide */}
        <div className="container mx-auto px-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-center mb-6 md:mb-8 leading-tight">
            The Shadow Pages Playbook
          </h1>
          
          <h2 className="text-xl md:text-3xl text-center mb-8 md:mb-10 max-w-5xl mx-auto leading-relaxed">
            Everything <strong>YOU</strong> need to know about how Shadow Pages work and how you can generate cashflow from them...
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg mb-12 text-center">
            Written by <a href="#" className="text-blue-600 hover:underline">Eric Cole</a>{' '}
            <span className="text-gray-500">(Entrepreneur & Social Media Mastermind)</span>
          </p>
        </div>

        {/* Main Content - Following exact style guide */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-gray-800">
              In the last 5-10 years a new wave of millionaires hit… Social media has created more millionaires in the last few years than anything else.
            </p>

            <p className="text-gray-800">
              With platforms like Instagram, TikTok and YouTube on the rise — normal people could start uploading content, get viewers and get paid.
            </p>

            <p className="text-gray-800">
              <strong>But there was a problem:</strong> you had to show yourself, lose all your privacy, and spend countless hours creating content.
            </p>

            <p className="text-gray-800">
              Now a new era has begun, where faceless social media brands are taking over — with Shadow Pages you can profit off social media the same way all these influencers do, but without having to show yourself, be an influencer or create any of the content yourself...
            </p>

            <p className="text-gray-800">
              This is the first time in history where regular everyday people can leverage social media platforms to generate cashflow and take advantage of the booming creator economy that Goldman Sachs predicts to skyrocket to half a trillion dollars by 2027:
            </p>

            <div className="my-8 md:my-12">
              <img 
                src={goldmanImage}
                alt="Goldman Sachs predicts creator economy could approach half a trillion dollars by 2027"
                className="w-full max-w-2xl md:max-w-4xl mx-auto rounded-lg shadow-2xl mb-6 md:mb-10"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>

            <p className="text-gray-800">
              And it's not only Goldman Sachs...
            </p>

            <p className="text-gray-800">
              Even Forbes says that faceless creators are taking over and that it's the future of social media:
            </p>

            <div className="my-8 md:my-12">
              <img 
                src={forbesImage}
                alt="Forbes article about faceless creators taking over social media"
                className="w-full max-w-2xl md:max-w-4xl mx-auto rounded-lg shadow-2xl mb-6 md:mb-10"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>

            <p className="text-gray-800">
              And the best part? You can scale this as a real business because your Shadow Pages aren't tied to your face, voice, or persona — meaning you can completely automate everything with A.I...
            </p>

            <p className="text-gray-800">
              This allows you to run multiple pages simultaneously (I personally manage 10+ pages) and each one generates me 4-5 figures per month — while traditional creators are stuck building only their persona, which they cannot even sell.
            </p>

            <p className="text-gray-800">
              But with Shadow Pages, you're building real assets that you can sell anytime you'd like. There are dozen of examples of pages that got sold for big million dollar deals — like the meme page @daquan, which Warner Studios acquired for $85M.
            </p>
            
            <div className="my-8 md:my-12">
              <img 
                src={daquanImage}
                alt="Warner Music paid $85 million for the @Daquan meme page"
                className="w-full max-w-2xl md:max-w-4xl mx-auto rounded-lg shadow-2xl mb-6 md:mb-10"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>
          </div>
        </div>

        {/* Continue with remaining sections */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto space-y-6">

            <h3 className="font-black text-xl md:text-2xl text-black md:mt-1 md:mb-8 md:pt-2 mt-[14px] mb-[14px]" style={{ fontWeight: 900 }}>What Exactly Are Shadow Pages?</h3>
            
            <p className="text-gray-800">
              Think of Shadow Pages as faceless Instagram brands that are all about a specific niche or topic, not a person. The page itself is the brand, which is why you can completely automate it & scale easily.
            </p>

            <p className="text-gray-800">
              You most likely already came across a bunch of them or even follow them — pages like @wealth, @pubity or @gymfailnation.
            </p>

            <div className="my-8 md:my-12">
              <img 
                src={shadowPagesExamplesImage}
                alt="Examples of Shadow Pages: @wealth, @pubity, and @gymfailnation Instagram profiles"
                className="w-full max-w-2xl md:max-w-4xl mx-auto rounded-lg mb-6 md:mb-10"
              />
            </div>

            <p className="text-gray-800" style={{ marginBottom: '-5px' }}>
              All you have to do is leverage simple A.I. tools to create all the content for you...
            </p>

            <p className="text-gray-800">
              This allows you to completely automate your page while keeping 90-95% profit margins since there are no further costs or hidden expenses like with other businesses.
            </p>

            <p className="text-gray-800">
              This is exactly how I've automated more than 10 of my pages and how I'm able to only spend 5-15min a day on my pages.
            </p>

            <p className="text-gray-800">
              Before, you had to do everything yourself — create videos, research content, write captions. Now with the right systems in place, A.I. handles it all for you.
            </p>

            <p className="text-gray-800">
              This is a huge opportunity to take advantage of the A.I. revolution and profit from it, rather than getting left behind like with other opportunities in the past.
            </p>

            <p className="text-gray-800">
              But how can you exactly generate cashflow you might ask?
            </p>

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900 }}>Here Are My Top 5 Proven Monetization Methods:</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">1. Ads & Promos (Shoutouts)</h4>
                <p className="text-gray-700">Once your page has grown an audience, businesses will pay you to promote them. Large pages sell simple shoutouts for thousands.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">2. Affiliate Marketing</h4>
                <p className="text-gray-700">Promote proven products and earn up to 80% commissions without dealing with customer support or inventory.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">3. Digital Products</h4>
                <p className="text-gray-700">Sell ebooks, templates or simple guides. Margins are nearly 100% since you create once and sell endlessly (PS: You can leverage A.I. to create it all for you)</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">4. Instagram Creator Fund</h4>
                <p className="text-gray-700">Instagram pays creators for views via bonuses and incentive programs. Extra cashflow for you without selling anything.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">5. Brand Deals & Sponsorships</h4>
                <p className="text-gray-700">Long-term collabs and higher-paying deals. I've worked with one of the biggest ecom brands in the past & they paid me multiple 5 figures per month...</p>
              </div>
            </div>

            <p className="text-gray-800">
              As I've already mentioned, your Shadow Pages will not only generate cashflow but act as real assets that businesses extremely value...
            </p>

            <p className="text-gray-800">
              That's why they're ready to pay thousands of dollars for simple shoutouts or pay multiple 5 to even 6 figures per month to secure long-term partnerships with you.
            </p>

            <p className="text-gray-800">
              And the best part is you can combine multiple monetization methods at the same time, meaning you can have multiple streams of income from just one page — now imagine owning 2, 3, or even 5 pages simultaneously... 
            </p>

            <p className="text-gray-800">
              Crazy right?
            </p>

            <p className="text-gray-800">
              That's what makes this business model one of the most powerful ways to build real, passive income and why I'm going all-in on it.
            </p>

            <p className="text-gray-800">
              But what are the exact steps to start your own Shadow Page?
            </p>

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900 }}>Here's My Exact A To Z Process:</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#1 Pick a Niche</h4>
                <p className="text-gray-700 mb-3">You can choose a topic that interests you for example or are passionated about - if you don't know what to pick then here are some proven niches that work extremely well for our students and myself:</p>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-700 whitespace-nowrap">→ Wealth</p>
                    <p className="text-gray-700 whitespace-nowrap">→ Health</p>
                    <p className="text-gray-700 whitespace-nowrap">→ Dating</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-700 whitespace-nowrap">→ Finance</p>
                    <p className="text-gray-700 whitespace-nowrap">→ Fitness</p>
                    <p className="text-gray-700 whitespace-nowrap">→ Motivation</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-700 whitespace-nowrap">→ Travel</p>
                    <p className="text-gray-700 whitespace-nowrap">→ Business</p>
                    <p className="text-gray-700 whitespace-nowrap">→ Beauty</p>
                  </div>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#2 Research Competitors</h4>
                <p className="text-gray-700">Use socialblade.com to find top 10 pages in your niche and model what already went viral for them.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#3 Setup Your Page</h4>
                <div className="space-y-1">
                  <p className="text-gray-700">→ Use Namelix (free) to generate a name & username</p>
                  <p className="text-gray-700">→ Use Canva (free) to create a simple logo</p>
                  <p className="text-gray-700">→ Use ChatGPT (free) to write your Shadow Page bio</p>
                  <p className="text-gray-700">→ Go to Instagram and create a new account</p>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#4 Choose a Monetization Method</h4>
                <p className="text-gray-700">I'd recommend when starting out to begin with an affiliate product and while you grow your page, brands will start reaching out to you to buy advertisements and you'll begin stacking consistent reliable income.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#5 Content Creation</h4>
                <p className="text-gray-700">Leverage the key insights from your competitors research, take the videos that went viral and let A.I. tools create similar content like that. That way you only post content that works well and goes viral - while everything runs on autopilot.</p>
              </div>
            </div>

            <h3 className="font-inter font-black text-xl text-black mt-8 mb-4" style={{ fontWeight: 900, fontSize: 'calc(1.25rem + 5px)' }}>But who am I? Here's a quick intro about me:</h3>
            
            <p className="text-gray-800">
              Hey I'm Eric - I'm not some overnight success story. I'm just a normal guy that didn't want to go the traditional route, but wanted to become an entrepreneur. I like having my own freedom and always did, which is why I began searching for ways to add an extra income stream.
            </p>

            <p className="text-gray-800">
              When I stumbled across Shadow Pages a couple years ago, everything changed. Since then I've been able to fully focus on this business, work with large companies, run more than 10+ Shadow Pages and generate multiple 5-figures per month.
            </p>

            <p className="text-gray-800">
              Some of my pages even have close to 500K followers like @glowupacademyy or @boysglowup:
            </p>

            {/* Instagram Profiles Image - Wider Container as per original */}
            <div className="max-w-4xl md:max-w-6xl mx-auto px-4 my-8" style={{ marginTop: '-8px', marginBottom: '-8px' }}>
              <img 
                src={instagramProfilesImage}
                alt="Instagram profiles of @boysglowup and @glowupacademyy showing follower counts"
                className="w-full rounded-lg"
                style={{ paddingTop: '15px' }}
              />
            </div>
          </div>
        </div>
          
        {/* Continue Main Content */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto space-y-6">

            <p className="text-gray-800">
              But what I'm more proud to share is the fact that as my business is fully automated - I've been able to dedicate my time to helping everyday people add an extra income stream with Shadow Pages...
            </p>

            <p className="text-gray-800">
              Now we've grown our community to more than 800+ people, where we help each other grow and generate cashflow with Shadow Pages.
            </p>

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900, fontSize: 'calc(1.25rem + 3px) md:calc(1.5rem + 3px)' }}>Here's what my students have to say:</h3>

            <div className="my-8">
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe 
                  src="https://www.youtube.com/embed/AvYlOzcVLOk?start=5"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                  title="Shadow Pages Student Testimonials"
                />
              </div>
            </div>

            {showCTAButtons ? (
              <>
                <p className="text-gray-800 mt-8 mb-4">
                  If you'd like to learn more how we can help you get started with Shadow Pages - click the button below to book a call with my head coach 👇🏼
                </p>

                <div className="text-center mb-6">
                  <ResourceApplyNowButton 
                    resourceName="Shadow Pages Playbook"
                    className="w-full px-8 py-6 text-white rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
                    style={{
                      background: 'linear-gradient(to bottom, #385DC6, #2C4A9E)'
                    }}
                  >
                    <span className="text-2xl mb-1" style={{ fontWeight: 900, fontSize: 'calc(1.5rem + 2px)' }}>Click Here To Book Your 1/1 Call With My Team</span>
                    <span className="text-sm font-normal opacity-90">And see if you qualify to work with us</span>
                  </ResourceApplyNowButton>
                </div>

                <p className="text-gray-800 mb-8">
                  Or message me @erichustls on Instagram with "Book a call"<br />
                  <span className="text-sm text-gray-600">(no spam please, only if you're serious)</span>
                </p>
              </>
            ) : (
              <p className="text-gray-800 mt-8 mb-8">
                If you'd like to learn more how we can help you get started with Shadow Pages then message me @erichustls on Instagram with "Book a call".<br /><br />
                <span className="text-sm text-gray-600">(no spam please, only if you're serious)</span>
              </p>
            )}

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900, fontSize: 'calc(1.25rem + 10px) md:calc(1.5rem + 10px)' }}>Frequently Asked Questions</h3>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  Can anyone do this?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  Yes. You don't need any prior experience to do this. No tech skills, no prior following or anything.<br /><br />
                  If you can just follow some simple steps then starting and running a Shadow Page is simple if you have the right systems in place
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  Can I do this next to my job?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  Absolutely. Most people start their Shadow Pages next to their job as once it's fully set up & automated, the system can run pretty much on it's own.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  How can I work with you?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  Every month we only work with a limited amount of individuals as our #1 priority is for our students to win.<br /><br />
                  That's why our spots are always very limited and we're very picky with who we work with...<br /><br />
                  But if you'd like to learn more and see if you would qualify, message me on my Instagram @erichustls the word "Book a call" and talk more if we can help you.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  What's your guarantee?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  Well firstly depends if we can, even work with you, but if you qualify we'll work closely 1-1 together for the next 6-12 months until you hit at least $5K-$10K/mo with your Shadow<br /><br />
                  That way it's almost impossible to fail as we ensure every single student crushes it.<br /><br />
                  We are able to promise this as we go on weekly calls together, provide all of our systems, strategies and support. You'll have everything you need to build your Shadow Page and make $5K-$10K/mo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  What kind of support will I get when working with you?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  Like I've already mentioned our #1 priority is for our students to win that's why you'll have your own dedicated head coach and be able to ask questions anytime you'd like.<br /><br />
                  Plus you'll have weekly 1-1 calls, where you can ask questions, fix any road blocks and be able to get to the next level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  How long to see results?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  It completely depends, we've got students that make 4 figures/mo in their first month and others that need longer. A fair and realistic expectation is 3-6 months to hit $2K-$5K/mo with your Shadow Pages, but more is also possible as we've seen in a variety of students.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  Do I need experience?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  Nope like already mentioned in another FAQ, this system is developed in a way, that you do not need ANY prior experience. You just need the right systems and they'll work for you like clockwork.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  How much time does it take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  At the start, it'll be around 1 hour per day, yet after you've automated your page it'll mostly work on it's own - all you have to do is check your page and make sure everything runs smooth. I spend for example 15min a day on my pages to control everything runs the way it should.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-bold text-black hover:no-underline">
                  Can I automate everything?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-6">
                  Yes. You can close to everything from creating content to scheduling, and even monetization systems using templates and proven systems.
                </AccordionContent>
              </AccordionItem>


            </Accordion>

          </div>
        </div>

        {/* Related Resources Section */}
        <RelatedResources 
          currentResourceSlug="shadow-pages-playbook"
          colorScheme="purple"
          title="More Free Resources ↓"
        />

      </div>
    </div>
  );
}