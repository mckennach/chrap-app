import { useState, useEffect } from 'react'

import TextEditor from '@/components/ui/text-editor'

export default function TextPost() {
  const [textInput, setTextInput] = useState<string>('')

  const onSubmit: (commentInput: string) => void = async () => {
    console.log('text post')
  }

  const onChange: (commentInput: string) => void = async (
    commentInput: string
  ) => {
    setTextInput(commentInput)
  }

  return (
    <form className="space-y-2">
      <div>
        <label htmlFor="title" className="text-sm text-neutral-content sr-only">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="input input-bordered input-sm w-full rounded-md"
          placeholder="Title"
        />
      </div>
      <TextEditor onChange={onChange} buttonText="Post" />
      <div className="flex gap-2 justify-end">
        <button className="btn btn-outline btn-sm capitalize">Cancel</button>
        <button className="btn btn-accent btn-sm capitalize" type="submit">
          Post
        </button>
      </div>
    </form>
  )
}
