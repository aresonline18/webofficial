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
      'User-Agent': 'Mobile-Stats-Heading-Two-Lines'
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
      message: `Fix: Mobile stats heading clean 2-line layout - ${remotePath}`,
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

async function uploadMobileStatsHeadingTwoLines() {
  console.log('🚀 Uploading mobile stats heading two-line layout...');
  
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
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} mobile stats heading two-line fixes to GitHub!`);
  console.log('📍 Mobile stats heading two-line implementation:');
  console.log('✅ Fixed stats heading for clean 2-line mobile layout');
  console.log('✅ Line 1: "A new era in online income:"');
  console.log('✅ Line 2: "Shadow Pages are leading the way"');
  console.log('✅ Both mobile and desktop now use <br /> for consistent line breaking');
  console.log('');
  console.log('📱 Stats heading behavior:');
  console.log('▶︎ Mobile (≤767px): Clean 2-line layout with optimized line height');
  console.log('▶︎ Desktop (≥768px): Same 2-line layout for consistency');
  console.log('▶︎ Responsive: Consistent line breaking across all devices');
  console.log('');
  console.log('🚀 Expected results:');
  console.log('▶︎ Mobile: "A new era in online income:" / "Shadow Pages are leading the way"');
  console.log('▶︎ Desktop: "A new era in online income:" / "Shadow Pages are leading the way"');
  console.log('▶︎ Professional: Clean, readable typography on all devices');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadMobileStatsHeadingTwoLines().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}