const GITHUB_TOKEN = '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';
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';

async function deleteAllFiles() {
  try {
    console.log('Starting to delete all files from repository...');
    
    // Get all files in the repository
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Cleanup-Script'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repository contents: ${response.status} ${response.statusText}`);
    }

    const files = await response.json();
    console.log(`Found ${files.length} items to delete`);

    // Delete each file/folder
    for (const file of files) {
      console.log(`Deleting: ${file.path}`);
      
      const deleteResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file.path}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Cleanup-Script'
        },
        body: JSON.stringify({
          message: `Delete ${file.path}`,
          sha: file.sha
        })
      });

      if (deleteResponse.ok) {
        console.log(`✓ Deleted: ${file.path}`);
      } else {
        console.error(`✗ Failed to delete ${file.path}: ${deleteResponse.status} ${deleteResponse.statusText}`);
      }
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('Deletion process completed!');
    
    // Verify repository is empty
    const verifyResponse = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Cleanup-Script'
      }
    });

    if (verifyResponse.status === 404) {
      console.log('✓ Repository is now empty!');
    } else {
      const remainingFiles = await verifyResponse.json();
      console.log(`${remainingFiles.length} files still remaining - running cleanup again...`);
      if (remainingFiles.length > 0) {
        await deleteAllFiles(); // Recursive call to handle any remaining files
      }
    }

  } catch (error) {
    console.error('Error during deletion process:', error);
  }
}

// Function to delete folders recursively
async function deleteFolderRecursively(folderPath) {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${folderPath}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Cleanup-Script'
      }
    });

    if (!response.ok) {
      return;
    }

    const contents = await response.json();
    
    // Delete files first, then folders
    for (const item of contents) {
      if (item.type === 'file') {
        await deleteFile(item.path, item.sha);
      }
    }
    
    // Then delete folders
    for (const item of contents) {
      if (item.type === 'dir') {
        await deleteFolderRecursively(item.path);
      }
    }
  } catch (error) {
    console.error(`Error deleting folder ${folderPath}:`, error);
  }
}

async function deleteFile(filePath, sha) {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Cleanup-Script'
      },
      body: JSON.stringify({
        message: `Delete ${filePath}`,
        sha: sha
      })
    });

    if (response.ok) {
      console.log(`✓ Deleted: ${filePath}`);
    } else {
      console.error(`✗ Failed to delete ${filePath}: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
}

// Run the deletion
deleteAllFiles();