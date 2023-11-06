'use client'

import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '@/utils/api/graphql/queries/posts.queries'
import { GET_COMMENT_BY_ID } from '@/utils/api/graphql/queries/comments.queries'

import type { UserProfileProps } from '@/utils/types/profile.types'
import type { PostProps } from '@/utils/types/posts.types'
import type { CommentProps } from '@/utils/types/comments.types'
import Post from '../posts/post'
import CommentCard from '../comments/comment-card'

const SavedItems = ({ user }: { user: UserProfileProps }) => {
  const [currentUser, setCurrentUser] = useState<UserProfileProps | null>(null)
  const [savedItems, setSavedItems] = useState<CommentProps[] | PostProps[]>([])
  const [
    getSavedComment,
    {
      data: savedCommentData,
      loading: savedCommentLoading,
      error: savedCommentError,
    },
  ] = useLazyQuery(GET_COMMENT_BY_ID)
  const [
    getPostById,
    { data: savedPostData, loading: savedPostLoading, error: savedPostError },
  ] = useLazyQuery(GET_POST_BY_ID)

  useEffect(() => {
    if (user && user !== currentUser) {
      setCurrentUser(user)
    }
  }, [user])

  useEffect(() => {
    if (currentUser && currentUser?.saved_items) {
      if (currentUser?.saved_items?.items?.length > 0) {
        const { items } = currentUser?.saved_items
        items?.map((item) => {
          if (item?.type === 'post') {
            getPostById({ variables: { id: item?.id } }).then((res) => {
              if (res?.data?.getPostById) {
                setSavedItems((prev) => [...prev, res?.data?.getPostById])
              }
            })
          } else {
            getSavedComment({ variables: { id: item?.id } }).then((res) => {
              if (res?.data?.getCommentById) {
                setSavedItems((prev) => [...prev, res?.data?.getCommentById])
              }
            })
          }
        })
      }
    }
  }, [currentUser])

  if (savedItems.length === 0) return null

  return (
    <div>
      {savedItems?.map((item) => {
        if (item?.__typename === 'Posts') {
          const post = item as PostProps
          return (
            <Post
              key={item?.id}
              post={post}
              postId={post?.id}
              detailPage={false}
            />
          )
        } else {
          const comment = item as CommentProps

          return <CommentCard comment={comment} key={item?.id} />
        }
      })}
    </div>
  )
}

export default SavedItems
