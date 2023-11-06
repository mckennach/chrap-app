'use client'
import { useRef, useState, useEffect, Fragment } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { UserProfileProps } from '@/utils/types/profile.types'

const PostFormModal = ({
  isModalOpen,
  setIsModalOpen,
  user,
}: {
  isModalOpen: boolean
  setIsModalOpen: (openModal: boolean) => void
  user: UserProfileProps | null
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    if (user && user.profile_image) {
      setProfileImage(user.profile_image)
    }
  }, [user])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-base-200 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center bg-black/20 dark:text-white text-neutral">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100  p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-white sr-only"
                  >
                    Post
                  </Dialog.Title>
                  <form>
                    <fieldset className="form-control">
                      <textarea
                        className="textarea"
                        placeholder="What's on your mind?"
                      ></textarea>
                    </fieldset>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default PostFormModal
