require("dotenv").config();
const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB, SERVER_PORT } = require("./config.js");

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
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\n ⚙️  MongoDB Connected");
    return server.listen({ port: SERVER_PORT });
  })
  .then((res) => {
    console.log(`\n ⚡ Server is running at: ${res.url}`);
  });
