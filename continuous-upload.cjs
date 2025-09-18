#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';
const BATCH_SIZE = 50; // Upload 50 files at a time

async function githubRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Continuous-Upload'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const fetch = (await import('node-fetch')).default;
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

async function checkFileExists(filePath) {
  try {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

function getAllProjectFiles() {
  const files = [];
  
  function scanDir(dirPath, basePath = '') {
    const items = fs.readdirSync(dirPath);
    const skipDirs = ['node_modules', '.git', '.replit_process', '.replit_data', '.cache', '.upm', '.local'];
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = basePath ? `${basePath}/${item}` : item;
      
      if (fs.statSync(fullPath).isDirectory()) {
        if (!skipDirs.includes(item)) {
          scanDir(fullPath, relativePath);
        }
      } else {
        const stats = fs.statSync(fullPath);
        if (stats.size <= 25 * 1024 * 1024) { // 25MB limit
          files.push({
            localPath: fullPath,
            remotePath: relativePath,
            size: stats.size
          });
        }
      }
    }
  }
  
  scanDir('.');
  return files;
}

async function uploadFile(file) {
  try {
    const content = fs.readFileSync(file.localPath, 'base64');
    const sha = await getFileSha(file.remotePath);
    
    const body = {
      message: `Complete upload: ${file.remotePath}`,
      content: content,
      branch: BRANCH
    };
    
    if (sha) body.sha = sha;

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file.remotePath}`,
      'PUT',
      body
    );
    
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function batchUpload() {
  console.log('🚀 CONTINUOUS BATCH UPLOAD STARTING...');
  
  const allFiles = getAllProjectFiles();
  console.log(`📦 Total files found: ${allFiles.length}`);
  
  // Check which files are missing
  const missingFiles = [];
  console.log('🔍 Checking which files need upload...');
  
  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    const exists = await checkFileExists(file.remotePath);
    if (!exists) {
      missingFiles.push(file);
    }
    
    if (i % 50 === 0) {
      console.log(`   Checked ${i + 1}/${allFiles.length} files...`);
    }
  }
  
  console.log(`📋 Files to upload: ${missingFiles.length}`);
  
  if (missingFiles.length === 0) {
    console.log('✅ ALL FILES ALREADY UPLOADED!');
    return;
  }
  
  // Upload in batches
  let totalUploaded = 0;
  
  for (let i = 0; i < missingFiles.length; i += BATCH_SIZE) {
    const batch = missingFiles.slice(i, i + BATCH_SIZE);
    console.log(`\n📦 BATCH ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(missingFiles.length / BATCH_SIZE)}`);
    console.log(`   Uploading ${batch.length} files...`);
    
    for (const file of batch) {
      console.log(`📤 ${file.remotePath} (${(file.size / 1024).toFixed(1)}KB)`);
      const success = await uploadFile(file);
      
      if (success) {
        console.log(`✅ Uploaded: ${file.remotePath}`);
        totalUploaded++;
      } else {
        console.log(`❌ Failed: ${file.remotePath}`);
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`✅ Batch complete: ${totalUploaded} total uploaded`);
  }
  
  console.log(`\n🎉 UPLOAD COMPLETE!`);
  console.log(`✅ Uploaded: ${totalUploaded}/${missingFiles.length} files`);
  console.log(`🌐 Repository: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
}

if (require.main === module) {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN required');
    process.exit(1);
  }
  
  batchUpload().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}