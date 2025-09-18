const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️ UPLOADING BUILD ASSETS TO GITHUB');
console.log('Ensuring live site updates with latest build\n');

// Key build and static files
const buildFiles = [
  'dist/public/index.html',
  'dist/public/assets/index-*.js',
  'dist/public/assets/index-*.css',
  'client/public/assets/book-optimized.png',
  'client/public/assets/logosp.webp',
  'client/public/assets/eric.webp',
  'client/public/assets/artboard.webp',
  '_redirects',
  'netlify.toml'
];

function uploadFileWithGlob(pattern) {
  try {
    // Handle glob patterns
    if (pattern.includes('*')) {
      const dir = path.dirname(pattern);
      const basename = path.basename(pattern);
      const regex = new RegExp(basename.replace('*', '.*'));
      
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => regex.test(f));
        files.forEach(file => {
          const fullPath = path.join(dir, file);
          uploadSingleFile(fullPath);
        });
      }
      return;
    }
    
    uploadSingleFile(pattern);
  } catch (error) {
    console.log(`❌ ${pattern}: ${error.message.split('\n')[0]}`);
  }
}

function uploadSingleFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ ${filePath}: Not found, skipping`);
      return;
    }

    const content = fs.readFileSync(filePath, 'base64');
    const githubPath = filePath.replace(/\\/g, '/');
    
    // Get current SHA if exists
    let sha = '';
    try {
      const getResult = execSync(`curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/aresonline18/webofficial/contents/${githubPath}"`, { encoding: 'utf8' });
      const fileData = JSON.parse(getResult);
      if (fileData.sha) sha = fileData.sha;
    } catch (e) {}

    const payload = sha ? 
      `{"message":"Update build asset ${githubPath}","content":"${content}","sha":"${sha}"}` :
      `{"message":"Add build asset ${githubPath}","content":"${content}"}`;

    execSync(`curl -X PUT -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '${payload}' "https://api.github.com/repos/aresonline18/webofficial/contents/${githubPath}"`, { stdio: 'pipe' });
    
    console.log(`✅ ${filePath}`);
  } catch (error) {
    console.log(`❌ ${filePath}: Upload failed`);
  }
}

try {
  console.log('📦 Uploading build and asset files...\n');
  
  buildFiles.forEach(file => {
    uploadFileWithGlob(file);
  });

  console.log('\n🎉 BUILD ASSETS UPLOAD COMPLETE!');
  console.log('──────────────────────────────────────────────────');
  console.log('✅ Build files uploaded to GitHub');
  console.log('✅ Static assets synchronized');
  console.log('✅ Deployment configurations updated');
  console.log('\n🌐 Live site: https://start.shadowpages.io');
  console.log('⏰ Updates should appear within 2-3 minutes');
  
} catch (error) {
  console.error('❌ Upload error:', error.message);
}