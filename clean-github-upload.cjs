#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';
const MAX_RETRIES = 2;
const DELAY_BETWEEN_UPLOADS = 500; // ms to avoid rate limiting

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
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

// Get all files recursively with proper filtering
function getAllProjectFiles(dirPath = '.', arrayOfFiles = [], basePath = '') {
  const files = fs.readdirSync(dirPath);
  
  // Directories to skip
  const skipDirs = [
    'node_modules', '.git', 'dist', '.cache', '.upm', '.local', 
    '.replit_process', '.replit_data', '.breakpoints',
    'attached_assets' // Skip large asset files
  ];
  
  // Files to skip (exclude files with GitHub tokens and system files)
  const skipFiles = [
    '.replit', '.replit.lock', '.env', 'replit.md',
    'github-cleanup.js', 'github-cleanup-improved.js', 'github-upload.js',
    'clear-and-upload.js', 'delete-readme.js', 'delete-remaining.js', 
    'delete-repo-contents.js', 'empty-commit.js', 'final-delete.js',
    'force-delete.js', 'nuclear-delete.js', 'reset-repo.js', 
    'systematic-delete.js', 'comprehensive-github-upload.js',
    'comprehensive-github-upload.cjs', 'clean-github-upload.cjs',
    'upload-instructions.md'
  ];
  
  // File extensions to skip
  const skipExtensions = ['.log', '.lock', '.tmp', '.cache', '.pid'];

  files.forEach((file) => {
    if (skipFiles.includes(file)) return;
    if (skipExtensions.some(ext => file.endsWith(ext))) return;
    if (file.startsWith('.') && file !== '.env.example' && file !== '.gitignore') return;

    const fullPath = path.join(dirPath, file);
    const relativePath = basePath ? `${basePath}/${file}` : file;
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (!skipDirs.includes(file)) {
        getAllProjectFiles(fullPath, arrayOfFiles, relativePath);
      }
    } else {
      // Skip empty files
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

// Read file content as base64
function getFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return content.toString('base64');
  } catch (error) {
    console.error(`❌ Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Upload a single file with retry logic
async function uploadFileWithRetry(file, retryCount = 0) {
  try {
    console.log(`📤 Uploading: ${file.remotePath} (${(file.size / 1024).toFixed(1)}KB)`);
    
    const content = getFileContent(file.localPath);
    if (!content) {
      throw new Error('Failed to read file content');
    }

    await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file.remotePath}`,
      'PUT',
      {
        message: `Add Shadow Pages: ${file.remotePath}`,
        content: content,
        branch: BRANCH
      }
    );
    
    console.log(`✅ Uploaded: ${file.remotePath}`);
    return { success: true, file: file.remotePath };
    
  } catch (error) {
    if (error.message.includes('409') || error.message.includes('Secret detected')) {
      console.log(`⚠️  Skipping ${file.remotePath}: ${error.message.includes('Secret detected') ? 'Contains sensitive data' : 'Already exists'}`);
      return { success: false, file: file.remotePath, error: 'Skipped', skipped: true };
    }
    
    if (retryCount < MAX_RETRIES) {
      console.log(`⚠️  Retrying ${file.remotePath} (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return uploadFileWithRetry(file, retryCount + 1);
    } else {
      console.error(`❌ Failed to upload ${file.remotePath}:`, error.message);
      return { success: false, file: file.remotePath, error: error.message };
    }
  }
}

// Main upload function
async function uploadAllFiles() {
  console.log('🚀 Starting Shadow Pages upload to GitHub...');
  console.log(`📁 Repository: ${REPO_OWNER}/${REPO_NAME}`);
  console.log(`🌿 Branch: ${BRANCH}\n`);

  try {
    // Test GitHub connection
    console.log('🔍 Testing GitHub connection...');
    const repo = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}`);
    console.log('✅ GitHub connection successful');
    console.log(`📊 Repository info: ${repo.full_name} (${repo.private ? 'Private' : 'Public'})\n`);

    // Get all project files
    console.log('📋 Scanning project files...');
    const allFiles = getAllProjectFiles();
    console.log(`📦 Found ${allFiles.length} files to upload`);
    
    // Calculate total size
    const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
    console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(1)}MB\n`);

    // Upload files sequentially to avoid rate limits
    const results = [];
    const errors = [];
    const skipped = [];
    let uploadedCount = 0;

    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles[i];
      console.log(`📦 Processing file ${i + 1}/${allFiles.length}`);
      
      const result = await uploadFileWithRetry(file);
      
      if (result.success) {
        uploadedCount++;
      } else if (result.skipped) {
        skipped.push(result);
      } else {
        errors.push(result);
      }
      
      results.push(result);
      
      // Delay between uploads
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_UPLOADS));
    }

    // Final report
    console.log('\n🎉 UPLOAD COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`✅ Successfully uploaded: ${uploadedCount}/${allFiles.length} files`);
    console.log(`⚠️  Skipped files: ${skipped.length}`);
    console.log(`❌ Failed uploads: ${errors.length}`);
    console.log(`📁 Total files processed: ${allFiles.length}`);
    console.log(`💾 Total data uploaded: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
    
    if (skipped.length > 0) {
      console.log(`\n⚠️  Skipped files (${skipped.length}):`);
      skipped.forEach(item => console.log(`   • ${item.file}: ${item.error}`));
    }
    
    if (errors.length > 0) {
      console.log(`\n❌ Upload errors (${errors.length}):`);
      errors.forEach(error => console.log(`   • ${error.file}: ${error.error}`));
    }

    console.log(`\n🌐 Repository URL: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
    console.log('\n📋 Next Steps:');
    console.log('   1. Clone the repository locally');
    console.log('   2. Run: npm install');
    console.log('   3. Set up environment variables (.env)');
    console.log('   4. Run: npm run dev');
    console.log('   5. Your Shadow Pages platform is ready!');

    const successRate = ((uploadedCount / allFiles.length) * 100).toFixed(1);
    console.log(`\n📊 Upload Success Rate: ${successRate}%`);

  } catch (error) {
    console.error('\n❌ Upload process failed:', error.message);
    process.exit(1);
  }
}

// Run the upload
if (require.main === module) {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }
  
  uploadAllFiles().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = { uploadAllFiles };