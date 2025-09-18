const { Octokit } = require("@octokit/rest");
const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'aresonline18';
const REPO = 'webofficial';

if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN environment variable is required');
    process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Files to upload for SEO update
const filesToUpload = [
    'client/src/components/SEOHead.tsx',
    'client/src/pages/free-resources.tsx'
];

async function uploadFile(filePath) {
    try {
        const fullPath = path.join(process.cwd(), filePath);
        
        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            return false;
        }

        const content = fs.readFileSync(fullPath, 'utf8');
        const base64Content = Buffer.from(content).toString('base64');

        try {
            // Try to get existing file
            const { data: existingFile } = await octokit.repos.getContent({
                owner: OWNER,
                repo: REPO,
                path: filePath,
            });

            // Update existing file
            await octokit.repos.createOrUpdateFileContents({
                owner: OWNER,
                repo: REPO,
                path: filePath,
                message: `Update ${filePath} - Add SEO meta tags for Google search`,
                content: base64Content,
                sha: existingFile.sha,
            });
        } catch (error) {
            if (error.status === 404) {
                // Create new file
                await octokit.repos.createOrUpdateFileContents({
                    owner: OWNER,
                    repo: REPO,
                    path: filePath,
                    message: `Create ${filePath} - Add SEO meta tags for Google search`,
                    content: base64Content,
                });
            } else {
                throw error;
            }
        }

        console.log(`✅ ${filePath}`);
        return true;
    } catch (error) {
        console.log(`❌ Failed to upload ${filePath}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🔍 UPLOADING SEO ENHANCEMENTS TO GITHUB');
    console.log(`Repository: ${OWNER}/${REPO}\n`);

    let successCount = 0;
    let failCount = 0;

    for (const file of filesToUpload) {
        const success = await uploadFile(file);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
        
        // Small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n🎉 SEO UPLOAD COMPLETE!');
    console.log('──────────────────────────────────────────────────');
    console.log(`✅ Uploaded: ${successCount} files`);
    console.log(`❌ Failed: ${failCount} files`);
    console.log(`\n🌐 Repository: https://github.com/${OWNER}/${REPO}`);
    console.log('🔍 SEO Meta Tags: "Free materials to help you start, run and profit from Shadow Pages"');
}

main().catch(console.error);
