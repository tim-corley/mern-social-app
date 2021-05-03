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
- Docker / Docker Compose

### Develop with Docker Compose

1) Start Containers (DB, Server, Client):
`$ docker-compose up --build`

Docker Compose is using volumes for all containers in order to enable hot-reloading & data persistence. 

2) Stop & Remove Containers:
`$ docker-compose down`

3) Explore the database with Mongo Shell
   A) Get container id: 
   `$ docker ps`

   B) Access (running) container's shell:
   `$ docker exec -it <container_id> /bin/bash`
   
   C) Start Mongo Shell (pass in username used in docker-compose file):
   `root@84f9e1a69db9:/# mongo --port 27017  --authenticationDatabase "admin" -u "<root_user>" -p`

   D) Interact with database:
   ```
   > show dbs
   admin       0.000GB
   config      0.000GB
   local       0.000GB
   social-app  0.000GB
   > use social-app
   switched to db social-app
   > show collections
   posts
   users
   > db.users.find().pretty()
   ...
   ```

### Development (Non-Docker)

1) Start Mongod instance:
   `$ sudo mongod --auth --port 27017 --dbpath /var/lib/mongodb`
   
2) Connect with Mongo Shell:
   `$ mongo --port 27017  --authenticationDatabase "admin" -u "adminAccount" -p`

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
   `$ nodemon index.js`