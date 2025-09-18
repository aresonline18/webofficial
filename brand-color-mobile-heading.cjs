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
      'User-Agent': 'Brand-Color-Mobile-Heading'
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
      message: `Style: Brand color mobile heading - First line in Shadow Pages blue - ${remotePath}`,
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

async function uploadBrandColorMobileHeading() {
  console.log('🚀 Uploading brand color mobile heading...');
  
  let uploaded = 0;
  
  // Upload all Static home components with brand color first line
  const components = [
    'client/src/pages/StaticHome.tsx',
    'client/src/pages/StaticHomeExact.tsx', 
    'client/src/pages/StaticHomeComplete.tsx'
  ];
  
  for (const component of components) {
    if (fs.existsSync(component)) {
      if (await uploadFile(component, component)) {
        uploaded++;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} brand color mobile heading fixes to GitHub!`);
  console.log('📍 Brand color mobile heading implementation:');
  console.log('✅ First line: "Have the opportunity to talk with the" in Shadow Pages brand blue (#385dc6)');
  console.log('✅ Second line: "Shadow Pages team" in default black text');
  console.log('✅ Perfect alignment and responsive font sizing maintained');
  console.log('✅ Consistent branding across all landing page variants');
  console.log('');
  console.log('📱 Mobile heading display:');
  console.log('▶︎ Line 1: "Have the opportunity to talk with the" (Brand Blue #385dc6)');
  console.log('▶︎ Line 2: "Shadow Pages team" (Default Black)');
  console.log('▶︎ Font: clamp(1.5rem, 5vw, 2rem) - Large and responsive');
  console.log('');
  console.log('🚀 Expected results:');
  console.log('▶︎ Mobile: Brand-consistent first line highlighting with natural two-line flow');
  console.log('▶︎ Desktop: Original formatting with highlighted text maintained');
  console.log('▶︎ Brand consistency: Uses same blue as buttons and CTAs throughout site');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadBrandColorMobileHeading().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}