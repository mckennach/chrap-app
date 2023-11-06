'use client'

import { useContext, useEffect } from 'react'
import { StoreContext } from '@/app/providers'

// Components
import PostForm from './post-form'
import PostsList from './posts-list'

// Types
import type { PostProps } from '@/utils/types/posts.types'

export default function PostsView({ posts }: { posts: PostProps[] }) {
  const { user, userAuth } = useContext(StoreContext) || {}

  useEffect(() => {
    console.log('POSTS', posts)
  }, [posts])

  return (
    <>
      {user && userAuth && <PostForm />}
      <PostsList posts={posts} />
    </>
  )
}
