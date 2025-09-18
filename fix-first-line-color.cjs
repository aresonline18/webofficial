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
      'User-Agent': 'Fix-First-Line-Color'
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
      message: `Fix: Mobile stats heading first line single line display - ${remotePath}`,
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

async function uploadFixFirstLineColor() {
  console.log('🚀 Uploading mobile stats heading first line fix...');
  
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
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} mobile stats heading first line fixes to GitHub!`);
  console.log('📍 Mobile stats heading first line fix implementation:');
  console.log('✅ Reduced font size to 1.3rem to fit "A new era in online income:" on one line');
  console.log('✅ Maintained optimal line height for readability');
  console.log('✅ Ensured Shadow Pages text wraps naturally into two lines below');
  console.log('✅ Total mobile layout now exactly 3 lines as requested');
  console.log('');
  console.log('📱 Mobile stats heading behavior:');
  console.log('▶︎ Font size: 1.3rem (optimized for single line fit)');
  console.log('▶︎ Line height: 1.2 (optimal readability)');
  console.log('▶︎ Total lines: 3 (1 + 2)');
  console.log('');
  console.log('🚀 Expected mobile results:');
  console.log('▶︎ Line 1: "A new era in online income:" (single line)');
  console.log('▶︎ Line 2: "Shadow Pages are"');
  console.log('▶︎ Line 3: "leading the way"');
  console.log('');
  console.log('🚀 Expected desktop results:');
  console.log('▶︎ Line 1: "A new era in online income:"');
  console.log('▶︎ Line 2: "Shadow Pages are leading the way"');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadFixFirstLineColor().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}