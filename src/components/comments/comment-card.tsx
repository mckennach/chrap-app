import { useEffect, useState } from 'react'

// Components
import Card from '../ui/card'
import { MessageSquare, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
// Helpers
import { createMarkup } from '@/utils/helpers/text'

// Types
import type { CommentProps } from '@/utils/types/comments.types'
import Link from 'next/link'

export default function CommentCard({ comment }: { comment: CommentProps }) {
  const router = useRouter()

  return (
    <Card
      onClick={() =>
        router.push(
          `/t/${comment?.post?.topic?.slug}/comments/${comment?.post?.id}#${comment?.id}`
        )
      }
    >
      <div className="flex gap-2 items-center">
        <MessageSquare className="w-4" />
        <div className="text-[10px] break-words text-neutral-500 ">
          <p>
            <Link
              href={`/user/${comment?.user?.username}`}
              className="text-white hover:underline"
            >
              {comment?.user?.username}
            </Link>{' '}
            commented on{' '}
            <Link
              href={`/t/${comment?.post?.topic?.slug}/comments/${comment?.post?.id}`}
              className="text-white font-semibold"
            >
              {comment?.post?.title}
            </Link>{' '}
            <Link
              className="link-info hover:underline ml-3"
              href={`/t/${comment?.post?.topic?.slug}/comments/${comment?.post?.id}`}
              passHref
              legacyBehavior
            >
              <a
                className="link-info hover:underline ml-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Post <ExternalLink className="w-3 inline" />
              </a>
            </Link>
            <span>&nbsp;&#8226;&nbsp;</span>
            <Link
              href={`/t/${comment?.post?.topic?.slug}`}
              className="text-white hover:underline"
            >
              t/{comment?.post?.topic?.slug}
            </Link>
            <span>&nbsp;&#8226;&nbsp;</span>
            Posted by{' '}
            <Link
              href={`/user/${comment?.user?.username}`}
              className="hover:underline"
            >
              u/{comment?.post?.user?.username}
            </Link>
          </p>
        </div>
      </div>
      <div className="py-4 pl-8">
        <div dangerouslySetInnerHTML={createMarkup(comment?.body)} />
      </div>
    </Card>
  )
}
