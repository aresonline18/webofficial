#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const GITHUB_TOKEN = "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";
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';

// Progress tracking
let progressFile = '.upload-progress.json';
let totalUploaded = 0;
let totalFailed = 0;

async function githubRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com${endpoint}`;
  const fetch = (await import('node-fetch')).default;
  
  const options = {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Unstoppable-Upload'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return response;
}

async function uploadFile(localPath, remotePath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (!fs.existsSync(localPath)) {
        return { success: false, reason: 'not found' };
      }

      const stats = fs.statSync(localPath);
      if (stats.isDirectory()) {
        return { success: false, reason: 'directory' };
      }

      if (stats.size > 50 * 1024 * 1024) {
        return { success: false, reason: 'too large' };
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
        return { success: true };
      } else if (response.status === 409) {
        // File already exists, try to update it
        try {
          const existing = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`);
          if (existing.ok) {
            const existingData = await existing.json();
            body.sha = existingData.sha;
            
            const updateResponse = await githubRequest(
              `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
              'PUT',
              body
            );
            
            if (updateResponse.ok) {
              console.log(`✅ ${remotePath} (updated)`);
              return { success: true };
            }
          }
        } catch (updateError) {
          // Continue to retry logic
        }
      }
      
      if (attempt < retries) {
        console.log(`⚠️  ${remotePath} (attempt ${attempt}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
      } else {
        console.log(`❌ ${remotePath}`);
        return { success: false, reason: 'upload failed' };
      }
      
    } catch (error) {
      if (attempt < retries) {
        console.log(`⚠️  ${remotePath} - ${error.message} (attempt ${attempt}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
      } else {
        console.log(`❌ ${remotePath} - ${error.message}`);
        return { success: false, reason: error.message };
      }
    }
  }
  
  return { success: false, reason: 'max retries exceeded' };
}

function getAllFiles(dir, baseDir = '') {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = baseDir ? path.join(baseDir, item) : item;
      
      // Only skip .git directory
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
            remote: relativePath.replace(/\\/g, '/'),
            size: stats.size
          });
        }
      } catch (error) {
        // Skip files we can't access
      }
    }
  } catch (error) {
    // Skip directories we can't read
  }
  
  return files;
}

function loadProgress() {
  try {
    if (fs.existsSync(progressFile)) {
      const data = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
      totalUploaded = data.uploaded || 0;
      totalFailed = data.failed || 0;
      return new Set(data.completed || []);
    }
  } catch (error) {
    // Start fresh if can't load progress
  }
  return new Set();
}

function saveProgress(completedFiles) {
  try {
    fs.writeFileSync(progressFile, JSON.stringify({
      uploaded: totalUploaded,
      failed: totalFailed,
      completed: Array.from(completedFiles),
      lastUpdate: new Date().toISOString()
    }));
  } catch (error) {
    // Continue without saving if we can't write
  }
}

async function unstoppableUpload() {
  console.log('🚀 UNSTOPPABLE UPLOAD - WILL NOT STOP UNTIL EVERYTHING IS UPLOADED');
  console.log('Repository: aresonline18/webofficial');
  console.log('This script will retry on timeouts and failures\n');
  
  const allFiles = getAllFiles('.');
  const completedFiles = loadProgress();
  
  const remainingFiles = allFiles.filter(file => !completedFiles.has(file.remote));
  
  console.log(`📊 Total files: ${allFiles.length}`);
  console.log(`📊 Already uploaded: ${completedFiles.size}`);
  console.log(`📊 Remaining: ${remainingFiles.length}\n`);
  
  if (remainingFiles.length === 0) {
    console.log('🎉 ALL FILES ALREADY UPLOADED!');
    return;
  }
  
  let batchNumber = 1;
  const batchSize = 10;
  
  for (let i = 0; i < remainingFiles.length; i += batchSize) {
    const batch = remainingFiles.slice(i, i + batchSize);
    
    console.log(`\n--- BATCH ${batchNumber} (${i + 1}-${Math.min(i + batchSize, remainingFiles.length)}/${remainingFiles.length}) ---`);
    
    for (const file of batch) {
      const result = await uploadFile(file.local, file.remote);
      
      if (result.success) {
        totalUploaded++;
        completedFiles.add(file.remote);
      } else {
        totalFailed++;
      }
      
      // Save progress frequently
      if ((totalUploaded + totalFailed) % 20 === 0) {
        saveProgress(completedFiles);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Longer pause between batches
    console.log(`⏳ Batch complete. Pausing before next batch...`);
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    batchNumber++;
    saveProgress(completedFiles);
  }
  
  // Final save and summary
  saveProgress(completedFiles);
  
  console.log('\n🎉 UPLOAD PROCESS COMPLETE!');
  console.log(`📊 Final Results:`);
  console.log(`   ✅ Total uploaded: ${totalUploaded}`);
  console.log(`   ❌ Total failed: ${totalFailed}`);
  console.log(`   📈 Success rate: ${Math.round((totalUploaded/(totalUploaded+totalFailed))*100)}%`);
  console.log(`   📁 Files processed: ${totalUploaded + totalFailed}/${allFiles.length}`);
  console.log('\n🌐 Everything uploaded to: https://github.com/aresonline18/webofficial');
  
  // Clean up progress file
  try {
    fs.unlinkSync(progressFile);
  } catch (error) {
    // Ignore cleanup errors
  }
}

// Self-restarting wrapper
async function runWithRestart() {
  const maxRestarts = 10;
  let restartCount = 0;
  
  while (restartCount < maxRestarts) {
    try {
      await unstoppableUpload();
      console.log('\n✅ Upload completed successfully!');
      break;
    } catch (error) {
      restartCount++;
      console.log(`\n⚠️  Process interrupted: ${error.message}`);
      console.log(`🔄 Restarting (attempt ${restartCount}/${maxRestarts})...\n`);
      
      // Wait before restart
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  if (restartCount >= maxRestarts) {
    console.log('❌ Maximum restarts reached. Please check the logs and try again.');
  }
}

if (require.main === module) {
  runWithRestart();
}