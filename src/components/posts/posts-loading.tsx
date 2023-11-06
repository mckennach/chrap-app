import React from 'react'
import Card from '../ui/card'

interface Props {
  count: number
}

const PostsLoading: React.FC<Props> = ({ count }) => {
  const posts = Array.from({ length: count }, (_, i) => i)

  return (
    <>
      {posts.map((post) => (
        <Card key={post}>
          <div className="animate-pulse">
            <div className="flex flex-col p-2">
              <div className="text-[10px] break-words mb-4 h-4 w-1/3 text-gray-500 bg-secondary/30 rounded-sm"></div>
              <div className="text-md lg:text-lg font-medium h-8 w-1/2 break-words mb-3 bg-secondary/30 rounded-sm"></div>
              <div className="max-h-48 mask-box h-32 w-full  text-gray-600 bg-secondary/30 rounded-sm"></div>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}

export default PostsLoading
