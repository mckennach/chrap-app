import type { ReactNode } from 'react'
import type { ResolvingMetadata, Metadata } from 'next'
import { capitalizeFirstLetter } from '@/utils/helpers/text'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params
  let pageTitle = ''
  return {
    title: `${capitalizeFirstLetter(slug)} | Chrap`,
  }
}

export default async function TopicLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { username: string }
}) {
  return <>{children}</>
}
