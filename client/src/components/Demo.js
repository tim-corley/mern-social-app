import React from "react";
import { useQuery, gql } from "@apollo/client";

const ALL_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      body
      comments {
        id
        body
      }
      commentCount
      likeCount
    }
  }
`;

function Posts() {
  const { loading, error, data } = useQuery(ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getPosts.map(({ id, body }) => (
    <div key={id}>
      <p>{body}</p>
    </div>
  ));
}

export default Posts;
