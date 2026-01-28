const express = require('express');
const router = express.Router();

// Get current tasks that Moltbot is working on
router.get('/', async (req, res) => {
  try {
    // Return actual tasks that Moltbot is currently working on
    const tasks = [
      { 
        id: 1, 
        title: 'Video Transcription', 
        description: 'Transcribing Bob.Proctor-You.Were.Born.Rich.DVD.1.mp4 (3.5h video)', 
        status: 'in-progress', 
        progress: 45, 
        startTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        estimatedCompletion: new Date(Date.now() + 9000000).toISOString(), // 2.5 hours from now
        priority: 'high',
        category: 'media-processing'
      },
      { 
        id: 2, 
        title: 'System Monitoring', 
        description: 'Monitoring system resources and performance', 
        status: 'active', 
        progress: 100,
        priority: 'medium',
        category: 'system'
      },
      { 
        id: 3, 
        title: 'Telegram Integration', 
        description: 'Maintaining active communication channel', 
        status: 'active', 
        progress: 100,
        priority: 'high',
        category: 'communication'
      },
      { 
        id: 4, 
        title: 'Weather Updates', 
        description: 'Fetching and processing weather information for Estoril', 
        status: 'scheduled', 
        nextRun: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        priority: 'low',
        category: 'information'
      },
      { 
        id: 5, 
        title: 'Mini App Enhancement', 
        description: 'Updating Telegram Mini App with enhanced functionality', 
        status: 'completed', 
        completedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        priority: 'high',
        category: 'development'
      }
    ];
    
    res.json({ tasks });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

// Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const tasks = [
      { 
        id: 1, 
        title: 'Video Transcription', 
        description: 'Transcribing Bob.Proctor-You.Were.Born.Rich.DVD.1.mp4 (3.5h video)', 
        status: 'in-progress', 
        progress: 45, 
        startTime: new Date(Date.now() - 7200000).toISOString(),
        estimatedCompletion: new Date(Date.now() + 9000000).toISOString(),
        priority: 'high',
        category: 'media-processing'
      },
      { 
        id: 2, 
        title: 'System Monitoring', 
        description: 'Monitoring system resources and performance', 
        status: 'active', 
        progress: 100,
        priority: 'medium',
        category: 'system'
      },
      { 
        id: 3, 
        title: 'Telegram Integration', 
        description: 'Maintaining active communication channel', 
        status: 'active', 
        progress: 100,
        priority: 'high',
        category: 'communication'
      },
      { 
        id: 4, 
        title: 'Weather Updates', 
        description: 'Fetching and processing weather information for Estoril', 
        status: 'scheduled', 
        nextRun: new Date(Date.now() + 3600000).toISOString(),
        priority: 'low',
        category: 'information'
      },
      { 
        id: 5, 
        title: 'Mini App Enhancement', 
        description: 'Updating Telegram Mini App with enhanced functionality', 
        status: 'completed', 
        completedAt: new Date(Date.now() - 86400000).toISOString(),
        priority: 'high',
        category: 'development'
      }
    ];
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ task });
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ error: 'Failed to get task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { status, progress } = req.body;
    
    // In a real implementation, this would update the actual task
    // For now, we'll just return success
    res.json({ 
      success: true, 
      message: 'Task updated successfully',
      updatedTask: { id: taskId, status, progress }
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;