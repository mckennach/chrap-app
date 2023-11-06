'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import FormLoading from './form-loading'
import Link from 'next/link'

type LoginProps = {
  email: string
  password: string
}

const LoginForm = ({ setIsLogInForm }: { setIsLogInForm: any }) => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const methods = useForm<LoginProps>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const resp = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const res = await resp.json()
    if (res.error) {
      toast.error(res.error.message)
      return
    }

    if (resp.status === 200) {
      router.refresh()
    }
  }

  if (!supabase)
    return (
      <FormLoading inputCount={2} buttonText="Sign Up">
        <p>
          New to Chrap?{' '}
          <Link
            href="/register"
            className="link  "
            onClick={(e) => {
              e.preventDefault()
              setIsLogInForm(false)
            }}
            replace
          >
            Sign Up
          </Link>
        </p>
        <p>
          Forgot you{' '}
          <Link href="/" className="link  ">
            username
          </Link>{' '}
          or{' '}
          <Link href="/" className="link  ">
            password
          </Link>
          ?
        </p>
      </FormLoading>
    )

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <fieldset className="flex flex-col space-y-1.5">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              id="email"
              placeholder="Email"
              className="input input-primary"
              // className="block w-full input input-primary rounded-md border-0 p-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              placeholder="Password"
              className="input input-primary"
              // className="block w-full input input-primary rounded-md border-0 p-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </fieldset>
          <fieldset className="flex flex-col space-y-1.5 mt-4">
            <p>
              New to Chrap?{' '}
              <Link
                href="/register"
                className="link  "
                onClick={(e) => {
                  e.preventDefault()
                  setIsLogInForm(false)
                }}
                replace
              >
                Sign Up
              </Link>
            </p>
            <p>
              Forgot you{' '}
              <Link href="/" className="link  ">
                username
              </Link>{' '}
              or{' '}
              <Link href="/" className="link  ">
                password
              </Link>
              ?
            </p>
          </fieldset>
          <fieldset className="flex flex-col space-y-1.5 mt-4">
            <button type="submit" className="btn btn-accent text-white">
              Log In
            </button>
          </fieldset>
        </div>
      </form>
    </FormProvider>
  )
}

export default LoginForm
