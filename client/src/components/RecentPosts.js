import React from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "./PostCard";
import { GET_POSTS } from "../utils/graphql";

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
