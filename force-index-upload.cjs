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
      'User-Agent': 'Force-Index-Upload'
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
      message: `Add indexing file: ${remotePath}`,
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

async function uploadIndexingFiles() {
  console.log('🔍 Uploading indexing and SEO files...');
  
  const files = [
    { local: 'public/sitemap.xml', remote: 'public/sitemap.xml' },
    { local: 'public/robots.txt', remote: 'public/robots.txt' },
    { local: '_redirects', remote: '_redirects' },
    { local: 'public/_redirects', remote: 'public/_redirects' }
  ];
  
  let uploaded = 0;
  for (const file of files) {
    if (fs.existsSync(file.local)) {
      const success = await uploadFile(file.local, file.remote);
      if (success) uploaded++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(`\n🎉 Uploaded ${uploaded} indexing files to GitHub!`);
  console.log('📍 Next steps for indexing:');
  console.log('1. Your sitemap.xml will help search engines discover /free-resources');
  console.log('2. Submit your sitemap to Google Search Console');
  console.log('3. The _redirects files will fix SPA routing issues');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadIndexingFiles().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}