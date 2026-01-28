// Enhanced Weather service for the Mini App
const axios = require('axios');

/**
 * Gets current weather data from WeatherAPI.com
 * @param {string} location - Location to get weather for (optional, defaults to Estoril)
 * @returns {Promise<Object>} Enhanced weather data
 */
async function getCurrentWeather(location = 'Estoril, Portugal') {
  try {
    // Use WeatherAPI with your API key
    const apiKey = process.env.WEATHER_API_KEY || 'df3b640d19554b709fa141721262801';
    const locationParam = location.includes(',') ? location.split(',')[0].trim() : location;
    
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(locationParam)}&aqi=no`);
    
    const weatherData = response.data;
    
    return {
      temperature: Math.round(weatherData.current.temp_c),
      feelsLike: Math.round(weatherData.current.feelslike_c),
      description: weatherData.current.condition.text,
      location: `${weatherData.location.name}, ${weatherData.location.country}`,
      humidity: weatherData.current.humidity,
      windSpeed: Math.round(weatherData.current.wind_kph),
      windDirection: weatherData.current.wind_dir,
      windDegree: weatherData.current.wind_degree,
      pressure: weatherData.current.pressure_mb,
      visibility: weatherData.current.vis_km,
      cloudCover: weatherData.current.cloud,
      uvIndex: weatherData.current.uv,
      precipitation: weatherData.current.precip_mm,
      gust: weatherData.current.gust_kph,
      icon: weatherData.current.condition.icon,
      source: 'WeatherAPI.com'
    };
  } catch (error) {
    console.error('Error getting weather from WeatherAPI:', error.message);
    
    // Return fallback data in case of API error
    return {
      temperature: 22,
      feelsLike: 24,
      description: 'Weather data temporarily unavailable',
      location: location || 'Estoril, Portugal',
      humidity: 65,
      windSpeed: 3.2,
      windDirection: 'NE',
      windDegree: 45,
      pressure: 1013,
      visibility: 10,
      cloudCover: 50,
      uvIndex: 3,
      precipitation: 0,
      gust: 5.5,
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      source: 'Fallback data'
    };
  }
}

/**
 * Gets weather forecast for the next few days from WeatherAPI.com
 * @param {string} location - Location to get forecast for
 * @returns {Promise<Array>} Enhanced forecast data
 */
async function getForecast(location = 'Estoril, Portugal') {
  try {
    const apiKey = process.env.WEATHER_API_KEY || 'df3b640d19554b709fa141721262801';
    const locationParam = location.includes(',') ? location.split(',')[0].trim() : location;
    
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(locationParam)}&days=5&aqi=no&alerts=no`);
    
    const forecastData = response.data;
    const forecast = [];
    
    // Process the forecast data with enhanced information
    forecastData.forecast.forecastday.forEach((day, index) => {
      const dayNames = ['Today', 'Tomorrow', 'In 2 days', 'In 3 days', 'In 4 days'];
      forecast.push({
        day: index < 5 ? dayNames[index] : day.date,
        date: day.date,
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c),
        avgTemp: Math.round(day.day.avgtemp_c),
        description: day.day.condition.text,
        icon: day.day.condition.icon,
        precipitation: day.day.totalprecip_mm,
        precipitationChance: day.day.daily_chance_of_rain,
        humidity: day.day.avghumidity,
        windMax: Math.round(day.day.maxwind_kph),
        windDirection: day.day.wind_dir_max,
        uvIndex: day.day.uv,
        sunshine: day.day.sunshine_hours,
        cloudCover: day.day.daily_will_it_rain ? 80 : 40 // Approximation
      });
    });
    
    return forecast;
  } catch (error) {
    console.error('Error getting forecast from WeatherAPI:', error.message);
    
    // Return fallback forecast data
    return [
      { 
        day: 'Today', 
        date: new Date().toISOString().split('T')[0],
        high: 24, 
        low: 16, 
        avgTemp: 20,
        description: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        precipitation: 0.5,
        precipitationChance: 20,
        humidity: 65,
        windMax: 12.5,
        windDirection: 'SE',
        uvIndex: 5,
        sunshine: 6,
        cloudCover: 40
      },
      { 
        day: 'Tomorrow', 
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        high: 26, 
        low: 17, 
        avgTemp: 21,
        description: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        precipitation: 0,
        precipitationChance: 0,
        humidity: 60,
        windMax: 8.3,
        windDirection: 'SW',
        uvIndex: 6,
        sunshine: 8,
        cloudCover: 20
      },
      { 
        day: 'In 2 days', 
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        high: 23, 
        low: 15, 
        avgTemp: 19,
        description: 'Cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
        precipitation: 2.1,
        precipitationChance: 60,
        humidity: 75,
        windMax: 15.7,
        windDirection: 'NW',
        uvIndex: 4,
        sunshine: 4,
        cloudCover: 70
      }
    ];
  }
}

module.exports = {
  getCurrentWeather,
  getForecast
};