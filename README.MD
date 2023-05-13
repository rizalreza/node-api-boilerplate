# Node Api Boilerplate

### Prerequisites
1. git
2. node.js ```nodejs v14.19.1```
3. npm ```npm 6.14.16```

### How to use it?


### How to develop it?
1. Be sure, your github account has been authorized to access the repository
2. Add your public ssh keys machine to your github account
3. We use the ssh ways to clone the repository -> git clone ```git@github.com:rizalreza/node-api-boilerplate.git```
4. cd ```node-api-boilerplate```
5. ```npm install```
6. ```cp .env.example .env```
7. Customize the env to ```development``` or ```staging```
8. Start the development 🚀🚀🚀

### Run the service using Docker
1. ```docker build -t express:v01 --build-arg SSH_KEY="$(cat id_rsa.pem)" --build-arg SSH_KEY_PASSPHRASE="$(cat id_rsa_pub)"  .```
2. ```docker run -p 4401:4401 --name node-api-boilerplate -d node-api-boilerplate:v01```
