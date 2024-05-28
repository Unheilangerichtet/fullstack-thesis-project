# fullstack-thesis-project
A Vue.js / Express web application for visualizing the algorithm that decides the wordproblem for contextsensitive grammars

#### How the Client communicates with the server: 
1. Component imports a service from client/src/services and uses a function this servic provides
2. the services function then uses client/src/Api.js to make make a http request
3. the Api uses axios to send the http requst to the server
=> ROUTER?? FORGOT !!

#### How to start up the project:
- client: npm run start
- server: npm run start