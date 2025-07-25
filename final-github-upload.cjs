#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';

// GitHub API helper
async function githubRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Shadow-Pages-Upload-Script'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const fetch = (await import('node-fetch')).default;
  const response = await fetch(url, options);
  
  return response;
}

// Check if file exists and get its SHA
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

// Get essential project files (core application only)
function getCoreProjectFiles() {
  const coreFiles = [
    // Root configuration files
    'package.json',
    'package-lock.json', 
    'tsconfig.json',
    'tailwind.config.ts',
    'vite.config.ts',
    'drizzle.config.ts',
    'components.json',
    'postcss.config.js',
    '.env.example',
    '.gitignore',
    
    // Documentation
    'README.md',
    'DEPLOYMENT_GUIDE.md',
    'GITHUB_DEPLOYMENT.md',
    
    // Docker
    'Dockerfile'
  ];

  const coreDirectories = [
    'client',
    'server', 
    'shared',
    'resource-templates',
    'webhook-examples'
  ];

  const files = [];
  
  // Add individual files
  coreFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      if (stats.size > 0) {
        files.push({
          localPath: file,
          remotePath: file,
          size: stats.size
        });
      }
    }
  });

  // Add directories recursively
  coreDirectories.forEach(dir => {
    if (fs.existsSync(dir)) {
      const dirFiles = getAllFilesInDir(dir);
      files.push(...dirFiles);
    }
  });

  return files;
}

// Get all files in a directory recursively
function getAllFilesInDir(dirPath, arrayOfFiles = [], basePath = '') {
  const files = fs.readdirSync(dirPath);
  
  const skipFiles = ['.DS_Store', 'Thumbs.db'];
  const skipExtensions = ['.log', '.lock', '.tmp', '.cache'];

  files.forEach((file) => {
    if (skipFiles.includes(file)) return;
    if (skipExtensions.some(ext => file.endsWith(ext))) return;

    const fullPath = path.join(dirPath, file);
    const relativePath = basePath ? `${basePath}/${file}` : `${dirPath}/${file}`;
    
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFilesInDir(fullPath, arrayOfFiles, relativePath.replace(`${dirPath}/`, ''));
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size > 0) {
        arrayOfFiles.push({
          localPath: fullPath,
          remotePath: relativePath,
          size: stats.size
        });
      }
    }
  });

  return arrayOfFiles;
}

// Upload file with proper SHA handling
async function uploadFile(file) {
  try {
    console.log(`📤 Uploading: ${file.remotePath} (${(file.size / 1024).toFixed(1)}KB)`);
    
    const content = fs.readFileSync(file.localPath, 'base64');
    const sha = await getFileSha(file.remotePath);
    
    const body = {
      message: `Add Shadow Pages: ${file.remotePath}`,
      content: content,
      branch: BRANCH
    };
    
    if (sha) {
      body.sha = sha;
    }

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file.remotePath}`,
      'PUT',
      body
    );
    
    if (response.ok) {
      console.log(`✅ Uploaded: ${file.remotePath}`);
      return { success: true, file: file.remotePath };
    } else {
      const errorText = await response.text();
      if (errorText.includes('Secret detected')) {
        console.log(`⚠️  Skipped: ${file.remotePath} (contains sensitive data)`);
        return { success: false, file: file.remotePath, skipped: true };
      }
      throw new Error(`${response.status} ${response.statusText} - ${errorText}`);
    }
    
  } catch (error) {
    console.error(`❌ Failed: ${file.remotePath} - ${error.message}`);
    return { success: false, file: file.remotePath, error: error.message };
  }
}

// Main upload function
async function uploadCoreFiles() {
  console.log('🚀 Starting Shadow Pages core upload to GitHub...');
  console.log(`📁 Repository: ${REPO_OWNER}/${REPO_NAME}`);

  try {
    // Test connection
    console.log('🔍 Testing GitHub connection...');
    const testResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}`);
    if (!testResponse.ok) {
      throw new Error('Cannot connect to GitHub repository');
    }
    console.log('✅ GitHub connection successful\n');

    // Get core files
    const files = getCoreProjectFiles();
    console.log(`📦 Found ${files.length} core files to upload`);
    
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(1)}MB\n`);

    // Upload files sequentially
    let uploaded = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`[${i + 1}/${files.length}]`);
      
      const result = await uploadFile(file);
      
      if (result.success) {
        uploaded++;
      } else if (result.skipped) {
        skipped++;
      } else {
        failed++;
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Final report
    console.log('\n🎉 UPLOAD COMPLETE!');
    console.log('=' .repeat(40));
    console.log(`✅ Uploaded: ${uploaded} files`);
    console.log(`⚠️  Skipped: ${skipped} files`);
    console.log(`❌ Failed: ${failed} files`);
    console.log(`📁 Total: ${files.length} files`);
    
    const successRate = ((uploaded / files.length) * 100).toFixed(1);
    console.log(`📊 Success rate: ${successRate}%`);

    console.log(`\n🌐 Repository: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
    console.log('\n📋 Next Steps:');
    console.log('   1. Clone the repository');
    console.log('   2. Run: npm install');
    console.log('   3. Set up .env file');
    console.log('   4. Run: npm run dev');

  } catch (error) {
    console.error('\n❌ Upload failed:', error.message);
    process.exit(1);
  }
}

// Run upload
if (require.main === module) {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is required');
    process.exit(1);
  }
  
  uploadCoreFiles().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

module.exports = { uploadCoreFiles };