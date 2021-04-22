import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "./PostCard";

const GET_POSTS = gql`
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

function RecentPosts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.getPosts.map((post) => (
    <Grid.Column key={post.id} style={{ marginBottom: 50 }}>
      <PostCard post={post} />
    </Grid.Column>
  ));
}

export default RecentPosts;
