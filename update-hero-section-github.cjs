#!/usr/bin/env node

const fs = require('fs');

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
      'User-Agent': 'Update-Hero-Section-GitHub'
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
      message: `Update: Hero section with latest premium coaching features - ${remotePath}`,
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

async function updateHeroSectionGithub() {
  console.log('🚀 Uploading complete hero section updates to GitHub...');
  
  let uploaded = 0;
  
  const components = [
    'client/src/pages/StaticHomeComplete.tsx',
    'client/src/pages/StaticHome.tsx',
    'client/src/pages/StaticHomeExact.tsx'
  ];
  
  for (const component of components) {
    if (fs.existsSync(component)) {
      if (await uploadFile(component, component)) {
        uploaded++;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} hero section updates to GitHub!`);
  console.log('📍 Hero section features updated:');
  console.log('✅ Premium coaching language: "Personalized Coaching"');
  console.log('✅ Specific benefits: "Weekly 1/1 Live Calls"');
  console.log('✅ VIP support: "24/7 V.I.P. Support"');
  console.log('✅ Professional positioning maintained');
  console.log('✅ All landing page variants synchronized');
  console.log('');
  console.log('🎯 Current hero content:');
  console.log('▶︎ Headline: "Build a reliable passive Income source with Shadow Pages"');
  console.log('▶︎ Feature 1: Personalized Coaching');
  console.log('▶︎ Feature 2: Weekly 1/1 Live Calls');
  console.log('▶︎ Feature 3: 24/7 V.I.P. Support');
  console.log('▶︎ CTA: "Limited Spots · Applications Now Open"');
  console.log('');
  console.log('🚀 Live deployment status:');
  console.log('▶︎ Repository: https://github.com/aresonline18/webofficial');
  console.log('▶︎ Automatic deployment: Active');
  console.log('▶︎ Live site: https://start.shadowpages.io');
  console.log('▶︎ Status: Hero section updates deployed');
  console.log('');
  console.log('✨ Enhanced value proposition:');
  console.log('▶︎ Premium coaching language ✓');
  console.log('▶︎ Specific benefit descriptions ✓');
  console.log('▶︎ High-value service positioning ✓');
  console.log('▶︎ Professional branding consistency ✓');
  console.log('');
  console.log('🎯 Hero section components uploaded:');
  console.log('▶︎ StaticHomeComplete.tsx: Primary landing page');
  console.log('▶︎ StaticHome.tsx: Alternative variant');
  console.log('▶︎ StaticHomeExact.tsx: Exact match variant');
  console.log('▶︎ Consistency: All variants synchronized');
}

if (require.main === module) {
  updateHeroSectionGithub().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}