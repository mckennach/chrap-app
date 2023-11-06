import { ReactNode } from 'react'

export interface DropdownItemsProps {
  name: string
  value: string
  url: string
  onSelect: () => void
  icon: ReactNode
}
