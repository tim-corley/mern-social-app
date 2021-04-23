import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Icon, Label, Image, Button, Grid } from "semantic-ui-react";

import { Helpers } from "../utils/helpers";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(FETCH_POST, {
    variables: { postId },
  });

  if (loading) return <p className={loading ? "loading" : ""}>Loading...</p>;
  if (error) return <p>Error!</p>;

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!data.getPost) {
    postMarkup = <div className={loading ? "loading" : ""}>Loading...</div>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    const postAge = Helpers.timeAgo(createdAt);
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              float="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{postAge}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <div className="ui labeled button" tabIndex="0">
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                </div>
                <div className="ui labeled button" tabIndex="0">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("comment on post...")}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </div>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {
                    (user && user,
                    username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    ))
                  }
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{Helpers.timeAgo(comment.createdAt)}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;