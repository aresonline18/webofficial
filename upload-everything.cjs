#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
      'User-Agent': 'Upload-Everything'
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
    if (!fs.existsSync(localPath)) {
      return false;
    }

    const stats = fs.statSync(localPath);
    if (stats.isDirectory()) {
      return false;
    }

    // Skip files larger than 50MB (GitHub limit is 100MB)
    if (stats.size > 50 * 1024 * 1024) {
      console.log(`⚠️  Skip: ${remotePath} (too large: ${Math.round(stats.size / 1024 / 1024)}MB)`);
      return false;
    }

    const content = fs.readFileSync(localPath, 'base64');
    
    const body = {
      message: `Upload ${remotePath}`,
      content: content,
      branch: BRANCH
    };

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ ${remotePath}`);
      return true;
    } else {
      console.log(`❌ ${remotePath}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${remotePath} - ${error.message}`);
    return false;
  }
}

function getAllFiles(dir, baseDir = '') {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = baseDir ? path.join(baseDir, item) : item;
      
      // Only skip .git directory, include everything else
      if (item === '.git') {
        continue;
      }
      
      try {
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          files.push(...getAllFiles(fullPath, relativePath));
        } else {
          files.push({
            local: fullPath,
            remote: relativePath.replace(/\\/g, '/') // Convert Windows paths
          });
        }
      } catch (error) {
        console.log(`⚠️  Skip: ${fullPath} (permission denied)`);
      }
    }
  } catch (error) {
    console.log(`⚠️  Cannot read directory: ${dir}`);
  }
  
  return files;
}

async function uploadEverything() {
  console.log('🚀 UPLOADING ABSOLUTELY EVERYTHING TO GITHUB');
  console.log('Repository: aresonline18/webofficial');
  console.log('This includes ALL files and directories (except .git)\n');
  
  // Get absolutely all files
  const allFiles = getAllFiles('.');
  console.log(`📊 Found ${allFiles.length} files to upload\n`);
  
  let uploaded = 0;
  let failed = 0;
  let skipped = 0;
  
  // Upload one file at a time to avoid rate limits
  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    
    if (i % 50 === 0) {
      console.log(`\n--- Progress: ${i + 1}/${allFiles.length} files ---`);
    }
    
    const success = await uploadFile(file.local, file.remote);
    if (success) {
      uploaded++;
    } else {
      failed++;
    }
    
    // Small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Longer pause every 20 files
    if ((i + 1) % 20 === 0) {
      console.log('⏳ Rate limit pause...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n🎉 COMPLETE PROJECT UPLOAD FINISHED!');
  console.log(`📊 Final Results:`);
  console.log(`   ✅ Uploaded: ${uploaded} files`);
  console.log(`   ❌ Failed: ${failed} files`);
  console.log(`   📈 Success rate: ${Math.round((uploaded/(uploaded+failed))*100)}%`);
  console.log('\n🌐 Everything uploaded to:');
  console.log('   https://github.com/aresonline18/webofficial');
  console.log('\n📁 Repository now contains:');
  console.log('   • Complete source code');
  console.log('   • All configuration files');
  console.log('   • All documentation');
  console.log('   • All assets and uploads');
  console.log('   • All build scripts');
  console.log('   • All development files');
  console.log('   • All attached assets');
  console.log('   • Everything from this project');
}

if (require.main === module) {
  uploadEverything().catch(error => {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  });
}