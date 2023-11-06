import { useState, useRef, useEffect } from 'react'

const Item = ({ item }: any) => {
  return <div>{item.name}</div>
}

const Test = ({ comment }: any) => {
  return (
    <div>
      {comment?.id === 1 ? (
        <div>first</div>
      ) : (
        <div className="pl-4">
          <Item item={comment} />
        </div>
      )}
      {comment?.children_comments?.map((childComment: any) => {
        return <Test comment={childComment} />
      })}
    </div>
  )
}

export default Test
