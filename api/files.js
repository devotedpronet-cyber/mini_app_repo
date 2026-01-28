const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Get files in a directory
router.get('/', async (req, res) => {
  try {
    const dirPath = req.query.path || './';
    const directoryPath = path.resolve(process.cwd(), dirPath);
    
    // Security: Prevent directory traversal
    if (!directoryPath.startsWith(process.cwd())) {
      return res.status(400).json({ error: 'Invalid directory path' });
    }
    
    const items = await fs.readdir(directoryPath, { withFileTypes: true });
    
    const fileList = await Promise.all(items.map(async (item) => {
      const itemPath = path.join(directoryPath, item.name);
      const stats = await fs.stat(itemPath);
      
      return {
        name: item.name,
        path: path.relative(process.cwd(), itemPath),
        isDirectory: item.isDirectory(),
        size: stats.size,
        modified: stats.mtime,
        created: stats.birthtime
      };
    }));
    
    res.json({ 
      path: directoryPath,
      items: fileList 
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

// Get file details
router.get('/detail', async (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) {
      return res.status(400).json({ error: 'File path required' });
    }
    
    const resolvedPath = path.resolve(process.cwd(), filePath);
    
    // Security: Prevent directory traversal
    if (!resolvedPath.startsWith(process.cwd())) {
      return res.status(400).json({ error: 'Invalid file path' });
    }
    
    const stats = await fs.stat(resolvedPath);
    const content = await fs.readFile(resolvedPath, 'utf8');
    
    res.json({
      name: path.basename(resolvedPath),
      path: filePath,
      size: stats.size,
      modified: stats.mtime,
      created: stats.birthtime,
      content: content.substring(0, 1000) // Limit content length
    });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
});

module.exports = router;