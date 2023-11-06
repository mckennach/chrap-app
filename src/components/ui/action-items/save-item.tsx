import { useEffect, useState } from 'react'
import { Bookmark } from 'lucide-react'
import { UserProfileProps } from '@/utils/types/profile.types'
import type { Dispatch, SetStateAction } from 'react'

const SaveItem = ({
  itemId,
  user,
  isSaved,
  onSave,
}: {
  itemId: string
  user: UserProfileProps
  isSaved: boolean
  onSave: (isSaved: boolean, itemId: string, user: UserProfileProps) => void
}) => {
  return (
    <button
      className="link-target flex items-center space-x-1 text-base-content/50 hover:text-base-content"
      onClick={() => onSave(isSaved, itemId, user)}
    >
      <Bookmark className={`w-4 ${isSaved ? 'text-warning' : ''}`} />
      <span className="text-[10px] font-semibold">Save</span>
    </button>
  )
}

export default SaveItem
