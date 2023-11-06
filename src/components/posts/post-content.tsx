'use client'

import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '@/app/providers'
import { useMutation } from '@apollo/client'
import { UPDATE_POST_VOTE } from '@/utils/api/graphql/mutations/posts.mutations'
import { UPDATE_SAVED_ITEMS } from '@/utils/api/graphql/mutations/profile.mutations'

// Components
import {
  EyeOff,
  Flag,
  CornerUpRight,
  MessageSquare,
  MoreHorizontal,
  Trash,
} from 'lucide-react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import Avatar from '../ui/avatar'
import Dropdown from '../ui/dropdown'

// Helpers
import { createMarkup } from '@/utils/helpers/text'
import { getImageUrl } from '@/utils/helpers/images'

// Types
import type { PostProps, PostVotesProps } from '@/utils/types/posts.types'

import type { DropdownItemsProps } from '@/utils/types/general.types'
import { UserProfileProps } from '@/utils/types/profile.types'
import VotingBox from '../ui/action-items/voting-box'
import SaveItem from '../ui/action-items/save-item'

export default function PostContent({
  commentCount,
  postData,
  user,
  updatePost,
}: {
  commentCount: number
  postData: PostProps | null
  user: UserProfileProps
  updatePost: (postId: string) => void
}) {
  const [updatePostVote, { data, loading, error }] =
    useMutation(UPDATE_POST_VOTE)
  const [
    updateSavedItems,
    {
      data: savedItemsData,
      loading: savedItemsLoading,
      error: savedItemsError,
    },
  ] = useMutation(UPDATE_SAVED_ITEMS)
  const { userAuth } = useContext(StoreContext) || {}
  const [topicImage, setTopicImage] = useState<string | null>(null)
  const [isPoster, setIsPoster] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [voteCount, setVoteCount] = useState<number>(0)
  const [userVote, setUserVote] = useState<any>(null)
  const [moreOptions, setMoreOptions] = useState<DropdownItemsProps[]>([
    {
      name: 'Hide',
      value: 'hide',
      url: '/',
      onSelect: () => console.log('clicked'),
      icon: <EyeOff className="w-4" />,
    },
    {
      name: 'Report',
      value: 'report',
      url: '/',
      onSelect: () => console.log('clicked'),
      icon: <Flag className="w-4" />,
    },
  ])

  useEffect(() => {
    if (user && userAuth && user?.id === userAuth.id) {
      const userVote = postData?.votes.find(
        (vote) => vote.user_id === userAuth.id
      )

      user?.saved_items?.items?.map((item) => {
        if (item?.id === postData?.id) {
          setIsSaved(true)
        }
      })
      setUserVote(userVote)
      setIsPoster(true)
      setMoreOptions([
        ...moreOptions,
        {
          name: 'Delete',
          value: 'delete',
          url: '/',
          onSelect: () => console.log('clicked'),
          icon: <Trash className="w-4" />,
        },
      ])
    } else {
      setUserVote(null)
      setIsPoster(false)
      setIsSaved(false)
      setMoreOptions(
        moreOptions.filter(function (obj) {
          return obj.value !== 'delete'
        })
      )
    }
  }, [postData, user, userAuth])

  useEffect(() => {
    if (postData?.topic && postData?.topic?.topic_image) {
      getImageUrl(postData?.topic?.topic_image, 'topic_images').then((url) => {
        setTopicImage(url)
      })
    }
    if (postData?.votes && postData?.votes.length > 0) {
      calculateVotes(postData?.votes)
    }
  }, [postData])

  const calculateVotes = (votes: PostVotesProps[]) => {
    setVoteCount(votes.reduce((acc, value) => acc + value.vote, 0))
  }

  const updateVote = (postId: string, userId: string, vote: number) => {
    updatePostVote({
      variables: {
        post_id: postId,
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

  const onSave = (isSaved: boolean, itemId: string, user: UserProfileProps) => {
    const { saved_items } = user
    let updatedObject
    if (isSaved) {
      if (saved_items && saved_items?.items?.length > 0) {
        const updatedList = saved_items?.items?.filter((item) => {
          return item?.id !== itemId
        })
        saved_items.items = updatedList
        updateSavedItems({
          variables: {
            id: user?.id,
            saved_items,
          },
        })
          .then((res) => {
            setIsSaved(false)
          })
          .catch((err) => {
            throw new Error(err)
          })
      }
    } else {
      if (saved_items) {
        if (saved_items?.items?.length > 0) {
          saved_items.items.push({ id: itemId, type: 'post' })
          updateSavedItems({
            variables: {
              id: user?.id,
              saved_items,
            },
          })
            .then((res) => {
              setIsSaved(true)
            })
            .catch((err) => {
              throw new Error(err)
            })
        } else {
          saved_items.items = [{ id: itemId, type: 'post' }]
          updateSavedItems({
            variables: {
              id: user?.id,
              saved_items,
            },
          })
            .then((res) => {
              setIsSaved(true)
            })
            .catch((err) => {
              throw new Error(err)
            })
        }
      }
    }
  }

  if (!user || !postData) return null

  return (
    <div className="flex gap-2">
      <VotingBox
        userId={user?.id}
        itemId={postData?.id}
        voteCount={voteCount}
        userVote={userVote && userVote?.vote ? userVote?.vote : 0}
        updateVote={updateVote}
      />
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col p-2">
          <div className="flex items-center text-[10px] break-words text-neutral-500 mb-1">
            <div className="mr-1">
              <Link
                href={`/t/${postData.topic?.slug}`}
                className="link-target font-semibold text-[12px] text-white hover:underline"
              >
                <Avatar imageUrl={topicImage} altText="Topic Image" size={4} />
              </Link>
            </div>
            <p className="">
              <Link
                href={`/t/${postData.topic?.slug}`}
                className="link-target font-semibold text-[12px] text-white hover:underline"
              >
                t/{postData.topic?.slug}
              </Link>
            </p>
            <span>&nbsp;&#8226;&nbsp;</span>
            <p className="">
              Posted by{' '}
              <Link
                href={`/user/${user?.username}`}
                className="link-target hover:underline"
              >
                u/{user.username}
              </Link>{' '}
              <span>
                <TimeAgo date={postData.created_at} />
              </span>
            </p>
          </div>

          <h2 className="text-md lg:text-xl font-normal break-words mb-3 text-white">
            {postData.title}
          </h2>
          <div
            className="max-h-48 mask-box text-white text-sm break-words overflow-hidden overflow-ellipsis"
            dangerouslySetInnerHTML={createMarkup(postData.body)}
          />
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href={`/t/${postData.topic?.slug}/comments/${postData.id}`}
            className="flex items-center space-x-1 text-base-content/50 hover:text-base-content"
          >
            <MessageSquare className="w-4" />
            <span className="text-[10px] font-semibold">
              {commentCount} Comments
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-1 text-base-content/50 hover:text-base-content"
          >
            <CornerUpRight className="w-4" />
            <span className="text-[10px] font-semibold">Share</span>
          </Link>
          <SaveItem
            isSaved={isSaved}
            onSave={onSave}
            user={user}
            itemId={postData?.id}
          />
          <Dropdown
            trigger={
              <MoreHorizontal className="w-4 text-base-content/50 hover:text-base-content" />
            }
            items={moreOptions}
          />
        </div>
      </div>
    </div>
  )
}
