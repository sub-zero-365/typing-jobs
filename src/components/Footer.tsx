import React from 'react'
import Heading from './Heading'
import { Link } from 'react-router-dom'
import { IconBrandFacebook, IconBrandMessenger, IconBrandWhatsapp } from '@tabler/icons-react'
import { cn } from '../lib/utils'
import { MainLogo } from '../assets/logo/index.js';

const PopOver = ({ children, text, className }: {
    children: React.ReactNode, text: string,
    className?: string
}) => {
    return (
        <div
            className={cn('group popover flex-none hover:scale-125 transition-all  duration-300 hover:-translate-y-2  cursor-pointer min-h-10   relative flex items-center justify-center  rounded-full bg-gray-80', className)}
        >
            <div className='w-52 rounded  text-center group-[:hover]:visible invisible duration-300 transition-colors  px-5 py-1.5 bg-black absolute -top-[calc(100%+0rem)]'>
                <p
                    className='text-white text-xs  lg:text-sm leading-relaxed relative z-[2]'
                >{text}</p>
                <div className='w-4 h-4 -mt-1 z-[1]
                                bg-black
                                
                                rotate-45 absolute
                                left-1/2 -translate-x-1/2 '>

                </div>
            </div>
            {children}
        </div>
    )
}

const Footer = ({ className }: { className?: string }) => {
    return (

        <div className='mt-6 py-10 bg-colorPrimary text-white 
        px-3
        '

        >
            <div className='flex [*:not(:hover):bg-red-500]-- justify-center items-center gap-x-4 mb-6'>

                <PopOver
                    className='size-12 bg-slate-300'
                    text='facebook page'>
                    <IconBrandFacebook
                        color='black'
                        size={25}
                    />

                </PopOver>
                <PopOver
                    className='size-12 bg-slate-300'
                    text='facebook page'>
                    <IconBrandWhatsapp
                        color='black'
                        size={25}
                    />

                </PopOver>
                <PopOver
                    className='size-12 bg-slate-300'
                    text='facebook page'>
                    <IconBrandMessenger
                        color='black'
                        size={25}
                    />

                </PopOver>




            </div>
            <div className="
        sm:max-w-6xl  mx-auto
            ">

                <div className='lg:grid grid-cols-12 lg:flex-row '>
                <div className=' col-span-4'>
                <Link to={"/home"}>    <img src={MainLogo} alt="applogo" className='w-32 h-12' /></Link>
                
                </div>
                
                    {/* <Heading className='flex-none text-3xl font-black mb-6  col-span-4'>
                        {import.meta.env.VITE_APP_NAME}
                    </Heading> */}
                    <div className='flex-1 grid col-span-8 gap-y-6
                    grid-cols-[repeat(auto-fit,minmax(min(10rem,calc(100%-60px)),_1fr))]'>

                        <ul>
                            <li>
                                <Heading className=' mb-4 text-2xl text-blue-500'>News</Heading>
                                <ul>
                                    {Array.from({ length: 2 }, () => {
                                        return <li>
                                            <Link to={'#'}>Fireworks</Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Heading className=' mb-4 text-2xl text-blue-500'>Social Media</Heading>
                                <ul>
                                    {Array.from({ length: 3 }, () => {
                                        return <li>
                                            <Link to={'#'}>Fireworks</Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Heading className=' mb-4 text-2xl text-blue-500'>Whatsapp</Heading>
                                <ul className='flex flex-col space-y-2'>
                                    {Array.from({ length: 3 }, () => {
                                        return <li>
                                            <Link to={'#'}>+237670000009</Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>

        </div>

    )
}

export default Footer