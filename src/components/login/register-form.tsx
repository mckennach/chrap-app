'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { debounce } from 'lodash'
// GRAPHQL

import { useQuery } from '@apollo/client'
import { GET_PROFILES_USERNAME_AND_EMAIL } from '@/utils/api/graphql/queries'

// Components
import toast from 'react-hot-toast'
import Link from 'next/link'

// TYPES
import type { UsernameAvailabilityVariables } from '@/utils/types/profile.types'
import FormLoading from './form-loading'

type RegisterProps = {
  name: string
  username: string
  email: string
  password: string
  confirm_password: string
}

const RegisterForm = ({ setIsLogInForm }: { setIsLogInForm: any }) => {
  const { loading, error, data, refetch } = useQuery(
    GET_PROFILES_USERNAME_AND_EMAIL
  )
  const [users, setUsers] = useState(null)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true)
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true)
  const router = useRouter()
  const methods = useForm<RegisterProps>()
  const {
    watch,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods

  useEffect(() => {
    if (data) {
      setUsers(data.profileList)
    }
  }, [data])

  useEffect(() => {
    ;(async () => {
      if (!isUsernameAvailable) {
        setError('username', {
          types: {
            required: true,
            value: true,
            message: 'Username is already taken',
          },
          message: 'Username is already taken',
        })
      } else {
        clearErrors('username')
      }

      if (!isEmailAvailable) {
        setError('email', {
          type: 'manual',
          message: 'Email is already taken',
        })
      } else {
        clearErrors('email')
      }
    })()
  }, [isUsernameAvailable, isEmailAvailable])

  const checkEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await debouncedCheckUsername(null, e.target.value)
  }

  const checkUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await debouncedCheckUsername(e.target.value, null)
  }

  const debouncedCheckUsername = useCallback(
    debounce(async (username: string | null, email: string | null) => {
      if (username) {
        const refetchedData = await refetch()
        const { profileList } = refetchedData.data
        const user = profileList.find(
          (user: UsernameAvailabilityVariables) => user.username === username
        )

        setIsUsernameAvailable(!user)
      }

      if (email) {
        const refetchedData = await refetch()
        const { profileList } = refetchedData.data
        const user = profileList.find(
          (user: UsernameAvailabilityVariables) => user.email === email
        )

        setIsEmailAvailable(!user)
      }
    }, 300),
    []
  )

  const onSubmit: SubmitHandler<RegisterProps> = async (input) => {
    const resp = await fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const data = await resp.json()

    if (data.error) {
      toast.error(data.error.message)
      return
    }
    if (resp.status === 200) {
      router.refresh()
    } else {
      toast.error('Error creating account, please try again')
    }
  }

  if (loading)
    return (
      <FormLoading inputCount={5} buttonText="Sign Up">
        <p>
          Already have an account?{' '}
          <Link
            href="/login"
            onClick={(e) => {
              e.preventDefault()
              setIsLogInForm(true)
            }}
            className="link "
            replace
          >
            Log In
          </Link>
        </p>
      </FormLoading>
    )

  if (error) return `Error! ${error}`

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <fieldset className="flex flex-col space-y-1.5">
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              id="name"
              className="input input-primary"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-400">{errors.name.message}</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col space-y-1.5">
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <input
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required',
                },
              })}
              id="username"
              onChange={checkUsername}
              className="input input-primary"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-400">{errors.username.message}</p>
            )}
          </fieldset>

          <fieldset className="flex flex-col space-y-1.5">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              onChange={checkEmail}
              id="email"
              className="input input-primary"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col space-y-1.5">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              id="password"
              type="password"
              className="input input-primary"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col space-y-1.5">
            <label className="sr-only" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input
              {...register('confirm_password', {
                required: 'Verify your password',

                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'Your passwords do no match'
                  }
                },
              })}
              type="password"
              className="input input-primary"
              id="confirm_password"
              placeholder="Confirm Password"
            />
            {errors.confirm_password && (
              <p className="text-red-400">{errors.confirm_password.message}</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col space-y-1.5 mt-4">
            <p>
              Already have an account?{' '}
              <Link
                href="/login"
                onClick={(e) => {
                  e.preventDefault()
                  setIsLogInForm(true)
                }}
                className="link "
                replace
              >
                Log In
              </Link>
            </p>
          </fieldset>
          <fieldset className="flex flex-col space-y-1.5 mt-4">
            <button
              type="submit"
              className="btn btn-accent text-white"
              {...{ disabled: !isUsernameAvailable || !isEmailAvailable }}
            >
              Sign Up
            </button>
          </fieldset>
        </div>
      </form>
    </FormProvider>
  )
}

export default RegisterForm
