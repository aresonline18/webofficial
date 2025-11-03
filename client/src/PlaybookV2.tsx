import StickyCTA from '@/components/StickyCTA';
import SEOHead from '@/components/SEOHead';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ResourceApplyNowButton from '@/components/ResourceApplyNowButton';
import { useUrlParams } from '@/hooks/useUrlParams';
import forbesImage from '@/assets/forbes.png';
import daquanImage from '@/assets/daquan.png';
import goldmanImage from '@/assets/goldman-sachs.png';
import shadowPagesExamplesImage from '@/assets/shadow-page-examples.png';
import instagramProfilesImage from '@/assets/eric-pages.png';
import ericRevenueImage from '@/assets/eric-revenue-chart.png';
import glowupAcademyProfile from '@/assets/glowup-academy-profile.png';
import boysGlowupProfile from '@/assets/boys-glowup-profile.png';
import dinoStatsImage from '@/assets/dino-stats.png';
import amelieProfileImage from '@/assets/amelie-profile-new.png';
import jeppeNewImage from '@/assets/jeppe-new.svg';
import studentPhotoImage from '@/assets/student-photo.png';
import ericFollowersImage from '@/assets/eric-followers.png';

export default function PlaybookV2() {
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
        canonical={`${window.location.origin}/free-resources/shadow-pages-playbook-v2`}
        contentType="faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": ["WebPage", "FAQPage", "Guide"],
          "name": "Shadow Pages Playbook - Complete Guide",
          "description": "Complete step-by-step guide to start, run and profit from Shadow Pages",
          "url": `${window.location.origin}/free-resources/shadow-pages-playbook-v2`,
          "author": {
            "@type": "Person",
            "name": "Eric Cole",
            "description": "Entrepreneur & Social Media Mastermind"
          }
        }}
      />
      <StickyCTA />
      {/* Brand Color Top Line */}
      <div style={{ height: '5px', backgroundColor: '#385dc7' }}></div>
      {/* Hero Section */}
      <div>
        {/* Logo Section - All Devices */}
        <div className="container mx-auto px-4" style={{ paddingTop: '-2px', marginBottom: '0px' }}>
          <div className="text-center">
            <img 
              src="https://www.shadowpages.io/hosted/images/90/f5c60bcb03444b83789f63decc55f4/Shadow-Pages-White-Logo.png"
              alt="The Shadow Pages Playbook"
              className="max-h-[90px] max-w-[90px] md:h-32 md:max-h-32 md:w-auto mx-auto object-contain"
            />
          </div>
        </div>

        {/* Headline and Author Info - Following exact style guide */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black text-center mb-6 md:mb-8 leading-tight">
            The Shadow Pages <span className="font-ivypresto italic text-[52px] md:text-[76px] block -mt-[13px]" style={{ color: '#385dc7', fontWeight: '500' }}>Playbook<sup className="text-[12px] md:text-[16px] -top-6 md:-top-9">™</sup></span>
          </h1>
          
          <h2 className="text-xl md:text-3xl text-center mb-6 md:mb-8 max-w-5xl mx-auto leading-[1.3]">
            Everything <strong>YOU</strong> need to know about how Shadow Pages work and how you can generate cashflow from them...
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg mb-8 text-center">
            Written by <a href="#" className="text-blue-600 hover:underline">Eric Cole</a>{' '}
            <span className="text-gray-500">(Entrepreneur & Social Media Mastermind)</span>
          </p>
        </div>

        {/* Main Content - Following exact style guide */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-gray-800">
              In the last 5-10 years a new wave of millionaires hit… Social media has created more millionaires in the last few years than anything else.
            </p>

            <p className="text-gray-800">
              With platforms like Instagram, TikTok and YouTube on the rise, normal people could start uploading content, get viewers and get paid.
            </p>

            <p className="text-gray-800">
              <strong>But there was a problem:</strong> you had to show yourself, lose all your privacy, and spend countless hours creating content.
            </p>

            <p className="text-gray-800">
              Now a new era has begun, where faceless <strong>social media brands are taking over.</strong> With Shadow Pages you can profit off social media the same way all these influencers do, but without having to show yourself, be an influencer or create any of the content yourself...
            </p>

            <p className="text-gray-800">
              <strong>This is the first time in history</strong> where regular everyday people can leverage social media platforms to generate cashflow and take advantage of the booming creator economy that Goldman Sachs predicts to skyrocket to <strong>half a trillion dollars by 2027:</strong>
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
              And it&apos;s not only Goldman Sachs...
            </p>

            <p className="text-gray-800">
              <strong>Even Forbes says</strong> that faceless creators are taking over and that it&apos;s the future of social media:
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
              And the best part? You can scale this as a real business because your Shadow Pages aren&apos;t tied to your face, voice, or persona — <strong>meaning YOU can completely automate everything with A.I...</strong>
            </p>

            <p className="text-gray-800">
              This allows you to run multiple pages simultaneously (I personally manage 10+ pages) and each one generates me 4-5 figures per month — while traditional creators are stuck building only their persona, which they cannot even sell.
            </p>

            <p className="text-gray-800">
              <strong>But with Shadow Pages,</strong> you&apos;re building real assets that you can sell anytime you&apos;d like. There are dozens of examples of pages that got sold for big million dollar deals, like the meme page <strong>@Daquan,</strong> <strong>which Warner Studios acquired for $85M.</strong>
            </p>
            
            <div className="my-8 md:my-12">
              <img 
                src={daquanImage}
                alt="Warner Music paid $85 m