# snu-happetite-onion-game
![Static Badge](https://img.shields.io/badge/status-done-brightgreen?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/type-practice_project-blue?style=for-the-badge)

A Korean-language mobile game built with React Native and Expo where you grow an onion by sending negative messages, but positive messages cause the onion to die from embarrassment—powered by OpenAI GPT-4 sentiment analysis.

## How to Start

### Environment
- Node.js (v14 or higher recommended)
- npm or yarn
- Expo CLI
- OpenAI API key

### Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd snu-happetite-onion-game

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory with:
# EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Run the application
npm start

# Or run on specific platforms:
# npm run ios      # iOS simulator
# npm run android  # Android emulator
# npm run web      # Web browser
```

## Key Features
1. **Sentiment-Based Growth System** – Onion grows when receiving negative messages (insults) and dies from embarrassment when receiving positive messages
2. **AI-Powered Analysis** – Uses OpenAI GPT-4 to analyze Korean text and determine sentiment scores
3. **Progressive Growth Levels** – Six visual growth stages (onion0 to onion5) based on accumulated growth score
4. **Chat History** – View all previous messages with timestamps and growth impact scores
5. **Day Counter** – Tracks days since the onion was first created (D+ counter)
6. **Death & Harvest Animations** – Visual feedback for game endings (death from positive messages or harvest at max growth)

## Technical Stack
- **React Native** – Cross-platform mobile framework
- **Expo** – Development platform and tooling
- **TypeScript** – Type-safe JavaScript
- **React Navigation** – Screen navigation and routing
- **AsyncStorage** – Local data persistence
- **OpenAI API** – GPT-4 sentiment analysis for Korean text

## Project Structure
```
snu-happetite-onion-game/
├── assets/                        # Image assets (onion sprites, icons, animations)
│   ├── onion0.png - onion5.png   # Onion growth stage sprites
│   ├── icon.png                  # App icon
│   └── *.png                     # Animation and UI assets
├── components/                    # Reusable React components
│   ├── Onion.tsx                 # Onion image component
│   ├── Button.tsx                # Navigation button component
│   ├── Modal.tsx                 # Message modal component
│   └── OnionSpeechModal.tsx      # Speech bubble component
├── routes/                       # Screen components (navigation routes)
│   ├── Navigation.tsx            # Main navigation setup
│   ├── Splash.tsx                # Splash screen
│   ├── Onboarding.tsx            # Initial setup screen
│   ├── Main.tsx                  # Main game screen
│   ├── ChatLog.tsx               # Message history screen
│   ├── Death.tsx                 # Death screen
│   ├── DeathAnimation.tsx        # Death animation screen
│   ├── Harvest.tsx               # Harvest screen
│   └── HarvestAnimation.tsx     # Harvest animation screen
├── utils/                        # Utility functions
│   ├── apiUtils.ts               # OpenAI API integration
│   ├── asyncUtils.ts             # AsyncStorage helpers
│   ├── dateUtils.ts              # Date calculation utilities
│   └── stringUtils.ts            # String manipulation helpers
├── app.config.js                 # Expo configuration
├── App.tsx                       # Root application component
├── types.ts                      # TypeScript type definitions
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```
