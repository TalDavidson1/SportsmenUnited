# Setting Up SportsmenUnited on Windows

## Prerequisites

1. Install Node.js
   - Download and install Node.js 18.x from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. Install Git
   - Download and install Git from [git-scm.com](https://git-scm.com/download/win)
   - Verify installation: `git --version`

3. Install Visual Studio Code (recommended)
   - Download and install from [code.visualstudio.com](https://code.visualstudio.com/)

## Setup Steps

1. Clone the Repository
```bash
git clone https://github.com/TalDavidson1/SportsmenUnited.git
cd SportsmenUnited
```

2. Install Dependencies
```bash
npm install
```

3. Install Expo CLI
```bash
npm install -g expo-cli
```

4. Start the Development Server
```bash
npx expo start
```

5. Install Expo Go on Your Mobile Device
- Download Expo Go from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [App Store](https://apps.apple.com/us/app/expo-go/id982107779)
- Scan the QR code shown in the terminal with your device's camera

## Testing the App

1. Open Expo Go on your mobile device
2. Scan the QR code from the terminal
3. The app will load on your device

## Features Available for Testing

1. Social Media Board
   - Post harvests and catches
   - Tag locations and species
   - View posts from your area

2. Hunting/Fishing Forecast
   - Enter zip code for local forecasts
   - View lunar cycle predictions
   - Check best times for activity

3. Rut Tracker
   - Report rut activity by county/state
   - View activity levels in your area
   - Track rut phases

4. User Profile
   - Set up your profile
   - View your posts and activity

## Troubleshooting

1. If you encounter dependency issues:
```bash
npm clean-install
```

2. If the app won't connect:
- Ensure your mobile device is on the same WiFi network as your computer
- Try switching to Tunnel connection in Expo developer tools

3. For other issues:
- Check the [Expo documentation](https://docs.expo.dev/)
- Submit an issue on the GitHub repository
