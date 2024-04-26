import React from 'react'
import Heading from '../Heading'

export const Notification = () => {
    return (
        <div className='fixed cursor-pointer
        hover:[animation-play-state:paused]
        z-50 w-[min(20rem,calc(100%-4rem))]
        rounded-lg bg-red-600 
        lg:hover:scale-[1.2]
        transition-all
         duration-300
         hover:bottom-8
         shadow notificationframes
    '>
            <div
                className='flex flex-col px-5 py-3'
            >
                <Heading>Notification</Heading>
                <div className='w-full'>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, similique.</p>
                </div>
            </div>

        </div>
    )
}
