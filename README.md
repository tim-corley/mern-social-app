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

### Development

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