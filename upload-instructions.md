# Quick GitHub Upload Instructions

## Option 1: Using the API Script (After Getting Token)

1. **Get your GitHub token** from https://github.com/settings/tokens
2. **Set the token** in Replit (I'll help you with this)
3. **Run the upload script**:
   ```bash
   node github-upload.js
   ```

## Option 2: Manual Upload (No Token Needed)

Since the API requires a token setup, here's the **immediate solution**:

### Step 1: Download Project
- Click the **"..."** menu in Replit → **"Download as ZIP"**

### Step 2: Upload to GitHub
1. Go to your repository: https://github.com/aresonline18/webofficial
2. Click **"Add file"** → **"Upload files"**
3. Drag these folders/files from the ZIP:
   - `client/` folder
   - `server/` folder
   - `shared/` folder
   - `package.json`
   - `tsconfig.json`
   - `tailwind.config.ts`
   - `vite.config.ts`
   - `drizzle.config.ts`
   - `components.json`
   - `postcss.config.js`
   - `.env.example`
   - `README.md`

4. **Commit message**: "Add Shadow Pages platform"
5. **Click "Commit changes"**

### Step 3: Done!
Your existing website stays the same, Shadow Pages is added safely.

**Which method do you prefer?** 
- API script (need to get GitHub token first)
- Manual upload (works immediately)