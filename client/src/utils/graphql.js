import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      body
      username
      createdAt
      likes {
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      likeCount
    }
  }
`;
