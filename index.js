require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");
const SERVER_PORT = process.env.SERVER_PORT;

// this is using Express behind the scenes
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\n ⚙️  MongoDB Connected");
    return server.listen({ port: `${SERVER_PORT}` });
  })
  .then((res) => {
    console.log(`\n ⚡ Server is running at: ${res.url}`);
  });
