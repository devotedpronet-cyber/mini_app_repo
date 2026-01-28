// Backend server to provide weather data to the Mini App
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Route to get weather data
app.get('/api/weather', async (req, res) => {
  try {
    // Using the weather skill to get current weather
    // This assumes we have access to the weather skill in our backend
    const { exec } = require('child_process');
    
    exec('node -e "require(\'./weather-service\').getCurrentWeather()"', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: 'Unable to fetch weather data' });
      }
      
      res.json(JSON.parse(stdout));
    });
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// Fallback route for the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});