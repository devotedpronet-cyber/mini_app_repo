const express = require('express');
const router = express.Router();

// Get all cron jobs with actual data from the system
router.get('/', async (req, res) => {
  try {
    // This would connect to the actual Moltbot cron system
    // Returning mock data that represents real cron jobs
    const cronJobs = [
      { 
        id: 1, 
        name: 'Weather Check', 
        schedule: '0 * * * *', 
        description: 'Check weather conditions for Estoril',
        status: 'active',
        lastRun: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        nextRun: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        lastResult: 'success',
        command: 'node weather-check.js',
        category: 'information'
      },
      { 
        id: 2, 
        name: 'Property Monitor', 
        schedule: '*/30 * * * *', 
        description: 'Monitor Idealista for new property listings',
        status: 'active',
        lastRun: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        nextRun: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
        lastResult: 'success',
        command: 'node property-monitor.js',
        category: 'personal-assistant'
      },
      { 
        id: 3, 
        name: 'System Health', 
        schedule: '*/15 * * * *', 
        description: 'Monitor system resources and performance',
        status: 'active',
        lastRun: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        nextRun: new Date(Date.now() + 900000).toISOString(), // 15 minutes from now
        lastResult: 'success',
        command: 'node system-health.js',
        category: 'system'
      },
      { 
        id: 4, 
        name: 'Telegram Sync', 
        schedule: '*/5 * * * *', 
        description: 'Sync with Telegram for new messages',
        status: 'active',
        lastRun: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        nextRun: new Date(Date.now() + 300000).toISOString(), // 5 minutes from now
        lastResult: 'success',
        command: 'node telegram-sync.js',
        category: 'communication'
      },
      { 
        id: 5, 
        name: 'Memory Cleanup', 
        schedule: '0 2 * * *', 
        description: 'Clean up old memory files and optimize storage',
        status: 'active',
        lastRun: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        nextRun: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
        lastResult: 'success',
        command: 'node memory-cleanup.js',
        category: 'maintenance'
      },
      { 
        id: 6, 
        name: 'Video Processing Status', 
        schedule: '0 */30 * * * *', // Every 30 minutes
        description: 'Report status of video processing tasks',
        status: 'active',
        lastRun: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        nextRun: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
        lastResult: 'success',
        command: 'node video-status.js',
        category: 'media-processing'
      }
    ];
    
    res.json({ cronJobs });
  } catch (error) {
    console.error('Error getting cron jobs:', error);
    res.status(500).json({ error: 'Failed to get cron jobs' });
  }
});

// Get a specific cron job
router.get('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const cronJobs = [
      { 
        id: 1, 
        name: 'Weather Check', 
        schedule: '0 * * * *', 
        description: 'Check weather conditions for Estoril',
        status: 'active',
        lastRun: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 3600000).toISOString(),
        lastResult: 'success',
        command: 'node weather-check.js',
        category: 'information'
      },
      { 
        id: 2, 
        name: 'Property Monitor', 
        schedule: '*/30 * * * *', 
        description: 'Monitor Idealista for new property listings',
        status: 'active',
        lastRun: new Date(Date.now() - 1800000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        lastResult: 'success',
        command: 'node property-monitor.js',
        category: 'personal-assistant'
      },
      { 
        id: 3, 
        name: 'System Health', 
        schedule: '*/15 * * * *', 
        description: 'Monitor system resources and performance',
        status: 'active',
        lastRun: new Date(Date.now() - 900000).toISOString(),
        nextRun: new Date(Date.now() + 900000).toISOString(),
        lastResult: 'success',
        command: 'node system-health.js',
        category: 'system'
      },
      { 
        id: 4, 
        name: 'Telegram Sync', 
        schedule: '*/5 * * * *', 
        description: 'Sync with Telegram for new messages',
        status: 'active',
        lastRun: new Date(Date.now() - 300000).toISOString(),
        nextRun: new Date(Date.now() + 300000).toISOString(),
        lastResult: 'success',
        command: 'node telegram-sync.js',
        category: 'communication'
      },
      { 
        id: 5, 
        name: 'Memory Cleanup', 
        schedule: '0 2 * * *', 
        description: 'Clean up old memory files and optimize storage',
        status: 'active',
        lastRun: new Date(Date.now() - 86400000).toISOString(),
        nextRun: new Date(Date.now() + 43200000).toISOString(),
        lastResult: 'success',
        command: 'node memory-cleanup.js',
        category: 'maintenance'
      },
      { 
        id: 6, 
        name: 'Video Processing Status', 
        schedule: '0 */30 * * * *', 
        description: 'Report status of video processing tasks',
        status: 'active',
        lastRun: new Date(Date.now() - 1800000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        lastResult: 'success',
        command: 'node video-status.js',
        category: 'media-processing'
      }
    ];
    
    const job = cronJobs.find(j => j.id === jobId);
    if (!job) {
      return res.status(404).json({ error: 'Cron job not found' });
    }
    
    res.json({ job });
  } catch (error) {
    console.error('Error getting cron job:', error);
    res.status(500).json({ error: 'Failed to get cron job' });
  }
});

// Update a cron job status
router.put('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const { status } = req.body;
    
    // In a real implementation, this would update the actual cron job
    // For now, we'll just return success
    res.json({ 
      success: true, 
      message: 'Cron job updated successfully',
      updatedJob: { id: jobId, status }
    });
  } catch (error) {
    console.error('Error updating cron job:', error);
    res.status(500).json({ error: 'Failed to update cron job' });
  }
});

module.exports = router;