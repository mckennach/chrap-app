'use client'

import React, { Fragment, useEffect, useState, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { StoreContext } from '@/app/providers'

// GraphQL
import { useLazyQuery } from '@apollo/client'
import { GET_TOPICS_BY_IDS } from '@/utils/api/graphql/queries/topics.queries'

// Components
import * as Select from '@radix-ui/react-select'
import {
  AvatarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeOpenIcon,
  HomeIcon,
  PlusIcon,
  BellIcon,
  LightningBoltIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import Avatar from '../ui/avatar'

// Helpers
import classNames from 'classnames'
import { TopicProps } from '@/utils/types/topics.types'
import { getImageUrl } from '@/utils/helpers/images'

interface TopicsProps {
  name: string
  value: string
  url: string
  icon: React.ReactNode
}

interface TopicsListProps {
  name: string
  value: string
  topics: TopicsProps[]
}

const TopicsList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useContext(StoreContext) || {}
  const [
    getTopicsByIds,
    { data: topicData, loading: topicLoading, error: topicError },
  ] = useLazyQuery(GET_TOPICS_BY_IDS)
  const [inputValue, setInputValue] = useState<string>('')
  const [topicIds, setTopicIds] = useState<string[]>([])
  const [topics, setTopics] = useState<TopicProps[]>([])
  const [selected, setSelected] = useState('/')
  const [filteredTopics, setFilteredTopics] = useState<TopicsListProps[]>([
    {
      name: 'Feeds',
      value: 'feeds',
      topics: [
        {
          name: 'Home',
          value: 'home',
          url: '/',
          icon: <HomeIcon />,
        },
        {
          name: 'Popular',
          value: 'popular',
          url: '/t/popular',
          icon: <RocketIcon />,
        },
        {
          name: 'All',
          value: 'all',
          url: '/t/all',
          icon: <LightningBoltIcon />,
        },
      ],
    },
    {
      name: 'Other',
      value: 'other',
      topics: [
        {
          name: 'User Settings',
          value: 'user-settings',
          url: '/settings',
          icon: <AvatarIcon />,
        },
        {
          name: 'Messages',
          value: 'messages',
          url: '/messages/inbox',
          icon: <EnvelopeOpenIcon />,
        },
        {
          name: 'Create Post',
          value: 'create-post',
          url: '/submit',
          icon: <PlusIcon />,
        },
        {
          name: 'Notifications',
          value: 'notifications',
          url: '/notifications',
          icon: <BellIcon />,
        },
      ],
    },
  ])

  useEffect(() => {
    ;(async () => {
      if (user) {
        const image = user?.profile_image
          ? await getImageUrl(user?.profile_image, 'profile_images')
          : null
        const icon = image ? (
          <Avatar
            imageUrl={image}
            size={4}
            altText={`${user?.username} Image`}
          />
        ) : (
          <AvatarIcon />
        )
        const dropdownObject: TopicsListProps = {
          name: 'User',
          value: 'user',
          topics: [
            {
              name: `u/${user?.username}`,
              value: user?.username,
              url: `/user/${user?.username}`,
              icon,
            },
          ],
        }

        setFilteredTopics([...filteredTopics, dropdownObject])

        if (user?.topics_followed && user?.topics_followed?.ids.length > 0) {
          const { ids } = user?.topics_followed
          getTopicsByIds({ variables: { ids } }).then((res) => {
            setTopics(res?.data?.getTopicsByIds)
          })
        }
      }
    })()
  }, [user])

  useEffect(() => {
    ;(async () => {
      const dropdownObject: TopicsListProps = {
        name: 'Your Communities',
        value: 'your-communities',
        topics: [],
      }
      if (topics && topics.length > 0) {
        topics.map(async (topic) => {
          const { title, slug, topic_image } = topic
          const image = topic_image
            ? await getImageUrl(topic_image, 'topic_images')
            : null
          const icon = image ? (
            <Avatar imageUrl={image} size={4} altText={`${title} Image`} />
          ) : (
            <AvatarIcon />
          )

          dropdownObject.topics.push({
            name: title,
            value: slug,
            url: `/t/${slug}`,
            icon,
          })
        })
        setFilteredTopics([dropdownObject, ...filteredTopics])
      }
    })()
  }, [topics])

  useEffect(() => {
    filteredTopics.map((group) => {
      const { topics } = group
      topics.map((topic) => {
        if (topic.url === pathname) {
          setSelected(topic.url)
        }
      })
    })
  }, [pathname, filteredTopics])

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setInputValue(value)
    // const filtered = filteredTopics.filter((group) => {
    //   const { topics } = group
    //   const filteredTopics = topics.filter((topic) => {
    //     const { name } = topic
    //     return name.toLowerCase().includes(value.toLowerCase())
    //   })
    //   return filteredTopics.length > 0
    // })
    // setFilteredTopics(filtered)
  }

  const handleSelect = (value: string) => {
    setSelected(value)
    router.push(value)
  }

  if (filteredTopics.length === 0) return null

  return (
    <Select.Root value={selected} onValueChange={handleSelect}>
      <Select.Trigger
        className="inline-flex w-52 items-center justify-between 
      rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] 
      bg-base-100 text-base-content 
      hover:bg-base-100 
      focus:rounded-b-none 
      focus:shadow-[0_0_0_2px] 
      data-[placeholder]:text-accent outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder="Select topic" />
        <Select.Icon className="text-base-content">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          className="overflow-hidden max-h-[450px] w-52 bg-base-100 
        rounded-t-none 
        rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.ScrollUpButton className="flex items-center h-[25px] justify-center bg-base-100 text-base-content cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[10px]">
            <Select.Group>
              <Select.Label className="px-[6px] mb-2 text-xs font-normal leading-[25px] text-white/50">
                <input
                  value={inputValue}
                  placeholder="Filter"
                  type="text"
                  onChange={handleFilterInput}
                  className="w-full p-1 px-2 input-accent rounded-sm placeholder:text-white/50 text-white"
                />
              </Select.Label>
            </Select.Group>

            {filteredTopics.map((group) => {
              const { topics } = group
              return (
                <Select.Group key={group.value} className="mb-3">
                  <Select.Label className="px-[6px] text-[10px] font-medium leading-[25px] text-white/50 uppercase">
                    {group.name}
                  </Select.Label>
                  {topics.map((topic) => {
                    return (
                      <Select.Item
                        className={classNames(
                          'text-[13px] leading-none text-base-content rounded-[3px] flex justify-between items-center h-[25px] px-[6px] relative select-none data-[disabled]:text-accent data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-accent data-[highlighted]:text-white cursor-pointer'
                        )}
                        onClick={() => router.push(topic.url)}
                        value={topic.url}
                        key={topic.value}
                      >
                        <Select.ItemText className="flex justify-between">
                          <div className="flex items-center gap-2">
                            {topic.icon}
                            {topic.name}
                          </div>
                        </Select.ItemText>
                      </Select.Item>
                    )
                  })}
                </Select.Group>
              )
            })}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-base-100 text-base-content cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default TopicsList
