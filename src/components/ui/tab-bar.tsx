'use client'

import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Tab {
  name: string
  value: string
  href: string
  as: string
}

interface TabBarProps {
  tabs: Tab[]
}

const TabBar: FC<TabBarProps> = ({ tabs }) => {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<string>('')
  // useEffect(() => {
  //   setActiveTab(pathname)
  //   console.log(pathname)
  // }, [pathname])

  return (
    <nav role="tablist" className="tabs border-b-2 border-b-[#393f47]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full pt-1">
        {tabs &&
          tabs.length > 0 &&
          tabs.map((tab) => (
            <Link
              key={tab?.value}
              href={tab?.href}
              as={tab?.as}
              className={`tab ${pathname === tab?.as && 'tab-active'}`}
            >
              {tab?.name}
            </Link>
          ))}
      </div>
    </nav>
  )
}

export default TabBar
