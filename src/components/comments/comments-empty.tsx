import { MessageSquare } from 'lucide-react'

const CommentsEmpty = () => {
  return (
    <div className="py-24 px-4 space-y-3 flex flex-col items-center justify-center text-center opacity-50 ">
      <MessageSquare className="w-6" />
      <div className="space-y-1">
        <h3>No comments yet</h3>
        <p className="text-xs">Be the first to share what you think!</p>
      </div>
    </div>
  )
}

export default CommentsEmpty
