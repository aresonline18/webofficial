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
      'User-Agent': 'Systematic-Delete'
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
  try {
    const sha = await getFileSha(filePath);
    if (!sha) {
      console.log(`Skip: ${filePath} (doesn't exist)`);
      return true;
    }

    const response = await githubRequest(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      'DELETE',
      {
        message: `DELETE ALL: Remove ${filePath}`,
        sha: sha,
        branch: BRANCH
      }
    );
    
    if (response.ok) {
      console.log(`Deleted: ${filePath}`);
      return true;
    } else {
      console.log(`Failed to delete: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.log(`Error deleting ${filePath}: ${error.message}`);
    return false;
  }
}

async function deleteAllRepoContents() {
  console.log('DELETING ENTIRE REPOSITORY CONTENTS...');
  console.log(`Repository: ${REPO_OWNER}/${REPO_NAME}`);
  console.log('Getting all files...');
  
  const allFiles = await getAllFiles();
  console.log(`Found ${allFiles.length} files to delete`);
  
  if (allFiles.length === 0) {
    console.log('Repository is already empty');
    return;
  }
  
  let deleted = 0;
  
  for (const file of allFiles) {
    const success = await deleteFile(file);
    if (success) deleted++;
    // Wait between deletions to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\nDELETION COMPLETE!`);
  console.log(`Successfully deleted ${deleted}/${allFiles.length} files`);
  console.log('Repository status:');
  console.log('- All files deleted');
  console.log('- Repository completely empty');
  console.log('- Ready for clean React deployment');
}

deleteAllRepoContents().catch(error => {
  console.error('Deletion error:', error.message);
  process.exit(1);
});