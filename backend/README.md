# FrontEnd of the reading-trainer

## Prerequisites
- Node and npm installed and configured to the running OS. Working at least with the Node 18 and 20.
- A simple way of changing/downloading different nodes is to configure nvm (Node Version Manager)
  1. "nvm ls" lists your node versions available
  2. "nvm use >version<" uses spesific version
  3. "nvm install >version<" downloads a spesific version
 
  
## Usage
1. Create .env file in the backends root
2. Add variables PORT and OPENAI_API_KEY there. You can find your OPENAI_API_KEY from settings in the [ChatGPT](https://chat.openai.com)
3. "npm install"
   - If there are some problems with the packages, a good way is just "rm node_modules" and "rm package-lock.json" and try again with "npm install"
   - If there are some problems with the node version. Change the version to 18/20 with nvm.
4. npm start
5. Head to http://localhost:PORT with browser. The PORT is the one defined on the .env file or http://localhost:3000 if there is not spesific PORT definded.
6. The get request to the http://localhost:PORT should just return "Hello World" on the page. Now the backend is up and running
