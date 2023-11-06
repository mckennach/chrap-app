import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/utils/types/database.types'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const body = await request.json()
  const { email, password, name, username } = body
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        name,
        username,
      },
    },
  })

  return NextResponse.json({ data, error })
}
