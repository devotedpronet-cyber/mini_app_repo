// Enhanced Weather API endpoint for the Mini App
// This connects to WeatherAPI.com to get detailed current weather data for Estoril

// Import necessary modules
const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('../enhanced-weather-service'); // Using the enhanced service from previous implementation

// Endpoint to get current weather
router.get('/', async (req, res) => {
  try {
    // Get enhanced weather data from WeatherAPI.com for Estoril
    const weatherData = await getCurrentWeather('Estoril, Portugal');
    
    // Get enhanced forecast data
    const forecastData = await getForecast('Estoril, Portugal');
    
    // Combine current weather and forecast
    const response = {
      ...weatherData,
      forecast: forecastData,
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error in enhanced weather API:', error);
    res.status(500).json({ 
      error: 'Unable to fetch weather data',
      source: 'WeatherAPI.com error'
    });
  }
});

module.exports = router;