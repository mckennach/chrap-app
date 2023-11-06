// Styles
import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// Components
import Header from '@/components/header/header'
import { Toaster } from 'react-hot-toast'

// Providers

import { ApolloProvider, StoreProvider } from './providers'

// Types
import type { Metadata } from 'next'
import type { Database } from '@/utils/types/database.types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chrap App',
  description: 'Welcome to Chrap App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  let userAuth
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  userAuth = user

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      userAuth = user
    } else {
      userAuth = null
    }
  })

  return (
    <html
      className="h-screen overflow-scroll !m-0 !mr-0 bg-base-100 text-white"
      lang="en"
    >
      <ApolloProvider>
        <StoreProvider user={userAuth}>
          <body className={`!m-0 !mr-0 ${inter.className}`}>
            <Header session={session} />
            <main className="h-full">{children}</main>
            <Toaster />
          </body>
        </StoreProvider>
      </ApolloProvider>
    </html>
  )
}
