import StickyCTA from '@/components/sticky-cta';
import forbesImage from '@assets/Untitled design (13)_1753161995020.png';
import daquanImage from '@assets/Untitled design (14)_1753162832761.png';
import goldmanImage from '@assets/Untitled design (15)_1753164576035.png';
import shadowPagesExamplesImage from '@assets/Untitled design (22)_1753167318922.png';
import instagramProfilesImage from '@assets/Untitled design (25)_1753178319307.png';

export default function ShadowPagesPlaybook() {
  return (
    <div className="bg-white min-h-screen">
      <StickyCTA />
      
      {/* Hero Section */}
      <div className="py-8">
        {/* Logo Section - All Devices */}
        <div className="container-narrow pt-1 pb-1 logo-section-mobile">
          <img 
            src="https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png"
            alt="Shadow Pages Logo"
            className="h-24 w-auto mb-2 mx-auto"
          />
        </div>

        {/* Headline and Author Info - Narrow Container */}
        <div className="container-narrow mb-8 mobile-section" style={{ marginTop: 0, paddingTop: 0 }}>
          <h1 className="headline-primary mb-4">
            The Shadow Pages Playbook
          </h1>
          
          <h2 className="headline-secondary mb-6">
            The complete A to Z system how <strong>YOU</strong> can profit from the booming Creator Economy without having to show your face, create any content and completely on autopilot.
          </h2>
          
          <p className="text-gray-600 text-base mb-8 author-mobile" style={{ textAlign: 'center' }}>
            Written by <a href="#" className="text-blue-600 hover:underline">Eric Cole</a>{' '}
            <span className="text-gray-500">(Entrepreneur & Social Media Mastermind)</span>
          </p>
        </div>



        {/* Main Content - Narrow Container */}
        <div className="container-narrow mb-12 mobile-section">


          <div className="text-content space-y-6">
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
              Now a new era has begun, where <strong>faceless social media brands are taking over</strong> — with Shadow Pages you can profit off social media the same way all these influencers do and take advantage of the booming creator economy that Goldman Sachs predicts to skyrocket to half a trillion dollars by 2027...
            </p>

            <div className="my-8">
              <img 
                src={goldmanImage}
                alt="Goldman Sachs predicts creator economy could approach half a trillion dollars by 2027"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl mb-6"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>

            <p className="text-gray-800">
              This is the first time in history where regular everyday people can also profit from this gigantic industry...
            </p>

            <p className="text-gray-800">
              But without having to show yourself, be an influencer or create any of the content yourself... even Forbes says that faceless creators are taking over and that it's the future of social media.
            </p>

            <div className="my-8">
              <img 
                src={forbesImage}
                alt="Forbes article about faceless creators taking over social media"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl mb-6"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>

            <p className="text-gray-800">
              And the best part? You can scale this as a real business because your Shadow Pages aren't tied to your face, voice, or persona — meaning you can completely delegate the work to freelancers or leverage A.I. to handle everything for you.
            </p>

            <p className="text-gray-800">
              This allows you to run multiple pages simultaneously (I personally manage 10+ pages) and each one generates me 4-5 figures per month — while traditional creators are stuck building only their persona, which they cannot even sell.
            </p>

            <p className="text-gray-800">
              But with Shadow Pages, you're building real assets that you can sell anytime you'd like. There are dozen of examples of pages that got sold for big million dollar deals — like the meme page @daquan, which Warner Studios acquired for $85M.
            </p>
            
            <div className="my-8">
              <img 
                src={daquanImage}
                alt="Warner Music paid $85 million for the @Daquan meme page"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              />
            </div>

            <h3 className="font-inter font-bold text-xl text-black mt-8 mb-4">What Exactly Are Shadow Pages?</h3>
            
            <p className="text-gray-800">
              Think of Shadow Pages as faceless Instagram brands that are all about a specific niche or topic, not a person. The page itself is the brand, which is why you can completely automate it & scale easily.
            </p>

            <p className="text-gray-800">
              You most likely already came across a bunch of them or even follow them — pages like @wealth, @pubity or @gymfailnation.
            </p>

            <div className="my-8">
              <img 
                src={shadowPagesExamplesImage}
                alt="Examples of Shadow Pages: @wealth, @pubity, and @gymfailnation Instagram profiles"
                className="w-full max-w-4xl mx-auto rounded-lg"
              />
            </div>

            <p className="text-gray-800">
              All you have to do is post faceless content around a specific niche, that you can delegate to cheap freelancers abroad or leverage A.I. tools to do it all for you... (we provide that to our students)
            </p>

            <p className="text-gray-800">
              This allows you to completely automate your page while keeping 90-95% profit margins since most freelancers are from developing countries and A.I. tools are becoming cheaper every day.
            </p>

            <p className="text-gray-800">
              But how can you exactly generate cashflow you might ask?
            </p>

            <h3 className="font-inter font-bold text-xl text-black mt-8 mb-4">Here Are My Top 5 Proven Monetization Methods:</h3>
            
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

            <h3 className="font-inter font-bold text-xl text-black mt-8 mb-4">Here's My Exact A To Z Process:</h3>
            
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
                <p className="text-gray-700">As mentioned earlier, you can delegate content creation to cheap freelancers abroad or leverage A.I. tools to create everything for you - this allows you to completely automate your page while maintaining high profit margins.</p>
              </div>
            </div>

            <h3 className="font-inter font-bold text-xl text-black mt-8 mb-4">But who am I? Here's a quick intro about me:</h3>
            
            <p className="text-gray-800">
              Hey I'm Eric - I'm not some overnight success story. I'm just a normal guy that didn't want to go the traditional route, but wanted to become an entrepreneur. I like having my own freedom and always did, which is why I began searching for ways to add an extra income stream.
            </p>

            <p className="text-gray-800">
              When I stumbled across Shadow Pages a couple years ago, everything changed. Since then I've been able to fully focus on this business, work with large companies, run more than 10+ Shadow Pages and generate multiple 5-figures per month.
            </p>

            <p className="text-gray-800">
              Some of my pages even have close to 500K followers like @glowupacademyy or @boysglowup. But what I'm more proud of is helping everyday people add an extra income stream with Shadow Pages.
            </p>

            <div style={{ marginTop: '-8px', marginBottom: '-8px' }}>
              <img 
                src={instagramProfilesImage}
                alt="Instagram profiles of @boysglowup and @glowupacademyy showing follower counts"
                className="w-full max-w-4xl mx-auto rounded-lg"
              />
            </div>

            <p className="text-gray-800">
              Now we've grown our community to more than 800+ people, where we help each other grow and generate cashflow with Shadow Pages.
            </p>

            <h4 className="font-inter font-bold text-lg text-black mt-8 mb-4">Here's what my students have to say:</h4>

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

            <p className="text-gray-800 mt-8 mb-4">
              If you'd like to learn more how we can help you get started with Shadow Pages - click the button below to book a call with my head coach 👇🏼
            </p>

            <div className="text-center mb-6">
              <button 
                className="w-full md:w-auto px-8 py-6 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(to bottom, #385DC6, #2C4A9E)'
                }}
                onClick={() => window.open('https://www.shadowpages.io/apply-1', '_blank')}
              >
                <span className="text-2xl font-bold mb-1">Click Here To Apply</span>
                <span className="text-sm font-normal opacity-90">Fill in a 2min quiz to see if this is for you</span>
              </button>
            </div>

            <p className="text-gray-800 mb-8">
              Or message me @erichustls on Instagram with "Book a call"<br />
              <span className="text-sm text-gray-600">(no spam please, only if you're serious)</span>
            </p>

            <h3 className="font-inter font-bold text-xl text-black mt-8 mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">Can anyone do this?</h4>
                <p className="text-gray-700">Yes. You don't need tech skills, a following, or experience. If you can follow steps and put in consistent effort, you can build and grow a Shadow Page using proven systems.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">Can I do this next to my job?</h4>
                <p className="text-gray-700">Absolutely. Most people start while working full time. Once it's set up, the system can run in under 30 minutes a day or even less with automation.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">How long to see results?</h4>
                <p className="text-gray-700">Most see income within 1-3 months. With consistent effort, $3k-$10k/month is realistic by month six.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">Do I need experience?</h4>
                <p className="text-gray-700">Nope. Beginners do well with the right system. No personal brand or design skills required.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">How much time does it take?</h4>
                <p className="text-gray-700">Start with 1-2 hours/day. After automation, many manage their page in under 60 minutes a day.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">Can I automate everything?</h4>
                <p className="text-gray-700">Yes. You can automate content creation, scheduling, engagement, and even monetization systems using templates, AI, and a virtual assistant.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">What niches work best?</h4>
                <p className="text-gray-700">High-performing ones include: Mindset & motivation, Business & money, Relationships, Fitness & health. We help you choose based on what works now.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">Do I need to show my face?</h4>
                <p className="text-gray-700">No. Shadow Pages are fully faceless. You stay anonymous while building a profitable digital asset.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">What if I'm not creative?</h4>
                <p className="text-gray-700">You get plug-and-play content templates, prompts, and scripts. No design background needed.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">How do I scale past $1k/month?</h4>
                <p className="text-gray-700">You stack income streams: digital products, affiliate links, multiple pages, or high-ticket offers. Most students scale with simple systems, not extra hours.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">How much do you make per Shadow Page?</h4>
                <p className="text-gray-700">Depends on the page. Some pages make $5K/mo others $10K/mo. I know Shadow Pages generating way more but I like to keep it realistic. Just look at my student @dbfitstyle - he was able to make $36K in a single month with his Shadow Page, so it has a lot of potential.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">Can I do it from anywhere in the world?</h4>
                <p className="text-gray-700">Yes that's why it's so great. You have an income stream generating you cash flow while you can travel the world, spend more time with your loved ones and have true freedom. I've got students traveling all around the globe from Asia to South America and enjoy their location freedom entirely.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">I'm not technically gifted, can I do it?</h4>
                <p className="text-gray-700">Yes 100%, you can do it without any prior experience and you don't have to be technically skilled at all. You won't have to set up a product. You won't have to code. All you need is Instagram and the proper knowledge + guidance.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">I'm 35+ and working a full time job, do you think I can do it?</h4>
                <p className="text-gray-700">Yes 100%, most of my students started their Shadow Page next to their 9-5 job. My student Dino @dbfitstyle was in his thirties working a miserable job as a restaurant manager and was able to make $36,000 in a single month with his Shadow Page since working with us and quit his job. So yes you can 100% do it next to your job.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">How many Shadow Pages do you have?</h4>
                <p className="text-gray-700">Over 10+ pages. I know quite a lot, but the fun part is I'm not working at all on most of them.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">How do you manage it? I am not sure if I have enough time for Shadow Pages</h4>
                <p className="text-gray-700">You can completely automate your page so you don't have to work on it. I spend less than 5min on my pages and they're generating me cashflow every single day just because I was able to automate them. Now they're real passive income streams.</p>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
  );
}