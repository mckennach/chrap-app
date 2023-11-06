import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

// GraphQL
import { useMutation } from '@apollo/client'
import { INSERT_POST } from '@/utils/api/graphql/mutations/posts.mutations'
import { clear } from 'console'

interface FormInput {
  title: string
  image: string
}

export default function ImagePost() {
  const router = useRouter()
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

  // watch input value by passing the name of it

  // useEffect(() => {
  //   console.log(image);
  //   console.log(imageData);
  // }, [image, imageData]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(imageData)
    if (image) {
      setError('image', {
        type: 'required',
        message: 'Image or Video is required',
      })
    } else {
      clearErrors('image')
      const { title } = data
      const post = {
        title,
        image: imageData,
        type: 'image',
      }
      try {
        const newPost = await insertPost({ variables: { post } })
        reset()
        setImage('')
        setImageData('')
        console.log(newPost)
      } catch (error) {
        console.log(error)
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
