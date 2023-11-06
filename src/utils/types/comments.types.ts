import { PostProps } from './posts.types'
import { UserProfileProps } from './profile.types'

export interface CommentVoteProps {
  id: string
  upvote: boolean
  downvote: boolean
  user_id: string
  vote: number
}

export interface CommentProps {
  __typename: string
  id: string
  title?: string
  body: string
  user_id: string
  user: UserProfileProps | null
  post_id: string
  post: PostProps | null
  created_at: Date
  votes: CommentVoteProps[]
  parent_id: string | null
  parent_comment: CommentProps[] | null
  children_comments: CommentProps[] | null
}
