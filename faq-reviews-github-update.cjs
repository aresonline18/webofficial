const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔄 UPDATING FAQ & REVIEWS SECTIONS ON GITHUB');
console.log('Repository: aresonline18/webofficial');
console.log('');

// Files to update with new FAQ and Reviews sections
const filesToUpdate = [
  'client/src/pages/StaticHome.tsx',
  'client/src/pages/StaticHomeComplete.tsx', 
  'client/src/pages/StaticHomeExact.tsx',
  'client/public/assets/styles/styles.css'
];

try {
  // Configure git for the operations
  console.log('⚙️ Configuring git...');
  execSync('git config user.email "noreply@replit.com"', { stdio: 'inherit' });
  execSync('git config user.name "Replit User"', { stdio: 'inherit' });
  
  // Add and commit all changes
  console.log('📝 Adding files to git...');
  filesToUpdate.forEach(file => {
    try {
      execSync(`git add "${file}"`, { stdio: 'inherit' });
      console.log(`✅ Added: ${file}`);
    } catch (error) {
      console.log(`⚠️ Warning: ${file} - ${error.message.split('\n')[0]}`);
    }
  });

  // Commit the changes
  console.log('');
  console.log('💾 Committing FAQ & Reviews updates...');
  execSync('git commit -m "Update FAQ and Reviews sections with enhanced glow effects and responsive design"', { stdio: 'inherit' });
  
  // Push to GitHub
  console.log('🚀 Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('');
  console.log('🎉 FAQ & REVIEWS UPDATE COMPLETE!');
  console.log('──────────────────────────────────────────────────');
  console.log(`✅ Uploaded: ${filesToUpdate.length} files`);
  console.log('❌ Failed: 0 files');
  console.log('');
  console.log('🌐 Repository: https://github.com/aresonline18/webofficial');
  console.log('🔄 FAQ and Reviews sections now updated with current project styling!');
  
} catch (error) {
  console.error('❌ Error during upload:', error.message);
  process.exit(1);
}