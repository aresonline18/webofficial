import React from 'react';

export default function FreeResources() {
  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: "rgb(20, 35, 60)",
      color: "white",
      minHeight: "100vh",
      margin: 0,
      padding: 0
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px"
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          marginBottom: "60px"
        }}>
          <div style={{
            width: "120px",
            height: "120px",
            margin: "0 auto 30px",
            borderRadius: "12px",
            overflow: "hidden"
          }}>
            <img 
              src="/Untitled%20design%20(10)_1752994221787-CDzxwOeS.png" 
              alt="Book Stack"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "900",
            marginBottom: "20px",
            color: "white"
          }}>
            Free Resources
          </h1>
          <p style={{
            fontSize: "20px",
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Free materials to help you <strong>start, run and profit</strong> from Shadow Pages
          </p>
        </div>
        
        {/* Shadow Pages Playbook Resource */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          gap: "40px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          margin: "40px 0"
        }}>
          <div style={{
            width: "200px",
            height: "200px",
            background: "#f8f9fa",
            borderRadius: "12px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            <img 
              src="/shadow-pages-book-final.png" 
              alt="Shadow Pages Playbook"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain"
              }}
            />
          </div>
          <div style={{
            flex: 1
          }}>
            <h2 style={{
              fontSize: "36px",
              fontWeight: "900",
              marginBottom: "20px",
              color: "rgb(20, 35, 60)"
            }}>
              Shadow Pages Playbook
            </h2>
            <p style={{
              fontSize: "18px",
              color: "#64748b",
              marginBottom: "30px",
              lineHeight: "1.6"
            }}>
              Everything YOU need to know about how Shadow Pages work and how you can generate cashflow from them...
            </p>
            <a 
              href="/free-resources/shadow-pages-playbook" 
              style={{
                background: "linear-gradient(to bottom, rgb(56, 93, 198), rgb(44, 74, 158))",
                color: "white",
                padding: "16px 32px",
                borderRadius: "25px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
                display: "inline-block",
                transition: "all 0.3s ease"
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}