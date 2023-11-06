'use client'

import Card from '@/components/ui/card'
import * as Separator from '@radix-ui/react-separator'
import Link from 'next/link'
export default function Sidebar() {
  return (
    <>
      <Card className="prose ">
        <h4 className="text-white font-normal">Home</h4>
        <p className="text-xs">
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </p>
        <Separator.Root className="bg-white/50 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mb-3" />
        <div className="space-y-2">
          <Link
            href="/submit"
            className="btn btn-outline bg-white text-base-100 rounded-full btn-sm btn-block capitalize"
          >
            Create Post
          </Link>
          <Link
            href="/submit"
            className="btn btn-outline rounded-full btn-sm btn-block capitalize"
          >
            Create Community
          </Link>
        </div>
      </Card>
      <Card className="prose ">
        <h5>RECENT POSTS</h5>
        <p className="text-xs">
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </p>
      </Card>
      <Card className="sticky top-5 prose text-xs space-y-3">
        <nav role="navigation ">
          <ul className="columns-2 list-none">
            <li className="m-0 mb-2 p-0">
              <Link href="/">User Agreement</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Privacy Policy</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Content Policy</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Moderator Code of Conduct</Link>
            </li>
          </ul>
          <Separator.Root className="bg-white/50 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px" />
          <ul className="columns-2 list-none">
            <li className="m-0 mb-2 p-0">
              <Link href="/">English</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Français</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Italiano</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Deutsch</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Español</Link>
            </li>
            <li className="m-0 mb-2 p-0">
              <Link href="/">Português</Link>
            </li>
          </ul>
        </nav>
      </Card>
    </>
  )
}
