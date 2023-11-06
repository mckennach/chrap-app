'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const UserProfile = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <h1>User Profile Page</h1>
      <p>USERNAME: {params?.username}</p>
    </div>
  )
}

export default UserProfile
