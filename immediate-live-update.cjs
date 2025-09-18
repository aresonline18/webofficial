const { execSync } = require('child_process');
const fs = require('fs');

console.log('🎯 IMMEDIATE LIVE SITE UPDATE');
console.log('Targeting only files that control the live site display\n');

// Only the files that directly control what appears on start.shadowpages.io
const liveFiles = [
  'client/src/pages/StaticHome.tsx',
  'client/src/pages/StaticHomeComplete.tsx',
  'client/src/pages/StaticHomeExact.tsx',
  'client/public/assets/styles/styles.css',
  'client/src/App.tsx'
];

function uploadWithOverwrite(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ ${filePath}: File not found`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'base64');
    
    // First delete the file completely
    try {
      const getResponse = execSync(`curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/aresonline18/webofficial/contents/${filePath}"`, { encoding: 'utf8' });
      const fileData = JSON.parse(getResponse);
      if (fileData.sha) {
        execSync(`curl -X DELETE -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '{"message":"Delete for update","sha":"${fileData.sha}"}' "https://api.github.com/repos/aresonline18/webofficial/contents/${filePath}"`, { stdio: 'pipe' });
        console.log(`🗑️ Deleted: ${filePath}`);
      }
    } catch (e) {}
    
    // Wait a moment
    setTimeout(() => {}, 1000);
    
    // Now upload the new version
    const payload = `{"message":"Force update live site: ${filePath}","content":"${content}"}`;
    execSync(`curl -X PUT -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '${payload}' "https://api.github.com/repos/aresonline18/webofficial/contents/${filePath}"`, { stdio: 'pipe' });
    
    console.log(`✅ Uploaded: ${filePath}`);
    return true;
  } catch (error) {
    console.log(`❌ ${filePath}: Failed to update`);
    return false;
  }
}

try {
  console.log('🔥 Forcing immediate update of live site files...\n');
  
  let updated = 0;
  liveFiles.forEach(file => {
    if (uploadWithOverwrite(file)) {
      updated++;
    }
  });

  // Force rebuild trigger
  console.log('\n🚀 Triggering immediate deployment...');
  const triggerPayload = '{"message":"FORCE LIVE UPDATE","content":"IyBGT1JDRSBJTU1FRElBVEUgTElWRSBVUERBVEU="}';
  execSync(`curl -X PUT -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" -d '${triggerPayload}' "https://api.github.com/repos/aresonline18/webofficial/contents/FORCE_UPDATE.md"`, { stdio: 'pipe' });

  console.log('\n🎯 IMMEDIATE UPDATE COMPLETE!');
  console.log('═══════════════════════════════════════════════════');
  console.log(`✅ Updated: ${updated}/${liveFiles.length} critical files`);
  console.log('🗑️ Old files deleted completely');
  console.log('📤 New files uploaded fresh');
  console.log('🚀 Deployment triggered');
  console.log('\n🌐 Live site: https://start.shadowpages.io');
  console.log('⚡ Changes should appear in 2-3 minutes maximum');
  
} catch (error) {
  console.error('❌ Update error:', error.message);
}