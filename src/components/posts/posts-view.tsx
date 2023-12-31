'use client'

import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '@/app/providers'

// Components
import PostForm from './post-form'
import PostsList from './posts-list'

// Types
import type { PostProps } from '@/utils/types/posts.types'

export default function PostsView({ posts }: { posts: PostProps[] }) {
  const { user, userAuth } = useContext(StoreContext) || {}
  const [postsData, setPostsData] = useState<PostProps[]>([])

  useEffect(() => {
    if (posts) {
      setPostsData(posts)
    }
  }, [posts])

  return (
    <>
      {user && userAuth && <PostForm />}
      <PostsList posts={postsData} />
    </>
  )
}
