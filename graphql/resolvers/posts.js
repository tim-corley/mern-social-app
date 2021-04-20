const { AuthenticationError } = require("apollo-server");
const { GraphQLDateTime } = require("graphql-iso-date");

const checkAuth = require("../../utils/checkAuth");
const Post = require("../../models/Post");

module.exports = {
  ISODate: GraphQLDateTime,
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(`USER INFO: ${user}`);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post successfully deleted";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // POST ALREADY LIKED - UNLIKE IT
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // NOT ALREADY LIKED - LIKE IT
          post.likes.push({
            username,
            createdAt: new Date(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("post not found");
    },
  },
};
