import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// Components
import toast from 'react-hot-toast'

// GraphQL
import { useMutation } from '@apollo/client'
import { INSERT_POST } from '@/utils/api/graphql/mutations/posts.mutations'

// Types
import type { UserProfileProps } from '@/utils/types/profile.types'

interface FormInput {
  title: string
  image: string
}

export default function ImagePost({
  user,
  userAuth,
}: {
  user: UserProfileProps
  userAuth: any
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [insertPost, { data, loading, error }] = useMutation(INSERT_POST)
  const [image, setImage] = useState<any>(null)
  const [imageData, setImageData] = useState<any>('')
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!image) {
      setError('image', {
        type: 'required',
        message: 'Image or Video is required',
      })
    } else {
      const { data: imageUploadData, error: imageUploadError } =
        await supabase.storage
          .from('post_images')
          .upload(
            `${userAuth?.id}/${image?.name}_${new Date().getTime()}`,
            image
          )

      if (imageUploadError) {
        toast.error('Something went wrong, please try again')
        return
      }

      const { title } = data

      try {
        const newPost = await insertPost({
          variables: {
            title,
            body: '',
            images: { ids: [imageUploadData?.path] },
            external_link: '',
            user_id: userAuth.id,
            vote_ids: [userAuth.id],
            topic_id: '47d98b0e-6e88-4c85-bbd9-cb788f9cfad0',
            created_at: new Date().toISOString(),
          },
        })
        reset()
        setImage('')
        setImageData('')

        router.push(
          `/t/${newPost?.data?.insertPost?.topic_slug}/${newPost?.data?.insertPost?.id}`
        )
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong, please try again')
      }
    }
  }

  const onUpload = (imageInput: any) => {
    clearErrors('image')
    const file = imageInput.target.files[0]
    setImage(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImageData(reader.result)
    }
  }

  const onCancel = () => {
    reset()
    setImage('')
    setImageData('')
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm text-neutral-content sr-only">
          Title
        </label>
        <input
          {...register('title', { required: true, maxLength: 20 })}
          id="title"
          type="text"
          className="input input-bordered input-sm w-full"
          placeholder="Title"
        />
        {errors.title?.type === 'required' && (
          <p className="text-error mt-2" role="alert">
            Title is required
          </p>
        )}
      </div>
      <div className="flex  flex-col justify-center w-full space-x-2">
        <label
          style={{
            backgroundImage: `url(${imageData})`,
            backgroundSize: 'cover',
          }}
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-focus border-dashed rounded-lg cursor-pointer bg-base-100 hover:bg-base-200 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 bg-base-100 p-4 rounded-lg">
            <svg
              className="w-8 h-8 mb-4 text-neutral-content"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-neutral-content">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-neutral-content">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={onUpload}
            multiple
          />
        </label>
        {errors.image && (
          <p className="text-error mt-2" role="alert">
            Image or Video is required
          </p>
        )}
      </div>
      <div className="flex gap-2 justify-end">
        <button
          className="btn btn-outline btn-sm capitalize"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className="btn btn-accent btn-sm capitalize">Post</button>
      </div>
    </form>
  )
}
