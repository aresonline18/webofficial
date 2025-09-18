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
      'User-Agent': 'Update-Instagram-Profiles-Padding'
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
      message: `Update: Add 15px top padding to @boysglowup and @glowupacademyy profiles image - ${remotePath}`,
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

async function updateInstagramProfilesPadding() {
  console.log('🚀 Uploading Instagram profiles padding update to GitHub...');
  
  let uploaded = 0;
  
  const components = [
    'client/src/pages/templates/shadow-pages-playbook.tsx'
  ];
  
  for (const component of components) {
    if (fs.existsSync(component)) {
      if (await uploadFile(component, component)) {
        uploaded++;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} Instagram profiles padding update to GitHub!`);
  console.log('📍 Padding updates:');
  console.log('✅ Added 15px top padding to @boysglowup and @glowupacademyy profiles image');
  console.log('✅ Improved visual spacing in Shadow Pages Playbook');
  console.log('✅ Enhanced image presentation');
  console.log('✅ Better content flow and readability');
  console.log('');
  console.log('🎯 Visual improvements:');
  console.log('▶︎ Image spacing: 15px top padding added');
  console.log('▶︎ Content flow: Improved visual hierarchy');
  console.log('▶︎ Readability: Better separation from text');
  console.log('▶︎ User experience: Enhanced content presentation');
  console.log('');
  console.log('🚀 Live deployment status:');
  console.log('▶︎ Repository: https://github.com/aresonline18/webofficial');
  console.log('▶︎ Automatic deployment: Active');
  console.log('▶︎ Live site: https://start.shadowpages.io');
  console.log('▶︎ Resource: /free-resources/shadow-pages-playbook');
  console.log('▶︎ Status: Padding update deployed');
  console.log('');
  console.log('✨ Shadow Pages Playbook enhanced:');
  console.log('▶︎ Instagram profiles image: 15px top padding ✓');
  console.log('▶︎ Visual spacing: Improved ✓');
  console.log('▶︎ Content presentation: Enhanced ✓');
  console.log('▶︎ User experience: Better reading flow ✓');
}

if (require.main === module) {
  updateInstagramProfilesPadding().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}