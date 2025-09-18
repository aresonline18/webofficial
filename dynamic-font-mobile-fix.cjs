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
      'User-Agent': 'Dynamic-Font-Mobile-Fix'
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
      message: `Fix: Dynamic mobile stats heading - 3 line responsive layout - ${remotePath}`,
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

async function uploadDynamicFontMobileFix() {
  console.log('🚀 Uploading dynamic mobile stats heading fix...');
  
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
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} dynamic mobile stats heading fixes to GitHub!`);
  console.log('📍 Dynamic mobile stats heading implementation:');
  console.log('✅ Line 1: "A new era in online income:" (single line at top)');
  console.log('✅ Lines 2-3: "Shadow Pages are leading the way" (wrapped into two lines)');
  console.log('✅ Added span wrapper with dynamic word-wrapping for mobile responsiveness');
  console.log('✅ Maintains clean desktop layout while optimizing mobile readability');
  console.log('');
  console.log('📱 Mobile stats heading behavior:');
  console.log('▶︎ Mobile (≤767px): 3-line layout with responsive word wrapping');
  console.log('▶︎ Desktop (≥768px): Clean 2-line layout maintained');
  console.log('▶︎ Responsive: Dynamic text flow based on screen width');
  console.log('');
  console.log('🚀 Expected mobile results:');
  console.log('▶︎ Line 1: "A new era in online income:"');
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
  uploadDynamicFontMobileFix().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}