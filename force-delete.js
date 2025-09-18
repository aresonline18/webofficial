const GITHUB_TOKEN = "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";
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';
const BRANCH = 'main';

async function githubRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com${endpoint}`;
  const fetch = (await import('node-fetch')).default;
  
  const options = {
    method,
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Force-Delete'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  return await fetch(url, options);
}

async function getAllFiles() {
  try {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`);
    if (response.ok) {
      const data = await response.json();
      return data.tree.filter(item => item.type === 'blob').map(item => item.path);
    }
  } catch (error) {
    console.log(`Error getting files: ${error.message}`);
  }
  return [];
}

async function getFileSha(filePath) {
  try {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`);
    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
  } catch (error) {
    // File doesn't exist
  }
  return null;
}

async function deleteFile(filePath) {
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      const sha = await getFileSha(filePath);
      if (!sha) {
        return true; // File already deleted
      }

      const response = await githubRequest(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
        'DELETE',
        {
          message: `Force delete ${filePath}`,
          sha: sha,
          branch: BRANCH
        }
      );
      
      if (response.ok) {
        console.log(`DELETED: ${filePath}`);
        return true;
      } else {
        const errorText = await response.text();
        console.log(`ATTEMPT ${attempts + 1} FAILED: ${filePath} - ${errorText}`);
        attempts++;
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.log(`ATTEMPT ${attempts + 1} ERROR: ${filePath} - ${error.message}`);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log(`FINAL FAILURE: ${filePath} - could not delete after ${maxAttempts} attempts`);
  return false;
}

async function forceDeleteAllFiles() {
  console.log('FORCE DELETING ALL FILES - WILL NOT STOP UNTIL REPO IS EMPTY');
  
  let round = 1;
  let totalDeleted = 0;
  
  while (true) {
    console.log(`\n=== DELETION ROUND ${round} ===`);
    
    const allFiles = await getAllFiles();
    console.log(`Found ${allFiles.length} files remaining`);
    
    if (allFiles.length === 0) {
      console.log('\n🎉 SUCCESS: REPOSITORY IS COMPLETELY EMPTY');
      console.log(`Total files deleted: ${totalDeleted}`);
      break;
    }
    
    let deletedThisRound = 0;
    
    // Process files one by one to ensure each deletion is attempted
    for (const file of allFiles) {
      const success = await deleteFile(file);
      if (success) {
        deletedThisRound++;
        totalDeleted++;
      }
      
      // Small delay between each file
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`Round ${round} complete: ${deletedThisRound}/${allFiles.length} files deleted`);
    
    if (deletedThisRound === 0) {
      console.log('No files deleted this round, waiting 10 seconds before retry...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    } else {
      // Brief pause between rounds
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    round++;
    
    // Safety check to prevent infinite loop
    if (round > 50) {
      console.log('Reached maximum rounds, stopping to prevent infinite loop');
      break;
    }
  }
  
  console.log('\nFORCE DELETION COMPLETE');
  console.log('Repository is now completely empty and ready for new deployment');
}

forceDeleteAllFiles().catch(error => {
  console.error('Force deletion failed:', error.message);
  process.exit(1);
});