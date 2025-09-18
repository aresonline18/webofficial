#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = "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";
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';

// Files specifically related to the CTA & UTM system
const CTA_FILES = [
  'client/src/hooks/useUrlParams.ts',
  'client/src/components/sticky-cta.tsx', 
  'client/src/pages/templates/shadow-pages-playbook.tsx',
  'client/src/data/resources.ts',
  'uploads/book_1753355066598-min_1753701793338.png',
  'replit.md'
];

async function githubRequest(endpoint, method = 'GET', body = null) {
  const fetch = (await import('node-fetch')).default;
  
  const options = {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'CTA-Upload'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`https://api.github.com${endpoint}`, options);
  return response;
}

async function getExistingFileSha(remotePath) {
  try {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`);
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
    if (!fs.existsSync(localPath)) {
      console.log(`❌ ${localPath} - file not found`);
      return false;
    }

    const content = fs.readFileSync(localPath, 'base64');
    const sha = await getExistingFileSha(remotePath);
    
    const body = {
      message: `Update ${remotePath} - CTA & UTM system`,
      content: content,
      branch: BRANCH
    };
    
    if (sha) {
      body.sha = sha;
    }

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ ${remotePath}`);
      return true;
    } else {
      console.log(`❌ ${remotePath} - Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${remotePath} - ${error.message}`);
    return false;
  }
}

async function uploadCTASystem() {
  console.log('🚀 UPLOADING CTA & UTM SYSTEM TO GITHUB');
  console.log('Repository: aresonline18/webofficial\n');
  
  let uploaded = 0;
  let failed = 0;
  
  for (const file of CTA_FILES) {
    const success = await uploadFile(file, file);
    if (success) {
      uploaded++;
    } else {
      failed++;
    }
    
    // Small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 CTA & UTM SYSTEM UPLOAD COMPLETE!');
  console.log('─'.repeat(50));
  console.log(`✅ Uploaded: ${uploaded} files`);
  console.log(`❌ Failed: ${failed} files`);
  console.log('\n🌐 Repository: https://github.com/aresonline18/webofficial');
  console.log('⚡ Conditional CTA system now live on GitHub!');
}

uploadCTASystem();