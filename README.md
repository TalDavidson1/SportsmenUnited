# Sportsmen United Mobile App

A social platform for hunters and anglers to share their experiences, track wildlife activity, and get hunting/fishing forecasts.

## Project Overview

This mobile application serves as a comprehensive platform for the hunting and fishing community with the following key features:

- Social media board for sharing harvests and catches
- Location and species tagging system
- Hunting and fishing forecasts based on lunar cycles
- Rut activity tracking by county/state
- User profiles
- Monetization through banner ads

## Technical Stack

- iOS (Primary Platform)
  - Swift
  - SwiftUI for modern UI development
  - Core Location for GPS functionality
  - CloudKit for data persistence
  - Firebase for real-time updates

- Future Android Support Planned

## Color Scheme

Based on the Sportsmen United brand:
- Primary Color: Navy Blue (#1B2B5E)
- Secondary Color: Red (#C41E3A)
- Background: White (#FFFFFF)

## Development Setup

### Prerequisites
- Xcode 14.0 or later
- iOS 15.0+ deployment target
- CocoaPods for dependency management

### Installation
1. Clone the repository
```bash
git clone https://github.com/TalDavidson1/SportsmenUnited.git
```

2. Install dependencies
```bash
cd SportsmenUnited/ios
pod install
```

3. Open the .xcworkspace file in Xcode
```bash
open SportsmenUnited.xcworkspace
```

## Project Structure

```
SportsmenUnited/
├── ios/                    # iOS application
│   ├── Source/            # Source files
│   ├── Resources/         # Assets and resources
│   └── Tests/             # Unit and UI tests
└── docs/                  # Documentation
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is proprietary software. All rights reserved.
