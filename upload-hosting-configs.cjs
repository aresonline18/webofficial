#!/usr/bin/env node

const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
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
      'User-Agent': 'Upload-Configs'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return await fetch(url, options);
}

async function uploadFile(localPath, remotePath) {
  try {
    const content = fs.readFileSync(localPath, 'base64');
    
    const body = {
      message: `Add hosting configuration: ${remotePath}`,
      content: content,
      branch: BRANCH
    };

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ Uploaded: ${remotePath}`);
      return true;
    } else {
      console.log(`❌ Failed: ${remotePath}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error uploading ${remotePath}: ${error.message}`);
    return false;
  }
}

async function uploadHostingConfigs() {
  console.log('🚀 Uploading hosting configuration files...');
  
  const files = [
    { local: 'netlify.toml', remote: 'netlify.toml' },
    { local: 'vercel.json', remote: 'vercel.json' },
    { local: 'railway.json', remote: 'railway.json' }
  ];
  
  for (const file of files) {
    await uploadFile(file.local, file.remote);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✅ Hosting configurations uploaded to GitHub!');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN required');
    process.exit(1);
  }
  
  uploadHostingConfigs().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}