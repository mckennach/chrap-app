import { gql } from '@apollo/client'

export const GET_PROFILE_IMAGE_BY_ID = gql`
  query GetProfileImageById($id: ID!) {
    getProfileImageById(id: $id) {
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
`

export const GET_PROFILE_BY_ID = gql`
  query GetProfileById($id: ID!) {
    getProfileById(id: $id) {
      created_at
      display_name
      email
      id
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
      profile_image_id
      username
      saved_items
      topics_followed
      users_followed
    }
  }
`

export const GET_PROFILE_BY_USERNAME = gql`
  query GetProfileByUsername($username: String!) {
    getProfileByUsername(username: $username) {
      created_at
      display_name
      email
      id
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
      profile_image_id
      username
      saved_items
      topics_followed
      users_followed
    }
  }
`

export const GET_PROFILES = gql`
  query GetProfiles {
    getProfiles {
      created_at
      display_name
      email
      id
      profile_image
      username
      saved_items
    }
  }
`

export const GET_PROFILES_USERNAME_AND_EMAIL = gql`
  query GetProfiles {
    getProfiles {
      email
      username
    }
  }
`
