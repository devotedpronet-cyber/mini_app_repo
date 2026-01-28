# Moltbot Telegram Mini App

A comprehensive Telegram Mini App featuring a personal dashboard, weather app, task manager, and system status panel.

## Features

1. **Personal Dashboard** - A quick overview of your daily tasks, calendar events, and important notifications
2. **Weather App** - Current weather and forecast for Estoril, Portugal using WeatherAPI.com
3. **Task Manager** - A simple interface to create, view, and manage your to-do list with priority levels
4. **System Status Panel** - Shows the status of various services, cron jobs, and running agents

## Weather API Integration

This app uses WeatherAPI.com with the following features:
- Current weather for Estoril, Portugal
- 3-day forecast
- Temperature in Celsius
- Weather conditions, humidity, and wind speed
- API key already integrated

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd moltbot-telegram-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Access the app at `http://localhost:3000`

## Telegram Integration

To use this as a Telegram Mini App:

1. Create a bot with BotFather
2. Set the menu button URL to your deployed app URL
3. Use the Telegram Web Apps platform to launch the mini app

## Deployment

### For Local Testing:
- Run `npm start` to start the server
- Access the app at `http://localhost:3000`

### For Production Deployment:
- Deploy to platforms like Heroku, Vercel, or any Node.js hosting service
- Ensure your domain is HTTPS-enabled for Telegram Mini App functionality
- Update the bot's menu button URL to point to your deployed URL

## Structure

- `index.html` - Main application with all four features
- `server.js` - Express server to serve the application
- `package.json` - Dependencies and scripts

## Technologies Used

- HTML5, CSS3, JavaScript
- Telegram Web Apps SDK
- WeatherAPI.com for weather data
- Express.js for the server
- LocalStorage for task persistence

## Customization

- Modify the UI in `index.html` to suit your preferences
- Add more weather locations by changing the location parameter in the API calls
- Extend the task manager with additional features
- Add more system services to the status panel

## API Keys

The WeatherAPI.com key is already integrated in the client-side code. For production use, consider moving this to a backend proxy for security.

## Support

For issues or questions, please open an issue in the repository.