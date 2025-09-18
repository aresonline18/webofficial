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
import shadowPagesExamplesImage from '@assets/Untitled design (36)_1758228253267.png';
import instagramProfilesImage from '@assets/Untitled design (25)_1753178319307.png';
import shadowPagesLogo from '@assets/Untitled design (37)_1758228370983.png';
import whatsappImage from '@assets/WhatsApp Image 2025-08-15 at 14.51.15_1758229579541.jpeg';

export default function ShadowPagesPlaybookFemale() {
  const { hasParam, getParam } = useUrlParams();
  const showCTAButtons = hasParam('utm_campaign');
  const partnerId = getParam('partner_id');

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="Shadow Pages Queen Guide - Complete Guide to Build Your Empire and Achieve Financial Independence"
        description="Complete step-by-step guide to build your empire and achieve financial independence through Shadow Pages. Learn Instagram business strategies, faceless marketing, and social media monetization designed for ambitious women entrepreneurs."
        keywords="Shadow Pages Queen Guide, shadow pages guide, instagram business for women, faceless marketing for women, social media monetization, Shadow Pages strategy, instagram growth for women, digital marketing guide, female entrepreneurs"
        ogTitle="Shadow Pages Queen Guide - Complete Guide"
        ogDescription="Complete step-by-step guide to build your empire and achieve financial independence through Shadow Pages. Learn Instagram business strategies, faceless marketing, and social media monetization designed for ambitious women entrepreneurs."
        canonical={`${window.location.origin}/free-resources/shadow-pages-playbook`}
        contentType="faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebPage", "FAQPage", "Guide"],
          "name": "Shadow Pages Queen Guide - Complete Guide",
          "description": "Complete step-by-step guide to build your empire and achieve financial independence through Shadow Pages",
          "url": `${window.location.origin}/free-resources/shadow-pages-playbook`,
          "about": [
            "Shadow Pages strategy for women",
            "Instagram business growth for female entrepreneurs", 
            "Faceless marketing techniques",
            "Social media monetization for women",
            "Digital marketing automation",
            "Instagram content strategy",
            "Social media business for women"
          ],
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can anyone do this?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You don't need any prior experience to do this. No tech skills, no prior following or anything. If you can just follow some simple steps then starting and running a Shadow Page is simple if you have the right systems in place"
              }
            },
            {
              "@type": "Question", 
              "name": "How can I work with you?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We work closely with a select group of ambitious women to help them implement Shadow Pages and start generating real revenue. If you're serious about building a successful Shadow Pages business and achieving financial independence, click the apply button."
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
                "text": "Like we've already mentioned, our #1 priority is for our students to win that's why you'll have your own dedicated head coach and be able to ask questions anytime you'd like. Plus you'll have weekly 1-1 calls, where you can ask questions, fix any road blocks and be able to get to the next level."
              }
            },
            {
              "@type": "Question",
              "name": "How much time do I need to invest?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Shadow Pages are designed to be efficient and perfect for busy women. Once set up properly, you can manage multiple Shadow Pages with just 1-2 hours per day. The key is having the right systems and processes in place."
              }
            },
            {
              "@type": "Question",
              "name": "What makes Shadow Pages different from regular Instagram accounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Shadow Pages operate without showing your face or personal brand. They focus on specific niches and use proven content strategies to build engaged audiences that convert into customers - perfect for women who want privacy while building their empire."
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
                "name": "Shadow Pages Queen Guide",
                "item": `${window.location.origin}/free-resources/shadow-pages-playbook`
              }
            ]
          },
          "teaches": [
            "How to start Shadow Pages business as a woman entrepreneur",
            "Instagram growth strategies for women",
            "Faceless marketing techniques", 
            "Social media monetization for female entrepreneurs",
            "Content creation for Shadow Pages",
            "Audience building strategies",
            "Revenue generation methods for women"
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
              src={shadowPagesLogo}
              alt="The Shadow Pages Queen Guide"
              className="h-32 w-auto mx-auto mb-4"
            />
          </div>
        </div>

        {/* Headline and Author Info - Following exact style guide */}
        <div className="container mx-auto px-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-center mb-6 md:mb-8 leading-tight">
            The Female Shadow Pages Playbook
          </h1>
          
          <h2 className="text-xl md:text-3xl text-center mb-8 md:mb-10 max-w-5xl mx-auto leading-relaxed">
            Everything <strong>YOU</strong> need to know about creating your own successful Shadow Pages business and becoming financially independent as a boss babe entrepreneur...
          </h2>
        </div>

        {/* Main Content - Following exact style guide */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-gray-800">
              In the last 5-10 years a new wave of female millionaires emerged... Social media has created more millionaires in the last few years than anything else, and women are leading this revolution.
            </p>

            <p className="text-gray-800">
              With platforms like Instagram, TikTok and YouTube on the rise — normal women could start uploading content, get viewers and get paid while building their empire.
            </p>

            <p className="text-gray-800">
              <strong>But there was a problem:</strong> you had to show yourself, lose all your privacy, and spend countless hours creating content.
            </p>

            <p className="text-gray-800">
              Now a new era has begun, where faceless social media brands are taking over — with Shadow Pages you can profit off social media the same way all these influencers do, but without having to show yourself, be an influencer or create any of the content yourself...
            </p>

            <p className="text-gray-800">
              This is the first time in history where ambitious women can leverage social media platforms to generate cashflow and take advantage of the booming creator economy that Goldman Sachs predicts to skyrocket to half a trillion dollars by 2027:
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
              This allows you to run multiple pages simultaneously (many of our female students manage 5-10+ pages) and each one generates 4-5 figures per month — while traditional creators are stuck building only their persona, which they cannot even sell.
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
              Think of Shadow Pages as faceless Instagram brands that are all about a specific niche or topic, not a person. The page itself is the brand, which is why you can completely automate it & scale easily - perfect for ambitious women who want to build their empire.
            </p>

            <p className="text-gray-800">
              You most likely already came across a bunch of them or even follow them — pages like @wealth, @bossbabe or @femalehustleclub.
            </p>

            <div className="my-8 md:my-12">
              <img 
                src={shadowPagesExamplesImage}
                alt="Examples of Shadow Pages: @wealth, @bossbabe, and @femalehustleclub Instagram profiles"
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
              This is exactly how many successful female entrepreneurs have automated multiple pages and how they're able to only spend 5-15min a day on their pages while building their empire.
            </p>

            <p className="text-gray-800">
              Before, you had to do everything yourself — create videos, research content, write captions. Now with the right systems in place, A.I. handles it all for you.
            </p>

            <p className="text-gray-800">
              This is a huge opportunity for women to take advantage of the A.I. revolution and profit from it, rather than getting left behind like with other opportunities in the past.
            </p>

            <p className="text-gray-800">
              But how can you exactly generate cashflow you might ask?
            </p>

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900 }}>Here Are The Top 5 Proven Monetization Methods:</h3>
            
            <div className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                <h4 className="font-bold text-lg mb-2">1. Ads & Promos (Shoutouts)</h4>
                <p className="text-gray-700">Once your page has grown an audience, businesses will pay you to promote them. Large pages sell simple shoutouts for thousands - perfect passive income!</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                <h4 className="font-bold text-lg mb-2">2. Affiliate Marketing</h4>
                <p className="text-gray-700">Promote proven products and earn up to 80% commissions without dealing with customer support or inventory - ideal for busy women entrepreneurs.</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                <h4 className="font-bold text-lg mb-2">3. Digital Products</h4>
                <p className="text-gray-700">Sell ebooks, templates or simple guides. Margins are nearly 100% since you create once and sell endlessly (PS: You can leverage A.I. to create it all for you)</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                <h4 className="font-bold text-lg mb-2">4. Instagram Creator Fund</h4>
                <p className="text-gray-700">Instagram pays creators for views via bonuses and incentive programs. Extra cashflow for you without selling anything.</p>
              </div>
              
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                <h4 className="font-bold text-lg mb-2">5. Brand Deals & Sponsorships</h4>
                <p className="text-gray-700">Long-term collabs and higher-paying deals. Many successful female entrepreneurs work with major brands and earn multiple 5 figures per month...</p>
              </div>
            </div>

            <p className="text-gray-800">
              As we've already mentioned, your Shadow Pages will not only generate cashflow but act as real assets that businesses extremely value...
            </p>

            <p className="text-gray-800">
              That's why they're ready to pay thousands of dollars for simple shoutouts or pay multiple 5 to even 6 figures per month to secure long-term partnerships with you.
            </p>

            <p className="text-gray-800">
              And the best part is you can combine multiple monetization methods at the same time, meaning you can have multiple streams of income from just one page — now imagine owning 2, 3, or even 5 pages simultaneously... 
            </p>

            <p className="text-gray-800">
              Amazing right, queen?
            </p>

            <p className="text-gray-800">
              That's what makes this business model one of the most powerful ways for women to build real, passive income and achieve true financial independence.
            </p>

            <p className="text-gray-800">
              But what are the exact steps to start your own Shadow Page empire?
            </p>

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900 }}>Here's The Exact A To Z Process:</h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#1 Pick a Niche</h4>
                <p className="text-gray-700 mb-3">You can choose a topic that interests you for example or are passionate about - if you don't know what to pick then here are some proven niches that work extremely well for our female students:</p>
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
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#2 Research Competitors</h4>
                <p className="text-gray-700">Use socialblade.com to find top 10 pages in your niche and model what already went viral for them.</p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#3 Setup Your Page</h4>
                <div className="space-y-1">
                  <p className="text-gray-700">→ Use Namelix (free) to generate a name & username</p>
                  <p className="text-gray-700">→ Use Canva (free) to create a simple logo</p>
                  <p className="text-gray-700">→ Use ChatGPT (free) to write your Shadow Page bio</p>
                  <p className="text-gray-700">→ Go to Instagram and create a new account</p>
                </div>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#4 Choose a Monetization Method</h4>
                <p className="text-gray-700">We'd recommend when starting out to begin with an affiliate product and while you grow your page, brands will start reaching out to you to buy advertisements and you'll begin stacking consistent reliable income.</p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-lg mb-2">#5 Content Creation</h4>
                <p className="text-gray-700">Leverage the key insights from your competitors research, take the videos that went viral and let A.I. tools create similar content like that. That way you only post content that works well and goes viral - while everything runs on autopilot.</p>
              </div>
            </div>

            <h3 className="font-inter font-black text-xl text-black mt-8 mb-4" style={{ fontWeight: 900, fontSize: 'calc(1.25rem + 5px)' }}>But who are we and how can we help you?</h3>
            
            <p className="text-gray-800">
              We've empowered dozen of women and helped them build financial freedom or even help them replace their 9-5 job with Shadow Pages.
            </p>

            <p className="text-gray-800">
              We want to help you travel, spend more time with your family and do what you truly love, just like we helped over over 800+ of our students accomplish that and build a steady and reliable income stream with Shadow Pages.
            </p>

            <p className="text-gray-800">
              Just like our student Amelie who started her Shadow Page @femalehustleclub next to her corporate job.
            </p>

            <p className="text-gray-800">
              Within just a couple of months was able to grow it to 400K followers and add an extra $4,000 per month with less than 1 hour a day.
            </p>

            <div className="my-8 md:my-12">
              <img 
                src="https://www.shadowpages.io/hosted/images/fe/bf44e0e9b044a2a256ae07ccfaa4c6/IMG_1562.jpg"
                alt="Amelie's success story with @femalehustleclub"
                className="w-full max-w-2xl md:max-w-4xl mx-auto rounded-lg shadow-2xl mb-6"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>

            <div className="my-8 md:my-12">
              <img 
                src={whatsappImage}
                alt="Success testimonial"
                className="w-full max-w-2xl md:max-w-4xl mx-auto rounded-lg shadow-2xl mb-6"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>

            <p className="text-gray-800">
              And we've got countless other amazing case-studies and have changed dozen of lifes.
            </p>

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900, fontSize: 'calc(1.25rem + 3px) md:calc(1.5rem + 3px)' }}>Here's what our students have to say:</h3>

            <div className="my-8">
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe 
                  src="https://www.youtube.com/embed/AvYlOzcVLOk"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                  title="Shadow Pages Female Success Stories"
                />
              </div>
            </div>

            {showCTAButtons ? (
              <>
                <p className="text-gray-800 mt-8 mb-4">
                  If you'd like to learn more how we can help you get started with Shadow Pages and build your empire - click the button below to book a call with our head coach 👇🏼
                </p>

                <div className="text-center mb-8">
                  <ResourceApplyNowButton 
                    resourceName="Shadow Pages Queen Guide"
                    className="w-full px-8 py-6 text-white rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
                    style={{
                      background: 'linear-gradient(to bottom, #EC4899, #BE185D)'
                    }}
                    utmTerm={partnerId || undefined}
                    data-testid="button-apply-now"
                  >
                    <span className="text-2xl mb-1" style={{ fontWeight: 900, fontSize: 'calc(1.5rem + 2px)' }}>Click Here To Book Your 1/1 Call With My Team</span>
                    <span className="text-sm font-normal opacity-90">And see if you qualify to work with us</span>
                  </ResourceApplyNowButton>
                </div>

                <p className="text-gray-800 mb-8 text-center">
                  <span className="text-sm text-gray-600">(no spam please, only if you're serious about building your empire)</span>
                </p>
              </>
            ) : null}

            <h3 className="font-black text-xl md:text-2xl text-black mt-12 md:mt-16 mb-6 md:mb-8 md:pt-2" style={{ fontWeight: 900 }}>Frequently Asked Questions</h3>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">Can anyone do this?</AccordionTrigger>
                <AccordionContent>
                  Yes! You don't need any prior experience to do this. No tech skills, no prior following or anything. If you can just follow some simple steps then starting and running a Shadow Page is simple if you have the right systems in place.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">How can I work with you?</AccordionTrigger>
                <AccordionContent>
                  We work closely with a select group of ambitious women to help them implement Shadow Pages and start generating real revenue. If you're serious about building a successful Shadow Pages business and achieving financial independence, click the apply button.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">What's your guarantee?</AccordionTrigger>
                <AccordionContent>
                  We're so confident in our system that we offer a full money-back guarantee. If you don't see results following our proven Shadow Pages framework, we'll refund every penny.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">What kind of support will I get when working with you?</AccordionTrigger>
                <AccordionContent>
                  Like we've already mentioned, our #1 priority is for our students to win that's why you'll have your own dedicated head coach and be able to ask questions anytime you'd like. Plus you'll have weekly 1-1 calls, where you can ask questions, fix any road blocks and be able to get to the next level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">How much time do I need to invest?</AccordionTrigger>
                <AccordionContent>
                  Shadow Pages are designed to be efficient and perfect for busy women. Once set up properly, you can manage multiple Shadow Pages with just 1-2 hours per day. The key is having the right systems and processes in place.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">What makes Shadow Pages different from regular Instagram accounts?</AccordionTrigger>
                <AccordionContent>
                  Shadow Pages operate without showing your face or personal brand. They focus on specific niches and use proven content strategies to build engaged audiences that convert into customers - perfect for women who want privacy while building their empire.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </div>
      </div>

      <RelatedResources currentResourceSlug="shadow-pages-playbook" />
    </div>
  );
}