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
              <span className="text">Limited Spots · Applications Now Open</span>
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
                1:1 Education Support
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                </svg>
                Live Calls
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                </svg>
                Learn Whenever
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
              <h3>Shadow Page Strategy</h3>
              <p>Built on proven faceless brand playbooks</p>
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
              <h3>Creator Network</h3>
              <p>Learn continuously alongside our private community</p>
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
              <h3>Full System Access</h3>
              <p>Gain access to hours of step-by-step training</p>
            </div>

            {/* Card 4 */}
            <div className="neu-card">
              <div className="neu-icon">
                <svg className="icon-svg" viewBox="0 0 24 24" fill="none">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor" />
                </svg>
              </div>
              <h3>Fast Start Onboarding</h3>
              <p>Teaching you the tools to achieve success</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-overlay-glow"></div>

        <div className="stats-header">
          <h2>
            A new era in online income:<br />
            <span className="highlight">Shadow Pages</span> are leading the way
          </h2>
          <p>
            More and more everyday people are leveraging{' '}
            <span className="highlight">Shadow Pages to generate Cashflow</span> on
            complete autopilot.
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
              <h2>
                <span className="highlighted">Have the opportunity to talk</span> with
                the <strong>Shadow Pages Team</strong>
              </h2>
            </div>

            <p>
              We'll provide the resources, community, and education for you to
              learn at your own pace. Talk with our team about why our
              comprehensive education strategy works.
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
                Learn from anywhere & at any time
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
                Master the art of building passive, reliable income through
                faceless Shadow Pages—no personal brand, no camera, just results.
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
            <span>Supportive Network</span>
          </div>
          <div className="pill-feature">
            <img
              src="/assets/flexible.svg" loading="lazy"
              alt="Flexible Icon"
              className="pill-icon"
            />
            <span>Learn Anytime</span>
          </div>
        </div>
      </section>

      <section className="review-section">
        <div className="review-header">
          <h2>Real feedback from our students</h2>
          <p>
            Read why hundreds of students like Shadow Pages and how they reached
            financial freedom
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
        <h4 className="section-students__title testimonial-title">
          This is what our <span className="highlight">students</span> have to say…
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
            <div className="footer-links">
              <a href="https://www.shadowpages.io/privacypolicy-1">
                Privacy Policy
              </a>
              |
              <a href="https://www.shadowpages.io/termsofservice-1">
                Terms of Service
              </a>
              |
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