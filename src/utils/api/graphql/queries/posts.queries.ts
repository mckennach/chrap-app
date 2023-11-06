import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      body
      images
      external_link
      user_id
      user {
        id
        display_name
        email
        username
        saved_items
      }
      comments {
        id
      }
      votes {
        id
        upvote
        downvote
        user_id
        vote
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

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    getPostById(id: $id) {
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
