import StickyCTA from '@/components/sticky-cta';

import { Link } from 'wouter';

export default function SocialMediaMastery() {
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
            How I Built a 2.8M Follower Instagram in 18 Months
          </h1>
          
          <h2 className="headline-secondary mb-6">
            See how I gained <strong>155,000+ followers per month</strong> using organic content strategies. No paid ads, no bots, just authentic engagement.
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
                src="https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Instagram analytics dashboard" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">2.8M followers analytics</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1621479072288-6a4c2b0c2ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Viral Instagram post with millions of views" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">8.2M views on single post</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Instagram growth chart showing exponential increase" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">Growth from 12K to 2.8M</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Content creation setup with camera and lighting" 
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-gray-600">Content creation setup</p>
            </div>
          </div>
        </div>

        {/* Main Content - Story Section */}
        <div className="container-narrow body-content" style={{ marginTop: '50px' }}>
          <p className="text-lg text-gray-700 mb-6">
            18 months ago, I had 12,000 followers and was struggling to get even 100 likes per post.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Today, my content reaches over 50 million people per month, and I've built a community of 2.8 million engaged followers who trust my recommendations.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            But here's what most people don't know: I didn't spend a single dollar on ads or use any growth hacks. Everything I did was 100% organic using a specific content formula I discovered.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            Here's what happened when I implemented my content strategy:
          </p>
          
          <ul className="mb-8 space-y-3">
            <li className="text-lg text-gray-700">
              • Went from 200 likes per post to averaging 150,000+ likes
            </li>
            <li className="text-lg text-gray-700">
              • Generated over $500K in revenue from brand partnerships alone
            </li>
            <li className="text-lg text-gray-700">
              • Built an email list of 180,000 subscribers from Instagram traffic
            </li>
            <li className="text-lg text-gray-700">
              • Created multiple six-figure income streams through my audience
            </li>
          </ul>

          <p className="text-lg text-gray-700 mb-6">
            The 3-Pillar Content System I Used
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            <strong>Pillar 1: The Hook Formula</strong><br />
            A specific way to write the first line of every post that guarantees people will stop scrolling. This single technique increased my engagement by 340%.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            <strong>Pillar 2: The Value Stack Method</strong><br />
            How to pack maximum value into every post while keeping it entertaining. This is why my followers share my content 10x more than average.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            <strong>Pillar 3: The Engagement Loop</strong><br />
            A psychological trigger that makes people feel compelled to comment, share, and follow. This created my viral moments.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            But it wasn't always like this...
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Two years ago, I was posting consistently for months with barely any growth. I tried every growth hack, followed every guru's advice, and even considered buying followers (I'm glad I didn't).
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            The breakthrough came when I realized that everyone was focused on the wrong metrics. They were chasing followers instead of building genuine connections.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Once I shifted my entire approach to focus on authentic value and real relationships, everything changed. The followers, the engagement, the opportunities - they all followed naturally.
          </p>
        </div>
      </div>


    </div>
  );
}