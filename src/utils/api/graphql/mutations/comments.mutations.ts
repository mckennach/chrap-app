import { gql } from '@apollo/client'

export const INSERT_COMMENT_VOTE = gql`
  mutation insertCommentVote($comment_id: ID!, $user_id: ID!, $vote: Int!) {
    insertCommentVote(comment_id: $comment_id, user_id: $user_id, vote: $vote) {
      id
      comment_id
      user_id
      vote
    }
  }
`

export const UPDATE_COMMENT_VOTE = gql`
  mutation updateCommentVote($comment_id: ID!, $user_id: ID!, $vote: Int!) {
    updateCommentVote(comment_id: $comment_id, user_id: $user_id, vote: $vote) {
      id
      comment_id
      user_id
      vote
    }
  }
`

export const INSERT_COMMENT = gql`
  mutation insertComment(
    $body: String!
    $user_id: ID!
    $post_id: ID!
    $parent_id: ID
  ) {
    insertComment(
      body: $body
      user_id: $user_id
      post_id: $post_id
      parent_id: $parent_id
    ) {
      id
      body
      user_id
      post_id
      created_at
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!, $user_id: ID!) {
    deleteComment(id: $id, user_id: $user_id) {
      id
    }
  }
`
