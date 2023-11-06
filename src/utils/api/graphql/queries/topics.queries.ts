import { gql } from '@apollo/client'

export const GET_TOPICS = gql`
  query GetTopics {
    topics {
      id
      title
      description
    }
  }
`

export const GET_TOPIC_BY_ID = gql`
  query getTopicById($id: ID!) {
    getTopicById(id: $id) {
      id
      title
      description
      posts {
        id
        title
        body
        images
        external_link
        created_at
        user_id
        topic_id
        user {
          id
          username
          email
          display_name
        }
      }
    }
  }
`
export const GET_TOPICS_BY_IDS = gql`
  query getTopicsByIds($ids: [ID!]!) {
    getTopicsByIds(ids: $ids) {
      id
      title
      description
      slug
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
  }
`
