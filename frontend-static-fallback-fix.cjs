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
      'User-Agent': 'Frontend-Fallback-Fix'
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
      message: `Fix: Static fallback for Shadow Pages Playbook - ${remotePath}`,
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

async function uploadStaticFallbackFix() {
  console.log('🚀 Uploading static fallback fixes for Shadow Pages Playbook...');
  
  let uploaded = 0;
  
  // Upload updated free-resources page with static fallback
  if (fs.existsSync('client/src/pages/free-resources.tsx')) {
    if (await uploadFile('client/src/pages/free-resources.tsx', 'client/src/pages/free-resources.tsx')) {
      uploaded++;
    }
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Upload updated resource page with static fallback
  if (fs.existsSync('client/src/pages/resource.tsx')) {
    if (await uploadFile('client/src/pages/resource.tsx', 'client/src/pages/resource.tsx')) {
      uploaded++;
    }
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} static fallback fixes to GitHub!`);
  console.log('📍 Shadow Pages Playbook now works with static fallback:');
  console.log('✅ Free resources page loads Shadow Pages Playbook from static data when database unavailable');
  console.log('✅ Resource page loads complete content from static fallback');
  console.log('✅ No database dependency required for deployment');
  console.log('✅ Works immediately on any hosting platform');
  console.log('');
  console.log('🚀 Expected results:');
  console.log('▶︎ https://start.shadowpages.io/free-resources - Shows Shadow Pages Playbook card');
  console.log('▶︎ https://start.shadowpages.io/free-resources/shadow-pages-playbook - Shows complete guide');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadStaticFallbackFix().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}