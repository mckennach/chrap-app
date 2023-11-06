import { NextResponse } from 'next/server'
import client from '@/apollo-client'
import { GET_POSTS } from '@/utils/api/graphql/queries/posts.queries'

export async function GET(request: Request) {
  const {
    data: { getPosts: data },
  } = await client.query({
    query: GET_POSTS,
    canonizeResults: true,
  })

  return NextResponse.json({
    data,
  })
}
