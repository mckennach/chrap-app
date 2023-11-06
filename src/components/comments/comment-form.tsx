'use client'

import { useState, useEffect, useContext } from 'react'
import TextEditor from '../ui/text-editor'
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation'
import { StoreContext } from '@/app/providers'
import { useMutation } from '@apollo/client'
import {
  INSERT_COMMENT,
  INSERT_COMMENT_VOTE,
} from '@/utils/api/graphql/mutations/comments.mutations'

export default function CommentForm({
  postId,
  updatePost,
}: {
  postId: string
  updatePost: any
}) {
  const router = useRouter()
  const { user } = useContext(StoreContext) || {}
  const [comment, setComment] = useState<string>('')
  const [insertComment, { data, loading, error }] = useMutation(INSERT_COMMENT)
  const [
    insertCommentVote,
    { data: voteData, loading: voteLoading, error: voteError },
  ] = useMutation(INSERT_COMMENT_VOTE)
  // useEffect(() => {
  //   console.log(comment)
  // }, [comment])

  const onSubmit: (commentInput: string) => void = async (
    commentInput: string
  ) => {
    if (user && user.id) {
      if (commentInput.length > 7) {
        insertComment({
          variables: {
            body: commentInput,
            user_id: user?.id,
            post_id: postId,
            parent_id: null,
          },
        })
          .then(async (res) => {
            toast.success('Comment added successfully!')
            setComment('')
            insertCommentVote({
              variables: {
                comment_id: res.data.insertComment.id,
                user_id: user?.id,
                vote: 1,
              },
            })
              .then((res) => {
                updatePost()
              })
              .catch((err) => {
                updatePost()
                throw new Error(err)
              })
          })
          .catch((err) => {
            toast.error('Something went wrong. Try again!')
            throw new Error(err)
          })
      } else {
        toast.error('Please enter a comment')
        return
      }
    } else {
      toast.error('Please login to comment')
    }
  }

  return (
    <>
      <TextEditor onSubmit={onSubmit} buttonText="Comment" />
    </>
  )
}
