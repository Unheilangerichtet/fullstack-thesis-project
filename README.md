# fullstack-thesis-project
A Vue.js / Express web application for visualizing the algorithm that decides the wordproblem for contextsensitive grammars

#### How the Client communicates with the server: 
1. Component imports a service from client/src/services and uses a function this servic provides
2. the services function then uses client/src/Api.js to make a http request
3. the Api uses axios to send the http requst to the server

#### How to start up the project:
1. in client und server jeweils ```npm install```
1. move to /fullstack-thesis-project/server
2. start the server with ```npm start``` or ```npm run start```
3. move to /fullstack-thesis-project/client
4. start the client with ```npm start``` or ```npm run start```
5. open the url http://localhost:8080/