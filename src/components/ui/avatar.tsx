import React from 'react'
import { User } from 'lucide-react'
import Image from 'next/image'
import { imageLoader } from '@/utils/helpers/images'

interface AvatarProps {
  imageUrl: any
  altText: string
  size?: number
  containerClassNames?: string
  imageClassNames?: string
  online?: boolean
}

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  altText,
  size = 8,
  containerClassNames,
  imageClassNames,
  online = false,
}) => {
  if (!imageUrl) {
    return (
      <div className={`avatar placeholder ${online && 'online'}`}>
        <div
          className={`bg-accent-focus text-accent-content rounded-full w-${size} h-${size} ${containerClassNames}`}
        >
          <User
            className={`w-${size - 2}/5 h-${
              size - 2
            } text-white ${imageClassNames}`}
            aria-hidden="true"
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className={`avatar ${online ? 'online' : ''}`}>
        <div
          className={`w-${size} h-${size} rounded-full ${containerClassNames} overflow-hidden aspect-square relative`}
        >
          <Image
            src={imageUrl as string}
            alt={altText}
            className={`w-${size} h-${size} ${imageClassNames} rounded-full`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loader={imageLoader}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            priority
          />
        </div>
      </div>
    )
  }
}

export default Avatar
