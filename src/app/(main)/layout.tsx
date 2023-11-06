// Types
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chrap App',
  description: 'Welcome to Chrap App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
      {children}
    </div>
  )
}
