import { ReactNode } from 'react'
import TabBar from '@/components/ui/tab-bar'
import type { Metadata, ResolvingMetadata } from 'next'

// type Props = {
//   params: { username: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const username = params.username

//   return {
//     title: `${username} | Chrap`,
//   }
// }

export default async function SettingsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
        {children}
      </div>
    </>
  )
}
