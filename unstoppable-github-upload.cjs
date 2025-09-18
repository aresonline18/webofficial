#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = "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";
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';

// GitHub API limits handling
const API_LIMITS = {
  REQUESTS_PER_HOUR: 5000,
  REQUESTS_PER_MINUTE: 100,
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  CHUNK_SIZE: 20, // Files per chunk
  RETRY_COUNT: 5,
  BASE_DELAY: 1000 // 1 second
};

let requestCount = 0;
let lastRequestTime = Date.now();
let progressData = {
  uploaded: 0,
  failed: 0,
  completed: new Set(),
  lastSave: Date.now()
};

async function githubRequest(endpoint, method = 'GET', body = null, retryCount = 0) {
  const url = `https://api.github.com${endpoint}`;
  
  // Rate limiting check
  await enforceRateLimit();
  
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

  try {
    const response = await fetch(url, options);
    requestCount++;
    
    if (response.status === 403) {
      const resetTime = response.headers.get('x-ratelimit-reset');
      if (resetTime) {
        const waitTime = (parseInt(resetTime) * 1000) - Date.now() + 5000; // 5s buffer
        console.log(`⏳ Rate limit hit. Waiting ${Math.round(waitTime/1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return await githubRequest(endpoint, method, body, retryCount);
      }
    }
    
    if (response.status === 409 && retryCount < API_LIMITS.RETRY_COUNT) {
      // Conflict - file might exist, exponential backoff
      const delay = API_LIMITS.BASE_DELAY * Math.pow(2, retryCount);
      console.log(`⚠️  Conflict detected. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return await githubRequest(endpoint, method, body, retryCount + 1);
    }
    
    if (!response.ok && retryCount < API_LIMITS.RETRY_COUNT) {
      const delay = API_LIMITS.BASE_DELAY * Math.pow(2, retryCount);
      console.log(`⚠️  Request failed (${response.status}). Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return await githubRequest(endpoint, method, body, retryCount + 1);
    }
    
    return response;
  } catch (error) {
    if (retryCount < API_LIMITS.RETRY_COUNT) {
      const delay = API_LIMITS.BASE_DELAY * Math.pow(2, retryCount);
      console.log(`⚠️  Network error: ${error.message}. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return await githubRequest(endpoint, method, body, retryCount + 1);
    }
    throw error;
  }
}

async function enforceRateLimit() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  // Ensure minimum 600ms between requests (100 requests/minute)
  const minDelay = 600;
  if (timeSinceLastRequest < minDelay) {
    await new Promise(resolve => setTimeout(resolve, minDelay - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
}

async function getExistingFileSha(remotePath) {
  try {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`);
    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
  } catch (error) {
    // File doesn't exist
  }
  return null;
}

async function uploadSingleFile(localPath, remotePath) {
  try {
    if (!fs.existsSync(localPath)) {
      return { success: false, reason: 'file not found' };
    }

    const stats = fs.statSync(localPath);
    if (stats.isDirectory()) {
      return { success: false, reason: 'is directory' };
    }

    if (stats.size > API_LIMITS.MAX_FILE_SIZE) {
      return { success: false, reason: 'file too large' };
    }

    const content = fs.readFileSync(localPath, 'base64');
    const sha = await getExistingFileSha(remotePath);
    
    const body = {
      message: `Upload ${remotePath}`,
      content: content,
      branch: BRANCH
    };
    
    if (sha) {
      body.sha = sha;
    }

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ ${remotePath}`);
      progressData.uploaded++;
      progressData.completed.add(remotePath);
      return { success: true };
    } else {
      console.log(`❌ ${remotePath} - Status: ${response.status}`);
      progressData.failed++;
      return { success: false, reason: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.log(`❌ ${remotePath} - ${error.message}`);
    progressData.failed++;
    return { success: false, reason: error.message };
  }
}

async function uploadChunk(files, chunkIndex, totalChunks) {
  console.log(`\n📦 CHUNK ${chunkIndex + 1}/${totalChunks} (${files.length} files)`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Skip if already uploaded
    if (progressData.completed.has(file.remote)) {
      console.log(`⏭️  Skip: ${file.remote} (already uploaded)`);
      continue;
    }
    
    await uploadSingleFile(file.local, file.remote);
    
    // Save progress every 10 files
    if ((progressData.uploaded + progressData.failed) % 10 === 0) {
      saveProgress();
    }
  }
  
  console.log(`✅ Chunk ${chunkIndex + 1} complete`);
  saveProgress();
}

function getAllProjectFiles() {
  const files = [];
  
  function scanDirectory(dir, baseDir = '') {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = baseDir ? path.join(baseDir, item) : item;
        
        // Skip only .git and node_modules
        if (item === '.git' || item === 'node_modules') {
          continue;
        }
        
        try {
          const stats = fs.statSync(fullPath);
          
          if (stats.isDirectory()) {
            scanDirectory(fullPath, relativePath);
          } else {
            files.push({
              local: fullPath,
              remote: relativePath.replace(/\\/g, '/'),
              size: stats.size
            });
          }
        } catch (error) {
          // Skip inaccessible files
        }
      }
    } catch (error) {
      // Skip inaccessible directories
    }
  }
  
  scanDirectory('.');
  return files;
}

function loadProgress() {
  try {
    if (fs.existsSync('.upload-progress.json')) {
      const data = JSON.parse(fs.readFileSync('.upload-progress.json', 'utf8'));
      progressData.uploaded = data.uploaded || 0;
      progressData.failed = data.failed || 0;
      progressData.completed = new Set(data.completed || []);
      console.log(`📊 Resuming from: ${progressData.uploaded} uploaded, ${progressData.failed} failed`);
    }
  } catch (error) {
    console.log('⚠️  Could not load progress, starting fresh');
  }
}

function saveProgress() {
  try {
    fs.writeFileSync('.upload-progress.json', JSON.stringify({
      uploaded: progressData.uploaded,
      failed: progressData.failed,
      completed: Array.from(progressData.completed),
      timestamp: new Date().toISOString()
    }));
    progressData.lastSave = Date.now();
  } catch (error) {
    console.log('⚠️  Could not save progress');
  }
}

function createChunks(files, chunkSize) {
  const chunks = [];
  for (let i = 0; i < files.length; i += chunkSize) {
    chunks.push(files.slice(i, i + chunkSize));
  }
  return chunks;
}

async function unstoppableUpload() {
  console.log('🚀 UNSTOPPABLE GITHUB UPLOAD');
  console.log('Will handle rate limits and upload ALL 935 files');
  console.log('Repository: aresonline18/webofficial\n');
  
  loadProgress();
  
  const allFiles = getAllProjectFiles();
  const remainingFiles = allFiles.filter(file => !progressData.completed.has(file.remote));
  
  console.log(`📊 UPLOAD STATUS:`);
  console.log(`   Total files: ${allFiles.length}`);
  console.log(`   Already uploaded: ${progressData.completed.size}`);
  console.log(`   Remaining: ${remainingFiles.length}`);
  console.log(`   Failed so far: ${progressData.failed}\n`);
  
  if (remainingFiles.length === 0) {
    console.log('🎉 ALL FILES ALREADY UPLOADED!');
    return;
  }
  
  const chunks = createChunks(remainingFiles, API_LIMITS.CHUNK_SIZE);
  console.log(`📦 Split into ${chunks.length} chunks of ${API_LIMITS.CHUNK_SIZE} files each\n`);
  
  for (let i = 0; i < chunks.length; i++) {
    try {
      await uploadChunk(chunks[i], i, chunks.length);
      
      // Progress report every 5 chunks
      if ((i + 1) % 5 === 0) {
        console.log(`\n📈 PROGRESS REPORT:`);
        console.log(`   Chunks completed: ${i + 1}/${chunks.length}`);
        console.log(`   Files uploaded: ${progressData.uploaded}`);
        console.log(`   Files failed: ${progressData.failed}`);
        console.log(`   Success rate: ${Math.round((progressData.uploaded/(progressData.uploaded+progressData.failed))*100)}%\n`);
      }
      
      // Pause between chunks to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.log(`⚠️  Chunk ${i + 1} failed: ${error.message}`);
      console.log('🔄 Continuing with next chunk...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  console.log('\n🎉 UPLOAD PROCESS COMPLETE!');
  console.log('─'.repeat(60));
  console.log(`📊 FINAL RESULTS:`);
  console.log(`   ✅ Total uploaded: ${progressData.uploaded}`);
  console.log(`   ❌ Total failed: ${progressData.failed}`);
  console.log(`   📈 Success rate: ${Math.round((progressData.uploaded/(progressData.uploaded+progressData.failed))*100)}%`);
  console.log(`   📁 Total processed: ${progressData.uploaded + progressData.failed}/${allFiles.length}`);
  console.log('\n🌐 Repository: https://github.com/aresonline18/webofficial');
  console.log('⚡ Complete Shadow Pages project with all 935 files!');
  
  // Clean up progress file on success
  try {
    fs.unlinkSync('.upload-progress.json');
  } catch (error) {
    // Ignore cleanup errors
  }
}

async function runWithAutoRestart() {
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
      
      if (restartCount < maxRestarts) {
        console.log(`🔄 Auto-restarting (${restartCount}/${maxRestarts})...`);
        await new Promise(resolve => setTimeout(resolve, 10000));
      } else {
        console.log('❌ Maximum restarts reached. Check logs and try again.');
      }
    }
  }
}

if (require.main === module) {
  runWithAutoRestart();
}