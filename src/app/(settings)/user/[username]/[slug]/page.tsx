'use client'

import { useState, useEffect } from 'react'

// GraphQL
// import client from '@/apollo-client'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_PROFILE_BY_USERNAME } from '@/utils/api/graphql/queries'

// Components
import SavedItems from '@/components/user-profile/saved-items'

import { UserProfileProps } from '@/utils/types/profile.types'
import { get } from 'lodash'

const TabContent = ({
  slug,
  user,
}: {
  slug: string
  user: UserProfileProps
}) => {
  switch (slug) {
    case 'saved':
      return <SavedItems user={user} />
    case 'submitted':
      return (
        <div>
          <h2>Submitted</h2>
        </div>
      )
    case 'comments':
      return (
        <div>
          <h2>Comments</h2>
        </div>
      )
    case 'upvoted':
      return (
        <div>
          <h2>Upvoted</h2>
        </div>
      )
    case 'downvoted':
      return (
        <div>
          <h2>Downvoted</h2>
        </div>
      )
    default:
      return (
        <div>
          <h2>404</h2>
        </div>
      )
  }
}

export default function UserProfileSubmitted({
  params,
}: {
  params: { username: string; slug: string }
}) {
  const [user, setUser] = useState<UserProfileProps | null>(null)
  const { data, error, loading } = useQuery(GET_PROFILE_BY_USERNAME, {
    variables: { username: params?.username },
  })

  useEffect(() => {
    if (!user) {
      setUser(data?.getProfileByUsername)
    }
  }, [data])
  // const [getProfileByUsername, { data, error, loading }] = useLazyQuery(GET_PROFILE_BY_USERNAME, {
  //   variables: { username: params?.username },
  // });

  // useEffect(() => {
  //   (async () => {
  //     if(!user) {
  //       getProfileByUsername({ variables: { username: params?.username } }).then((res) => {
  //         if (res?.data?.getProfileByUsername) {
  //           setUser(res?.data?.getProfileByUsername);
  //         }
  //       });
  //     }
  //   })();
  // }, []);

  if (loading || error || !user) return null

  if (params?.slug === 'saved') {
    return (
      <div>
        <SavedItems user={user} />
      </div>
    )
  }

  // return <div><TabContent slug={params?.slug} user={user} /></div>
}
