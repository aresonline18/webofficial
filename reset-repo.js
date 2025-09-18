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
        'User-Agent': 'Repo-Resetter',
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

async function resetRepository() {
  console.log('🔄 Resetting repository to empty state...');
  
  try {
    // Create README.md file to initialize empty repo
    console.log('1. Creating initial empty README...');
    const readmeContent = Buffer.from('# Empty Repository\n\nRepository cleared and ready for new content.').toString('base64');
    
    const readmeResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/README.md`, 'PUT', {
      message: 'Initialize empty repository',
      content: readmeContent,
      branch: 'main'
    });
    
    if (!readmeResponse.success) {
      console.log(`README creation result: ${readmeResponse.statusCode} - ${readmeResponse.data.message}`);
    } else {
      console.log('✅ README created successfully');
    }
    
    // Force push to reset git history completely
    console.log('2. Getting current branch info...');
    const branchResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/branches/main`);
    
    if (branchResponse.success) {
      const currentSha = branchResponse.data.commit.sha;
      console.log(`Current HEAD: ${currentSha}`);
      
      // Create a completely new tree with only README
      console.log('3. Creating clean tree...');
      const treeResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`, 'POST', {
        tree: [
          {
            path: 'README.md',
            mode: '100644',
            type: 'blob',
            content: '# Empty Repository\n\nRepository cleared and ready for new content.'
          }
        ]
      });
      
      if (treeResponse.success) {
        console.log(`✅ Clean tree created: ${treeResponse.data.sha}`);
        
        // Create new commit with clean tree
        console.log('4. Creating clean commit...');
        const commitResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`, 'POST', {
          message: 'Clean repository - remove all previous content',
          tree: treeResponse.data.sha,
          parents: [] // No parents = completely new history
        });
        
        if (commitResponse.success) {
          console.log(`✅ Clean commit created: ${commitResponse.data.sha}`);
          
          // Force update main branch
          console.log('5. Force updating main branch...');
          const updateResponse = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/main`, 'PATCH', {
            sha: commitResponse.data.sha,
            force: true
          });
          
          if (updateResponse.success) {
            console.log('✅ Main branch force updated');
            
            // Verify final state
            console.log('6. Verifying clean state...');
            const finalCheck = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents`);
            
            if (finalCheck.success) {
              console.log(`📊 Repository now contains ${finalCheck.data.length} item(s):`);
              finalCheck.data.forEach(item => console.log(`   - ${item.name} (${item.type})`));
            }
            
            console.log('🎉 Repository has been reset to clean state!');
            console.log(`🌐 Check: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
            
          } else {
            console.log(`❌ Failed to update branch: ${updateResponse.data.message}`);
          }
        } else {
          console.log(`❌ Failed to create commit: ${commitResponse.data.message}`);
        }
      } else {
        console.log(`❌ Failed to create tree: ${treeResponse.data.message}`);
      }
    } else {
      console.log(`❌ Failed to get branch info: ${branchResponse.data.message}`);
    }
    
  } catch (error) {
    console.error('❌ Repository reset failed:', error.message);
  }
}

resetRepository();