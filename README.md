# Workout App

Team JDA 8101's project.

## Getting Started

Hey guys! I hope these instructions can get you set up without any hiccups.

### Prerequisites

1. Download Node.js
2. Install expo command line tool

```
npm install exp --global
```

3. [Make an Expo Account](https://expo.io/signup)

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

<br /> <br />

```
expo start --send-to 7701234567    // USE YOUR OWN PHONE NUMBER
```

<br /> <br /> <br />
You will get a link texted to you, which will open to the Expo App. After the first time, the Expo app will remember the project link so you can just run:

```
exp start
```

## The Structure

* **screens** - A screen is just a React Component, however, since it _is_ the entire page, we call it a screen. Understand this is just a naming convention, used in the React Native community and more importantly, in React Navigation. <br /> <br />
* **navigation** - If you have mental energy remaining after learning React, you should check out [React Navigation](https://reactnavigation.org/). Our projects navigation will probably remain pretty simple, With the top level StackNavigator containing a single TabNavigator. <br /> <br /> One reason it's good to be familiar with React Navigation is because there are certain things you'll want to define within the screen itself, but some things that should be defined at the navigation level, such as the screen's header, the icon that corresponds to that screen (for a TabNavigator), the animation you'd like to happen when that screen is navigated to, etc. <br /> <br />
* **components** - Any components that you make that you'd like to share across multiple screens should go here (e.g. a styled button that we're likely to use in other places). <br /> <br />
* **assets** - Where assets such as images and fonts are kept.

<br /> <br />
