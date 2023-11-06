// 'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '@/utils/api/graphql/queries/posts.queries'
import { PostProps } from '@/utils/types/posts.types'
import client from '@/apollo-client'
import Post from '@/components/posts/post'

export default async function CommentPage({
  params,
}: {
  params: { id: string }
}) {
  const { data } = await client.query({
    query: GET_POST_BY_ID,
    variables: { id: params?.id },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  })
  return <Post post={data?.getPostById} postId={params?.id} detailPage={true} />
}
