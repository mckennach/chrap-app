'use client'
import './comments.css'
import { CommentProps } from '@/utils/types/comments.types'
import CommentForm from './comment-form'
import CommentsList from './comments-list'
import CommentsEmpty from './comments-empty'

export default function CommentView({
  comments,
  postId,
  updatePost,
}: {
  comments: CommentProps[]
  postId: string
  updatePost: any
}) {
  return (
    <div className="px-4 pt-4 space-y-10">
      <CommentForm postId={postId} updatePost={updatePost} />
      {comments.length > 0 ? (
        <CommentsList
          comments={comments}
          postId={postId}
          updatePost={updatePost}
        />
      ) : (
        <CommentsEmpty />
      )}
    </div>
  )
}
