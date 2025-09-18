import StickyCTA from '@/components/sticky-cta';

import { Link } from 'wouter';

export default function Home() {
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
            How I Made $7.18M With Under 7 Clients
          </h1>
          
          <h2 className="headline-secondary mb-6">
            See how I get <strong>$30k to $150k per month from each client</strong> by selling leads. I started with $0 and run it almost alone. No office.
          </h2>
          
          <p className="text-gray-600 text-base mb-8 author-mobile" style={{ textAlign: 'center' }}>
            Written by <a href="#" className="text-blue-600 hover:underline">Eric Cole</a>{' '}
            <span className="text-gray-500">(Entrepreneur & Instagram Mastermind)</span>
          </p>
        </div>

        {/* Lifestyle Images - Wide Container */}
        <div className="container-wide mobile-section images-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-mobile">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Emirates First Class airplane interior" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">Emirates First Class</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Dubai luxury apartment 5 star hotel night" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">Apartment in 5* hotel in Dubai</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Ferrari SF90 steering wheel interior" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">Ferrari SF90</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern penthouse Prague architecture" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">Penthouse in Prague</p>
            </div>
          </div>
          
          <p className="text-center text-sm italic text-gray-500 mt-6 max-w-2xl mx-auto proof-disclaimer-mobile">
            *I would prefer not to share these pictures (I don't even have an Instagram), but I feel it's needed as{' '}
            <strong>proof that I have something that worked for me,</strong> allowing me to do the things I want and like.
          </p>
        </div>

        {/* Business Results Dashboard - Narrow Container */}
        <div className="container-narrow mb-12 mobile-section">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
            alt="Business dashboard results screenshot" 
            className="w-full rounded-lg shadow-lg my-8"
          />
        </div>

        {/* Statistics Section - Narrow Container */}
        <div className="container-narrow mb-12 mobile-section">
          <div className="flex justify-between items-start stats-mobile">
            <div className="text-left">
              <div className="text-stats mb-1">$52.2k</div>
              <div className="text-sm text-gray-600">avg <strong>monthly</strong> <strong>revenue per client</strong></div>
            </div>
            <div className="text-left">
              <div className="text-stats mb-1">18.5 months</div>
              <div className="text-sm text-gray-600">average <strong>client retention</strong></div>
            </div>
            <div className="text-left">
              <div className="text-stats mb-1">133,000+</div>
              <div className="text-sm text-gray-600"><strong>leads</strong> generated</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content - Narrow Container */}
      <div className="container-narrow" style={{ marginTop: '50px' }}>
        <div className="prose prose-lg max-w-none text-content">
          <p className="text-gray-800 mb-6">
            Over the past 2-3 years I've <strong>generated over 133,000 leads.</strong>
          </p>

          {/* Software Interface Screenshots */}
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Leadshook software interface" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Heylow platform interface" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <p className="text-gray-800 mb-6">
            I've sold each of these leads for <strong>$30-$250</strong> (depending on vertical).
          </p>

          <p className="text-gray-800 mb-6">
            No products, software, or services, nothing...
          </p>

          <p className="text-gray-800 mb-6">
            If you do the math you will realize that's a couple of million :)
          </p>

          <h3 className="font-inter font-black text-xl text-black mb-4">
            <em>Here are examples of invoices to our clients: (each is for a single month's worth of leads)</em>
          </h3>

          {/* QuickBooks Invoice Screenshot */}
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
              alt="Quickbooks invoice screenshot" 
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-500 mt-2">Source: Quickbooks</p>
          </div>

          <p className="text-gray-800 mb-6">
            I did this at 23-24y.o with <strong>0 employees or contractors — until I was making more than $2.1M a year.</strong>
          </p>

          <p className="text-gray-800 mb-6">
            I started hiring after I was already at multi-7-figure revenue. No labor expense risk.
          </p>

          <p className="text-gray-800 mb-8">
            <strong>In this doc, I want to share what I did step by step.</strong>
          </p>

          <h2 className="font-inter font-black text-2xl text-black mb-4">
            <strong>Why am I sharing this?</strong>
          </h2>

          <p className="text-gray-800 mb-4 italic">
            <em>My company <strong>received an acquisition offer</strong>, so I am thinking on what to do next if we move forward with that.</em>
          </p>

          <p className="text-gray-800 mb-4 italic">
            <em>Secondly, <strong>this business literally changed my life</strong> from wanting to make $2k/m when I was at high school — to becoming a <strong>multi-millionaire before I turned 25.</strong></em>
          </p>

          <p className="text-gray-800 mb-8 italic">
            <em>If sharing this can do the same for a dozen other people, it's worth sharing.</em>
          </p>

          <h2 className="font-inter font-black text-2xl text-black mb-4">
            <strong>My background</strong>
          </h2>

          <div className="mb-6">
            <p className="text-gray-800 mb-2">▶︎ Started first business as 16-17y.o</p>
            <p className="text-gray-800 mb-2">▶︎ Sold app at 19y.o</p>
            <p className="text-gray-800 mb-4">▶︎ Studied Alternative Investments at <strong>Harvard Business School</strong> online</p>
            <p className="text-gray-600 mb-4 italic text-sm">
              <em>(Private Equity, Private Debt, Distress Investing, Secondaries, Hedge Funds, Real Estate, Portfolio Construction)</em>
            </p>
            <p className="text-gray-800 mb-4">▶︎ Joined a $100m VC fund → where I invested in a couple of startups (valued at <strong>$1.1 billion</strong>)</p>
            <p className="text-gray-800 mb-4">▶︎ Started lead gen brands in financial services and legal at 20y.o - <strong>grew to multi-7 figures</strong></p>
            <p className="text-gray-800 mb-4">▶︎ I run marketing newsletter just for fun: <a href="#" className="text-blue-600 hover:underline">insider.marketing case studies</a></p>
          </div>

          <div className="flex justify-center mb-8">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
              alt="Eric Cole"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <h1 className="font-inter font-black text-4xl text-black mb-6">
            1) Find a large, nationwide and well-capitalized market
          </h1>

          <p className="text-gray-800 mb-6">
            This is one of the most important decisions you can make when starting a business.
          </p>

          <p className="text-gray-800 mb-6">
            <strong>The market is more important</strong> than the product or service you sell.
          </p>

          <p className="text-gray-800 mb-6">
            To be able to generate tens of thousands of leads every year, you have to be in the market with that <strong>scale & potential.</strong>
          </p>

          <p className="text-gray-800 mb-6">
            Best markets have products/services that are applicable to almost every human being <em>(e.g. financial services, loans, home improvement, education, real estate, debt, health, and more)</em>
          </p>

          <p className="text-gray-800 mb-6">
            If you just capture 0.1% of one of these markets you will likely have a <strong>$50M+</strong> company.
          </p>

          <p className="text-gray-800 mb-8">
            Where most people fail with this, is they select local market, with clients that are not well capitalized & don't have operations for scale. <em>(e.g. typical SMMA niches 🫠)</em>
          </p>

          <h2 className="font-inter font-black text-2xl text-black mb-4">
            <em>Example of bad & good market for generating leads at scale:</em>
          </h2>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-red-600 mb-3">❌ Bad Markets</h4>
                <ul className="text-sm space-y-1">
                  <li>• Local restaurants</li>
                  <li>• Small gyms</li>
                  <li>• Local dentists</li>
                  <li>• Hair salons</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-600 mb-3">✅ Good Markets</h4>
                <ul className="text-sm space-y-1">
                  <li>• Financial services</li>
                  <li>• Home improvement</li>
                  <li>• Insurance</li>
                  <li>• Legal services</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-800 mb-8">
            The great thing is that this <strong>works in almost any country.</strong> And most, don't have any real competition.
          </p>

          <h1 className="font-inter font-black text-4xl text-black mb-6">
            2) Get 2-3 Lead Buyers
          </h1>

          <p className="text-gray-800 mb-6">
            Once we have the scalable market we find companies in this vertical that will buy the leads.
          </p>

          <p className="text-gray-800 mb-4">
            <strong>You can sell to 2 types of companies:</strong>
          </p>

          <p className="text-gray-800 mb-4">
            <strong>1. Direct lead buyers</strong> <em>(the company that is buying leads and also selling the product)</em>
          </p>
          <p className="text-gray-800 mb-6">
            Higher margin and you can sell the leads for more
          </p>

          <p className="text-gray-800 mb-4">
            <strong>2. Networks or lead aggregators</strong> <em>(middlemen who buy leads, clicks, or calls from you → then resell it to their buyers)</em>
          </p>
          <p className="text-gray-800 mb-8">
            Easier to get started to work with, but lower payouts
          </p>

          <p className="text-gray-800 mb-6">
            <strong>I have a rolodex of contacts that I can share</strong> to <strong>speed up the process</strong> for you.
          </p>

          <p className="text-gray-800 mb-8">
            Alternatively, it's easy to get lead buyers with ads. Every time I run ads for my company to get lead buyers, <strong>I get a calendar filled with appointments for a full week</strong> with just 1 day of ads. <em>Typically it costs me about $20-$40 per call.</em>
          </p>

          <h2 className="font-inter font-black text-2xl text-black mb-4">
            How much revenue do I typically generate per client?
          </h2>

          <p className="text-gray-800 mb-6">
            Let's assume you will charge $30 per lead. Lead buyers come and tells you they want 3,000 leads per month (or 100 leads per day) — that's <strong>$90k in revenue from just a single client. Per month.</strong>
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h4 className="font-bold text-center mb-4">Example of Revenue per client per month</h4>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$90,000</div>
              <div className="text-sm text-gray-600">3,000 leads × $30 = $90k/month from 1 client</div>
            </div>
          </div>

          <p className="text-gray-800 mb-6">
            I have lead buyers who are <strong>buying 300-450 leads per day at that price :)</strong> It scales pretty fast.
          </p>

          <p className="text-gray-800 mb-8">
            + me as an introvert who hates doing calls - is selling $100k+ monthly budgets.
          </p>

          <p className="text-gray-800 mb-8 italic text-center">
            <em>And flying first class wherever I want...</em>
          </p>

          <h1 className="font-inter font-black text-4xl text-black mb-6">
            3) Send them leads. Get the order again. Repeat.
          </h1>

          <p className="text-gray-800 mb-6">
            Now you have lead buyers that want leads. <strong>You need to deliver.</strong>
          </p>

          <p className="text-gray-800 mb-6">
            As you're not selling any product or services, just leads or calls, it's relatively simple.
          </p>

          <p className="text-gray-800 mb-6">
            If you already have a brand <em>(step 4)</em>, you just connect them to your existing lead distribution software. <em>(setup takes 2-3hrs)</em>
          </p>

          <p className="text-gray-800 mb-8">
            If you don't have a brand yet, you will create a <strong>simple lead generation funnel</strong> — can be done in ~1 day + I can show you what works best.
          </p>

          <h2 className="font-inter font-black text-xl text-black mb-4">
            The key is the QUALITY of the lead.
          </h2>

          <p className="text-gray-800 mb-6">
            If you send them <strong>qualified and high-quality leads</strong>— they will <strong>reorder over and over again.</strong>
          </p>

          <p className="text-gray-800 mb-6">
            (+ you can charge them more. Even <strong>+$5</strong> per lead at <strong>3,000 leads</strong> a month is an additional <strong>$15k in profits</strong>)
          </p>

          <p className="text-gray-800 mb-8">
            You can have the same 4-5 clients and be <strong>generating millions.</strong> No need for constant prospecting and sales — that's basically <strong>how I got to $2.1M with 0 staff.</strong>
          </p>

          <h1 className="font-inter font-black text-4xl text-black mb-6">
            Does this really work?
          </h1>

          <p className="text-gray-800 mb-6">
            I'm the case study. This is how what <strong>made me a multi-millionaire before 25</strong>. Not selling some courses.
          </p>

          <h2 className="font-inter font-black text-2xl text-black mb-4">
            <strong>Here are some companies that follow the same business model</strong>
          </h2>

          <p className="text-gray-800 mb-8 italic">
            <em>Consumer facing brand → generate leads → sell leads to partners</em>
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-inter font-black text-xl text-black mb-4">Revenue Examples:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 text-gray-800">
                  <li>• <strong>NerdWallet:</strong> $539M/year</li>
                  <li>• <strong>LendingTree:</strong> $673M/year</li>
                  <li>• <strong>GoCompare:</strong> $793M acquisition</li>
                  <li>• <strong>EverQuote:</strong> $269M/year</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-gray-800">
                  <li>• <strong>MoneySuperMarket:</strong> £432M/year</li>
                  <li>• <strong>CreditKarma:</strong> $1.6B/year</li>
                  <li>• <strong>SelectQuote:</strong> ~$1.25B/year</li>
                  <li>• <strong>AssuranceIQ:</strong> $2.35B acquisition</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-gray-800 mb-8">
            <strong>+ there are many more</strong> that I haven't included
          </p>

          <h1 className="font-inter font-black text-4xl text-black mb-6">
            Ok but what if you don't have that much experience in marketing...
          </h1>

          <p className="text-gray-800 mb-6">
            I've helped my old friend who never generated leads before → Got <strong>$34.5k in his first month</strong> (from 1 client)
          </p>

          <p className="text-gray-800 mb-8">
            <strong>Selling 150 leads at $230 each.</strong>
          </p>


        </div>
      </div>


    </div>
  );
}
