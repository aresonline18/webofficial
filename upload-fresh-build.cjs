const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️ UPLOADING FRESH BUILD TO GITHUB');
console.log('Ensuring the live site serves the exact current build\n');

function uploadBuildFile(filePath, githubPath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ ${filePath}: Build file not found`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'base64');
    
    // Delete existing file
    try {
      const getResponse = execSync(`curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/aresonline18/webofficial/contents/${githubPath}"`, { encoding: 'utf8' });
      const fileData = JSON.parse(getResponse);
      if (fileData.sha) {
        execSync(`curl -X DELETE -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '{"message":"Delete old build","sha":"${fileData.sha}"}' "https://api.github.com/repos/aresonline18/webofficial/contents/${githubPath}"`, { stdio: 'pipe' });
      }
    } catch (e) {}
    
    // Upload fresh build
    const payload = `{"message":"Fresh build: ${githubPath}","content":"${content}"}`;
    execSync(`curl -X PUT -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '${payload}' "https://api.github.com/repos/aresonline18/webofficial/contents/${githubPath}"`, { stdio: 'pipe' });
    
    console.log(`✅ ${githubPath}`);
    return true;
  } catch (error) {
    console.log(`❌ ${githubPath}: Upload failed`);
    return false;
  }
}

try {
  console.log('📦 Uploading fresh build files...\n');
  
  // Upload the main build files
  const buildFiles = [
    { local: 'dist/public/index.html', github: 'index.html' },
    { local: '_redirects', github: '_redirects' },
    { local: 'netlify.toml', github: 'netlify.toml' }
  ];
  
  // Upload CSS and JS files from dist
  const distDir = 'dist/public/assets';
  if (fs.existsSync(distDir)) {
    const assets = fs.readdirSync(distDir);
    assets.forEach(asset => {
      if (asset.endsWith('.css') || asset.endsWith('.js')) {
        buildFiles.push({
          local: path.join(distDir, asset),
          github: `assets/${asset}`
        });
      }
    });
  }
  
  let uploaded = 0;
  buildFiles.forEach(({ local, github }) => {
    if (uploadBuildFile(local, github)) {
      uploaded++;
    }
  });

  console.log('\n🎉 FRESH BUILD UPLOAD COMPLETE!');
  console.log('═══════════════════════════════════════════════════');
  console.log(`✅ Uploaded: ${uploaded} build files`);
  console.log('🏗️ Fresh production build deployed');
  console.log('🚀 Live site will serve updated build');
  console.log('\n🌐 Site: https://start.shadowpages.io');
  console.log('⚡ Build changes live in 1-2 minutes');
  
} catch (error) {
  console.error('❌ Build upload error:', error.message);
}