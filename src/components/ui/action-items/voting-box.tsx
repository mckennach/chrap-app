'use client'

import { useState, useEffect } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

export default function VotingBox({
  userId,
  itemId,
  voteCount,
  userVote,
  updateVote,
  btnSize = 4,
  textSize = 'text-xs font-semibold',
  containerClasses = 'flex flex-col items-center flex-shrink-0 relative',
}: {
  userId: string | null
  itemId: string
  voteCount: number
  userVote: number
  updateVote: (postId: string, userId: string, vote: number) => void
  btnSize?: number
  textSize?: string
  containerClasses?: string
}) {
  const [voteCountState, setVoteCountState] = useState<number>(voteCount)
  const [upvote, setUpvote] = useState<boolean>(false)
  const [downvote, setDownvote] = useState<boolean>(false)

  useEffect(() => {
    if (userVote === 1) {
      setUpvote(true)
      setDownvote(false)
    } else if (userVote === -1) {
      setUpvote(false)
      setDownvote(true)
    } else {
      setUpvote(false)
      setDownvote(false)
    }
  }, [userVote])

  useEffect(() => {
    setVoteCountState(voteCount)
  }, [voteCount])

  const handleVote = (itemId: string, userId: string, vote: number) => {
    if (userId && itemId) {
      updateVote(itemId, userId, vote)
      if (vote === 1) {
        setUpvote(true)
        setDownvote(false)
        setVoteCountState(voteCount + 1)
      } else {
        setUpvote(false)
        setDownvote(true)
        setVoteCountState(voteCount - 1)
      }
    }
  }

  return (
    <div className={`flex ${containerClasses}`}>
      <button
        onClick={
          userId && itemId ? () => handleVote(itemId, userId, 1) : undefined
        }
      >
        <ThumbsUp
          className={`${
            upvote ? 'text-accent' : 'text-base-content/90'
          } w-${btnSize}  hover:text-accent`}
        />
      </button>
      <span
        className={`${upvote && 'text-accent'} ${
          downvote && 'text-secondary'
        } ${textSize}`}
      >
        {voteCountState}
      </span>
      <button
        onClick={
          userId && itemId ? () => handleVote(itemId, userId, -1) : undefined
        }
      >
        <ThumbsDown
          className={`${
            downvote ? 'text-secondary' : 'text-base-content/90'
          } w-${btnSize}  hover:text-secondary`}
        />
      </button>
    </div>
  )
}
