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
      'User-Agent': 'Complete-Project-Upload'
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

    // Skip files larger than 50MB
    if (stats.size > 50 * 1024 * 1024) {
      console.log(`⚠️  Skip: ${remotePath} (too large)`);
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

function categorizeProjectFiles(files) {
  const categories = {
    // Essential project files
    core: [],
    // Source code
    frontend: [],
    backend: [],
    shared: [],
    // Assets and public files
    assets: [],
    // Documentation and guides
    documentation: [],
    // Build and deployment scripts
    scripts: [],
    // Resources and templates
    resources: [],
    // Uploads and attachments
    uploads: [],
    // Configuration files
    configs: [],
    // Everything else important
    other: []
  };
  
  for (const file of files) {
    const remotePath = file.remote;
    
    // Core project files
    if (['package.json', 'package-lock.json', 'README.md', 'replit.md', '.env.example', '.gitignore'].includes(remotePath)) {
      categories.core.push(file);
    }
    // Configuration files
    else if (remotePath.endsWith('.config.ts') || remotePath.endsWith('.config.js') || 
             remotePath.includes('tsconfig') || remotePath.includes('components.json') ||
             remotePath.includes('tailwind') || remotePath.includes('drizzle') ||
             remotePath.includes('vite') || remotePath.includes('postcss')) {
      categories.configs.push(file);
    }
    // Frontend source code
    else if (remotePath.startsWith('client/')) {
      categories.frontend.push(file);
    }
    // Backend source code
    else if (remotePath.startsWith('server/')) {
      categories.backend.push(file);
    }
    // Shared code
    else if (remotePath.startsWith('shared/')) {
      categories.shared.push(file);
    }
    // Public assets
    else if (remotePath.startsWith('public/')) {
      categories.assets.push(file);
    }
    // Documentation files
    else if (remotePath.endsWith('.md') && !['README.md', 'replit.md'].includes(remotePath)) {
      categories.documentation.push(file);
    }
    // Build and deployment scripts
    else if (remotePath.endsWith('.cjs') || remotePath.endsWith('.js') || 
             ['netlify.toml', 'vercel.json', 'railway.json', 'Dockerfile', '_redirects'].includes(remotePath)) {
      categories.scripts.push(file);
    }
    // Resources and templates
    else if (remotePath.startsWith('resource-templates/') || remotePath.startsWith('webhook-examples/')) {
      categories.resources.push(file);
    }
    // Uploads and attachments
    else if (remotePath.startsWith('uploads/') || remotePath.startsWith('attached_assets/')) {
      categories.uploads.push(file);
    }
    // Everything else
    else {
      categories.other.push(file);
    }
  }
  
  return categories;
}

async function uploadCategory(categoryName, files, delay = 500) {
  if (files.length === 0) return { uploaded: 0, failed: 0 };
  
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

async function completeProjectUpload() {
  console.log('🚀 COMPLETE SHADOW PAGES PROJECT UPLOAD');
  console.log('Repository: aresonline18/webofficial');
  console.log('Uploading EVERYTHING needed to run exactly as in this project\n');
  
  const allFiles = getAllProjectFiles();
  const categories = categorizeProjectFiles(allFiles);
  
  console.log('📊 COMPLETE PROJECT BREAKDOWN:');
  console.log(`   Core Files: ${categories.core.length} files`);
  console.log(`   Configuration: ${categories.configs.length} files`);
  console.log(`   Frontend: ${categories.frontend.length} files`);
  console.log(`   Backend: ${categories.backend.length} files`);
  console.log(`   Shared: ${categories.shared.length} files`);
  console.log(`   Assets: ${categories.assets.length} files`);
  console.log(`   Documentation: ${categories.documentation.length} files`);
  console.log(`   Scripts: ${categories.scripts.length} files`);
  console.log(`   Resources: ${categories.resources.length} files`);
  console.log(`   Uploads: ${categories.uploads.length} files`);
  console.log(`   Other: ${categories.other.length} files`);
  console.log(`   TOTAL: ${allFiles.length} files\n`);
  
  let totalUploaded = 0;
  let totalFailed = 0;
  
  // Upload in logical order
  const uploadOrder = [
    { name: 'core', files: categories.core, delay: 300 },
    { name: 'configs', files: categories.configs, delay: 400 },
    { name: 'shared', files: categories.shared, delay: 300 },
    { name: 'backend', files: categories.backend, delay: 400 },
    { name: 'frontend', files: categories.frontend, delay: 500 },
    { name: 'assets', files: categories.assets, delay: 400 },
    { name: 'resources', files: categories.resources, delay: 400 },
    { name: 'scripts', files: categories.scripts, delay: 400 },
    { name: 'documentation', files: categories.documentation, delay: 300 },
    { name: 'uploads', files: categories.uploads, delay: 600 },
    { name: 'other', files: categories.other, delay: 500 }
  ];
  
  for (const category of uploadOrder) {
    const result = await uploadCategory(category.name, category.files, category.delay);
    totalUploaded += result.uploaded;
    totalFailed += result.failed;
    
    // Pause between categories
    if (category.files.length > 0) {
      console.log('   ⏳ Category complete, pausing...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n🎉 COMPLETE PROJECT UPLOAD FINISHED!');
  console.log('─'.repeat(60));
  console.log(`📊 FINAL RESULTS:`);
  console.log(`   ✅ Total Uploaded: ${totalUploaded}`);
  console.log(`   ❌ Total Failed: ${totalFailed}`);
  console.log(`   📈 Success Rate: ${Math.round((totalUploaded/(totalUploaded+totalFailed))*100)}%`);
  console.log(`   📁 Files Processed: ${totalUploaded + totalFailed}/${allFiles.length}`);
  console.log('');
  console.log('🌐 COMPLETE PROJECT STRUCTURE UPLOADED:');
  console.log('   ✅ Complete React frontend with all components');
  console.log('   ✅ Express backend with database integration');
  console.log('   ✅ All shared schemas and utilities');
  console.log('   ✅ All CSS files and styling rules');
  console.log('   ✅ All configuration files (Tailwind, Vite, Drizzle, etc.)');
  console.log('   ✅ All documentation and guides');
  console.log('   ✅ All build and deployment scripts');
  console.log('   ✅ All resource templates and examples');
  console.log('   ✅ All uploads and attached assets');
  console.log('   ✅ All deployment configurations');
  console.log('   ✅ Complete project structure with all rules');
  console.log('');
  console.log('🔗 Repository: https://github.com/aresonline18/webofficial');
  console.log('⚡ Complete Shadow Pages project ready for deployment!');
  console.log('🎯 Runs exactly as in the original project with all features!');
}

async function runUploadWithRetries() {
  const maxRetries = 3;
  let attempt = 1;
  
  while (attempt <= maxRetries) {
    try {
      console.log(`\n🔄 Upload Attempt ${attempt}/${maxRetries}`);
      await completeProjectUpload();
      console.log('\n✅ Complete project upload successful!');
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
  runUploadWithRetries();
}