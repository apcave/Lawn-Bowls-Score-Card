# Getting Started

> **Note**: This is a [React Native](https://reactnative.dev) project for helping lawn bowls clubs manage players. It uses [Expo - Development Builds](https://docs.expo.dev/develop/development-builds/create-a-build/) and includes binary [Realm](https://realm.io) libraries to makes use of [MongoDB](https://docs.mongodb.org) to synchronize data even when the device is temporarily offline. Otherwise it uses **JavaScript** and **TypeScript** packages from [NPM](https://www.npmjs.com) to provide functionality for the application to run on **Android** and **iOS** devices or emulations. **Web** applications can also be developed using **React Native** although this not supported as the inclusion of binary libraries cannot be done using internet browsers. Using **Node.js** code as a server provides security for **Web** applications as many people know how to view **JavaScript** code in the browser development environment. When an application is deployed on a device it is complied and secure that is one of the reasons why **React Native** device applicatons are more flexible than **Web** applications. The **Author** is familiar with **Fullstack** development.

## Setup the Development Environment

I develop on a **Mac** using **OSX** as it supports [iOS](https://docs.expo.dev/workflow/ios-simulator/) and [Android](https://docs.expo.dev/workflow/android-studio-emulator/) device emulation see links for the setup on **Windows** and **OSX** machines.
I also use using [vscode](https://code.visualstudio.com) for my IDE as it has many packages that assist with development.
Although using the instructions provided the project can be built using the **CLI** of a **Mac** or a **Windows** machine with minor alterations.

You will also require other software that I install on **OSX** using [Brew](https://brew.sh) including [Node](https://formulae.brew.sh/formula/node), [Yarn](https://formulae.brew.sh/formula/yarn) and [Open Java SDK v17](https://formulae.brew.sh/formula/openjdk@17). This software can be downloaded and installed manually from the projects websites although make sure the Java SDK is not too new I recommend version 17.

The [Expo Go App](https://expo.dev/expo-go) does not work for more complicated builds. However for device testing, debugging and live editing of code can still done using an [EAS - Build](https://docs.expo.dev/build/introduction/) where the development build is done using; **Expo**, [Apple Developer](https://developer.apple.com) and **Google Developer** accounts. The iOS devices are registered for a particular build and have the requirement that the device is registered with my developer account. Due to the stage of development the application is not available on **Google Play** or the **Apple Store** although the development path to register them is clear. Please contact me if you would like to test the application on your device.

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

## Rebuild for iOS.

For **iOS** edit the file,

```bash
vim ./ios/ScoreCard/AppDelegate.mm
```

so,

```bash
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"main";
```

is changed to

```bash
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ScoreCard";
```

then run this command

```bash
npx expo run:ios
```

## Rebuild for Android.

For **Android** edit the file,

```bash
vim ./android/app/src/main/java/com/apcave/scorecard/MainActivity.java
```

so,

```bash
  @Override
  protected String getMainComponentName() {
    return "main";
  }
```

is changed to

```bash
  @Override
  protected String getMainComponentName() {
    return "ScoreCard";
  }
```

then run the command

```bash
npx expo run:android
```

![alt text](https://github.com/apcave/Lawn-Bowls-Score-Card/blob/main/assets/icon.png?raw=true)
