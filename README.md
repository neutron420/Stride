# Stride - Fitness & Wellness Tracker App

**Stride** is a modern and intuitive cross-platform mobile application designed using React Native. It helps users track their fitness journey and wellness goals with a clean, engaging interface and smart user flow.

## 📱 App Features

### 1. Splash Screen
- Animated logo (stride or pulse icon)
- App name “Stride” and motivational tagline: _“Your journey to health starts here.”_
- Background gradient (light blue to green)
- Auto-navigation to next screen after a short delay

### 2. Login & Signup
- Tab-based switch between Login and Signup
- **Signup Form**: Name, Email, Password, Confirm Password, Age (age >= 13 validation)
- **Login Form**: Email, Password, “Forgot Password?” link
- Social login with Google and Apple

### 3. Profile Setup
- Select Gender (inclusive options)
- Choose Fitness Goal: Lose Weight, Build Muscle, Stay Active
- Choose Activity Level: Sedentary, Light, Moderate, Active
- Interactive, card-based UI

### 4. Home Dashboard
- Personalized greeting (e.g., “Good morning, Alex”)
- Metrics: Steps, Calories, Workouts (ring/bar indicators)
- Daily motivational quote
- Quick actions: Log Workout, Add Meal, Track Sleep
- Bottom navigation for Home, Log, Stats, Profile

### 5. Statistics Screen
- Toggle between Weekly / Monthly / Yearly view
- Line/Bar charts for: Steps, Calories, Sleep, Weight
- Filters, zoom, and smooth animations

### 6. Settings & Profile Page
- Profile picture and name
- Options: Edit Profile, Notifications, Privacy, Connected Devices (Fitbit, Apple Health)
- Logout button at the bottom

## 🛠️ Tech Stack

- **React Native** (with Expo or CLI)
- Charting libraries: `react-native-chart-kit`, `VictoryNative`, etc.
- State management: Context API / Redux / Zustand (as per preference)

## 🚀 Getting Started

1. Clone this repo:
   ```bash
   git clone https://github.com/Ritesh-04coder/stride.git
   cd stride
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the app:
   ```bash
   npx react-native run-android
   # or for iOS
   npx react-native run-ios
   ```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more information.
