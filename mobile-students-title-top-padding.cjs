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
      'User-Agent': 'Mobile-Students-Title-Top-Padding'
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
      message: `Style: Add 10px top padding to students title on mobile - ${remotePath}`,
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

async function uploadStudentsTitleTopPadding() {
  console.log('🚀 Uploading students title top padding...');
  
  let uploaded = 0;
  
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
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} students title top padding fixes to GitHub!`);
  console.log('📍 Students title top padding implementation:');
  console.log('✅ Added 10px top padding to "This is what our students have to say…"');
  console.log('✅ Only applies on mobile devices (≤767px width)');
  console.log('✅ Desktop padding remains unchanged');
  console.log('✅ Better vertical spacing above testimonial title');
  console.log('');
  console.log('📱 Mobile padding behavior:');
  console.log('▶︎ Mobile (≤767px): 10px top padding for better section separation');
  console.log('▶︎ Desktop (≥768px): Original padding maintained');
  console.log('▶︎ Responsive: Clean vertical spacing that improves mobile layout');
  console.log('');
  console.log('🚀 Expected results:');
  console.log('▶︎ Mobile: Better spacing above students testimonial section');
  console.log('▶︎ Desktop: No changes to existing vertical spacing');
  console.log('▶︎ Professional: Improved content breathing room on mobile');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadStudentsTitleTopPadding().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}