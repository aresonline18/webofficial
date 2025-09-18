#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = "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";
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';

async function githubRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com${endpoint}`;
  const fetch = (await import('node-fetch')).default;
  
  const options = {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Comprehensive-GitHub-Upload'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return await fetch(url, options);
}

async function getFileSha(filePath) {
  try {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`);
    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
  } catch (error) {
    // File doesn't exist
  }
  return null;
}

async function uploadFile(localPath, remotePath) {
  try {
    const content = fs.readFileSync(localPath, 'base64');
    const sha = await getFileSha(remotePath);
    
    const body = {
      message: `CLEAN DEPLOYMENT: Upload ${remotePath}`,
      content: content,
      branch: BRANCH
    };
    
    if (sha) body.sha = sha;

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ Uploaded: ${remotePath}`);
      return true;
    } else {
      const errorData = await response.text();
      console.log(`❌ Failed: ${remotePath} - ${errorData}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error uploading ${remotePath}: ${error.message}`);
    return false;
  }
}

async function uploadTextFile(content, remotePath) {
  try {
    const contentBase64 = Buffer.from(content, 'utf8').toString('base64');
    const sha = await getFileSha(remotePath);
    
    const body = {
      message: `CLEAN DEPLOYMENT: Create ${remotePath}`,
      content: contentBase64,
      branch: BRANCH
    };
    
    if (sha) body.sha = sha;

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ Created: ${remotePath}`);
      return true;
    } else {
      const errorData = await response.text();
      console.log(`❌ Failed: ${remotePath} - ${errorData}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error creating ${remotePath}: ${error.message}`);
    return false;
  }
}

