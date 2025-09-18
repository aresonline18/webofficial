const GITHUB_TOKEN = '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';
const REPO_OWNER = 'aresonline18';
const REPO_NAME = 'webofficial';

async function getAllFilesRecursively(path = '') {
  const allFiles = [];
  
  try {
    const url = path 
      ? `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`
      : `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;
      
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Cleanup-Script'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return []; // Empty repository or path doesn't exist
      }
      throw new Error(`Failed to fetch contents: ${response.status} ${response.statusText}`);
    }

    const contents = await response.json();
    
    for (const item of contents) {
      if (item.type === 'file') {
        allFiles.push(item);
      } else if (item.type === 'dir') {
        // Recursively get files from subdirectories
        const subFiles = await getAllFilesRecursively(item.path);
        allFiles.push(...subFiles);
      }
    }
  } catch (error) {
    console.error(`Error getting files from ${path}:`, error.message);
  }
  
  return allFiles;
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
      return true;
    } else {
      const errorText = await response.text();
      console.error(`✗ Failed to delete ${filePath}: ${response.status} - ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
    return false;
  }
}

async function deleteAllFilesRecursively() {
  console.log('Starting comprehensive deletion process...');
  
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    attempts++;
    console.log(`\n--- Attempt ${attempts} ---`);
    
    // Get all files (recursively)
    const allFiles = await getAllFilesRecursively();
    
    if (allFiles.length === 0) {
      console.log('✓ Repository is completely empty!');
      break;
    }
    
    console.log(`Found ${allFiles.length} files to delete`);
    
    // Sort files by depth (deeper files first) to avoid dependency issues
    allFiles.sort((a, b) => {
      const depthA = a.path.split('/').length;
      const depthB = b.path.split('/').length;
      return depthB - depthA; // Deeper files first
    });
    
    let deletedCount = 0;
    
    for (const file of allFiles) {
      const success = await deleteFile(file.path, file.sha);
      if (success) {
        deletedCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    console.log(`Deleted ${deletedCount} out of ${allFiles.length} files in this attempt`);
    
    if (deletedCount === 0) {
      console.log('No files were deleted in this attempt. Stopping.');
      break;
    }
  }
  
  // Final verification
  const remainingFiles = await getAllFilesRecursively();
  if (remainingFiles.length === 0) {
    console.log('\n🎉 SUCCESS: Repository is completely empty!');
  } else {
    console.log(`\n⚠️  ${remainingFiles.length} files still remain:`);
    remainingFiles.forEach(file => console.log(`   - ${file.path}`));
  }
}

// Run the comprehensive deletion
deleteAllFilesRecursively();