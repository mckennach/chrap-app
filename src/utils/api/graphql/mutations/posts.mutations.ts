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
    $vote_ids: [ID!]
    $created_at: DateTime!
    $title: String!
  ) {
    insertPosts(
      body: $body
      images: $images
      external_link: $external_link
      user_id: $user_id
      topic_id: $topic_id
      vote_ids: $vote_ids
      created_at: $created_at
      title: $title
    ) {
      id
      body
      user_id
      images
      external_link
      user {
        id
        display_name
        email
        username
        saved_items
      }
      votes {
        id
        upvote
        downvote
        user_id
        vote
      }
      comments {
        id
        body
        user_id
        user {
          id
          display_name
          email
          username
          profile_image {
            id
            bucket_id
            name
            owner
            created_at
            updated_at
            last_accessed_at
            metadata
            path_tokens
            version
          }
        }
        votes {
          id
          upvote
          downvote
          user_id
          vote
        }
        parent_id
        parent_comment {
          id
          body
          user_id
        }
        children_comments {
          id
          body
          user_id
          user {
            id
            display_name
            email
            username
            profile_image {
              id
              bucket_id
              name
              owner
              created_at
              updated_at
              last_accessed_at
              metadata
              path_tokens
              version
            }
          }
          votes {
            id
            upvote
            downvote
            user_id
            vote
          }
          parent_id
          parent_comment {
            id
            body
            user_id
          }
          children_comments {
            id
            body
            user_id
          }
          created_at
        }
        created_at
      }
      topic {
        id
        title
        slug
        topic_image_id
        topic_image {
          id
          bucket_id
          name
          owner
          created_at
          updated_at
          last_accessed_at
          metadata
          path_tokens
          version
        }
      }
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
