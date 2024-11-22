# Development Setup Guide

## Prerequisites
1. Install Node.js from https://nodejs.org (LTS version)
2. Install Git from https://git-scm.com/download/win
3. Install VS Code from https://code.visualstudio.com

## Setup Steps
1. Clone the repository:
```bash
git clone https://github.com/TalDavidson1/SportsmenUnited.git
cd SportsmenUnited
```

2. Install dependencies:
```bash
npm install
```

3. Install Expo Go on your Android device from the Play Store

4. Start the development server:
```bash
npm start
```

5. Scan the QR code with your Android device to open the app in Expo Go

## Features
- Social Media Board for sharing harvests and catches
- Hunting/Fishing Forecast based on lunar cycles
- Rut Activity Tracking
- User Profiles
- Location-based features
- Banner Ads integration

## Development
- Use `npm start` to start the development server
- Use `npm run android` to start Android development
- Use `npm run web` for web development

## Folder Structure
```
src/
  ├── features/          # Feature-specific components and logic
  │   ├── social/       # Social media board
  │   ├── forecast/     # Hunting/fishing forecast
  │   ├── rutTracker/   # Rut activity tracking
  │   ├── profile/      # User profiles
  │   └── shared/       # Shared components
  ├── assets/           # Images and other static assets
  ├── config/           # Configuration files
  └── types/            # TypeScript type definitions
```