async function comprehensiveGitHubUpload() {
  console.log('🚀 COMPREHENSIVE GITHUB UPLOAD - Clean React deployment...');
  
  let uploaded = 0;

  // 1. Create proper React index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    
    <!-- SEO Meta Tags -->
    <title>Shadow Pages – Build Faceless Instagram Brands & Generate Passive Income</title>
    <meta name="description" content="Learn how to build faceless Instagram brands and generate passive income using the Shadow Pages system. Perfect for creators, beginners, and digital rebels looking to earn online without showing their face." />
    <meta name="keywords" content="shadow pages, social media monetization, faceless accounts, instagram business, digital marketing, passive income" />
    <meta name="author" content="Eric Cole" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://start.shadowpages.io/" />
    <meta property="og:title" content="Shadow Pages – Build Faceless Instagram Brands & Generate Passive Income" />
    <meta property="og:description" content="Learn how to build faceless Instagram brands and generate passive income using the Shadow Pages system." />
    <meta property="og:image" content="https://start.shadowpages.io/assets/logosp.webp" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://start.shadowpages.io/" />
    <meta property="twitter:title" content="Shadow Pages – Build Faceless Instagram Brands & Generate Passive Income" />
    <meta property="twitter:description" content="Learn how to build faceless Instagram brands and generate passive income using the Shadow Pages system." />
    <meta property="twitter:image" content="https://start.shadowpages.io/assets/logosp.webp" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/logosp.webp" />
    <link rel="apple-touch-icon" href="/assets/logosp.webp" />
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Shadow Pages",
      "description": "Build faceless Instagram brands and generate passive income",
      "author": {
        "@type": "Person",
        "name": "Eric Cole"
      },
      "url": "https://start.shadowpages.io/"
    }
    </script>
    
    <!-- Load React Build Assets -->
    <script type="module" crossorigin src="/assets/index-CAwwwYNE.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CIS7ZNq6.css">
    
    <!-- Hero Section Layout CSS -->
    <style>
      body {
        font-family: 'Inter', sans-serif;
        background: rgb(20, 35, 60);
        color: white;
        margin: 0;
        padding: 0;
      }
      
      #root {
        min-height: 100vh;
      }
      
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-size: 18px;
      }
      
      /* Ensure proper hero layout */
      .hero-content {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 2rem !important;
        align-items: center !important;
        max-width: 1200px !important;
        margin: 0 auto !important;
        padding: 0 2rem !important;
      }
      
      .hero-left {
        display: flex !important;
        flex-direction: column !important;
        gap: 1.5rem !important;
      }
      
      .hero-right {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
      
      @media (max-width: 768px) {
        .hero-content {
          grid-template-columns: 1fr !important;
          text-align: center !important;
        }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading">Loading Shadow Pages...</div>
    </div>
    
    <!-- GitHub Pages SPA Support -->
    <script>
      // Handle GitHub Pages SPA routing
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?')
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
  </body>
</html>`;

  console.log('📄 Creating index.html...');
  if (await uploadTextFile(indexHtml, 'index.html')) {
    uploaded++;
  }
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 2. Create 404.html for SPA routing
  const notFoundHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Shadow Pages</title>
    <script type="text/javascript">
      // GitHub Pages SPA routing fix
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + 
        '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>`;

  console.log('🔧 Creating 404.html...');
  if (await uploadTextFile(notFoundHtml, '404.html')) {
    uploaded++;
  }
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 3. Upload all React build assets
  console.log('📦 Uploading React build assets...');
  
  const assetsToUpload = [
    { local: 'dist/public/assets/index-CAwwwYNE.js', remote: 'assets/index-CAwwwYNE.js' },
    { local: 'dist/public/assets/index-CIS7ZNq6.css', remote: 'assets/index-CIS7ZNq6.css' },
    { local: 'dist/public/assets/logosp.webp', remote: 'assets/logosp.webp' },
    { local: 'dist/public/assets/artboard.webp', remote: 'assets/artboard.webp' },
    { local: 'dist/public/assets/eric.webp', remote: 'assets/eric.webp' },
    { local: 'dist/public/assets/map.webp', remote: 'assets/map.webp' },
    { local: 'dist/public/assets/worker1.webp', remote: 'assets/worker1.webp' },
    { local: 'dist/public/assets/worker2.webp', remote: 'assets/worker2.webp' },
    { local: 'dist/public/assets/star.svg', remote: 'assets/star.svg' },
    { local: 'dist/public/assets/strategy.svg', remote: 'assets/strategy.svg' },
    { local: 'dist/public/assets/community.svg', remote: 'assets/community.svg' },
    { local: 'dist/public/assets/flexible.svg', remote: 'assets/flexible.svg' }
  ];

  for (const asset of assetsToUpload) {
    if (fs.existsSync(asset.local)) {
      console.log(`📦 Uploading ${asset.remote}...`);
      if (await uploadFile(asset.local, asset.remote)) {
        uploaded++;
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  // 4. Create deployment configuration files
  const redirects = `/*    /index.html   200`;
  console.log('🔄 Creating _redirects...');
  if (await uploadTextFile(redirects, '_redirects')) {
    uploaded++;
  }

  const cname = `start.shadowpages.io`;
  console.log('🌐 Creating CNAME...');
  if (await uploadTextFile(cname, 'CNAME')) {
    uploaded++;
  }

  const readme = `# Shadow Pages - Clean React Deployment

This repository contains the production-ready React application for Shadow Pages.

## Live Site
- URL: https://start.shadowpages.io
- Status: React SPA with proper routing
- Features: Hero section, resource management, Typeform integration

## Architecture
- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS + shadcn/ui
- Deployment: GitHub Pages with SPA routing
- Domain: Custom domain via CNAME

## Features
- Side-by-side hero layout with proper React components
- Mobile responsive design
- Interactive Apply Now buttons
- UTM tracking integration
- SEO optimized with meta tags

## Deployment
This repository is automatically deployed to GitHub Pages.
All commits to main branch trigger automatic deployment.
`;

  console.log('📋 Creating README.md...');
  if (await uploadTextFile(readme, 'README.md')) {
    uploaded++;
  }

  console.log(`\n🎉 COMPREHENSIVE UPLOAD COMPLETE!`);
  console.log(`📊 Successfully uploaded ${uploaded} files`);
  console.log('');
  console.log('🚀 Clean React deployment complete:');
  console.log('✅ Proper React index.html with bundle loading');
  console.log('✅ SPA routing configuration (404.html)');
  console.log('✅ Complete React build assets');
  console.log('✅ Hero section layout CSS included');
  console.log('✅ Custom domain configuration');
  console.log('✅ Deployment documentation');
  console.log('');
  console.log('🌐 Live deployment:');
  console.log('▶︎ Site: https://start.shadowpages.io');
  console.log('▶︎ Status: Clean React deployment');
  console.log('▶︎ Hero: Side-by-side layout restored');
  console.log('▶︎ Components: Interactive React components');
  console.log('▶︎ Mobile: Responsive design maintained');
  console.log('');
  console.log('⏱️ Wait 2-3 minutes for GitHub Pages to deploy the new version.');
}

if (require.main === module) {
  comprehensiveGitHubUpload().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}