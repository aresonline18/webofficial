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
      'User-Agent': 'Fix-Students-Title-Size'
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
      message: `Fix: Students title proper font size 1.5rem on mobile - ${remotePath}`,
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

async function fixStudentsTitleSize() {
  console.log('🚀 Fixing students title font size...');
  
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
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} students title size fixes to GitHub!`);
  console.log('📍 Fixed students title font size implementation:');
  console.log('✅ Set "This is what our students have to say…" to 1.5rem on mobile');
  console.log('✅ Clear, direct font size that will be properly larger than default');
  console.log('✅ Only applies on mobile devices (≤767px width)');
  console.log('✅ Desktop font size remains unchanged');
  console.log('');
  console.log('📱 Mobile font behavior:');
  console.log('▶︎ Mobile (≤767px): 1.5rem (24px) - clearly larger and more prominent');
  console.log('▶︎ Desktop (≥768px): Original font size maintained');
  console.log('▶︎ Responsive: Proper scaling for better mobile visibility');
  console.log('');
  console.log('🚀 Expected results:');
  console.log('▶︎ Mobile: Noticeably larger students testimonial section title');
  console.log('▶︎ Desktop: No changes to existing font sizing');
  console.log('▶︎ Professional: Clear visual hierarchy improvement on mobile');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  fixStudentsTitleSize().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}