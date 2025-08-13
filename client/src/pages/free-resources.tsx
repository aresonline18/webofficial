export default function FreeResources() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div style="
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: rgb(20, 35, 60);
          color: white;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        ">
          <div style="
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          ">
            <!-- Hero Section -->
            <div style="
              text-align: center;
              padding: 60px 20px;
              background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
              border-radius: 16px;
              margin-bottom: 40px;
            ">
              <div style="
                width: 120px;
                height: 120px;
                margin: 0 auto 30px;
                border-radius: 12px;
                overflow: hidden;
              ">
                <img 
                  src="/Untitled%20design%20(10)_1752994221787-CDzxwOeS.png" 
                  alt="Book Stack"
                  style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  "
                />
              </div>
              <h1 style="
                font-size: 48px;
                font-weight: 900;
                margin-bottom: 16px;
                background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              ">
                Free Resources
              </h1>
              <p style="
                font-size: 20px;
                color: rgba(255, 255, 255, 0.8);
                max-width: 600px;
                margin: 0 auto;
                line-height: 1.6;
              ">
                Free materials to help you <strong>start, run and profit</strong> from Shadow Pages
              </p>
            </div>
            
            <!-- Resource Section -->
            <div style="padding: 40px 0;">
              <div style="
                background: white;
                border-radius: 16px;
                padding: 32px;
                display: flex;
                align-items: center;
                gap: 32px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              ">
                <div style="
                  width: 180px;
                  height: 180px;
                  background: #f8f9fa;
                  border-radius: 12px;
                  flex-shrink: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                ">
                  <img 
                    src="/shadow-pages-book-final.png" 
                    alt="Shadow Pages Playbook"
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      object-fit: contain;
                    "
                  />
                </div>
                <div style="
                  flex: 1;
                  color: rgb(20, 35, 60);
                ">
                  <h2 style="
                    font-size: 32px;
                    font-weight: 900;
                    margin-bottom: 16px;
                    color: rgb(20, 35, 60);
                  ">
                    Shadow Pages Playbook
                  </h2>
                  <p style="
                    font-size: 18px;
                    color: #64748b;
                    margin-bottom: 24px;
                    line-height: 1.6;
                  ">
                    Everything YOU need to know about how Shadow Pages work and how you can generate cashflow from them...
                  </p>
                  <a 
                    href="/free-resources/shadow-pages-playbook" 
                    style="
                      background: linear-gradient(to bottom, rgb(56, 93, 198), rgb(44, 74, 158));
                      color: white;
                      padding: 14px 28px;
                      border-radius: 25px;
                      text-decoration: none;
                      font-weight: 600;
                      font-size: 16px;
                      display: inline-block;
                      transition: all 0.3s ease;
                      border: none;
                      cursor: pointer;
                    "
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      }}
    />
  );
}