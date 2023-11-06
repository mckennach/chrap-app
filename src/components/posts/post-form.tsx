'use client'
import { useState, useEffect, useContext } from 'react'
import { ImageIcon } from 'lucide-react'
import Card from '../ui/card'
import { StoreContext } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import Image from 'next/image'
import {
  checkAbsoluteImage,
  getImageUrl,
  imageLoader,
} from '@/utils/helpers/images'
import PostFormModal from './post-form-modal'
import Avatar from '../ui/avatar'

interface FormData {
  title: string
  body: string
  image: string
  topic: string
  tags: string
}

const PostForm = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { user } = useContext(StoreContext) || {}
  const router = useRouter()

  useEffect(() => {
    if (user && user.profile_image) {
      getImageUrl(user.profile_image, 'profile_images').then((url) => {
        setProfileImage(url)
      })
    }
  }, [user])

  return (
    <>
      <Card>
        <div className="flex justify-between items-center space-x-2">
          <div className="flex-none flex items-center">
            <Avatar imageUrl={profileImage} altText="Profile Image" />
          </div>
          <div className="grow">
            <input
              // onClick={() => setIsModalOpen(true)}
              onFocus={() => router.push('/submit')}
              type="text"
              className="input input-bordered input-accent w-full"
              placeholder="Create Post"
            />
          </div>
          <div className="flex-none">
            <ImageIcon size={20} color="white" />
          </div>
        </div>
      </Card>
      <PostFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        user={user}
      />
    </>
  )
}

export default PostForm
