import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Icon, Confirm, Button } from "semantic-ui-react";

import { GET_POSTS } from "../utils/graphql";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dynamicMutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deleteCommentOrPost] = useMutation(dynamicMutation, {
    variables: {
      postId,
      commentId,
    },
    update(cache) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = cache.readQuery({ query: GET_POSTS });
        cache.writeQuery({
          query: GET_POSTS,
          //   variables: postId,
          data: {
            getPosts: [...data.getPosts.filter((p) => p.id !== postId)],
          },
        });
      }
      if (callback) callback();
    },
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteCommentOrPost}
      />
    </>
  );
}

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
