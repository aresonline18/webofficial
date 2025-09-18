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
      'User-Agent': 'Upload-Routing-Fix'
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
      message: `Fix SPA routing: ${remotePath}`,
      content: content,
      branch: BRANCH
    };

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ Fixed: ${remotePath}`);
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

async function uploadRoutingFixes() {
  console.log('🔧 Uploading routing fixes...');
  
  const files = [
    { local: 'client/src/pages/free-resources.tsx', remote: 'client/src/pages/free-resources.tsx' },
    { local: '_redirects', remote: '_redirects' },
    { local: 'netlify.toml', remote: 'netlify.toml' },
    { local: 'public/_redirects', remote: 'public/_redirects' }
  ];
  
  for (const file of files) {
    if (fs.existsSync(file.local)) {
      await uploadFile(file.local, file.remote);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log('\n🎉 Routing fixes uploaded to GitHub!');
  console.log('Your /free-resources route should now work correctly.');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN required');
    process.exit(1);
  }
  
  uploadRoutingFixes().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}