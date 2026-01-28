const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Get active services and notifications
router.get('/dashboard', async (req, res) => {
  try {
    // Get actual Moltbot services and status
    const activeServices = await getActiveServices();
    const notifications = await getNotifications();
    
    res.json({
      services: activeServices,
      notifications: notifications,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

// Get all active services
async function getActiveServices() {
  // This would connect to actual Moltbot systems
  // For now, returning mock data that represents real functionality
  return [
    { id: 1, name: 'Video Processing', status: 'active', progress: 45, description: 'Processing Bob.Proctor-You.Were.Born.Rich.DVD.1.mp4' },
    { id: 2, name: 'Weather Monitoring', status: 'active', progress: 100, description: 'Current weather in Estoril' },
    { id: 3, name: 'Telegram Interface', status: 'active', progress: 100, description: 'Active communication channel' },
    { id: 4, name: 'Memory System', status: 'active', progress: 100, description: 'Personal knowledge management' },
    { id: 5, name: 'Property Monitoring', status: 'active', progress: 100, description: 'Idealista property searches' }
  ];
}

// Get notifications
async function getNotifications() {
  // This would get actual notifications from Moltbot
  return [
    { id: 1, type: 'info', message: 'Video transcription in progress (45% complete)', timestamp: new Date(Date.now() - 300000).toISOString() },
    { id: 2, type: 'info', message: 'New property listings found (3 matches)', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, type: 'warning', message: 'Storage approaching capacity', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: 4, type: 'info', message: 'System maintenance scheduled', timestamp: new Date(Date.now() - 172800000).toISOString() },
    { id: 5, type: 'info', message: 'New weather alert for tomorrow', timestamp: new Date(Date.now() - 43200000).toISOString() }
  ];
}

// Get current tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json({ tasks });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

// Get current tasks from Moltbot
async function getTasks() {
  // This would connect to actual Moltbot task system
  // For now, returning mock data representing real tasks
  return [
    { 
      id: 1, 
      title: 'Video Transcription', 
      description: 'Transcribing Bob.Proctor-You.Were.Born.Rich.DVD.1.mp4 (3.5h video)', 
      status: 'in-progress', 
      progress: 45, 
      startTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      estimatedCompletion: new Date(Date.now() + 9000000).toISOString() // 2.5 hours from now
    },
    { 
      id: 2, 
      title: 'System Monitoring', 
      description: 'Monitoring system resources and performance', 
      status: 'active', 
      progress: 100 
    },
    { 
      id: 3, 
      title: 'Telegram Integration', 
      description: 'Maintaining active communication channel', 
      status: 'active', 
      progress: 100 
    },
    { 
      id: 4, 
      title: 'Weather Updates', 
      description: 'Fetching and processing weather information for Estoril', 
      status: 'scheduled', 
      nextRun: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
    }
  ];
}

// Get cron jobs
router.get('/cron', async (req, res) => {
  try {
    const cronJobs = await getCronJobs();
    res.json({ cronJobs });
  } catch (error) {
    console.error('Error getting cron jobs:', error);
    res.status(500).json({ error: 'Failed to get cron jobs' });
  }
});

// Get actual cron jobs from the system
async function getCronJobs() {
  // This would connect to actual Moltbot cron system
  // For now, returning mock data representing real cron jobs
  return [
    { 
      id: 1, 
      name: 'Weather Check', 
      schedule: 'Every 1 hour', 
      lastRun: new Date(Date.now() - 3600000).toISOString(), 
      nextRun: new Date(Date.now() + 3600000).toISOString(),
      description: 'Check weather conditions for Estoril',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Property Monitor', 
      schedule: 'Every 30 minutes', 
      lastRun: new Date(Date.now() - 1800000).toISOString(), 
      nextRun: new Date(Date.now() + 1800000).toISOString(),
      description: 'Monitor Idealista for new property listings',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'System Health', 
      schedule: 'Every 15 minutes', 
      lastRun: new Date(Date.now() - 900000).toISOString(), 
      nextRun: new Date(Date.now() + 900000).toISOString(),
      description: 'Monitor system resources and performance',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Telegram Sync', 
      schedule: 'Every 5 minutes', 
      lastRun: new Date(Date.now() - 300000).toISOString(), 
      nextRun: new Date(Date.now() + 300000).toISOString(),
      description: 'Sync with Telegram for new messages',
      status: 'active'
    }
  ];
}

module.exports = router;
module.exports.getActiveServices = getActiveServices;
module.exports.getNotifications = getNotifications;
module.exports.getCronJobs = getCronJobs;
module.exports.getTasks = getTasks;