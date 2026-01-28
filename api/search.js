const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Search through memory files and other documents
router.get('/', async (req, res) => {
  try {
    const query = req.query.q || '';
    const limit = parseInt(req.query.limit) || 10;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    
    // Search in memory files
    const memoryDir = path.join(process.cwd(), 'memory');
    const results = [];
    
    try {
      const memoryFiles = await fs.readdir(memoryDir);
      
      for (const file of memoryFiles) {
        if (path.extname(file) === '.md') {
          const filePath = path.join(memoryDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          // Simple text search (in a real implementation, this would be more sophisticated)
          if (content.toLowerCase().includes(query.toLowerCase())) {
            const lines = content.split('\n');
            const matchingLines = [];
            
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].toLowerCase().includes(query.toLowerCase())) {
                // Include context around the match
                const start = Math.max(0, i - 1);
                const end = Math.min(lines.length, i + 2);
                const context = lines.slice(start, end).join(' ... ');
                
                matchingLines.push({
                  line: i + 1,
                  content: context,
                  file: file
                });
                
                if (matchingLines.length >= 3) break; // Limit matches per file
              }
            }
            
            if (matchingLines.length > 0) {
              results.push({
                file: file,
                path: filePath,
                matches: matchingLines,
                preview: content.substring(0, 200) + (content.length > 200 ? '...' : '')
              });
            }
            
            if (results.length >= limit) break;
          }
        }
      }
    } catch (error) {
      // Memory directory might not exist, which is fine
      console.log('Memory directory not found, skipping search there');
    }
    
    // Search in other common directories
    const searchDirs = ['.', 'notes', 'documents', 'knowledge'];
    
    for (const dir of searchDirs) {
      try {
        const fullPath = path.join(process.cwd(), dir);
        const dirExists = await fs.access(fullPath).then(() => true).catch(() => false);
        
        if (dirExists) {
          const files = await fs.readdir(fullPath);
          
          for (const file of files) {
            if (path.extname(file) === '.md' || path.extname(file) === '.txt') {
              const filePath = path.join(fullPath, file);
              const content = await fs.readFile(filePath, 'utf8');
              
              if (content.toLowerCase().includes(query.toLowerCase())) {
                // Only add if not already in results
                const exists = results.some(r => r.file === file);
                if (!exists) {
                  results.push({
                    file: file,
                    path: filePath,
                    matches: [{ line: 1, content: content.substring(0, 200) + '...', file: file }],
                    preview: content.substring(0, 200) + (content.length > 200 ? '...' : '')
                  });
                  
                  if (results.length >= limit) break;
                }
              }
            }
          }
        }
      } catch (error) {
        // Directory might not exist, which is fine
        continue;
      }
      
      if (results.length >= limit) break;
    }
    
    res.json({ 
      query: query,
      results: results,
      total: results.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
});

module.exports = router;