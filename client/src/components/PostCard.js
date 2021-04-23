import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Icon,
  Label,
  Image,
  Button,
  Grid,
  Popup,
} from "semantic-ui-react";

import { Helpers } from "../utils/helpers";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) {
  const postAge = Helpers.timeAgo(createdAt);

  const { user } = useContext(AuthContext);

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
          <Grid.Row>
            <Grid.Column>
              <LikeButton post={{ id, likes, likeCount }} />
            </Grid.Column>
            <Grid.Column>
              <Popup
                content="Comment on post"
                trigger={
                  <Button labelPosition="right" as={Link} to={`posts/${id}`}>
                    <Button color="blue" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                }
              />
            </Grid.Column>
            <Grid.Column>
              {user && user.username === username && (
                <DeleteButton postId={id} />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
