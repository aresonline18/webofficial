const { execSync } = require('child_process');
const fs = require('fs');

console.log('💣 NUCLEAR DELETE AND REBUILD');
console.log('Completely removing all home/start page files, then rebuilding\n');

// All files related to home/start page that need to be deleted and rebuilt
const homePageFiles = [
  'client/src/pages/StaticHome.tsx',
  'client/src/pages/StaticHomeComplete.tsx', 
  'client/src/pages/StaticHomeExact.tsx',
  'client/src/App.tsx',
  'client/public/assets/styles/styles.css',
  'index.html',
  'assets/index-BEpDnmeH.css',
  'assets/index-DoiZv7UR.js',
  '_redirects',
  'netlify.toml'
];

function deleteFileFromGitHub(filePath) {
  try {
    console.log(`🗑️ Deleting: ${filePath}`);
    
    // Get file SHA
    const getResponse = execSync(`curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/aresonline18/webofficial/contents/${filePath}"`, { encoding: 'utf8' });
    const fileData = JSON.parse(getResponse);
    
    if (fileData.sha) {
      // Delete the file
      execSync(`curl -X DELETE -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '{"message":"Nuclear delete: ${filePath}","sha":"${fileData.sha}"}' "https://api.github.com/repos/aresonline18/webofficial/contents/${filePath}"`, { stdio: 'pipe' });
      console.log(`✅ Deleted: ${filePath}`);
      return true;
    } else {
      console.log(`⚠️ ${filePath}: File not found in repo`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${filePath}: Delete failed - ${error.message.split('\n')[0]}`);
    return false;
  }
}

function uploadFileToGitHub(localPath, githubPath) {
  try {
    if (!fs.existsSync(localPath)) {
      console.log(`⚠️ ${localPath}: Local file not found`);
      return false;
    }

    console.log(`📤 Uploading: ${localPath} → ${githubPath}`);
    
    const content = fs.readFileSync(localPath, 'base64');
    const payload = `{"message":"Rebuild from Replit: ${githubPath}","content":"${content}"}`;
    
    execSync(`curl -X PUT -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '${payload}' "https://api.github.com/repos/aresonline18/webofficial/contents/${githubPath}"`, { stdio: 'pipe' });
    
    console.log(`✅ Uploaded: ${githubPath}`);
    return true;
  } catch (error) {
    console.log(`❌ ${githubPath}: Upload failed`);
    return false;
  }
}

try {
  console.log('🗑️ PHASE 1: NUCLEAR DELETION\n');
  
  let deletedCount = 0;
  homePageFiles.forEach(file => {
    if (deleteFileFromGitHub(file)) {
      deletedCount++;
    }
  });
  
  console.log(`\n💥 Deleted ${deletedCount} files from GitHub repository\n`);
  console.log('⏳ Waiting 5 seconds for GitHub to process deletions...\n');
  
  // Wait for deletions to process
  setTimeout(() => {
    console.log('📤 PHASE 2: COMPLETE REBUILD\n');
    
    // Rebuild with fresh build first
    execSync('npm run build', { stdio: 'inherit' });
    
    let uploadedCount = 0;
    
    // Upload source files
    const sourceFiles = [
      { local: 'client/src/pages/StaticHome.tsx', github: 'client/src/pages/StaticHome.tsx' },
      { local: 'client/src/pages/StaticHomeComplete.tsx', github: 'client/src/pages/StaticHomeComplete.tsx' },
      { local: 'client/src/pages/StaticHomeExact.tsx', github: 'client/src/pages/StaticHomeExact.tsx' },
      { local: 'client/src/App.tsx', github: 'client/src/App.tsx' },
      { local: 'client/public/assets/styles/styles.css', github: 'client/public/assets/styles/styles.css' },
      { local: 'dist/public/index.html', github: 'index.html' },
      { local: '_redirects', github: '_redirects' },
      { local: 'netlify.toml', github: 'netlify.toml' }
    ];
    
    // Find and upload CSS/JS assets
    const distDir = 'dist/public/assets';
    if (fs.existsSync(distDir)) {
      const assets = fs.readdirSync(distDir);
      assets.forEach(asset => {
        if (asset.endsWith('.css') || asset.endsWith('.js')) {
          sourceFiles.push({
            local: `${distDir}/${asset}`,
            github: `assets/${asset}`
          });
        }
      });
    }
    
    sourceFiles.forEach(({ local, github }) => {
      if (uploadFileToGitHub(local, github)) {
        uploadedCount++;
      }
    });
    
    console.log('\n🎉 NUCLEAR REBUILD COMPLETE!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`🗑️ Deleted: ${deletedCount} old files`);
    console.log(`📤 Uploaded: ${uploadedCount} fresh files`);
    console.log('💥 Complete nuclear rebuild finished');
    console.log('\n🌐 Live site: https://start.shadowpages.io');
    console.log('⚡ Changes should appear within 3-5 minutes');
    
  }, 5000);
  
} catch (error) {
  console.error('❌ Nuclear rebuild error:', error.message);
}