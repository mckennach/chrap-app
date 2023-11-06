import { NextResponse } from 'next/server'
import { DELETE_POST } from '@/utils/api/graphql/mutations/posts.mutations'
import client from '@/apollo-client'
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const { data } = await client.mutate({
    mutation: DELETE_POST,
    variables: { id },
  })

  return NextResponse.json({ data: id })
}
