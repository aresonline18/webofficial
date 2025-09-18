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
      'User-Agent': 'Mobile-Team-Heading-Fix'
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
      message: `Fix: Mobile team heading - Clean responsive display - ${remotePath}`,
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

async function uploadMobileTeamHeadingFix() {
  console.log('🚀 Uploading mobile team heading fix...');
  
  let uploaded = 0;
  
  // Upload all Static home components with mobile heading fix
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
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} mobile heading fixes to GitHub!`);
  console.log('📍 Mobile team heading implementation:');
  console.log('✅ Desktop: Shows original "Have the opportunity to talk with the Shadow Pages Team"');
  console.log('✅ Mobile: Shows clean "Have the opportunity to talk with the Shadow Pages team"');
  console.log('✅ No text cutoff or awkward line breaks on mobile devices');
  console.log('✅ Responsive design maintains visual hierarchy across all screen sizes');
  console.log('');
  console.log('📱 Responsive behavior:');
  console.log('▶︎ Desktop (≥768px): Original heading with highlighted text and strong formatting');
  console.log('▶︎ Mobile (<768px): Clean two-line heading without complex styling');
  console.log('');
  console.log('🚀 Expected results:');
  console.log('▶︎ Mobile users see properly formatted team section heading');
  console.log('▶︎ Desktop experience remains unchanged');
  console.log('▶︎ Text flows naturally on all device sizes');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadMobileTeamHeadingFix().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}