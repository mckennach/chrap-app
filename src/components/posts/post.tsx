'use client'

import { useState, useEffect, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Components
import Card from '../ui/card'
import CommentView from '../comments/comments-view'

// GraphQL
import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '@/utils/api/graphql/queries/posts.queries'
import { DELETE_POST } from '@/utils/api/graphql/mutations/posts.mutations'

// Types
import type { PostProps } from '@/utils/types/posts.types'
import type { CommentProps } from '@/utils/types/comments.types'
import type { Database } from '@/utils/types/database.types'

// Helpers
import PostContent from './post-content'

export default function Post({
  post,
  postId,
  detailPage,
}: {
  post: PostProps | null
  postId: string
  detailPage: boolean
}) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [
    getPostById,
    { data: queryData, error: queryError, loading: queryLoading, refetch },
  ] = useLazyQuery(GET_POST_BY_ID)
  const [refetchPost, setRefetchPost] = useState<boolean>(true)
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST)
  const [postData, setPostData] = useState<PostProps | null>(null)
  const [user, setUser] = useState<any>(null)
  const [commentCount, setCommentCount] = useState<number>(0)
  const [comments, setComments] = useState<CommentProps[] | []>([])

  useEffect(() => {
    if (postId && refetchPost) {
      getPostById({
        variables: { id: postId },
        notifyOnNetworkStatusChange: true,
      }).then((res) => {
        setPostData(res?.data?.getPostById)
        setRefetchPost(false)
      })
    }
  }, [detailPage, refetchPost])

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post])

  useEffect(() => {
    ;(async () => {
      if (postData) {
        if (postData?.user_id && postData?.user) {
          setUser(postData?.user)
        }
        if (postData?.comments) {
          setCommentCount(postData?.comments?.length)
          if (detailPage && postData?.comments?.length > 0) {
            setComments(postData?.comments)
          }
        } else {
          setCommentCount(0)
          setComments([])
        }
      }
    })()
  }, [postData, data])

  const handleClick = async (e: any, postData: PostProps) => {
    if (!e?.target?.classList?.contains('link-target')) {
      return router.push(`/t/${postData.topic?.slug}/comments/${postData.id}`)
    }
  }

  const updatePost = async () => {
    const {
      data: { getPostById },
    } = await refetch()
    setPostData(getPostById)
  }

  if (!user || !postData) return null

  return (
    <Card
      className=""
      onClick={
        !detailPage ? (event) => handleClick(event, postData) : undefined
      }
    >
      <PostContent
        postData={postData}
        commentCount={commentCount}
        user={user}
        updatePost={updatePost}
      />

      {detailPage && (
        <CommentView
          comments={comments}
          postId={postId}
          updatePost={updatePost}
        />
      )}
    </Card>
  )
}
