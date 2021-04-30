## A Basic Social Media Web App

### MERNG Stack

The goal of this web application is to get practice with developing MERNG tech and to use the finished application as product to test against. There will be 4 branches in this repo as follows:

- `main` - the base application
- `jest` - contains jest-based unit tests
- `rtl` - contains React Test Library built tests
- `cypress` - contains Cypress end-to-end tests

### Built with

- MongoDB
- Mongoose ORM
- Node.js
- Apollo Server
- GraphQL
- React
- Semantic UI

### Dev w/ Docker-Compose

1) Clone project & install dependencies:
`git clone git@github.com:tim-corley/mern-social-app.git`
`cd mern-social-app/server && yarn install`
`cd mern-social-app/client && yarn install`


1) Create an `.env` file at project root & add the following variables in order to initialize the database:
```
MONGO_INITDB_ROOT_USERNAME=<my_user>
MONGO_INITDB_ROOT_PASSWORD=<my_pwd>
MONGO_INITDB_DATABASE=<db_name>
```

3) Within the `server/` directory, create a `config.js` file and add the following in order to initialize the server:
   ```javascript
const DB_HOST = '<mongo-container-name>';
const DB_PORT = 27017;
const DB_USER = '<my_user>';
const DB_PASS = '<my_pwd>';
const DB_NAME = '<db_name>';
const JWT_SECRET = '<random-key>';

module.exports = {
  MONGODB: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  JWT_SECRET,
  SERVER_PORT: 5000,
};
   ```

   Note that is it important here to have `DB_HOST` exactly match the mongo service containter name (set in `docker-compose.yml`). Also, be sure that `DB_PORT`, `DB_USER`, `DB_PASS`, & `DB_NAME` match the values used for the `docker-compose.yml` mongo service config (specifically, ports & environment)
   

4) Start Containers (DB, Server, Client):
`➜  social-graphql-app git:(main) ✗ docker-compose up --build`

docker-compose is using volumes for all containers in order to enable hot-reloading.

2) Stop & Remove Containers:
`➜  social-graphql-app git:(main) ✗ docker-compose down`

### Development (Non-Docker)

1) Start Mongod instance:
   `➜  ~ sudo mongod --auth --port 27017 --dbpath /var/lib/mongodb`
2) Connect with Mongo Shell:
   `➜  ~ mongo --port 27017  --authenticationDatabase "admin" -u "adminAccount" -p`
3) Create a new database for the project and add an admin user:
   ```
> use social-app
switched to db social-app
> db.createUser(
... {
...  user: "newuser",
...  pwd: "awesomepwd",
...  roles: [ "readWrite", "dbAdmin" ]
... }
... )
Successfully added user: { "user" : "newuser", "roles" : [ "readWrite", "dbAdmin" ] }
```
4) Start the development server:
   `nodemon index.js`