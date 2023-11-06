import { ImageProps } from './images.types'

export interface TopicProps {
  id: string
  title: string
  slug: string
  topic_image_id: string
  topic_image: ImageProps
  created_at: Date
  post_ids: string[]
  created_by_user_id: string
}

export interface TopicsListProps {
  name: string
  value: string
  topics: TopicProps[]
}
