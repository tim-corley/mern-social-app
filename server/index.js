require("dotenv").config();
const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");
const SERVER_PORT = 5000;

const pubsub = new PubSub();

const app = express();
app.use(cors());

// this is using Express behind the scenes
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(
    "mongodb://root:rootpassword@mongo-db:27017/social-app?authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("\n ⚙️  MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`\n ⚡ Server is running at: ${res.url}`);
  });
