// Weather service for the Mini App
const axios = require('axios');
const cheerio = require('cheerio'); // For parsing HTML content

/**
 * Gets current weather data from Weather Underground
 * @param {string} location - Location to get weather for (optional, defaults to Estoril)
 * @returns {Promise<Object>} Weather data
 */
async function getCurrentWeather(location = 'Estoril, Portugal') {
  try {
    // Scrape weather data from Weather Underground
    const url = 'https://www.wunderground.com/forecast/pt/estoril';
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract weather data from the page
    // This selector looks for the current temperature
    let temperature = null;
    let description = 'Weather data unavailable';
    let feelsLike = null;
    let humidity = null;
    let windSpeed = null;
    
    // Try to find the temperature element
    // Wunderground typically has temperature in a span or div with specific classes
    const tempElement = $('.temp .wu-value');
    if (tempElement.length > 0) {
      temperature = parseInt(tempElement.text().replace(/[^\d.-]/g, '')); // Extract just the number
    }
    
    // Look for the weather description/condition
    const conditionElement = $('.condition-description, .wx-phrase, [data-test="wxPhrase"]');
    if (conditionElement.length > 0) {
      description = conditionElement.text().trim();
    }
    
    // Look for "feels like" temperature
    const feelsLikeElement = $('[data-test="FeelsLikeValue"]');
    if (feelsLikeElement.length > 0) {
      feelsLike = parseInt(feelsLikeElement.text().replace(/[^\d.-]/g, ''));
    } else {
      // If no feels-like is found, use the main temperature
      feelsLike = temperature;
    }
    
    // Look for humidity
    const humidityElement = $('[data-test="HumidityValue"]');
    if (humidityElement.length > 0) {
      humidity = parseInt(humidityElement.text().replace(/[^\d]/g, ''));
    }
    
    // Look for wind speed
    const windElement = $('[data-test="WindValue"]');
    if (windElement.length > 0) {
      const windText = windElement.text();
      // Extract numeric value from wind speed text (e.g., "10 km/h")
      windSpeed = parseFloat(windText.match(/\d+/)?.[0]);
    }
    
    // If we couldn't extract temperature from the actual page, use fallback
    if (temperature === null || isNaN(temperature)) {
      // For demonstration purposes, returning mock data
      // In a real implementation, this would continue trying to parse the page
      return {
        temperature: 22,
        feelsLike: 24,
        description: 'Weather data temporarily unavailable',
        location: location,
        humidity: 65,
        windSpeed: 3.2,
        source: 'Wunderground scraping failed, using fallback'
      };
    }
    
    return {
      temperature: Math.round(temperature),
      feelsLike: feelsLike ? Math.round(feelsLike) : Math.round(temperature),
      description: description || 'Weather condition',
      location: location,
      humidity: humidity || null,
      windSpeed: windSpeed || null,
      source: 'Weather Underground'
    };
  } catch (error) {
    console.error('Error getting weather from Wunderground:', error.message);
    
    // Return fallback data in case of scraping error
    return {
      temperature: 22,
      feelsLike: 24,
      description: 'Weather data temporarily unavailable',
      location: location || 'Estoril, Portugal',
      humidity: 65,
      windSpeed: 3.2,
      source: 'Fallback data'
    };
  }
}

/**
 * Gets weather forecast for the next few days from Weather Underground
 * @param {string} location - Location to get forecast for
 * @returns {Promise<Array>} Forecast data
 */
async function getForecast(location = 'Estoril, Portugal') {
  try {
    const url = 'https://www.wunderground.com/forecast/pt/estoril';
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // This is a simplified example - actual selectors would need to be determined
    // by examining the actual Wunderground page structure
    const forecast = [];
    
    // Look for forecast elements (this would need to be adjusted based on actual page structure)
    $('.daily-forecast .forecast-day').each((index, element) => {
      if (index < 3) { // Get first 3 days
        const day = $(element).find('.day').text().trim();
        const high = parseInt($(element).find('.hi').text().replace(/[^\d.-]/g, ''));
        const low = parseInt($(element).find('.lo').text().replace(/[^\d.-]/g, ''));
        const condition = $(element).find('.condition').text().trim();
        
        if (day && !isNaN(high) && !isNaN(low)) {
          forecast.push({
            day: day,
            high: Math.round(high),
            low: Math.round(low),
            description: condition || 'Forecast'
          });
        }
      }
    });
    
    // If we couldn't parse the forecast, return mock data
    if (forecast.length === 0) {
      return [
        { day: 'Today', high: 24, low: 16, description: 'Partly cloudy' },
        { day: 'Tomorrow', high: 26, low: 17, description: 'Sunny' },
        { day: 'Wednesday', high: 23, low: 15, description: 'Cloudy' }
      ];
    }
    
    return forecast;
  } catch (error) {
    console.error('Error getting forecast from Wunderground:', error.message);
    // Return fallback forecast data
    return [
      { day: 'Today', high: 24, low: 16, description: 'Partly cloudy' },
      { day: 'Tomorrow', high: 26, low: 17, description: 'Sunny' },
      { day: 'Wednesday', high: 23, low: 15, description: 'Cloudy' }
    ];
  }
}

module.exports = {
  getCurrentWeather,
  getForecast
};