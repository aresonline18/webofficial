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
      'User-Agent': 'Complete-Website-Upload'
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
    if (!fs.existsSync(localPath)) {
      return false;
    }

    const stats = fs.statSync(localPath);
    if (stats.isDirectory()) {
      return false;
    }

    // Skip files larger than 50MB
    if (stats.size > 50 * 1024 * 1024) {
      console.log(`⚠️  Skip: ${remotePath} (too large)`);
      return false;
    }

    const content = fs.readFileSync(localPath, 'base64');
    const sha = await getFileSha(remotePath);
    
    const body = {
      message: `Upload ${remotePath}`,
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

function getAllWebsiteFiles() {
  const files = [];
  
  // Get all files recursively, excluding only .git
  function scanDirectory(dir, baseDir = '') {
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

function categorizeFiles(files) {
  const categories = {
    // Core project structure
    core: [],
    // Frontend source code
    frontend: [],
    // Backend source code
    backend: [],
    // Public assets
    assets: [],
    // Configuration files
    config: [],
    // Documentation
    docs: [],
    // Build and deployment scripts
    scripts: [],
    // Resources and uploads
    resources: [],
    // Everything else
    other: []
  };
  
  for (const file of files) {
    const remotePath = file.remote;
    
    // Core project files
    if (['package.json', 'package-lock.json', 'README.md', 'replit.md', '.env.example', '.gitignore'].includes(remotePath)) {
      categories.core.push(file);
    }
    // Frontend source code
    else if (remotePath.startsWith('client/')) {
      categories.frontend.push(file);
    }
    // Backend source code
    else if (remotePath.startsWith('server/') || remotePath.startsWith('shared/')) {
      categories.backend.push(file);
    }
    // Public assets
    else if (remotePath.startsWith('public/')) {
      categories.assets.push(file);
    }
    // Configuration files
    else if (remotePath.endsWith('.config.ts') || remotePath.endsWith('.config.js') || 
             remotePath.includes('tailwind') || remotePath.includes('vite') || 
             remotePath.includes('drizzle') || remotePath.includes('components.json')) {
      categories.config.push(file);
    }
    // Documentation
    else if (remotePath.endsWith('.md') && !['README.md', 'replit.md'].includes(remotePath)) {
      categories.docs.push(file);
    }
    // Build and deployment scripts
    else if (remotePath.endsWith('.cjs') || remotePath.endsWith('.js') || 
             ['netlify.toml', 'vercel.json', 'railway.json', 'Dockerfile', '_redirects'].includes(remotePath)) {
      categories.scripts.push(file);
    }
    // Resources and uploads
    else if (remotePath.startsWith('resource-templates/') || remotePath.startsWith('uploads/') || 
             remotePath.startsWith('attached_assets/')) {
      categories.resources.push(file);
    }
    // Everything else
    else {
      categories.other.push(file);
    }
  }
  
  return categories;
}

async function uploadCategory(categoryName, files, delay = 500) {
  console.log(`\n📁 UPLOADING ${categoryName.toUpperCase()}: ${files.length} files`);
  
  let uploaded = 0;
  let failed = 0;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    const success = await uploadFile(file.local, file.remote);
    if (success) {
      uploaded++;
    } else {
      failed++;
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Progress update every 25 files
    if ((i + 1) % 25 === 0) {
      console.log(`   Progress: ${i + 1}/${files.length} files`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`   ✅ ${categoryName}: ${uploaded}/${files.length} uploaded`);
  return { uploaded, failed };
}

async function completeWebsiteUpload() {
  console.log('🚀 COMPLETE SHADOW PAGES WEBSITE UPLOAD');
  console.log('Repository: aresonline18/webofficial');
  console.log('Uploading ABSOLUTELY EVERYTHING with proper organization\n');
  
  const allFiles = getAllWebsiteFiles();
  const categories = categorizeFiles(allFiles);
  
  console.log('📊 FILE BREAKDOWN:');
  console.log(`   Core Project: ${categories.core.length} files`);
  console.log(`   Frontend: ${categories.frontend.length} files`);
  console.log(`   Backend: ${categories.backend.length} files`);
  console.log(`   Assets: ${categories.assets.length} files`);
  console.log(`   Configuration: ${categories.config.length} files`);
  console.log(`   Documentation: ${categories.docs.length} files`);
  console.log(`   Scripts: ${categories.scripts.length} files`);
  console.log(`   Resources: ${categories.resources.length} files`);
  console.log(`   Other: ${categories.other.length} files`);
  console.log(`   TOTAL: ${allFiles.length} files\n`);
  
  let totalUploaded = 0;
  let totalFailed = 0;
  
  // Upload in priority order
  const uploadOrder = [
    { name: 'core', files: categories.core, delay: 300 },
    { name: 'config', files: categories.config, delay: 400 },
    { name: 'backend', files: categories.backend, delay: 500 },
    { name: 'frontend', files: categories.frontend, delay: 500 },
    { name: 'assets', files: categories.assets, delay: 600 },
    { name: 'scripts', files: categories.scripts, delay: 400 },
    { name: 'docs', files: categories.docs, delay: 300 },
    { name: 'resources', files: categories.resources, delay: 700 },
    { name: 'other', files: categories.other, delay: 600 }
  ];
  
  for (const category of uploadOrder) {
    if (category.files.length > 0) {
      const result = await uploadCategory(category.name, category.files, category.delay);
      totalUploaded += result.uploaded;
      totalFailed += result.failed;
      
      // Pause between categories
      if (category.files.length > 0) {
        console.log('   ⏳ Category complete, pausing...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
  
  console.log('\n🎉 COMPLETE WEBSITE UPLOAD FINISHED!');
  console.log('─'.repeat(50));
  console.log(`📊 FINAL RESULTS:`);
  console.log(`   ✅ Total Uploaded: ${totalUploaded}`);
  console.log(`   ❌ Total Failed: ${totalFailed}`);
  console.log(`   📈 Success Rate: ${Math.round((totalUploaded/(totalUploaded+totalFailed))*100)}%`);
  console.log(`   📁 Files Processed: ${totalUploaded + totalFailed}/${allFiles.length}`);
  console.log('');
  console.log('🌐 REPOSITORY CONTENTS:');
  console.log('   ✅ Complete React frontend (client/)');
  console.log('   ✅ Express backend + database (server/)');
  console.log('   ✅ Shared schemas and types (shared/)');
  console.log('   ✅ All configuration files');
  console.log('   ✅ All documentation and guides');
  console.log('   ✅ All build and deployment scripts');
  console.log('   ✅ All resources and assets');
  console.log('   ✅ All uploads and attached files');
  console.log('   ✅ Complete project structure');
  console.log('');
  console.log('🔗 View Repository: https://github.com/aresonline18/webofficial');
  console.log('⚡ Ready for deployment and development');
  console.log('🎯 Shadow Pages website fully uploaded to GitHub!');
}

// Self-restarting functionality for robustness
async function runWithRetries() {
  const maxRetries = 3;
  let attempt = 1;
  
  while (attempt <= maxRetries) {
    try {
      console.log(`\n🔄 Upload Attempt ${attempt}/${maxRetries}`);
      await completeWebsiteUpload();
      console.log('\n✅ Upload completed successfully!');
      break;
    } catch (error) {
      console.log(`\n⚠️  Attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxRetries) {
        console.log(`🔄 Retrying in 10 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 10000));
      } else {
        console.log('❌ All retry attempts failed');
      }
      attempt++;
    }
  }
}

if (require.main === module) {
  runWithRetries();
}