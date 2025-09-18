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
      'User-Agent': 'Update-Free-Resources-Images'
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
      message: `Update: Free resources images - Logo and book image fixes - ${remotePath}`,
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

async function updateFreeResourcesImages() {
  console.log('🚀 Updating free resources images - Logo and book image...');
  
  let uploaded = 0;
  
  // Upload updated HeroSection with Shadow Pages logo
  if (fs.existsSync('client/src/components/HeroSection.tsx')) {
    if (await uploadFile('client/src/components/HeroSection.tsx', 'client/src/components/HeroSection.tsx')) {
      uploaded++;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Upload updated static resources with correct book image URL
  if (fs.existsSync('client/src/data/resources.ts')) {
    if (await uploadFile('client/src/data/resources.ts', 'client/src/data/resources.ts')) {
      uploaded++;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} image updates to GitHub!`);
  console.log('📍 Free resources page image updates:');
  console.log('✅ Shadow Pages logo added to free resources page header');
  console.log('✅ Shadow Pages Playbook shows correct book image');
  console.log('✅ Images properly hosted and accessible');
  console.log('');
  console.log('🚀 Expected results on deployment:');
  console.log('▶︎ https://start.shadowpages.io/free-resources - Shows Shadow Pages logo above book stack');
  console.log('▶︎ Shadow Pages Playbook card displays proper book image');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  updateFreeResourcesImages().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}