# Ecolog Mobile Application

Ecolog is a React Native mobile application that helps track and manage tree data collection. It provides a user-friendly interface for students and administrators to record and analyze tree measurements.

## Features

- **User Authentication**
  - Secure login and signup system
  - Role-based access (Admin and Student users)
  - Persistent session management

- **Student Features**
  - Student profile management
  - Tree data collection
  - Branch measurement recording
  - Photo upload and edit capability

- **Admin Features**
  - View Excel data sheets
  - Add tree data
  - Monitor user submissions
  - Administrative dashboard

## Technologies Used

- React Native/ Expo
- Firebase Authentication
- Supabase Database
- React Navigation
- Expo Vector Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AdarshReddy2106/Ecolog.git
cd Ecolog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on specific platform:
```bash
# For Android
npm run android

# For iOS
npm run ios

# For web
npm run web
```

## Building for Production

### Android

1. Update the version in `android/app/build.gradle`
2. Create a keystore file (if not exists)
3. Set up signing configurations
4. Run the build command:
```bash
cd android
gradlew clean
gradlew assembleRelease
```

<!-- ## Contributing -->

<!-- 1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Contributors:
Adarsh @AdarshReddy2106, Harshitha @Harshi-2706


