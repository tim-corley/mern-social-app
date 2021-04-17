

1) Start Mongod instance:
   `➜  ~ sudo mongod --auth --port 27017 --dbpath /var/lib/mongodb`
2) Connect with Mongo Shell:
   `➜  ~ mongo --port 27017  --authenticationDatabase "admin" -u "adminAccount" -p`
3) 