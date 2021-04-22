import React, { useContext } from "react";
import RecentPosts from "../components/RecentPosts";
import PostForm from "../components/PostForm";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <PostForm />
        </Grid.Column>
        <RecentPosts />
      </Grid.Row>
    </Grid>
  );
}

export default Home;
