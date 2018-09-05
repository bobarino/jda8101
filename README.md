# Workout App

Team JDA 8101's project.

## Getting Started

Hey guys! I hope these instructions can get you set up without any hiccups.

### Prerequisites

1. Download Node.js
2. Install XCode or Android Studio

### Get the project running

Clone the repo:

```
git clone https://github.com/bobarino/jda8101.git
```

Change directory to the repo...

```
cd jda8101
```

Install all of the dependencies (you'll have to do this anytime you pull down new changes where package.json was changed):

```
npm install
```

For iOS install the required pods in the ios subdirectory (requires Cocoapods)
```
cd ios
pod install
```

Download the corresponding config file from firebase. 

**iOS**: Download `GoogleService-info.plist` and place the config file in the ios/userapp1 folder

**Android**: Download `google-services.json` and place the config file in 

Don't commit either of these files because they contain API keys.  They should already be ignored by the .gitignore

## The Structure

**Needs to be re-written because of new code**
