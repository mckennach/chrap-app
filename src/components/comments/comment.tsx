import { useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { StoreContext } from '@/app/providers'

import {
  Bell,
  Bookmark,
  Maximize2,
  MessageSquare,
  MoreHorizontal,
  Flag,
  Trash,
} from 'lucide-react'
import Avatar from '../ui/avatar'
import Link from 'next/link'
import TimeAgo from 'react-timeago'

// Helpers

import { getImageUrl } from '@/utils/helpers/images'

// Types
import type { CommentProps } from '@/utils/types/comments.types'
import CommentContent from './comment-content'
import CommentReplyBox from './comment-reply-box'

export default function Comment({
  comment,
  postId,
  updatePost,
  showComment,
  setShowComment,
}: {
  comment: CommentProps
  postId: string
  updatePost: any
  showComment: boolean
  setShowComment: (showComment: boolean) => void
}) {
  const { userAuth } = useContext(StoreContext) || {}

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false)

  useEffect(() => {
    if (comment?.user?.profile_image) {
      getImageUrl(comment.user.profile_image, 'profile_images').then((url) => {
        setProfileImage(url)
      })
    }
  }, [comment])

  return (
    <div className="comment">
      <div className="">
        <div className="h-full flex">
          {!showComment && (
            <button
              className="mr-2 self-baseline mt-[5px]"
              onClick={() => setShowComment(!showComment)}
            >
              <Maximize2 className="text-primary " size={16} />
            </button>
          )}
          <Avatar
            imageUrl={profileImage}
            altText={`${comment?.user?.display_name} Avatar`}
            size={6}
          />
          {showComment && (
            <button
              onClick={() => setShowComment(!showComment)}
              className="comment-threadline"
            ></button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <CommentContent
          comment={comment}
          postId={postId}
          showReplyBox={showReplyBox}
          setShowReplyBox={setShowReplyBox}
          updatePost={updatePost}
          userAuth={userAuth}
        />
        <CommentReplyBox
          parentId={comment?.id}
          postId={postId}
          updatePost={updatePost}
          showReplyBox={showReplyBox}
        />
      </div>
    </div>
  )
}
