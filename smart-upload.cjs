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
      'User-Agent': 'Smart-Upload'
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
    if (!fs.existsSync(localPath)) return false;
    
    const stats = fs.statSync(localPath);
    if (stats.isDirectory()) return false;
    if (stats.size > 50 * 1024 * 1024) return false;

    const content = fs.readFileSync(localPath, 'base64');
    
    // Check if file exists first
    const existing = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`);
    
    const body = {
      message: `Upload ${remotePath}`,
      content: content,
      branch: BRANCH
    };
    
    if (existing.ok) {
      const existingData = await existing.json();
      body.sha = existingData.sha;
    }

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

function getPriorityFiles() {
  const priorityPatterns = [
    // Essential project files
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'drizzle.config.ts',
    'README.md',
    'replit.md',
    '.env.example',
    '.gitignore',
    
    // Core source code
    'client/**/*',
    'server/**/*',
    'shared/**/*',
    'public/**/*',
    
    // Resources and uploads
    'resource-templates/**/*',
    'uploads/**/*',
    
    // Documentation
    '*.md',
    
    // Deployment configs
    'netlify.toml',
    'vercel.json',
    'railway.json',
    'Dockerfile',
    '_redirects',
    
    // Build scripts
    '*.cjs',
    '*.js'
  ];
  
  return priorityPatterns;
}

function getAllProjectFiles() {
  const files = [];
  
  function scanDirectory(dir, baseDir = '') {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = baseDir ? path.join(baseDir, item) : item;
        
        // Skip system directories
        if (item === '.git' || item === 'node_modules' || item.startsWith('.cache') || item.startsWith('.local')) {
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

function matchesPattern(filePath, pattern) {
  if (pattern.includes('**/*')) {
    const dirPattern = pattern.replace('/**/*', '');
    return filePath.startsWith(dirPattern + '/');
  }
  if (pattern.includes('*')) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return regex.test(filePath);
  }
  return filePath === pattern;
}

async function smartUpload() {
  console.log('🚀 SMART PROJECT UPLOAD TO GITHUB');
  console.log('Repository: aresonline18/webofficial');
  console.log('Uploading project files first, then everything else\n');
  
  const allFiles = getAllProjectFiles();
  const priorityPatterns = getPriorityFiles();
  
  // Separate priority and other files
  const priorityFiles = [];
  const otherFiles = [];
  
  for (const file of allFiles) {
    let isPriority = false;
    for (const pattern of priorityPatterns) {
      if (matchesPattern(file.remote, pattern)) {
        isPriority = true;
        break;
      }
    }
    
    if (isPriority) {
      priorityFiles.push(file);
    } else {
      otherFiles.push(file);
    }
  }
  
  console.log(`📊 Priority files: ${priorityFiles.length}`);
  console.log(`📊 Other files: ${otherFiles.length}`);
  console.log(`📊 Total files: ${allFiles.length}\n`);
  
  let uploaded = 0;
  let failed = 0;
  
  // Upload priority files first
  console.log('🎯 UPLOADING PRIORITY FILES (Core Project)...\n');
  
  for (let i = 0; i < priorityFiles.length; i++) {
    const file = priorityFiles[i];
    
    if (i % 50 === 0 && i > 0) {
      console.log(`\n--- Priority Progress: ${i}/${priorityFiles.length} ---`);
    }
    
    const success = await uploadFile(file.local, file.remote);
    if (success) {
      uploaded++;
    } else {
      failed++;
    }
    
    // Shorter delay for priority files
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Rate limit pause every 20 files
    if ((i + 1) % 20 === 0) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`\n✅ PRIORITY FILES COMPLETE: ${uploaded}/${priorityFiles.length} uploaded\n`);
  
  // Now upload remaining files
  console.log('📦 UPLOADING REMAINING FILES...\n');
  
  for (let i = 0; i < otherFiles.length; i++) {
    const file = otherFiles[i];
    
    if (i % 100 === 0 && i > 0) {
      console.log(`\n--- Other Progress: ${i}/${otherFiles.length} ---`);
    }
    
    const success = await uploadFile(file.local, file.remote);
    if (success) {
      uploaded++;
    } else {
      failed++;
    }
    
    // Standard delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Rate limit pause every 15 files
    if ((i + 1) % 15 === 0) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n🎉 COMPLETE PROJECT UPLOAD FINISHED!');
  console.log(`📊 Final Results:`);
  console.log(`   ✅ Total uploaded: ${uploaded}`);
  console.log(`   ❌ Total failed: ${failed}`);
  console.log(`   📈 Success rate: ${Math.round((uploaded/(uploaded+failed))*100)}%`);
  console.log('\n🌐 Repository: https://github.com/aresonline18/webofficial');
  console.log('✅ Your complete Shadow Pages project is now on GitHub!');
}

async function runContinuously() {
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    try {
      await smartUpload();
      console.log('\n✅ Upload completed successfully!');
      break;
    } catch (error) {
      attempts++;
      console.log(`\n⚠️  Upload interrupted: ${error.message}`);
      if (attempts < maxAttempts) {
        console.log(`🔄 Restarting (attempt ${attempts + 1}/${maxAttempts})...\n`);
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }
}

if (require.main === module) {
  runContinuously();
}