#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';
const MAX_RETRIES = 3;
const DELAY_BETWEEN_UPLOADS = 300; // ms to avoid rate limiting
const BATCH_SIZE = 10; // Files per batch

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
    '.replit_process', '.replit_data', '.breakpoints', '.cache',
    'attached_assets'  // Skip large asset files
  ];
  
  // Files to skip
  const skipFiles = [
    '.replit', '.replit.lock', '.env', 'replit.md'
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
      arrayOfFiles.push({
        localPath: fullPath,
        remotePath: relativePath,
        size: fs.statSync(fullPath).size
      });
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

// Verify file exists in repository
async function verifyFileExists(remotePath) {
  try {
    await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${remotePath}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Main upload function with comprehensive verification
async function uploadAllFiles() {
  console.log('🚀 Starting comprehensive Shadow Pages upload to GitHub...');
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

    // Upload files in batches
    const results = [];
    const errors = [];
    let uploadedCount = 0;

    for (let i = 0; i < allFiles.length; i += BATCH_SIZE) {
      const batch = allFiles.slice(i, i + BATCH_SIZE);
      console.log(`📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allFiles.length / BATCH_SIZE)}`);
      
      const batchPromises = batch.map(async (file) => {
        const result = await uploadFileWithRetry(file);
        
        if (result.success) {
          uploadedCount++;
        } else {
          errors.push(result);
        }
        
        // Small delay between uploads
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_UPLOADS));
        return result;
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      console.log(`✅ Batch complete: ${batchResults.filter(r => r.success).length}/${batch.length} files uploaded\n`);
    }

    // Verification phase
    console.log('🔍 Verifying all files were uploaded...');
    const verificationErrors = [];
    
    for (const file of allFiles) {
      const exists = await verifyFileExists(file.remotePath);
      if (!exists) {
        verificationErrors.push(file.remotePath);
      }
    }

    // Final report
    console.log('\n🎉 UPLOAD COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`✅ Successfully uploaded: ${uploadedCount}/${allFiles.length} files`);
    console.log(`📁 Total files processed: ${allFiles.length}`);
    console.log(`💾 Total data uploaded: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
    
    if (errors.length > 0) {
      console.log(`\n❌ Upload errors (${errors.length}):`);
      errors.forEach(error => console.log(`   • ${error.file}: ${error.error}`));
    }
    
    if (verificationErrors.length > 0) {
      console.log(`\n⚠️  Verification failed for ${verificationErrors.length} files:`);
      verificationErrors.forEach(file => console.log(`   • ${file}`));
      
      // Attempt to re-upload failed files
      console.log('\n🔄 Re-uploading failed files...');
      for (const failedFile of verificationErrors) {
        const fileInfo = allFiles.find(f => f.remotePath === failedFile);
        if (fileInfo) {
          await uploadFileWithRetry(fileInfo);
        }
      }
    } else {
      console.log('✅ All files verified successfully in repository');
    }

    console.log(`\n🌐 Repository URL: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
    console.log('\n📋 Next Steps:');
    console.log('   1. Clone the repository locally');
    console.log('   2. Run: npm install');
    console.log('   3. Set up environment variables (.env)');
    console.log('   4. Run: npm run dev');
    console.log('   5. Your Shadow Pages platform is ready!');

    // Create deployment status file
    const deploymentInfo = {
      uploadDate: new Date().toISOString(),
      totalFiles: allFiles.length,
      uploadedFiles: uploadedCount,
      errors: errors.length,
      verificationErrors: verificationErrors.length,
      repositoryUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}`,
      status: (errors.length === 0 && verificationErrors.length === 0) ? 'SUCCESS' : 'PARTIAL'
    };

    console.log('\n📊 Deployment Summary:');
    console.log(JSON.stringify(deploymentInfo, null, 2));

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