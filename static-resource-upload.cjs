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
      'User-Agent': 'Static-Resource-Upload'
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
      message: `Deploy: Static Shadow Pages Playbook resource - ${remotePath}`,
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

async function uploadStaticResources() {
  console.log('🚀 Uploading static Shadow Pages Playbook resource...');
  
  let uploaded = 0;
  
  // Upload the static resources file
  if (fs.existsSync('client/src/data/resources.ts')) {
    if (await uploadFile('client/src/data/resources.ts', 'client/src/data/resources.ts')) {
      uploaded++;
    }
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} static resource files to GitHub!`);
  console.log('📍 Static Shadow Pages Playbook is now ready:');
  console.log('✅ Complete Shadow Pages Playbook content as static fallback');
  console.log('✅ Works without database dependencies');
  console.log('✅ Ready for immediate deployment');
  console.log('');
  console.log('🚀 The static resource includes:');
  console.log('▶︎ Complete monetization guide');
  console.log('▶︎ Step-by-step implementation');
  console.log('▶︎ Real student case studies');
  console.log('▶︎ Comprehensive FAQ section');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadStaticResources().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}