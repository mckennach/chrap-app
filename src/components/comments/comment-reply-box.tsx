import { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast'
import { StoreContext } from '@/app/providers'

// GRAPHQL
import {
  INSERT_COMMENT,
  INSERT_COMMENT_VOTE,
} from '@/utils/api/graphql/mutations/comments.mutations'
import { useMutation } from '@apollo/client'

// Components
import TextEditor from '../ui/text-editor'

// Types
import type { FormEvent, ChangeEvent } from 'react'
import { comment } from 'postcss'

const CommentReplyBox = ({
  parentId,
  postId,
  updatePost,
  showReplyBox,
}: {
  parentId: string
  postId: string
  updatePost: any
  showReplyBox: boolean
}) => {
  const { user } = useContext(StoreContext) || {}
  const [comment, setComment] = useState<string>('')
  const [insertComment, { data, loading, error }] = useMutation(INSERT_COMMENT)
  const [
    insertCommentVote,
    { data: voteData, loading: voteLoading, error: voteError },
  ] = useMutation(INSERT_COMMENT_VOTE)

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
            parent_id: parentId,
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

  if (!showReplyBox) return null
  return (
    <div className="flex gap-4">
      <div className="flex relative">
        <div className="h-full top-0 cursor-non left-0 comment-threadline"></div>
      </div>
      <div className="">
        <TextEditor onSubmit={onSubmit} buttonText="Comment" />
      </div>
    </div>
  )
}

export default CommentReplyBox
