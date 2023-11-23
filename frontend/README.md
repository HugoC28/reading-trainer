# FrontEnd of the reading-trainer

## Prerequisites
- Node and npm installed and configured to the running OS. Working at least with the Node 18 and 20.
- A simple way of changing/downloading different nodes is to configure nvm (Node Version Manager)
  1. "nvm ls" lists your node versions available
  2. "nvm use >version<" uses spesific version
  3. "nvm install >version<" downloads a spesific version

## Usage 

1. "npm install"
   - If there are some problems with the packages, a good way is just "rm node_modules" and "rm package-lock.json" and try again with "npm install"
   - If there are some problems with the node version. Change the version to 18/20 with nvm.
3. "npm run dev" starts the app. Different starting scripts can be found from package.json
4. Head to the http://localhost:5173 with browser
5. Make own credentials or use "Tester@gmail.com" and "password"
6. With a successful login the bearer token is saved to the localstorage and the home view of the app is opened

!! Before making the app to generate exercises, be sure that backend is also up and running

## Useful links:
- [Firebase authentication docs](https://firebase.google.com/docs/auth/web/start)
- [Firebase realtime database docs](https://firebase.google.com/docs/database/web/start)
