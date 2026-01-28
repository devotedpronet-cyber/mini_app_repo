# Moltbot Dashboard Setup Guide

Complete instructions to set up and deploy the Moltbot Dashboard Telegram Mini App.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Deployment to GitHub Pages](#deployment-to-github-pages)
4. [Weather Data Configuration](#weather-data-configuration)
5. [Connecting to Telegram Bot](#connecting-to-telegram-bot)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- GitHub account
- Telegram account with a bot created via BotFather

## Local Development

### 1. Clone or Download the Repository
```bash
git clone <your-repo-url>
cd moltbot-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Deployment to GitHub Pages

### Method 1: Static Files (Recommended for GitHub Pages)

GitHub Pages serves static files, so for the weather functionality to work, you have a few options:

#### Option A: Pre-build with Mock Data
1. Update the index.html to use static weather data
2. Upload all files to GitHub Pages as described in the original instructions

#### Option B: Connect to External Weather Service
1. Deploy the backend to a service like Heroku, Vercel, or similar
2. Update the frontend to call your external API
3. Upload the static files to GitHub Pages

### Method 2: Using a Different Hosting Provider

For full functionality including live weather data from Weather Underground, consider using a hosting provider that supports Node.js:

1. **Heroku**
   ```bash
   heroku create
   git push heroku main
   ```

2. **Vercel**
   ```bash
   vercel --platform-version=2
   ```

3. **Railway**
   ```bash
   railway up
   ```

## Weather Data Configuration

### Weather Underground Integration

The app is configured to fetch weather data from Weather Underground for Estoril, Portugal specifically from:
https://www.wunderground.com/forecast/pt/estoril

The backend uses web scraping techniques to extract:
- Current temperature in Celsius
- Weather conditions and descriptions
- "Feels like" temperature
- Humidity and wind speed
- Forecast data for upcoming days

### Weather Data Integration

The app fetches weather data from `/api/weather` endpoint. The backend:

1. Scrapes the Weather Underground page for Estoril
2. Parses the HTML to extract weather information
3. Returns structured data to the frontend
4. Updates regularly (simulated every 30 minutes in the frontend)

Note: Web scraping may be subject to changes in the target website's structure and terms of service. The implementation includes fallback mechanisms in case of scraping failures.

## Connecting to Telegram Bot

### 1. Prepare Your App URL
- For GitHub Pages: `https://yourusername.github.io/repository-name/`
- For other hosting: Your deployed app URL

### 2. Configure with BotFather
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/setmenubutton`
3. Select your bot
4. Enter your app URL
5. Set menu button text (e.g., "Open Dashboard")

### 3. Test the Integration
- Open your bot in Telegram
- Tap the "Open Dashboard" button
- The Mini App should load

## Troubleshooting

### Common Issues

**Issue**: Weather data not loading
- Solution: Ensure your backend server is running and accessible
- If using GitHub Pages, note that it only serves static files, so you'll need to use mock data or an external backend

**Issue**: App not loading in Telegram
- Solution: Ensure your URL uses HTTPS
- Check that your domain is not blocked by any security policies

**Issue**: GitHub Pages shows "404 Not Found"
- Solution: Verify that the `.nojekyll` file is in your repository root
- Ensure your repository is public

**Issue**: Weather data shows "Weather data temporarily unavailable"
- Solution: This may indicate that the Weather Underground page structure has changed
- The scraper may need to be updated to match the new page structure

**Issue**: Scraping fails due to anti-bot measures
- Solution: Some websites implement measures to prevent scraping
- Consider using official APIs when available

## Customization

### UI Customization
- Edit `index.html` to modify the layout
- Update CSS in the `<style>` section for appearance changes
- Modify JavaScript functions to change behavior

### Feature Addition
- Add new API endpoints in the `api/` directory
- Create new components in the HTML
- Update the JavaScript to connect frontend and backend

### Weather Location Change
- Update the URL in `weather-service.js` to target a different location
- Adjust the selectors to match the new location's page structure

## Security Considerations

- Always use HTTPS for production deployments
- Never commit actual API keys to version control
- Sanitize all user inputs
- Validate data from external sources
- Implement proper error handling
- Be respectful of the target website's resources when scraping

## Updating the App

To update your deployed app:

1. Make changes to your local files
2. Test locally with `npm start`
3. Commit and push changes to your GitHub repository
4. If using GitHub Pages, changes will deploy automatically
5. If using other hosting, redeploy using the appropriate method

## Support

For technical support:
- Check the GitHub repository for open issues
- Review the documentation
- Contact your hosting provider for deployment issues
- Note that web scraping implementations may require periodic updates as target sites change their structure