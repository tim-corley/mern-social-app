const { GraphQLDateTime } = require("graphql-iso-date");

const Post = require("../../models/Post");

module.exports = {
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
