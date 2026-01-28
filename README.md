# Moltbot Dashboard

This is the Telegram Mini App for Moltbot that provides a comprehensive dashboard for managing tasks, files, notes, system status, package tracking, and more.

## Features

- Dashboard Overview: View daily tasks, calendar events, weather, and notifications
- Task Manager: Create and manage to-do lists with priority levels
- File Explorer: Browse and manage workspace files
- Quick Notes: Take and access notes synced with your knowledge base
- System Status Panel: Check status of services, cron jobs, and running agents
- Package Tracker: Monitor all shipments with tracking information
- Knowledge Base Search: Search your personal knowledge base and memories
- Automation Studio: Create and manage visual automation workflows
- Health & Activity Tracker: Track habits, goals, and wellness metrics
- **Real-time Weather**: Get current weather conditions and forecasts for Estoril, Portugal from Weather Underground

## How to Use

This app is designed to work as a Telegram Mini App. Follow the instructions in the original repository to set it up with your bot.

## Weather Integration

The dashboard includes real-time weather information fetched from Weather Underground for Estoril, Portugal. The backend scrapes data from https://www.wunderground.com/forecast/pt/estoril to provide:

- Current temperature in Celsius
- Weather conditions and description
- "Feels like" temperature
- Humidity and wind speed
- Location-specific forecasts
- Regular updates (every 30 minutes)

## Running Locally

To run this dashboard locally:

1. Install dependencies: `npm install`
2. Set up environment variables (see `.env.example`)
3. Start the server: `npm start`
4. Access the app at `http://localhost:3000`