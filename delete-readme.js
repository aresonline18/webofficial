#!/usr/bin/env node

import https from 'https';

const GITHUB_TOKEN = "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";
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';

function githubRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Final-Cleaner',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({
            statusCode: res.statusCode,
            data: parsed,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: { message: body },
            success: false
          });
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

async function deleteReadme() {
  console.log('🗑️ Deleting README.md to make repository completely empty...');
  
  try {
    // Get README file info to get SHA
    const readmeResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/README.md`);
    
    if (!readmeResponse.success) {
      console.log('❌ Could not get README file info');
      return;
    }
    
    const readmeSha = readmeResponse.data.sha;
    console.log(`README SHA: ${readmeSha}`);
    
    // Delete README file
    const deleteResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/README.md`, 'DELETE', {
      message: 'Remove README - make repository completely empty',
      sha: readmeSha
    });
    
    if (deleteResponse.success) {
      console.log('✅ README.md deleted successfully');
      
      // Verify repository is empty
      const verifyResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents`);
      
      if (verifyResponse.statusCode === 404) {
        console.log('🎉 Repository is now completely empty!');
      } else if (verifyResponse.success && verifyResponse.data.length === 0) {
        console.log('🎉 Repository is now completely empty!');
      } else {
        console.log(`⚠️ Repository still contains ${verifyResponse.data?.length || 'some'} items`);
      }
      
    } else {
      console.log(`❌ Failed to delete README: ${deleteResponse.data.message}`);
    }
    
    console.log(`🌐 Check: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
    
  } catch (error) {
    console.error('❌ Failed to delete README:', error.message);
  }
}

deleteReadme();