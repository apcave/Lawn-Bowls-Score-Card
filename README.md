# Getting Started

> **Note**: This is a [React Native](https://reactnative.dev) project for helping lawn bowls clubs manage players. It uses [Expo - Development Builds](https://docs.expo.dev/develop/development-builds/create-a-build/) and includes binary [Realm](https://realm.io) libraries to makes use of [MongoDB](https://docs.mongodb.org) to synchronize data even when the device is temporarily offline. Otherwise it uses **JavaScript** and **TypeScript** packages from [NPM](https://www.npmjs.com) to provide functionality for the application to run on **Android** and **iOS** devices or emulations. **Web** applications can also be developed using **React Native** although this not supported as the inclusion of binary libraries cannot be done using internet browsers. Using **Node.js** code as a server provides security for **Web** applications as many people know how to view **JavaScript** code in the browser development environment. When an application is deployed on a device it is complied and secure that is one of the reasons why **React Native** device applicatons are more flexible than **Web** applications. The **Author** is familiar with **Fullstack** development.

## Setup the Development Environment

I develop on a **Mac** using **OSX** as it supports [iOS](https://docs.expo.dev/workflow/ios-simulator/) and [Android](https://docs.expo.dev/workflow/android-studio-emulator/) device emulation see links for the setup on **Windows** and **OSX** machines.
I also use using [vscode](https://code.visualstudio.com) for my IDE as it has many packages that assist with development.
Although using the instructions provided the project can be built using the **CLI** of a **Mac** or a **Windows** machine with minor alterations.

You will also require other software that I install on **OSX** using [Brew](https://brew.sh) including [Node](https://formulae.brew.sh/formula/node), [Yarn](https://formulae.brew.sh/formula/yarn) and [Open Java SDK v17](https://formulae.brew.sh/formula/openjdk@17).

The [Expo Go App](https://expo.dev/expo-go) does not work for more complicated builds. However for device testing, debugging and live editing of code can still done using an [EAS - Build](https://docs.expo.dev/build/introduction/) where the development build is done using an **Expo**, [Apple Developer](https://developer.apple.com) and **Google Developer** accounts. The iOS devices are registered for a particular build and have the requirement that the device is registered with my developer account. However if you have your a **Expo** account instructions are provided. Due to the stage of development the application is not available on **Google Play** or the **Apple Store** although the development path to register them is clear. Please contact me if you would like to test the application on your device.

Following are build instructions for emulation on your computer and **EAS - Build** instructions if you already have the required accounts. Also, included is some information for developers that have difficulty building the application.

## Build and Run the Application for Local Emulation.

First, setup the development environment, you will also need to install the the **NPM** packages. Run the following commands in your Git clone repository directory.

```bash
# using Yarn
yarn install
# using NPM
npm install
```

Then to build and run for an **Android** emulation.

```bash
npx expo run:android
```

To build and run for an **iOS** emulation.

```bash
npx expo run:ios
```

Your application should now start in an emulator if your development environment is active.

## What to do if things go wrong.

To debug or initialize a build that goes wrong there are the following instructions.
Running the following command will check your development environment and **NPM** packages.

```bash
npx expo-doctor
```

If you still can't build and run the application using **Expo**, you can try rebuilding the **Android** and **iOS** directories.

```bash
sudo rm -r node_modules
sudo rm -r android
sudo rm -r ios
yarn install
npx expo prebuild
```

The **Expo** prebuild command does not currently do a complete job of configuring the **Android** and **iOS** builds and both require alteration of a file to point the build to the current application name.

For **iOS** edit the file;
```bash 
vim ./ios/ScoreCard/AppDelegate.mm
```
Change the line

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
