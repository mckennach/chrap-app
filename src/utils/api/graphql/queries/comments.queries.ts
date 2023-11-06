import { gql } from '@apollo/client'

export const GET_COMMENT_BY_ID = gql`
  query GetCommentById($id: ID!) {
    getCommentById(id: $id) {
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
      post_id
      post {
        id
        created_at
        title
        body
        images
        external_link
        user_id
        user {
          id
          display_name
          email
          username
        }
        topic {
          id
          title
          slug
        }
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
  }
`
