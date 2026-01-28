# Moltbot Telegram Mini App

A comprehensive Telegram Mini App that integrates with Moltbot functionality.

## Features

- **Dashboard**: Real-time status of active services and notifications
- **Tasks**: Current tasks Moltbot is working on
- **Cron Jobs**: All scheduled jobs with execution details
- **File Explorer**: Browse and manage files
- **Notes**: Personal notes system
- **System Status**: Resource usage and system information
- **Package Tracking**: Track packages and deliveries
- **Knowledge Search**: Search your personal knowledge base
- **Automation Studio**: Create custom automations
- **Health Tracking**: Track habits and wellness metrics

## Architecture

The app consists of:
- Frontend: React-based Telegram Mini App
- Backend: Express.js API server
- Integration: Direct connection to Moltbot systems

## Setup

1. Install dependencies: `npm install`
2. Configure environment variables in `.env`
3. Start the server: `npm start`
4. Deploy to hosting platform (GitHub Pages, Vercel, etc.)

## Environment Variables

- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
- `MOLTBOT_API_URL`: URL to your Moltbot instance
- `WEATHER_API_KEY`: WeatherAPI.com API key