import type { ImageProps } from './images.types'

export interface SavedItemProps {
  id: string
  type: string
}

export interface SavedItemsProps {
  items: SavedItemProps[]
}

export interface TopicsFollowedProps {
  ids: string[]
}

export interface UsersFollowedProps {
  ids: string[]
}

export interface UsernameAvailabilityVariables {
  username: string
  email: string
}

export interface UserProfileProps {
  id: string
  display_name: string
  email: string
  username: string
  profile_image: ImageProps | null
  profile_image_id: string | null
  created_at: Date
  saved_items: SavedItemsProps | null
  topics_followed: TopicsFollowedProps | null
  users_followed: UsersFollowedProps | null
  _typename: string
}
