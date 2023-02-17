/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { BsBell, BsThreeDots, BsTwitter } from 'react-icons/bs'
import { SidebarLink } from './SidebarLink'
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'
import { FiActivity } from 'react-icons/fi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { BiCalendarEvent } from 'react-icons/bi'
import { MdOutlineArticle, MdOutlineWhatshot } from 'react-icons/md'
import { GiCongress } from 'react-icons/gi'
import { signOut, useSession } from 'next-auth/react'

export default function Sidebar() {

    const { data: session } = useSession()

    return (
        <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full border-r border-gray-400 pr-0 xl:pr-8'>
            <div className='flex items-center justify-center w-14 h-14 hoverEffect p-0 xl:ml-24'>
                <HiOutlineSpeakerphone className='text-white text-[34px]' />
            </div>

            <div className='space-y-2 mt-4 mb-2.5 xl:m-24'>
                <SidebarLink text="Home" Icon={AiFillHome} />
                <SidebarLink text="Topics" Icon={MdOutlineWhatshot} />
                <SidebarLink text="Activity" Icon={FiActivity} />
                <SidebarLink text="Bills" Icon={GiCongress} />
                <SidebarLink text="Notices" Icon={MdOutlineArticle} />
                <SidebarLink text="Events" Icon={BiCalendarEvent} />
                <SidebarLink text="Notifications" Icon={BsBell} />
                <SidebarLink text="Profile" Icon={AiOutlineUser} />
            </div>

            <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-52 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]'>Tweet</button>

            <div className='text-[#d9d9d9] flex items-center justify-center mt-auto hoverEffect xl:ml-auto xl:mr-5 px-4 py-2' onClick={signOut}>
                <img src={session?.user.image}
                    alt=""
                    className='h-10 w-10 rounded-full xl:mr-2.5'/>
            </div>

            <div className='hidden xl:inline leading-5'>
                <h4 className='font-bold'>{session?.user?.name}</h4>
                <h4 className='text-[#6e767d]'>{session?.user?.tag}</h4>
            </div>

            <BsThreeDots className='h-5 hidden xl:inline ml-10'/>

        </div>
    )
}
