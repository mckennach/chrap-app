'use client'

import './text-editor.css'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import * as Y from 'yjs'

import MenuBar from './menu-bar/menu-bar'

export default ({
  buttonText,
  onSubmit,
  onChange,
}: {
  buttonText?: string
  onSubmit?: (comment: string) => void
  onChange?: (comment: string) => void
}) => {
  const [status, setStatus] = useState('connecting')
  const [output, setOutput] = useState('')
  const [inputEmpty, setInputEmpty] = useState<boolean>(true)

  useEffect(() => {}, [inputEmpty])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setOutput(html)
      if (onChange) {
        onChange(html)
      }
      editor.isEmpty ? setInputEmpty(true) : setInputEmpty(false)
    },
  })

  // Save current user to localStorage and emit to editor

  return (
    <div className="editor">
      <EditorContent className="editor__content " editor={editor} />
      {editor && (
        <MenuBar
          editor={editor}
          buttonText={buttonText}
          inputEmpty={inputEmpty}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}
