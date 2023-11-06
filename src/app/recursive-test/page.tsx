'use client'
import Test from '@/components/test'
import { useState, useEffect } from 'react'

const TestPage = () => {
  const [commentData, setCommentData] = useState<any>({
    id: 1,
    children_comments: [
      {
        id: 2,
        name: 'First level comment',
        children_comments: [
          {
            name: 'Second level comment',
            id: 3,
            children_comments: [
              {
                name: 'Third level comment',
                id: 5,
                children_comments: [],
              },
            ],
          },
        ],
      },
      {
        name: 'First level comment',
        id: 4,
        children_comments: [],
      },
    ],
  })
  return <Test comment={commentData} />
}

export default TestPage
