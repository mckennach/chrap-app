'use client'

import { Fragment, useEffect, useState } from 'react'
import { createContext } from 'react'
import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import client from '@/apollo-client'
import { useQuery } from '@apollo/client'
import {
  GET_PROFILE_BY_ID,
  GET_PROFILE_IMAGE_BY_ID,
} from '@/utils/api/graphql/queries'
import type { UserProfileProps } from '@/utils/types/profile.types'

type Props = {
  children?: React.ReactNode
  user: any
}

interface StoreContextProps {
  user: UserProfileProps | null
  userAuth: any | null
}

export const StoreContext = createContext<StoreContextProps>({
  user: null,
  userAuth: null,
})

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
)

export const StoreProvider = ({ children, user }: Props) => {
  const { data, loading, error } = useQuery(GET_PROFILE_BY_ID, {
    variables: { id: user?.id },
  })

  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      if (user && data && data?.getProfileById && !loading && !error) {
        setUserData({
          user: data?.getProfileById,
          userAuth: user,
        })
      } else {
        setUserData({
          user: null,
          userAuth: null,
        })
      }
    })()
  }, [user, loading, error])

  return (
    <StoreContext.Provider value={userData}>{children}</StoreContext.Provider>
  )
}
