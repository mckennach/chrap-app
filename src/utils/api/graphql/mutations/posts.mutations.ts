import { gql } from '@apollo/client'

export const INSERT_POST_VOTE = gql`
  mutation insertPostVote($id: ID!, $user_id: ID!, $vote: Int!) {
    insertPostVote(id: $id, user_id: $user_id, vote: $vote) {
      id
      post_id
      user_id
      vote
    }
  }
`

export const UPDATE_POST_VOTE = gql`
  mutation updatePostVote($post_id: ID!, $user_id: ID!, $vote: Int!) {
    updatePostVote(post_id: $post_id, user_id: $user_id, vote: $vote) {
      post_id
      user_id
      vote
    }
  }
`

export const INSERT_POST = gql`
  mutation InsertPost(
    $body: String
    $images: JSON
    $external_link: String
    $user_id: ID!
    $topic_id: ID!
    $id: ID!
    $created_at: DateTime!
    $title: String!
  ) {
    insertPosts(
      body: $body
      images: $images
      external_link: $external_link
      user_id: $user_id
      topic_id: $topic_id
      id: $id
      created_at: $created_at
      title: $title
    ) {
      id
      body
      images
      external_link
      user_id
      topic_id
      created_at
      title
    }
  }
`

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`
