import { useState, useEffect } from 'react'
import Comment from './comment'
import type { CommentProps } from '@/utils/types/comments.types'
import { comment } from 'postcss'

export function Comments({
  comment,
  postId,
  updatePost,
}: {
  comment: CommentProps
  postId: string
  updatePost: any
}) {
  const [showComment, setShowComment] = useState<boolean>(true)

  return (
    <div
      className={`${comment.id !== 'first' ? 'comment-container' : ''} ${
        showComment ? 'show-comment' : 'hide-comment'
      } relative`}
    >
      {comment.id !== 'first' && (
        <div id={comment?.id}>
          <Comment
            key={comment?.id}
            comment={comment}
            postId={postId}
            updatePost={updatePost}
            showComment={showComment}
            setShowComment={setShowComment}
          />
        </div>
      )}
      {comment?.children_comments?.map((comment: any) => {
        return (
          <Comments
            key={comment?.id}
            comment={comment}
            postId={postId}
            updatePost={updatePost}
          />
        )
      })}
    </div>
  )
}

export default function CommentsList({
  comments,
  postId,
  updatePost,
}: {
  comments: CommentProps[]
  postId: string
  updatePost: any
}) {
  const [commentData, setCommentData] = useState<CommentProps | null>(null)
  const commentsInitialState: CommentProps = {
    __typename: 'Comment',
    id: 'first',
    body: '',
    user_id: '',
    user: null,
    post_id: '',
    post: null,
    created_at: new Date(),
    votes: [],
    parent_id: null,
    parent_comment: null,
    children_comments: null,
  }

  const sortBy = (key: string) => {
    let data = null
    if (key === 'created_at') {
      data = comments?.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      })
    }
    return data
  }

  useEffect(() => {
    ;(async () => {
      const sortedComments = sortBy('created_at')
      const commentTree = buildCommentTree(sortedComments)
      commentsInitialState.children_comments = commentTree
      setCommentData(commentsInitialState)
    })()
  }, [comments])

  const buildCommentTree = (
    comments: CommentProps[] | null
  ): CommentProps[] => {
    let commentTree: CommentProps[] = []
    let commentMap: any = {}

    if (!comments) return commentTree

    comments.forEach((comment) => {
      commentMap[comment?.id] = comment
      comment.children_comments = []
    })

    comments.forEach((comment) => {
      if (comment.parent_id) {
        commentMap[comment.parent_id].children_comments.push(comment)
      } else {
        commentTree.push(comment)
      }
    })
    return commentTree
  }

  if (!commentData?.children_comments) return null

  return (
    <div className="space-y-6 pb-4 ">
      <Comments comment={commentData} postId={postId} updatePost={updatePost} />
    </div>
  )
}
