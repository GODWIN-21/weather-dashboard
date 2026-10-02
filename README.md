# Weather Dashboard

A modern, polished weather dashboard built with React and Vite using the Open-Meteo public weather API (no API key required).

## Features

- 🌍 City search with real-time weather data
- 🌡️ Current conditions (temperature, humidity, wind speed, feels-like)
- ⏰ Hourly forecast (next 6 hours)
- 📅 5-day outlook
- 📱 Fully responsive design
- 🎨 Glassmorphism UI with smooth animations
- ⚡ Built with Vite for fast development and builds

## Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Build

```bash
npm run build
```

Output will be in the `dist/` folder.

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool and dev server
- **Open-Meteo API** - Weather data (free, no key required)
- **CSS3** - Styling (no dependencies)

## Project Structure

```
src/
├── components/        # React components
├── api/              # API integration
├── utils/            # Utility functions
├── App.jsx          # Main app component
├── App.css          # App styles
└── index.css        # Global styles
```
