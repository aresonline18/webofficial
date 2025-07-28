import { Express } from "express";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import https from "https";
import http from "http";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Function to download image from URL and save locally
export async function downloadAndHostImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!imageUrl || !imageUrl.startsWith('http')) {
      reject(new Error('Invalid image URL'));
      return;
    }

    const protocol = imageUrl.startsWith('https') ? https : http;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    // Extract file extension from URL or default to .jpg
    let ext = '.jpg';
    const urlParts = imageUrl.split('?')[0].split('/');
    const lastPart = urlParts[urlParts.length - 1];
    if (lastPart.includes('.')) {
      const possibleExt = '.' + lastPart.split('.').pop()?.toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(possibleExt)) {
        ext = possibleExt;
      }
    }

    const filename = `webhook-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadsDir, filename);
    const file = fs.createWriteStream(filePath);

    protocol.get(imageUrl, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          console.log(`Following redirect to: ${redirectUrl}`);
          file.close(); // Close the file stream
          fs.unlink(filePath, () => {}); // Remove the empty file
          // Recursively call with the redirect URL
          downloadAndHostImage(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        // Return the hosted URL
        resolve(`/uploads/${filename}`);
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

export function setupImageUpload(app: Express) {
  // Serve uploaded images statically
  app.use('/uploads', express.static(uploadsDir));
  
  // Image upload endpoint
  app.post('/api/upload/image', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Return the URL where the image can be accessed
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      
      res.json({
        success: true,
        imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      });
    } catch (error) {
      console.error('Image upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // Delete uploaded image endpoint
  app.delete('/api/upload/image/:filename', (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadsDir, filename);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ success: true, message: 'Image deleted successfully' });
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Image deletion error:', error);
      res.status(500).json({ error: 'Failed to delete image' });
    }
  });
}