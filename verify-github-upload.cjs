#!/usr/bin/env node

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';

// Critical files that must exist for the app to work
const criticalFiles = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'drizzle.config.ts',
  'client/index.html',
  'client/src/App.tsx',
  'client/src/main.tsx',
  'client/src/pages/StaticHomeComplete.tsx',
  'client/src/pages/free-resources.tsx',
  'client/src/components/ApplyNowButton.tsx',
  'server/index.ts',
  'server/routes.ts',
  'server/storage.ts',
  'shared/schema.ts',
  'README.md',
  'DEPLOYMENT_GUIDE.md'
];

async function githubRequest(endpoint) {
  const url = `https://api.github.com${endpoint}`;
  const fetch = (await import('node-fetch')).default;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Shadow-Pages-Verification'
    }
  });
  
  return response;
}

async function verifyFile(filePath) {
  try {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function verifyUpload() {
  console.log('🔍 Verifying Shadow Pages upload...');
  console.log(`📁 Repository: ${REPO_OWNER}/${REPO_NAME}\n`);

  let allPresent = true;
  const missing = [];

  for (const file of criticalFiles) {
    const exists = await verifyFile(file);
    if (exists) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
      missing.push(file);
      allPresent = false;
    }
  }

  console.log('\n' + '='.repeat(50));
  
  if (allPresent) {
    console.log('🎉 VERIFICATION SUCCESSFUL!');
    console.log('✅ All critical files are present in the repository');
    console.log('✅ Your Shadow Pages platform is ready for deployment');
    
    console.log('\n🌐 Repository URL: https://github.com/aresonline18/webofficial');
    console.log('\n📋 Ready for deployment! Next steps:');
    console.log('   1. Clone: git clone https://github.com/aresonline18/webofficial.git');
    console.log('   2. Install: npm install');
    console.log('   3. Environment: Copy .env.example to .env and configure');
    console.log('   4. Database: Set up PostgreSQL connection');
    console.log('   5. Run: npm run dev');
    console.log('   6. Deploy: Use Vercel, Railway, or any Node.js hosting');
  } else {
    console.log('❌ VERIFICATION FAILED!');
    console.log(`Missing ${missing.length} critical files:`);
    missing.forEach(file => console.log(`   • ${file}`));
  }
}

if (require.main === module) {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is required');
    process.exit(1);
  }
  
  verifyUpload().catch(error => {
    console.error('❌ Verification error:', error.message);
    process.exit(1);
  });
}