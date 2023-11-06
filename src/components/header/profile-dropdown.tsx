'use client'

import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { UserProfileProps } from '@/utils/types/profile.types'
import client from '@/apollo-client'
import { getImageUrl } from '@/utils/helpers/images'
import classNames from 'classnames'
import Avatar from '../ui/avatar'

export default function ProfileDropdown({
  user,
}: {
  user: UserProfileProps | null
}) {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (user && user.profile_image) {
        getImageUrl(user.profile_image, 'profile_images').then((url) => {
          setProfileImage(url)
        })
      }
    })()
  }, [user])

  const handleSignOut = async (e: any) => {
    e.preventDefault()
    const resp = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    client.clearStore().then(() => {
      client.resetStore()
      router.refresh()
    })

    if (resp.status === 200) {
      router.refresh()
    }
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button>
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Avatar
            imageUrl={profileImage}
            altText="Profile Image"
            online={true}
            containerClassNames="w-8 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md text-white bg-neutral-focus  shadow-lg ring-1 ring-neutral opacity-100 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href={`/user/${user?.username}`}
                className={classNames(
                  active ? 'bg-neutral-content bg-opacity-20' : 'bg-neutral',
                  'block px-4 py-2 text-sm text-white'
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-neutral-content bg-opacity-20' : 'bg-neutral',
                  'block px-4 py-2 text-sm text-white'
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={(e) => handleSignOut(e)}
                className={classNames(
                  active ? 'bg-neutral-content bg-opacity-20' : 'bg-neutral',
                  'block px-4 py-2 text-sm text-white cursor-pointer'
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
