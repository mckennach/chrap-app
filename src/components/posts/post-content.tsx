'use client'

import 'swiper/css'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '@/app/providers'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// GraphQL
import { useMutation } from '@apollo/client'
import { UPDATE_POST_VOTE } from '@/utils/api/graphql/mutations/posts.mutations'
import { UPDATE_SAVED_ITEMS } from '@/utils/api/graphql/mutations/profile.mutations'

// Components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
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
import Image from 'next/image'
import Avatar from '../ui/avatar'
import Dropdown from '../ui/dropdown'

// Helpers
import { createMarkup } from '@/utils/helpers/text'
import {
  getImageUrl,
  getImageUrlFromName,
  imageLoader,
} from '@/utils/helpers/images'

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
  const supabase = createClientComponentClient()
  const [updatePostVote] = useMutation(UPDATE_POST_VOTE)
  const [updateSavedItems] = useMutation(UPDATE_SAVED_ITEMS)
  const [images, setImages] = useState<string[]>([])
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

    if (postData?.images && postData?.images?.ids?.length > 0) {
      postData?.images?.ids?.map(async (image) => {
        getImageUrlFromName(image, 'post_images').then((url) => {
          setImages((prev) => [...prev, url])
        })
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

  console.log(images)

  return (
    <div className="flex gap-2">
      <VotingBox
        userId={user?.id}
        itemId={postData?.id}
        voteCount={voteCount}
        userVote={userVote && userVote?.vote ? userVote?.vote : 0}
        updateVote={updateVote}
      />
      <div className="flex flex-col space-y-4 max-w-full">
        <div className="flex flex-col p-2 w-full relative">
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

          {images && images?.length > 0 && (
            <Swiper
              modules={[Navigation]}
              loop={false}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              className="pr-4 w-full h-[400px]"
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {images?.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="relative h-[200px] w-full flex justify-center items-center"
                >
                  <Image
                    src={image}
                    alt="Post Image"
                    className="mx-auto max-w-full"
                    style={{ width: 'auto', height: '100%' }}
                    width={400}
                    height={400}
                    // fill={true}
                    // style={{ objectFit: 'cover', objectPosition: 'center' }}
                    // sizes='(max-width: 768px) 100vw, 768px'

                    loader={imageLoader}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

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
