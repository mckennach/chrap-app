import { NextResponse } from 'next/server'
import { useQuery } from '@apollo/client'
import { GET_PROFILE_BY_ID, GET_PROFILES } from '@/utils/api/graphql/queries'
import client from '@/apollo-client'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params

  const {
    data: { getProfiles: data },
  } = await client.query({
    query: GET_PROFILES,
  })

  return NextResponse.json({ data })
}
