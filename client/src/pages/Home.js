import React from "react";
import RecentPosts from "../components/RecentPosts";
import { Grid } from "semantic-ui-react";

function Home() {
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <RecentPosts />
      </Grid.Row>
    </Grid>
  );
}

export default Home;
