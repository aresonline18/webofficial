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
      'User-Agent': 'Final-GitHub-Upload'
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

function getProjectFiles() {
  const files = [];
  
  // Core project files to upload
  const filesToUpload = [
    // Root configuration files
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'postcss.config.js',
    'components.json',
    'drizzle.config.ts',
    '.env.example',
    '.gitignore',
    'README.md',
    'replit.md',
    
    // All client files
    ...getAllFilesInDir('client'),
    
    // All server files
    ...getAllFilesInDir('server'),
    
    // All shared files
    ...getAllFilesInDir('shared'),
    
    // Public assets
    ...getAllFilesInDir('public'),
    
    // Resource templates
    ...getAllFilesInDir('resource-templates'),
    
    // Uploads directory
    ...getAllFilesInDir('uploads'),
    
    // Deployment and documentation files
    'netlify.toml',
    'vercel.json',
    'railway.json',
    'Dockerfile',
    '_redirects',
    
    // All markdown documentation
    'AIRTABLE_IMAGE_HOSTING.md',
    'AIRTABLE_INTEGRATION_GUIDE.md',
    'BUTTON_STYLING_GUIDE.md',
    'COMPLETE_WEBHOOK_GUIDE.md',
    'DATABASE_FRONTEND_SYNC_VERIFICATION.md',
    'DEPLOYMENT_GUIDE.md',
    'ENHANCED_TRACKING_SYSTEM.md',
    'GITHUB_AUTHENTICATION_GUIDE.md',
    'GITHUB_DEPLOYMENT.md',
    'GITHUB_UPLOAD_SUCCESS.md',
    'INTEGRATION_README.md',
    'PRE_DEPLOYMENT_CHECKLIST.md',
    'PROJECT_INTEGRATION_PLAN.md',
    'QUICK_ADD_RESOURCE.md',
    'RESOURCE_DISPLAY_FIXES.md',
    'RESOURCE_MANAGEMENT.md',
    'RESOURCE_SYSTEM_SUMMARY.md',
    'RESOURCE_WORKFLOW.md',
    'SAFE_DEPLOYMENT_ANALYSIS.md',
    'URL_TRACKING_GUIDE.md',
    'WEBHOOK_INSTRUCTIONS.md',
    'WEBHOOK_SYSTEM.md',
    'upload-instructions.md'
  ];
  
  return filesToUpload.filter(file => fs.existsSync(file));
}

function getAllFilesInDir(dir) {
  if (!fs.existsSync(dir)) return [];
  
  const files = [];
  
  function traverse(currentDir, relativePath = '') {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const itemRelativePath = relativePath ? path.join(relativePath, item) : item;
      
      // Skip node_modules and other unwanted directories
      if (item === 'node_modules' || item === '.git' || item === 'dist' || item.startsWith('.')) {
        continue;
      }
      
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        traverse(fullPath, itemRelativePath);
      } else {
        files.push(path.join(dir, itemRelativePath).replace(/\\/g, '/'));
      }
    }
  }
  
  traverse(dir);
  return files;
}

async function finalGitHubUpload() {
  console.log('🚀 UPLOADING SHADOW PAGES PROJECT TO GITHUB');
  console.log('Repository: aresonline18/webofficial\n');
  
  const projectFiles = getProjectFiles();
  console.log(`📊 Found ${projectFiles.length} project files to upload\n`);
  
  let uploaded = 0;
  let failed = 0;
  
  // Upload in smaller batches
  const batchSize = 3;
  
  for (let i = 0; i < projectFiles.length; i += batchSize) {
    const batch = projectFiles.slice(i, i + batchSize);
    
    console.log(`--- Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(projectFiles.length/batchSize)} ---`);
    
    for (const file of batch) {
      const success = await uploadFile(file, file);
      if (success) {
        uploaded++;
      } else {
        failed++;
      }
      
      // Small delay between files
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Pause between batches
    if (i + batchSize < projectFiles.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n🎉 PROJECT UPLOAD COMPLETE!');
  console.log(`📊 Results: ${uploaded} uploaded, ${failed} failed`);
  console.log(`📈 Success rate: ${Math.round((uploaded/(uploaded+failed))*100)}%`);
  console.log('\n🌐 Repository contents uploaded:');
  console.log('✅ Complete React frontend (client/)');
  console.log('✅ Express backend (server/)');
  console.log('✅ Shared schemas (shared/)');
  console.log('✅ Configuration files');
  console.log('✅ Documentation');
  console.log('✅ Assets and uploads');
  console.log('✅ Deployment configurations');
  console.log('\n🔗 View at: https://github.com/aresonline18/webofficial');
}

if (require.main === module) {
  finalGitHubUpload().catch(error => {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  });
}