import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { StoreContext } from '@/app/providers'

// Components
import Link from 'next/link'
import Avatar from '../ui/avatar'
import {
  Bell,
  Bookmark,
  Maximize2,
  MessageSquare,
  MoreHorizontal,
  Flag,
  Trash,
} from 'lucide-react'
import Dropdown from '../ui/dropdown'

// GRAPHQL
import { useMutation } from '@apollo/client'
import {
  DELETE_COMMENT,
  UPDATE_COMMENT_VOTE,
} from '@/utils/api/graphql/mutations/comments.mutations'

// Helpers
import TimeAgo from 'react-timeago'
import { createMarkup } from '@/utils/helpers/text'
import { getImageUrl } from '@/utils/helpers/images'

// Types
import {
  CommentVoteProps,
  type CommentProps,
} from '@/utils/types/comments.types'
import { type Database } from '@/utils/types/database.types'
import type { DropdownItemsProps } from '@/utils/types/general.types'
import toast from 'react-hot-toast'
import VotingBox from '../ui/action-items/voting-box'

export default function CommentContent({
  comment,
  postId,
  showReplyBox,
  setShowReplyBox,
  updatePost,
  userAuth,
}: {
  comment: CommentProps
  postId: string
  showReplyBox: boolean
  setShowReplyBox: (showReplyBox: boolean) => void
  updatePost: any
  userAuth: any
}) {
  const [
    updateCommentVote,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_COMMENT_VOTE)
  const [voteCount, setVoteCount] = useState<number>(0)
  const [deleteComment, { data, loading, error }] = useMutation(DELETE_COMMENT)
  const [userId, setUserId] = useState<any>(null)
  const [userVote, setUserVote] = useState<any>(null)
  const [showComment, setShowComment] = useState<boolean>(true)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isCommentor, setIsCommentor] = useState<boolean>(false)
  const [moreOptions, setMoreOptions] = useState<DropdownItemsProps[]>([
    {
      name: 'Report',
      value: 'report',
      url: '/',
      onSelect: () => console.log('report'),
      icon: <Flag className="w-4" />,
    },
    {
      name: 'Save',
      value: 'save',
      url: '/',
      onSelect: () => console.log('save'),
      icon: <Bookmark className="w-4" />,
    },
    {
      name: 'Follow',
      value: 'follow',
      url: '/',
      onSelect: () => console.log('follow'),
      icon: <Bell className="w-4" />,
    },
  ])

  useEffect(() => {
    if (userAuth && isCommentor) {
      const userVote = comment?.votes.find(
        (vote) => vote.user_id === userAuth.id
      )
      setUserVote(userVote)
      setMoreOptions((moreOptions) => [
        ...moreOptions,
        {
          name: 'Delete',
          value: 'delete',
          url: '/',
          onSelect: async () => {
            deleteComment({ variables: { id: comment.id, user_id: userId } })
              .then((res) => {
                updatePost()
              })
              .catch((err) => {
                toast.error('Something went wrong. Try again!')
              })
          },
          icon: <Trash className="w-4" />,
        },
      ])
    } else {
      setUserVote(null)
      setIsCommentor(false)
      setMoreOptions(
        moreOptions.filter(function (obj) {
          return obj.value !== 'delete'
        })
      )
    }
  }, [isCommentor])

  useEffect(() => {
    ;(async () => {
      if (error) {
        console.log(error)
      }

      if (userAuth && comment?.user?.id === userAuth.id) {
        setUserId(userAuth.id)
        setIsCommentor(true)
      } else {
        setIsCommentor(false)
        setUserId(null)
      }

      if (comment?.user?.profile_image) {
        getImageUrl(comment.user.profile_image, 'profile_images').then(
          (url) => {
            setProfileImage(url)
          }
        )
      }

      calculateVotes(comment?.votes)
    })()
  }, [comment])

  const calculateVotes = (votes: CommentVoteProps[]) => {
    setVoteCount(votes.reduce((acc, value) => acc + value.vote, 0))
  }

  const updateVote = (commentId: string, userId: string, vote: number) => {
    updateCommentVote({
      variables: {
        comment_id: commentId,
        user_id: userId,
        vote: vote,
      },
    })
      .then((res) => {
        updatePost(postId)
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  return (
    <div className="w-full">
      <div className="space-y-2">
        <div className="flex items-center  break-words">
          <p className="text-[11px] text-white font-normal">
            <Link
              href={`/user/${comment.user?.username}`}
              className="hover:underline"
            >
              {comment.user?.username}
            </Link>
            <span className="text-neutral-500">&nbsp;&#8226;&nbsp;</span>
            <span className="text-[10px] text-neutral-500">
              <TimeAgo date={comment?.created_at} />
            </span>
          </p>
        </div>
        {showComment && (
          <div className="space-y-3">
            <div
              className="text-white text-sm"
              dangerouslySetInnerHTML={createMarkup(comment?.body)}
            />
            <div className="flex space-x-3">
              <VotingBox
                voteCount={voteCount}
                userVote={userVote && userVote?.vote ? userVote.vote : 0}
                itemId={comment?.id}
                userId={userAuth?.id}
                updateVote={updateVote}
                btnSize={3}
                textSize="text-xs font-normal"
                containerClasses="flex items-center space-x-2 relative"
              />
              <div>
                <button
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className={`flex items-center space-x-1 
                  ${
                    showReplyBox ? 'text-base-content' : 'text-base-content/50'
                  } hover:text-base-content`}
                >
                  <MessageSquare className="w-3" />
                  <span className="text-[10px] font-semibold">Reply</span>
                </button>
              </div>

              <Link
                href="/share"
                className="flex items-center space-x-1 text-base-content/50 hover:text-base-content"
              >
                <span className="text-[10px] font-semibold">Share</span>
              </Link>

              <Dropdown
                trigger={
                  <MoreHorizontal className="w-4 text-base-content/50 hover:text-base-content" />
                }
                items={moreOptions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
