import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button, Grid } from "semantic-ui-react";

import { Helpers } from "../utils/helpers";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

function PostCard({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) {
  const postAge = Helpers.timeAgo(createdAt);

  const { user } = useContext(AuthContext);

  const likePost = () => console.log("LIKE POST!");

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {postAge}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={3}>
          <Grid.Row style={{ marginLeft: 10 }}>
            <LikeButton post={{ id, likes, likeCount }} />
            <Button labelPosition="right" as={Link} to={`posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
            {user && user.username === username && (
              <Button
                as="div"
                color="red"
                floated="right"
                style={{ marginLeft: 25 }}
                onClick={() => console.log("delete post")}
              >
                <Icon name="trash" style={{ margin: 0 }} />
              </Button>
            )}
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
