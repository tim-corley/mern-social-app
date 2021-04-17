require("dotenv").config();
const { ApolloServer, ApolloError } = require("apollo-server");
const { GraphQLDateTime } = require("graphql-iso-date");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("./models/Post");
const { MONGODB } = require("./config.js");
const SERVER_PORT = process.env.SERVER_PORT;

const typeDefs = gql`
  scalar ISODate
  type Post {
    id: ID!
    body: String!
    createdAt: ISODate!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  ISODate: GraphQLDateTime,
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

// this is using Express behind the scenes
const server = new ApolloServer({
  typeDefs,
  resolvers,
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
