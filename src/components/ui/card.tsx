import React, { ReactNode } from 'react'
import classNames from 'classnames'
type Props = {
  children?: ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  otherProps?: any
}

const Card = ({ children, className, onClick, otherProps }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${classNames(
        className
      )} card bg-base-300 text-white shadow-xl rounded-md p-4 mb-4 ${
        onClick &&
        'border-solid border-[1px] border-black hover:border hover:border-solid hover:border-white/50 cursor-pointer'
      }`}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default Card
