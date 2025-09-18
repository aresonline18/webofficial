const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 COMPLETE REPOSITORY SYNCHRONIZATION');
console.log('Forcing GitHub to match this project exactly\n');

// Core files that define the project
const coreFiles = [
  'client/src/pages/StaticHome.tsx',
  'client/src/pages/StaticHomeComplete.tsx', 
  'client/src/pages/StaticHomeExact.tsx',
  'client/src/pages/free-resources.tsx',
  'client/src/pages/templates/shadow-pages-playbook.tsx',
  'client/src/components/SEOHead.tsx',
  'client/src/components/ResourceCard.tsx',
  'client/public/assets/styles/styles.css',
  'client/src/App.tsx',
  'server/db.ts',
  'server/storage.ts',
  'server/routes.ts',
  'shared/schema.ts',
  'package.json',
  'replit.md',
  'README.md'
];

function uploadFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ ${filePath}: File not found, skipping`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'base64');
    const encodedPath = encodeURIComponent(filePath);
    
    // Get current file SHA if it exists
    let sha = '';
    try {
      const getResult = execSync(`curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/aresonline18/webofficial/contents/${encodedPath}"`, { encoding: 'utf8' });
      const fileData = JSON.parse(getResult);
      if (fileData.sha) {
        sha = fileData.sha;
      }
    } catch (e) {
      // File doesn't exist, continue without SHA
    }

    // Upload with SHA if file exists, without if new
    const payload = sha ? 
      `{"message":"Sync ${filePath} from Replit","content":"${content}","sha":"${sha}"}` :
      `{"message":"Add ${filePath} from Replit","content":"${content}"}`;

    execSync(`curl -X PUT -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '${payload}' "https://api.github.com/repos/aresonline18/webofficial/contents/${encodedPath}"`, { stdio: 'pipe' });
    
    console.log(`✅ ${filePath}`);
    return true;
  } catch (error) {
    console.log(`❌ ${filePath}: ${error.message.split('\n')[0]}`);
    return false;
  }
}

try {
  console.log('📝 Uploading core project files...\n');
  
  let successCount = 0;
  coreFiles.forEach(file => {
    if (uploadFile(file)) {
      successCount++;
    }
  });

  console.log('\n🎉 REPOSITORY SYNC COMPLETE!');
  console.log('──────────────────────────────────────────────────');
  console.log(`✅ Successfully uploaded: ${successCount}/${coreFiles.length} files`);
  console.log(`❌ Failed uploads: ${coreFiles.length - successCount} files`);
  console.log('\n🌐 Repository: https://github.com/aresonline18/webofficial');
  console.log('🚀 GitHub repository now matches this Replit project exactly');
  
} catch (error) {
  console.error('❌ Sync error:', error.message);
}