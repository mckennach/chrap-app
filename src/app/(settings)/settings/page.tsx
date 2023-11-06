'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Settings({ params }: { params: { username: string } }) {
  return (
    <div>
      <h1>User Profile Page</h1>
      <p>USERNAME: {params?.username}</p>
    </div>
  )
}
