import { ReactNode } from 'react'
import TabBar from '@/components/ui/tab-bar'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username

  return {
    title: `${username} | Chrap`,
  }
}

export default async function User({
  children,
  params,
}: {
  children: ReactNode
  params: { username: string }
}) {
  const tabs = [
    {
      name: 'Overview',
      value: 'overview',
      href: '/user/[username]',
      as: `/user/${params?.username}`,
    },
    {
      name: 'Posts',
      value: 'posts',
      href: '/user/[username]/submitted',
      as: `/user/${params?.username}/submitted`,
    },
    {
      name: 'Comments',
      value: 'comments',
      href: '/user/[username]/comments',
      as: `/user/${params?.username}/comments`,
    },
    {
      name: 'History',
      value: 'history',
      href: '/user/[username]/history',
      as: `/user/${params?.username}/history`,
    },
    {
      name: 'Saved',
      value: 'saved',
      href: '/user/[username]/saved',
      as: `/user/${params?.username}/saved`,
    },
    {
      name: 'Hidden',
      value: 'hidden',
      href: '/user/[username]/hidden',
      as: `/user/${params?.username}/hidden`,
    },
    {
      name: 'Upvoted',
      value: 'upvoted',
      href: '/user/[username]/upvoted',
      as: `/user/${params?.username}/upvoted`,
    },
    {
      name: 'Downvoted',
      value: 'downvoted',
      href: '/user/[username]/downvoted',
      as: `/user/${params?.username}/downvoted`,
    },
  ]

  return (
    <>
      <TabBar tabs={tabs} />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
        {children}
      </div>
    </>
  )
}
