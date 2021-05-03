import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Icon, Label, Button, Popup } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

function LikeButton({ post: { id, likes, likeCount } }) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, { variables: { postId: id } });

  const likeButton = user ? (
    liked ? (
      <Button onClick={likePost} color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button onClick={likePost} color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <div>
      <Popup
        content={liked ? "Unlike" : "Like"}
        trigger={
          <Button id="like-btn" as="div" labelPosition="right">
            {likeButton}
            <Label basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
        }
      />
    </div>
  );
}

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
