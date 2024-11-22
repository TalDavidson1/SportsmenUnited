# Windows Development Setup Guide

## Prerequisites
1. Install Node.js 18 LTS from https://nodejs.org
2. Install Git from https://git-scm.com/download/win
3. Install VS Code from https://code.visualstudio.com
4. Install Android Studio from https://developer.android.com/studio

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

4. Configure Android Studio (one-time setup):
   - Open Android Studio
   - Go to Tools > SDK Manager
   - Install Android SDK Platform-Tools
   - Install at least one Android SDK Platform (e.g., Android 13.0)

5. Start the development server:
```bash
npm start
```

6. Test the app:
   - Scan the QR code with your Android device's camera
   - The app will open in Expo Go
   - OR press 'a' in the terminal to open in an Android emulator

## Features Available for Testing
- Social Media Board
  - View and like posts
  - Location and species tagging
- Hunting/Fishing Forecast
  - Zip code-based lunar predictions
  - Activity quality ratings
- Rut Tracker
  - County/state activity tracking
  - Phase and level reporting
- User Profiles
  - Basic profile information
  - Species preferences

## Development Tips
- Use `npm start` to start the development server
- Use `npm run android` to run on Android emulator
- Press 'r' in the terminal to reload the app
- Press 'm' to toggle the developer menu
- Check the browser console for debugging information

## Troubleshooting
1. If the app doesn't connect:
   - Ensure your phone and PC are on the same network
   - Try using a USB cable for debugging
   - Check Windows Defender firewall settings

2. If dependencies fail to install:
   - Delete node_modules folder
   - Delete package-lock.json
   - Run `npm install` again

3. For Android emulator issues:
   - Ensure Hyper-V is enabled in Windows features
   - Update Android Studio and SDK tools
   - Increase emulator memory in AVD Manager
