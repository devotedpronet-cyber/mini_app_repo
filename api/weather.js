// Weather API endpoint for the Mini App
// This connects to Weather Underground to get current weather data for Estoril

// Import necessary modules
const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('../weather-service');

// Endpoint to get current weather
router.get('/', async (req, res) => {
  try {
    // Get weather data from Weather Underground for Estoril
    const weatherData = await getCurrentWeather('Estoril, Portugal');
    
    // Get forecast data
    const forecastData = await getForecast('Estoril, Portugal');
    
    // Combine current weather and forecast
    const response = {
      ...weatherData,
      forecast: forecastData,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error in weather API:', error);
    res.status(500).json({ 
      error: 'Unable to fetch weather data',
      source: 'Wunderground API error'
    });
  }
});

module.exports = router;