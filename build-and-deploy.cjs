#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

const GITHUB_TOKEN = "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";

async function deployToGitHub() {
  console.log('🚀 Starting complete deployment process...');
  
  try {
    // Build the project locally first to test
    console.log('📦 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful!');
    
    // Upload all critical files to trigger deployment
    const filesToDeploy = [
      'client/src/pages/free-resources.tsx',
      'client/public/sitemap.xml', 
      'client/public/robots.txt',
      'netlify.toml',
      '_redirects',
      'public/_redirects'
    ];
    
    for (const file of filesToDeploy) {
      if (fs.existsSync(file)) {
        await uploadFileToGitHub(file);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Trigger a deployment webhook if available
    console.log('🎯 Files uploaded to GitHub - deployment should trigger automatically');
    console.log('🌐 Your site will be live at: https://start.shadowpages.io');
    console.log('📍 Free resources will be at: https://start.shadowpages.io/free-resources');
    console.log('🔍 Sitemap will be at: https://start.shadowpages.io/sitemap.xml');
    
  } catch (error) {
    console.error('❌ Deployment error:', error.message);
  }
}

async function uploadFileToGitHub(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'base64');
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(`https://api.github.com/repos/aresonline18/webofficial/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Deploy: Update ${filePath}`,
        content: content,
        branch: 'main'
      })
    });
    
    if (response.ok) {
      console.log(`✅ Deployed: ${filePath}`);
    }
  } catch (error) {
    console.log(`⚠️  Could not deploy ${filePath}: ${error.message}`);
  }
}

deployToGitHub();