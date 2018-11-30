# Workout App

Team JDA 8101's project.

### Release Notes
##### Version 1.0
- Added coaching functionality to view student athletes’ progress
- Created custom charts for each athletes’ training history
- Flushed out Today’s Workout functionality
- Added profile page
- Added ability to join teams and workout programs

##### Known Bugs
- Athletes are able to join any team
- Training history chart lacks totality of user's data


# Install Project
### Prerequisites

- Download [Node.js](https://nodejs.org/en/download/)
- Install XCode (in Apple App Store, must have Mac) and [Android Studio](https://developer.android.com/studio/?gclid=CjwKCAiA0O7fBRASEiwAYI9QAr0iQ-Qpx1vYZ3K0NGfXgL4PXUqRllTkz67pWYPb8PSVtXUYdhvdYBoCyNwQAvD_BwE)
- [Download the project](https://github.com/bobarino/jda8101/zipball/master)

### Dependencies
- [Firebase for iOS](https://console.firebase.google.com/project/athlete-physics-mobile/settings/general/ios:com.userapp1): Download `GoogleService-info.plist` and place it in the `ios/userapp1` folder
- [Firebase for Android](https://console.firebase.google.com/project/athlete-physics-mobile/settings/general/android:com.userapp1): Download google-services.json and place it in `android/app` folder

### Get the project running

Get into the project's working directory:
```sh
cd jda8101
```
Download the project's Javascript dependencies, then the iOS dependencies:
```
npm install
cd ios
pod install
```

For Android, you must [setup and install virtual device to run device on computer](https://developer.android.com/studio/run/managing-avds).

To run the project on iOS, open the white `.xcworkspace` file from the ios directory with XCode, and click the play button.

To run the project on Android, click "Run", then "Run App" in the Android Studio Toolbar.

## The Structure
`android/`: native code and project files for compiling the app on Android

`ios/`: native code and project files for compiling the app on iOS

`res/`: resource files for the application like pictures or videos

`src/entities/`: classes that represent database entries for the project; can be used to access different databases to read or store data

`src/screens/`: files that define the user interface and logic for the applications; split up by screen

`src/services/`: different services needed by the application; serves as an API layer over third party libraries such as Firebase.io
