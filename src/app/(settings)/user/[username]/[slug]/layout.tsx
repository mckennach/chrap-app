import type { ReactNode } from 'react'
import type { ResolvingMetadata, Metadata } from 'next'

type Props = {
  params: { username: string; slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username, slug } = params
  let pageTitle = ''
  switch (slug) {
    case 'overview':
      pageTitle = ''
      break
    case 'submitted':
      pageTitle = '- Posts'
      break
    case 'comments':
      pageTitle = '- Comments'
      break
    case 'history':
      pageTitle = '- History'
      break
    case 'saved':
      pageTitle = '- Saved'
      break
    case 'hidden':
      pageTitle = '- Hidden'
      break
    default:
      pageTitle = '- Overview'
      break
  }
  return {
    title: `${username} ${pageTitle} | Chrap`,
  }
}

export default async function UserLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
