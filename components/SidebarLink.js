import React from 'react'

export const SidebarLink = ({text, Icon}) => {
  return (
    <div className='text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverEffect px-4 py-2 w-fit' onClick={() => {}}>
        <Icon/>
        <span className='hidden xl:inline'>{text}</span>
    </div>
  )
}
