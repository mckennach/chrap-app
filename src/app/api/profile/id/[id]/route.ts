import { NextResponse } from 'next/server'
import { useQuery } from '@apollo/client'
import {
  GET_PROFILE_BY_ID,
  GET_PROFILE_BY_USERNAME,
  GET_PROFILES,
  GET_PROFILE_IMAGE_BY_ID,
} from '@/utils/api/graphql/queries'
import client from '@/apollo-client'

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const {
    data: { getProfileById: data },
  } = await client.query({
    query: GET_PROFILE_BY_ID,
    variables: { id },
  })

  const image = data?.profile_image
    ? await client.query({
        query: GET_PROFILE_IMAGE_BY_ID,
        variables: { id: data?.profile_image },
      })
    : null

  const imageObject = image ? image.data.getProfileImageById : null

  return NextResponse.json({ data, profile_image: imageObject })
  // return NextResponse.json({ data, profiles })
}
