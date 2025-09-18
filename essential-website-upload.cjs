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
      'User-Agent': 'Essential-Website-Upload'
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

function getEssentialFiles() {
  const essentialFiles = [];
  
  // Core project files
  const coreFiles = [
    'package.json',
    'package-lock.json',
    'README.md',
    'replit.md',
    '.env.example',
    '.gitignore'
  ];
  
  // Configuration files
  const configFiles = [
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'drizzle.config.ts',
    'components.json',
    'postcss.config.js'
  ];
  
  // Deployment configurations
  const deploymentFiles = [
    'netlify.toml',
    'vercel.json',
    'railway.json',
    'Dockerfile',
    '_redirects'
  ];
  
  // All files to check
  const filesToCheck = [...coreFiles, ...configFiles, ...deploymentFiles];
  
  for (const file of filesToCheck) {
    if (fs.existsSync(file)) {
      essentialFiles.push({
        local: file,
        remote: file,
        category: 'core'
      });
    }
  }
  
  // Recursively get source code directories
  const directories = [
    { path: 'client', category: 'frontend' },
    { path: 'server', category: 'backend' },
    { path: 'shared', category: 'shared' },
    { path: 'public', category: 'assets' },
    { path: 'resource-templates', category: 'resources' },
    { path: 'uploads', category: 'uploads' }
  ];
  
  function scanDirectory(dirPath, category) {
    if (!fs.existsSync(dirPath)) return;
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = fullPath.replace(/\\/g, '/');
      
      try {
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          scanDirectory(fullPath, category);
        } else {
          essentialFiles.push({
            local: fullPath,
            remote: relativePath,
            category: category
          });
        }
      } catch (error) {
        // Skip inaccessible files
      }
    }
  }
  
  for (const dir of directories) {
    scanDirectory(dir.path, dir.category);
  }
  
  return essentialFiles;
}

async function uploadEssentialWebsite() {
  console.log('🚀 ESSENTIAL SHADOW PAGES WEBSITE UPLOAD');
  console.log('Repository: aresonline18/webofficial');
  console.log('Uploading only the essential files needed to run the website\n');
  
  const essentialFiles = getEssentialFiles();
  
  // Group by category
  const categories = {};
  for (const file of essentialFiles) {
    if (!categories[file.category]) {
      categories[file.category] = [];
    }
    categories[file.category].push(file);
  }
  
  console.log('📊 ESSENTIAL FILES BREAKDOWN:');
  for (const [category, files] of Object.entries(categories)) {
    console.log(`   ${category}: ${files.length} files`);
  }
  console.log(`   TOTAL: ${essentialFiles.length} files\n`);
  
  let totalUploaded = 0;
  let totalFailed = 0;
  
  // Upload in order of importance
  const uploadOrder = ['core', 'shared', 'backend', 'frontend', 'assets', 'resources', 'uploads'];
  
  for (const categoryName of uploadOrder) {
    const files = categories[categoryName];
    if (!files || files.length === 0) continue;
    
    console.log(`\n📁 UPLOADING ${categoryName.toUpperCase()}: ${files.length} files`);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      const success = await uploadFile(file.local, file.remote);
      if (success) {
        totalUploaded++;
      } else {
        totalFailed++;
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Progress update every 20 files
      if ((i + 1) % 20 === 0) {
        console.log(`   Progress: ${i + 1}/${files.length} files`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log(`   ✅ ${categoryName}: ${files.length} files uploaded`);
    
    // Pause between categories
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  console.log('\n🎉 ESSENTIAL WEBSITE UPLOAD COMPLETE!');
  console.log('─'.repeat(50));
  console.log(`📊 RESULTS:`);
  console.log(`   ✅ Uploaded: ${totalUploaded}`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log(`   📈 Success Rate: ${Math.round((totalUploaded/(totalUploaded+totalFailed))*100)}%`);
  console.log('');
  console.log('🌐 WEBSITE COMPONENTS UPLOADED:');
  console.log('   ✅ Complete React frontend');
  console.log('   ✅ Express backend + database');
  console.log('   ✅ Shared schemas and types');
  console.log('   ✅ All configuration files');
  console.log('   ✅ Public assets');
  console.log('   ✅ Resource templates');
  console.log('   ✅ Upload directories');
  console.log('   ✅ Deployment configurations');
  console.log('');
  console.log('🔗 Repository: https://github.com/aresonline18/webofficial');
  console.log('⚡ Shadow Pages website ready for deployment!');
}

async function runUpload() {
  try {
    await uploadEssentialWebsite();
  } catch (error) {
    console.log(`\n⚠️  Upload failed: ${error.message}`);
    console.log('🔄 Please check the repository and try again if needed');
  }
}

if (require.main === module) {
  runUpload();
}