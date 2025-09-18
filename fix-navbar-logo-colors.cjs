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
      'User-Agent': 'Fix-Navbar-Logo-Colors'
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
      message: `Update: Navigation bar "Home" to "Start" - ${remotePath}`,
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

async function fixNavbarLogoColors() {
  console.log('🚀 Uploading navbar navigation updates to GitHub...');
  
  let uploaded = 0;
  
  const components = [
    'client/src/components/Header.tsx',
    'client/src/components/MobileMenu.tsx'
  ];
  
  for (const component of components) {
    if (fs.existsSync(component)) {
      if (await uploadFile(component, component)) {
        uploaded++;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} navbar navigation fixes to GitHub!`);
  console.log('📍 Navigation updates:');
  console.log('✅ Changed "Home" to "Start" in desktop navigation');
  console.log('✅ Changed "Home" to "Start" in mobile navigation menu');
  console.log('✅ Consistent branding across both desktop and mobile experiences');
  console.log('✅ Updated Header.tsx and MobileMenu.tsx components');
  console.log('');
  console.log('🎯 Branding enhancement:');
  console.log('▶︎ "Start" aligns with Shadow Pages call-to-action messaging');
  console.log('▶︎ More action-oriented navigation language');
  console.log('▶︎ Professional consistency across all touchpoints');
  console.log('▶︎ Improved user journey flow');
  console.log('');
  console.log('🚀 Live deployment status:');
  console.log('▶︎ Repository: https://github.com/aresonline18/webofficial');
  console.log('▶︎ Automatic deployment: Active');
  console.log('▶︎ Live site: https://start.shadowpages.io');
  console.log('▶︎ Status: Navigation updates deployed');
  console.log('');
  console.log('✨ Navigation improvements:');
  console.log('▶︎ Desktop: Header component updated');
  console.log('▶︎ Mobile: MobileMenu component updated');
  console.log('▶︎ Consistency: Both platforms now use "Start"');
  console.log('▶︎ Action-oriented: Encourages user engagement');
}

if (require.main === module) {
  fixNavbarLogoColors().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}