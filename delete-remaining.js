#!/usr/bin/env node

import https from 'https';

const GITHUB_TOKEN = "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";
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';

async function getAllFilesRecursive(path = '') {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Repo-Cleaner'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const items = JSON.parse(data);
          resolve(Array.isArray(items) ? items : []);
        } catch (e) {
          resolve([]);
        }
      });
    });
    req.on('error', () => resolve([]));
    req.end();
  });
}

async function deleteFile(path, sha) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      message: `Delete ${path}`,
      sha: sha
    });

    const req = https.request({
      hostname: 'api.github.com',
      path: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}`,
      method: 'DELETE',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Repo-Cleaner',
        'Content-Type': 'application/json'
      }
    }, (res) => {
      console.log(`${res.statusCode === 200 ? '✅' : '❌'} ${path}`);
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => {
      console.log(`❌ ${path} (error)`);
      resolve(false);
    });
    
    req.write(postData);
    req.end();
  });
}

async function deleteDirectory(dirPath) {
  console.log(`📂 Processing directory: ${dirPath}`);
  const items = await getAllFilesRecursive(dirPath);
  
  // First delete all files in subdirectories recursively
  for (const item of items) {
    if (item.type === 'dir') {
      await deleteDirectory(item.path);
    }
  }
  
  // Then delete all files in current directory
  const files = items.filter(item => item.type === 'file');
  for (const file of files) {
    await deleteFile(file.path, file.sha);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

async function cleanupRemaining() {
  console.log('🧹 Cleaning up remaining directories...');
  
  const rootItems = await getAllFilesRecursive();
  const directories = rootItems.filter(item => item.type === 'dir');
  
  console.log(`Found ${directories.length} directories to clean`);
  
  for (const dir of directories) {
    await deleteDirectory(dir.path);
  }
  
  // Final check
  const finalCheck = await getAllFilesRecursive();
  console.log(`\n${finalCheck.length === 0 ? '🎉 Repository is completely empty!' : `⚠️  ${finalCheck.length} items still remain`}`);
  
  if (finalCheck.length > 0) {
    console.log('Remaining items:');
    finalCheck.forEach(item => console.log(`  - ${item.name} (${item.type})`));
  }
}

cleanupRemaining();