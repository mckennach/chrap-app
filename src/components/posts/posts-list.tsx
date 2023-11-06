'use client'

import { useState, useEffect } from 'react'
import type { PostProps } from '@/utils/types/posts.types'
import Post from './post'
import PostsLoading from './posts-loading'

export default function PostsList({ posts }: { posts: PostProps[] | null }) {
  if (!posts || posts?.length === 0) return <PostsLoading count={2} />
  return (
    <>
      {posts.map((post) => (
        <Post key={post?.id} post={post} postId={post?.id} detailPage={false} />
      ))}
    </>
  )
}
