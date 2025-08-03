import { useEffect } from 'react';

function StaticHomeExact() {
  const handleHomePageApply = () => {
    const trackedResources = JSON.parse(localStorage.getItem("trackedResources") || "[]");
    const lastResource = trackedResources.length > 0 ? trackedResources[trackedResources.length - 1] : "no-resource-read";
    const resourceSlug = lastResource === "no-resource-read" ? "no-resource-read" : lastResource.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-").substring(0, 50);
    const url = `https://shadowpages.typeform.com/dms-overall?utm_source=home-page&utm_campaign=${resourceSlug}&utm_medium=EricHustls`;
    window.open(url, "_blank");
  };
  useEffect(() => {
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

    // Load Google Fonts
    const googleFonts1 = document.createElement('link');
    googleFonts1.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@300;500;600&display=swap';
    googleFonts1.rel = 'stylesheet';
    document.head.appendChild(googleFonts1);

    const googleFonts2 = document.createElement('link');
    googleFonts2.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
    googleFonts2.rel = 'stylesheet';
    document.head.appendChild(googleFonts2);

    // Load CSS files
    const responsiveCss = document.createElement('link');
    responsiveCss.href = '/assets/styles/responsive.css';
    responsiveCss.rel = 'stylesheet';
    document.head.appendChild(responsiveCss);

    const fontsCss = document.createElement('link');
    fontsCss.href = '/assets/styles/fonts.css';
    fontsCss.rel = 'stylesheet';
    document.head.appendChild(fontsCss);

    const stylesCss = document.createElement('link');
    stylesCss.href = '/assets/styles/styles.css';
    stylesCss.rel = 'stylesheet';
    document.head.appendChild(stylesCss);

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

    // Load header script
    const headerScript = document.createElement('script');
    headerScript.src = '/assets/script/header.js';
    headerScript.defer = true;
    document.head.appendChild(headerScript);

    // Add scroll animations script
    const scrollScript = document.createElement('script');
    scrollScript.innerHTML = `
      const targets = [
        { selector: '.hero-content', animation: 'fade-up' },
        { selector: '.team-left', animation: 'slide-left' },
        { selector: '.team-right', animation: 'slide-right' },
        { selector: '.benefits-content', animation: 'fade-up' },
        { selector: '.footer-hero', animation: 'fade-up' },
        { selector: '.testimonials-section', animation: 'fade-up' },
      ];

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      targets.forEach(({ selector, animation }) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.classList.add('scroll-animate', animation);
          observer.observe(el);
        });
      });
    `;
    document.head.appendChild(scrollScript);

    return () => {
      // Cleanup function
      try {
        document.head.removeChild(gtmScript);
        document.head.removeChild(googleFonts1);
        document.head.removeChild(googleFonts2);
        document.head.removeChild(responsiveCss);
        document.head.removeChild(fontsCss);
        document.head.removeChild(stylesCss);
        document.head.removeChild(headerScript);
        document.head.removeChild(scrollScript);
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, []);

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-PRN5QJQD"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>

      <div style={{ display: 'none' }}>
        Shadow Pages is the ultimate system for building faceless Instagram
        businesses. Learn to grow faceless brands, monetize anonymous pages, and
        generate passive income with no face or videos required. Our system
        supports Instagram creators, niche pages, automation tools, and low-effort
        income strategies.
      </div>

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
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <button
              className="button-64"
              onClick={() => window.location.href='https://shadowpages.typeform.com/dms-overall'}
            >
              <span className="text dynamic-text">Limited Spots · Applications Now Open</span>
            </button>

            <h1>
              Build a reliable passive<br />
              Income source with<br />
              <span className="highlight">Shadow Pages</span>
            </h1>

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

      <section className="neumorphic-section">
        <div className="neumorphic-container">
          <div className="neumorphic-left">
            <h2>
              <span className="muted">Lower Effort,</span><br />
              <span className="accent">Higher Leverage</span> Income:<br />
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
              <div className="neu-icon">
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
              <div className="neu-icon">
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
              <div className="neu-icon">
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
              <p>Gain access to hours of step-by-step training</p>
            </div>

            {/* Card 4 */}
            <div className="neu-card">
              <div className="neu-icon">
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

      <section className="stats-section">
        <div className="stats-overlay-glow"></div>

        <div className="stats-header">
          <h2 className="stats-heading-responsive">
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

      <section className="team-section">
        <div className="team-container">
          <div className="team-left">
            <div className="team-heading">
              {/* Desktop heading - hidden on mobile */}
              <h2 className="desktop-heading">
                <span className="highlighted">Have the opportunity to talk</span> with
                the <strong>Shadow Pages Team</strong>
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
            loading="lazy">
          </iframe>
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

      {/* Footer Hero */}
      <section className="footer-hero">
        <div className="footer-hero-content">
          <div className="footer-top">
            <h2>
              Unlock your <span className="highlight">Passive Income</span> Potential
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

export default StaticHomeExact;
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <summary style={{
                padding: '24px 28px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                fontSize: '1.1rem',
                color: '#1a202c',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f1f5f9'
              }}>
                Can anyone do this?
                <span style={{ fontSize: '1.2rem', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
              </summary>
              <div style={{
                padding: '24px 28px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#475569',
                lineHeight: '1.7',
                background: '#fafbfc'
              }}>
                Yes. You don't need any prior experience to do this. No tech skills, no prior following or anything.<br /><br />
                If you can just follow some simple steps then starting and running a Shadow Page is simple if you have the right systems in place.
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <summary style={{
                padding: '24px 28px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                fontSize: '1.1rem',
                color: '#1a202c',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f1f5f9'
              }}>
                Can I do this next to my job?
                <span style={{ fontSize: '1.2rem', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
              </summary>
              <div style={{
                padding: '24px 28px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#475569',
                lineHeight: '1.7',
                background: '#fafbfc'
              }}>
                Absolutely. Most people start their Shadow Pages next to their job as once it's fully set up & automated, the system can run pretty much on it's own.
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <summary style={{
                padding: '24px 28px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                fontSize: '1.1rem',
                color: '#1a202c',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f1f5f9'
              }}>
                How can I work with you?
                <span style={{ fontSize: '1.2rem', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
              </summary>
              <div style={{
                padding: '24px 28px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#475569',
                lineHeight: '1.7',
                background: '#fafbfc'
              }}>
                Every month we only work with a limited amount of individuals as our #1 priority is for our students to win.<br /><br />
                That's why our spots are always very limited and we're very picky with who we work with...<br /><br />
                But if you'd like to learn more and see if you would qualify, click "Apply Now" above to fill out our 2-minute application.
              </div>
            </details>

            {/* FAQ Item 5 */}
            <details style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <summary style={{
                padding: '24px 28px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                fontSize: '1.1rem',
                color: '#1a202c',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f1f5f9'
              }}>
                What's your guarantee?
                <span style={{ fontSize: '1.2rem', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
              </summary>
              <div style={{
                padding: '24px 28px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#475569',
                lineHeight: '1.7',
                background: '#fafbfc'
              }}>
                Well firstly depends if we can, even work with you, but if you qualify we'll work closely 1-1 together for the next 6-12 months until you hit at least $5K-$10K/mo with your Shadow Page.<br /><br />
                That way it's almost impossible to fail as we ensure every single student crushes it.<br /><br />
                We are able to promise this as we go on weekly calls together, provide all of our systems, strategies and support. You'll have everything you need to build your Shadow Page and make $5K-$10K/mo.
              </div>
            </details>

            {/* FAQ Item 6 */}
            <details style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <summary style={{
                padding: '24px 28px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                fontSize: '1.1rem',
                color: '#1a202c',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f1f5f9'
              }}>
                How long to see results?
                <span style={{ fontSize: '1.2rem', transform: 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
              </summary>
              <div style={{
                padding: '24px 28px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#475569',
                lineHeight: '1.7',
                background: '#fafbfc'
              }}>
                It completely depends, we've got students that make 4 figures/mo in their first month and others that need longer. A fair and realistic expectation is 3-6 months to hit $2K-$5K/mo with your Shadow Pages, but more is also possible as we've seen in a variety of students.
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="footer-hero">
        <div className="footer-hero-content">
          <div className="footer-top">
            <h2>
              Unlock your <span className="highlight">Passive Income</span> Potential
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

      {/* Subtle link to Free Resources - positioned at bottom */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 1000,
        background: 'rgba(56, 93, 198, 0.9)',
        borderRadius: '50px',
        padding: '12px 20px',
        backdropFilter: 'blur(10px)'
      }}>
        <a 
          href="/free-resources" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Free Resources →
        </a>
      </div>
    </>
  );
}

export default StaticHomeExact;