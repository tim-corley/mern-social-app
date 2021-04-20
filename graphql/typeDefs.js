const { gql } = require("apollo-server");

module.exports = gql`
  scalar ISODate
  type Post {
    id: ID!
    body: String!
    createdAt: ISODate!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type Comment {
    id: ID!
    body: String!
    createdAt: ISODate!
    username: String!
  }
  type Like {
    id: ID!
    createdAt: ISODate!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: ISODate!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post
    likePost(postId: ID!): Post!
  }
`;
