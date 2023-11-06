'use client'

import React, { Fragment, useState, useEffect } from 'react'

import MenuItem from './menu-item'
import { getMenuBarItems } from './menu-bar-items'

export default ({
  editor,
  buttonText,
  inputEmpty,
  onSubmit,
}: {
  editor: any
  buttonText?: string
  inputEmpty: boolean
  onSubmit?: (comment: string) => void
}) => {
  const items = getMenuBarItems(editor)
  const onSubmitHandler = () => {
    const html = editor.getHTML()
    if (onSubmit) onSubmit(html)
  }

  return (
    <div className="editor__header flex justify-between">
      <div className="editor__header">
        {items.map((item, index) => (
          <Fragment key={index}>
            {item.type === 'divider' ? (
              <div className="divider" />
            ) : (
              <MenuItem {...item} />
            )}
          </Fragment>
        ))}
      </div>

      {onSubmit && (
        <div className="pr-4">
          <button
            className={`btn-sm rounded-lg btn-accent text-white capitalize font-medium ${
              inputEmpty && 'btn-disabled'
            } disabled:opacity-80`}
            onClick={onSubmitHandler}
            disabled={inputEmpty}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  )
}
