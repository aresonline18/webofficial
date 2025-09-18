#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';

if (!GITHUB_TOKEN) {
  console.error('❌ Please set GITHUB_TOKEN environment variable');
  console.log('Get your token from: https://github.com/settings/tokens');
  process.exit(1);
}

// Files and directories to upload
const filesToUpload = [
  'client/',
  'server/',
  'shared/',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tailwind.config.ts',
  'vite.config.ts',
  'drizzle.config.ts',
  'components.json',
  'postcss.config.js',
  '.env.example',
  'README.md',
  '.gitignore',
  'INTEGRATION_README.md',
  'SAFE_DEPLOYMENT_ANALYSIS.md',
  'PROJECT_INTEGRATION_PLAN.md'
];

// Helper function to make GitHub API requests
function githubRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Shadow-Pages-Uploader',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`GitHub API Error: ${res.statusCode} - ${parsed.message}`));
          }
        } catch (e) {
          reject(new Error(`Parse Error: ${body}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Get file content as base64
function getFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return content.toString('base64');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Upload a single file
async function uploadFile(filePath, content, message) {
  try {
    console.log(`📤 Uploading: ${filePath}`);
    
    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      'PUT',
      {
        message: message,
        content: content,
        branch: BRANCH
      }
    );
    
    console.log(`✅ Uploaded: ${filePath}`);
    return response;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    throw error;
  }
}

// Recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip node_modules, .git, dist directories
      if (!['node_modules', '.git', 'dist', '.cache', '.upm', '.local'].includes(file)) {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Skip certain file types
      if (!file.match(/\.(log|lock|tmp|cache)$/)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// Main upload function
async function uploadToGitHub() {
  console.log('🚀 Starting Shadow Pages upload to GitHub...');
  console.log(`📁 Repository: ${REPO_OWNER}/${REPO_NAME}`);
  
  try {
    // Test GitHub connection
    console.log('🔍 Testing GitHub connection...');
    await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}`);
    console.log('✅ GitHub connection successful');

    let uploadedFiles = 0;
    const errors = [];

    for (const item of filesToUpload) {
      try {
        if (fs.existsSync(item)) {
          const stats = fs.statSync(item);
          
          if (stats.isDirectory()) {
            // Upload all files in directory
            const files = getAllFiles(item);
            for (const file of files) {
              const content = getFileContent(file);
              if (content) {
                await uploadFile(file, content, `Add Shadow Pages: ${file}`);
                uploadedFiles++;
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
              }
            }
          } else {
            // Upload single file
            const content = getFileContent(item);
            if (content) {
              await uploadFile(item, content, `Add Shadow Pages: ${item}`);
              uploadedFiles++;
            }
          }
        } else {
          console.log(`⚠️  Skipping missing file: ${item}`);
        }
      } catch (error) {
        errors.push(`${item}: ${error.message}`);
      }
    }

    console.log('\n🎉 Upload Complete!');
    console.log(`✅ Successfully uploaded ${uploadedFiles} files`);
    
    if (errors.length > 0) {
      console.log(`❌ Errors (${errors.length}):`);
      errors.forEach(error => console.log(`   ${error}`));
    }
    
    console.log(`\n🌐 Your repository: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
    console.log('📋 Next steps:');
    console.log('   1. Run: npm install');
    console.log('   2. Run: npm run dev');
    console.log('   3. Your Shadow Pages platform is ready!');

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

// Run the upload
uploadToGitHub();