import { UserProfileProps } from './profile.types'
import { TopicProps } from './topics.types'
import { CommentProps } from './comments.types'

export interface PostVotesProps {
  id: string
  upvote: boolean
  downvote: boolean
  user_id: string
  vote: number
}

export interface PostProps {
  __typename: string
  id: string
  title: string
  body: string
  images: {
    items: string[]
  }
  user_id: string
  user: UserProfileProps
  topic_id: string
  topic: TopicProps
  comments: CommentProps[]
  created_at: Date
  votes: PostVotesProps[]
}
