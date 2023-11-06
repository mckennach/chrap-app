import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $email: String
    $username: String
    $display_name: String
    $id: ID
    $created_at: DateTime
    $profile_image: String
  ) {
    updateProfiles(
      email: $email
      username: $username
      display_name: $display_name
      id: $id
      created_at: $created_at
      profile_image: $profile_image
    ) {
      email
      username
      display_name
      id
      created_at
      profile_image
    }
  }
`

export const UPDATE_SAVED_ITEMS = gql`
  mutation updateProfileSavedItems($id: ID!, $saved_items: JSON!) {
    updateProfileSavedItems(id: $id, saved_items: $saved_items) {
      saved_items
    }
  }
`
