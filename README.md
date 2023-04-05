# $teward (a personal finance app)
A category based budget built with react.js and firebase

## 'Product' Description
Login or signup to to set a monthly category / envelope budget, track spending, allocate funds, transfer, deduct, and deposit. 


## Project Objective
// flesh this out... 

## Get Set Up (for devlopers that are forking or cloning)

Create a `.env.development.local` at the top level of your repository _(with / next to package.json)_, and assign your credentials to these variable names. You'll need to create your own firebase account for your own credential keys (unless your a collaborator).
```
VITE_FIREBASE_API_KEY = placeholder
VITE_FIREBASE_AUTH_DOMAIN = placeholder
VITE_FIREBASE_PROJECT_ID = placeholder
VITE_FIREBASE_STORAGE_BUCKET = placeholder
VITE_FIREBASE_MESSAGING_SENDER_ID = placeholder
VITE_FIREBASE_APP_ID = placeholder
``` 
This is why the config object in this projects firebase.js looks like this.
```
const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```
Before you are able to run any scripts to start the app in local host (or otherwise) you'll need to run `npm i env-cmd` (see below).

## Scripts
This project is bundled with vite. Scripts are same
dev server: `npm run start` 
build: `npm run build`
<!-- Once you have installed the `env-cmd` package, run `npm run sDev` for a custom [react scripts start](https://blog.logrocket.com/everything-you-need-know-about-react-scripts/). This custom script employs `env-cmd` to force the particular .env in the package.json scripts. `sDev` starts the development environment using .env.development.local.

_Similarly_, use `npm run bDev` to build the project using the development environment. This bundles the project in servable build files in the `./build` directory. -->

## Memos / notes
### Overall 

## A Word on React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

While the initial react-app boiler-plate comes with testing and scripts I've paired things down to whats needed. If you want to learn more about react and it's defaults checkout their official [docs](https://reactjs.org/docs/getting-started.html).
