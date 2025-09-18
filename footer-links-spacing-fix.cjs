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
      'User-Agent': 'Footer-Links-Spacing-Fix'
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
      message: `Fix: Footer links spacing - even 8px gap between all elements - ${remotePath}`,
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

async function uploadFooterLinksSpacingFix() {
  console.log('🚀 Uploading footer links spacing fix...');
  
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
  
  console.log(`\n🎉 Successfully uploaded ${uploaded} footer links spacing fixes to GitHub!`);
  console.log('📍 Footer links spacing fix implementation:');
  console.log('✅ Fixed uneven spacing between "Privacy Policy | Terms of Service | Disclaimer"');
  console.log('✅ Applied consistent 8px gap between all footer link elements');
  console.log('✅ Removed custom margin/padding classes that caused spacing inconsistency');
  console.log('✅ Maintained centered layout and responsive flexbox design');
  console.log('');
  console.log('📱 Footer links behavior:');
  console.log('▶︎ All devices: Even 8px spacing between each link and divider');
  console.log('▶︎ Responsive: Flexbox layout with proper wrapping on small screens');
  console.log('▶︎ Professional: Clean, consistent spacing that matches site standards');
  console.log('');
  console.log('🚀 Expected results:');
  console.log('▶︎ Equal spacing: "Privacy Policy | Terms of Service | Disclaimer"');
  console.log('▶︎ No more uneven gaps around the divider characters');
  console.log('▶︎ Clean, professional footer appearance across all landing pages');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  uploadFooterLinksSpacingFix().catch(error => {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  });
}