import React, { type ReactNode, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { DropdownItemsProps } from '@/utils/types/general.types'

const Dropdown = ({
  trigger,
  items,
}: {
  trigger: ReactNode
  items: DropdownItemsProps[]
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cursor-pointer" asChild>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=" bg-base-300 rounded-md border-[1px] border-white/60 shadow-[0px_0px_8x_2px_#edf2f7] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          // sideOffset={5}
          align="start"
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              onSelect={() => item.onSelect()}
              key={index}
              className="group text-[13px] leading-none text-white rounded-[3px] flex items-center h-[25px] px-2 py-4 relative  select-none outline-none data-[disabled]:text-white/50 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700/60 data-[highlighted]:text-white"
            >
              <div className="flex items-center justify-between py-2 gap-2">
                {item.icon}
                {item.name}
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default Dropdown
