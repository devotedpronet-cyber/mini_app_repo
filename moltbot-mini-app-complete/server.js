const express = require('express');
const cors = require('cors');
const path = require('path');
const { getActiveServices, getNotifications, getCronJobs, getTasks } = require('./api/system');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.use('/api', require('./api/system'));
app.use('/api/weather', require('./api/weather'));
app.use('/api/files', require('./api/files'));
app.use('/api/notes', require('./api/notes'));
app.use('/api/tasks', require('./api/tasks'));
app.use('/api/cron', require('./api/cron'));
app.use('/api/search', require('./api/search'));

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Moltbot Mini App server running on port ${PORT}`);
});