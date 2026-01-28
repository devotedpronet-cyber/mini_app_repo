const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notesDir = path.join(process.cwd(), 'notes');
    
    // Create notes directory if it doesn't exist
    await fs.mkdir(notesDir, { recursive: true });
    
    const noteFiles = await fs.readdir(notesDir);
    const notes = [];
    
    for (const file of noteFiles) {
      if (path.extname(file) === '.txt') {
        const filePath = path.join(notesDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const stats = await fs.stat(filePath);
        
        notes.push({
          id: path.basename(file, '.txt'),
          title: path.basename(file, '.txt'),
          content: content.substring(0, 200) + (content.length > 200 ? '...' : ''), // Truncate long content
          createdAt: stats.birthtime,
          updatedAt: stats.mtime,
          fullContent: content
        });
      }
    }
    
    res.json({ notes });
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
});

// Get a specific note
router.get('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const notePath = path.join(process.cwd(), 'notes', `${noteId}.txt`);
    
    const content = await fs.readFile(notePath, 'utf8');
    const stats = await fs.stat(notePath);
    
    res.json({
      id: noteId,
      title: noteId,
      content: content,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime
    });
  } catch (error) {
    console.error('Error getting note:', error);
    res.status(500).json({ error: 'Failed to get note' });
  }
});

// Create or update a note
router.post('/', async (req, res) => {
  try {
    const { id, title, content } = req.body;
    
    if (!id || !content) {
      return res.status(400).json({ error: 'ID and content required' });
    }
    
    const notesDir = path.join(process.cwd(), 'notes');
    await fs.mkdir(notesDir, { recursive: true });
    
    const notePath = path.join(notesDir, `${id}.txt`);
    await fs.writeFile(notePath, content);
    
    res.json({ success: true, message: 'Note saved successfully' });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Failed to save note' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const notePath = path.join(process.cwd(), 'notes', `${noteId}.txt`);
    
    await fs.unlink(notePath);
    
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;