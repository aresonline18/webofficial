import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import ResourceCard from "@/components/ResourceCard";
import { type Resource } from "@shared/schema";

function StaticHomeComplete() {
  // Get resources from database API
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
    refetchInterval: 10000, // Refetch every 10 seconds to ensure fresh data
  });

  const handleHomePageApply = () => {
    // Get tracked resources for UTM campaign
    const trackedResources = JSON.parse(localStorage.getItem("trackedResources") || "[]");
    const lastResource = trackedResources.length > 0 ? trackedResources[trackedResources.length - 1] : "no-resource-read";
    
    // Create UTM campaign from last read resource
    const resourceSlug = lastResource === "no-resource-read" ? "no-resource-read" : lastResource
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
    
    // Build URL with home-page UTM source
    const url = `https://shadowpages.typeform.com/dms-overall?utm_source=home-page&utm_campaign=${resourceSlug}&utm_medium=EricHustls`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    // Set page title and meta
    document.title = 'Shadow Pages – Build Faceless Instagram Brands & Generate Passive Income';
    
    // Add meta tags
    const metaTags = [
      { property: 'og:title', content: 'Shadow Pages – Build Faceless Instagram Brands & Generate Passive Income' },
      { property: 'og:description', content: 'Learn how to build faceless Instagram brands and earn passive income online. Start your journey today.' },
      { property: 'og:image', content: 'https://start.shadowpages.io/public/PREVIEW.png' },
      { property: 'og:url', content: 'https://start.shadowpages.io' },
      { property: 'og:type', content: 'website' },
      { name: 'description', content: 'Learn how to build faceless Instagram brands and generate passive income using the Shadow Pages system. Perfect for creators, beginners, and digital rebels looking to earn online without showing their face.' }
    ];

    const addedMetas: HTMLMetaElement[] = [];
    
    metaTags.forEach(tagData => {
      const meta = document.createElement('meta');
      if (tagData.property) {
        meta.setAttribute('property', tagData.property);
      }
      if (tagData.name) {
        meta.setAttribute('name', tagData.name);
      }
      meta.setAttribute('content', tagData.content);
      document.head.appendChild(meta);
      addedMetas.push(meta);
    });

    // Add canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://start.shadowpages.io/';
    document.head.appendChild(canonical);
    
    // Load external stylesheets and scripts
    const links = [
      { href: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;500;600&display=swap', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap', rel: 'stylesheet' },
      { href: '/assets/styles/responsive.css', rel: 'stylesheet' },
      { href: '/assets/styles/fonts.css', rel: 'stylesheet' },
      { href: '/assets/styles/styles.css', rel: 'stylesheet' }
    ];

    const loadedLinks: HTMLLinkElement[] = [];
    
    links.forEach(linkData => {
      const link = document.createElement('link');
      link.href = linkData.href;
      link.rel = linkData.rel;
      document.head.appendChild(link);
      loadedLinks.push(link);
    });

    // Load Google Tag Manager
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PRN5QJQD');
    `;
    document.head.appendChild(gtmScript);

    // Load header script
    const headerScript = document.createElement('script');
    headerScript.src = '/assets/script/header.js';
    headerScript.defer = true;
    document.head.appendChild(headerScript);

    // Add dynamic font sizing for the Limited Spots button
    const dynamicFontStyle = document.createElement('style');
    dynamicFontStyle.innerHTML = `
      .dynamic-text {
        font-size: clamp(0.75rem, 2.5vw, 1rem) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      
      /* Responsive breakpoints for more precise control */
      @media (max-width: 390px) {
        .dynamic-text {
          font-size: 0.75rem !important;
        }
      }
      
      @media (min-width: 391px) and (max-width: 428px) {
        .dynamic-text {
          font-size: 0.85rem !important;
        }
      }
      
      @media (min-width: 429px) {
        .dynamic-text {
          font-size: 1rem !important;
        }
      }
      
      /* Team heading responsive display */
      .desktop-heading {
        display: block;
      }
      
      .mobile-heading {
        display: none;
        font-size: clamp(1.5rem, 5vw, 2rem) !important;
        line-height: 1.3 !important;
        text-align: left !important;
        white-space: normal !important;
        word-wrap: break-word !important;
        max-width: 100% !important;
      }
      
      .mobile-heading-responsive-color::first-line {
        color: #385dc6 !important;
      }
      
      /* Mobile padding for students section */
      @media (max-width: 767px) {
        .section-students {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        
        .section-students__title {
          font-size: 1.5rem !important;
          padding-top: 10px !important;
        }
        
        .stats-heading-responsive {
          line-height: 1.2 !important;
          font-size: 1.3rem !important;
        }
        
        .shadow-pages-line {
          display: block !important;
          word-wrap: break-word !important;
          max-width: 100% !important;
        }
      }
      
      @media (max-width: 767px) {
        .desktop-heading {
          display: none !important;
        }
        
        .mobile-heading {
          display: block !important;
        }
      }
    `;
    document.head.appendChild(dynamicFontStyle);

    // Add animation script
    const animationScript = document.createElement('script');
    animationScript.innerHTML = `
      (function() {
        const animTargets = [
          { selector: '.hero-content', animation: 'fade-up' },
          { selector: '.team-left', animation: 'slide-left' },
          { selector: '.team-right', animation: 'slide-right' },
          { selector: '.benefits-content', animation: 'fade-up' },
          { selector: '.footer-hero', animation: 'fade-up' },
          { selector: '.testimonials-section', animation: 'fade-up' },
        ];

        const animObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );

        animTargets.forEach(({ selector, animation }) => {
          document.querySelectorAll(selector).forEach((el) => {
            el.classList.add('scroll-animate', animation);
            animObserver.observe(el);
          });
        });
      })();
    `;
    document.head.appendChild(animationScript);

    // Cleanup function
    return () => {
      try {
        loadedLinks.forEach(link => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        });
        addedMetas.forEach(meta => {
          if (document.head.contains(meta)) {
            document.head.removeChild(meta);
          }
        });
        if (document.head.contains(canonical)) {
          document.head.removeChild(canonical);
        }
        if (document.head.contains(gtmScript)) {
          document.head.removeChild(gtmScript);
        }
        if (document.head.contains(headerScript)) {
          document.head.removeChild(headerScript);
        }
        if (document.head.contains(animationScript)) {
          document.head.removeChild(animationScript);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  return (
    <div className="static-home-wrapper">
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-PRN5QJQD"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>
      {/* Hidden SEO text */}
      <div style={{ display: 'none' }}>
        Shadow Pages is the ultimate system for building faceless Instagram
        businesses. Learn to grow faceless brands, monetize anonymous pages, and
        generate passive income with no face or videos required. Our system
        supports Instagram creators, niche pages, automation tools, and low-effort
        income strategies.
      </div>
      {/* Header */}
      <header id="main-header">
        <div className="container">
          <div className="logo">
            <img
              src="/assets/logosp.webp" 
              width="3371" 
              height="1055" 
              loading="lazy"
              alt="Shadow Pages Logo"
              className="logo-img"
            />
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="desktop-nav">
            <a href="/">Start</a>
            <a href="/free-resources/shadow-pages-playbook">Shadow Pages Playbook</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleHomePageApply(); }}>Apply Now</a>
          </nav>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button 
            className="mobile-menu-btn"
            onClick={() => {
              const menu = document.querySelector('.mobile-menu-dropdown');
              menu?.classList.toggle('open');
            }}
          >
            ☰
          </button>
        </div>
      </header>
      {/* Mobile Menu Dropdown - Outside header, drops down below */}
      <div className="mobile-menu-dropdown">
        <nav className="pl-[24px] pr-[24px] pt-[5px] pb-[5px]">
          <a href="/" className="pt-[5px] pb-[5px]">Start</a>
          <a href="/free-resources/shadow-pages-playbook" className="pt-[5px] pb-[5px]">Shadow Pages Playbook</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleHomePageApply(); }} className="pt-[5px] pb-[5px]">Apply Now</a>
        </nav>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Desktop Navigation */
          .desktop-nav {
            display: flex;
            gap: 30px;
          }
          
          .desktop-nav a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
          }
          
          .desktop-nav a:hover {
            color: #d1d5db;
          }
          
          /* Mobile Menu Button - Hidden on desktop */
          .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
          }
          
          /* Mobile Menu Dropdown */
          .mobile-menu-dropdown {
            display: none;
            position: relative;
            background: var(--shadow-navy);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
            left: 0;
            top: 0;
          }
          
          .mobile-menu-dropdown nav {
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 24px 16px 24px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          
          .mobile-menu-dropdown nav a:last-child {
            padding-bottom: 16px;
          }
          
          .mobile-menu-dropdown a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 12px 0;
            transition: color 0.2s;
          }
          
          .mobile-menu-dropdown a:hover {
            color: #d1d5db;
          }
          
          /* Mobile styles */
          @media (max-width: 767px) {
            .desktop-nav {
              display: none !important;
            }
            
            .mobile-menu-btn {
              display: block !important;
            }
            
            .mobile-menu-dropdown.open {
              display: block !important;
            }
          }
        `
      }} />
      {/* Hero Section */}
      <section className="hero pt-[32px] pb-[32px] mt-[17px] mb-[17px]">
        <div className="hero-content">
          <div className="hero-left">
            <button
              className="button-64"
              onClick={() => {
                const trackedResources = JSON.parse(localStorage.getItem('trackedResources') || '[]');
                const lastResource = trackedResources.length > 0 ? trackedResources[trackedResources.length - 1] : 'no-resource-read';
                const resourceSlug = lastResource === 'no-resource-read' ? 'no-resource-read' : lastResource
                  .toLowerCase()
                  .replace(/[^a-z0-9\s]/g, '')
                  .replace(/\s+/g, '-')
                  .substring(0, 50);
                const url = `https://shadowpages.typeform.com/dms-overall?utm_source=home-page&utm_campaign=${resourceSlug}&utm_medium=EricHustls`;
                window.location.href = url;
              }}
            >
              <span className="text dynamic-text" style={{ fontSize: '15px' }}>Limited Spots · Applications Now Open</span>
            </button>

            <h1 style={{ fontWeight: '700' }}>
              Build a reliable passive<br />
              Income source with<br />
              <span className="highlight">Shadow Pages</span>
            </h1>

            <a
              href="#" 
              onClick={(e) => { e.preventDefault(); handleHomePageApply(); }}
              className="cssbuttons-io-button"
            >
              Apply Now
              <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </a>

            <ul className="feature-list">
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                </svg>
                Personalized Coaching
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                </svg>
                Weekly 1/1 Live Calls
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                </svg>
                24/7 V.I.P. Support
              </li>
            </ul>

            <img src="/assets/artboard.webp" width="5082" height="702" loading="lazy" alt="artboard" className="glow-image" />
          </div>

          <div className="hero-right">
            <img src="/assets/eric.webp" width="1080" height="1350" loading="lazy" alt="Eric" className="hero-photo" />
          </div>
        </div>
      </section>
      {/* Neumorphic Section */}
      <section className="neumorphic-section">
        <div className="neumorphic-container">
          <div className="neumorphic-left">
            <h2>
              <span className="muted">Leverage the new way to</span><br />
              <span className="accent">generate passive income.</span><br />
              Embrace the <strong>Shadow Pages System.</strong>
            </h2>
            <div className="mobile-heading">
              <span className="mobile-highlight">Lower Effort, Higher Leverage</span><br />
              Embrace Shadow Pages
            </div>
            <p>
              Our system is built to simplify passive income, eliminate overwhelm,
              and unlock freedom. We show everyday people how to build faceless
              Instagram brands that generate income — without showing their face
              or making videos themselves.
            </p>
          </div>

          <div className="neumorphic-grid">
            {/* Card 1 */}
            <div className="neu-card">
              <div className="neu-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C7 2 3 6 3 11c0 4 2 5.5 3 6v1.5c0 .8.7 1.5 1.5 1.5h2v-3h4v3h2c.8 0 1.5-.7 1.5-1.5V17c1-.5 3-2 3-6 0-5-4-9-9-9z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>
                <span className="desktop-text">Our Framework</span>
                <span className="mobile-text">Our Shadow Pages Framework</span>
              </h3>
              <p>Built on bulletproof strategies tested and perfected for years</p>
            </div>

            {/* Card 2 */}
            <div className="neu-card">
              <div className="neu-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V20h14v-3.5C17 14.2 12.3 13 10 13zm8 0c-.3 0-.7 0-1 .1 1.2.8 2 2 2 3.4V20h5v-3.5c0-2.3-4.7-3.5-6-3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>Personalized For YOU</h3>
              <p>Our team provides tailored 1/1 coaching for you and your needs.</p>
            </div>

            {/* Card 3 */}
            <div className="neu-card">
              <div className="neu-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h16v2H4V4zm0 4h10v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3>
                <span className="desktop-text">Complete System</span>
                <span className="mobile-text">Complete System Access</span>
              </h3>
              <p>Gain access to our systems and hours long step-by-step trainings</p>
            </div>

            {/* Card 4 */}
            <div className="neu-card">
              <div className="neu-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor" />
                </svg>
              </div>
              <h3>Fastrack Results</h3>
              <p>Leverage our tools and crush it in no time with Shadow Pages.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-overlay-glow"></div>

        <div className="stats-header">
          <h2 className="stats-heading-responsive" style={{ fontWeight: '700' }}>
            About us - Our Mission.
          </h2>
          <p>
            We at Shadow Pages help everyday people generate cash flow from simple faceless instagram brands called Shadow Pages by leveraging automated A.I. systems that handle all the work on autopilot.
          </p>
          <p>
            In order for our students to succeed we provide all our resources, A.I. systems and we're custom tailoring our coaching providing 1/1 guidance & support ensuring all our students win.
          </p>
        </div>

        <div className="stats-map-container">
          <img src="/assets/map.webp" width="3000" height="1858" loading="lazy" alt="World Map" className="stats-map-img" />
        </div>

        <div className="stats-cards">
          <div className="stats-card">
            <h3>750<span className="plus">+</span></h3>
            <p>Active Students</p>
          </div>
          <div className="stats-card">
            <h3>80<span className="plus">+</span></h3>
            <p>Countries</p>
          </div>
          <div className="stats-card">
            <h3>$10M<span className="plus">+</span></h3>
            <p>Revenue Generated</p>
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="resources-section" style={{ 
        padding: '80px 0',
        background: 'var(--shadow-navy)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 93, 198, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: '1'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'white',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              Shadow Pages Resources to Get You Started
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Access our exclusive collection of guides, tools, and resources designed to help you build successful Shadow Pages
            </p>
          </div>

          {/* Dynamic Resource Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignItems: 'center'
          }}>
            {isLoading ? (
              <div style={{ color: 'white', fontSize: '1.1rem', padding: '40px' }}>
                Loading resources...
              </div>
            ) : (
              resources.map((resource) => (
                <div key={resource.id} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  maxWidth: '900px',
                  width: '100%',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }} className="resource-card-hover">
                  <ResourceCard
                    imageUrl={resource.imageUrl}
                    imageAlt={resource.imageAlt || resource.title}
                    title={resource.title}
                    description={resource.description}
                    buttonText={resource.buttonText}
                    buttonUrl={resource.buttonUrl}
                    buttonColor={resource.buttonColor as "red" | "blue" || "blue"}
                    resourceId={resource.resourceId}
                  />
                </div>
              ))
            )}
          </div>

          {/* View All Resources Link */}
          <div style={{
            textAlign: 'center',
            marginTop: '50px'
          }}>
            <a 
              href="/free-resources"
              style={{
                display: 'inline-block',
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '12px 24px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '30px',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              className="view-all-resources-btn"
            >
              View All Shadow Pages Resources →
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-left">
            <div className="team-heading">
              {/* Desktop heading - hidden on mobile */}
              <h2 className="desktop-heading" style={{ 
                fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)', 
                lineHeight: '1.3',
                maxWidth: '100%',
                wordWrap: 'break-word',
                hyphens: 'auto'
              }}>
                <span className="highlighted">Have the opportunity to talk</span><br />
                with the <strong>Shadow Pages Team</strong>
              </h2>
              {/* Mobile heading - hidden on desktop */}
              <h2 className="mobile-heading mobile-heading-responsive-color">
                Have the opportunity to talk with the Shadow Pages team
              </h2>
            </div>

            <p>
              We'll provide all the resources, guidance and support for you to learn at your own pace and make your success inevitable. Apply with the button below to book a call with our team.
            </p>

            <ul className="team-features">
              <li>
                <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#385dc6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Leverage proven systems and bulletproof strategies
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#385dc6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Master the art of building passive, reliable income from social media without having to show your face or have any prior experience
              </li>
            </ul>

            <a href="#" onClick={(e) => { e.preventDefault(); handleHomePageApply(); }} className="team-cta">Learn more →</a>
          </div>

          <div className="team-right">
            <img
              src="/assets/worker1.webp" width="2430" height="3038" loading="lazy"
              alt="Team Member 2"
              className="team-photo-secondary"
            />
          </div>
        </div>
      </section>
      {/* Feature Pills Section */}
      <section className="feature-pill-section">
        <div className="feature-pill-container">
          <div className="pill-feature">
            <img
              src="/assets/strategy.svg" loading="lazy"
              alt="Strategy Icon"
              className="pill-icon"
            />
            <span>Proven System</span>
          </div>
          <div className="pill-feature">
            <img
              src="/assets/community.svg" loading="lazy"
              alt="Community Icon"
              className="pill-icon"
            />
            <span>1/1 Personalized Coaching</span>
          </div>
          <div className="pill-feature">
            <img
              src="/assets/flexible.svg" loading="lazy"
              alt="Flexible Icon"
              className="pill-icon"
            />
            <span>24/7 Support</span>
          </div>
        </div>
      </section>
      {/* Reviews Section */}
      <section className="review-section">
        <div className="review-header">
          <h2>
            <span className="desktop-text">Real results, real feedback.</span>
            <span className="mobile-text">Real results, real feedback.</span>
          </h2>
          <p>
            Read why hundreds of students like Shadow Pages and how it impacted their lifes
          </p>
        </div>

        <div className="reviews-grid">
          {/* Card 1 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>My side income now outpaces my salary</h3>
            <p>
              I joined Shadow Pages while working 50h/week. In 2 months, my page
              made more than my job. And it's compounding monthly. This is a
              system, not luck.
            </p>
            <span>Henry</span>
          </div>

          {/* Card 2 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>I've built a real asset</h3>
            <p>
              I didn't want a hustle — I wanted a digital asset. This page is now
              growing itself. It earns, attracts offers, and I can scale without
              burning out.
            </p>
            <span>Richard</span>
          </div>

          {/* Card 3 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>Professional approach to online income</h3>
            <p>
              I've seen many courses. This is the first with strategy, coaching,
              structure. It's built like a real business. I'm 90 days in and
              scaling up fast.
            </p>
            <span>Jennifer</span>
          </div>

          {/* Card 4 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>Built this between meetings</h3>
            <p>
              I work in corporate, so time is limited. But I followed the modules,
              delegated smart, and results came fast. Now I have leverage I didn't
              before.
            </p>
            <span>Patricia</span>
          </div>

          {/* Card 5 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>It's like buying back time</h3>
            <p>
              I got into this to gain more time freedom. Now I wake up to
              payments, and my effort is compounding. Zero stress, zero burnout,
              just smart execution.
            </p>
            <span>Michael</span>
          </div>

          {/* Card 6 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>Scaled to $300K/year after quitting my job</h3>
            <p>
              I left my full-time job and fully committed to my Shadow Page. A
              year and a half later, I'm running a $300K/year digital asset with
              full time freedom.
            </p>
            <span>Samantha</span>
          </div>

          {/* Card 7 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>From 9-5 burnout to $10K/month & Bali</h3>
            <p>
              Shadow Pages changed everything. In 6 months, I quit my job and
              moved to Bali. The system got me consistent $10K months without
              grinding all day.
            </p>
            <span>Jeppe</span>
          </div>

          {/* Card 8 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>Stress-free income that actually works</h3>
            <p>
              Burned out from my corporate job, I tried Shadow Pages as a side
              hustle. It gave me the freedom and peace I'd been missing for years.
            </p>
            <span>Amelie</span>
          </div>

          {/* Card 9 */}
          <div className="review-card">
            <div className="stars">
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
              <img src="/assets/star.svg" alt="Star" loading="lazy" />
            </div>
            <h3>From restaurant shifts to $36K/month</h3>
            <p>
              I used to work 12-hour days in a restaurant. Now I'm making
              $36K/month online. Shadow Pages helped me build something real—no
              fluff, no hype, just execution.
            </p>
            <span>Dino</span>
          </div>
        </div>
      </section>
      {/* Students Video Section */}
      <section className="section-students">
        <h4 className="responsive-testimonial-title">
          This is what our <span className="highlight">students</span> have to say...
        </h4>
        <div className="video-wrapper">
          <iframe 
            className="section-students__video" 
            src="https://drive.google.com/file/d/1baV3UUxClm9CXPjzTtgh3yH7MqDj-lRL/preview" 
            allow="autoplay" 
            sandbox="allow-scripts allow-same-origin allow-presentation" 
            title="Student Testimonial Video" 
            loading="lazy"
          />
        </div> 
      </section>

      {/* FAQ Section */}
      <section className="review-section">
        <div className="review-header">
          <h2>Frequently Asked Questions</h2>
          <p>
            Everything you need to know about Shadow Pages and how to get started
          </p>
        </div>

        <div className="reviews-grid" style={{ gridTemplateColumns: '1fr', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          {/* FAQ Item 1 */}
          <details className="faq-item" style={{ cursor: 'pointer' }}>
            <summary style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '0',
              listStyle: 'none'
            }}>
              What's a Shadow Page?
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s' }}>+</span>
            </summary>
            <p style={{ 
              marginTop: '16px', 
              color: 'hsl(0, 0%, 20%)',
              lineHeight: '1.6'
            }}>
              A Shadow Page is a faceless Instagram account that generates income through proven systems and automation. You don't need to show your face, have prior experience, or manage it full-time once it's set up properly.
            </p>
          </details>

          {/* FAQ Item 2 */}
          <details className="faq-item" style={{ cursor: 'pointer' }}>
            <summary style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '0',
              listStyle: 'none'
            }}>
              Can anyone do this?
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s' }}>+</span>
            </summary>
            <p style={{ 
              marginTop: '16px', 
              color: 'hsl(0, 0%, 20%)',
              lineHeight: '1.6'
            }}>
              Yes. You don't need any prior experience to do this. No tech skills, no prior following or anything.<br /><br />
              If you can just follow some simple steps then starting and running a Shadow Page is simple if you have the right systems in place.
            </p>
          </details>

          {/* FAQ Item 3 */}
          <details className="faq-item" style={{ cursor: 'pointer' }}>
            <summary style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '0',
              listStyle: 'none'
            }}>
              Can I do this next to my job?
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s' }}>+</span>
            </summary>
            <p style={{ 
              marginTop: '16px', 
              color: 'hsl(0, 0%, 20%)',
              lineHeight: '1.6'
            }}>
              Absolutely. Most people start their Shadow Pages next to their job as once it's fully set up & automated, the system can run pretty much on it's own.
            </p>
          </details>

          {/* FAQ Item 4 */}
          <details className="faq-item" style={{ cursor: 'pointer' }}>
            <summary style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '0',
              listStyle: 'none'
            }}>
              How can I work with you?
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s' }}>+</span>
            </summary>
            <p style={{ 
              marginTop: '16px', 
              color: 'hsl(0, 0%, 20%)',
              lineHeight: '1.6'
            }}>
              Every month we only work with a limited amount of individuals as our #1 priority is for our students to win.<br /><br />
              That's why our spots are always very limited and we're very picky with who we work with...<br /><br />
              But if you'd like to learn more and see if you would qualify, click "Apply Now" above to fill out our 2-minute application.
            </p>
          </details>

          {/* FAQ Item 5 */}
          <details className="faq-item" style={{ cursor: 'pointer' }}>
            <summary style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '0',
              listStyle: 'none'
            }}>
              What's your guarantee?
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s' }}>+</span>
            </summary>
            <p style={{ 
              marginTop: '16px', 
              color: 'hsl(0, 0%, 20%)',
              lineHeight: '1.6'
            }}>
              Well firstly depends if we can, even work with you, but if you qualify we'll work closely 1-1 together for the next 6-12 months until you hit at least $5K-$10K/mo with your Shadow Page.<br /><br />
              That way it's almost impossible to fail as we ensure every single student crushes it.<br /><br />
              We are able to promise this as we go on weekly calls together, provide all of our systems, strategies and support. You'll have everything you need to build your Shadow Page and make $5K-$10K/mo.
            </p>
          </details>

          {/* FAQ Item 6 */}
          <details className="faq-item" style={{ cursor: 'pointer' }}>
            <summary style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '0',
              listStyle: 'none'
            }}>
              How long to see results?
              <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s' }}>+</span>
            </summary>
            <p style={{ 
              marginTop: '16px', 
              color: 'hsl(0, 0%, 20%)',
              lineHeight: '1.6'
            }}>
              It completely depends, we've got students that make 4 figures/mo in their first month and others that need longer. A fair and realistic expectation is 3-6 months to hit $2K-$5K/mo with your Shadow Pages, but more is also possible as we've seen in a variety of students.
            </p>
          </details>
        </div>
      </section>

      {/* Footer Hero Section */}
      <section className="footer-hero scroll-animate fade-up visible pt-[150px] pb-[150px]">
        <div className="footer-hero-content">
          <div className="footer-top">
            <h2 style={{ color: 'white' }}>
              Leverage the new way to generate passive income.
            </h2>
            <p>
              Schedule a call with our team to get started, learn more about our
              community, courses, and strategy.
            </p>
            <a
              href="#" onClick={(e) => { e.preventDefault(); handleHomePageApply(); }}
              className="cssbuttons-io-button"
            >
              Apply Now
              <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </a>
          </div>

          <hr />

          <div className="footer-columns">
            <div className="footer-column">
              <h4>Shadow Pages</h4>
              <p>
                Build faceless brands. Unlock time freedom. Start your journey.
              </p>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <p>Contact us for questions and community help.</p>
            </div>
          </div>

          <hr />

          <div className="footer-bottom">
            <p>© 2025 – Shadow Pages, All Rights Reserved</p>
            <div className="footer-links" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}>
              <a href="https://www.shadowpages.io/privacypolicy-1">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="https://www.shadowpages.io/termsofservice-1">
                Terms of Service
              </a>
              <span>|</span>
              <a href="https://www.shadowpages.io/earningsdisclaimer-1">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}

export default StaticHomeComplete;
