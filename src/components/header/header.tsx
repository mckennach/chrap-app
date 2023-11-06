'use client'

import { Fragment, useEffect, useState, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Menu as Hamburger, Bell, X } from 'lucide-react'
import Image from 'next/image'
import { imageLoader } from '@/utils/helpers/images'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import type { Session } from '@supabase/auth-helpers-nextjs'
import ProfileDropdown from './profile-dropdown'
import Login from '../login/login'
import { supabase } from '@/app/supabase'
import TopicList from '../topics/topics-list'
import { StoreContext } from '@/app/providers'
import classNames from 'classnames'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

export default function Header({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const { user } = useContext(StoreContext) || {}
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (session && user) {
      setIsLoggedIn(true)
      isModalOpen && setIsModalOpen(false)
    } else {
      setIsLoggedIn(false)
      isModalOpen && setIsModalOpen(false)
    }
  }, [session, user])

  return (
    <>
      <Disclosure as="nav" className="bg-base-300 text-base-content">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-neutral hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Hamburger className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 space-x-3 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image
                        src="/logo.svg"
                        alt="Chrap Logo"
                        className="w-8 dark:invert"
                        width={32}
                        height={32}
                        style={{ height: 'auto' }}
                        priority
                      />
                    </Link>
                  </div>
                  <TopicList />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {isLoggedIn ? (
                    <>
                      <button
                        type="button"
                        className="relative rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <ProfileDropdown user={user} />
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-accent text-white btn-md rounded-full h-9 min-h-[2.25rem]"
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Log in
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-neutral text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {!isLoggedIn && (
        <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  )
}
